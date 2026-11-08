import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { countryNameFromCode, type CompanyType } from './companies';

// ---------- Database Enums ----------
export type ProductStatus =
  | 'draft'
  | 'submitted'
  | 'changes_requested'
  | 'published'
  | 'hidden'
  | 'archived';

export type ProductCategory =
  | 'prescription_drug'
  | 'otc_drug'
  | 'dietary_supplement';

export type ContentLocale = 'en';

export type IraqMarketStatus =
  | 'marketed_in_iraq'
  | 'not_marketed'
  | 'discontinued';

export type ProductRegistrationStatus =
  | 'not_recorded'
  | 'registered'
  | 'expired'
  | 'withdrawn';

// ---------- Domain Models ----------
export interface TaxonomyItem {
  id: string;
  code: string;
  nameEn: string;
  parentId?: string | null;
  drugClassId?: string | null;
  isActive: boolean;
}

export interface CompanySummary {
  id: string;
  companyName: string;
  legalName?: string;
  status: string;
  countryId?: string | null;
  cityId?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  websiteUrl?: string | null;
  description?: string | null;
  /** manufacturer | agent | both (see src/lib/companies.ts). */
  companyType?: CompanyType;
  /** Manufacturer home country, ISO code such as "CH". */
  originCountryCode?: string | null;
}

export interface ProductMarketRecord {
  id: string;
  productId: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  marketStatus: IraqMarketStatus;
  registrationStatus: ProductRegistrationStatus;
  registrationNumber: string | null;
  registrationAuthority: string | null;
  registrationExpiresOn: string | null;
}

export interface ProductMarketTranslationRecord {
  productMarketId: string;
  locale: ContentLocale;
  storageConditions: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
}

export interface ProductMediaRecord {
  id: string;
  productId: string;
  mediaType: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  sortOrder: number;
  isPrimary: boolean;
}

export interface ProductBrochureRecord {
  id: string;
  productMarketId: string;
  locale: ContentLocale;
  title: string;
  storagePath: string;
  mimeType: string;
  fileSizeBytes: number;
  version: number;
  isCurrent: boolean;
}

export interface CatalogProduct {
  id: string;
  companyId: string;
  companyName: string;
  companyStatus: string | null;
  /** Manufacturer home country (ISO code) and its English name, when known. */
  companyOriginCountryCode?: string | null;
  companyOriginCountryName?: string | null;
  /** Optional Iraq agent / scientific office for this product. */
  agentCompanyId?: string | null;
  agentCompanyName?: string | null;
  genericDrugId: string | null;
  genericNameEn: string | null;
  drugClassId: string;
  drugClassNameEn: string;
  category: ProductCategory;
  status: ProductStatus;
  brandNameEn: string;
  market: ProductMarketRecord | null;
  marketTranslations: Record<ContentLocale, ProductMarketTranslationRecord | null>;
  specialtyIds: string[];
  specialtyNamesEn: string[];
  media: ProductMediaRecord[];
  brochures: ProductBrochureRecord[];
  searchKeywords: string[];
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewReason: string | null;
  createdAt: string;
  updatedAt: string;
  hasAiDraft?: boolean;
  aiSources?: AiDraftSource[];
}

export interface CatalogBundle {
  products: CatalogProduct[];
  companies: CompanySummary[];
  drugClasses: TaxonomyItem[];
  genericDrugs: TaxonomyItem[];
  specialties: TaxonomyItem[];
}

export interface DoctorSearchRow {
  productId: string;
  brandNameEn: string;
  genericNameEn: string | null;
  companyId: string;
  companyName: string;
  drugClassNameEn: string | null;
  category: ProductCategory;
  strength: string | null;
  dosageForm: string | null;
  publishedAt: string | null;
  totalCount: number;
  /** 'close' = shown because of a close spelling (no exact match). */
  matchKind?: 'exact' | 'close';
}

export interface DoctorHomeSuggestion {
  productId: string;
  brandNameEn: string;
  genericNameEn: string | null;
  companyId: string;
  companyName: string;
  drugClassNameEn: string | null;
  category: ProductCategory;
  strength: string | null;
  dosageForm: string | null;
  specialtyId: string;
  specialtyName: string;
}

export function parseProductRoute(hashOrRoute: string): string | null {
  const cleaned = hashOrRoute.replace(/^#/, '').trim();
  const match = cleaned.match(/^\/?product\/([^/?#]+)\/?$/i);
  if (!match) return null;
  try {
    const decoded = decodeURIComponent(match[1]).trim();
    return decoded.length > 0 ? decoded : null;
  } catch {
    const raw = match[1].trim();
    return raw.length > 0 ? raw : null;
  }
}

export function buildProductRouteHash(productId: string): string {
  return `#/product/${encodeURIComponent(productId.trim())}`;
}

export interface SearchCatalogProductsInput {
  query?: string | null;
  companyId?: string | null;
  specialtyId?: string | null;
  limit?: number;
  offset?: number;
}

export interface CreateDraftInput {
  companyId: string;
  category: ProductCategory;
  genericDrugId: string | null;
  drugClassId: string;
  englishBrandName: string;
}

export interface UpdateDraftInput {
  productId: string;
  category: ProductCategory;
  genericDrugId: string | null;
  drugClassId: string;
}

export interface UpsertMarketInput {
  productId: string;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  marketStatus: IraqMarketStatus;
  registrationStatus: ProductRegistrationStatus;
  registrationNumber: string;
  registrationAuthority: string;
  registrationExpiresOn: string;
}

export interface UpsertMarketTranslationInput {
  productId: string;
  locale: ContentLocale;
  storageConditions: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
}

export type RpcResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string; reasons?: string[]; quota?: boolean };

export const PUBLISH_CHECKLIST_MESSAGES: Record<string, string> = {
  english_product_translation_missing: 'English brand name is missing',
  iraq_market_missing: 'Iraq market details are missing',
  english_iraq_content_missing:
    'English clinical information is incomplete (all 5 fields)',
  not_marketed_in_iraq: 'Market status must be "Marketed in Iraq" to publish',
  active_specialty_missing: 'Choose at least one specialty',
  generic_drug_not_active: 'Generic drug is missing or inactive',
  generic_composition_invalid: 'Generic drug is missing or inactive',
  drug_class_not_active: 'Drug class is inactive',
  company_not_verified: 'Company is not active',
  presentation_fingerprint_missing:
    'Save the Iraq market details and English brand name first',
  duplicate_presentation:
    'This company already has a product with the same presentation',
};

export function parsePublishChecklistErrors(
  errorOrDetails:
    | PostgrestError
    | { message?: string; details?: string | null; code?: string }
    | string
    | null
    | undefined
): string[] {
  if (!errorOrDetails) return [];
  const rawDetails =
    typeof errorOrDetails === 'string'
      ? errorOrDetails
      : errorOrDetails.details || errorOrDetails.message || '';

  const tokens = rawDetails
    .replace(/[()]/g, ',')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const reasons: string[] = [];
  for (const token of tokens) {
    const mapped = PUBLISH_CHECKLIST_MESSAGES[token];
    if (mapped && !reasons.includes(mapped)) {
      reasons.push(mapped);
    }
  }
  return reasons;
}

// ---------- Labels & Formatting Helpers ----------
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  prescription_drug: 'Prescription (Rx)',
  otc_drug: 'Over-the-Counter (OTC)',
  dietary_supplement: 'Dietary Supplement',
};

export const STATUS_LABELS: Record<ProductStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted',
  changes_requested: 'Changes Requested',
  published: 'Published',
  hidden: 'Hidden',
  archived: 'Archived',
};

export const MARKET_STATUS_LABELS: Record<IraqMarketStatus, string> = {
  marketed_in_iraq: 'Marketed in Iraq',
  not_marketed: 'Not Marketed',
  discontinued: 'Discontinued',
};

export const REGISTRATION_STATUS_LABELS: Record<ProductRegistrationStatus, string> = {
  not_recorded: 'Not Recorded',
  registered: 'Registered',
  expired: 'Expired',
  withdrawn: 'Withdrawn',
};

export function findMatchingTaxonomyOption(
  items: TaxonomyItem[],
  rawName: string | null | undefined
): TaxonomyItem | null {
  const trimmed = rawName?.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  const slug = lower.replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  return (
    items.find(
      (item) =>
        item.nameEn.trim().toLowerCase() === lower ||
        (slug.length > 0 && item.code.trim().toLowerCase() === slug)
    ) ?? null
  );
}

export function trimOrNull(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function formatRpcError(
  error: PostgrestError | { message: string; details?: string | null }
): string {
  const base = error.message || 'Database operation failed.';
  const details = 'details' in error && error.details ? error.details.trim() : '';
  if (details && !base.includes(details)) {
    return `${base} (${details})`;
  }
  return base;
}

export function buildUpsertMarketArgs(input: UpsertMarketInput) {
  const isNotRecorded = input.registrationStatus === 'not_recorded';
  return {
    p_product_id: input.productId,
    p_strength: input.strength.trim(),
    p_dosage_form: input.dosageForm.trim(),
    p_route: input.route.trim(),
    p_pack_size: input.packSize.trim(),
    p_market_status: input.marketStatus,
    p_registration_status: input.registrationStatus,
    p_registration_number: isNotRecorded ? null : trimOrNull(input.registrationNumber),
    p_registration_authority: isNotRecorded
      ? null
      : trimOrNull(input.registrationAuthority),
    p_registration_expires_on: isNotRecorded
      ? null
      : trimOrNull(input.registrationExpiresOn),
  };
}

export interface DoctorFilterOptions {
  query: string;
  drugClassId: string;
  category: string;
  companyId?: string;
}

export function filterDoctorProducts(
  products: CatalogProduct[],
  filters: DoctorFilterOptions
): CatalogProduct[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.companyId && product.companyId !== filters.companyId) {
      return false;
    }
    if (filters.drugClassId && product.drugClassId !== filters.drugClassId) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (!normalizedQuery) {
      return true;
    }

    const haystacks: Array<string | null> = [
      product.brandNameEn,
      product.genericNameEn,
      product.companyName,
      product.drugClassNameEn,
      ...product.searchKeywords,
    ];

    return haystacks.some(
      (field) => field !== null && field.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function filterProductsByStatus(
  products: CatalogProduct[],
  statusFilter: ProductStatus | 'all'
): CatalogProduct[] {
  if (statusFilter === 'all') return products;
  return products.filter((p) => p.status === statusFilter);
}

// ---------- Flat Table Loaders (No PostgREST Embedded Joins) ----------

interface RawProductRow {
  id: string;
  company_id: string;
  generic_drug_id: string | null;
  drug_class_id: string;
  category: ProductCategory;
  status: ProductStatus;
  submitted_at: string | null;
  reviewed_at: string | null;
  review_reason: string | null;
  created_at: string;
  updated_at: string;
  agent_company_id?: string | null;
}

interface RawTranslationRow {
  product_id: string;
  locale: ContentLocale;
  brand_name: string;
}

interface RawMarketRow {
  id: string;
  product_id: string;
  strength: string;
  dosage_form: string;
  route: string;
  pack_size: string;
  market_status: IraqMarketStatus;
  registration_status: ProductRegistrationStatus;
  registration_number: string | null;
  registration_authority: string | null;
  registration_expires_on: string | null;
}

interface RawMarketTranslationRow {
  product_market_id: string;
  locale: ContentLocale;
  storage_conditions: string;
  approved_indications: string;
  usual_adult_dose: string;
  contraindications: string;
  common_adverse_effects: string;
}

interface RawProductSpecialtyRow {
  product_id: string;
  specialty_id: string;
}

interface RawMediaRow {
  id: string;
  product_id: string;
  media_type: string;
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  sort_order: number;
  is_primary: boolean;
}

interface RawBrochureRow {
  id: string;
  product_market_id: string;
  locale: ContentLocale;
  title: string;
  storage_path: string;
  mime_type: string;
  file_size_bytes: number;
  version: number;
  is_current: boolean;
}

interface RawKeywordRow {
  product_id: string;
  locale: string;
  keyword: string;
  keyword_type: string;
}

export const CATALOG_ID_CHUNK_SIZE = 150;
export const CATALOG_PAGE_SIZE = 1000;

export async function fetchAllPages<T>(
  buildPageQuery: (
    from: number,
    to: number
  ) => PromiseLike<{ data: T[] | null; error: PostgrestError | null }>,
  pageSize = CATALOG_PAGE_SIZE
): Promise<{ data: T[]; error: PostgrestError | null }> {
  const merged: T[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await buildPageQuery(from, from + pageSize - 1);
    if (error) {
      return { data: merged, error };
    }
    const batch = data ?? [];
    merged.push(...batch);
    if (batch.length < pageSize) {
      break;
    }
    from += pageSize;
  }

  return { data: merged, error: null };
}

export async function fetchInChunksPaged<T>(
  ids: readonly string[],
  buildChunkQuery: (
    chunkIds: string[],
    from: number,
    to: number
  ) => PromiseLike<{ data: T[] | null; error: PostgrestError | null }>,
  chunkSize = CATALOG_ID_CHUNK_SIZE,
  pageSize = CATALOG_PAGE_SIZE
): Promise<{ data: T[]; error: PostgrestError | null }> {
  if (ids.length === 0) {
    return { data: [], error: null };
  }

  const merged: T[] = [];
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunkIds = ids.slice(i, i + chunkSize);
    const pageRes = await fetchAllPages(
      (from, to) => buildChunkQuery(chunkIds, from, to),
      pageSize
    );
    if (pageRes.error) {
      return { data: merged, error: pageRes.error };
    }
    merged.push(...pageRes.data);
  }

  return { data: merged, error: null };
}

export async function loadDrugClasses(client: SupabaseClient): Promise<TaxonomyItem[]> {
  const { data: classesData, error: classesError } = await fetchAllPages<{
    id: string;
    code: string;
    parent_drug_class_id: string | null;
    is_active: boolean;
  }>((from, to) =>
    client
      .from('drug_classes')
      .select('id,code,parent_drug_class_id,is_active')
      .order('id')
      .range(from, to)
  );

  if (classesError || !classesData || classesData.length === 0) {
    return [];
  }

  const rows = classesData;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await fetchInChunksPaged<{
    drug_class_id: string;
    locale: ContentLocale;
    name: string;
  }>(ids, (chunkIds, from, to) =>
    client
      .from('drug_class_translations')
      .select('drug_class_id,locale,name')
      .in('drug_class_id', chunkIds)
      .order('id')
      .range(from, to)
  );

  const byId = new Map<string, string>();
  for (const t of transData) {
    if (t.locale === 'en' || !byId.has(t.drug_class_id)) {
      byId.set(t.drug_class_id, t.name);
    }
  }

  return rows
    .map((r) => ({
      id: r.id,
      code: r.code,
      nameEn: byId.get(r.id) ?? r.code,
      parentId: r.parent_drug_class_id,
      isActive: r.is_active,
    }))
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export async function loadGenericDrugs(client: SupabaseClient): Promise<TaxonomyItem[]> {
  const { data: genericsData, error: genericsError } = await fetchAllPages<{
    id: string;
    code: string;
    drug_class_id: string;
    is_active: boolean;
  }>((from, to) =>
    client
      .from('generic_drugs')
      .select('id,code,drug_class_id,is_active')
      .order('id')
      .range(from, to)
  );

  if (genericsError || !genericsData || genericsData.length === 0) {
    return [];
  }

  const rows = genericsData;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await fetchInChunksPaged<{
    generic_drug_id: string;
    locale: ContentLocale;
    name: string;
  }>(ids, (chunkIds, from, to) =>
    client
      .from('generic_drug_translations')
      .select('generic_drug_id,locale,name')
      .in('generic_drug_id', chunkIds)
      .order('id')
      .range(from, to)
  );

  const byId = new Map<string, string>();
  for (const t of transData) {
    if (t.locale === 'en' || !byId.has(t.generic_drug_id)) {
      byId.set(t.generic_drug_id, t.name);
    }
  }

  return rows
    .map((r) => ({
      id: r.id,
      code: r.code,
      nameEn: byId.get(r.id) ?? r.code,
      drugClassId: r.drug_class_id,
      isActive: r.is_active,
    }))
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export async function loadSpecialtiesCatalog(client: SupabaseClient): Promise<TaxonomyItem[]> {
  const { data: specData, error: specError } = await fetchAllPages<{
    id: string;
    code: string;
    is_active: boolean;
  }>((from, to) =>
    client
      .from('specialties')
      .select('id,code,is_active')
      .eq('is_active', true)
      .order('id')
      .range(from, to)
  );

  if (specError || !specData || specData.length === 0) {
    return [];
  }

  const rows = specData;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await fetchInChunksPaged<{
    specialty_id: string;
    locale: ContentLocale;
    name: string;
  }>(ids, (chunkIds, from, to) =>
    client
      .from('specialty_translations')
      .select('specialty_id,locale,name')
      .in('specialty_id', chunkIds)
      .order('id')
      .range(from, to)
  );

  const byId = new Map<string, string>();
  for (const t of transData) {
    if (t.locale === 'en' || !byId.has(t.specialty_id)) {
      byId.set(t.specialty_id, t.name);
    }
  }

  return rows
    .map((r) => ({
      id: r.id,
      code: r.code,
      nameEn: byId.get(r.id) ?? r.code,
      isActive: r.is_active,
    }))
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export async function loadCompanies(client: SupabaseClient): Promise<CompanySummary[]> {
  const { data, error } = await fetchAllPages<{
    id: string;
    company_name: string;
    legal_name?: string;
    status: string;
    country_id?: string | null;
    city_id?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    website_url?: string | null;
    description?: string | null;
    company_type?: CompanyType | null;
    origin_country_code?: string | null;
  }>((from, to) =>
    client
      .from('companies')
      .select(
        'id,company_name,legal_name,status,country_id,city_id,contact_email,contact_phone,website_url,description,company_type,origin_country_code'
      )
      .neq('status', 'archived')
      .order('company_name')
      .order('id')
      .range(from, to)
  );

  if (error || !data) return [];

  return data
    .filter((c) => c.status !== 'archived')
    .map((c) => ({
      id: c.id,
      companyName: c.company_name,
      legalName: c.legal_name ?? c.company_name,
      status: c.status,
      countryId: c.country_id ?? null,
      cityId: c.city_id ?? null,
      contactEmail: c.contact_email ?? null,
      contactPhone: c.contact_phone ?? null,
      websiteUrl: c.website_url ?? null,
      description: c.description ?? null,
      companyType: c.company_type ?? 'manufacturer',
      originCountryCode: c.origin_country_code ?? null,
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export async function loadVerifiedCompanies(
  client: SupabaseClient
): Promise<CompanySummary[]> {
  const { data, error } = await fetchAllPages<{
    id: string;
    company_name: string;
    legal_name?: string;
    status: string;
  }>((from, to) =>
    client
      .from('companies')
      .select('id,company_name,legal_name,status')
      .eq('status', 'verified')
      .order('company_name')
      .order('id')
      .range(from, to)
  );

  if (error || !data) return [];

  return data
    .filter((c) => c.status === 'verified')
    .map((c) => ({
      id: c.id,
      companyName: c.company_name,
      legalName: c.legal_name ?? c.company_name,
      status: c.status,
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export async function searchCatalogProducts(
  client: SupabaseClient,
  input: SearchCatalogProductsInput = {}
): Promise<RpcResult<{ rows: DoctorSearchRow[]; totalCount: number; closeMatches: boolean }>> {
  // v2: typo tolerance, synonyms, drug classes, several words; adds match_kind.
  const { data, error } = await client.rpc('search_catalog_products_v2', {
    p_query: trimOrNull(input.query),
    p_company_id: trimOrNull(input.companyId),
    p_specialty_id: trimOrNull(input.specialtyId),
    p_limit: input.limit ?? 20,
    p_offset: input.offset ?? 0,
  });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }

  const rawRows = (data ?? []) as Array<{
    product_id: string;
    brand_name_en: string | null;
    brand_name_ar: string | null;
    generic_name_en: string | null;
    company_id: string;
    company_name: string | null;
    drug_class_name_en: string | null;
    category: ProductCategory;
    strength: string | null;
    dosage_form: string | null;
    published_at: string | null;
    total_count: number | string | null;
    match_kind?: 'exact' | 'close' | null;
  }>;

  const rows: DoctorSearchRow[] = rawRows.map((row) => ({
    productId: row.product_id,
    brandNameEn: row.brand_name_en ?? 'Untitled Product',
    genericNameEn: row.generic_name_en ?? null,
    companyId: row.company_id,
    companyName: row.company_name ?? 'Company',
    drugClassNameEn: row.drug_class_name_en ?? null,
    category: row.category,
    strength: row.strength ?? null,
    dosageForm: row.dosage_form ?? null,
    publishedAt: row.published_at ?? null,
    totalCount: Number(row.total_count ?? 0),
    matchKind: row.match_kind === 'close' ? 'close' : 'exact',
  }));

  const totalCount = rows.length > 0 ? rows[0].totalCount : 0;
  const closeMatches = rows.length > 0 && rows.every((row) => row.matchKind === 'close');
  return { ok: true, data: { rows, totalCount, closeMatches } };
}

export async function loadDoctorHomeSuggestions(
  client: SupabaseClient,
  limit = 2,
  seed = 0
): Promise<RpcResult<DoctorHomeSuggestion[]>> {
  // seed 0 = today's pair; Refresh passes 1, 2, 3... for another pair.
  const { data, error } = await client.rpc('doctor_home_suggestions', {
    p_limit: limit,
    p_seed: seed,
  });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }

  const rawRows = (data ?? []) as Array<{
    product_id: string;
    brand_name_en: string | null;
    generic_name_en: string | null;
    company_id: string;
    company_name: string | null;
    drug_class_name_en: string | null;
    category: ProductCategory;
    strength: string | null;
    dosage_form: string | null;
    specialty_id: string;
    specialty_name: string | null;
  }>;

  const rows: DoctorHomeSuggestion[] = rawRows.map((row) => ({
    productId: row.product_id,
    brandNameEn: row.brand_name_en ?? 'Untitled Product',
    genericNameEn: row.generic_name_en ?? null,
    companyId: row.company_id,
    companyName: row.company_name ?? 'Company',
    drugClassNameEn: row.drug_class_name_en ?? null,
    category: row.category,
    strength: row.strength ?? null,
    dosageForm: row.dosage_form ?? null,
    specialtyId: row.specialty_id,
    specialtyName: row.specialty_name ?? 'Medical Specialty',
  }));

  return { ok: true, data: rows };
}

export async function loadProductDetail(
  client: SupabaseClient,
  productId: string
): Promise<RpcResult<CatalogProduct>> {
  const cleanId = trimOrNull(productId);
  if (!cleanId) {
    return { ok: false, message: 'Product ID is required.' };
  }

  const [
    productRes,
    transRes,
    marketsRes,
    specRes,
    mediaRes,
    keywordsRes,
  ] = await Promise.all([
    client
      .from('products')
      .select(
        'id,company_id,agent_company_id,generic_drug_id,drug_class_id,category,status,submitted_at,reviewed_at,review_reason,created_at,updated_at'
      )
      .eq('id', cleanId)
      .maybeSingle(),
    client
      .from('product_translations')
      .select('product_id,locale,brand_name')
      .eq('product_id', cleanId),
    client
      .from('product_markets')
      .select(
        'id,product_id,strength,dosage_form,route,pack_size,market_status,registration_status,registration_number,registration_authority,registration_expires_on'
      )
      .eq('product_id', cleanId),
    client
      .from('product_specialties')
      .select('product_id,specialty_id')
      .eq('product_id', cleanId),
    client
      .from('product_media')
      .select(
        'id,product_id,media_type,storage_path,mime_type,file_size_bytes,sort_order,is_primary'
      )
      .eq('product_id', cleanId),
    client
      .from('product_search_keywords')
      .select('product_id,locale,keyword,keyword_type')
      .eq('product_id', cleanId),
  ]);

  if (productRes.error) {
    return { ok: false, message: formatRpcError(productRes.error) };
  }
  const productRow = productRes.data as RawProductRow | null;
  if (!productRow) {
    return { ok: false, message: 'Product not found.' };
  }

  const transRows = (transRes.data ?? []) as RawTranslationRow[];
  const marketRows = (marketsRes.data ?? []) as RawMarketRow[];
  const specRows = (specRes.data ?? []) as RawProductSpecialtyRow[];
  const mediaRows = (mediaRes.data ?? []) as RawMediaRow[];
  const keywordRows = (keywordsRes.data ?? []) as RawKeywordRow[];

  const rawMarket = marketRows[0] ?? null;
  const specialtyIds = specRows.map((s) => s.specialty_id);

  const [
    companyRes,
    agentRes,
    drugClassTransRes,
    genericTransRes,
    marketTransRes,
    brochuresRes,
    specTransRes,
  ] = await Promise.all([
    client
      .from('companies')
      .select('id,company_name,status,origin_country_code')
      .eq('id', productRow.company_id)
      .maybeSingle(),
    productRow.agent_company_id
      ? client
          .from('companies')
          .select('id,company_name')
          .eq('id', productRow.agent_company_id)
          .maybeSingle()
      : Promise.resolve({ data: null, error: null }),
    client
      .from('drug_class_translations')
      .select('drug_class_id,locale,name')
      .eq('drug_class_id', productRow.drug_class_id),
    productRow.generic_drug_id
      ? client
          .from('generic_drug_translations')
          .select('generic_drug_id,locale,name')
          .eq('generic_drug_id', productRow.generic_drug_id)
      : Promise.resolve({ data: [], error: null }),
    rawMarket
      ? client
          .from('product_market_translations')
          .select(
            'product_market_id,locale,storage_conditions,approved_indications,usual_adult_dose,contraindications,common_adverse_effects'
          )
          .eq('product_market_id', rawMarket.id)
      : Promise.resolve({ data: [], error: null }),
    rawMarket
      ? client
          .from('product_brochures')
          .select(
            'id,product_market_id,locale,title,storage_path,mime_type,file_size_bytes,version,is_current'
          )
          .eq('product_market_id', rawMarket.id)
      : Promise.resolve({ data: [], error: null }),
    specialtyIds.length > 0
      ? client
          .from('specialty_translations')
          .select('specialty_id,locale,name')
          .in('specialty_id', specialtyIds)
      : Promise.resolve({ data: [], error: null }),
  ]);

  const companyData = companyRes.data as {
    id: string;
    company_name: string;
    status: string;
    origin_country_code?: string | null;
  } | null;
  const agentData = agentRes.data as { id: string; company_name: string } | null;

  let brandNameEn = 'Untitled Product';
  for (const t of transRows) {
    if (t.locale === 'en') brandNameEn = t.brand_name;
  }

  let drugClassNameEn = 'Unclassified';
  for (const t of (drugClassTransRes.data ?? []) as Array<{
    locale: ContentLocale;
    name: string;
  }>) {
    if (t.locale === 'en' || drugClassNameEn === 'Unclassified') {
      drugClassNameEn = t.name;
    }
  }

  let genericNameEn: string | null = null;
  for (const t of (genericTransRes.data ?? []) as Array<{
    locale: ContentLocale;
    name: string;
  }>) {
    if (t.locale === 'en' || !genericNameEn) {
      genericNameEn = t.name;
    }
  }

  const market: ProductMarketRecord | null = rawMarket
    ? {
        id: rawMarket.id,
        productId: rawMarket.product_id,
        strength: rawMarket.strength,
        dosageForm: rawMarket.dosage_form,
        route: rawMarket.route,
        packSize: rawMarket.pack_size,
        marketStatus: rawMarket.market_status,
        registrationStatus: rawMarket.registration_status,
        registrationNumber: rawMarket.registration_number,
        registrationAuthority: rawMarket.registration_authority,
        registrationExpiresOn: rawMarket.registration_expires_on,
      }
    : null;

  const marketTranslations: Record<
    ContentLocale,
    ProductMarketTranslationRecord | null
  > = {
    en: null,
  };
  for (const row of (marketTransRes.data ?? []) as RawMarketTranslationRow[]) {
    if (row.locale === 'en') {
      marketTranslations.en = {
        productMarketId: row.product_market_id,
        locale: 'en',
        storageConditions: row.storage_conditions,
        approvedIndications: row.approved_indications,
        usualAdultDose: row.usual_adult_dose,
        contraindications: row.contraindications,
        commonAdverseEffects: row.common_adverse_effects,
      };
    }
  }

  const specNameById = new Map<string, string>();
  for (const row of (specTransRes.data ?? []) as Array<{
    specialty_id: string;
    locale: ContentLocale;
    name: string;
  }>) {
    if (row.locale === 'en' || !specNameById.has(row.specialty_id)) {
      specNameById.set(row.specialty_id, row.name);
    }
  }
  const specialtyNamesEn = specialtyIds
    .map((id) => specNameById.get(id))
    .filter((n): n is string => Boolean(n));

  const media: ProductMediaRecord[] = mediaRows.map((row) => ({
    id: row.id,
    productId: row.product_id,
    mediaType: row.media_type,
    storagePath: row.storage_path,
    mimeType: row.mime_type,
    fileSizeBytes: row.file_size_bytes,
    sortOrder: row.sort_order,
    isPrimary: row.is_primary,
  }));

  const brochures: ProductBrochureRecord[] = (
    (brochuresRes.data ?? []) as RawBrochureRow[]
  ).map((row) => ({
    id: row.id,
    productMarketId: row.product_market_id,
    locale: row.locale,
    title: row.title,
    storagePath: row.storage_path,
    mimeType: row.mime_type,
    fileSizeBytes: row.file_size_bytes,
    version: row.version,
    isCurrent: row.is_current,
  }));

  const searchKeywords = keywordRows
    .filter((row) => row.locale === 'en' || row.locale === 'und')
    .map((row) => row.keyword);

  return {
    ok: true,
    data: {
      id: productRow.id,
      companyId: productRow.company_id,
      companyName: companyData?.company_name ?? 'Company',
      companyStatus: companyData?.status ?? null,
      companyOriginCountryCode: companyData?.origin_country_code ?? null,
      companyOriginCountryName: countryNameFromCode(companyData?.origin_country_code),
      agentCompanyId: productRow.agent_company_id ?? null,
      agentCompanyName: agentData?.company_name ?? null,
      genericDrugId: productRow.generic_drug_id,
      genericNameEn,
      drugClassId: productRow.drug_class_id,
      drugClassNameEn,
      category: productRow.category,
      status: productRow.status,
      brandNameEn,
      market,
      marketTranslations,
      specialtyIds,
      specialtyNamesEn,
      media,
      brochures,
      searchKeywords,
      submittedAt: productRow.submitted_at,
      reviewedAt: productRow.reviewed_at,
      reviewReason: productRow.review_reason,
      createdAt: productRow.created_at,
      updatedAt: productRow.updated_at,
    },
  };
}

export function extractAiDraftSources(
  sourcesRaw: unknown,
  draftRaw?: unknown
): AiDraftSource[] {
  const combined: unknown[] = [];
  if (Array.isArray(sourcesRaw)) {
    combined.push(...sourcesRaw);
  }
  if (
    draftRaw &&
    typeof draftRaw === 'object' &&
    Array.isArray((draftRaw as { sources?: unknown }).sources)
  ) {
    combined.push(...(draftRaw as { sources: unknown[] }).sources);
  }
  const seen = new Set<string>();
  const result: AiDraftSource[] = [];
  for (const item of combined) {
    if (!item || typeof item !== 'object') continue;
    const rawUrl = (item as { url?: unknown }).url;
    const rawTitle = (item as { title?: unknown }).title;
    const url = typeof rawUrl === 'string' ? rawUrl.trim() : '';
    if (!url || !/^https?:\/\//i.test(url) || seen.has(url)) continue;
    seen.add(url);
    const title =
      typeof rawTitle === 'string' && rawTitle.trim().length > 0
        ? rawTitle.trim()
        : url;
    result.push({ title, url });
  }
  return result;
}

export function isDomainOnlySourceUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl.trim());
    const cleanPath = parsed.pathname.replace(/\/+/g, '');
    return cleanPath.length === 0 && !parsed.search;
  } catch {
    return true;
  }
}

export type ProductSourceWarning =
  | 'No source'
  | 'Weak source: company home page only'
  | null;

export function getProductSourceWarning(
  sources: AiDraftSource[] | null | undefined
): ProductSourceWarning {
  const valid = (sources ?? []).filter(
    (s) => Boolean(s?.url && s.url.trim().length > 0)
  );
  if (valid.length === 0) {
    return 'No source';
  }
  if (valid.every((s) => isDomainOnlySourceUrl(s.url))) {
    return 'Weak source: company home page only';
  }
  return null;
}

export interface CompanyProductCounts {
  drafts: number;
  published: number;
  archived: number;
}

export function getCompanyProductCounts(
  products: CatalogProduct[],
  companyId: string
): CompanyProductCounts {
  let drafts = 0;
  let published = 0;
  let archived = 0;
  for (const p of products) {
    if (p.companyId !== companyId) continue;
    if (p.status === 'draft' || p.status === 'changes_requested') {
      drafts += 1;
    } else if (p.status === 'published') {
      published += 1;
    } else if (p.status === 'archived') {
      archived += 1;
    }
  }
  return { drafts, published, archived };
}

export async function loadCompanyAiDraftSources(
  client: SupabaseClient,
  productIds: string[]
): Promise<Record<string, AiDraftSource[]>> {
  const cleaned = Array.from(new Set(productIds.filter(Boolean)));
  if (cleaned.length === 0) return {};

  const { data } = await fetchInChunksPaged<{
    product_id: string;
    sources?: unknown;
    draft?: unknown;
  }>(cleaned, (chunkIds, from, to) =>
    client
      .from('product_ai_drafts')
      .select('product_id,sources,draft')
      .in('product_id', chunkIds)
      .order('id')
      .range(from, to)
  );

  const byProduct: Record<string, AiDraftSource[]> = {};
  for (const row of data) {
    if (!row.product_id) continue;
    const extracted = extractAiDraftSources(row.sources, row.draft);
    const prev = byProduct[row.product_id] ?? [];
    byProduct[row.product_id] = extractAiDraftSources([...prev, ...extracted]);
  }
  return byProduct;
}

export async function loadCatalogBundle(
  client: SupabaseClient
): Promise<RpcResult<CatalogBundle>> {
  const { data: rawProducts, error: productsError } =
    await fetchAllPages<RawProductRow>((from, to) =>
      client
        .from('products')
        .select(
          'id,company_id,generic_drug_id,drug_class_id,category,status,submitted_at,reviewed_at,review_reason,created_at,updated_at'
        )
        .order('updated_at', { ascending: false })
        .order('id')
        .range(from, to)
    );

  if (productsError) {
    return { ok: false, message: formatRpcError(productsError) };
  }

  const [companies, drugClasses, genericDrugs, specialties] = await Promise.all([
    loadCompanies(client),
    loadDrugClasses(client),
    loadGenericDrugs(client),
    loadSpecialtiesCatalog(client),
  ]);

  const companyById = new Map(companies.map((c) => [c.id, c]));
  const productRows = (rawProducts ?? []).filter((p) =>
    companyById.has(p.company_id)
  );
  const productIds = productRows.map((p) => p.id);

  const drugClassById = new Map(drugClasses.map((d) => [d.id, d]));
  const genericById = new Map(genericDrugs.map((g) => [g.id, g]));
  const specialtyById = new Map(specialties.map((s) => [s.id, s]));

  const translationsByProduct = new Map<string, { en?: string }>();
  const marketByProduct = new Map<string, ProductMarketRecord>();
  const marketTranslationsByMarket = new Map<
    string,
    Record<ContentLocale, ProductMarketTranslationRecord | null>
  >();
  const specialtiesByProduct = new Map<string, string[]>();
  const mediaByProduct = new Map<string, ProductMediaRecord[]>();
  const brochuresByMarket = new Map<string, ProductBrochureRecord[]>();
  const keywordsByProduct = new Map<string, string[]>();
  const aiDraftProductIds = new Set<string>();
  const aiSourcesByProduct = new Map<string, AiDraftSource[]>();

  if (productIds.length > 0) {
    const [transRes, marketsRes, specRes, mediaRes, keywordsRes, aiDraftsRes] =
      await Promise.all([
        fetchInChunksPaged<RawTranslationRow>(
          productIds,
          (chunkIds, from, to) =>
            client
              .from('product_translations')
              .select('product_id,locale,brand_name')
              .in('product_id', chunkIds)
              .order('id')
              .range(from, to)
        ),
        fetchInChunksPaged<RawMarketRow>(productIds, (chunkIds, from, to) =>
          client
            .from('product_markets')
            .select(
              'id,product_id,strength,dosage_form,route,pack_size,market_status,registration_status,registration_number,registration_authority,registration_expires_on'
            )
            .in('product_id', chunkIds)
            .order('id')
            .range(from, to)
        ),
        fetchInChunksPaged<RawProductSpecialtyRow>(
          productIds,
          (chunkIds, from, to) =>
            client
              .from('product_specialties')
              .select('product_id,specialty_id')
              .in('product_id', chunkIds)
              .order('id')
              .range(from, to)
        ),
        fetchInChunksPaged<RawMediaRow>(productIds, (chunkIds, from, to) =>
          client
            .from('product_media')
            .select(
              'id,product_id,media_type,storage_path,mime_type,file_size_bytes,sort_order,is_primary'
            )
            .in('product_id', chunkIds)
            .order('id')
            .range(from, to)
        ),
        fetchInChunksPaged<RawKeywordRow>(productIds, (chunkIds, from, to) =>
          client
            .from('product_search_keywords')
            .select('product_id,locale,keyword,keyword_type')
            .in('product_id', chunkIds)
            .order('id')
            .range(from, to)
        ),
        fetchInChunksPaged<{ product_id: string; sources?: unknown }>(
          productIds,
          (chunkIds, from, to) =>
            client
              .from('product_ai_drafts')
              .select('product_id,sources')
              .in('product_id', chunkIds)
              .order('id')
              .range(from, to)
        ),
      ]);

    for (const row of aiDraftsRes.data) {
      if (row.product_id) {
        aiDraftProductIds.add(row.product_id);
        const extracted = extractAiDraftSources(row.sources);
        if (extracted.length > 0) {
          const prev = aiSourcesByProduct.get(row.product_id) ?? [];
          aiSourcesByProduct.set(
            row.product_id,
            extractAiDraftSources([...prev, ...extracted])
          );
        }
      }
    }

    for (const row of transRes.data) {
      if (row.locale === 'en') {
        const entry = translationsByProduct.get(row.product_id) ?? {};
        entry.en = row.brand_name;
        translationsByProduct.set(row.product_id, entry);
      }
    }

    const marketIds: string[] = [];
    for (const row of marketsRes.data) {
      marketIds.push(row.id);
      marketByProduct.set(row.product_id, {
        id: row.id,
        productId: row.product_id,
        strength: row.strength,
        dosageForm: row.dosage_form,
        route: row.route,
        packSize: row.pack_size,
        marketStatus: row.market_status,
        registrationStatus: row.registration_status,
        registrationNumber: row.registration_number,
        registrationAuthority: row.registration_authority,
        registrationExpiresOn: row.registration_expires_on,
      });
    }

    for (const row of specRes.data) {
      const list = specialtiesByProduct.get(row.product_id) ?? [];
      list.push(row.specialty_id);
      specialtiesByProduct.set(row.product_id, list);
    }

    for (const row of mediaRes.data) {
      const list = mediaByProduct.get(row.product_id) ?? [];
      list.push({
        id: row.id,
        productId: row.product_id,
        mediaType: row.media_type,
        storagePath: row.storage_path,
        mimeType: row.mime_type,
        fileSizeBytes: row.file_size_bytes,
        sortOrder: row.sort_order,
        isPrimary: row.is_primary,
      });
      mediaByProduct.set(row.product_id, list);
    }

    for (const row of keywordsRes.data) {
      if (row.locale === 'en' || row.locale === 'und') {
        const list = keywordsByProduct.get(row.product_id) ?? [];
        list.push(row.keyword);
        keywordsByProduct.set(row.product_id, list);
      }
    }

    if (marketIds.length > 0) {
      const [marketTransRes, brochuresRes] = await Promise.all([
        fetchInChunksPaged<RawMarketTranslationRow>(
          marketIds,
          (chunkIds, from, to) =>
            client
              .from('product_market_translations')
              .select(
                'product_market_id,locale,storage_conditions,approved_indications,usual_adult_dose,contraindications,common_adverse_effects'
              )
              .in('product_market_id', chunkIds)
              .order('id')
              .range(from, to)
        ),
        fetchInChunksPaged<RawBrochureRow>(marketIds, (chunkIds, from, to) =>
          client
            .from('product_brochures')
            .select(
              'id,product_market_id,locale,title,storage_path,mime_type,file_size_bytes,version,is_current'
            )
            .in('product_market_id', chunkIds)
            .order('id')
            .range(from, to)
        ),
      ]);

      for (const row of marketTransRes.data) {
        if (row.locale !== 'en') continue;
        const entry = marketTranslationsByMarket.get(row.product_market_id) ?? {
          en: null,
        };
        entry.en = {
          productMarketId: row.product_market_id,
          locale: 'en',
          storageConditions: row.storage_conditions,
          approvedIndications: row.approved_indications,
          usualAdultDose: row.usual_adult_dose,
          contraindications: row.contraindications,
          commonAdverseEffects: row.common_adverse_effects,
        };
        marketTranslationsByMarket.set(row.product_market_id, entry);
      }

      for (const row of brochuresRes.data) {
        const list = brochuresByMarket.get(row.product_market_id) ?? [];
        list.push({
          id: row.id,
          productMarketId: row.product_market_id,
          locale: row.locale,
          title: row.title,
          storagePath: row.storage_path,
          mimeType: row.mime_type,
          fileSizeBytes: row.file_size_bytes,
          version: row.version,
          isCurrent: row.is_current,
        });
        brochuresByMarket.set(row.product_market_id, list);
      }
    }
  }

  const products: CatalogProduct[] = productRows
    .map((row) => {
      const company = companyById.get(row.company_id);
      const drugClass = drugClassById.get(row.drug_class_id);
      const generic = row.generic_drug_id
        ? genericById.get(row.generic_drug_id)
        : undefined;
      const trans = translationsByProduct.get(row.id);
      const market = marketByProduct.get(row.id) ?? null;
      const marketTrans = market
        ? (marketTranslationsByMarket.get(market.id) ?? { en: null })
        : { en: null };
      const specIds = specialtiesByProduct.get(row.id) ?? [];
      const specNames = specIds
        .map((id) => specialtyById.get(id)?.nameEn)
        .filter((n): n is string => Boolean(n));

      return {
        id: row.id,
        companyId: row.company_id,
        companyName: company?.companyName ?? 'Company',
        companyStatus: company?.status ?? null,
        genericDrugId: row.generic_drug_id,
        genericNameEn: generic?.nameEn ?? null,
        drugClassId: row.drug_class_id,
        drugClassNameEn: drugClass?.nameEn ?? 'Unclassified',
        category: row.category,
        status: row.status,
        brandNameEn: trans?.en ?? 'Untitled Product',
        market,
        marketTranslations: marketTrans,
        specialtyIds: specIds,
        specialtyNamesEn: specNames,
        media: mediaByProduct.get(row.id) ?? [],
        brochures: market ? (brochuresByMarket.get(market.id) ?? []) : [],
        searchKeywords: keywordsByProduct.get(row.id) ?? [],
        submittedAt: row.submitted_at,
        reviewedAt: row.reviewed_at,
        reviewReason: row.review_reason,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        hasAiDraft: aiDraftProductIds.has(row.id),
        aiSources: aiSourcesByProduct.get(row.id) ?? [],
      };
    });

  return {
    ok: true,
    data: {
      products,
      companies,
      drugClasses,
      genericDrugs,
      specialties,
    },
  };
}

// ---------- Controlled RPC Wrappers ----------

export async function rpcCreateProductDraft(
  client: SupabaseClient,
  input: CreateDraftInput
): Promise<RpcResult<{ id: string }>> {
  const { data, error } = await client.rpc('create_product_draft', {
    p_company_id: input.companyId,
    p_category: input.category,
    p_generic_drug_id:
      input.category === 'dietary_supplement' && !input.genericDrugId
        ? null
        : trimOrNull(input.genericDrugId),
    p_drug_class_id: input.drugClassId,
    p_english_brand_name: input.englishBrandName.trim(),
  });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const created = data as { id: string } | null;
  if (!created?.id) {
    return { ok: false, message: 'Draft created without returning an ID.' };
  }
  return { ok: true, data: { id: created.id } };
}

export async function rpcUpdateProductDraft(
  client: SupabaseClient,
  input: UpdateDraftInput
): Promise<RpcResult> {
  const { error } = await client.rpc('update_product_draft', {
    p_product_id: input.productId,
    p_category: input.category,
    p_generic_drug_id:
      input.category === 'dietary_supplement' && !input.genericDrugId
        ? null
        : trimOrNull(input.genericDrugId),
    p_drug_class_id: input.drugClassId,
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcUpsertProductTranslation(
  client: SupabaseClient,
  productId: string,
  locale: ContentLocale,
  brandName: string
): Promise<RpcResult> {
  const { error } = await client.rpc('upsert_product_translation', {
    p_product_id: productId,
    p_locale: locale,
    p_brand_name: brandName.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcUpsertProductMarket(
  client: SupabaseClient,
  input: UpsertMarketInput
): Promise<RpcResult> {
  const args = buildUpsertMarketArgs(input);
  const { error } = await client.rpc('upsert_product_market', args);

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcUpsertProductMarketTranslation(
  client: SupabaseClient,
  input: UpsertMarketTranslationInput
): Promise<RpcResult> {
  const { error } = await client.rpc('upsert_product_market_translation', {
    p_product_id: input.productId,
    p_locale: input.locale,
    p_storage_conditions: input.storageConditions.trim(),
    p_approved_indications: input.approvedIndications.trim(),
    p_usual_adult_dose: input.usualAdultDose.trim(),
    p_contraindications: input.contraindications.trim(),
    p_common_adverse_effects: input.commonAdverseEffects.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcSetProductSpecialties(
  client: SupabaseClient,
  productId: string,
  specialtyIds: string[]
): Promise<RpcResult> {
  const uniqueIds = Array.from(new Set(specialtyIds.filter(Boolean)));
  const { error } = await client.rpc('set_product_specialties', {
    p_product_id: productId,
    p_specialty_ids: uniqueIds,
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcSubmitProductForReview(
  client: SupabaseClient,
  productId: string
): Promise<RpcResult> {
  const { error } = await client.rpc('submit_product_for_review', {
    p_product_id: productId,
  });

  if (error) {
    const reasons = parsePublishChecklistErrors(error);
    return {
      ok: false,
      message: formatRpcError(error),
      ...(reasons.length > 0 ? { reasons } : {}),
    };
  }
  return { ok: true, data: undefined };
}

export async function rpcWithdrawProductSubmission(
  client: SupabaseClient,
  productId: string
): Promise<RpcResult> {
  const { error } = await client.rpc('withdraw_product_submission', {
    p_product_id: productId,
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcArchiveOwnProduct(
  client: SupabaseClient,
  productId: string,
  reason: string
): Promise<RpcResult> {
  const { error } = await client.rpc('archive_own_product', {
    p_product_id: productId,
    p_reason: reason.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcAdminPublishProduct(
  client: SupabaseClient,
  productId: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_publish_product', {
    p_product_id: productId,
  });

  if (error) {
    const reasons = parsePublishChecklistErrors(error);
    return {
      ok: false,
      message: formatRpcError(error),
      ...(reasons.length > 0 ? { reasons } : {}),
    };
  }
  return { ok: true, data: undefined };
}

export async function publishProduct(
  client: SupabaseClient,
  product: { id: string; status: ProductStatus }
): Promise<RpcResult> {
  if (product.status === 'published') {
    return { ok: true, data: undefined };
  }

  if (product.status === 'draft' || product.status === 'changes_requested') {
    const subRes = await rpcSubmitProductForReview(client, product.id);
    if (!subRes.ok) return subRes;
  }

  return rpcAdminPublishProduct(client, product.id);
}

export interface PublishCheckedItemInput {
  id: string;
  brandNameEn: string;
  status: ProductStatus;
}

export interface PublishCheckedItemResult {
  id: string;
  brandNameEn: string;
  ok: boolean;
  message?: string;
  reasons?: string[];
}

export interface PublishCheckedSummary {
  results: PublishCheckedItemResult[];
  publishedCount: number;
  failedCount: number;
}

export async function publishCheckedProducts(
  client: SupabaseClient,
  items: PublishCheckedItemInput[],
  options?: {
    onProgress?: (
      currentIndex: number,
      total: number,
      item: PublishCheckedItemInput
    ) => void;
  }
): Promise<PublishCheckedSummary> {
  const results: PublishCheckedItemResult[] = [];
  let publishedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    options?.onProgress?.(i + 1, items.length, item);

    const subRes = await rpcSubmitProductForReview(client, item.id);
    if (!subRes.ok) {
      failedCount += 1;
      results.push({
        id: item.id,
        brandNameEn: item.brandNameEn,
        ok: false,
        message: subRes.message,
        ...(subRes.reasons ? { reasons: subRes.reasons } : {}),
      });
      continue;
    }

    const pubRes = await rpcAdminPublishProduct(client, item.id);
    if (!pubRes.ok) {
      failedCount += 1;
      results.push({
        id: item.id,
        brandNameEn: item.brandNameEn,
        ok: false,
        message: pubRes.message,
        ...(pubRes.reasons ? { reasons: pubRes.reasons } : {}),
      });
      continue;
    }

    publishedCount += 1;
    results.push({
      id: item.id,
      brandNameEn: item.brandNameEn,
      ok: true,
    });
  }

  return {
    results,
    publishedCount,
    failedCount,
  };
}

export async function rpcAdminRequestProductChanges(
  client: SupabaseClient,
  productId: string,
  reason: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_request_product_changes', {
    p_product_id: productId,
    p_reason: reason.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcAdminHideProduct(
  client: SupabaseClient,
  productId: string,
  reason: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_hide_product', {
    p_product_id: productId,
    p_reason: reason.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcAdminArchiveProduct(
  client: SupabaseClient,
  productId: string,
  reason: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_archive_product', {
    p_product_id: productId,
    p_reason: reason.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcAdminRestoreProduct(
  client: SupabaseClient,
  productId: string,
  destinationStatus: ProductStatus,
  reason: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_restore_product', {
    p_product_id: productId,
    p_destination_status: destinationStatus,
    p_reason: reason.trim(),
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export async function rpcAdminUnarchiveProduct(
  client: SupabaseClient,
  productId: string,
  reason?: string
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_unarchive_product', {
    p_product_id: productId,
    p_reason: reason?.trim() || null,
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

/**
 * Brings archived products back and publishes them, one at a time.
 * Each product is restored as a draft first, then submitted and published.
 * A product that fails publish validation stays as a draft so the
 * administrator can fix it in the editor.
 */
export async function publishArchivedProducts(
  client: SupabaseClient,
  items: PublishCheckedItemInput[],
  options?: {
    onProgress?: (
      currentIndex: number,
      total: number,
      item: PublishCheckedItemInput
    ) => void;
  }
): Promise<PublishCheckedSummary> {
  const results: PublishCheckedItemResult[] = [];
  let publishedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    options?.onProgress?.(i + 1, items.length, item);

    let status = item.status;
    if (status === 'archived') {
      const unarchiveRes = await rpcAdminUnarchiveProduct(
        client,
        item.id,
        'Published again from the company page.'
      );
      if (!unarchiveRes.ok) {
        failedCount += 1;
        results.push({
          id: item.id,
          brandNameEn: item.brandNameEn,
          ok: false,
          message: `Still archived: ${unarchiveRes.message}`,
        });
        continue;
      }
      status = 'draft';
    }

    const pubRes = await publishProduct(client, { id: item.id, status });
    if (pubRes.ok) {
      publishedCount += 1;
      results.push({ id: item.id, brandNameEn: item.brandNameEn, ok: true });
    } else {
      failedCount += 1;
      results.push({
        id: item.id,
        brandNameEn: item.brandNameEn,
        ok: false,
        message: `${pubRes.message} (kept as a draft)`,
        reasons: pubRes.reasons,
      });
    }
  }

  return { results, publishedCount, failedCount };
}

export interface AdminCompanyInput {
  countryId?: string | null;
  cityId?: string | null;
  companyName: string;
  legalName: string;
  description?: string;
  websiteUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
}

async function resolveIraqCountryId(
  client: SupabaseClient,
  preferredCountryId?: string | null
): Promise<string | null> {
  if (preferredCountryId && preferredCountryId.trim()) {
    return preferredCountryId.trim();
  }
  const { data: countriesData } = await client
    .from('countries')
    .select('id,iso_code,is_active')
    .eq('is_active', true);

  const countryRows = (countriesData ?? []) as Array<{
    id: string;
    iso_code?: string;
  }>;
  const iraq =
    countryRows.find((c) => c.iso_code === 'IQ') ?? countryRows[0] ?? null;
  return iraq?.id ?? null;
}

export async function rpcAdminCreateCompany(
  client: SupabaseClient,
  input: AdminCompanyInput
): Promise<RpcResult<CompanySummary>> {
  const website = (input.websiteUrl ?? '').trim();
  if (website && !/^https?:\/\//i.test(website)) {
    return {
      ok: false,
      message: 'Website URL must start with http:// or https://.',
    };
  }

  const countryId = await resolveIraqCountryId(client, input.countryId);
  if (!countryId) {
    return {
      ok: false,
      message: 'Active Iraq country record was not found in the database.',
    };
  }

  const baseLegalName = input.legalName.trim() || input.companyName.trim();
  let { data, error } = await client.rpc('admin_create_company', {
    p_country_id: countryId,
    p_city_id: trimOrNull(input.cityId),
    p_company_name: input.companyName.trim(),
    p_legal_name: baseLegalName,
    p_description: trimOrNull(input.description),
    p_website_url: trimOrNull(input.websiteUrl),
    p_contact_email: trimOrNull(input.contactEmail),
    p_contact_phone: trimOrNull(input.contactPhone),
  });

  if (
    error &&
    (error.code === '23505' ||
      (error.message ?? '').includes('companies_legal_name_unique_ci') ||
      (error.details ?? '').includes('companies_legal_name_unique_ci'))
  ) {
    const fallbackLegalNames = [
      `${baseLegalName} (Iraq Catalog)`,
      `${baseLegalName} (Iraq Official Catalog)`,
      `${baseLegalName} (${new Date().toISOString().slice(0, 10)})`,
    ];
    for (const candidateLegalName of fallbackLegalNames) {
      const retry = await client.rpc('admin_create_company', {
        p_country_id: countryId,
        p_city_id: trimOrNull(input.cityId),
        p_company_name: input.companyName.trim(),
        p_legal_name: candidateLegalName,
        p_description: trimOrNull(input.description),
        p_website_url: trimOrNull(input.websiteUrl),
        p_contact_email: trimOrNull(input.contactEmail),
        p_contact_phone: trimOrNull(input.contactPhone),
      });
      data = retry.data;
      error = retry.error;
      if (!error) break;
    }
  }

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }

  const created = data as {
    id: string;
    company_name: string;
    legal_name?: string;
    status: string;
    country_id?: string | null;
    city_id?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    website_url?: string | null;
    description?: string | null;
  } | null;

  if (!created?.id) {
    return { ok: false, message: 'Company creation did not return a record.' };
  }

  return {
    ok: true,
    data: {
      id: created.id,
      companyName: created.company_name,
      legalName: created.legal_name ?? created.company_name,
      status: created.status,
      countryId: created.country_id ?? countryId,
      cityId: created.city_id ?? null,
      contactEmail: created.contact_email ?? null,
      contactPhone: created.contact_phone ?? null,
      websiteUrl: created.website_url ?? null,
      description: created.description ?? null,
    },
  };
}

export async function rpcAdminUpdateCompany(
  client: SupabaseClient,
  companyId: string,
  input: AdminCompanyInput
): Promise<RpcResult<CompanySummary>> {
  const website = (input.websiteUrl ?? '').trim();
  if (website && !/^https?:\/\//i.test(website)) {
    return {
      ok: false,
      message: 'Website URL must start with http:// or https://.',
    };
  }

  const countryId = await resolveIraqCountryId(client, input.countryId);
  if (!countryId) {
    return {
      ok: false,
      message: 'Active Iraq country record was not found in the database.',
    };
  }

  const { data, error } = await client.rpc('admin_update_company', {
    p_company_id: companyId,
    p_country_id: countryId,
    p_city_id: trimOrNull(input.cityId),
    p_company_name: input.companyName.trim(),
    p_legal_name: input.legalName.trim() || input.companyName.trim(),
    p_description: trimOrNull(input.description),
    p_website_url: trimOrNull(input.websiteUrl),
    p_contact_email: trimOrNull(input.contactEmail),
    p_contact_phone: trimOrNull(input.contactPhone),
  });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }

  const updated = data as {
    id: string;
    company_name: string;
    legal_name?: string;
    status: string;
    country_id?: string | null;
    city_id?: string | null;
    contact_email?: string | null;
    contact_phone?: string | null;
    website_url?: string | null;
    description?: string | null;
  } | null;

  if (!updated?.id) {
    return { ok: false, message: 'Company update did not return a record.' };
  }

  return {
    ok: true,
    data: {
      id: updated.id,
      companyName: updated.company_name,
      legalName: updated.legal_name ?? updated.company_name,
      status: updated.status,
      countryId: updated.country_id ?? countryId,
      cityId: updated.city_id ?? null,
      contactEmail: updated.contact_email ?? null,
      contactPhone: updated.contact_phone ?? null,
      websiteUrl: updated.website_url ?? null,
      description: updated.description ?? null,
    },
  };
}

export interface AiDraftSource {
  title: string;
  url: string;
}

export interface AiProductDraft {
  found: boolean;
  brandName: string;
  category: ProductCategory | null;
  genericName: string | null;
  activeIngredients: string[];
  drugClass: string | null;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  clinical: {
    approvedIndications: string;
    usualAdultDose: string;
    contraindications: string;
    commonAdverseEffects: string;
    storageConditions: string;
  };
  specialties: string[];
  sources: AiDraftSource[];
  notes: string | null;
}

export interface AiDraftProductResponse {
  draft: AiProductDraft;
  warnings: string[];
  groundingSources: AiDraftSource[];
  searchSuggestionsHtml: string | null;
  model: string;
}

export interface InvokeAiDraftInput {
  productName: string;
  companyName: string;
  extraContext?: string;
}

export type IraqEvidence = 'confirmed' | 'likely' | 'unknown';
export type CompanySuggestionType =
  | 'iraqi_manufacturer'
  | 'regional'
  | 'multinational';

export interface CompanySuggestion {
  name: string;
  legalName: string;
  type: CompanySuggestionType | null;
  headquartersCountry: string | null;
  website: string | null;
  description: string | null;
  iraqEvidence: IraqEvidence;
  source: AiDraftSource | null;
}

export interface ProductSuggestion {
  brandName: string;
  genericName: string | null;
  strength: string;
  dosageForm: string;
  category: ProductCategory | null;
  iraqEvidence: IraqEvidence;
  source: AiDraftSource | null;
}

export interface DiscoveryResponse<T> {
  mode: 'companies' | 'company_products';
  items: T[];
  notes: string | null;
  groundingSources: AiDraftSource[];
  searchSuggestionsHtml: string | null;
  model: string;
}

async function extractFunctionsError(
  error: unknown,
  fallbackMessage: string
): Promise<{ message: string; quota: boolean }> {
  const body = await (error as { context?: Response })?.context
    ?.json?.()
    .catch(() => null);
  const isQuota = Boolean(
    body &&
      typeof body === 'object' &&
      (body as { quota?: unknown }).quota === true
  );
  if (isQuota) {
    return {
      message: 'The AI quota is used up for now. Try again later.',
      quota: true,
    };
  }
  const bodyError =
    body &&
    typeof body === 'object' &&
    typeof (body as { error?: unknown }).error === 'string'
      ? (body as { error: string }).error
      : null;
  return {
    message: bodyError ?? fallbackMessage,
    quota: false,
  };
}

export async function invokeAiDraftProduct(
  client: SupabaseClient,
  input: InvokeAiDraftInput
): Promise<RpcResult<AiDraftProductResponse>> {
  const productName = input.productName.trim();
  const companyName = input.companyName.trim();
  const extraContext = input.extraContext?.trim();

  if (!productName) {
    return { ok: false, message: 'Product name is required.' };
  }
  if (!companyName) {
    return { ok: false, message: 'Please select a company first.' };
  }

  const { data, error } = await client.functions.invoke('ai-draft-product', {
    body: {
      productName,
      companyName,
      ...(extraContext ? { extraContext } : {}),
    },
  });

  if (error) {
    const parsedErr = await extractFunctionsError(
      error,
      'AI draft failed. Try again.'
    );
    return {
      ok: false,
      message: parsedErr.message,
      ...(parsedErr.quota ? { quota: true } : {}),
    };
  }

  if (!data || typeof data !== 'object' || !('draft' in data)) {
    return { ok: false, message: 'AI draft failed. Try again.' };
  }

  return { ok: true, data: data as AiDraftProductResponse };
}

export interface SuggestCompaniesInput {
  focus?: string;
  exclude?: string[];
}

export async function invokeAiSuggestCompanies(
  client: SupabaseClient,
  input: SuggestCompaniesInput = {}
): Promise<RpcResult<DiscoveryResponse<CompanySuggestion>>> {
  const focus = input.focus?.trim();
  const exclude = (input.exclude ?? []).map((s) => s.trim()).filter(Boolean);

  const { data, error } = await client.functions.invoke('ai-draft-product', {
    body: {
      mode: 'companies',
      ...(focus ? { focus } : {}),
      exclude,
    },
  });

  if (error) {
    const parsedErr = await extractFunctionsError(
      error,
      'Company suggestion failed. Try again.'
    );
    return {
      ok: false,
      message: parsedErr.message,
      ...(parsedErr.quota ? { quota: true } : {}),
    };
  }

  if (!data || typeof data !== 'object' || !Array.isArray((data as { items?: unknown }).items)) {
    return { ok: false, message: 'Company suggestion failed. Try again.' };
  }

  return { ok: true, data: data as DiscoveryResponse<CompanySuggestion> };
}

export interface FindCompanyProductsInput {
  companyName: string;
  therapeuticArea?: string;
  exclude?: string[];
}

export async function invokeAiFindCompanyProducts(
  client: SupabaseClient,
  input: FindCompanyProductsInput
): Promise<RpcResult<DiscoveryResponse<ProductSuggestion>>> {
  const companyName = input.companyName.trim();
  if (!companyName) {
    return { ok: false, message: 'Please select a company first.' };
  }
  const therapeuticArea = input.therapeuticArea?.trim();
  const exclude = (input.exclude ?? []).map((s) => s.trim()).filter(Boolean);

  const { data, error } = await client.functions.invoke('ai-draft-product', {
    body: {
      mode: 'company_products',
      companyName,
      ...(therapeuticArea ? { therapeuticArea } : {}),
      exclude,
    },
  });

  if (error) {
    const parsedErr = await extractFunctionsError(
      error,
      'Product discovery failed. Try again.'
    );
    return {
      ok: false,
      message: parsedErr.message,
      ...(parsedErr.quota ? { quota: true } : {}),
    };
  }

  if (!data || typeof data !== 'object' || !Array.isArray((data as { items?: unknown }).items)) {
    return { ok: false, message: 'Product discovery failed. Try again.' };
  }

  return { ok: true, data: data as DiscoveryResponse<ProductSuggestion> };
}

export interface SaveAiProductDraftInput {
  companyId: string;
  draft: AiProductDraft;
  sources: AiDraftSource[];
  model: string | null;
}

export interface SaveAiProductDraftResult {
  productId: string;
  outcome: 'created' | 'exists';
  missing: string[];
}

export async function rpcAdminSaveAiProductDraft(
  client: SupabaseClient,
  input: SaveAiProductDraftInput
): Promise<RpcResult<SaveAiProductDraftResult>> {
  const { data, error } = await client
    .rpc('admin_save_ai_product_draft', {
      p_company_id: input.companyId,
      p_draft: input.draft,
      p_sources: input.sources,
      p_model: input.model,
    })
    .single();

  if (error) {
    return { ok: false, message: error.message || formatRpcError(error) };
  }

  const rawRow = Array.isArray(data) ? data[0] : data;
  const row = rawRow as {
    product_id?: string;
    outcome?: 'created' | 'exists';
    missing?: string[] | null;
  } | null;

  if (!row?.product_id || !row.outcome) {
    return { ok: false, message: 'Failed to save AI product draft.' };
  }

  return {
    ok: true,
    data: {
      productId: row.product_id,
      outcome: row.outcome,
      missing: row.missing ?? [],
    },
  };
}

export interface StoredProductAiDraft {
  draft: AiProductDraft;
  sources: AiDraftSource[];
  model: string | null;
  createdAt: string;
}

export async function loadProductAiDraft(
  client: SupabaseClient,
  productId: string
): Promise<StoredProductAiDraft | null> {
  const { data, error } = await client
    .from('product_ai_drafts')
    .select('draft,sources,model,created_at')
    .eq('product_id', productId)
    .maybeSingle();

  if (error || !data) return null;

  const row = data as {
    draft?: AiProductDraft;
    sources?: AiDraftSource[];
    model?: string | null;
    created_at?: string;
  };
  if (!row.draft || typeof row.draft !== 'object') return null;

  return {
    draft: row.draft,
    sources: Array.isArray(row.sources) ? row.sources : [],
    model: row.model ?? null,
    createdAt: row.created_at ?? '',
  };
}

export interface EnsureGenericDrugInput {
  drugClassName: string;
  genericName: string | null;
  ingredientNames: string[] | null;
}

export interface EnsureGenericDrugResult {
  drugClassId: string;
  genericDrugId: string | null;
  created: string[];
}

export async function rpcAdminEnsureGenericDrug(
  client: SupabaseClient,
  input: EnsureGenericDrugInput
): Promise<RpcResult<EnsureGenericDrugResult>> {
  const { data, error } = await client
    .rpc('admin_ensure_generic_drug', {
      p_drug_class_name: input.drugClassName.trim(),
      p_generic_name: trimOrNull(input.genericName),
      p_ingredient_names:
        input.ingredientNames && input.ingredientNames.length > 0
          ? input.ingredientNames
          : null,
    })
    .single();

  if (error) {
    return { ok: false, message: error.message || formatRpcError(error) };
  }

  const rawRow = Array.isArray(data) ? data[0] : data;
  const row = rawRow as {
    drug_class_id?: string;
    generic_drug_id?: string | null;
    created?: string[] | null;
  } | null;

  if (!row?.drug_class_id) {
    return {
      ok: false,
      message: 'Failed to resolve drug class from taxonomy helper.',
    };
  }

  return {
    ok: true,
    data: {
      drugClassId: row.drug_class_id,
      genericDrugId: row.generic_drug_id ?? null,
      created: row.created ?? [],
    },
  };
}

export interface EnsuredSpecialtyRow {
  specialtyId: string;
  name: string;
  created: boolean;
}

export async function rpcAdminEnsureSpecialties(
  client: SupabaseClient,
  names: string[]
): Promise<RpcResult<EnsuredSpecialtyRow[]>> {
  const cleaned = names.map((n) => n.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    return { ok: true, data: [] };
  }

  const { data, error } = await client.rpc('admin_ensure_specialties', {
    p_names: cleaned,
  });

  if (error) {
    return { ok: false, message: error.message || formatRpcError(error) };
  }

  const rows = (data ?? []) as Array<{
    specialty_id: string;
    name: string;
    created: boolean;
  }>;

  return {
    ok: true,
    data: rows.map((r) => ({
      specialtyId: r.specialty_id,
      name: r.name,
      created: Boolean(r.created),
    })),
  };
}

export interface FullProductSaveInput {
  existingProduct?: CatalogProduct | null;
  companyId: string;
  brandNameEn: string;
  category: ProductCategory;
  drugClassId: string;
  genericDrugId: string | null;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  marketStatus: IraqMarketStatus;
  registrationStatus: ProductRegistrationStatus;
  registrationNumber: string;
  registrationAuthority: string;
  registrationExpiresOn: string;
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
  storageConditions: string;
  specialtyIds: string[];
  publishImmediately: boolean;
}

export async function saveAndPublishCompleteProduct(
  client: SupabaseClient,
  input: FullProductSaveInput
): Promise<RpcResult<{ productId: string; finalStatus: ProductStatus }>> {
  let productId: string;
  const existing = input.existingProduct ?? null;

  if (existing) {
    productId = existing.id;

    // Ensure product is in an editable state ('draft' or 'changes_requested')
    if (existing.status === 'submitted') {
      const chg = await rpcAdminRequestProductChanges(
        client,
        productId,
        'Administrator updating product catalog record.'
      );
      if (!chg.ok) {
        const withdraw = await rpcWithdrawProductSubmission(client, productId);
        if (!withdraw.ok) return { ok: false, message: chg.message };
      }
    } else if (existing.status === 'published') {
      const hideRes = await rpcAdminHideProduct(
        client,
        productId,
        'Temporarily hiding product for administrator catalog update.'
      );
      if (!hideRes.ok) return { ok: false, message: hideRes.message };
      const restRes = await rpcAdminRestoreProduct(
        client,
        productId,
        'changes_requested',
        'Opening product record for administrator edit.'
      );
      if (!restRes.ok) return { ok: false, message: restRes.message };
    } else if (existing.status === 'archived') {
      const unarchiveRes = await rpcAdminUnarchiveProduct(
        client,
        productId,
        'Opening archived product record for administrator edit.'
      );
      if (!unarchiveRes.ok) return { ok: false, message: unarchiveRes.message };
    } else if (existing.status === 'hidden') {
      const restRes = await rpcAdminRestoreProduct(
        client,
        productId,
        'changes_requested',
        'Opening product record for administrator edit.'
      );
      if (!restRes.ok) return { ok: false, message: restRes.message };
    }

    const upd = await rpcUpdateProductDraft(client, {
      productId,
      category: input.category,
      genericDrugId:
        input.category === 'dietary_supplement' && !input.genericDrugId
          ? null
          : input.genericDrugId,
      drugClassId: input.drugClassId,
    });
    if (!upd.ok) return { ok: false, message: upd.message };

    const tr = await rpcUpsertProductTranslation(
      client,
      productId,
      'en',
      input.brandNameEn
    );
    if (!tr.ok) return { ok: false, message: tr.message };
  } else {
    const createRes = await rpcCreateProductDraft(client, {
      companyId: input.companyId,
      category: input.category,
      genericDrugId:
        input.category === 'dietary_supplement' && !input.genericDrugId
          ? null
          : input.genericDrugId,
      drugClassId: input.drugClassId,
      englishBrandName: input.brandNameEn,
    });
    if (!createRes.ok) return { ok: false, message: createRes.message };
    productId = createRes.data.id;
  }

  const mkt = await rpcUpsertProductMarket(client, {
    productId,
    strength: input.strength,
    dosageForm: input.dosageForm,
    route: input.route,
    packSize: input.packSize,
    marketStatus: input.marketStatus,
    registrationStatus: input.registrationStatus,
    registrationNumber: input.registrationNumber,
    registrationAuthority: input.registrationAuthority,
    registrationExpiresOn: input.registrationExpiresOn,
  });
  if (!mkt.ok) return { ok: false, message: mkt.message };

  const mktTrans = await rpcUpsertProductMarketTranslation(client, {
    productId,
    locale: 'en',
    storageConditions: input.storageConditions,
    approvedIndications: input.approvedIndications,
    usualAdultDose: input.usualAdultDose,
    contraindications: input.contraindications,
    commonAdverseEffects: input.commonAdverseEffects,
  });
  if (!mktTrans.ok) return { ok: false, message: mktTrans.message };

  const spec = await rpcSetProductSpecialties(
    client,
    productId,
    input.specialtyIds
  );
  if (!spec.ok) return { ok: false, message: spec.message };

  if (!input.publishImmediately) {
    return {
      ok: true,
      data: { productId, finalStatus: 'draft' },
    };
  }

  const sub = await rpcSubmitProductForReview(client, productId);
  if (!sub.ok) {
    return {
      ok: false,
      message: sub.message,
      ...(sub.reasons ? { reasons: sub.reasons } : {}),
    };
  }

  const pub = await rpcAdminPublishProduct(client, productId);
  if (!pub.ok) {
    return {
      ok: false,
      message: pub.message,
      ...(pub.reasons ? { reasons: pub.reasons } : {}),
    };
  }

  return {
    ok: true,
    data: { productId, finalStatus: 'published' },
  };
}

export async function rpcAdminArchiveCompany(
  client: SupabaseClient,
  companyId: string,
  reason = 'Archived by administrator.'
): Promise<RpcResult> {
  const { error } = await client.rpc('admin_archive_company', {
    p_company_id: companyId,
    p_reason: reason.trim() || 'Archived by administrator.',
  });

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
}

export interface SavedOrRecentDrugItem {
  productId: string;
  brandNameEn: string;
  genericNameEn: string | null;
  strength: string | null;
  dosageForm: string | null;
  companyName: string;
}

export const SAVED_DOCTOR_DRUGS_STORAGE_KEY = 'pharmaty.doctor.savedDrugs.v1';
export const RECENT_DOCTOR_DRUGS_STORAGE_KEY = 'pharmaty.doctor.recentDrugs.v1';
const MAX_RECENT_DOCTOR_DRUGS = 8;

function readDrugItemsFromStorage(key: string): SavedOrRecentDrugItem[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is SavedOrRecentDrugItem =>
          Boolean(
            item &&
              typeof item === 'object' &&
              typeof (item as SavedOrRecentDrugItem).productId === 'string' &&
              (item as SavedOrRecentDrugItem).productId.trim() &&
              typeof (item as SavedOrRecentDrugItem).brandNameEn === 'string'
          )
      )
      .map((item) => ({
        productId: item.productId.trim(),
        brandNameEn: item.brandNameEn.trim(),
        genericNameEn:
          typeof item.genericNameEn === 'string' && item.genericNameEn.trim()
            ? item.genericNameEn.trim()
            : null,
        strength:
          typeof item.strength === 'string' && item.strength.trim()
            ? item.strength.trim()
            : null,
        dosageForm:
          typeof item.dosageForm === 'string' && item.dosageForm.trim()
            ? item.dosageForm.trim()
            : null,
        companyName:
          typeof item.companyName === 'string' ? item.companyName.trim() : '',
      }));
  } catch {
    return [];
  }
}

function writeDrugItemsToStorage(
  key: string,
  items: SavedOrRecentDrugItem[]
): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Ignore storage quota or private mode errors
  }
}

export function loadSavedDoctorDrugs(): SavedOrRecentDrugItem[] {
  return readDrugItemsFromStorage(SAVED_DOCTOR_DRUGS_STORAGE_KEY);
}

export function toggleSavedDoctorDrug(
  item: SavedOrRecentDrugItem
): SavedOrRecentDrugItem[] {
  const current = loadSavedDoctorDrugs();
  const exists = current.some((d) => d.productId === item.productId);
  const next = exists
    ? current.filter((d) => d.productId !== item.productId)
    : [item, ...current];
  writeDrugItemsToStorage(SAVED_DOCTOR_DRUGS_STORAGE_KEY, next);
  return next;
}

export function loadRecentDoctorDrugs(): SavedOrRecentDrugItem[] {
  return readDrugItemsFromStorage(RECENT_DOCTOR_DRUGS_STORAGE_KEY);
}

export function recordRecentDoctorDrug(
  item: SavedOrRecentDrugItem
): SavedOrRecentDrugItem[] {
  const current = loadRecentDoctorDrugs().filter(
    (d) => d.productId !== item.productId
  );
  const next = [item, ...current].slice(0, MAX_RECENT_DOCTOR_DRUGS);
  writeDrugItemsToStorage(RECENT_DOCTOR_DRUGS_STORAGE_KEY, next);
  return next;
}

export function clearRecentDoctorDrugs(): SavedOrRecentDrugItem[] {
  writeDrugItemsToStorage(RECENT_DOCTOR_DRUGS_STORAGE_KEY, []);
  return [];
}

export type ReviewDraftSourceFilter = 'all' | 'ready' | 'warnings';

export function getReviewDraftSourceCounts(
  products: CatalogProduct[],
  extraSourcesByProduct: Record<string, AiDraftSource[]> = {}
): { all: number; ready: number; warnings: number } {
  let ready = 0;
  let warnings = 0;
  for (const product of products) {
    const sources = extractAiDraftSources(product.aiSources ?? [], {
      sources: extraSourcesByProduct[product.id] ?? [],
    });
    if (getProductSourceWarning(sources) === null) {
      ready++;
    } else {
      warnings++;
    }
  }
  return { all: products.length, ready, warnings };
}

export function filterReviewDraftProducts(
  products: CatalogProduct[],
  extraSourcesByProduct: Record<string, AiDraftSource[]> = {},
  options: { query?: string; sourceFilter?: ReviewDraftSourceFilter } = {}
): CatalogProduct[] {
  const q = (options.query ?? '').trim().toLowerCase();
  const sourceFilter = options.sourceFilter ?? 'all';

  return products.filter((product) => {
    const sources = extractAiDraftSources(product.aiSources ?? [], {
      sources: extraSourcesByProduct[product.id] ?? [],
    });
    const warning = getProductSourceWarning(sources);
    if (sourceFilter === 'ready' && warning !== null) return false;
    if (sourceFilter === 'warnings' && warning === null) return false;

    if (!q) return true;
    const fields = [
      product.brandNameEn,
      product.genericNameEn ?? '',
      product.drugClassNameEn,
      product.market?.strength ?? '',
      product.market?.dosageForm ?? '',
    ];
    return fields.some((val) => val.toLowerCase().includes(q));
  });
}

export function findNextCompanyWithDrafts(
  companies: CompanySummary[],
  products: CatalogProduct[],
  currentCompanyId: string
): { company: CompanySummary; drafts: number } | null {
  if (companies.length === 0) return null;
  const startIndex = companies.findIndex((c) => c.id === currentCompanyId);
  const total = companies.length;

  for (let offset = 1; offset <= total; offset++) {
    const idx = startIndex >= 0 ? (startIndex + offset) % total : offset - 1;
    const candidate = companies[idx];
    if (!candidate || candidate.id === currentCompanyId) continue;
    const counts = getCompanyProductCounts(products, candidate.id);
    if (counts.drafts > 0) {
      return { company: candidate, drafts: counts.drafts };
    }
  }
  return null;
}

export interface DoctorSponsoredAd {
  adId: string;
  sponsorName: string;
  title: string;
  body: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
}

export interface SponsoredAdRecord {
  id: string;
  sponsorName: string;
  title: string;
  body: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
  companyId: string | null;
  targetSpecialtyId: string | null;
  startsOn: string | null;
  endsOn: string | null;
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface SponsoredAdFormInput {
  adId?: string | null;
  sponsorName: string;
  title: string;
  body?: string | null;
  imageUrl?: string | null;
  linkUrl?: string | null;
  companyId?: string | null;
  targetSpecialtyId?: string | null;
  startsOn?: string | null;
  endsOn?: string | null;
  isActive?: boolean;
  priority?: number | string;
}

export interface AdminSponsoredAdStat {
  adId: string;
  title: string;
  sponsorName: string;
  isActive: boolean;
  views: number;
  clicks: number;
}

export interface AdminTopSearchRow {
  query: string;
  searches: number;
  zeroResultSearches: number;
}

export interface AdminTopViewedProductRow {
  productId: string;
  brandNameEn: string;
  companyName: string;
  views: number;
}

export function validateSponsoredAdForm(input: SponsoredAdFormInput): string[] {
  const errors: string[] = [];
  const sponsor = (input.sponsorName ?? '').trim();
  const title = (input.title ?? '').trim();
  const body = (input.body ?? '').trim();
  const imageUrl = (input.imageUrl ?? '').trim();
  const linkUrl = (input.linkUrl ?? '').trim();
  const startsOn = (input.startsOn ?? '').trim();
  const endsOn = (input.endsOn ?? '').trim();
  const rawPriority =
    typeof input.priority === 'string' && input.priority.trim() === ''
      ? 0
      : Number(input.priority ?? 0);

  if (!sponsor) {
    errors.push('Sponsor name is required.');
  } else if (sponsor.length > 80) {
    errors.push('Sponsor name must be 80 characters or fewer.');
  }

  if (!title) {
    errors.push('Title is required.');
  } else if (title.length > 80) {
    errors.push('Title must be 80 characters or fewer.');
  }

  if (body.length > 280) {
    errors.push('Body must be 280 characters or fewer.');
  }

  if (imageUrl && !/^https:\/\/[^ ]+$/.test(imageUrl)) {
    errors.push('Image URL must start with https:// and contain no spaces.');
  }

  if (linkUrl && !/^https:\/\/[^ ]+$/.test(linkUrl)) {
    errors.push('Link URL must start with https:// and contain no spaces.');
  }

  if (startsOn && endsOn && endsOn < startsOn) {
    errors.push('End date cannot be before start date.');
  }

  if (
    !Number.isFinite(rawPriority) ||
    !Number.isInteger(rawPriority) ||
    rawPriority < 0 ||
    rawPriority > 100
  ) {
    errors.push('Priority must be a whole number between 0 and 100.');
  }

  return errors;
}

export async function loadDoctorSponsoredAd(
  client: SupabaseClient,
  seed = 0
): Promise<DoctorSponsoredAd | null> {
  try {
    const { data, error } = await client.rpc('doctor_sponsored_ad', {
      p_seed: seed,
    });
    if (error || !data) return null;
    const rows = Array.isArray(data) ? data : [data];
    const first = rows[0] as
      | {
          ad_id?: string;
          sponsor_name?: string;
          title?: string;
          body?: string | null;
          image_url?: string | null;
          link_url?: string | null;
        }
      | undefined;
    if (!first?.ad_id || !first.title || !first.sponsor_name) return null;
    return {
      adId: first.ad_id,
      sponsorName: first.sponsor_name,
      title: first.title,
      body: first.body ?? null,
      imageUrl:
        first.image_url && /^https:\/\/[^ ]+$/.test(first.image_url)
          ? first.image_url
          : null,
      linkUrl:
        first.link_url && /^https:\/\/[^ ]+$/.test(first.link_url)
          ? first.link_url
          : null,
    };
  } catch {
    return null;
  }
}

export async function recordSponsoredAdEvent(
  client: SupabaseClient,
  adId: string,
  event: 'view' | 'click'
): Promise<void> {
  if (!adId || !adId.trim()) return;
  try {
    await client.rpc('record_sponsored_ad_event', {
      p_ad_id: adId.trim(),
      p_event: event,
    });
  } catch {
    // Fire-and-forget: ignore errors
  }
}

export async function recordCatalogSearchOnce(
  client: SupabaseClient,
  query: string,
  resultCount: number,
  tracker: { lastQuery: string | null }
): Promise<boolean> {
  const normalized = (query ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  if (normalized.length < 2) {
    if (normalized.length === 0) {
      tracker.lastQuery = null;
    }
    return false;
  }
  if (tracker.lastQuery === normalized) {
    return false;
  }
  tracker.lastQuery = normalized;
  try {
    await client.rpc('record_catalog_search', {
      p_query: query.trim().slice(0, 60),
      p_result_count: Math.max(0, Math.trunc(resultCount)),
    });
  } catch {
    // Fire-and-forget: ignore errors
  }
  return true;
}

export async function recordProductView(
  client: SupabaseClient,
  productId: string
): Promise<void> {
  if (!productId || !productId.trim()) return;
  try {
    await client.rpc('record_product_view', {
      p_product_id: productId.trim(),
    });
  } catch {
    // Fire-and-forget: ignore errors
  }
}

function mapSponsoredAdRow(row: Record<string, unknown>): SponsoredAdRecord {
  return {
    id: String(row.id ?? ''),
    sponsorName: String(row.sponsor_name ?? ''),
    title: String(row.title ?? ''),
    body: typeof row.body === 'string' ? row.body : null,
    imageUrl: typeof row.image_url === 'string' ? row.image_url : null,
    linkUrl: typeof row.link_url === 'string' ? row.link_url : null,
    companyId: typeof row.company_id === 'string' ? row.company_id : null,
    targetSpecialtyId:
      typeof row.target_specialty_id === 'string'
        ? row.target_specialty_id
        : null,
    startsOn: typeof row.starts_on === 'string' ? row.starts_on : null,
    endsOn: typeof row.ends_on === 'string' ? row.ends_on : null,
    isActive: Boolean(row.is_active),
    priority: Number(row.priority ?? 0),
    createdAt: String(row.created_at ?? ''),
    updatedAt: String(row.updated_at ?? ''),
  };
}

export async function loadAdminSponsoredAds(
  client: SupabaseClient
): Promise<RpcResult<SponsoredAdRecord[]>> {
  const { data, error } = await client
    .from('sponsored_ads')
    .select(
      'id,sponsor_name,title,body,image_url,link_url,company_id,target_specialty_id,starts_on,ends_on,is_active,priority,created_at,updated_at'
    )
    .order('is_active', { ascending: false })
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const rows = ((data ?? []) as Array<Record<string, unknown>>).map(
    mapSponsoredAdRow
  );
  return { ok: true, data: rows };
}

export async function rpcAdminSaveSponsoredAd(
  client: SupabaseClient,
  input: SponsoredAdFormInput
): Promise<RpcResult<SponsoredAdRecord>> {
  const validationErrors = validateSponsoredAdForm(input);
  if (validationErrors.length > 0) {
    return {
      ok: false,
      message: validationErrors[0],
      reasons: validationErrors,
    };
  }

  const priority =
    typeof input.priority === 'string' && input.priority.trim() === ''
      ? 0
      : Number(input.priority ?? 0);

  const { data, error } = await client.rpc('admin_save_sponsored_ad', {
    p_ad_id: trimOrNull(input.adId),
    p_sponsor_name: input.sponsorName.trim(),
    p_title: input.title.trim(),
    p_body: trimOrNull(input.body),
    p_image_url: trimOrNull(input.imageUrl),
    p_link_url: trimOrNull(input.linkUrl),
    p_company_id: trimOrNull(input.companyId),
    p_target_specialty_id: trimOrNull(input.targetSpecialtyId),
    p_starts_on: trimOrNull(input.startsOn),
    p_ends_on: trimOrNull(input.endsOn),
    p_is_active: input.isActive ?? true,
    p_priority: priority,
  });

  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const row = (Array.isArray(data) ? data[0] : data) as
    | Record<string, unknown>
    | undefined;
  if (!row || !row.id) {
    return { ok: false, message: 'Ad save did not return a record.' };
  }
  return { ok: true, data: mapSponsoredAdRow(row) };
}

export async function loadAdminSponsoredAdStats(
  client: SupabaseClient,
  days = 30
): Promise<RpcResult<AdminSponsoredAdStat[]>> {
  const { data, error } = await client.rpc('admin_sponsored_ad_stats', {
    p_days: days,
  });
  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const rows = ((data ?? []) as Array<Record<string, unknown>>).map((r) => ({
    adId: String(r.ad_id ?? ''),
    title: String(r.title ?? ''),
    sponsorName: String(r.sponsor_name ?? ''),
    isActive: Boolean(r.is_active),
    views: Number(r.views ?? 0),
    clicks: Number(r.clicks ?? 0),
  }));
  return { ok: true, data: rows };
}

export async function loadAdminTopSearches(
  client: SupabaseClient,
  days = 30,
  limit = 50
): Promise<RpcResult<AdminTopSearchRow[]>> {
  const { data, error } = await client.rpc('admin_top_searches', {
    p_days: days,
    p_limit: limit,
  });
  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const rows = ((data ?? []) as Array<Record<string, unknown>>).map((r) => ({
    query: String(r.query ?? ''),
    searches: Number(r.searches ?? 0),
    zeroResultSearches: Number(r.zero_result_searches ?? 0),
  }));
  return { ok: true, data: rows };
}

export async function loadAdminTopViewedProducts(
  client: SupabaseClient,
  days = 30,
  limit = 50
): Promise<RpcResult<AdminTopViewedProductRow[]>> {
  const { data, error } = await client.rpc('admin_top_viewed_products', {
    p_days: days,
    p_limit: limit,
  });
  if (error) {
    return { ok: false, message: formatRpcError(error) };
  }
  const rows = ((data ?? []) as Array<Record<string, unknown>>).map((r) => ({
    productId: String(r.product_id ?? ''),
    brandNameEn: String(r.brand_name_en ?? ''),
    companyName: String(r.company_name ?? ''),
    views: Number(r.views ?? 0),
  }));
  return { ok: true, data: rows };
}

// ---------- Clinical Therapeutic Class & Subclass Grouping ----------

export type TherapeuticGroupKey =
  | 'antibiotics'
  | 'cardiovascular'
  | 'diabetes'
  | 'respiratory'
  | 'gastrointestinal'
  | 'analgesics'
  | 'cns'
  | 'endocrine'
  | 'oncology'
  | 'urology'
  | 'ophthalmology_derm'
  | 'supplements';

export interface TherapeuticGroupDefinition {
  key: TherapeuticGroupKey;
  label: string;
  shortLabel: string;
  examples: string;
}

export const THERAPEUTIC_GROUPS: readonly TherapeuticGroupDefinition[] = [
  {
    key: 'antibiotics',
    label: 'Antibiotics & Anti-infectives',
    shortLabel: 'Antibiotics',
    examples: 'Cephalosporins · Penicillins · Macrolides · Fluoroquinolones · Antifungals',
  },
  {
    key: 'cardiovascular',
    label: 'Antihypertensives & Cardiac',
    shortLabel: 'Antihypertensives & Cardiac',
    examples: 'ARBs · ACE Inhibitors · Beta-Blockers · CCBs · Statins · Antiplatelets',
  },
  {
    key: 'diabetes',
    label: 'Diabetes & Metabolic',
    shortLabel: 'Diabetes & Metabolic',
    examples: 'SGLT2i · DPP-4i · Metformin · Insulins · GLP-1/GIP · Sulfonylureas',
  },
  {
    key: 'respiratory',
    label: 'Respiratory, Asthma & COPD',
    shortLabel: 'Respiratory & Asthma',
    examples: 'ICS/LABA/LAMA Inhalers · Montelukast · Bronchodilators · Syrups · Nasal Sprays',
  },
  {
    key: 'gastrointestinal',
    label: 'Gastrointestinal & Hepatobiliary',
    shortLabel: 'GI & PPIs',
    examples: 'PPIs & P-CABs · Antispasmodics · H. pylori · IBD & Laxatives · Antiemetics',
  },
  {
    key: 'analgesics',
    label: 'Analgesics, NSAIDs & Musculoskeletal',
    shortLabel: 'Analgesics & NSAIDs',
    examples: 'NSAIDs · Paracetamol & Analgesics · Muscle Relaxants · Antigout',
  },
  {
    key: 'cns',
    label: 'CNS, Neurology & Allergy',
    shortLabel: 'CNS & Allergy',
    examples: 'Antidepressants · Antiepileptics · Antihistamines · Migraine & Vertigo',
  },
  {
    key: 'endocrine',
    label: 'Endocrinology, Hormones & Bone',
    shortLabel: 'Hormones & Bone',
    examples: 'Thyroid · Corticosteroids · Osteoporosis & Vit D · OB/GYN & Fertility',
  },
  {
    key: 'oncology',
    label: 'Oncology, Hematology & Immunology',
    shortLabel: 'Oncology & Immunology',
    examples: 'Targeted Oncology · Immunosuppressants · Biologics · Hematology',
  },
  {
    key: 'urology',
    label: 'Urology, BPH & Nephrology',
    shortLabel: 'Urology & BPH',
    examples: 'BPH Alpha-Blockers · Overactive Bladder · PDE5 Inhibitors · Renal',
  },
  {
    key: 'ophthalmology_derm',
    label: 'Ophthalmology, ENT & Dermatology',
    shortLabel: 'Eye, ENT & Skin',
    examples: 'Eye Drops & Glaucoma · Topical Corticosteroids & Antibiotics · Psoriasis',
  },
  {
    key: 'supplements',
    label: 'Vitamins, Iron & Supplements',
    shortLabel: 'Vitamins & Iron',
    examples: 'Iron & Antianemics · Vitamin D · Multivitamins & Minerals',
  },
];

const GROUP_BY_KEY = new Map<TherapeuticGroupKey, TherapeuticGroupDefinition>(
  THERAPEUTIC_GROUPS.map((g) => [g.key, g])
);

/**
 * Strips raw ATC code annotations such as "(ATC C08CA01)" or "(J01FA10)" so
 * drug class labels read cleanly in clinical lists.
 */
export function cleanDrugClassLabel(raw: string | null | undefined): string {
  if (!raw) return 'General Medicine';
  const cleaned = raw
    .replace(
      /\s*\((?:ATC\s*)?[A-Z]\d{2}[A-Z]{1,2}\d{0,2}(?:\s*\/\s*[A-Z]\d{2}[A-Z]{1,2}\d{0,2})?\)/gi,
      ''
    )
    .replace(/,\s*(?:ATC\s*)?[A-Z]\d{2}[A-Z]{1,2}\d{0,2}\)/gi, ')')
    .trim();
  return cleaned || 'General Medicine';
}

export interface DrugTherapeuticClassification {
  groupKey: TherapeuticGroupKey;
  groupLabel: string;
  shortGroupLabel: string;
  subclassLabel: string;
  cleanClass: string;
}

/**
 * Maps a product's drug class and generic name into a clean two-level
 * clinical hierarchy: Therapeutic Group (e.g. "Antibiotics & Anti-infectives",
 * "Antihypertensives & Cardiac") and Subclass (e.g. "Cephalosporins",
 * "ARBs & ARB Combinations", "Beta-Blockers").
 */
export function classifyDrugTherapeuticGroup(
  drugClassNameEn: string | null | undefined,
  genericNameEn?: string | null,
  category?: ProductCategory | string | null
): DrugTherapeuticClassification {
  const cleanClass = cleanDrugClassLabel(drugClassNameEn);
  const text = `${drugClassNameEn ?? ''} ${genericNameEn ?? ''}`.toLowerCase();

  const build = (
    groupKey: TherapeuticGroupKey,
    subclassLabel: string
  ): DrugTherapeuticClassification => {
    const def = GROUP_BY_KEY.get(groupKey)!;
    return {
      groupKey,
      groupLabel: def.label,
      shortGroupLabel: def.shortLabel,
      subclassLabel,
      cleanClass,
    };
  };

  // 1. Ophthalmology & Dermatology
  if (
    /ophthalm|glaucoma|intravitreal|eye drop|artificial tear|ocular|tobramycin.*dexamethasone|prostamide|prostaglandin.*glaucoma/.test(
      text
    )
  ) {
    return build(
      'ophthalmology_derm',
      /glaucoma|prostamide|timolol/.test(text)
        ? 'Glaucoma & Intraocular Pressure'
        : 'Ophthalmic Anti-infectives & Anti-inflammatories'
    );
  }
  if (
    /topical|cutaneous|ointment|scalp|antipsoriatic|psoriasis|atopic dermatitis|acne|retinoid|wound|burn|ulcer healing|minoxidil|calcipotriol|fusidane.*topical|mupirocin/.test(
      text
    )
  ) {
    return build(
      'ophthalmology_derm',
      /psoria|calcipotriol|atopic|acne|wound|burn/.test(text)
        ? 'Psoriasis, Acne & Skin Care'
        : 'Topical Anti-infectives & Corticosteroids'
    );
  }

  // 2. Respiratory, Asthma & COPD
  if (
    /inhal|bronchodilat|asthma|copd|laba|lama|saba|leukotriene|montelukast|tiotropium|umeclidinium|budesonide.*formoterol|fluticasone.*salmeterol|beclomethasone.*formoterol|salbutamol|aminophylline|doxofylline|theophylline|methylxanthine|il-5|benralizumab|mepolizumab|expectorant|mucolytic|antitussive|cough|dextromethorphan|bromhexine|ambroxol|acetylcysteine|dornase|intranasal|nasal|mometasone.*nasal|triamcinolone.*nasal|xylometazoline|oxymetazoline|cold.*flu/.test(
      text
    )
  ) {
    let sub = 'Asthma & COPD Inhalers / Bronchodilators';
    if (/intranasal|nasal/.test(text)) {
      sub = 'Nasal Corticosteroids & Sprays';
    } else if (
      /expectorant|mucolytic|antitussive|cough|dextromethorphan|bromhexine|ambroxol|acetylcysteine|dornase|cold/.test(
        text
      )
    ) {
      sub = 'Cough, Expectorants & Mucolytics';
    } else if (/leukotriene|montelukast/.test(text)) {
      sub = 'Leukotriene Modifiers (Montelukast)';
    } else if (
      /tiotropium|lama|anticholinergic/.test(text) &&
      !/ics|budesonide|fluticasone|beclomethasone/.test(text)
    ) {
      sub = 'LAMA / LABA Bronchodilator Inhalers';
    } else if (
      /ics|inhal.*corticosteroid|budesonide|fluticasone|beclomethasone/.test(
        text
      )
    ) {
      sub = 'ICS & Combination Inhalers (ICS/LABA/LAMA)';
    }
    return build('respiratory', sub);
  }

  // 3. Antibiotics & Anti-infectives
  if (
    /antibact|antibiotic|cephalosporin|penicillin|beta-lactam|macrolide|azalide|fluoroquinolone|quinolone|carbapenem|glycopeptide|tetracycline|oxazolidinone|aminoglycoside|lincosamide|nitroimidazole|antiprotozoal|antifungal|\btriazole|\bimidazole|echinocandin|antiviral|antiretroviral|hiv|nnrti|nrti|protease inhibitor|anthelmintic|antiparasitic|nitazoxanide|fosfomycin|nitrofurantoin|sulfonamide.*trimethoprim|fusidane|rifaximin/.test(
      text
    )
  ) {
    let sub = 'Other Antibacterials & Anti-infectives';
    if (/cephalosporin|cef/.test(text)) {
      sub = 'Cephalosporins';
    } else if (/penicillin|amoxicillin|ampicillin|piperacillin/.test(text)) {
      sub = 'Penicillins & Beta-Lactam Combinations';
    } else if (
      /macrolide|azalide|azithromycin|clarithromycin|erythromycin|spiramycin|clindamycin|lincomycin/.test(
        text
      )
    ) {
      sub = 'Macrolides & Lincosamides';
    } else if (
      /fluoroquinolone|quinolone|levofloxacin|ciprofloxacin|moxifloxacin|ofloxacin|norfloxacin/.test(
        text
      )
    ) {
      sub = 'Fluoroquinolones';
    } else if (
      /carbapenem|meropenem|imipenem|ertapenem|glycopeptide|vancomycin|teicoplanin|linezolid|colistin|tigecycline|amikacin|gentamicin/.test(
        text
      )
    ) {
      sub = 'Hospital & Parenteral Antibiotics';
    } else if (
      /antifungal|\btriazole|\bimidazole|echinocandin|fluconazole|itraconazole|voriconazole|posaconazole|caspofungin|micafungin|anidulafungin|terbinafine|nystatin/.test(
        text
      )
    ) {
      sub = 'Antifungals';
    } else if (
      /antiviral|antiretroviral|hiv|nnrti|nrti|protease inhibitor|hcv|hbv|aciclovir|valaciclovir|oseltamivir|entecavir|tenofovir|sofosbuvir|darunavir|rilpivirine/.test(
        text
      )
    ) {
      sub = 'Antivirals & Antiretrovirals';
    } else if (
      /nitroimidazole|antiprotozoal|anthelmintic|metronidazole|ornidazole|secnidazole|tinidazole|albendazole|mebendazole|nitazoxanide/.test(
        text
      )
    ) {
      sub = 'Antiprotozoals & Anthelmintics';
    }
    return build('antibiotics', sub);
  }

  // 4. Antihypertensives & Cardiovascular
  if (
    /antihypertens|angiotensin|arb\b|ace inhibitor|calcium channel blocker|dihydropyridine|beta-1|beta-blocker|beta-adrenoceptor|adrenoceptor blocking|antianginal|antiarrhythmic|heart failure|sacubitril|ivabradine|trimetazidine|nicorandil|ranolazine|statin|hmg-coa|lipid|fibrate|ezetimibe|pcsk9|omega-3|antiplatelet|anticoagulant|antithrombotic|heparin|clopidogrel|ticagrelor|rivaroxaban|apixaban|dabigatran|diuretic|furosemide|torasemide|spironolactone|eplerenone|indapamide|hydrochlorothiazide|pulmonary arterial hypertension|endothelin|bosentan|ambrisentan|macitentan|selexipag|riociguat|imidazoline|moxonidine|methyldopa|vasoprotective|venoactive|diosmin|pentoxifylline|digoxin|nitrate|isosorbide|tranexamic/.test(
      text
    )
  ) {
    let sub = 'Antihypertensives & Vascular';
    if (
      /pulmonary arterial hypertension|endothelin|bosentan|ambrisentan|macitentan|selexipag|riociguat/.test(
        text
      )
    ) {
      sub = 'Pulmonary Arterial Hypertension (PAH)';
    } else if (
      /statin|hmg-coa|lipid|fibrate|ezetimibe|pcsk9|omega-3|rosuvastatin|atorvastatin|simvastatin|pitavastatin|fenofibrate|evolocumab|alirocumab/.test(
        text
      )
    ) {
      sub = 'Statins & Lipid-Lowering Agents';
    } else if (
      /antiplatelet|anticoagulant|antithrombotic|heparin|clopidogrel|ticagrelor|prasugrel|rivaroxaban|apixaban|dabigatran|enoxaparin|tranexamic/.test(
        text
      )
    ) {
      sub = 'Antiplatelets, Anticoagulants & Hemostatics';
    } else if (
      /sacubitril|ivabradine|trimetazidine|nicorandil|ranolazine|antianginal|antiarrhythmic|amiodarone|flecainide|propafenone|digoxin|isosorbide/.test(
        text
      )
    ) {
      sub = 'Heart Failure, Antianginals & Antiarrhythmics';
    } else if (
      /beta-1|beta-blocker|beta-adrenoceptor|adrenoceptor blocking|bisoprolol|metoprolol|nebivolol|carvedilol|atenolol|propranolol/.test(
        text
      )
    ) {
      sub = 'Beta-Blockers';
    } else if (
      /angiotensin ii|arb\b|valsartan|candesartan|losartan|telmisartan|irbesartan|olmesartan|azilsartan/.test(
        text
      )
    ) {
      sub = 'ARBs & ARB Combinations';
    } else if (
      /ace inhibitor|angiotensin-converting|perindopril|enalapril|lisinopril|ramipril|captopril/.test(
        text
      )
    ) {
      sub = 'ACE Inhibitors & Combinations';
    } else if (
      /calcium channel|dihydropyridine|phenylalkylamine|benzothiazepine|amlodipine|lercanidipine|nifedipine|diltiazem|verapamil/.test(
        text
      )
    ) {
      sub = 'Calcium Channel Blockers (CCBs)';
    } else if (
      /diuretic|furosemide|torasemide|spironolactone|eplerenone|indapamide/.test(
        text
      )
    ) {
      sub = 'Diuretics';
    }
    return build('cardiovascular', sub);
  }

  // 5. Diabetes, Obesity & Metabolic
  if (
    /antidiabet|antihyperglyc|diabetes|insulin|biguanide|metformin|sulfonylurea|glimepiride|gliclazide|dpp-4|dipeptidyl peptidase|sitagliptin|vildagliptin|linagliptin|saxagliptin|teneligliptin|sglt2|sodium-glucose|dapagliflozin|empagliflozin|canagliflozin|glp-1|gip|tirzepatide|semaglutide|liraglutide|dulaglutide|thiazolidinedione|pioglitazone|meglitinide|repaglinide|acarbose|orlistat|lipase inhibitor/.test(
      text
    )
  ) {
    let sub = 'Oral Antidiabetics';
    if (/insulin|glargine|degludec|aspart|lispro|glulisine/.test(text)) {
      sub = 'Insulins & Analogues';
    } else if (
      /glp-1|gip|tirzepatide|semaglutide|liraglutide|dulaglutide|orlistat|lipase inhibitor/.test(
        text
      )
    ) {
      sub = 'GLP-1 / GIP Agonists & Weight Management';
    } else if (
      /sglt2|sodium-glucose|dapagliflozin|empagliflozin|canagliflozin/.test(
        text
      )
    ) {
      sub = 'SGLT2 Inhibitors & Combinations';
    } else if (
      /dpp-4|dipeptidyl|sitagliptin|vildagliptin|linagliptin|saxagliptin|teneligliptin/.test(
        text
      )
    ) {
      sub = 'DPP-4 Inhibitors & Combinations';
    } else if (
      /sulfonylurea|glimepiride|gliclazide|glibenclamide|thiazolidinedione|pioglitazone|repaglinide/.test(
        text
      )
    ) {
      sub = 'Sulfonylureas & Glitazones';
    } else if (/biguanide|metformin/.test(text)) {
      sub = 'Biguanides (Metformin)';
    }
    return build('diabetes', sub);
  }

  // 6. Gastrointestinal & Hepatobiliary
  if (
    /proton pump|ppi\b|p-cab|acid blocker|omeprazole|esomeprazole|pantoprazole|rabeprazole|lansoprazole|dexlansoprazole|vonoprazan|antacid|alginate|famotidine|helicobacter|bismuth|gastrointestinal|gastroprokinetic|antispasmodic.*gastro|musculotropic.*gastro|otilonium|mebeverine|pinaverium|trimebutine|hyoscine|domperidone|metoclopramide|itopride|antiemetic|ondansetron|granisetron|palonosetron|aprepitant|laxative|lactulose|macrogol|bisacodyl|antidiarrheal|loperamide|racecadotril|probiotic|saccharomyces|mesalazine|mesalamine|sulfasalazine|inflammatory bowel|hepatoprotective|ursodeoxycholic|pancreatic enzyme|pancreatin|ademetionine|ornithine|simethicone/.test(
      text
    )
  ) {
    let sub = 'Gastrointestinal Agents';
    if (
      /proton pump|ppi\b|p-cab|acid blocker|omeprazole|esomeprazole|pantoprazole|rabeprazole|lansoprazole|dexlansoprazole|vonoprazan|antacid|alginate|famotidine|helicobacter|bismuth/.test(
        text
      )
    ) {
      sub = 'PPIs, P-CABs & H. pylori / Acid Suppressants';
    } else if (
      /antispasmodic|musculotropic|gastroprokinetic|otilonium|mebeverine|pinaverium|trimebutine|hyoscine|domperidone|metoclopramide|itopride|simethicone/.test(
        text
      )
    ) {
      sub = 'GI Antispasmodics & Prokinetics';
    } else if (
      /antiemetic|ondansetron|granisetron|palonosetron|aprepitant/.test(text)
    ) {
      sub = 'Antiemetics';
    } else if (
      /hepatoprotective|ursodeoxycholic|pancreatic|pancreatin|ademetionine|ornithine/.test(
        text
      )
    ) {
      sub = 'Hepatobiliary & Pancreatic Enzymes';
    } else {
      sub = 'IBD, Laxatives & Antidiarrheals';
    }
    return build('gastrointestinal', sub);
  }

  // 7. Analgesics, NSAIDs & Musculoskeletal
  if (
    /nsaid|non-steroidal anti-inflammatory|analgesic|antipyretic|cox-2|celecoxib|etoricoxib|meloxicam|diclofenac|ibuprofen|naproxen|ketoprofen|dexketoprofen|mefenamic|indomethacin|piroxicam|lornoxicam|paracetamol|acetaminophen|nefopam|tramadol|opioid|morphine|fentanyl|oxycodone|muscle relaxant|neuromuscular|tizanidine|baclofen|orphenadrine|tolperisone|chlorzoxazone|xanthine oxidase|antigout|febuxostat|allopurinol|colchicine|local anesthet|lidocaine|bupivacaine|ropivacaine/.test(
      text
    )
  ) {
    let sub = 'NSAIDs & Anti-inflammatory';
    if (/xanthine oxidase|antigout|febuxostat|allopurinol|colchicine/.test(text)) {
      sub = 'Antigout & Uric Acid Lowering';
    } else if (
      /muscle relaxant|neuromuscular|tizanidine|baclofen|orphenadrine|tolperisone|chlorzoxazone/.test(
        text
      )
    ) {
      sub = 'Muscle Relaxants';
    } else if (
      /local anesthet|lidocaine|bupivacaine|ropivacaine/.test(text)
    ) {
      sub = 'Local Anesthetics';
    } else if (
      /opioid|tramadol|morphine|fentanyl|oxycodone|paracetamol|acetaminophen|nefopam|analgesic and antipyretic/.test(
        text
      ) &&
      !/nsaid|non-steroidal/.test(text)
    ) {
      sub = 'Analgesics & Antipyretics';
    }
    return build('analgesics', sub);
  }

  // 8. Urology, BPH & Nephrology
  if (
    /prostatic|bph\b|alpha-1.*adrenoceptor|tamsulosin|alfuzosin|silodosin|finasteride|dutasteride|overactive bladder|beta-3 adrenoceptor|urinary.*antispasmodic|muscarinic|solifenacin|mirabegron|oxybutynin|tolterodine|trospium|flavoxate|phosphodiesterase type 5|pde5|sildenafil|tadalafil|vardenafil|premature ejaculation|dapoxetine|phosphate binder|sevelamer|calcimimetic|cinacalcet|ketoanalogue|potassium binder|hyperkalemia|sodium zirconium/.test(
      text
    )
  ) {
    let sub = 'BPH & Urinary Agents';
    if (
      /prostatic|bph|tamsulosin|alfuzosin|silodosin|finasteride|dutasteride/.test(
        text
      )
    ) {
      sub = 'Benign Prostatic Hyperplasia (BPH)';
    } else if (
      /overactive bladder|urinary.*antispasmodic|solifenacin|mirabegron|oxybutynin|tolterodine|flavoxate/.test(
        text
      )
    ) {
      sub = 'Overactive Bladder & Urinary Antispasmodics';
    } else if (
      /pde5|phosphodiesterase type 5|sildenafil|tadalafil|vardenafil|dapoxetine|premature ejaculation/.test(
        text
      )
    ) {
      sub = "PDE5 Inhibitors & Men's Health";
    } else {
      sub = 'Nephrology, Binders & Electrolytes';
    }
    return build('urology', sub);
  }

  // 9. CNS, Neurology, Psychiatry & Allergy
  if (
    /ssri|snri|serotonin|antidepressant|tricyclic|amitriptyline|sertraline|escitalopram|citalopram|fluoxetine|paroxetine|duloxetine|venlafaxine|vortioxetine|mirtazapine|antiepileptic|anticonvulsant|neuropathic|gaba|pregabalin|gabapentin|levetiracetam|valproate|carbamazepine|oxcarbazepine|lamotrigine|topiramate|lacosamide|antipsychotic|mood stabilizer|olanzapine|risperidone|quetiapine|aripiprazole|amisulpride|haloperidol|clozapine|paliperidone|benzodiazepine|anxiolytic|hypnotic|z-drug|diazepam|alprazolam|clonazepam|lorazepam|bromazepam|zolpidem|eszopiclone|psychostimulant|adhd|methylphenidate|atomoxetine|parkinson|dopamine|levodopa|pramipexole|ropinirole|rasagiline|rotigotine|alzheimer|dementia|cholinesterase|donepezil|rivastigmine|memantine|migraine|cgrp|gepant|sumatriptan|rizatriptan|zolmitriptan|antivertigo|betahistine|cinnarizine|flunarizine|nootropic|piracetam|citicoline|neuroprotective|alpha-lipoic|general anaesthet|sevoflurane|propofol|antihistamine|h1-receptor|h1 antihistamine|desloratadine|levocetirizine|cetirizine|fexofenadine|loratadine|bilastine|rupatadine|cyproheptadine|ketotifen|diphenhydramine/.test(
      text
    )
  ) {
    let sub = 'Neurology & CNS Agents';
    if (
      /antihistamine|h1-receptor|h1 antihistamine|desloratadine|levocetirizine|cetirizine|fexofenadine|loratadine|bilastine|rupatadine|cyproheptadine|ketotifen/.test(
        text
      )
    ) {
      sub = 'Antihistamines & Antiallergics';
    } else if (
      /ssri|snri|serotonin|antidepressant|tricyclic|amitriptyline|sertraline|escitalopram|citalopram|fluoxetine|paroxetine|duloxetine|venlafaxine|vortioxetine|mirtazapine/.test(
        text
      )
    ) {
      sub = 'Antidepressants (SSRIs, SNRIs & TCAs)';
    } else if (
      /antiepileptic|anticonvulsant|neuropathic|gaba|pregabalin|gabapentin|levetiracetam|valproate|carbamazepine|oxcarbazepine|lamotrigine|topiramate|lacosamide/.test(
        text
      )
    ) {
      sub = 'Antiepileptics & Neuropathic Pain';
    } else if (
      /antipsychotic|benzodiazepine|anxiolytic|hypnotic|z-drug|psychostimulant|adhd|methylphenidate|olanzapine|risperidone|quetiapine|aripiprazole|amisulpride|diazepam|alprazolam|clonazepam|zolpidem/.test(
        text
      )
    ) {
      sub = 'Antipsychotics, Anxiolytics & ADHD';
    } else if (
      /migraine|cgrp|gepant|triptan|antivertigo|betahistine|cinnarizine|parkinson|dopamine|levodopa|pramipexole|rasagiline|dementia|donepezil|memantine|nootropic|piracetam|neuroprotective|alpha-lipoic/.test(
        text
      )
    ) {
      sub = "Migraine, Vertigo, Parkinson's & Neuroprotection";
    }
    return build('cns', sub);
  }

  // 10. Oncology, Hematology & Immunosuppressants
  if (
    /antineoplastic|oncology|leukaemia|leukemia|lymphoma|carcinoma|myeloma|tumour|tumor|monoclonal antibody|tyrosine kinase|kinase inhibitor|parp inhibitor|pd-l1|pd-1|checkpoint|jak1|jak\b|tnf|interleukin|il-17|il-23|il-4|il-13|cd20|cd30|cd38|bcl-2|proteasome|antibody-drug conjugate|taxane|platinum|alkylating|antimetabolite|anastrozole|letrozole|exemestane|tamoxifen|fulvestrant|enzalutamide|apalutamide|abiraterone|bicalutamide|androgen receptor|gnrh|lhrh|leuprorelin|goserelin|triptorelin|immunosuppress|calcineurin|mycophenolate|tacrolimus|cyclosporine|ciclosporin|azathioprine|methotrexate|hydroxychloroquine|leflunomide|multiple sclerosis|interferon|glatiramer|fingolimod|siponimod|teriflunomide|integrin|vedolizumab|natalizumab|colony-stimulating|g-csf|filgrastim|pegfilgrastim|erythropoie|epoetin|darbepoetin|thrombopoietin|eltrombopag|romiplostim|coagulation factor|factor viii|factor ix|prothrombin|emicizumab|enzyme replacement|gaucher|fabry|hunter|kallikrein|icatibant|lanadelumab|deferasirox/.test(
      text
    )
  ) {
    let sub = 'Oncology & Targeted Therapies';
    if (
      /colony-stimulating|g-csf|filgrastim|pegfilgrastim|erythropoie|epoetin|darbepoetin|thrombopoietin|eltrombopag|coagulation factor|factor viii|factor ix|prothrombin|emicizumab|enzyme replacement|gaucher|fabry|hunter|kallikrein|deferasirox/.test(
        text
      )
    ) {
      sub = 'Hematology, Coagulation & Rare Diseases';
    } else if (
      /immunosuppress|calcineurin|mycophenolate|tacrolimus|cyclosporine|ciclosporin|azathioprine|methotrexate|hydroxychloroquine|leflunomide|tnf|interleukin|il-17|il-23|il-4|il-13|jak|integrin|vedolizumab|multiple sclerosis|glatiramer|interferon|fingolimod/.test(
        text
      )
    ) {
      sub = 'Immunosuppressants, Biologics & Autoimmune';
    }
    return build('oncology', sub);
  }

  // 11. Endocrinology, Hormones, Bone & OB/GYN
  if (
    /thyroid|levothyroxine|carbimazole|thiamazole|corticosteroid|glucocorticoid|mineralocorticoid|hydrocortisone|prednisolone|methylprednisolone|dexamethasone|betamethasone|deflazacort|fludrocortisone|bisphosphonate|alendronate|zoledronic|ibandronic|risedronate|rankl|denosumab|alfacalcidol|calcitriol|vitamin d3 analogue|parathyroid|teriparatide|progestogen|progesterone|dydrogesterone|hormone replacement|estradiol|estrogen|contraceptive|ovulation|gonadotropin|follicle-stimulating|fsh|clomifene|cabergoline|bromocriptine|prolactin|oxytocin|atosiban|carbetocin|cervical ripening|somatropin|growth hormone|desmopressin|vasopressin|octreotide|lanreotide/.test(
      text
    )
  ) {
    let sub = 'Endocrine & Hormonal Agents';
    if (
      /thyroid|levothyroxine|carbimazole|thiamazole|corticosteroid|glucocorticoid|mineralocorticoid|hydrocortisone|prednisolone|methylprednisolone|dexamethasone|betamethasone|deflazacort|fludrocortisone/.test(
        text
      )
    ) {
      sub = 'Thyroid & Systemic Corticosteroids';
    } else if (
      /bisphosphonate|alendronate|zoledronic|ibandronic|risedronate|rankl|denosumab|alfacalcidol|calcitriol|vitamin d3 analogue|teriparatide/.test(
        text
      )
    ) {
      sub = 'Bone Metabolism & Osteoporosis';
    } else if (
      /progestogen|progesterone|dydrogesterone|hormone replacement|estradiol|estrogen|contraceptive|ovulation|gonadotropin|follicle-stimulating|fsh|clomifene|cabergoline|prolactin|oxytocin|atosiban|cervical ripening/.test(
        text
      )
    ) {
      sub = 'Reproductive Hormones & OB/GYN';
    }
    return build('endocrine', sub);
  }

  // 12. Vitamins, Minerals, Iron & Supplements
  if (
    category === 'dietary_supplement' ||
    /iron|ferric|ferrous|folic|cyanocobalamin|mecobalamin|b12|antianemic|vitamin|mineral|calcium|cholecalciferol|ergocalciferol|zinc|magnesium|supplement/.test(
      text
    )
  ) {
    return build(
      'supplements',
      /iron|ferric|ferrous|folic|cyanocobalamin|mecobalamin|b12|antianemic/.test(
        text
      )
        ? 'Iron & Antianemic Preparations'
        : 'Vitamins, Minerals & Supplements'
    );
  }

  return build('supplements', cleanClass);
}

export interface GroupedSubclassSection<T> {
  groupKey: TherapeuticGroupKey;
  groupLabel: string;
  shortGroupLabel: string;
  subclassLabel: string;
  items: T[];
}

export interface GroupedTherapeuticClass<T> {
  groupKey: TherapeuticGroupKey;
  groupLabel: string;
  shortGroupLabel: string;
  totalCount: number;
  subclasses: GroupedSubclassSection<T>[];
}

/**
 * Organizes a list of products into ordered Therapeutic Classes and Subclasses,
 * sorting products alphabetically by brand name inside each subclass.
 */
export function groupProductsByTherapeuticClass<T>(
  items: readonly T[],
  accessor: (item: T) => {
    brandNameEn: string;
    genericNameEn?: string | null;
    drugClassNameEn?: string | null;
    category?: ProductCategory | string | null;
  }
): GroupedTherapeuticClass<T>[] {
  const byGroup = new Map<
    TherapeuticGroupKey,
    Map<string, T[]>
  >();

  for (const item of items) {
    const fields = accessor(item);
    const classified = classifyDrugTherapeuticGroup(
      fields.drugClassNameEn,
      fields.genericNameEn,
      fields.category
    );
    let subMap = byGroup.get(classified.groupKey);
    if (!subMap) {
      subMap = new Map<string, T[]>();
      byGroup.set(classified.groupKey, subMap);
    }
    const list = subMap.get(classified.subclassLabel) ?? [];
    list.push(item);
    subMap.set(classified.subclassLabel, list);
  }

  const result: GroupedTherapeuticClass<T>[] = [];
  for (const def of THERAPEUTIC_GROUPS) {
    const subMap = byGroup.get(def.key);
    if (!subMap || subMap.size === 0) continue;

    const subclasses: GroupedSubclassSection<T>[] = Array.from(subMap.entries())
      .map(([subclassLabel, subItems]) => {
        const sorted = [...subItems].sort((a, b) =>
          accessor(a).brandNameEn.localeCompare(accessor(b).brandNameEn, 'en', {
            sensitivity: 'base',
          })
        );
        return {
          groupKey: def.key,
          groupLabel: def.label,
          shortGroupLabel: def.shortLabel,
          subclassLabel,
          items: sorted,
        };
      })
      .sort((a, b) => a.subclassLabel.localeCompare(b.subclassLabel, 'en'));

    const totalCount = subclasses.reduce((sum, s) => sum + s.items.length, 0);
    result.push({
      groupKey: def.key,
      groupLabel: def.label,
      shortGroupLabel: def.shortLabel,
      totalCount,
      subclasses,
    });
  }

  return result;
}

/**
 * Fetches published catalog products matching the given search/company/specialty
 * filters and filters them by the requested Therapeutic Group key.
 */
export async function searchCatalogProductsByTherapeuticGroup(
  client: SupabaseClient,
  input: {
    groupKey: TherapeuticGroupKey;
    query?: string | null;
    companyId?: string | null;
    specialtyId?: string | null;
  }
): Promise<RpcResult<{ rows: DoctorSearchRow[]; totalCount: number }>> {
  const pageSize = 50;
  const firstRes = await searchCatalogProducts(client, {
    query: input.query,
    companyId: input.companyId,
    specialtyId: input.specialtyId,
    limit: pageSize,
    offset: 0,
  });

  if (!firstRes.ok) {
    return firstRes;
  }

  const allRows = [...firstRes.data.rows];
  const totalInDb = firstRes.data.totalCount;

  if (allRows.length < totalInDb && allRows.length === pageSize) {
    const offsets: number[] = [];
    for (let offset = pageSize; offset < totalInDb; offset += pageSize) {
      offsets.push(offset);
    }

    const batchSize = 6;
    for (let i = 0; i < offsets.length; i += batchSize) {
      const batch = offsets.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((offset) =>
          searchCatalogProducts(client, {
            query: input.query,
            companyId: input.companyId,
            specialtyId: input.specialtyId,
            limit: pageSize,
            offset,
          })
        )
      );
      for (const res of batchResults) {
        if (res.ok) {
          allRows.push(...res.data.rows);
        }
      }
    }
  }

  const matched = allRows.filter(
    (row) =>
      classifyDrugTherapeuticGroup(
        row.drugClassNameEn,
        row.genericNameEn,
        row.category
      ).groupKey === input.groupKey
  );

  return {
    ok: true,
    data: {
      rows: matched,
      totalCount: matched.length,
    },
  };
}