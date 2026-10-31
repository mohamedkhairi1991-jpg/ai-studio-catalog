# Handoff — Claude ⇄ Google AI Studio

This file is how Claude and Google AI Studio stay coordinated on Pharamty.
**Both must read it before starting work and add an entry after finishing.**

## Who does what

| | Google AI Studio | Claude |
|---|---|---|
| Owns | Screens and pages in `src/` (design, layout, UI logic) | Database (`supabase/`), login/auth, CI (`.github/`), security, final review |
| Works in | `ai-studio-catalog` repository (linked to AI Studio) | `pharmaconnect` repository (source of truth) |
| Never edits | `supabase/`, `.github/` | `src/` screens, unless the owner asks |

## How changes travel (automatic)

```
 AI Studio ──push──▶ ai-studio-catalog ──every 30 min──▶ PR in pharmaconnect
                          ▲                               (tests run, Claude reviews, merges)
                          │                                        │
                          └──────────── every 30 min ◀── pharmaconnect main
```

1. **AI Studio → Claude.** AI Studio pushes to `ai-studio-catalog` `main`.
   Within 30 minutes the *Sync from AI Studio* workflow in `pharmaconnect`
   puts those changes on branch `ai-studio/sync`, opens or updates the pull
   request **"AI Studio changes (auto-sync)"**, and starts the tests. Claude
   reviews it and merges with **Create a merge commit** (never squash).
2. **Claude → AI Studio.** Anything merged into `pharmaconnect` `main` is
   merged into `ai-studio-catalog` `main` within 30 minutes by the
   *Sync from pharmaconnect* workflow. AI Studio's GitHub sync then pulls it.
   If AI Studio still shows an old version, use its GitHub settings tab to
   sync, or "Import from GitHub".
3. **Conflicts.** If both sides changed the same lines, the sync stops with an
   error instead of guessing. Merge the open auto-sync pull request first; the
   next run then succeeds on its own.

Both workflows can also be started by hand from the GitHub **Actions** tab
("Run workflow") instead of waiting.

### Known limits
- GitHub does not let these workflows copy changes to files under
  `.github/workflows`. When Claude changes a workflow, Claude syncs that once
  by hand.
- Opening the pull request automatically needs the `pharmaconnect` setting
  *Settings → Actions → General → Allow GitHub Actions to create and approve
  pull requests*. Without it the branch is still updated and Claude opens the
  pull request.

## Rules for every change (both sides)

1. Read this file and `AGENTS.md` first.
2. Keep each change small and about one thing.
3. After finishing, add an entry at the top of the log below: date, who, what
   changed, why, and anything the other side must know or do next.

## Log (newest first)

### 2026-10-31 — Claude
- **Brief Priority 1 done by Claude** (owner is trying Claude for screens):
  sign-up is now doctors only. New users go straight to the physician form.
  Switch: `COMPANY_SELF_SIGNUP_ENABLED` in `src/lib/onboarding.ts` (false);
  the company form and RPCs are kept, unused. A unit test guards the switch.
- **For AI Studio:** do not redo Priority 1. If you continue, start at
  Priority 2 of `docs/AI_STUDIO_BRIEF_ADMIN_CATALOG.md`.

### 2026-10-30 — Claude (coordination test)
- End-to-end test of the AI Studio → Claude direction: this entry was pushed
  to `ai-studio-catalog` the way AI Studio pushes, and should arrive in
  `pharmaconnect` as the "AI Studio changes (auto-sync)" pull request.

### 2026-10-30 — Claude
- **Coordination set up** (this file, two sync workflows). `ai-studio-catalog`
  history joined to `pharmaconnect` so syncs are plain merges.
- **Operating model changed (owner decision):** only administrators and doctors
  use the app for now. Administrators add companies and enter products;
  doctors read them. Company accounts are off; company code stays for later.
  See `docs/PROJECT_STATUS.md`.
- **Database (live):** admins can create/edit companies
  (`admin_create_company`, `admin_update_company`) and create/edit product
  drafts for any company; 19 Iraqi cities added; anonymous access removed from
  all write functions; 27 indexes added.
- **For AI Studio — next task:** build `docs/AI_STUDIO_BRIEF_ADMIN_CATALOG.md`,
  starting with Priority 1 (doctor-only sign-up). No database changes needed.
