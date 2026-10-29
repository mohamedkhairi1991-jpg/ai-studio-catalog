export type PlatformRole =
  | 'healthcare_professional'
  | 'company_user'
  | 'admin'
  | 'super_admin';

export type CompanyRole =
  | 'company_admin'
  | 'marketing_manager'
  | 'product_manager'
  | 'representative'
  | 'viewer';

export type ProductLifecycleStatus =
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

export type IraqMarketStatus =
  | 'marketed_in_iraq'
  | 'not_marketed'
  | 'discontinued';

export type ProductRegistrationStatus =
  | 'registered'
  | 'pending'
  | 'exempt'
  | 'not_recorded';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: PlatformRole;
  status: 'active' | 'pending' | 'suspended' | 'archived';
  countryIso: string;
  isApprovedPhysician?: boolean;
  companyId?: string;
  companyName?: string;
  companyRole?: CompanyRole;
}

export interface DrugClass {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
}

export interface GenericDrug {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
  drugClassId: string;
}

export interface ProductSpecialty {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
}

export interface BrochureMetadata {
  id: string;
  title: string;
  version: number;
  isCurrent: boolean;
  fileSizeBytes: number;
  fileName: string;
  locale: 'en' | 'ar';
  uploadedAt: string;
}

export interface ProductImageMetadata {
  id: string;
  type: 'product_image' | 'package_image';
  isPrimary: boolean;
  storagePath: string;
  caption?: string;
}

export interface ProductDetail {
  id: string;
  companyId: string;
  companyName: string;
  category: ProductCategory;
  status: ProductLifecycleStatus;
  drugClassId: string;
  drugClassName: string;
  genericDrugId?: string;
  genericDrugName?: string;
  specialtyIds: string[];
  
  // Localized Brand Name
  brandNameEn: string;
  brandNameAr?: string;

  // Iraq Market Specs
  strength: string;
  dosageForm: string;
  route: string;
  packSize: string;
  marketStatus: IraqMarketStatus;
  registrationStatus: ProductRegistrationStatus;
  registrationNumber?: string;
  registrationAuthority?: string;
  registrationExpiresOn?: string;

  // Clinical & Pharmaceutical Content (English required)
  indicationsEn: string;
  usualAdultDoseEn: string;
  contraindicationsEn: string;
  commonAdverseEffectsEn: string;
  storageConditionsEn: string;

  // Optional Arabic translations
  indicationsAr?: string;
  usualAdultDoseAr?: string;
  contraindicationsAr?: string;
  commonAdverseEffectsAr?: string;
  storageConditionsAr?: string;

  // Media
  productImages: ProductImageMetadata[];
  packageImages: ProductImageMetadata[];
  brochures: BrochureMetadata[];

  // Lifecycle Metadata
  createdBy: string;
  submittedBy?: string;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewReason?: string;
  publishedBy?: string;
  publishedAt?: string;
  hiddenBy?: string;
  hiddenAt?: string;
  hiddenReason?: string;
  archivedBy?: string;
  archivedAt?: string;
  archiveReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  productId: string;
  productName: string;
  action: string;
  details?: string;
}
