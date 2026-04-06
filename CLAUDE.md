# Español con Juanito — Claude Context

Personal Spanish learning app for a 90-day conjugation challenge.

## Stack

- **Next.js 14** (App Router) — do NOT suggest upgrading or using Next.js 15/16 patterns
- **Supabase** — auth + database, via `@supabase/ssr`
- **Anthropic Claude API** — direct SDK (`@anthropic-ai/sdk`), model `claude-sonnet-4-20250514`
- **Tailwind CSS** with custom palette
- **TypeScript**

## Critical conventions

### Next.js 14 patterns (not 15/16)
- `cookies()` is **synchronous** — do NOT `await` it
- Use `middleware.ts` — do NOT rename to `proxy.ts`
- No async request APIs
- Server components are the default; add `'use client'` only when needed

### AI / chat
- Uses **Anthropic SDK directly** — NOT Vercel AI SDK, NOT AI Gateway
- Streaming via SSE in `app/api/chat/route.ts`
- Do NOT suggest switching to `@ai-sdk/*` or `ai` package

### Auth
- PIN login (4-digit, server-verified via `app/api/auth/pin/route.ts`)
- Admin client uses service role key to call `auth.admin.generateLink`
- `AUTH_PIN` and `AUTH_EMAIL` are server-only env vars (no `NEXT_PUBLIC_` prefix)
- The email is fake/internal — no real email is ever sent for auth

## Design system

Custom Tailwind palette:
- `terracotta-*` — primary action colour (buttons, highlights)
- `ochre-*` — secondary / warning
- `navy-*` — text, backgrounds
- `cream-*` — background, borders

Fonts: **Playfair Display** (headings, `.heading-serif`) + **DM Sans** (body)

Component classes in `app/globals.css`: `.card`, `.card-warm`, `.btn-terracotta`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.input`

## Key files

| File | Purpose |
|------|---------|
| `lib/types.ts` | All TypeScript interfaces + `PRONOUNS` constant |
| `lib/tenses.ts` | Full tense data for all 7 tenses (phase1, modelVerbs, irregulars, phase4Exercises) |
| `lib/grammar.ts` | 21 grammar concepts |
| `lib/contrastPairs.ts` | 30 indefinido/imperfecto contrast pairs |
| `lib/spacedRepetition.ts` | Verb selection + accuracy tracking |
| `lib/claudeApi.ts` | Anthropic client + Juanito system prompt |
| `lib/utils.ts` | `cn()`, `conjugateRegularVerb()`, `checkAnswer()`, `normalizeInput()` |
| `lib/supabase-server.ts` | `createServerSupabaseClient()` (anon) + `createAdminSupabaseClient()` (service role) |
| `supabase/schema.sql` | Full DB schema — run once in Supabase SQL editor |

## Session flow (5 phases)

1. **Learn** (`learn`) — WHY → Socratic → Pattern rule → Side-by-side comparison table → Examples
2. **Conjugation Tables** (`conjugation_tables`) — Fill 3 verbs (1 -ar, 1 -er, 1 -ir), spaced-rep weighted
3. **Irregular Verb** (`irregular`) — WHY → Socratic → 90s study → Hidden recall
4. **Contextual Sentences** (`contextual`) — 4 regular + 2 contrast pair exercises
5. **Grammar Concept** (`grammar`) — Static display of next unseen grammar concept

Phase keys: `PHASE_KEYS = ['learn', 'conjugation_tables', 'irregular', 'contextual', 'grammar']`

## Spanish scope

- **5 pronouns only**: yo / tú / él-ella / nosotros / ellos-ellas
- **Vosotros excluded entirely** — never add it
- **7 tenses** (Level 1): presente, indefinido, imperfecto, futuro, condicional, perfecto, pluscuamperfecto
- Day rotation: Mon=presente, Tue=indefinido, Wed=imperfecto, Thu=futuro, Fri=condicional, Sat=review, Sun=rest

## Database tables

`profiles`, `sessions`, `exercise_attempts`, `grammar_log`, `chat_messages` — all with RLS enabled.

## Env vars required

| Var | Where |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + server |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + server |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only |
| `ANTHROPIC_API_KEY` | Server only |
| `AUTH_PIN` | Server only (PIN login) |
| `AUTH_EMAIL` | Server only (fake internal email for auth) |
