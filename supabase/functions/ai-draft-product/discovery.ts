// Pure helpers for the discovery modes of ai-draft-product:
//   mode "companies"        — pharmaceutical companies whose medicines are sold in Iraq
//   mode "company_products" — one company's products sold in Iraq
// No Deno or network APIs here; unit-tested by Vitest (discovery.test.ts).

import { type DraftSource, type ProductCategory, isHttpUrl } from './draft.ts';

export type IraqEvidence = 'confirmed' | 'likely' | 'unknown';
export type CompanyType = 'iraqi_manufacturer' | 'regional' | 'multinational';

export interface CompanySuggestion {
  name: string;
  legalName: string;
  type: CompanyType | null;
  headquartersCountry: string | null;
  website: string | null;
  description: string | null;
  iraqEvidence: IraqEvidence;
  source: DraftSource | null;
}

export interface ProductSuggestion {
  brandName: string;
  genericName: string | null;
  strength: string;
  dosageForm: string;
  category: ProductCategory | null;
  iraqEvidence: IraqEvidence;
  source: DraftSource | null;
}

export type DiscoveryRequest =
  | { mode: 'companies'; focus?: string; exclude: string[] }
  | { mode: 'company_products'; companyName: string; therapeuticArea?: string; exclude: string[] };

export const DISCOVERY_LIMITS = {
  focus: 200,
  companyName: 200,
  excludeItems: 300,
  excludeItemLength: 200,
  items: 40,
  text: 200,
  description: 500,
  notes: 1000,
} as const;

const EVIDENCE: IraqEvidence[] = ['confirmed', 'likely', 'unknown'];
const COMPANY_TYPES: CompanyType[] = ['iraqi_manufacturer', 'regional', 'multinational'];
const CATEGORIES: ProductCategory[] = ['prescription_drug', 'otc_drug', 'dietary_supplement'];

type Result<T> = { ok: true; value: T } | { ok: false; message: string };

function cleanList(value: unknown): Result<string[]> {
  if (value === undefined || value === null) return { ok: true, value: [] };
  if (!Array.isArray(value)) return { ok: false, message: 'exclude must be a list of names.' };
  if (value.length > DISCOVERY_LIMITS.excludeItems) {
    return { ok: false, message: `exclude can have at most ${DISCOVERY_LIMITS.excludeItems} names.` };
  }
  const out: string[] = [];
  for (const item of value) {
    if (typeof item !== 'string') continue;
    const s = item.trim().slice(0, DISCOVERY_LIMITS.excludeItemLength);
    if (s) out.push(s);
  }
  return { ok: true, value: out };
}

export function validateDiscoveryRequest(body: Record<string, unknown>): Result<DiscoveryRequest> {
  const exclude = cleanList(body.exclude);
  if (!exclude.ok) return exclude;

  if (body.mode === 'companies') {
    const focus = typeof body.focus === 'string' ? body.focus.trim() : '';
    if (focus.length > DISCOVERY_LIMITS.focus) {
      return { ok: false, message: `focus must be at most ${DISCOVERY_LIMITS.focus} characters.` };
    }
    return { ok: true, value: { mode: 'companies', ...(focus ? { focus } : {}), exclude: exclude.value } };
  }

  if (body.mode === 'company_products') {
    const companyName = typeof body.companyName === 'string' ? body.companyName.trim() : '';
    if (!companyName) return { ok: false, message: 'companyName is required.' };
    if (companyName.length > DISCOVERY_LIMITS.companyName) {
      return { ok: false, message: `companyName must be at most ${DISCOVERY_LIMITS.companyName} characters.` };
    }
    const area = typeof body.therapeuticArea === 'string' ? body.therapeuticArea.trim() : '';
    if (area.length > DISCOVERY_LIMITS.focus) {
      return { ok: false, message: `therapeuticArea must be at most ${DISCOVERY_LIMITS.focus} characters.` };
    }
    return {
      ok: true,
      value: {
        mode: 'company_products',
        companyName,
        ...(area ? { therapeuticArea: area } : {}),
        exclude: exclude.value,
      },
    };
  }

  return { ok: false, message: 'Unknown mode.' };
}

export const COMPANIES_PROMPT = `You help build Pharmaty, an Iraqi professional drug-information catalog read by physicians.
List pharmaceutical companies whose medicines are sold in Iraq.

Rules:
- A company here is the MANUFACTURER or MARKETING AUTHORISATION HOLDER (for example "AstraZeneca", "Samarra Drug Industries"). Do NOT list local agents, scientific bureaus, distributors or importers.
- Include Iraqi manufacturers, regional companies and multinational companies.
- Use Google Search. Prefer evidence that names Iraq: the Iraqi Ministry of Health or Kimadia, the company's own pages naming Iraq or an Iraq office, the Iraqi League of Medicine Producers, Iraqi pharmaceutical news.
- "iraqEvidence": "confirmed" only when your source names the company's presence or products in Iraq; "likely" when the evidence is strong but indirect; "unknown" otherwise.
- Never invent companies, websites or sources. No prices. No contact details.
- "description" is one or two plain sentences about what the company makes.
- At most ${DISCOVERY_LIMITS.items} companies. Do not repeat any name from the exclude list.
- Answer with ONE JSON object only, no text before or after it, exactly in this shape:
{
  "items": [
    {
      "name": "",
      "legalName": "",
      "type": "iraqi_manufacturer | regional | multinational",
      "headquartersCountry": "",
      "website": "",
      "description": "",
      "iraqEvidence": "confirmed | likely | unknown",
      "source": { "title": "", "url": "" }
    }
  ],
  "notes": null
}`;

export const PRODUCTS_PROMPT = `You help build Pharmaty, an Iraqi professional drug-information catalog read by physicians.
List the medicines of ONE company that are sold in Iraq.

Rules:
- Each strength and dosage form is a separate item. "brandName" is the trade name followed by the strength, for example "Forxiga 10 mg".
- Use Google Search. Prefer evidence of availability in Iraq: Iraqi Ministry of Health registration lists, Kimadia tenders, Iraqi distributors or pharmacies, the company's Iraq or Middle East website.
- If you find no Iraq-specific evidence for a product, you may still list the company's main products marketed in the Middle East, with "iraqEvidence": "unknown".
- "iraqEvidence": "confirmed" only when your source names Iraq; "likely" when the evidence is strong but indirect (for example the company's Middle East portfolio); "unknown" otherwise.
- Every product name and strength must exist on an official or company source. Never invent products. No prices. No registration numbers.
- "category": "prescription_drug", "otc_drug" or "dietary_supplement". Leave out medical devices and cosmetics.
- At most ${DISCOVERY_LIMITS.items} items. Do not repeat any brand name from the exclude list.
- Answer with ONE JSON object only, no text before or after it, exactly in this shape:
{
  "items": [
    {
      "brandName": "",
      "genericName": "",
      "strength": "",
      "dosageForm": "",
      "category": "prescription_drug | otc_drug | dietary_supplement",
      "iraqEvidence": "confirmed | likely | unknown",
      "source": { "title": "", "url": "" }
    }
  ],
  "notes": null
}`;

function excludeLine(exclude: string[]): string {
  return exclude.length ? `Exclude (already in the catalog): ${exclude.join('; ')}` : 'Exclude: none';
}

export function buildDiscoveryPrompt(req: DiscoveryRequest): { system: string; user: string } {
  if (req.mode === 'companies') {
    const lines = [req.focus ? `Focus: ${req.focus}` : 'Focus: all pharmaceutical companies selling medicines in Iraq'];
    lines.push(excludeLine(req.exclude));
    return { system: COMPANIES_PROMPT, user: lines.join('\n') };
  }
  const lines = [`Company: ${req.companyName}`];
  if (req.therapeuticArea) lines.push(`Therapeutic area: ${req.therapeuticArea}`);
  lines.push(excludeLine(req.exclude));
  return { system: PRODUCTS_PROMPT, user: lines.join('\n') };
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '';
}

function strOrNull(value: unknown, max: number): string | null {
  const s = str(value, max);
  return s ? s : null;
}

function evidence(value: unknown): IraqEvidence {
  return EVIDENCE.includes(value as IraqEvidence) ? (value as IraqEvidence) : 'unknown';
}

function source(value: unknown): DraftSource | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  const url = str(v.url, 2000);
  if (!isHttpUrl(url)) return null;
  return { title: str(v.title, DISCOVERY_LIMITS.text) || url, url };
}

function items(raw: unknown): unknown[] {
  const list = raw && typeof raw === 'object' ? (raw as { items?: unknown }).items : undefined;
  return Array.isArray(list) ? list : [];
}

export function discoveryNotes(raw: unknown): string | null {
  return raw && typeof raw === 'object' ? strOrNull((raw as { notes?: unknown }).notes, DISCOVERY_LIMITS.notes) : null;
}

function excluded(name: string, exclude: string[]): boolean {
  const n = name.toLowerCase();
  return exclude.some((e) => e.toLowerCase() === n);
}

export function normalizeCompanies(raw: unknown, exclude: string[] = []): CompanySuggestion[] {
  const out: CompanySuggestion[] = [];
  for (const item of items(raw)) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    const name = str(r.name, DISCOVERY_LIMITS.text);
    if (!name || excluded(name, exclude) || out.some((o) => o.name.toLowerCase() === name.toLowerCase())) continue;
    const website = str(r.website, 500);
    out.push({
      name,
      legalName: str(r.legalName, DISCOVERY_LIMITS.text) || name,
      type: COMPANY_TYPES.includes(r.type as CompanyType) ? (r.type as CompanyType) : null,
      headquartersCountry: strOrNull(r.headquartersCountry, DISCOVERY_LIMITS.text),
      website: isHttpUrl(website) ? website : null,
      description: strOrNull(r.description, DISCOVERY_LIMITS.description),
      iraqEvidence: evidence(r.iraqEvidence),
      source: source(r.source),
    });
    if (out.length >= DISCOVERY_LIMITS.items) break;
  }
  return out;
}

export function normalizeProducts(raw: unknown, exclude: string[] = []): ProductSuggestion[] {
  const out: ProductSuggestion[] = [];
  for (const item of items(raw)) {
    if (!item || typeof item !== 'object') continue;
    const r = item as Record<string, unknown>;
    const brandName = str(r.brandName, DISCOVERY_LIMITS.text);
    if (!brandName || excluded(brandName, exclude)) continue;
    if (out.some((o) => o.brandName.toLowerCase() === brandName.toLowerCase())) continue;
    const category = CATEGORIES.includes(r.category as ProductCategory) ? (r.category as ProductCategory) : null;
    out.push({
      brandName,
      genericName: strOrNull(r.genericName, DISCOVERY_LIMITS.text),
      strength: str(r.strength, DISCOVERY_LIMITS.text),
      dosageForm: str(r.dosageForm, DISCOVERY_LIMITS.text),
      category,
      iraqEvidence: evidence(r.iraqEvidence),
      source: source(r.source),
    });
    if (out.length >= DISCOVERY_LIMITS.items) break;
  }
  return out;
}
