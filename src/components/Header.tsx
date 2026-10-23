import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { INITIAL_USERS } from '../data/seedData';
import {
  ShieldCheck,
  Stethoscope,
  Building2,
  Lock,
  Globe,
  LogOut,
  UserCheck,
  History,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    locale,
    setLocale,
    currentPortal,
    navigateToPortal,
    switchUser,
    signOut,
    t,
  } = useCatalog();

  return (
    <header className="bg-[#263744] border-b border-[#51616D] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand and identity */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-lg bg-[#1769AA] border border-[#5DB4F2]/50 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-6 h-6 text-[#F2F5F8]" />
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="font-bold text-xl text-[#F2F5F8] tracking-tight">
                  {t.appName}
                </span>
                <span className="text-[11px] font-semibold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2 py-0.5 rounded-full">
                  Iraq Official
                </span>
              </div>
              <p className="text-[12px] text-[#B8C3CC] hidden sm:block">
                Professional Pharmaceutical Information Platform
              </p>
            </div>
          </div>

          {/* Navigation tabs */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            <button
              onClick={() => navigateToPortal('doctor')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                currentPortal === 'doctor'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:bg-[#304451] hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Official Catalog</span>
            </button>

            <button
              onClick={() => navigateToPortal('company')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                currentPortal === 'company'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:bg-[#304451] hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Company Workspace</span>
            </button>

            <button
              onClick={() => navigateToPortal('admin')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                currentPortal === 'admin'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:bg-[#304451] hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Catalog Admin</span>
            </button>

            <button
              onClick={() => navigateToPortal('auth')}
              className={`flex items-center space-x-1.5 rtl:space-x-reverse px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
                currentPortal === 'auth'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:bg-[#304451] hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Audit & Auth</span>
            </button>
          </nav>

          {/* Controls: Demo persona switcher, Locale, User session */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* Persona Switcher for Walkthrough */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs bg-[#304451] border border-[#51616D] text-[#F2F5F8] px-2.5 py-1.5 rounded-md hover:border-[#5DB4F2] transition-colors"
                title="Switch demo account"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#5DB4F2]" />
                <span className="hidden lg:inline text-[11px] font-medium text-[#B8C3CC]">Role:</span>
                <span className="font-semibold text-[12px] truncate max-w-[130px]">
                  {currentUser?.role === 'healthcare_professional'
                    ? 'Approved Doctor'
                    : currentUser?.role === 'company_user'
                    ? 'Company Admin'
                    : currentUser?.role === 'admin'
                    ? 'Platform Admin'
                    : 'Sign In'}
                </span>
              </button>

              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-1 w-64 bg-[#263744] border border-[#51616D] rounded-lg shadow-xl p-2 hidden group-hover:block z-50">
                <p className="text-[11px] font-bold text-[#84919B] px-2 py-1 uppercase tracking-wider">
                  Test Personas (Seed Accounts)
                </p>
                {INITIAL_USERS.map((u) => {
                  const isCurrent = currentUser?.id === u.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => switchUser(u)}
                      className={`w-full text-left rtl:text-right px-2.5 py-2 rounded-md text-xs flex items-center space-x-2 rtl:space-x-reverse transition-colors ${
                        isCurrent
                          ? 'bg-[#1769AA] text-white font-semibold'
                          : 'text-[#F2F5F8] hover:bg-[#304451]'
                      }`}
                    >
                      {u.role === 'healthcare_professional' && <Stethoscope className="w-4 h-4 shrink-0 text-[#38C976]" />}
                      {u.role === 'company_user' && <Building2 className="w-4 h-4 shrink-0 text-[#F59E0B]" />}
                      {u.role === 'admin' && <Lock className="w-4 h-4 shrink-0 text-[#5DB4F2]" />}
                      <div className="overflow-hidden">
                        <div className="truncate font-semibold">{u.fullName}</div>
                        <div className="text-[11px] text-[#B8C3CC] truncate">{u.email}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language toggle */}
            <button
              onClick={() => setLocale(locale === 'en' ? 'ar' : 'en')}
              className="flex items-center space-x-1 rtl:space-x-reverse text-xs bg-[#304451] border border-[#51616D] text-[#F2F5F8] px-2.5 py-1.5 rounded-md hover:border-[#5DB4F2] transition-colors"
              title="Toggle language (English / العربية)"
            >
              <Globe className="w-3.5 h-3.5 text-[#5DB4F2]" />
              <span className="font-semibold uppercase text-[11px]">{locale === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Sign out */}
            {currentUser && (
              <button
                onClick={signOut}
                className="text-[#B8C3CC] hover:text-[#FF7272] p-1.5 rounded-md hover:bg-[#304451] transition-colors"
                title={t.signOutAction}
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile navigation tabs */}
        <div className="flex md:hidden items-center justify-between py-2 border-t border-[#51616D] overflow-x-auto space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => navigateToPortal('doctor')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap ${
              currentPortal === 'doctor'
                ? 'bg-[#1769AA] text-white'
                : 'text-[#B8C3CC] hover:bg-[#304451]'
            }`}
          >
            Official Catalog
          </button>
          <button
            onClick={() => navigateToPortal('company')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap ${
              currentPortal === 'company'
                ? 'bg-[#1769AA] text-white'
                : 'text-[#B8C3CC] hover:bg-[#304451]'
            }`}
          >
            Company Workspace
          </button>
          <button
            onClick={() => navigateToPortal('admin')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap ${
              currentPortal === 'admin'
                ? 'bg-[#1769AA] text-white'
                : 'text-[#B8C3CC] hover:bg-[#304451]'
            }`}
          >
            Catalog Admin
          </button>
          <button
            onClick={() => navigateToPortal('auth')}
            className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap ${
              currentPortal === 'auth'
                ? 'bg-[#1769AA] text-white'
                : 'text-[#B8C3CC] hover:bg-[#304451]'
            }`}
          >
            Audit Logs
          </button>
        </div>
      </div>
    </header>
  );
};
