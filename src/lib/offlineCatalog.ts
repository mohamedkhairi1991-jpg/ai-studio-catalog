import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductAlternative } from './alternatives';
import type { CatalogProduct, DoctorSearchRow, ProductCategory, SearchCatalogProductsInput } from './catalog';
import { countryNameFromCode, type CompanyType } from './companies';
import type { CompanyDirectoryEntry, CompanyPage } from './companyPage';

/**
 * Offline catalog: the whole doctor catalog saved on the phone (IndexedDB), so
 * search, drug pages and company pages work with no internet.
 *
 * - Downloaded once while online (get_offline_catalog_changes(null), ~3.4 MB,
 *   about 0.7 MB compressed), then only the drugs that changed
 *   (get_offline_catalog_changes(since)), and only when
 *   get_offline_catalog_version() says something changed.
 * - Checked at most every CHECK_EVERY_MS; a full download again after
 *   FULL_EVERY_MS so anything a change-only update could miss is fixed.
 * Migration 20261123120000_offline_catalog.sql.
 */

export interface OfflineProduct {
  id: string;
  companyId: string;
  agentCompanyId?: string;
  category: ProductCategory;
  brand: string;
  generic?: string;
  drugClass?: string;
  strength?: string;
  dosageForm?: string;
  route?: string;
  packSize?: string;
  specialtyIds?: string[];
  storage?: string;
  indications?: string;
  dose?: string;
  contraindications?: string;
  adverseEffects?: string;
  publishedAt?: string;
  nBrand?: string;
  nGeneric?: string;
  nCompany?: string;
  nClass?: string;
  nStrength?: string;
  nIngredients?: string;
}

export interface OfflineCompany {
  id: string;
  name: string;
  legalName?: string;
  type?: string;
  originCountryCode?: string;
  tagline?: string;
  description?: string;
  websiteUrl?: string;
  foundedYear?: number;
}

export interface OfflineCatalog {
  version: string;
  /** Server time of the last download (next change-only download starts here). */
  generatedAt: string;
  /** When the last full download happened (phone time, ms). */
  fullAt: number;
  /** When the version was last checked (phone time, ms). */
  checkedAt: number;
  products: OfflineProduct[];
  companies: OfflineCompany[];
  specialties: Array<{ id: string; name: string }>;
  synonyms: Array<[string, string]>;
}

interface ServerPayload {
  version: string;
  generatedAt: string;
  full?: boolean;
  products?: OfflineProduct[];
  allIds?: string[];
  companies?: OfflineCompany[];
  specialties?: Array<{ id: string; name: string }>;
  synonyms?: Array<[string, string]>;
}

export const CHECK_EVERY_MS = 6 * 60 * 60 * 1000;
export const FULL_EVERY_MS = 7 * 24 * 60 * 60 * 1000;
/** Overlap for change-only downloads, so edits saved while we downloaded are not missed. */
const SINCE_OVERLAP_MS = 10 * 60 * 1000;

// ---------------------------------------------------------------------------
// Network helpers

/** True when the phone says it has no connection. */
export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && navigator.onLine === false;
}

/** True for errors that mean "could not reach the server" (not "the server said no"). */
export function isNetworkErrorMessage(message: string | null | undefined): boolean {
  return /failed to fetch|networkerror|network request failed|load failed|fetch failed|err_internet|err_network|timed? ?out/i.test(
    message ?? ''
  );
}

// ---------------------------------------------------------------------------
// Storage (IndexedDB, one record). Memory copy after the first read.

const DB_NAME = 'pharmaty-offline';
const STORE = 'kv';
const KEY = 'catalog';
let memory: OfflineCatalog | null = null;
let memoryLoaded = false;

function openDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
      req.onblocked = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readStored(): Promise<OfflineCatalog | null> {
  const db = await openDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(KEY);
      req.onsuccess = () => resolve((req.result as OfflineCatalog | undefined) ?? null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function writeStored(catalog: OfflineCatalog): Promise<void> {
  const db = await openDb();
  if (!db) return;
  await new Promise<void>((resolve) => {
    try {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(catalog, KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

/** The saved catalog, or null if none was downloaded yet. */
export async function getOfflineCatalog(): Promise<OfflineCatalog | null> {
  if (!memoryLoaded) {
    memory = await readStored();
    memoryLoaded = true;
  }
  return memory;
}

/** For tests. */
export function setOfflineCatalogForTests(catalog: OfflineCatalog | null): void {
  memory = catalog;
  memoryLoaded = true;
}

// ---------------------------------------------------------------------------
// Download

/** Apply a server payload to the saved catalog (full replace or change-only merge). */
export function mergeOfflinePayload(
  current: OfflineCatalog | null,
  payload: ServerPayload,
  now: number
): OfflineCatalog {
  const base = {
    version: payload.version,
    generatedAt: payload.generatedAt,
    checkedAt: now,
    companies: payload.companies ?? current?.companies ?? [],
    specialties: payload.specialties ?? current?.specialties ?? [],
    synonyms: payload.synonyms ?? current?.synonyms ?? [],
  };
  if (payload.full || !current) {
    return { ...base, fullAt: now, products: payload.products ?? [] };
  }
  const byId = new Map(current.products.map((p) => [p.id, p]));
  for (const p of payload.products ?? []) byId.set(p.id, p);
  const keep = payload.allIds ? new Set(payload.allIds) : null;
  const products = [...byId.values()]
    .filter((p) => !keep || keep.has(p.id))
    .sort((a, b) => a.brand.localeCompare(b.brand));
  return { ...base, fullAt: current.fullAt, products };
}

export type OfflineSyncResult = 'offline' | 'skipped' | 'unchanged' | 'updated' | 'downloaded' | 'error';

let syncing: Promise<OfflineSyncResult> | null = null;

/**
 * Keep the saved catalog up to date. Cheap when nothing changed: one tiny
 * version call at most every 6 hours. Safe to call often.
 */
export function syncOfflineCatalog(
  client: SupabaseClient,
  options: { force?: boolean; now?: number } = {}
): Promise<OfflineSyncResult> {
  if (!syncing) {
    syncing = runSync(client, options).finally(() => {
      syncing = null;
    });
  }
  return syncing;
}

async function runSync(
  client: SupabaseClient,
  { force = false, now = Date.now() }: { force?: boolean; now?: number }
): Promise<OfflineSyncResult> {
  if (isOffline()) return 'offline';
  const current = await getOfflineCatalog();
  if (!force && current && now - current.checkedAt < CHECK_EVERY_MS) return 'skipped';

  const versionRes = await client.rpc('get_offline_catalog_version');
  if (versionRes.error) return isNetworkErrorMessage(versionRes.error.message) ? 'offline' : 'error';
  const version = typeof versionRes.data === 'string' ? versionRes.data : '';

  const needFull = !current || now - current.fullAt > FULL_EVERY_MS;
  if (current && !needFull && version && version === current.version) {
    memory = { ...current, checkedAt: now };
    await writeStored(memory);
    return 'unchanged';
  }

  const since =
    !needFull && current ? new Date(new Date(current.generatedAt).getTime() - SINCE_OVERLAP_MS).toISOString() : null;
  const { data, error } = await client.rpc('get_offline_catalog_changes', { p_since: since });
  if (error || !data) return error && isNetworkErrorMessage(error.message) ? 'offline' : 'error';

  memory = mergeOfflinePayload(current, data as ServerPayload, now);
  memoryLoaded = true;
  await writeStored(memory);
  return since ? 'updated' : 'downloaded';
}

// ---------------------------------------------------------------------------
// Search (same idea as search_catalog_products_v2, on the phone)

/** Same as private.normalize_english_text: lower case, no accents, letters and digits only. */
export function normalizeSearchText(value: string | null | undefined): string {
  return (value ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function queryVariants(q: string, synonyms: Array<[string, string]>): string[] {
  const variants = new Set([q]);
  const padded = ` ${q} `;
  for (const [term, replacement] of synonyms) {
    if (padded.includes(` ${term} `)) {
      variants.add(padded.replace(` ${term} `, ` ${replacement} `).trim());
    }
  }
  return [...variants];
}

function wordsOf(p: OfflineProduct): string[] {
  return [p.nBrand, p.nGeneric, p.nIngredients, p.nClass, p.nCompany, p.nStrength]
    .filter(Boolean)
    .join(' ')
    .split(' ');
}

function tokenMatches(token: string, words: string[], fields: string): boolean {
  if (words.some((w) => w.startsWith(token))) return true;
  return token.length >= 3 && fields.includes(token);
}

/** Edit distance with an early stop (only small distances matter). */
function editDistanceAtMost(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return false;
    prev = cur;
  }
  return prev[b.length] <= max;
}

function closeTokenMatches(token: string, words: string[]): boolean {
  if (token.length < 4) return false;
  const max = token.length >= 7 ? 2 : 1;
  return words.some((w) => w.length >= 3 && (editDistanceAtMost(token, w, max) || editDistanceAtMost(token, w.slice(0, token.length), max)));
}

function rankOf(p: OfflineProduct, q: string): number {
  const brand = p.nBrand ?? '';
  if (brand === q) return 0;
  if (brand.startsWith(q)) return 1;
  if (` ${brand}`.includes(` ${q}`)) return 2;
  if ((p.nGeneric ?? '').startsWith(q) || ` ${p.nIngredients ?? ''}`.includes(` ${q}`)) return 3;
  if (` ${p.nClass ?? ''}`.includes(` ${q}`)) return 4;
  if (` ${p.nCompany ?? ''}`.includes(` ${q}`)) return 5;
  return 6;
}

function toSearchRow(p: OfflineProduct, companyName: string, totalCount: number, close: boolean): DoctorSearchRow {
  return {
    productId: p.id,
    brandNameEn: p.brand || 'Untitled Product',
    genericNameEn: p.generic ?? null,
    companyId: p.companyId,
    companyName,
    drugClassNameEn: p.drugClass ?? null,
    category: p.category,
    strength: p.strength ?? null,
    dosageForm: p.dosageForm ?? null,
    publishedAt: p.publishedAt ?? null,
    totalCount,
    matchKind: close ? 'close' : 'exact',
  };
}

export function searchOfflineCatalog(
  catalog: OfflineCatalog,
  input: SearchCatalogProductsInput = {}
): { rows: DoctorSearchRow[]; totalCount: number; closeMatches: boolean } {
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 50);
  const offset = Math.max(input.offset ?? 0, 0);
  const companyNames = new Map(catalog.companies.map((c) => [c.id, c.name]));
  let pool = catalog.products;
  if (input.companyId) pool = pool.filter((p) => p.companyId === input.companyId);
  if (input.specialtyId) pool = pool.filter((p) => (p.specialtyIds ?? []).includes(input.specialtyId!));

  const raw = (input.query ?? '').trim();
  const q = normalizeSearchText(raw);
  if (raw && !q) return { rows: [], totalCount: 0, closeMatches: false };

  let matches: OfflineProduct[];
  let close = false;
  if (!q) {
    matches = [...pool].sort((a, b) => a.brand.localeCompare(b.brand));
  } else {
    const variants = queryVariants(q, catalog.synonyms);
    const scored: Array<{ p: OfflineProduct; rank: number }> = [];
    for (const p of pool) {
      const words = wordsOf(p);
      const fields = ` ${words.join(' ')}`;
      let best = Infinity;
      for (const v of variants) {
        if (v.split(' ').every((t) => tokenMatches(t, words, fields))) best = Math.min(best, rankOf(p, v));
      }
      if (best < Infinity) scored.push({ p, rank: best });
    }
    if (scored.length === 0) {
      close = true;
      for (const p of pool) {
        const words = wordsOf(p);
        if (q.split(' ').every((t) => tokenMatches(t, words, ` ${words.join(' ')}`) || closeTokenMatches(t, words))) {
          scored.push({ p, rank: rankOf(p, q) });
        }
      }
    }
    scored.sort((a, b) => a.rank - b.rank || a.p.brand.localeCompare(b.p.brand));
    matches = scored.map((s) => s.p);
  }

  const total = matches.length;
  const rows = matches
    .slice(offset, offset + limit)
    .map((p) => toSearchRow(p, companyNames.get(p.companyId) ?? 'Company', total, close));
  return { rows, totalCount: total, closeMatches: close && rows.length > 0 };
}

// ---------------------------------------------------------------------------
// Drug page

export function offlineProductDetail(
  catalog: OfflineCatalog,
  productId: string,
  countryName: (code: string | null | undefined) => string | null
): CatalogProduct | null {
  const p = catalog.products.find((x) => x.id === productId);
  if (!p) return null;
  const company = catalog.companies.find((c) => c.id === p.companyId);
  const agent = p.agentCompanyId ? catalog.companies.find((c) => c.id === p.agentCompanyId) : undefined;
  const specNames = new Map(catalog.specialties.map((s) => [s.id, s.name]));
  const specialtyIds = p.specialtyIds ?? [];
  const marketId = `offline-${p.id}`;
  const when = p.publishedAt ?? catalog.generatedAt;
  return {
    id: p.id,
    companyId: p.companyId,
    companyName: company?.name ?? 'Company',
    companyStatus: 'verified',
    companyOriginCountryCode: company?.originCountryCode ?? null,
    companyOriginCountryName: countryName(company?.originCountryCode),
    agentCompanyId: p.agentCompanyId ?? null,
    agentCompanyName: agent?.name ?? null,
    genericDrugId: null,
    genericNameEn: p.generic ?? null,
    drugClassId: '',
    drugClassNameEn: p.drugClass ?? 'Unclassified',
    category: p.category,
    status: 'published',
    brandNameEn: p.brand || 'Untitled Product',
    market: {
      id: marketId,
      productId: p.id,
      strength: p.strength ?? '',
      dosageForm: p.dosageForm ?? '',
      route: p.route ?? '',
      packSize: p.packSize ?? '',
      marketStatus: 'marketed_in_iraq',
      registrationStatus: 'not_recorded',
      registrationNumber: null,
      registrationAuthority: null,
      registrationExpiresOn: null,
    },
    marketTranslations: {
      en: {
        productMarketId: marketId,
        locale: 'en',
        storageConditions: p.storage ?? '',
        approvedIndications: p.indications ?? '',
        usualAdultDose: p.dose ?? '',
        contraindications: p.contraindications ?? '',
        commonAdverseEffects: p.adverseEffects ?? '',
      },
    },
    specialtyIds,
    specialtyNamesEn: specialtyIds.map((id) => specNames.get(id)).filter((n): n is string => Boolean(n)),
    media: [],
    brochures: [],
    searchKeywords: [],
    submittedAt: when,
    reviewedAt: when,
    reviewReason: null,
    createdAt: when,
    updatedAt: when,
  };
}

// ---------------------------------------------------------------------------
// Other brands, company pages and the companies list

function companyTypeOf(value: string | undefined): CompanyType {
  return value === 'agent' || value === 'both' ? value : 'manufacturer';
}

/** Other brands of the same medicine (like get_product_alternatives). */
export function offlineAlternatives(catalog: OfflineCatalog, productId: string, limit = 20): ProductAlternative[] {
  const p = catalog.products.find((x) => x.id === productId);
  const generic = p?.nGeneric;
  if (!p || !generic) return [];
  const companies = new Map(catalog.companies.map((c) => [c.id, c]));
  const strength = normalizeSearchText(p.strength);
  const form = normalizeSearchText(p.dosageForm);
  return catalog.products
    .filter((x) => x.id !== p.id && x.nGeneric === generic)
    .map((x) => {
      const company = companies.get(x.companyId);
      return {
        productId: x.id,
        brandNameEn: x.brand || 'Untitled Product',
        companyId: x.companyId,
        companyName: company?.name ?? 'Company',
        originCountryCode: company?.originCountryCode ?? null,
        originCountryName: countryNameFromCode(company?.originCountryCode),
        strength: x.strength ?? null,
        dosageForm: x.dosageForm ?? null,
        sameStrength: Boolean(strength) && normalizeSearchText(x.strength) === strength,
        sameForm: Boolean(form) && normalizeSearchText(x.dosageForm) === form,
      };
    })
    .sort(
      (a, b) =>
        Number(b.sameStrength) - Number(a.sameStrength) ||
        Number(b.sameForm) - Number(a.sameForm) ||
        a.brandNameEn.localeCompare(b.brandNameEn)
    )
    .slice(0, limit);
}

/** A company page from the saved catalog (no pictures or features offline). */
export function offlineCompanyPage(catalog: OfflineCatalog, companyId: string): CompanyPage | null {
  const c = catalog.companies.find((x) => x.id === companyId);
  if (!c) return null;
  const names = new Map(catalog.companies.map((x) => [x.id, x.name]));
  const own = catalog.products.filter((p) => p.companyId === c.id);
  const viaAgent = catalog.products.filter((p) => p.agentCompanyId === c.id && p.companyId !== c.id);
  const link = (id: string) => ({ id, name: names.get(id) ?? 'Company' });
  const agents = [...new Set(own.map((p) => p.agentCompanyId).filter((id): id is string => Boolean(id) && id !== c.id))];
  const represents = [...new Set(viaAgent.map((p) => p.companyId))];
  return {
    id: c.id,
    name: c.name,
    legalName: c.legalName ?? null,
    companyType: companyTypeOf(c.type),
    originCountryCode: c.originCountryCode ?? null,
    originCountryName: countryNameFromCode(c.originCountryCode),
    tagline: c.tagline ?? null,
    description: c.description ?? null,
    foundedYear: typeof c.foundedYear === 'number' ? c.foundedYear : null,
    websiteUrl: c.websiteUrl ?? null,
    contactEmail: null,
    contactPhone: null,
    logoPath: null,
    coverPath: null,
    agents: agents.map(link),
    represents: represents.map(link),
    gallery: [],
    feature: null,
    products: [...own, ...viaAgent].map((p) => ({
      productId: p.id,
      brandNameEn: p.brand || 'Untitled Product',
      genericNameEn: p.generic ?? null,
      drugClassNameEn: p.drugClass ?? null,
      category: p.category,
      strength: p.strength ?? null,
      dosageForm: p.dosageForm ?? null,
      manufacturerId: p.companyId,
      manufacturerName: names.get(p.companyId) ?? 'Company',
      viaAgent: p.companyId !== c.id,
    })),
  };
}

/** The companies list from the saved catalog (companies with drugs, A–Z). */
export function offlineCompanyDirectory(catalog: OfflineCatalog): CompanyDirectoryEntry[] {
  const counts = new Map<string, number>();
  for (const p of catalog.products) {
    counts.set(p.companyId, (counts.get(p.companyId) ?? 0) + 1);
    if (p.agentCompanyId && p.agentCompanyId !== p.companyId) {
      counts.set(p.agentCompanyId, (counts.get(p.agentCompanyId) ?? 0) + 1);
    }
  }
  return catalog.companies
    .filter((c) => (counts.get(c.id) ?? 0) > 0)
    .map((c) => ({
      companyId: c.id,
      companyName: c.name,
      companyType: companyTypeOf(c.type),
      originCountryCode: c.originCountryCode ?? null,
      originCountryName: countryNameFromCode(c.originCountryCode),
      tagline: c.tagline ?? null,
      logoPath: null,
      productCount: counts.get(c.id) ?? 0,
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}
