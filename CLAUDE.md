# Español con Juanito

A Spanish language learning app with a structured daily session format, spaced repetition, and an AI tutor named Juanito powered by Claude.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Supabase** — auth (email magic link + PIN) and PostgreSQL database
- **Anthropic Claude API** (`claude-sonnet-4-20250514`) — streaming SSE via `/api/chat`
- **Tailwind CSS** — styling
- **Recharts** — progress charts

## Environment Variables

Copy `.env.local.example` to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
```

## Development

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # lint
```

## Architecture

### Session Flow

Each daily session has 5 phases (see `lib/types.ts`):

| Phase | Key | Component |
|-------|-----|-----------|
| 1 | `learn` | `Phase1Learn` — conceptual why + Socratic intro |
| 2 | `conjugation_tables` | `Phase2ConjugationTables` — pattern drills |
| 3 | `irregular` | `Phase3IrregularVerbDrill` — irregular verb focus |
| 4 | `contextual` | `Phase4ContextualSentences` — fill-in-the-blank |
| 5 | `grammar` | `Phase5GrammarConcept` — grammar concept summary |

### Tenses

7 tenses defined in `lib/tenses.ts` (`TenseId`): `presente`, `indefinido`, `imperfecto`, `futuro`, `condicional`, `perfecto`, `pluscuamperfecto`.

Each `TenseData` object contains: conjugation tables for hablar/comer/vivir, irregulars, signal words, phase 1 content, and phase 4 exercises.

### Spaced Repetition (`lib/spacedRepetition.ts`)

Verb selection is weighted by `(1 - accuracy) + recencyBonus`. Key map format: `"tenseId:verb:pronoun"`. Phase 2 selects one -ar, -er, -ir verb each session. Saturday is review day (`selectReviewExercises`).

### Contrast Pairs (`lib/contrastPairs.ts`)

Special exercises pairing indefinido vs imperfecto sentences — the student's main weakness. Tracked separately with `contrast_pair: true` in `exercise_attempts`.

### AI Tutor (Juanito)

- System prompt: `lib/claudeApi.ts` → `buildJuanitoSystemPrompt()`
- Teaching style: WHY before HOW, Socratic method, no English tense-name comparisons, no French/German
- Streaming via Server-Sent Events: `/api/chat/route.ts`
- Chat component: `components/JuanitoChat.tsx`

### Database (`supabase/schema.sql`)

| Table | Purpose |
|-------|---------|
| `profiles` | User settings, level, tense session counts |
| `sessions` | Daily session record (one per day) |
| `exercise_attempts` | Individual verb attempts for spaced repetition |
| `grammar_log` | Which grammar concepts have been seen |
| `chat_messages` | Juanito conversation history |

All tables use Supabase RLS — users can only access their own rows.

### Auth

- Supabase email magic link
- PIN login via `/api/auth/pin/route.ts` (using service role key)
- Middleware (`middleware.ts`) redirects unauthenticated users to `/auth`
- Public paths: `/`, `/auth`

### Key Lib Files

- `lib/types.ts` — all TypeScript types
- `lib/tenses.ts` — full tense data (conjugations, exercises, signal words)
- `lib/grammar.ts` — grammar concepts
- `lib/contrastPairs.ts` — indefinido/imperfecto contrast exercises
- `lib/spacedRepetition.ts` — verb weighting and selection algorithms
- `lib/supabase.ts` — browser Supabase client
- `lib/supabase-server.ts` — server Supabase client

### Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page |
| `/auth` | Login/signup |
| `/dashboard` | Today's session entry point |
| `/session` | Active learning session (5 phases) |
| `/chat` | Open chat with Juanito |
| `/progress` | Accuracy charts and tense breakdown |
| `/settings` | Profile settings |

## Pronouns

The app uses 5 pronouns only — **no vosotros**: `yo`, `tú`, `él/ella`, `nosotros`, `ellos/ellas`.
