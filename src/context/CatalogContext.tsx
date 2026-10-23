import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AuditLogEntry,
  DrugClass,
  GenericDrug,
  ProductCategory,
  ProductDetail,
  ProductSpecialty,
  UserProfile,
} from '../types';
import {
  INITIAL_AUDIT_LOGS,
  INITIAL_DRUG_CLASSES,
  INITIAL_GENERIC_DRUGS,
  INITIAL_PRODUCTS,
  INITIAL_SPECIALTIES,
  INITIAL_USERS,
} from '../data/seedData';
import { SupportedLocale, TranslationStrings, translations } from '../l10n';

interface ReadinessResult {
  isValid: boolean;
  missingItems: string[];
}

interface CatalogContextType {
  currentUser: UserProfile | null;
  locale: SupportedLocale;
  t: TranslationStrings;
  products: ProductDetail[];
  specialties: ProductSpecialty[];
  drugClasses: DrugClass[];
  genericDrugs: GenericDrug[];
  auditLogs: AuditLogEntry[];
  currentPortal: 'doctor' | 'company' | 'admin' | 'auth';
  
  // Navigation & User
  switchUser: (user: UserProfile) => void;
  setLocale: (locale: SupportedLocale) => void;
  navigateToPortal: (portal: 'doctor' | 'company' | 'admin' | 'auth') => void;
  signOut: () => void;
  signIn: (email: string) => boolean;

  // Lifecycle Operations
  createDraft: (data: {
    companyId: string;
    category: ProductCategory;
    genericDrugId?: string;
    drugClassId: string;
    englishBrandName: string;
  }) => ProductDetail;
  updateProduct: (productId: string, data: Partial<ProductDetail>) => void;
  submitForReview: (productId: string) => { success: boolean; errors?: string[] };
  withdrawSubmission: (productId: string) => void;
  approveAndPublish: (productId: string) => { success: boolean; errors?: string[] };
  requestChanges: (productId: string, reason: string) => void;
  hideProduct: (productId: string, reason: string) => void;
  unhideProduct: (productId: string) => void;
  archiveProduct: (productId: string, reason?: string) => void;
  evaluateReadiness: (product: ProductDetail) => ReadinessResult;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USERS[0]); // Demo Doctor
  const [locale, setLocaleState] = useState<SupportedLocale>('en');
  const [products, setProducts] = useState<ProductDetail[]>(INITIAL_PRODUCTS);
  const [specialties] = useState<ProductSpecialty[]>(INITIAL_SPECIALTIES);
  const [drugClasses] = useState<DrugClass[]>(INITIAL_DRUG_CLASSES);
  const [genericDrugs] = useState<GenericDrug[]>(INITIAL_GENERIC_DRUGS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [currentPortal, setCurrentPortal] = useState<'doctor' | 'company' | 'admin' | 'auth'>('doctor');

  // Handle document direction for RTL
  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
  };

  const t = translations[locale];

  const switchUser = (user: UserProfile) => {
    setCurrentUser(user);
    if (user.role === 'admin' || user.role === 'super_admin') {
      setCurrentPortal('admin');
    } else if (user.role === 'company_user') {
      setCurrentPortal('company');
    } else {
      setCurrentPortal('doctor');
    }
  };

  const signOut = () => {
    setCurrentUser(null);
    setCurrentPortal('auth');
  };

  const signIn = (email: string): boolean => {
    const matched = INITIAL_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (matched) {
      switchUser(matched);
      return true;
    }
    return false;
  };

  const evaluateReadiness = (product: ProductDetail): ReadinessResult => {
    const missing: string[] = [];

    if (!product.brandNameEn?.trim()) {
      missing.push('English brand name is required');
    }
    if (product.category !== 'dietary_supplement' && !product.genericDrugId) {
      missing.push('Generic drug is required for prescription and OTC products');
    }
    if (!product.drugClassId) {
      missing.push('Drug class is required');
    }
    if (product.specialtyIds.length === 0) {
      missing.push('At least one medical specialty must be assigned');
    }
    if (product.marketStatus !== 'marketed_in_iraq') {
      missing.push('Iraq market presence must be marked as "Marketed in Iraq"');
    }
    if (!product.strength?.trim()) missing.push('Product strength is required');
    if (!product.dosageForm?.trim()) missing.push('Dosage form is required');
    if (!product.route?.trim()) missing.push('Route of administration is required');
    if (!product.packSize?.trim()) missing.push('Packaging size is required');
    if (!product.indicationsEn?.trim()) missing.push('Approved clinical indications (English) are required');
    if (!product.usualAdultDoseEn?.trim()) missing.push('Usual adult dose (English) is required');
    if (!product.contraindicationsEn?.trim()) missing.push('Contraindications (English) are required');
    if (!product.commonAdverseEffectsEn?.trim()) missing.push('Common adverse effects (English) are required');
    if (!product.storageConditionsEn?.trim()) missing.push('Storage conditions (English) are required');

    if (product.productImages.length === 0) {
      missing.push('At least one product image is required');
    }
    if (product.packageImages.length === 0) {
      missing.push('At least one packaging image is required');
    }
    if (product.brochures.length === 0) {
      missing.push('At least one official PDF monograph or brochure is required');
    }

    return {
      isValid: missing.length === 0,
      missingItems: missing,
    };
  };

  const logAction = (
    productId: string,
    productName: string,
    action: string,
    details?: string
  ) => {
    const entry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorName: currentUser?.fullName || 'System',
      actorRole: currentUser?.role || 'anonymous',
      productId,
      productName,
      action,
      details,
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const createDraft = (data: {
    companyId: string;
    category: ProductCategory;
    genericDrugId?: string;
    drugClassId: string;
    englishBrandName: string;
  }): ProductDetail => {
    const drugClass = drugClasses.find((d) => d.id === data.drugClassId);
    const generic = genericDrugs.find((g) => g.id === data.genericDrugId);
    const newId = `71000000-0000-4000-8000-${String(products.length + 1).padStart(12, '0')}`;
    const now = new Date().toISOString();

    const newProduct: ProductDetail = {
      id: newId,
      companyId: data.companyId,
      companyName: currentUser?.companyName || 'Al-Rafidain Pharmaceuticals Ltd.',
      category: data.category,
      status: 'draft',
      drugClassId: data.drugClassId,
      drugClassName: drugClass?.nameEn || 'General Therapeutic Class',
      genericDrugId: data.genericDrugId,
      genericDrugName: generic?.nameEn,
      specialtyIds: [],
      brandNameEn: data.englishBrandName,
      strength: '',
      dosageForm: '',
      route: 'Oral',
      packSize: '',
      marketStatus: 'marketed_in_iraq',
      registrationStatus: 'pending',
      indicationsEn: '',
      usualAdultDoseEn: '',
      contraindicationsEn: '',
      commonAdverseEffectsEn: '',
      storageConditionsEn: '',
      productImages: [],
      packageImages: [],
      brochures: [],
      createdBy: currentUser?.id || 'unknown',
      createdAt: now,
      updatedAt: now,
    };

    setProducts((prev) => [newProduct, ...prev]);
    logAction(newId, newProduct.brandNameEn, 'CREATE_DRAFT', 'Created new official catalog product draft.');
    return newProduct;
  };

  const updateProduct = (productId: string, data: Partial<ProductDetail>) => {
    const now = new Date().toISOString();
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updated = { ...p, ...data, updatedAt: now };
          return updated;
        }
        return p;
      })
    );
  };

  const submitForReview = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return { success: false, errors: ['Product not found'] };

    const readiness = evaluateReadiness(target);
    if (!readiness.isValid) {
      return { success: false, errors: readiness.missingItems };
    }

    const now = new Date().toISOString();
    updateProduct(productId, {
      status: 'submitted',
      submittedBy: currentUser?.id,
      submittedAt: now,
      reviewReason: undefined,
    });

    logAction(
      productId,
      target.brandNameEn,
      'SUBMIT_FOR_REVIEW',
      'Company submitted product for official catalog administrative review.'
    );
    return { success: true };
  };

  const withdrawSubmission = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    updateProduct(productId, {
      status: 'draft',
      submittedBy: undefined,
      submittedAt: undefined,
    });

    logAction(
      productId,
      target.brandNameEn,
      'WITHDRAW_SUBMISSION',
      'Company withdrew submission back to draft state.'
    );
  };

  const approveAndPublish = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return { success: false, errors: ['Product not found'] };

    const readiness = evaluateReadiness(target);
    if (!readiness.isValid) {
      return { success: false, errors: readiness.missingItems };
    }

    const now = new Date().toISOString();
    updateProduct(productId, {
      status: 'published',
      publishedBy: currentUser?.id,
      publishedAt: now,
      reviewedBy: currentUser?.id,
      reviewedAt: now,
      reviewReason: undefined,
    });

    logAction(
      productId,
      target.brandNameEn,
      'PUBLISH_OFFICIAL_CATALOG',
      'Administrator approved and officially published product to healthcare professional catalog.'
    );
    return { success: true };
  };

  const requestChanges = (productId: string, reason: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const now = new Date().toISOString();
    updateProduct(productId, {
      status: 'changes_requested',
      reviewedBy: currentUser?.id,
      reviewedAt: now,
      reviewReason: reason,
    });

    logAction(
      productId,
      target.brandNameEn,
      'REQUEST_CHANGES',
      `Administrator requested changes: "${reason}"`
    );
  };

  const hideProduct = (productId: string, reason: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const now = new Date().toISOString();
    updateProduct(productId, {
      status: 'hidden',
      hiddenBy: currentUser?.id,
      hiddenAt: now,
      hiddenReason: reason,
    });

    logAction(
      productId,
      target.brandNameEn,
      'HIDE_PRODUCT',
      `Administrator hid product from official catalog: "${reason}"`
    );
  };

  const unhideProduct = (productId: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    updateProduct(productId, {
      status: 'published',
      hiddenBy: undefined,
      hiddenAt: undefined,
      hiddenReason: undefined,
    });

    logAction(
      productId,
      target.brandNameEn,
      'UNHIDE_PRODUCT',
      'Administrator restored hidden product to published catalog.'
    );
  };

  const archiveProduct = (productId: string, reason?: string) => {
    const target = products.find((p) => p.id === productId);
    if (!target) return;

    const now = new Date().toISOString();
    updateProduct(productId, {
      status: 'archived',
      archivedBy: currentUser?.id,
      archivedAt: now,
      archiveReason: reason,
    });

    logAction(
      productId,
      target.brandNameEn,
      'ARCHIVE_PRODUCT',
      `Product archived: ${reason || 'End of catalog lifecycle'}`
    );
  };

  return (
    <CatalogContext.Provider
      value={{
        currentUser,
        locale,
        t,
        products,
        specialties,
        drugClasses,
        genericDrugs,
        auditLogs,
        currentPortal,
        switchUser,
        setLocale,
        navigateToPortal: setCurrentPortal,
        signOut,
        signIn,
        createDraft,
        updateProduct,
        submitForReview,
        withdrawSubmission,
        approveAndPublish,
        requestChanges,
        hideProduct,
        unhideProduct,
        archiveProduct,
        evaluateReadiness,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
