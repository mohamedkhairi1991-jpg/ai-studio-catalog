export enum ProductLifecycleStatus {
  Draft = 'draft',
  Submitted = 'submitted',
  ChangesRequested = 'changes_requested',
  Published = 'published',
  Hidden = 'hidden',
  Archived = 'archived',
}

export enum ProductCategory {
  PrescriptionDrug = 'prescription_drug',
  OtcDrug = 'otc_drug',
  DietarySupplement = 'dietary_supplement',
}

export enum MarketStatus {
  MarketedInIraq = 'marketed_in_iraq',
  NotMarketed = 'not_marketed',
  Discontinued = 'discontinued',
}

export enum RegistrationStatus {
  Registered = 'registered',
  PendingRegistration = 'pending_registration',
  Exempt = 'exempt',
}

export enum MediaType {
  ProductImage = 'product_image',
  PackageImage = 'package_image',
}

export enum PlatformRole {
  HealthcareProfessional = 'healthcare_professional',
  CompanyUser = 'company_user',
  Admin = 'admin',
  SuperAdmin = 'super_admin',
}

export enum CompanyRole {
  CompanyAdmin = 'company_admin',
  MarketingManager = 'marketing_manager',
  ProductManager = 'product_manager',
  Representative = 'representative',
  Viewer = 'viewer',
}

export interface TaxonomyItem {
  id: string;
  code: string;
  nameEn: string;
  nameAr?: string;
  descriptionEn: string;
  isActive: boolean;
}

export interface GenericDrugItem extends TaxonomyItem {
  drugClassId: string;
  ingredients: string[];
}

export interface CompanyRecord {
  id: string;
  companyName: string;
  legalName: string;
  description: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  status: 'verified' | 'pending' | 'suspended' | 'archived';
  verifiedAt: string;
}

export interface ProductMediaRecord {
  id: string;
  productId: string;
  mediaType: MediaType;
  bucketId: 'catalog-product-media';
  storagePath: string;
  fileName: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
  fileSizeBytes: number;
  sortOrder: number;
  isPrimary: boolean;
  uploadedBy: string;
  createdAt: string;
  previewDataUrl: string;
}

export interface ProductBrochureRecord {
  id: string;
  productMarketId: string;
  productId: string;
  locale: 'en' | 'ar';
  title: string;
  bucketId: 'catalog-brochures';
  storagePath: string;
  fileName: string;
  mimeType: 'application/pdf';
  fileSizeBytes: number;
  version: number;
  isCurrent: boolean;
  uploadedBy: string;
  createdAt: string;
  summaryNotes: string;
}

export interface ProductMarketRecord {
  id: string;
  productId: string;
  countryCode: 'IQ';
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  marketStatus: MarketStatus;
  registrationStatus: RegistrationStatus;
  registrationNumber: string;
  registrationAuthority: string;
  registrationExpiresOn: string;
  storageConditionsEn: string;
  approvedIndicationsEn: string;
  usualAdultDoseEn: string;
  contraindicationsEn: string;
  commonAdverseEffectsEn: string;
}

export interface ProductRecord {
  id: string;
  companyId: string;
  genericDrugId: string;
  drugClassId: string;
  category: ProductCategory;
  status: ProductLifecycleStatus;
  brandNameEn: string;
  brandNameAr?: string;
  specialtyIds: string[];
  iraqMarket: ProductMarketRecord;
  media: ProductMediaRecord[];
  brochures: ProductBrochureRecord[];
  createdBy: string;
  updatedBy: string;
  submittedBy: string | null;
  submittedAt: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewReason: string | null;
  publishedBy: string | null;
  publishedAt: string | null;
  hiddenBy: string | null;
  hiddenAt: string | null;
  hiddenReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DemoUserSession {
  profileId: string;
  fullName: string;
  email: string;
  phone: string;
  role: PlatformRole;
  companyRole?: CompanyRole;
  companyId?: string;
  professionType?: 'physician' | 'pharmacist';
  verificationStatus?: 'approved' | 'pending' | 'rejected';
  specialtyName?: string;
  workplace?: string;
  licenseNumber?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetName: string;
  details: string;
}
