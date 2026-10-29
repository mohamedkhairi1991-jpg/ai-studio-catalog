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
  nameAr: string | null;
  parentId?: string | null;
  drugClassId?: string | null;
  isActive: boolean;
}

export interface CompanySummary {
  id: string;
  companyName: string;
  status: string;
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
  genericNameAr: string | null;
  drugClassId: string;
  drugClassNameEn: string;
  drugClassNameAr: string | null;
  category: ProductCategory;
  status: ProductStatus;
  brandNameEn: string;
  brandNameAr: string | null;
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

export type RpcResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; message: string };

// ---------- Labels & Formatting Helpers ----------
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  prescription_drug: 'Prescription Drug (Rx)',
  otc_drug: 'Over-the-Counter (OTC)',
  dietary_supplement: 'Dietary Supplement',
};

export const STATUS_LABELS: Record<ProductStatus, string> = {
  draft: 'Draft',
  submitted: 'Submitted for Review',
  changes_requested: 'Changes Requested',
  published: 'Published',
  hidden: 'Hidden',
  archived: 'Archived',
};

export const MARKET_STATUS_LABELS: Record<IraqMarketStatus, string> = {
  marketed_in_iraq: 'Marketed in Iraq',
  not_marketed: 'Not Marketed in Iraq',
  discontinued: 'Discontinued',
};

export const REGISTRATION_STATUS_LABELS: Record<ProductRegistrationStatus, string> = {
  not_recorded: 'Not Recorded',
  registered: 'Registered',
  expired: 'Expired',
  withdrawn: 'Withdrawn',
};

export function trimOrNull(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function formatRpcError(error: PostgrestError | { message: string; details?: string | null }): string {
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
    p_registration_authority: isNotRecorded ? null : trimOrNull(input.registrationAuthority),
    p_registration_expires_on: isNotRecorded ? null : trimOrNull(input.registrationExpiresOn),
  };
}

export interface DoctorFilterOptions {
  query: string;
  drugClassId: string;
  category: string;
}

export function filterDoctorProducts(
  products: CatalogProduct[],
  filters: DoctorFilterOptions
): CatalogProduct[] {
  const normalizedQuery = filters.query.trim().toLowerCase();

  return products.filter((product) => {
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
      product.brandNameAr,
      product.genericNameEn,
      product.genericNameAr,
      product.companyName,
      product.drugClassNameEn,
      product.drugClassNameAr,
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

  const byId = new Map<string, { en?: string; ar?: string }>();
  for (const t of (transData ?? []) as Array<{ drug_class_id: string; locale: ContentLocale; name: string }>) {
    const entry = byId.get(t.drug_class_id) ?? {};
    entry[t.locale] = t.name;
    byId.set(t.drug_class_id, entry);
  }

  return rows
    .map((r) => {
      const names = byId.get(r.id);
      return {
        id: r.id,
        code: r.code,
        nameEn: names?.en ?? r.code,
        nameAr: names?.ar ?? null,
        parentId: r.parent_drug_class_id,
        isActive: r.is_active,
      };
    })
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

  const byId = new Map<string, { en?: string; ar?: string }>();
  for (const t of (transData ?? []) as Array<{ generic_drug_id: string; locale: ContentLocale; name: string }>) {
    const entry = byId.get(t.generic_drug_id) ?? {};
    entry[t.locale] = t.name;
    byId.set(t.generic_drug_id, entry);
  }

  return rows
    .map((r) => {
      const names = byId.get(r.id);
      return {
        id: r.id,
        code: r.code,
        nameEn: names?.en ?? r.code,
        nameAr: names?.ar ?? null,
        drugClassId: r.drug_class_id,
        isActive: r.is_active,
      };
    })
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

  const byId = new Map<string, { en?: string; ar?: string }>();
  for (const t of (transData ?? []) as Array<{ specialty_id: string; locale: ContentLocale; name: string }>) {
    const entry = byId.get(t.specialty_id) ?? {};
    entry[t.locale] = t.name;
    byId.set(t.specialty_id, entry);
  }

  return rows
    .map((r) => {
      const names = byId.get(r.id);
      return {
        id: r.id,
        code: r.code,
        nameEn: names?.en ?? r.code,
        nameAr: names?.ar ?? null,
        isActive: r.is_active,
      };
    })
    .sort((a, b) => a.nameEn.localeCompare(b.nameEn));
}

export async function loadCompanies(client: SupabaseClient): Promise<CompanySummary[]> {
  const { data, error } = await client
    .from('companies')
    .select('id,company_name,status');

  if (error || !data) return [];

  return (data as Array<{ id: string; company_name: string; status: string }>)
    .map((c) => ({
      id: c.id,
      companyName: c.company_name,
      status: c.status,
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
    .order('updated_at', { ascending: false });

  if (productsError) {
    return { ok: false, message: formatRpcError(productsError) };
  }

  const productRows = (rawProducts ?? []) as RawProductRow[];
  const productIds = productRows.map((p) => p.id);

  const [companies, drugClasses, genericDrugs, specialties] = await Promise.all([
    loadCompanies(client),
    loadDrugClasses(client),
    loadGenericDrugs(client),
    loadSpecialtiesCatalog(client),
  ]);

  const companyById = new Map(companies.map((c) => [c.id, c]));
  const drugClassById = new Map(drugClasses.map((d) => [d.id, d]));
  const genericById = new Map(genericDrugs.map((g) => [g.id, g]));
  const specialtyById = new Map(specialties.map((s) => [s.id, s]));

  const translationsByProduct = new Map<string, { en?: string; ar?: string }>();
  const marketByProduct = new Map<string, ProductMarketRecord>();
  const marketTranslationsByMarket = new Map<
    string,
    Record<ContentLocale, ProductMarketTranslationRecord | null>
  >();
  const specialtiesByProduct = new Map<string, string[]>();
  const mediaByProduct = new Map<string, ProductMediaRecord[]>();
  const brochuresByMarket = new Map<string, ProductBrochureRecord[]>();
  const keywordsByProduct = new Map<string, string[]>();

  if (productIds.length > 0) {
    const [transRes, marketsRes, specRes, mediaRes, keywordsRes] = await Promise.all([
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
    ]);

    for (const row of (transRes.data ?? []) as RawTranslationRow[]) {
      const current = translationsByProduct.get(row.product_id) ?? {};
      current[row.locale] = row.brand_name;
      translationsByProduct.set(row.product_id, current);
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
      const list = keywordsByProduct.get(row.product_id) ?? [];
      list.push(row.keyword);
      keywordsByProduct.set(row.product_id, list);
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

  const products: CatalogProduct[] = productRows.map((row) => {
    const company = companyById.get(row.company_id);
    const drugClass = drugClassById.get(row.drug_class_id);
    const generic = row.generic_drug_id ? genericById.get(row.generic_drug_id) : undefined;
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
      genericNameAr: generic?.nameAr ?? null,
      drugClassId: row.drug_class_id,
      drugClassNameEn: drugClass?.nameEn ?? 'Unclassified',
      drugClassNameAr: drugClass?.nameAr ?? null,
      category: row.category,
      status: row.status,
      brandNameEn: trans?.en ?? '(Untitled Draft)',
      brandNameAr: trans?.ar ?? null,
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

  if (error) return { ok: false, message: formatRpcError(error) };
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

  if (error) return { ok: false, message: formatRpcError(error) };
  return { ok: true, data: undefined };
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
