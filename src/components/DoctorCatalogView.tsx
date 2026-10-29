import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { ProductDetail } from '../types';
import {
  Search,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Download,
  Info,
  Shield,
  Pill,
  Building,
  Layers,
  Sparkles,
} from 'lucide-react';

export const DoctorCatalogView: React.FC = () => {
  const { products, specialties, locale, t } = useCatalog();
  const [query, setQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Doctors only see published products that are marketed in Iraq
  const publishedProducts = products.filter(
    (p) => p.status === 'published' && p.marketStatus === 'marketed_in_iraq'
  );

  const filteredProducts = publishedProducts.filter((product) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q === '' ||
      product.brandNameEn.toLowerCase().includes(q) ||
      (product.brandNameAr && product.brandNameAr.toLowerCase().includes(q)) ||
      (product.genericDrugName && product.genericDrugName.toLowerCase().includes(q)) ||
      product.companyName.toLowerCase().includes(q) ||
      product.drugClassName.toLowerCase().includes(q);

    const matchesSpecialty =
      selectedSpecialty === 'all' || product.specialtyIds.includes(selectedSpecialty);

    return matchesQuery && matchesSpecialty;
  });

  const handleDownloadBrochure = (brochureName: string) => {
    setDownloadSuccessMessage(`Official monograph "${brochureName}" downloaded successfully.`);
    setTimeout(() => {
      setDownloadSuccessMessage(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner & Official Header */}
      <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="inline-flex items-center space-x-1.5 rtl:space-x-reverse bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.publishedTag}</span>
              </span>
              <span className="text-xs text-[#B8C3CC]">
                Official Republic of Iraq Formulary Baseline
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F5F8] tracking-tight">
              {t.officialCatalogTitle}
            </h1>
            <p className="text-sm text-[#B8C3CC] max-w-3xl">
              {t.officialCatalogSubtitle}
            </p>
          </div>

          <div className="bg-[#1F2D38] border border-[#51616D] px-4 py-3 rounded-lg flex items-center space-x-3 rtl:space-x-reverse shrink-0">
            <Shield className="w-8 h-8 text-[#5DB4F2]" />
            <div>
              <div className="text-xs font-semibold text-[#F2F5F8]">HCP Verification Required</div>
              <div className="text-[11px] text-[#B8C3CC]">Approved Physicians Only</div>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-6 relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-[#84919B] absolute left-4 rtl:left-auto rtl:right-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] focus:ring-1 focus:ring-[#5DB4F2] rounded-lg pl-12 pr-10 rtl:pr-12 rtl:pl-10 py-3 text-sm text-[#F2F5F8] placeholder-[#84919B] transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 rtl:right-auto rtl:left-3 p-1 text-[#84919B] hover:text-[#F2F5F8]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Specialty Filter Chips */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedSpecialty('all')}
            className={`px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 ${
              selectedSpecialty === 'all'
                ? 'bg-[#1769AA] text-white'
                : 'bg-[#304451] text-[#B8C3CC] hover:bg-[#1F2D38]'
            }`}
          >
            {t.allSpecialties} ({publishedProducts.length})
          </button>
          {specialties.map((spec) => {
            const count = publishedProducts.filter((p) => p.specialtyIds.includes(spec.id)).length;
            return (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`px-3 py-1.5 rounded-full font-medium transition-colors shrink-0 ${
                  selectedSpecialty === spec.id
                    ? 'bg-[#1769AA] text-white font-semibold'
                    : 'bg-[#304451] text-[#B8C3CC] hover:bg-[#1F2D38]'
                }`}
              >
                {locale === 'ar' ? spec.nameAr : spec.nameEn} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Medical Disclaimer Notice Banner */}
      <div className="bg-[#253F51] border border-[#46718F] rounded-lg p-4 flex items-start space-x-3 rtl:space-x-reverse text-xs text-[#F2F5F8]">
        <Info className="w-5 h-5 text-[#5DB4F2] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#5DB4F2] block mb-0.5">
            {t.disclaimerTitle}
          </span>
          <p className="text-[#B8C3CC] text-[12px] leading-relaxed">
            {t.disclaimerText}
          </p>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-[#F2F5F8] flex items-center space-x-2 rtl:space-x-reverse">
          <span>Official Published Formulations</span>
          <span className="text-xs bg-[#304451] text-[#5DB4F2] px-2 py-0.5 rounded-full font-semibold">
            {filteredProducts.length} items
          </span>
        </h2>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#263744] border border-[#51616D] rounded-xl p-12 text-center space-y-3">
          <Pill className="w-10 h-10 text-[#84919B] mx-auto" />
          <h3 className="text-base font-semibold text-[#F2F5F8]">No published products match your criteria</h3>
          <p className="text-xs text-[#B8C3CC] max-w-md mx-auto">
            Try adjusting your search terms or selecting a different specialty filter. Only verified and platform-approved Iraqi medications appear here.
          </p>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#5DB4F2] hover:underline font-semibold"
            >
              Clear search filter
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#263744] border border-[#51616D] hover:border-[#5DB4F2] transition-colors rounded-xl p-5 flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#304451] border border-[#51616D] flex items-center justify-center shrink-0">
                    <Pill className="w-5 h-5 text-[#5DB4F2]" />
                  </div>
                  <span className="text-[11px] font-bold bg-[#193D2D] text-[#38C976] border border-[#2F8F5C] px-2 py-0.5 rounded-full">
                    {t.marketedInIraq}
                  </span>
                </div>

                {/* Brand & Generic Name */}
                <div>
                  <h3 className="text-lg font-bold text-[#F2F5F8] group-hover:text-[#5DB4F2] transition-colors">
                    {product.brandNameEn}
                  </h3>
                  {product.brandNameAr && (
                    <div className="text-xs text-[#B8C3CC] font-medium" dir="rtl">
                      {product.brandNameAr}
                    </div>
                  )}
                  {product.genericDrugName && (
                    <div className="text-xs text-[#5DB4F2] font-medium mt-1 flex items-center space-x-1 rtl:space-x-reverse">
                      <Sparkles className="w-3 h-3 text-[#5DB4F2]" />
                      <span>{product.genericDrugName}</span>
                    </div>
                  )}
                </div>

                {/* Company and Class */}
                <div className="space-y-1 text-xs text-[#B8C3CC]">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <Building className="w-3.5 h-3.5 text-[#84919B]" />
                    <span className="truncate">{product.companyName}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <Layers className="w-3.5 h-3.5 text-[#84919B]" />
                    <span className="truncate">{product.drugClassName}</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="bg-[#1F2D38] border border-[#51616D] rounded p-2.5 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-[#84919B] block">Strength:</span>
                    <span className="font-semibold text-[#F2F5F8]">{product.strength || 'Standard'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block">Dosage Form:</span>
                    <span className="font-semibold text-[#F2F5F8] truncate block">{product.dosageForm}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-[#51616D]">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="w-full bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] hover:text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-colors flex items-center justify-center space-x-1.5 rtl:space-x-reverse"
                >
                  <FileText className="w-4 h-4 text-[#5DB4F2]" />
                  <span>View Clinical Monograph</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#263744] border border-[#83939F] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#263744] border-b border-[#51616D] p-5 flex items-start justify-between z-10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-[11px] font-bold bg-[#193D2D] text-[#38C976] border border-[#2F8F5C] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Official Published Catalog Record</span>
                  </span>
                  <span className="text-[11px] bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2 py-0.5 rounded-full font-medium">
                    {selectedProduct.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-[#F2F5F8]">
                  {selectedProduct.brandNameEn}
                </h2>
                {selectedProduct.brandNameAr && (
                  <div className="text-sm text-[#B8C3CC]" dir="rtl">
                    {selectedProduct.brandNameAr}
                  </div>
                )}
                <p className="text-xs text-[#5DB4F2] font-semibold">
                  Generic: {selectedProduct.genericDrugName} &bull; Class: {selectedProduct.drugClassName}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-[#84919B] hover:text-[#F2F5F8] p-1.5 rounded-md hover:bg-[#304451]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm">
              {downloadSuccessMessage && (
                <div className="bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 rtl:space-x-reverse">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{downloadSuccessMessage}</span>
                </div>
              )}

              {/* Formulation & Iraq Regulatory Info */}
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-4">
                <h4 className="text-xs font-bold uppercase text-[#84919B] tracking-wider mb-3">
                  {t.formulationTitle}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Strength</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.strength}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Dosage Form</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.dosageForm}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Route</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.route}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Packaging Size</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.packSize}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Market Status</span>
                    <span className="font-semibold text-[#38C976]">{t.marketedInIraq}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Registration No.</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.registrationNumber || 'Kimadia Verified'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Authority</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.registrationAuthority || 'MOH Iraq'}</span>
                  </div>
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Company</span>
                    <span className="font-semibold text-[#F2F5F8]">{selectedProduct.companyName}</span>
                  </div>
                </div>
              </div>

              {/* Clinical Sections */}
              <div className="space-y-4">
                {/* Indications */}
                <div className="bg-[#304451]/50 border border-[#51616D] rounded-lg p-4 space-y-1">
                  <h4 className="text-xs font-bold text-[#5DB4F2] flex items-center space-x-1.5 rtl:space-x-reverse">
                    <CheckCircle2 className="w-4 h-4 text-[#38C976]" />
                    <span>{t.indicationsTitle}</span>
                  </h4>
                  <p className="text-xs text-[#F2F5F8] leading-relaxed">
                    {selectedProduct.indicationsEn}
                  </p>
                  {selectedProduct.indicationsAr && (
                    <p className="text-xs text-[#B8C3CC] pt-1" dir="rtl">
                      {selectedProduct.indicationsAr}
                    </p>
                  )}
                </div>

                {/* Usual Adult Dose */}
                <div className="bg-[#304451]/50 border border-[#51616D] rounded-lg p-4 space-y-1">
                  <h4 className="text-xs font-bold text-[#5DB4F2] flex items-center space-x-1.5 rtl:space-x-reverse">
                    <Pill className="w-4 h-4 text-[#5DB4F2]" />
                    <span>{t.dosageTitle}</span>
                  </h4>
                  <p className="text-xs text-[#F2F5F8] leading-relaxed">
                    {selectedProduct.usualAdultDoseEn}
                  </p>
                  {selectedProduct.usualAdultDoseAr && (
                    <p className="text-xs text-[#B8C3CC] pt-1" dir="rtl">
                      {selectedProduct.usualAdultDoseAr}
                    </p>
                  )}
                </div>

                {/* Contraindications */}
                <div className="bg-[#4B2528]/50 border border-[#A9474E] rounded-lg p-4 space-y-1">
                  <h4 className="text-xs font-bold text-[#FF7272] flex items-center space-x-1.5 rtl:space-x-reverse">
                    <AlertCircle className="w-4 h-4 text-[#FF7272]" />
                    <span>{t.contraindicationsTitle}</span>
                  </h4>
                  <p className="text-xs text-[#F2F5F8] leading-relaxed">
                    {selectedProduct.contraindicationsEn}
                  </p>
                  {selectedProduct.contraindicationsAr && (
                    <p className="text-xs text-[#B8C3CC] pt-1" dir="rtl">
                      {selectedProduct.contraindicationsAr}
                    </p>
                  )}
                </div>

                {/* Common Adverse Effects */}
                <div className="bg-[#4A3B1C]/50 border border-[#A56F0B] rounded-lg p-4 space-y-1">
                  <h4 className="text-xs font-bold text-[#F59E0B] flex items-center space-x-1.5 rtl:space-x-reverse">
                    <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                    <span>{t.adverseEffectsTitle}</span>
                  </h4>
                  <p className="text-xs text-[#F2F5F8] leading-relaxed">
                    {selectedProduct.commonAdverseEffectsEn}
                  </p>
                </div>

                {/* Storage Conditions */}
                <div className="bg-[#304451]/50 border border-[#51616D] rounded-lg p-4 space-y-1">
                  <h4 className="text-xs font-bold text-[#B8C3CC]">
                    {t.storageTitle}
                  </h4>
                  <p className="text-xs text-[#F2F5F8]">
                    {selectedProduct.storageConditionsEn}
                  </p>
                </div>
              </div>

              {/* Official Brochures & Monographs */}
              <div className="border-t border-[#51616D] pt-4">
                <h4 className="text-xs font-bold text-[#F2F5F8] mb-3 flex items-center space-x-1.5 rtl:space-x-reverse">
                  <FileText className="w-4 h-4 text-[#5DB4F2]" />
                  <span>{t.brochuresTitle}</span>
                </h4>
                {selectedProduct.brochures.length === 0 ? (
                  <p className="text-xs text-[#84919B]">No brochures attached.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedProduct.brochures.map((brochure) => (
                      <div
                        key={brochure.id}
                        className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-3 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-8 h-8 rounded bg-[#1769AA]/30 border border-[#5DB4F2]/30 flex items-center justify-center text-[#5DB4F2]">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#F2F5F8]">{brochure.title}</div>
                            <div className="text-[11px] text-[#B8C3CC]">
                              PDF &bull; {(brochure.fileSizeBytes / 1024).toFixed(0)} KB &bull; Version {brochure.version}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadBrochure(brochure.fileName)}
                          className="bg-[#1769AA] hover:bg-[#1E78BA] text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center space-x-1.5 rtl:space-x-reverse transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Legal Notice Footer */}
              <div className="bg-[#1F2D38] p-3 rounded text-[11px] text-[#84919B] border border-[#51616D] text-center">
                This document is issued by {selectedProduct.companyName} and approved by Pharamty Official Catalog Administrators. It does not reflect inventory, commercial stock, or retail availability.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#51616D] p-4 bg-[#263744] flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-[#304451] hover:bg-[#51616D] text-[#F2F5F8] text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
