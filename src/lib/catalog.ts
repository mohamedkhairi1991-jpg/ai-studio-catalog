import type { PostgrestError, SupabaseClient } from '@supabase/supabase-js';

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

export type ContentLocale = 'en' | 'ar';

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
}

export interface CatalogBundle {
  products: CatalogProduct[];
  companies: CompanySummary[];
  drugClasses: TaxonomyItem[];
  genericDrugs: TaxonomyItem[];
  specialties: TaxonomyItem[];
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

export async function loadDrugClasses(client: SupabaseClient): Promise<TaxonomyItem[]> {
  const { data: classesData, error: classesError } = await client
    .from('drug_classes')
    .select('id,code,parent_drug_class_id,is_active');

  if (classesError || !classesData || classesData.length === 0) {
    return [];
  }

  const rows = classesData as Array<{
    id: string;
    code: string;
    parent_drug_class_id: string | null;
    is_active: boolean;
  }>;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await client
    .from('drug_class_translations')
    .select('drug_class_id,locale,name')
    .in('drug_class_id', ids);

  const byId = new Map<string, string>();
  for (const t of (transData ?? []) as Array<{
    drug_class_id: string;
    locale: ContentLocale;
    name: string;
  }>) {
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
  const { data: genericsData, error: genericsError } = await client
    .from('generic_drugs')
    .select('id,code,drug_class_id,is_active');

  if (genericsError || !genericsData || genericsData.length === 0) {
    return [];
  }

  const rows = genericsData as Array<{
    id: string;
    code: string;
    drug_class_id: string;
    is_active: boolean;
  }>;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await client
    .from('generic_drug_translations')
    .select('generic_drug_id,locale,name')
    .in('generic_drug_id', ids);

  const byId = new Map<string, string>();
  for (const t of (transData ?? []) as Array<{
    generic_drug_id: string;
    locale: ContentLocale;
    name: string;
  }>) {
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
  const { data: specData, error: specError } = await client
    .from('specialties')
    .select('id,code,is_active')
    .eq('is_active', true);

  if (specError || !specData || specData.length === 0) {
    return [];
  }

  const rows = specData as Array<{ id: string; code: string; is_active: boolean }>;
  const ids = rows.map((r) => r.id);

  const { data: transData } = await client
    .from('specialty_translations')
    .select('specialty_id,locale,name')
    .in('specialty_id', ids);

  const byId = new Map<string, string>();
  for (const t of (transData ?? []) as Array<{
    specialty_id: string;
    locale: ContentLocale;
    name: string;
  }>) {
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
  const { data, error } = await client
    .from('companies')
    .select(
      'id,company_name,legal_name,status,country_id,city_id,contact_email,contact_phone,website_url,description'
    )
    .neq('status', 'archived')
    .order('company_name');

  if (error || !data) return [];

  return (
    data as Array<{
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
    }>
  )
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
    }))
    .sort((a, b) => a.companyName.localeCompare(b.companyName));
}

export async function loadCatalogBundle(
  client: SupabaseClient
): Promise<RpcResult<CatalogBundle>> {
  const { data: rawProducts, error: productsError } = await client
    .from('products')
    .select(
      'id,company_id,generic_drug_id,drug_class_id,category,status,submitted_at,reviewed_at,review_reason,created_at,updated_at'
    )
    .neq('status', 'archived')
    .order('updated_at', { ascending: false });

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
  const productRows = ((rawProducts ?? []) as RawProductRow[]).filter(
    (p) => p.status !== 'archived' && companyById.has(p.company_id)
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

  if (productIds.length > 0) {
    const [transRes, marketsRes, specRes, mediaRes, keywordsRes, aiDraftsRes] =
      await Promise.all([
        client
          .from('product_translations')
          .select('product_id,locale,brand_name')
          .in('product_id', productIds),
        client
          .from('product_markets')
          .select(
            'id,product_id,strength,dosage_form,route,pack_size,market_status,registration_status,registration_number,registration_authority,registration_expires_on'
          )
          .in('product_id', productIds),
        client
          .from('product_specialties')
          .select('product_id,specialty_id')
          .in('product_id', productIds),
        client
          .from('product_media')
          .select(
            'id,product_id,media_type,storage_path,mime_type,file_size_bytes,sort_order,is_primary'
          )
          .in('product_id', productIds),
        client
          .from('product_search_keywords')
          .select('product_id,locale,keyword,keyword_type')
          .in('product_id', productIds),
        client
          .from('product_ai_drafts')
          .select('product_id')
          .in('product_id', productIds),
      ]);

    for (const row of (aiDraftsRes.data ?? []) as Array<{ product_id: string }>) {
      if (row.product_id) {
        aiDraftProductIds.add(row.product_id);
      }
    }

    for (const row of (transRes.data ?? []) as RawTranslationRow[]) {
      if (row.locale === 'en') {
        translationsByProduct.set(row.product_id, { en: row.brand_name });
      }
    }

    const marketIds: string[] = [];
    for (const row of (marketsRes.data ?? []) as RawMarketRow[]) {
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

    for (const row of (specRes.data ?? []) as RawProductSpecialtyRow[]) {
      const list = specialtiesByProduct.get(row.product_id) ?? [];
      list.push(row.specialty_id);
      specialtiesByProduct.set(row.product_id, list);
    }

    for (const row of (mediaRes.data ?? []) as RawMediaRow[]) {
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

    for (const row of (keywordsRes.data ?? []) as RawKeywordRow[]) {
      if (row.locale === 'en' || row.locale === 'und') {
        const list = keywordsByProduct.get(row.product_id) ?? [];
        list.push(row.keyword);
        keywordsByProduct.set(row.product_id, list);
      }
    }

    if (marketIds.length > 0) {
      const [marketTransRes, brochuresRes] = await Promise.all([
        client
          .from('product_market_translations')
          .select(
            'product_market_id,locale,storage_conditions,approved_indications,usual_adult_dose,contraindications,common_adverse_effects'
          )
          .in('product_market_id', marketIds),
        client
          .from('product_brochures')
          .select(
            'id,product_market_id,locale,title,storage_path,mime_type,file_size_bytes,version,is_current'
          )
          .in('product_market_id', marketIds),
      ]);

      for (const row of (marketTransRes.data ?? []) as RawMarketTranslationRow[]) {
        const entry = marketTranslationsByMarket.get(row.product_market_id) ?? {
          en: null,
          ar: null,
        };
        entry[row.locale] = {
          productMarketId: row.product_market_id,
          locale: row.locale,
          storageConditions: row.storage_conditions,
          approvedIndications: row.approved_indications,
          usualAdultDose: row.usual_adult_dose,
          contraindications: row.contraindications,
          commonAdverseEffects: row.common_adverse_effects,
        };
        marketTranslationsByMarket.set(row.product_market_id, entry);
      }

      for (const row of (brochuresRes.data ?? []) as RawBrochureRow[]) {
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
        ? (marketTranslationsByMarket.get(market.id) ?? { en: null, ar: null })
        : { en: null, ar: null };
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

  const { data, error } = await client.rpc('admin_create_company', {
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
  brandNameAr: string | null;
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
  brandNameAr?: string | null;
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
    } else if (existing.status === 'hidden' || existing.status === 'archived') {
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

  const brandNameAr = trimOrNull(input.brandNameAr);
  if (brandNameAr) {
    const arTr = await rpcUpsertProductTranslation(
      client,
      productId,
      'ar',
      brandNameAr
    );
    if (!arTr.ok) return { ok: false, message: arTr.message };
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