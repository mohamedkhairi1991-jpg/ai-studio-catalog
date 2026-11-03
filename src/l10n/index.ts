export type SupportedLocale = 'en';

export interface TranslationStrings {
  appName: string;
  adminPortalLabel: string;
  officialCatalogTitle: string;
  officialCatalogSubtitle: string;
  companyWorkspaceTitle: string;
  companyWorkspaceSubtitle: string;
  adminPortalTitle: string;
  adminPortalSubtitle: string;
  signInTitle: string;
  signUpTitle: string;
  emailLabel: string;
  passwordLabel: string;
  confirmPasswordLabel: string;
  signInAction: string;
  signUpAction: string;
  signOutAction: string;
  forgotPasswordAction: string;
  resetPasswordTitle: string;
  resetPasswordAction: string;
  resetEmailSentMessage: string;
  searchPlaceholder: string;
  publishedTag: string;
  verifiedOfficialTag: string;
  marketedInIraq: string;
  notMarketed: string;
  discontinued: string;
  prescriptionDrug: string;
  otcDrug: string;
  dietarySupplement: string;
  indicationsTitle: string;
  dosageTitle: string;
  contraindicationsTitle: string;
  adverseEffectsTitle: string;
  storageTitle: string;
  formulationTitle: string;
  brochuresTitle: string;
  disclaimerTitle: string;
  disclaimerText: string;
  statusDraft: string;
  statusSubmitted: string;
  statusChangesRequested: string;
  statusPublished: string;
  statusHidden: string;
  statusArchived: string;
  createDraftAction: string;
  submitForReview: string;
  withdrawSubmission: string;
  approvePublishAction: string;
  requestChangesAction: string;
  hideProductAction: string;
  unhideProductAction: string;
  archiveAction: string;
  close: string;
  saveChanges: string;
  allSpecialties: string;
  quickRoleSwitch: string;
  roleDoctor: string;
  roleCompany: string;
  roleAdmin: string;
}

export const translations: Record<SupportedLocale, TranslationStrings> = {
  en: {
    appName: 'Pharmaty',
    adminPortalLabel: 'Administration portal',
    officialCatalogTitle: 'Official Catalog',
    officialCatalogSubtitle: 'Authoritative pharmaceutical information for approved healthcare professionals in Iraq.',
    companyWorkspaceTitle: 'Company catalog workspace',
    companyWorkspaceSubtitle: 'Prepare and submit official catalog records. Company-page publication remains a separate workflow.',
    adminPortalTitle: 'Catalog administration',
    adminPortalSubtitle: 'Official catalog review queue and governance decisions.',
    signInTitle: 'Sign in',
    signUpTitle: 'Create account',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm password',
    signInAction: 'Sign in',
    signUpAction: 'Create account',
    signOutAction: 'Sign out',
    forgotPasswordAction: 'Forgot password?',
    resetPasswordTitle: 'Reset password',
    resetPasswordAction: 'Update password',
    resetEmailSentMessage: 'If an account exists, a password reset link has been sent to your email.',
    searchPlaceholder: 'Search official catalog by trade name, generic, company, or drug class...',
    publishedTag: 'Published',
    verifiedOfficialTag: 'Official catalog approved',
    marketedInIraq: 'Marketed in Iraq',
    notMarketed: 'Not marketed',
    discontinued: 'Discontinued',
    prescriptionDrug: 'Prescription Drug',
    otcDrug: 'OTC Drug',
    dietarySupplement: 'Dietary Supplement',
    indicationsTitle: 'Approved Indications',
    dosageTitle: 'Usual Adult Dose',
    contraindicationsTitle: 'Contraindications',
    adverseEffectsTitle: 'Common Adverse Effects',
    storageTitle: 'Storage Conditions',
    formulationTitle: 'Formulation & Market Presence',
    brochuresTitle: 'Official Product Monographs & Brochures',
    disclaimerTitle: 'Medical Information Disclaimer',
    disclaimerText: 'Official catalog information is provided for approved healthcare professionals in Iraq. Not for direct commercial dispensing, retail pricing, or public self-medication.',
    statusDraft: 'Draft',
    statusSubmitted: 'In Review',
    statusChangesRequested: 'Changes Requested',
    statusPublished: 'Published',
    statusHidden: 'Hidden',
    statusArchived: 'Archived',
    createDraftAction: 'Create product draft',
    submitForReview: 'Submit for review',
    withdrawSubmission: 'Withdraw submission',
    approvePublishAction: 'Approve & Publish',
    requestChangesAction: 'Request changes',
    hideProductAction: 'Hide product',
    unhideProductAction: 'Unhide product',
    archiveAction: 'Archive product',
    close: 'Close',
    saveChanges: 'Save changes',
    allSpecialties: 'All Specialties',
    quickRoleSwitch: 'Switch Persona',
    roleDoctor: 'Approved Doctor',
    roleCompany: 'Company Admin',
    roleAdmin: 'Platform Admin',
  },
};
