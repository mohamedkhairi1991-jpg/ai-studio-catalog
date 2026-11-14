import type { SupabaseClient } from '@supabase/supabase-js';
import { groupProductsByTherapeuticClass, type GroupedTherapeuticClass } from './catalog';
import { countryNameFromCode, type CompanyType } from './companies';

/**
 * Company pages: a page per company that doctors open and scroll.
 * Database: get_company_page, get_company_directory, admin_update_company_page,
 * admin_add_company_media, admin_remove_company_media, bucket company-media
 * (migration 20261114120000_company_pages).
 *
 * The "feature" is one image/banner space filled from the company's active
 * sponsored ad. Owner rule: show it WITHOUT any "Ad" or "Sponsored" wording.
 */

export const COMPANY_MEDIA_BUCKET = 'company-media';
export const COMPANY_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const COMPANY_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

export type CompanyPageResult<T> = { ok: true; data: T } | { ok: false; message: string };

export interface CompanyPageProduct {
  productId: string;
  brandNameEn: string;
  genericNameEn: string | null;
  drugClassNameEn: string | null;
  category: string | null;
  strength: string | null;
  dosageForm: string | null;
  manufacturerId: string;
  manufacturerName: string;
  /** True on an agent office page: the product is made by another company. */
  viaAgent: boolean;
}

export interface CompanyPageLink {
  id: string;
  name: string;
}

export interface CompanyPageImage {
  id: string;
  storagePath: string;
  caption: string | null;
}

export interface CompanyPageFeature {
  id: string;
  title: string;
  body: string | null;
  imageUrl: string | null;
  linkUrl: string | null;
}

export interface CompanyPage {
  id: string;
  name: string;
  legalName: string | null;
  companyType: CompanyType;
  originCountryCode: string | null;
  originCountryName: string | null;
  tagline: string | null;
  description: string | null;
  foundedYear: number | null;
  websiteUrl: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  logoPath: string | null;
  coverPath: string | null;
  agents: CompanyPageLink[];
  represents: CompanyPageLink[];
  gallery: CompanyPageImage[];
  feature: CompanyPageFeature | null;
  products: CompanyPageProduct[];
}

export interface CompanyDirectoryEntry {
  companyId: string;
  companyName: string;
  companyType: CompanyType;
  originCountryCode: string | null;
  originCountryName: string | null;
  tagline: string | null;
  logoPath: string | null;
  productCount: number;
}

function message(error: { message?: string } | null | undefined, fallback: string): string {
  return error?.message?.trim() || fallback;
}

function str(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value : null;
}

function asType(value: unknown): CompanyType {
  return value === 'agent' || value === 'both' ? value : 'manufacturer';
}

/** Turn the raw get_company_page JSON into a CompanyPage. */
export function parseCompanyPage(raw: unknown): CompanyPage | null {
  if (!raw || typeof raw !== 'object') return null;
  const root = raw as Record<string, unknown>;
  const c = (root.company ?? null) as Record<string, unknown> | null;
  if (!c || typeof c.id !== 'string') return null;
  const list = (value: unknown) => (Array.isArray(value) ? (value as Record<string, unknown>[]) : []);
  const links = (value: unknown): CompanyPageLink[] =>
    list(value)
      .filter((l) => typeof l.id === 'string')
      .map((l) => ({ id: l.id as string, name: str(l.name) ?? 'Company' }));
  const feature = root.feature as Record<string, unknown> | null | undefined;
  return {
    id: c.id,
    name: str(c.name) ?? 'Company',
    legalName: str(c.legal_name),
    companyType: asType(c.company_type),
    originCountryCode: str(c.origin_country_code),
    originCountryName: countryNameFromCode(str(c.origin_country_code)),
    tagline: str(c.tagline),
    description: str(c.description),
    foundedYear: typeof c.founded_year === 'number' ? c.founded_year : null,
    websiteUrl: str(c.website_url),
    contactEmail: str(c.contact_email),
    contactPhone: str(c.contact_phone),
    logoPath: str(c.logo_path),
    coverPath: str(c.cover_path),
    agents: links(root.agents),
    represents: links(root.represents),
    gallery: list(root.gallery)
      .filter((g) => typeof g.id === 'string' && typeof g.storage_path === 'string')
      .map((g) => ({ id: g.id as string, storagePath: g.storage_path as string, caption: str(g.caption) })),
    feature:
      feature && typeof feature.id === 'string'
        ? {
            id: feature.id,
            title: str(feature.title) ?? '',
            body: str(feature.body),
            imageUrl: str(feature.image_url),
            linkUrl: str(feature.link_url),
          }
        : null,
    products: list(root.products)
      .filter((p) => typeof p.product_id === 'string')
      .map((p) => ({
        productId: p.product_id as string,
        brandNameEn: str(p.brand_name_en) ?? 'Untitled Product',
        genericNameEn: str(p.generic_name_en),
        drugClassNameEn: str(p.drug_class_name_en),
        category: str(p.category),
        strength: str(p.strength),
        dosageForm: str(p.dosage_form),
        manufacturerId: (p.manufacturer_id as string) ?? c.id,
        manufacturerName: str(p.manufacturer_name) ?? (str(c.name) ?? 'Company'),
        viaAgent: p.via_agent === true,
      })),
  };
}

/** Load one company page (approved doctors and admins). */
export async function loadCompanyPage(
  client: SupabaseClient,
  companyId: string
): Promise<CompanyPageResult<CompanyPage>> {
  const id = companyId.trim();
  if (!id) return { ok: false, message: 'Company not found.' };
  const { data, error } = await client.rpc('get_company_page', { p_company_id: id });
  if (error) return { ok: false, message: message(error, 'Could not load the company page.') };
  const page = parseCompanyPage(data);
  return page ? { ok: true, data: page } : { ok: false, message: 'Company not found.' };
}

/** All verified companies with published products, A–Z. */
export async function loadCompanyDirectory(
  client: SupabaseClient
): Promise<CompanyPageResult<CompanyDirectoryEntry[]>> {
  const { data, error } = await client.rpc('get_company_directory');
  if (error) return { ok: false, message: message(error, 'Could not load companies.') };
  const rows = (data ?? []) as Array<Record<string, unknown>>;
  return {
    ok: true,
    data: rows.map((r) => ({
      companyId: r.company_id as string,
      companyName: str(r.company_name) ?? 'Company',
      companyType: asType(r.company_type),
      originCountryCode: str(r.origin_country_code),
      originCountryName: countryNameFromCode(str(r.origin_country_code)),
      tagline: str(r.tagline),
      logoPath: str(r.logo_path),
      productCount: Number(r.product_count ?? 0),
    })),
  };
}

/** Products grouped by therapeutic class, then drug class (same groups as search). */
export function groupCompanyProducts(
  products: readonly CompanyPageProduct[]
): GroupedTherapeuticClass<CompanyPageProduct>[] {
  return groupProductsByTherapeuticClass(products, (p) => ({
    brandNameEn: p.brandNameEn,
    genericNameEn: p.genericNameEn,
    drugClassNameEn: p.drugClassNameEn,
    category: p.category,
  }));
}

/** Facts row under the company name: "Switzerland · Founded 1996 · 79 medicines". */
export function companyFacts(page: Pick<CompanyPage, 'originCountryName' | 'foundedYear' | 'products'>): string {
  const count = page.products.length;
  return [
    page.originCountryName,
    page.foundedYear ? `Founded ${page.foundedYear}` : null,
    count > 0 ? `${count} ${count === 1 ? 'medicine' : 'medicines'}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

/** Public URL of an image in the company-media bucket, or null. */
export function companyMediaUrl(client: SupabaseClient, path: string | null | undefined): string | null {
  const clean = (path ?? '').trim();
  if (!clean) return null;
  return client.storage.from(COMPANY_MEDIA_BUCKET).getPublicUrl(clean).data.publicUrl ?? null;
}

/** Hash route of a company page. */
export function buildCompanyRouteHash(companyId: string): string {
  return `#/company/${encodeURIComponent(companyId.trim())}`;
}

/** Company id from "#/company/<id>", else null. */
export function parseCompanyRoute(hashOrRoute: string): string | null {
  const match = hashOrRoute.replace(/^#/, '').trim().match(/^\/?company\/([^/?#]+)\/?$/i);
  if (!match) return null;
  try {
    return decodeURIComponent(match[1]).trim() || null;
  } catch {
    return match[1].trim() || null;
  }
}

/** Hash route of the companies list. */
export const COMPANY_DIRECTORY_ROUTE = '#/companies';

/** Check an image before upload; returns an error message or null. */
export function checkCompanyImage(file: { size: number; type: string }): string | null {
  if (!(COMPANY_IMAGE_TYPES as readonly string[]).includes(file.type)) {
    return 'Use a JPG, PNG or WebP image.';
  }
  if (file.size > COMPANY_IMAGE_MAX_BYTES) return 'The image must be 5 MB or smaller.';
  return null;
}

/** Admin: upload an image for a company; returns its storage path. */
export async function uploadCompanyImage(
  client: SupabaseClient,
  companyId: string,
  file: File,
  kind: 'logo' | 'cover' | 'gallery'
): Promise<CompanyPageResult<string>> {
  const problem = checkCompanyImage(file);
  if (problem) return { ok: false, message: problem };
  const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${companyId.trim()}/${kind}-${Date.now()}.${ext}`;
  const { error } = await client.storage
    .from(COMPANY_MEDIA_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) return { ok: false, message: message(error, 'Could not upload the image.') };
  return { ok: true, data: path };
}

/** Admin: save tagline, founded year, logo and cover (null clears a field). */
export async function adminUpdateCompanyPage(
  client: SupabaseClient,
  input: {
    companyId: string;
    tagline?: string | null;
    foundedYear?: number | null;
    logoPath?: string | null;
    coverPath?: string | null;
  }
): Promise<CompanyPageResult<void>> {
  const tagline = (input.tagline ?? '').trim();
  if (tagline.length > 140) return { ok: false, message: 'The tagline must be 140 characters or fewer.' };
  const year = input.foundedYear ?? null;
  if (year !== null && (!Number.isInteger(year) || year < 1800 || year > 2100)) {
    return { ok: false, message: 'Enter a founded year between 1800 and 2100.' };
  }
  const { error } = await client.rpc('admin_update_company_page', {
    p_company_id: input.companyId,
    p_tagline: tagline || null,
    p_founded_year: year,
    p_logo_path: input.logoPath ?? null,
    p_cover_path: input.coverPath ?? null,
  });
  return error ? { ok: false, message: message(error, 'Could not save the company page.') } : { ok: true, data: undefined };
}

/** Admin: add an uploaded image to the company gallery. */
export async function adminAddCompanyMedia(
  client: SupabaseClient,
  input: { companyId: string; storagePath: string; caption?: string | null; sortOrder?: number }
): Promise<CompanyPageResult<void>> {
  const caption = (input.caption ?? '').trim();
  if (caption.length > 140) return { ok: false, message: 'The caption must be 140 characters or fewer.' };
  const { error } = await client.rpc('admin_add_company_media', {
    p_company_id: input.companyId,
    p_storage_path: input.storagePath,
    p_caption: caption || null,
    p_sort_order: input.sortOrder ?? 0,
  });
  return error ? { ok: false, message: message(error, 'Could not add the image.') } : { ok: true, data: undefined };
}

/** Admin: remove an image from the company gallery. */
export async function adminRemoveCompanyMedia(
  client: SupabaseClient,
  mediaId: string
): Promise<CompanyPageResult<void>> {
  const { error } = await client.rpc('admin_remove_company_media', { p_media_id: mediaId });
  return error ? { ok: false, message: message(error, 'Could not remove the image.') } : { ok: true, data: undefined };
}
