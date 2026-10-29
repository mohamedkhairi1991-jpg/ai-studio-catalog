import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-md bg-[#1F2D38] border border-[#304451] px-3 py-2 text-sm text-[#F2F5F8] focus:outline-none focus:border-[#5DB4F2]';
export const buttonClass =
  'w-full rounded-md bg-[#1769AA] hover:bg-[#1E78BA] px-3 py-2 text-sm font-medium text-white disabled:opacity-60';
export const secondaryButtonClass =
  'rounded-md border border-[#304451] px-3 py-1.5 text-sm text-[#F2F5F8] hover:bg-[#304451] disabled:opacity-60';

export function Screen({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-[#1F2D38] text-[#F2F5F8] flex items-center justify-center p-4">
      <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-md'} bg-[#263744] border border-[#304451] rounded-lg p-6 space-y-4`}>
        <h1 className="text-xl font-semibold">Pharamty</h1>
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
