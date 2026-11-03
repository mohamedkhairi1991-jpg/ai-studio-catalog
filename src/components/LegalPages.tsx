import { BrandLogo, Screen, secondaryButtonClass } from './ui';

export type LegalPageKind = 'privacy' | 'terms';

export const LEGAL_LAST_UPDATED = 'Last updated: 3 November 2026';

export function resolveLegalPage(hash: string, pathname: string): LegalPageKind | null {
  const cleanHash = hash.replace(/^#/, '').trim().toLowerCase().replace(/\/+$/, '');
  if (cleanHash === '/privacy' || cleanHash === 'privacy') return 'privacy';
  if (cleanHash === '/terms' || cleanHash === 'terms') return 'terms';

  const cleanPath = pathname.trim().toLowerCase().replace(/\/+$/, '');
  if (cleanPath === '/privacy' || cleanPath.endsWith('/privacy')) return 'privacy';
  if (cleanPath === '/terms' || cleanPath.endsWith('/terms')) return 'terms';

  return null;
}

export function navigateToRoute(target: string) {
  const normalizedHash = target.startsWith('/') ? target : `/${target}`;
  const cleanPath = window.location.pathname.trim().toLowerCase().replace(/\/+$/, '');
  if (
    (cleanPath === '/privacy' ||
      cleanPath === '/terms' ||
      cleanPath.endsWith('/privacy') ||
      cleanPath.endsWith('/terms')) &&
    normalizedHash !== cleanPath
  ) {
    window.history.pushState(null, '', import.meta.env.BASE_URL || '/');
  }
  if (window.location.hash === `#${normalizedHash}`) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  } else {
    window.location.hash = normalizedHash;
  }
}

interface LegalSection {
  title: string;
  body: string;
}

export const TERMS_OF_USE_SECTIONS: LegalSection[] = [
  {
    title: '1. Who may use Pharmaty',
    body: 'Pharmaty may be used only by licensed doctors in Iraq whose account an administrator has approved, and by Pharmaty administrators.',
  },
  {
    title: '2. What it is',
    body: 'Pharmaty is a reference directory of medicines and companies in Iraq, compiled from public sources such as official product information and company websites. Every product lists its sources.',
  },
  {
    title: '3. Not medical advice',
    body: 'Information on Pharmaty may be incomplete, out of date or wrong. Always check the official product information and use your own clinical judgement. Pharmaty does not replace the prescribing information, a pharmacist or local regulations.',
  },
  {
    title: '4. No prices, no sales, no ordering',
    body: 'Pharmaty shows no prices, no sales, and no ordering. Pharmaty does not sell or supply medicines.',
  },
  {
    title: '5. Accounts',
    body: 'Keep your login private; one person per account. Administrators may suspend accounts that are misused.',
  },
  {
    title: '6. Brand names and trademarks',
    body: 'Brand names and trademarks belong to their owners; listing a product does not mean the company endorses Pharmaty.',
  },
  {
    title: '7. Liability',
    body: 'Pharmaty is provided "as is", to the extent the law allows.',
  },
  {
    title: '8. Changes',
    body: 'These terms may be updated; the date above shows the latest version.',
  },
  {
    title: '9. Contact',
    body: 'Contact is through the Pharmaty administrator.',
  },
];

export const PRIVACY_POLICY_SECTIONS: LegalSection[] = [
  {
    title: '1. What we collect',
    body: 'We collect your name, email, phone (if given), and the professional details you enter to verify you are a doctor (specialty, licence information, workplace).',
  },
  {
    title: '2. Why',
    body: 'We use this information to verify doctors, run your account, keep the service secure, and record admin actions for audit.',
  },
  {
    title: '3. Where it is stored',
    body: 'Your data is stored on our database provider (Supabase). Access is limited to you and Pharmaty administrators.',
  },
  {
    title: '4. No sale of data or advertising',
    body: 'We do not sell your data and do not use it for advertising.',
  },
  {
    title: '5. Your choices',
    body: 'You can ask the administrator to correct or delete your account.',
  },
  {
    title: '6. Security',
    body: 'Passwords are handled by the sign-in provider; we never see them.',
  },
  {
    title: '7. Changes and contact',
    body: 'This policy may be updated; the date above shows the latest version. Contact is through the Pharmaty administrator.',
  },
];

export function LegalDocumentPage({
  page,
  backRoute = '/',
}: {
  page: LegalPageKind;
  backRoute?: string;
}) {
  const isTerms = page === 'terms';
  const title = isTerms ? 'Terms of Use' : 'Privacy Policy';
  const sections = isTerms ? TERMS_OF_USE_SECTIONS : PRIVACY_POLICY_SECTIONS;

  return (
    <Screen wide>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#304451] pb-3">
        <div>
          <h2 className="text-lg font-semibold text-[#F2F5F8]">{title}</h2>
          <p className="text-xs text-[#B8C3CC] mt-0.5">{LEGAL_LAST_UPDATED}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={isTerms ? '#/privacy' : '#/terms'}
            onClick={(e) => {
              e.preventDefault();
              navigateToRoute(isTerms ? '/privacy' : '/terms');
            }}
            className={secondaryButtonClass}
          >
            {isTerms ? 'Privacy Policy' : 'Terms of Use'}
          </a>
          <a
            href={`#${backRoute}`}
            onClick={(e) => {
              e.preventDefault();
              navigateToRoute(backRoute);
            }}
            className={secondaryButtonClass}
          >
            Back
          </a>
        </div>
      </div>

      <div className="space-y-4 pt-1">
        {sections.map((section) => (
          <section key={section.title} className="space-y-1">
            <h3 className="text-sm font-semibold text-[#F2F5F8]">
              {section.title}
            </h3>
            <p className="text-sm text-[#B8C3CC] leading-relaxed">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </Screen>
  );
}

export function StandaloneLegalHeader() {
  return (
    <header className="border-b border-[#304451] bg-[#263744]/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <BrandLogo />
      </div>
    </header>
  );
}
