import type { ReactNode } from 'react';

export const inputClass =
  'w-full min-h-[44px] rounded-lg bg-background border border-border px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted/60 transition-colors duration-150 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/25';
export const buttonClass =
  'w-full min-h-[44px] rounded-lg bg-primary hover:bg-primary-hover px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60';
export const secondaryButtonClass =
  'min-h-[40px] rounded-lg border border-border bg-surface hover:bg-surface-raised px-3.5 py-2 text-sm font-medium text-text transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60';

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
          fill="#F2F6FA"
        />
        {/* Symbolic split-capsule loop forming the P bowl with negative-space precision gap */}
        <path
          d="M7.6 3.9H11.5C14.3719 3.9 16.7 6.22812 16.7 9.1C16.7 11.9719 14.3719 14.3 11.5 14.3H7.6"
          stroke="#5DB4F2"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-semibold text-text">harm</span>
      <span className="font-medium text-accent">aty</span>
    </span>
  );
}

export function LegalFooter({ className = '' }: { className?: string }) {
  const goTo = (target: '/privacy' | '/terms') => {
    if (window.location.hash === `#${target}`) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = target;
    }
  };

  return (
    <footer
      className={`border-t border-border/80 py-4 px-4 text-xs text-text-muted flex items-center justify-center gap-3 ${className}`}
    >
      <a
        href="#/privacy"
        onClick={(e) => {
          e.preventDefault();
          goTo('/privacy');
        }}
        className="text-accent hover:underline transition-colors duration-150"
      >
        Privacy
      </a>
      <span className="text-border" aria-hidden="true">
        ·
      </span>
      <a
        href="#/terms"
        onClick={(e) => {
          e.preventDefault();
          goTo('/terms');
        }}
        className="text-accent hover:underline transition-colors duration-150"
      >
        Terms
      </a>
    </footer>
  );
}

export function TermsAcceptanceCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const goTo = (target: '/privacy' | '/terms') => {
    if (window.location.hash === `#${target}`) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = target;
    }
  };

  return (
    <label className="flex items-start gap-2.5 text-xs text-text-muted cursor-pointer select-none leading-relaxed">
      <input
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-border bg-background accent-primary"
      />
      <span>
        I have read and accept the{' '}
        <a
          href="#/terms"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo('/terms');
          }}
          className="text-accent hover:underline"
        >
          Terms of Use
        </a>{' '}
        and the{' '}
        <a
          href="#/privacy"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goTo('/privacy');
          }}
          className="text-accent hover:underline"
        >
          Privacy Policy
        </a>
      </span>
    </label>
  );
}

export function Screen({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top,_rgba(23,105,170,0.18)_0%,_transparent_65%)] text-text flex flex-col justify-between p-4 sm:p-6">
      <div className="flex-1 flex items-center justify-center py-6">
        <div
          className={`w-full ${
            wide ? 'max-w-3xl' : 'max-w-md'
          } bg-surface/95 backdrop-blur-sm border border-border rounded-2xl shadow-soft p-6 sm:p-8 space-y-5`}
        >
          <div className="space-y-1.5 border-b border-border/70 pb-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              <BrandLogo className="text-2xl" />
            </h1>
            <p className="text-xs text-text-muted">
              Clinical drug reference for doctors in Iraq
            </p>
          </div>
          {children}
        </div>
      </div>
      <LegalFooter />
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-text-muted">{label}</span>
      {children}
    </label>
  );
}

export function Errors({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="text-sm text-danger list-disc pl-5 space-y-1">
      {items.map((e) => (
        <li key={e}>{e}</li>
      ))}
    </ul>
  );
}
