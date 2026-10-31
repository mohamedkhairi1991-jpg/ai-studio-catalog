import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-md bg-[#1F2D38] border border-[#304451] px-3 py-2 text-sm text-[#F2F5F8] focus:outline-none focus:border-[#5DB4F2]';
export const buttonClass =
  'w-full rounded-md bg-[#1769AA] hover:bg-[#1E78BA] px-3 py-2 text-sm font-medium text-white disabled:opacity-60';
export const secondaryButtonClass =
  'rounded-md border border-[#304451] px-3 py-1.5 text-sm text-[#F2F5F8] hover:bg-[#304451] disabled:opacity-60';

export function BrandLogo({ className = 'text-lg' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline select-none tracking-[-0.03em] leading-none ${className}`}
      aria-label="Pharmaty"
    >
      {/* Inline symbolic letter P: vertical stem + open split-capsule pharmaceutical loop */}
      <svg
        viewBox="0 0 19 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[0.76em] h-[0.88em] shrink-0 mr-[0.03em] self-baseline translate-y-[0.06em]"
        aria-hidden="true"
      >
        {/* Crisp vertical stem of the P */}
        <rect
          x="1.2"
          y="2"
          width="3.8"
          height="18"
          rx="1.9"
          fill="#F2F5F8"
        />
        {/* Symbolic split-capsule loop forming the P bowl with negative-space precision gap */}
        <path
          d="M7.6 3.9H11.5C14.3719 3.9 16.7 6.22812 16.7 9.1C16.7 11.9719 14.3719 14.3 11.5 14.3H7.6"
          stroke="#5DB4F2"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold text-[#F2F5F8]">harm</span>
      <span className="font-medium text-[#5DB4F2]">aty</span>
    </span>
  );
}

export function Screen({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex items-center justify-center p-4">
      <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-md'} bg-[#263744] border border-[#304451] rounded-lg p-6 space-y-4`}>
        <h1 className="text-xl font-semibold">
          <BrandLogo className="text-xl" />
        </h1>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-xs text-[#B8C3CC]">{label}</span>
      {children}
    </label>
  );
}

export function Errors({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="text-sm text-[#FF7272] list-disc pl-5">
      {items.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}
