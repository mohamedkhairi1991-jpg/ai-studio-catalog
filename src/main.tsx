import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthGate from './components/AuthGate';
import { isDemoMode } from './lib/supabaseClient';

// The offline demo prototype (App) is large and only used when
// VITE_DEMO_MODE=true, so real users never download it.
const DemoApp = lazy(() => import('./App'));

// Default (VITE_DEMO_MODE unset/false): real Supabase authentication, roles from the database.
// VITE_DEMO_MODE=true: the offline demo prototype with fake data and NO real authentication.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDemoMode ? (
      <>
        <div className="bg-[#F59E0B] text-black text-center text-xs font-semibold py-1">
          DEMO — not real data, no real authentication
        </div>
        <Suspense fallback={null}>
          <DemoApp />
        </Suspense>
      </>
    ) : (
      <AuthGate />
    )}
  </StrictMode>
);
