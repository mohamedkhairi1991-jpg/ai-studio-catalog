// Pure helpers for the ai-draft-product function: prompt building and
// validation of the model's answer. No Deno or network APIs here, so the
// same file is unit-tested with Vitest (draft.test.ts).

export type ProductCategory = 'prescription_drug' | 'otc_drug' | 'dietary_supplement';

export interface DraftRequest {
  productName: string;
  companyName?: string;
  extraContext?: string;
}

export interface DraftSource {
  title: string;
  url: string;
}

export interface ClinicalDraft {
  approvedIndications: string;
  usualAdultDose: string;
  contraindications: string;
  commonAdverseEffects: string;
  storageConditions: string;
}

export interface ProductDraft {
  found: boolean;
  brandName: string;
  brandNameAr: string | null;
  category: ProductCategory | null;
  genericName: string | null;
  activeIngredients: string[];
  drugClass: string | null;
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  clinical: ClinicalDraft;
  specialties: string[];
  sources: DraftSource[];
  notes: string | null;
}

export const LIMITS = {
  productName: 200,
  companyName: 200,
  extraContext: 6000,
  shortText: 200,
  clinicalText: 3000,
  notes: 1000,
  listItems: 10,
  sources: 10,
} as const;

const CATEGORIES: ProductCategory[] = ['prescription_drug', 'otc_drug', 'dietary_supplement'];

export type ValidationResult<T> = { ok: true; value: T } | { ok: false; message: string };

export function validateRequest(body: unknown): ValidationResult<DraftRequest> {
  if (!body || typeof body !== 'object') return { ok: false, message: 'Request body must be a JSON object.' };
  const b = body as Record<string, unknown>;
  const productName = typeof b.productName === 'string' ? b.productName.trim() : '';
  if (!productName) return { ok: false, message: 'productName is required.' };
  if (productName.length > LIMITS.productName) {
    return { ok: false, message: `productName must be at most ${LIMITS.productName} characters.` };
  }
  const companyName = typeof b.companyName === 'string' ? b.companyName.trim() : '';
  if (companyName.length > LIMITS.companyName) {
    return { ok: false, message: `companyName must be at most ${LIMITS.companyName} characters.` };
  }
  const extraContext = typeof b.extraContext === 'string' ? b.extraContext.trim() : '';
  if (extraContext.length > LIMITS.extraContext) {
    return { ok: false, message: `extraContext must be at most ${LIMITS.extraContext} characters.` };
  }
  return {
    ok: true,
    value: {
      productName,
      ...(companyName ? { companyName } : {}),
      ...(extraContext ? { extraContext } : {}),
    },
  };
}

export const SYSTEM_PROMPT = `You prepare DRAFT product records for an Iraqi professional drug-information catalog read by physicians.
A pharmacist administrator reviews every draft before anything is published, but your draft must still be accurate.

Rules:
- Use Google Search. Take facts ONLY from official sources: the EMA product information (EPAR/SmPC), FDA labeling (DailyMed / Drugs@FDA), UK eMC/MHRA SmPC, Health Canada monograph, or the manufacturer's official prescribing information. Do not use blogs, pharmacies, forums or AI-written pages.
- Never invent anything. If a value cannot be confirmed from an official source, return null (or an empty list) and explain in "notes".
- Never output any Iraqi registration number or Iraqi price.
- Describe the specific product and strength that was asked for. If the name is ambiguous or not found, set "found" to false and explain in "notes".
- Write clinical text in plain English sentences, concise, no markdown, no bullet symbols. "usualAdultDose" is the usual adult dose for the main indication(s) as stated on the label.
- "drugClass" is a pharmacological class such as "SGLT2 inhibitors" or "Proton pump inhibitors".
- "specialties" are medical specialties that commonly prescribe it, such as "Cardiology", "Endocrinology", "Oncology".
- "brandName" is the trade name followed by the strength as printed on the pack, for example "Forxiga 10 mg". Each strength is a separate product.
- "brandNameAr" is the brand name written in Arabic letters as used in the Middle East, or null if unsure.
- Never include prices.
- Answer with ONE JSON object only, no text before or after it, exactly in this shape:
{
  "found": true,
  "brandName": "",
  "brandNameAr": null,
  "category": "prescription_drug | otc_drug | dietary_supplement",
  "genericName": null,
  "activeIngredients": [],
  "drugClass": null,
  "strength": "",
  "dosageForm": "",
  "route": "",
  "packSize": "",
  "clinical": {
    "approvedIndications": "",
    "usualAdultDose": "",
    "contraindications": "",
    "commonAdverseEffects": "",
    "storageConditions": ""
  },
  "specialties": [],
  "sources": [{ "title": "", "url": "" }],
  "notes": null
}`;

export function buildUserPrompt(req: DraftRequest): string {
  const lines = [`Product: ${req.productName}`];
  if (req.companyName) lines.push(`Company (marketing authorisation holder or manufacturer): ${req.companyName}`);
  if (req.extraContext) {
    lines.push(
      'Extra context from the administrator (treat as a hint, verify against official sources):',
      req.extraContext,
    );
  }
  return lines.join('\n');
}

/** Pull the first JSON object out of model text (tolerates ```json fences and stray text). */
export function extractJsonObject(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end <= start) throw new Error('The AI answer did not contain a JSON object.');
  return JSON.parse(candidate.slice(start, end + 1));
}

function str(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

function strOrNull(value: unknown, max: number): string | null {
  const s = str(value, max);
  return s ? s : null;
}

function strList(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  const out: string[] = [];
  for (const item of value) {
    const s = str(item, max);
    if (s && !out.some((o) => o.toLowerCase() === s.toLowerCase())) out.push(s);
    if (out.length >= LIMITS.listItems) break;
  }
  return out;
}

export function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:';
  } catch {
    return false;
  }
}

function sourceList(value: unknown): DraftSource[] {
  if (!Array.isArray(value)) return [];
  const out: DraftSource[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const url = str((item as Record<string, unknown>).url, 2000);
    if (!isHttpUrl(url) || out.some((o) => o.url === url)) continue;
    out.push({ title: str((item as Record<string, unknown>).title, LIMITS.shortText) || url, url });
    if (out.length >= LIMITS.sources) break;
  }
  return out;
}

/** Turn whatever the model returned into a safe, size-limited draft. */
export function normalizeDraft(raw: unknown, fallbackName: string): ProductDraft {
  const r = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const c = r.clinical && typeof r.clinical === 'object' ? (r.clinical as Record<string, unknown>) : {};
  const category = CATEGORIES.includes(r.category as ProductCategory) ? (r.category as ProductCategory) : null;
  const genericName = category === 'dietary_supplement' ? null : strOrNull(r.genericName, LIMITS.shortText);
  const ingredients = strList(r.activeIngredients, LIMITS.shortText);
  return {
    found: r.found !== false,
    brandName: str(r.brandName, LIMITS.shortText) || fallbackName.slice(0, LIMITS.shortText),
    brandNameAr: strOrNull(r.brandNameAr, LIMITS.shortText),
    category,
    genericName,
    activeIngredients: ingredients.length > 0 || !genericName ? ingredients : [genericName],
    drugClass: strOrNull(r.drugClass, LIMITS.shortText),
    strength: str(r.strength, LIMITS.shortText),
    dosageForm: str(r.dosageForm, LIMITS.shortText),
    route: str(r.route, LIMITS.shortText),
    packSize: str(r.packSize, LIMITS.shortText),
    clinical: {
      approvedIndications: str(c.approvedIndications, LIMITS.clinicalText),
      usualAdultDose: str(c.usualAdultDose, LIMITS.clinicalText),
      contraindications: str(c.contraindications, LIMITS.clinicalText),
      commonAdverseEffects: str(c.commonAdverseEffects, LIMITS.clinicalText),
      storageConditions: str(c.storageConditions, LIMITS.clinicalText),
    },
    specialties: strList(r.specialties, LIMITS.shortText),
    sources: sourceList(r.sources),
    notes: strOrNull(r.notes, LIMITS.notes),
  };
}

/** Everything the administrator must still fill in or check before the product can be published. */
export function draftWarnings(d: ProductDraft, groundingSourceCount: number): string[] {
  const w: string[] = [];
  if (!d.found) w.push('The AI could not confirm this product. Check the name and the notes.');
  if (d.sources.length === 0 && groundingSourceCount === 0) {
    w.push('No sources were returned. Do not publish without checking an official leaflet.');
  }
  if (!d.category) w.push('Choose the category (prescription, OTC or supplement).');
  if (!d.drugClass) w.push('Drug class is missing.');
  if (d.category !== 'dietary_supplement' && !d.genericName) w.push('Generic name is missing.');
  if (!d.strength) w.push('Strength is missing.');
  if (!d.dosageForm) w.push('Dosage form is missing.');
  if (!d.route) w.push('Route is missing.');
  if (!d.packSize) w.push('Pack size is missing (check the Iraqi pack).');
  const clinicalLabels: Record<keyof ClinicalDraft, string> = {
    approvedIndications: 'Approved indications',
    usualAdultDose: 'Usual adult dose',
    contraindications: 'Contraindications',
    commonAdverseEffects: 'Common adverse effects',
    storageConditions: 'Storage conditions',
  };
  for (const key of Object.keys(clinicalLabels) as (keyof ClinicalDraft)[]) {
    if (!d.clinical[key]) w.push(`${clinicalLabels[key]} is missing.`);
  }
  if (d.specialties.length === 0) w.push('Choose at least one specialty.');
  w.push('Iraqi registration number and market status are not filled by AI. Add them if you have them.');
  return w;
}

interface GroundingChunk {
  web?: { uri?: string; title?: string };
}

/** Sources Google Search actually used (from groundingMetadata). */
export function groundingSources(metadata: unknown): DraftSource[] {
  const chunks = (metadata as { groundingChunks?: GroundingChunk[] } | undefined)?.groundingChunks;
  if (!Array.isArray(chunks)) return [];
  const out: DraftSource[] = [];
  for (const chunk of chunks) {
    const url = chunk?.web?.uri ?? '';
    if (!isHttpUrl(url) || out.some((o) => o.url === url)) continue;
    out.push({ title: (chunk.web?.title ?? '').slice(0, LIMITS.shortText) || url, url });
    if (out.length >= LIMITS.sources) break;
  }
  return out;
}

export function searchSuggestionsHtml(metadata: unknown): string | null {
  const html = (metadata as { searchEntryPoint?: { renderedContent?: string } } | undefined)?.searchEntryPoint
    ?.renderedContent;
  return typeof html === 'string' && html.trim() ? html : null;
}

/** Text of the first candidate, joined across parts. */
export function candidateText(response: unknown): string {
  const parts = (response as { candidates?: { content?: { parts?: { text?: string }[] } }[] } | undefined)
    ?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return '';
  return parts.map((p) => (typeof p?.text === 'string' ? p.text : '')).join('');
}

export function candidateGroundingMetadata(response: unknown): unknown {
  return (response as { candidates?: { groundingMetadata?: unknown }[] } | undefined)?.candidates?.[0]
    ?.groundingMetadata;
}
