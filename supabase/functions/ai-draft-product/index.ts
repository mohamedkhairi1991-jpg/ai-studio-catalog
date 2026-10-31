// ai-draft-product — administrator-only.
//
// Given a product name (and optionally the company and pasted leaflet text),
// asks Gemini with Google Search grounding to draft the catalog fields from
// official sources, and returns the draft for the administrator to review.
//
// It NEVER writes to the database: the admin screen saves through the normal
// audited RPCs after the administrator has checked the draft.
//
// Secrets: GEMINI_API_KEY (required), GEMINI_MODEL (optional).
// Deployed with verify_jwt = false; the caller's session is verified here.

import { createClient } from 'npm:@supabase/supabase-js@2.49.1';
import {
  SYSTEM_PROMPT,
  buildUserPrompt,
  candidateGroundingMetadata,
  candidateText,
  draftWarnings,
  extractJsonObject,
  groundingSources,
  normalizeDraft,
  searchSuggestionsHtml,
  validateRequest,
} from './draft.ts';

const DEFAULT_MODEL = 'gemini-3.8-flash';
const GEMINI_TIMEOUT_MS = 120_000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

async function requireAdministrator(req: Request): Promise<Response | null> {
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.startsWith('Bearer ')) return json(401, { error: 'Sign in as an administrator.' });

  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_ANON_KEY') ?? Deno.env.get('SUPABASE_PUBLISHABLE_KEY');
  if (!url || !key) return json(500, { error: 'Server is not configured.' });

  const client = createClient(url, key, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await client.auth.getUser(authHeader.slice('Bearer '.length));
  if (userError || !userData?.user) return json(401, { error: 'Your session is not valid. Sign in again.' });

  // Row Level Security lets a user read only their own profile.
  const { data: profile, error: profileError } = await client
    .from('profiles')
    .select('role,status')
    .eq('auth_user_id', userData.user.id)
    .maybeSingle<{ role: string | null; status: string }>();
  if (profileError) return json(500, { error: 'Could not check your account.' });
  if (!profile || profile.status !== 'active' || !['admin', 'super_admin'].includes(profile.role ?? '')) {
    return json(403, { error: 'Only an active administrator can use AI drafting.' });
  }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json(405, { error: 'Use POST.' });

  const denied = await requireAdministrator(req);
  if (denied) return denied;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: 'Request body must be JSON.' });
  }
  const parsed = validateRequest(body);
  if (!parsed.ok) return json(400, { error: parsed.message });

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) return json(503, { error: 'AI drafting is not set up yet (GEMINI_API_KEY is missing).' });
  const model = Deno.env.get('GEMINI_MODEL') || DEFAULT_MODEL;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS);
  let geminiResponse: Response;
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: buildUserPrompt(parsed.value) }] }],
          tools: [{ google_search: {} }],
          generationConfig: { temperature: 0.1 },
        }),
        signal: controller.signal,
      },
    );
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === 'AbortError';
    return json(504, { error: timedOut ? 'The AI took too long. Try again.' : 'Could not reach the AI service.' });
  } finally {
    clearTimeout(timer);
  }

  if (!geminiResponse.ok) {
    const status = geminiResponse.status;
    console.error('gemini_error', status, (await geminiResponse.text()).slice(0, 500));
    const message =
      status === 429
        ? 'The AI quota is used up for now. Try again later.'
        : status === 400 || status === 403 || status === 404
          ? 'The AI service rejected the request (check the API key and model name).'
          : 'The AI service failed. Try again.';
    return json(502, { error: message });
  }

  const result = await geminiResponse.json();
  const text = candidateText(result);
  let raw: unknown;
  try {
    raw = extractJsonObject(text);
  } catch {
    console.error('gemini_unparseable', text.slice(0, 500));
    return json(422, { error: 'The AI answer could not be read. Try again or add more detail.' });
  }

  const metadata = candidateGroundingMetadata(result);
  const draft = normalizeDraft(raw, parsed.value.productName);
  const searched = groundingSources(metadata);

  return json(200, {
    draft,
    warnings: draftWarnings(draft, searched.length),
    groundingSources: searched,
    // Google requires showing these Search Suggestions with grounded results.
    searchSuggestionsHtml: searchSuggestionsHtml(metadata),
    model,
  });
});
