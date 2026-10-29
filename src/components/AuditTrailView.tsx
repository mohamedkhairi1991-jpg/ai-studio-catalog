import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { INITIAL_USERS } from '../data/seedData';
import {
  History,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  LogIn,
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditLogs, currentUser, switchUser, signIn, signOut, t } = useCatalog();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authStatusMessage, setAuthStatusMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'audit' | 'auth'>('audit');

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const ok = signIn(emailInput.trim());
    if (ok) {
      setAuthStatusMessage(`Signed in successfully as ${emailInput}`);
    } else {
      setAuthStatusMessage('No account found with this email. Use one of the demo seed accounts.');
    }
    setTimeout(() => setAuthStatusMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-[11px] font-bold bg-[#123F68] text-[#5DB4F2] border border-[#46718F] px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                <History className="w-3 h-3" />
                <span>Governance & Verification Console</span>
              </span>
              <span className="text-xs text-[#B8C3CC]">Immutable System Logs</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#F2F5F8] tracking-tight">
              Pharamty Audit Trail & Identity Sessions
            </h1>
            <p className="text-sm text-[#B8C3CC] max-w-3xl">
              Inspect historical catalog governance records and verify role-based authentication flows.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#1F2D38] p-1 rounded-lg border border-[#51616D] shrink-0">
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTab === 'audit'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:text-white'
              }`}
            >
              Audit Trail ({auditLogs.length})
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                activeTab === 'auth'
                  ? 'bg-[#1769AA] text-white'
                  : 'text-[#B8C3CC] hover:text-white'
              }`}
            >
              Session & Auth
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'audit' ? (
        /* Audit Trail Table */
        <div className="bg-[#263744] border border-[#51616D] rounded-xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-[#51616D] flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#F2F5F8] flex items-center space-x-2 rtl:space-x-reverse">
              <Clock className="w-4 h-4 text-[#5DB4F2]" />
              <span>Catalog Lifecycle Operations & Traceability</span>
            </h2>
            <span className="text-xs text-[#84919B]">
              Ordered by timestamp (most recent first)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-[#1F2D38] text-[#84919B] border-b border-[#51616D]">
                <tr>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Timestamp (UTC)</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Actor</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Role</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Action</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Product Target</th>
                  <th className="py-3 px-4 font-semibold uppercase tracking-wider text-[11px]">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#51616D]">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#304451]/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-[#B8C3CC] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#F2F5F8] whitespace-nowrap">
                      {log.actorName}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="bg-[#123F68] text-[#5DB4F2] px-2 py-0.5 rounded text-[11px] font-semibold">
                        {log.actorRole}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold whitespace-nowrap">
                      <span
                        className={
                          log.action.includes('PUBLISH')
                            ? 'text-[#38C976]'
                            : log.action.includes('SUBMIT')
                            ? 'text-[#F59E0B]'
                            : log.action.includes('REQUEST') || log.action.includes('HIDE')
                            ? 'text-[#FF7272]'
                            : 'text-[#5DB4F2]'
                        }
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#F2F5F8] font-medium whitespace-nowrap">
                      {log.productName}
                    </td>
                    <td className="py-3.5 px-4 text-[#B8C3CC] max-w-xs truncate">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Authentication & Session Simulator */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Session Card */}
          <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold text-[#F2F5F8]">
              <UserCheck className="w-5 h-5 text-[#38C976]" />
              <span>Current Authenticated Principal</span>
            </div>

            {currentUser ? (
              <div className="space-y-3 bg-[#1F2D38] border border-[#51616D] rounded-lg p-4 text-xs">
                <div>
                  <span className="text-[#84919B] block text-[11px]">Full Name:</span>
                  <span className="font-bold text-sm text-[#F2F5F8]">{currentUser.fullName}</span>
                </div>
                <div>
                  <span className="text-[#84919B] block text-[11px]">Email:</span>
                  <span className="font-mono text-[#5DB4F2]">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-[#84919B] block text-[11px]">Platform Role:</span>
                  <span className="bg-[#123F68] text-[#5DB4F2] px-2 py-0.5 rounded font-bold text-[11px] inline-block mt-0.5">
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>
                {currentUser.companyName && (
                  <div>
                    <span className="text-[#84919B] block text-[11px]">Affiliated Company:</span>
                    <span className="text-[#F2F5F8] font-semibold">{currentUser.companyName}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#84919B] block text-[11px]">Verification Status:</span>
                  <span className="text-[#38C976] font-semibold flex items-center space-x-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active & Approved in Iraq</span>
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={signOut}
                    className="bg-[#4B2528] hover:bg-[#A9474E] text-[#FF7272] hover:text-white px-3 py-1.5 rounded font-semibold text-xs transition-colors"
                  >
                    Sign Out Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-6 text-center text-xs space-y-2">
                <AlertCircle className="w-8 h-8 text-[#84919B] mx-auto" />
                <div className="font-bold text-[#F2F5F8]">Anonymous Session</div>
                <p className="text-[#B8C3CC]">
                  Catalog and management features are restricted to authenticated roles.
                </p>
              </div>
            )}

            {/* Quick Demo Login Buttons */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[#84919B] block">
                One-Click Seed Account Login:
              </span>
              <div className="space-y-2">
                {INITIAL_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => switchUser(user)}
                    className="w-full text-left rtl:text-right bg-[#304451] hover:bg-[#1769AA] text-[#F2F5F8] p-3 rounded-lg border border-[#51616D] transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold">{user.fullName}</div>
                      <div className="text-[11px] text-[#B8C3CC] font-mono">{user.email}</div>
                    </div>
                    <span className="bg-[#1F2D38] text-[#5DB4F2] px-2 py-1 rounded text-[11px] font-semibold">
                      {user.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sign In / Sign Up Form */}
          <div className="bg-[#263744] border border-[#51616D] rounded-xl p-6 space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-bold text-[#F2F5F8]">
              <LogIn className="w-5 h-5 text-[#5DB4F2]" />
              <span>Authentication Gate Simulation</span>
            </div>

            {authStatusMessage && (
              <div className="bg-[#193D2D] border border-[#2F8F5C] text-[#38C976] p-3 rounded-lg text-xs font-semibold flex items-center space-x-2 rtl:space-x-reverse">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{authStatusMessage}</span>
              </div>
            )}

            <form onSubmit={handleCustomSignIn} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F2F5F8] font-semibold mb-1">
                  {t.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="doctor.demo@pharmaconnect.local"
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                />
              </div>

              <div>
                <label className="block text-[#F2F5F8] font-semibold mb-1">
                  {t.passwordLabel}
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="DemoPass!2026"
                  className="w-full bg-[#1F2D38] border border-[#51616D] focus:border-[#5DB4F2] rounded-lg px-3 py-2 text-sm text-[#F2F5F8]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setAuthStatusMessage(t.resetEmailSentMessage)}
                  className="text-xs text-[#5DB4F2] hover:underline"
                >
                  {t.forgotPasswordAction}
                </button>
                <button
                  type="submit"
                  className="bg-[#1769AA] hover:bg-[#1E78BA] text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  {t.signInAction}
                </button>
              </div>
            </form>

            <div className="bg-[#1F2D38] border border-[#51616D] rounded-lg p-3 text-[11px] text-[#B8C3CC] space-y-1">
              <span className="font-bold text-[#F2F5F8] block">Pharamty Access Guard Policy:</span>
              <p>
                Approved physicians receive the official catalog. Company regulatory users receive their private catalog workspace. Anonymous users cannot access published pharmaceuticals.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
