import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ProductCategory, ProductDetail } from '../types';
import {
  Building2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  X,
  ChevronRight,
  Archive,
  RotateCcw,
  Send,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

export const CompanyCatalogView: React.FC = () => {
  const {
    products,
    drugClasses,
    genericDrugs,
    specialties,
    createDraft,
    updateProduct,
    submitForReview,
    withdrawSubmission,
    archiveProduct,
    evaluateReadiness,
    currentUser,
    t,
  } = useCatalog();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form states for creating a new draft
  const [newBrandName, setNewBrandName] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('prescription_drug');
  const [newGenericDrugId, setNewGenericDrugId] = useState<string>(genericDrugs[0]?.id || '');
  const [newDrugClassId, setNewDrugClassId] = useState<string>(drugClasses[0]?.id || '');

  // Form states for editing selected product
  const [editBrandNameEn, setEditBrandNameEn] = useState('');
  const [editBrandNameAr, setEditBrandNameAr] = useState('');
  const [editStrength, setEditStrength] = useState('');
  const [editDosageForm, setEditDosageForm] = useState('');
  const [editRoute, setEditRoute] = useState('');
  const [editPackSize, setEditPackSize] = useState('');
  const [editRegNumber, setEditRegNumber] = useState('');
  const [editRegAuthority, setEditRegAuthority] = useState('');
  const [editIndicationsEn, setEditIndicationsEn] = useState('');
  const [editUsualAdultDoseEn, setEditUsualAdultDoseEn] = useState('');
  const [editContraindicationsEn, setEditContraindicationsEn] = useState('');
  const [editAdverseEffectsEn, setEditAdverseEffectsEn] = useState('');
  const [editStorageConditionsEn, setEditStorageConditionsEn] = useState('');
  const [editSpecialtyIds, setEditSpecialtyIds] = useState<string[]>([]);

  // Company users only see their company's products
  const companyId = currentUser?.companyId || 'company-rafidain-001';
  const companyProducts = products.filter((p) => p.companyId === companyId);

  const editableCount = companyProducts.filter((p) => p.status === 'draft' || p.status === 'changes_requested').length;
  const inReviewCount = companyProducts.filter((p) => p.status === 'submitted').length;
  const publishedCount = companyProducts.filter((p) => p.status === 'published').length;

  const openEditor = (product: ProductDetail) => {
    setSelectedProduct(product);
    setEditBrandNameEn(product.brandNameEn);
    setEditBrandNameAr(product.brandNameAr || '');
    setEditStrength(product.strength || '');
    setEditDosageForm(product.dosageForm || '');
    setEditRoute(product.route || 'Oral');
    setEditPackSize(product.packSize || '');
    setEditRegNumber(product.registrationNumber || '');
    setEditRegAuthority(product.registrationAuthority || 'Kimadia');
    setEditIndicationsEn(product.indicationsEn || '');
    setEditUsualAdultDoseEn(product.usualAdultDoseEn || '');
    setEditContraindicationsEn(product.contraindicationsEn || '');
    setEditAdverseEffectsEn(product.commonAdverseEffectsEn || '');
    setEditStorageConditionsEn(product.storageConditionsEn || '');
    setEditSpecialtyIds([...product.specialtyIds]);
    setFeedbackMessage(null);
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrandName.trim()) return;

    const created = createDraft({
      companyId,
      category: newCategory,
      genericDrugId: newCategory === 'dietary_supplement' ? undefined : newGenericDrugId,
      drugClassId: newDrugClassId,
      englishBrandName: newBrandName.trim(),
    });

    setIsCreateModalOpen(false);
    setNewBrandName('');
    openEditor(created);
  };

  const handleSaveProduct = () => {
    if (!selectedProduct) return;

    updateProduct(selectedProduct.id, {
      brandNameEn: editBrandNameEn,
      brandNameAr: editBrandNameAr || undefined,
      strength: editStrength,
      dosageForm: editDosageForm,
      route: editRoute,
      packSize: editPackSize,
      registrationNumber: editRegNumber,
      registrationAuthority: editRegAuthority,
      indicationsEn: editIndicationsEn,
      usualAdultDoseEn: editUsualAdultDoseEn,
      contraindicationsEn: editContraindicationsEn,
      commonAdverseEffectsEn: editAdverseEffectsEn,
      storageConditionsEn: editStorageConditionsEn,
      specialtyIds: editSpecialtyIds,
    });

    // Refresh selectedProduct local reference
    const updated = products.find((p) => p.id === selectedProduct.id);
    if (updated) setSelectedProduct(updated);

    setFeedbackMessage({ type: 'success', text: 'Product changes saved successfully.' });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleSimulateAddMedia = (type: 'product' | 'package' | 'brochure') => {
    if (!selectedProduct) return;

    if (type === 'product') {
      const newImg = {
        id: `img-${Date.now()}`,
        type: 'product_image' as const,
        isPrimary: true,
        storagePath: `/media/catalog/${selectedProduct.brandNameEn.toLowerCase().replace(/\s+/g, '_')}_pill.webp`,
        caption: `${selectedProduct.brandNameEn} formulation photo`,
      };
      updateProduct(selectedProduct.id, {
        productImages: [...selectedProduct.productImages, newImg],
      });
    } else if (type === 'package') {
      const newPkg = {
        id: `pkg-${Date.now()}`,
        type: 'package_image' as const,
        isPrimary: true,
        storagePath: `/media/catalog/${selectedProduct.brandNameEn.toLowerCase().replace(/\s+/g, '_')}_box.webp`,
        caption: `${selectedProduct.brandNameEn} packaging photo`,
      };
      updateProduct(selectedProduct.id, {
        packageImages: [...selectedProduct.packageImages, newPkg],
      });
    } else if (type === 'brochure') {
      const newBrochure = {
        id: `bro-${Date.now()}`,
        title: `${selectedProduct.brandNameEn} Professional Product Monograph`,
        version: selectedProduct.brochures.length + 1,
        isCurrent: true,
        fileSizeBytes: 450000,
        fileName: `${selectedProduct.brandNameEn.replace(/\s+/g, '_')}_Monograph_IQ.pdf`,
        locale: 'en' as const,
        uploadedAt: new Date().toISOString(),
      };
      updateProduct(selectedProduct.id, {
        brochures: [...selectedProduct.brochures, newBrochure],
      });
    }

    const updated = products.find((p) => p.id === selectedProduct.id);
    if (updated) setSelectedProduct(updated);

    setFeedbackMessage({ type: 'success', text: `Attached ${type} asset successfully.` });
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleSubmitForReview = () => {
    if (!selectedProduct) return;
    handleSaveProduct();

    const res = submitForReview(selectedProduct.id);
    if (res.success) {
      setFeedbackMessage({ type: 'success', text: 'Product submitted for official catalog review.' });
      setSelectedProduct(null);
    } else {
      setFeedbackMessage({
        type: 'error',
        text: `Cannot submit: ${res.errors?.join(', ')}`,
      });
    }
  };

  const handleWithdraw = () => {
    if (!selectedProduct) return;
    withdrawSubmission(selectedProduct.id);
    setFeedbackMessage({ type: 'success', text: 'Submission withdrawn back to draft.' });
    setSelectedProduct(null);
  };

  const handleArchive = () => {
    if (!selectedProduct) return;
    archiveProduct(selectedProduct.id, 'Archived by company regulatory manager');
    setFeedbackMessage({ type: 'success', text: 'Product archived.' });
    setSelectedProduct(null);
  };

  const toggleSpecialty = (specId: string) => {
    setEditSpecialtyIds((prev) =>
      prev.includes(specId) ? prev.filter((id) => id !== specId) : [...prev, specId]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Company Metrics */}
      <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-[11px] font-bold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <Building2 className="w-3 h-3" />
                <span>{currentUser?.companyName || 'Al-Rafidain Pharmaceuticals Ltd.'}</span>
              </span>
              <span className="text-xs text-[#38C976] font-semibold">&bull; Verified Company</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F5F8] tracking-tight">
              {t.companyWorkspaceTitle}
            </h1>
            <p className="text-sm text-[#B8C3CC] max-w-3xl">
              {t.companyWorkspaceSubtitle}
            </p>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 rtl:space-x-reverse transition-colors shrink-0 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{t.createDraftAction}</span>
          </button>
        </div>

        {/* Workflow Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#304451] border border-[#51616D] rounded-lg p-4">
            <div className="text-2xl font-bold text-[#5DB4F2]">{editableCount}</div>
            <div className="text-xs text-[#B8C3CC] font-medium">Editable (Drafts & Requested)</div>
          </div>
          <div className="bg-[#304451] border border-[#51616D] rounded-lg p-4">
            <div className="text-2xl font-bold text-[#F59E0B]">{inReviewCount}</div>
            <div className="text-xs text-[#B8C3CC] font-medium">In Administrative Review</div>
          </div>
          <div className="bg-[#304451] border border-[#51616D] rounded-lg p-4">
            <div className="text-2xl font-bold text-[#38C976]">{publishedCount}</div>
            <div className="text-xs text-[#B8C3CC] font-medium">Published in Official Catalog</div>
          </div>
        </div>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center space-x-2 rtl:space-x-reverse ${
            feedbackMessage.type === 'success'
              ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
              : 'bg-[#4B2528] border border-[#A9474E] text-[#FF7272]'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Product List Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#F2F5F8]">
            Company Product Catalog ({companyProducts.length} records)
          </h2>
          <p className="text-xs text-[#B8C3CC]">
            Draft, review, and publication status for official Iraqi submissions.
          </p>
        </div>
      </div>

      {/* Company Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {companyProducts.map((product) => {
          const readiness = evaluateReadiness(product);
          return (
            <div
              key={product.id}
              onClick={() => openEditor(product)}
              className="bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] transition-colors rounded-xl p-5 flex flex-col justify-between cursor-pointer group shadow-sm"
            >
              <div className="space-y-3">
                {/* Header row with status badge */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-lg bg-[#304451] border border-[#51616D] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#5DB4F2]" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      product.status === 'published'
                        ? 'bg-[#193D2D] text-[#38C976] border-[#2F8F5C]'
                        : product.status === 'submitted'
                        ? 'bg-[#4A3B1C] text-[#F59E0B] border-[#A56F0B]'
                        : product.status === 'changes_requested'
                        ? 'bg-[#4B2528] text-[#FF7272] border-[#A9474E]'
                        : 'bg-[#253F51] text-[#5DB4F2] border-[#46718F]'
                    }`}
                  >
                    {product.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Brand & generic */}
                <div>
                  <h3 className="text-lg font-bold text-[#F2F5F8] group-hover:text-[#5DB4F2] transition-colors">
                    {product.brandNameEn}
                  </h3>
                  {product.brandNameAr && (
                    <div className="text-xs text-[#B8C3CC]" dir="rtl">
                      {product.brandNameAr}
                    </div>
                  )}
                  <p className="text-xs text-[#B8C3CC] mt-1">
                    {product.genericDrugName || 'Generic pending'} &bull; {product.drugClassName}
                  </p>
                </div>

                {/* Changes Requested Banner */}
                {product.status === 'changes_requested' && product.reviewReason && (
                  <div className="bg-[#4B2528] border border-[#A9474E] rounded p-2.5 text-[11px] text-[#FF7272] space-y-1">
                    <span className="font-bold flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Reviewer Feedback:</span>
                    </span>
                    <p className="line-clamp-2">{product.reviewReason}</p>
                  </div>
                )}

                {/* Readiness summary */}
                <div className="bg-[#1F2D38] border border-[#51616D] rounded p-2.5 text-[11px]">
                  <div className="flex items-center justify-between text-[#84919B]">
                    <span>Submission Readiness</span>
                    <span
                      className={`font-bold ${
                        readiness.isValid ? 'text-[#38C976]' : 'text-[#F59E0B]'
                      }`}
                    >
                      {readiness.isValid ? 'Complete' : `${readiness.missingItems.length} items missing`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-4 pt-3 border-t border-[#51616D] flex items-center justify-between text-xs text-[#B8C3CC]">
                <span>Updated: {new Date(product.updatedAt).toLocaleDateString()}</span>
                <span className="text-[#5DB4F2] font-semibold flex items-center space-x-1 rtl:space-x-reverse">
                  <span>Open Workspace</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Product Draft Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#263744] border border-[#83939F] rounded-xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#F2F5F8]">
                  {t.createDraftAction}
                </h3>
                <p className="text-xs text-[#B8C3CC] mt-1">
                  Enter baseline catalog taxonomy to initialize official submission.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#84919B] hover:text-[#F2F5F8] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F2F5F8] font-semibold mb-1">
                  English Brand / Trade Name *
                </label>
                <input
                  type="text"
                  required
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="e.g. Cardiostead 5 mg"
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                />
              </div>

              <div>
                <label className="block text-[#F2F5F8] font-semibold mb-1">
                  Product Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                >
                  <option value="prescription_drug">Prescription Drug</option>
                  <option value="otc_drug">OTC Drug</option>
                  <option value="dietary_supplement">Dietary Supplement</option>
                </select>
              </div>

              <div>
                <label className="block text-[#F2F5F8] font-semibold mb-1">
                  Drug Class *
                </label>
                <select
                  value={newDrugClassId}
                  onChange={(e) => setNewDrugClassId(e.target.value)}
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                >
                  {drugClasses.map((dc) => (
                    <option key={dc.id} value={dc.id}>
                      {dc.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {newCategory !== 'dietary_supplement' && (
                <div>
                  <label className="block text-[#F2F5F8] font-semibold mb-1">
                    Generic / Scientific Active Substance *
                  </label>
                  <select
                    value={newGenericDrugId}
                    onChange={(e) => setNewGenericDrugId(e.target.value)}
                    className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                  >
                    {genericDrugs.map((gd) => (
                      <option key={gd.id} value={gd.id}>
                        {gd.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="pt-3 flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-[#304451] hover:bg-[#51616D] text-[#F2F5F8] font-semibold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#1769AA] hover:bg-[#1E78BA] text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Initialize Draft
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Editor Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#263744] border border-[#83939F] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#263744] border-b border-[#51616D] p-5 flex items-start justify-between z-10">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      selectedProduct.status === 'published'
                        ? 'bg-[#193D2D] text-[#38C976] border-[#2F8F5C]'
                        : selectedProduct.status === 'submitted'
                        ? 'bg-[#4A3B1C] text-[#F59E0B] border-[#A56F0B]'
                        : selectedProduct.status === 'changes_requested'
                        ? 'bg-[#4B2528] text-[#FF7272] border-[#A9474E]'
                        : 'bg-[#253F51] text-[#5DB4F2] border-[#46718F]'
                    }`}
                  >
                    STATUS: {selectedProduct.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-[#B8C3CC]">
                    ID: {selectedProduct.id.slice(0, 8)}...
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#F2F5F8] mt-1">
                  {selectedProduct.brandNameEn}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#84919B] hover:text-[#F2F5F8] p-1.5 rounded-md hover:bg-[#304451]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs">
              {/* Changes Requested Warning */}
              {selectedProduct.status === 'changes_requested' && selectedProduct.reviewReason && (
                <div className="bg-[#4B2528] border border-[#A9474E] rounded-lg p-4 space-y-1">
                  <div className="text-xs font-bold text-[#FF7272] flex items-center space-x-2 rtl:space-x-reverse">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Administrator Feedback Requiring Correction:</span>
                  </div>
                  <p className="text-xs text-[#F2F5F8] font-medium leading-relaxed">
                    {selectedProduct.reviewReason}
                  </p>
                </div>
              )}

              {/* Readiness summary checklist banner */}
              {(() => {
                const readiness = evaluateReadiness(selectedProduct);
                return (
                  <div
                    className={`border rounded-lg p-4 ${
                      readiness.isValid
                        ? 'bg-[#193D2D]/60 border-[#2F8F5C]'
                        : 'bg-[#253F51] border-[#46718F]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#F2F5F8] flex items-center space-x-1.5 rtl:space-x-reverse">
                        <CheckCircle2 className="w-4 h-4 text-[#5DB4F2]" />
                        <span>Pre-flight Official Submission Requirements</span>
                      </span>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          readiness.isValid
                            ? 'bg-[#38C976] text-black'
                            : 'bg-[#F59E0B] text-black'
                        }`}
                      >
                        {readiness.isValid ? 'Eligible for Review' : 'Missing Information'}
                      </span>
                    </div>
                    {!readiness.isValid && (
                      <ul className="list-disc list-inside text-[11px] text-[#B8C3CC] space-y-0.5">
                        {readiness.missingItems.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })()}

              {/* Section 1: Names and Classification */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Product Identity & Localizations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Brand Name (English) *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editBrandNameEn}
                      onChange={(e) => setEditBrandNameEn(e.target.value)}
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Brand Name (Arabic - Optional)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      disabled={selectedProduct.status === 'published'}
                      value={editBrandNameAr}
                      onChange={(e) => setEditBrandNameAr(e.target.value)}
                      placeholder="مثال: كارديوستيد 5 ملغ"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Iraq Market & Formulation */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Formulation & Iraqi Market Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Strength *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editStrength}
                      onChange={(e) => setEditStrength(e.target.value)}
                      placeholder="e.g. 5 mg or 100 mcg"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Dosage Form *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editDosageForm}
                      onChange={(e) => setEditDosageForm(e.target.value)}
                      placeholder="e.g. Film-coated tablet"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Route *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editRoute}
                      onChange={(e) => setEditRoute(e.target.value)}
                      placeholder="Oral / Inhalation"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Pack Size *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editPackSize}
                      onChange={(e) => setEditPackSize(e.target.value)}
                      placeholder="e.g. 30 Tablets"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editRegNumber}
                      onChange={(e) => setEditRegNumber(e.target.value)}
                      placeholder="IQ-MOH-2025-XXXX"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Authority
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editRegAuthority}
                      onChange={(e) => setEditRegAuthority(e.target.value)}
                      placeholder="Kimadia / MOH Iraq"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Clinical Indications & Dosing */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Clinical Information (English Required)
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Approved Clinical Indications *
                    </label>
                    <textarea
                      rows={2}
                      disabled={selectedProduct.status === 'published'}
                      value={editIndicationsEn}
                      onChange={(e) => setEditIndicationsEn(e.target.value)}
                      placeholder="Approved therapeutic indications..."
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Usual Adult Dose & Administration *
                    </label>
                    <textarea
                      rows={2}
                      disabled={selectedProduct.status === 'published'}
                      value={editUsualAdultDoseEn}
                      onChange={(e) => setEditUsualAdultDoseEn(e.target.value)}
                      placeholder="Dosage guidelines for adults..."
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Contraindications *
                    </label>
                    <textarea
                      rows={2}
                      disabled={selectedProduct.status === 'published'}
                      value={editContraindicationsEn}
                      onChange={(e) => setEditContraindicationsEn(e.target.value)}
                      placeholder="Conditions under which the product must not be used..."
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Common Adverse Effects *
                    </label>
                    <textarea
                      rows={2}
                      disabled={selectedProduct.status === 'published'}
                      value={editAdverseEffectsEn}
                      onChange={(e) => setEditAdverseEffectsEn(e.target.value)}
                      placeholder="Common adverse reactions observed in clinical practice..."
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#F2F5F8] font-semibold mb-1">
                      Storage Conditions *
                    </label>
                    <input
                      type="text"
                      disabled={selectedProduct.status === 'published'}
                      value={editStorageConditionsEn}
                      onChange={(e) => setEditStorageConditionsEn(e.target.value)}
                      placeholder="e.g. Store below 25°C in original package"
                      className="w-full bg-[#263744] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-xs text-[#F2F5F8]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Specialty mapping */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Target Medical Specialties (At least 1 required)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((spec) => {
                    const isSelected = editSpecialtyIds.includes(spec.id);
                    return (
                      <button
                        key={spec.id}
                        type="button"
                        disabled={selectedProduct.status === 'published'}
                        onClick={() => toggleSpecialty(spec.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#1769AA] text-white border border-[#5DB4F2]'
                            : 'bg-[#263744] text-[#B8C3CC] border border-[#51616D] hover:bg-[#304451]'
                        }`}
                      >
                        {spec.nameEn}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section 5: Media and Brochure Assets */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Media & Official PDF Monograph Assets
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Product Image */}
                  <div className="bg-[#263744] border border-[#51616D] rounded p-3 text-center space-y-2">
                    <ImageIcon className="w-6 h-6 text-[#5DB4F2] mx-auto" />
                    <div className="font-semibold text-[#F2F5F8]">Product Image</div>
                    <div className="text-[11px] text-[#B8C3CC]">
                      {selectedProduct.productImages.length > 0
                        ? `${selectedProduct.productImages.length} image attached`
                        : 'No image uploaded'}
                    </div>
                    {selectedProduct.status !== 'published' && (
                      <button
                        type="button"
                        onClick={() => handleSimulateAddMedia('product')}
                        className="text-xs bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] px-2.5 py-1 rounded transition-colors w-full"
                      >
                        + Upload Product Photo
                      </button>
                    )}
                  </div>

                  {/* Packaging Image */}
                  <div className="bg-[#263744] border border-[#51616D] rounded p-3 text-center space-y-2">
                    <ImageIcon className="w-6 h-6 text-[#5DB4F2] mx-auto" />
                    <div className="font-semibold text-[#F2F5F8]">Package Box Image</div>
                    <div className="text-[11px] text-[#B8C3CC]">
                      {selectedProduct.packageImages.length > 0
                        ? `${selectedProduct.packageImages.length} packaging attached`
                        : 'No box photo uploaded'}
                    </div>
                    {selectedProduct.status !== 'published' && (
                      <button
                        type="button"
                        onClick={() => handleSimulateAddMedia('package')}
                        className="text-xs bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] px-2.5 py-1 rounded transition-colors w-full"
                      >
                        + Upload Package Photo
                      </button>
                    )}
                  </div>

                  {/* Official PDF Monograph */}
                  <div className="bg-[#263744] border border-[#51616D] rounded p-3 text-center space-y-2">
                    <FileText className="w-6 h-6 text-[#5DB4F2] mx-auto" />
                    <div className="font-semibold text-[#F2F5F8]">PDF Monograph</div>
                    <div className="text-[11px] text-[#B8C3CC]">
                      {selectedProduct.brochures.length > 0
                        ? `${selectedProduct.brochures.length} brochure attached`
                        : 'No PDF brochure'}
                    </div>
                    {selectedProduct.status !== 'published' && (
                      <button
                        type="button"
                        onClick={() => handleSimulateAddMedia('brochure')}
                        className="text-xs bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] px-2.5 py-1 rounded transition-colors w-full"
                      >
                        + Upload Official PDF
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="border-t border-[#51616D] p-5 bg-[#263744] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {selectedProduct.status !== 'published' && selectedProduct.status !== 'archived' && (
                  <button
                    onClick={handleArchive}
                    className="text-xs text-[#FF7272] hover:bg-[#4B2528] px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Archive Draft</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="bg-[#304451] hover:bg-[#51616D] text-[#F2F5F8] text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>

                {selectedProduct.status === 'submitted' ? (
                  <button
                    onClick={handleWithdraw}
                    className="bg-[#F59E0B] hover:bg-[#A56F0B] text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Withdraw Submission</span>
                  </button>
                ) : selectedProduct.status !== 'published' ? (
                  <>
                    <button
                      onClick={handleSaveProduct}
                      className="bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] text-xs font-semibold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                    >
                      <FileEdit className="w-4 h-4 text-[#5DB4F2]" />
                      <span>Save Draft</span>
                    </button>

                    <button
                      onClick={handleSubmitForReview}
                      className="bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow-md transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit for Official Review</span>
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-[#38C976] font-semibold px-3 py-1 bg-[#193D2D] rounded">
                    Official Published Record (Protected)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
