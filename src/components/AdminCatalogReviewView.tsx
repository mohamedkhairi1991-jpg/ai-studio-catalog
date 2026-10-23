import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ProductDetail, ProductLifecycleStatus } from '../types';
import {
  Lock,
  CheckCircle2,
  AlertTriangle,
  EyeOff,
  Eye,
  Archive,
  X,
  FileText,
  ShieldCheck,
  Building,
  Check,
  RotateCcw,
} from 'lucide-react';

export const AdminCatalogReviewView: React.FC = () => {
  const {
    products,
    approveAndPublish,
    requestChanges,
    hideProduct,
    unhideProduct,
    archiveProduct,
    evaluateReadiness,
    t,
  } = useCatalog();

  const [activeTab, setActiveTab] = useState<ProductLifecycleStatus>('submitted');
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);

  // Modals for actions requiring reason
  const [isRequestChangesModalOpen, setIsRequestChangesModalOpen] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [isHideModalOpen, setIsHideModalOpen] = useState(false);
  const [hideReason, setHideReason] = useState('');

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const filteredQueue = products.filter((p) => p.status === activeTab);

  const handleOpenReview = (product: ProductDetail) => {
    setSelectedProduct(product);
    setNotification(null);
  };

  const handleApprove = () => {
    if (!selectedProduct) return;
    const res = approveAndPublish(selectedProduct.id);
    if (res.success) {
      setNotification({
        type: 'success',
        message: `Approved & published "${selectedProduct.brandNameEn}" to the official doctor-facing catalog.`,
      });
      setSelectedProduct(null);
    } else {
      setNotification({
        type: 'error',
        message: `Cannot publish: ${res.errors?.join(', ')}`,
      });
    }
  };

  const handleConfirmRequestChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !changeReason.trim()) return;

    requestChanges(selectedProduct.id, changeReason.trim());
    setNotification({
      type: 'success',
      message: `Changes requested for "${selectedProduct.brandNameEn}". Record returned to company.`,
    });
    setIsRequestChangesModalOpen(false);
    setChangeReason('');
    setSelectedProduct(null);
  };

  const handleConfirmHide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !hideReason.trim()) return;

    hideProduct(selectedProduct.id, hideReason.trim());
    setNotification({
      type: 'success',
      message: `"${selectedProduct.brandNameEn}" has been hidden from the official catalog.`,
    });
    setIsHideModalOpen(false);
    setHideReason('');
    setSelectedProduct(null);
  };

  const handleUnhide = () => {
    if (!selectedProduct) return;
    unhideProduct(selectedProduct.id);
    setNotification({
      type: 'success',
      message: `Restored "${selectedProduct.brandNameEn}" to the published catalog.`,
    });
    setSelectedProduct(null);
  };

  const handleArchive = () => {
    if (!selectedProduct) return;
    archiveProduct(selectedProduct.id, 'Administrative governance archival');
    setNotification({
      type: 'success',
      message: `Archived product "${selectedProduct.brandNameEn}".`,
    });
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Admin Portal Header */}
      <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-[11px] font-bold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Catalog Administration Queue</span>
              </span>
              <span className="text-xs text-[#B8C3CC]">
                Republic of Iraq Official Governance Authority
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F5F8] tracking-tight">
              {t.adminPortalTitle}
            </h1>
            <p className="text-sm text-[#B8C3CC] max-w-3xl">
              {t.adminPortalSubtitle} Review submissions against statutory prerequisites before publication to doctors.
            </p>
          </div>

          <div className="bg-[#1F2D38] border border-[#51616D] px-4 py-3 rounded-lg flex items-center space-x-3 rtl:space-x-reverse shrink-0">
            <ShieldCheck className="w-8 h-8 text-[#38C976]" />
            <div>
              <div className="text-xs font-semibold text-[#F2F5F8]">Full Catalog Authority</div>
              <div className="text-[11px] text-[#B8C3CC]">Pre-publication Enforcement</div>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse overflow-x-auto pt-2 border-t border-[#51616D]">
          {(
            [
              { status: 'submitted', label: 'In Review Queue', color: 'text-[#F59E0B]' },
              { status: 'changes_requested', label: 'Changes Requested', color: 'text-[#FF7272]' },
              { status: 'published', label: 'Published Catalog', color: 'text-[#38C976]' },
              { status: 'hidden', label: 'Hidden Products', color: 'text-[#84919B]' },
              { status: 'archived', label: 'Archived', color: 'text-[#84919B]' },
            ] as const
          ).map((item) => {
            const count = products.filter((p) => p.status === item.status).length;
            const isSelected = activeTab === item.status;
            return (
              <button
                key={item.status}
                onClick={() => setActiveTab(item.status)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-[#1769AA] text-white shadow-sm'
                    : 'bg-[#304451] text-[#B8C3CC] hover:bg-[#1F2D38]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#1F2D38] text-[#F2F5F8]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-lg text-xs font-semibold flex items-center space-x-2 rtl:space-x-reverse ${
            notification.type === 'success'
              ? 'bg-[#193D2D] border border-[#2F8F5C] text-[#38C976]'
              : 'bg-[#4B2528] border border-[#A9474E] text-[#FF7272]'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Queue Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#F2F5F8]">
          Review Queue: {activeTab.replace('_', ' ').toUpperCase()} ({filteredQueue.length} items)
        </h2>
      </div>

      {/* Queue List */}
      {filteredQueue.length === 0 ? (
        <div className="bg-[#263744] border border-[#51616D] rounded-xl p-12 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-[#38C976] mx-auto" />
          <h3 className="text-base font-semibold text-[#F2F5F8]">Queue is clear</h3>
          <p className="text-xs text-[#B8C3CC]">
            No product submissions currently under "{activeTab.replace('_', ' ')}" state.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredQueue.map((product) => {
            const readiness = evaluateReadiness(product);
            return (
              <div
                key={product.id}
                className="bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] transition-colors rounded-xl p-5 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2 py-0.5 rounded-full">
                      {product.category.replace('_', ' ').toUpperCase()}
                    </span>
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

                  <div>
                    <h3 className="text-lg font-bold text-[#F2F5F8]">
                      {product.brandNameEn}
                    </h3>
                    <p className="text-xs text-[#5DB4F2] font-medium">
                      {product.genericDrugName || 'No generic'} &bull; {product.drugClassName}
                    </p>
                    <p className="text-xs text-[#B8C3CC] mt-1 flex items-center space-x-1.5 rtl:space-x-reverse">
                      <Building className="w-3.5 h-3.5" />
                      <span>{product.companyName}</span>
                    </p>
                  </div>

                  {/* Readiness status */}
                  <div className="bg-[#1F2D38] border border-[#51616D] rounded p-2.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#84919B]">Official Checklist:</span>
                      <span
                        className={`font-bold ${
                          readiness.isValid ? 'text-[#38C976]' : 'text-[#F59E0B]'
                        }`}
                      >
                        {readiness.isValid ? 'All Criteria Met' : `${readiness.missingItems.length} Gaps`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#51616D]">
                  <button
                    onClick={() => handleOpenReview(product)}
                    className="w-full bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1.5 rtl:space-x-reverse"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Review & Take Action</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Inspector Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#263744] border border-[#83939F] rounded-xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-[#263744] border-b border-[#51616D] p-5 flex items-start justify-between z-10">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-[11px] font-bold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2.5 py-0.5 rounded-full">
                    ADMINISTRATIVE DECISION DESK
                  </span>
                  <span className="text-xs text-[#B8C3CC]">
                    Product: {selectedProduct.id}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#F2F5F8] mt-1">
                  {selectedProduct.brandNameEn}
                </h2>
                <p className="text-xs text-[#B8C3CC]">
                  Submitted by {selectedProduct.companyName} on{' '}
                  {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#84919B] hover:text-[#F2F5F8] p-1.5 rounded-md hover:bg-[#304451]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-xs">
              {/* Official 12-point Pre-publication Checklist Inspector */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#F2F5F8] flex items-center space-x-2 rtl:space-x-reverse">
                    <ShieldCheck className="w-4 h-4 text-[#5DB4F2]" />
                    <span>Statutory Pre-Publication Readiness Check</span>
                  </h3>
                  {evaluateReadiness(selectedProduct).isValid ? (
                    <span className="text-xs bg-[#193D2D] text-[#38C976] border border-[#2F8F5C] px-3 py-1 rounded-full font-bold flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Ready to Publish</span>
                    </span>
                  ) : (
                    <span className="text-xs bg-[#4A3B1C] text-[#F59E0B] border border-[#A56F0B] px-3 py-1 rounded-full font-bold flex items-center space-x-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Action Required</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    <span className="text-[#F2F5F8]">Verified Iraqi Pharmaceutical Company</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.brandNameEn ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">English Brand Name Translation</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.drugClassId ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Therapeutic Drug Class Assigned</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.genericDrugId ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Generic / Scientific Entity Valid</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.specialtyIds.length > 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">At Least 1 Medical Specialty Mapped</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.marketStatus === 'marketed_in_iraq' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Designated "Marketed in Iraq"</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.indicationsEn && selectedProduct.usualAdultDoseEn ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Clinical Indications & Adult Dosing</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.contraindicationsEn && selectedProduct.commonAdverseEffectsEn ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Contraindications & Adverse Reactions</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.productImages.length > 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Pill / Formulation Image Attached</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.packageImages.length > 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Official Package Box Image Attached</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    {selectedProduct.brochures.length > 0 ? (
                      <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-[#FF7272] shrink-0" />
                    )}
                    <span className="text-[#F2F5F8]">Verified PDF Monograph File</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse p-2 bg-[#263744] rounded">
                    <CheckCircle2 className="w-4 h-4 text-[#38C976] shrink-0" />
                    <span className="text-[#F2F5F8]">Kimadia Registration Review</span>
                  </div>
                </div>
              </div>

              {/* Product Specifications Preview */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider">
                  Pharmaceutical Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#84919B] block">Strength:</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.strength || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block">Dosage Form:</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.dosageForm || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block">Route:</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.route || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block">Pack Size:</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.packSize || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Clinical Monograph Preview */}
              <div className="space-y-3">
                <div className="bg-[#304451]/50 border border-[#51616D] rounded p-3">
                  <span className="font-bold text-[#5DB4F2] block mb-1">Approved Indications:</span>
                  <p className="text-[#F2F5F8]">{selectedProduct.indicationsEn || 'Not provided'}</p>
                </div>
                <div className="bg-[#304451]/50 border border-[#51616D] rounded p-3">
                  <span className="font-bold text-[#5DB4F2] block mb-1">Usual Adult Dose:</span>
                  <p className="text-[#F2F5F8]">{selectedProduct.usualAdultDoseEn || 'Not provided'}</p>
                </div>
                <div className="bg-[#4B2528]/50 border border-[#A9474E] rounded p-3">
                  <span className="font-bold text-[#FF7272] block mb-1">Contraindications:</span>
                  <p className="text-[#F2F5F8]">{selectedProduct.contraindicationsEn || 'Not provided'}</p>
                </div>
              </div>
            </div>

            {/* Modal Decision Actions Footer */}
            <div className="border-t border-[#51616D] p-5 bg-[#263744] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {selectedProduct.status === 'published' ? (
                  <button
                    onClick={() => setIsHideModalOpen(true)}
                    className="bg-[#4B2528] hover:bg-[#A9474E] text-[#FF7272] hover:text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <EyeOff className="w-4 h-4" />
                    <span>Hide From Doctors</span>
                  </button>
                ) : selectedProduct.status === 'hidden' ? (
                  <button
                    onClick={handleUnhide}
                    className="bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Unhide / Restore</span>
                  </button>
                ) : null}

                {selectedProduct.status !== 'archived' && (
                  <button
                    onClick={handleArchive}
                    className="text-xs text-[#84919B] hover:text-[#FF7272] px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    <span>Archive</span>
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

                {selectedProduct.status === 'submitted' && (
                  <>
                    <button
                      onClick={() => setIsRequestChangesModalOpen(true)}
                      className="bg-[#F59E0B] hover:bg-[#A56F0B] text-black text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Request Changes</span>
                    </button>

                    <button
                      onClick={handleApprove}
                      disabled={!evaluateReadiness(selectedProduct).isValid}
                      className={`text-xs font-bold px-4 py-2 rounded-lg flex items-center space-x-1.5 shadow-md transition-colors ${
                        evaluateReadiness(selectedProduct).isValid
                          ? 'bg-[#38C976] hover:bg-[#2F8F5C] text-black'
                          : 'bg-[#3A4650] text-[#84919B] cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve & Publish to Official Catalog</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Request Changes (with mandatory reason) */}
      {isRequestChangesModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#263744] border border-[#A56F0B] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#F59E0B] flex items-center space-x-2 rtl:space-x-reverse">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Request Product Corrections</span>
                </h3>
                <p className="text-xs text-[#B8C3CC] mt-1">
                  Specify mandatory changes required before this product can be approved.
                </p>
              </div>
              <button
                onClick={() => setIsRequestChangesModalOpen(false)}
                className="text-[#84919B] hover:text-[#F2F5F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmRequestChanges} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F2F5F8] mb-1">
                  Reviewer Reason / Mandatory Corrections *
                </label>
                <textarea
                  required
                  rows={4}
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  placeholder="e.g. Please update usual adult dosing per latest Kimadia guidance and attach the official package seal scan."
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#F59E0B] rounded-lg p-3 text-xs text-[#F2F5F8]"
                />
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsRequestChangesModalOpen(false)}
                  className="bg-[#304451] hover:bg-[#51616D] text-[#F2F5F8] text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#F59E0B] hover:bg-[#A56F0B] text-black text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Return to Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Hide Product (with mandatory reason) */}
      {isHideModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#263744] border border-[#A9474E] rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#FF7272] flex items-center space-x-2 rtl:space-x-reverse">
                  <EyeOff className="w-5 h-5" />
                  <span>Hide Product from Official Catalog</span>
                </h3>
                <p className="text-xs text-[#B8C3CC] mt-1">
                  The product will be immediately removed from physician search and discovery.
                </p>
              </div>
              <button
                onClick={() => setIsHideModalOpen(false)}
                className="text-[#84919B] hover:text-[#F2F5F8]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmHide} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#F2F5F8] mb-1">
                  Mandatory Governance or Safety Reason *
                </label>
                <textarea
                  required
                  rows={4}
                  value={hideReason}
                  onChange={(e) => setHideReason(e.target.value)}
                  placeholder="e.g. Temporary suspension due to MOH safety advisory batch notice."
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#FF7272] rounded-lg p-3 text-xs text-[#F2F5F8]"
                />
              </div>

              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  onClick={() => setIsHideModalOpen(false)}
                  className="bg-[#304451] hover:bg-[#51616D] text-[#F2F5F8] text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#B42318] hover:bg-[#FF7272] text-white text-xs font-bold px-4 py-2 rounded-lg"
                >
                  Confirm Hide Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
