import type { ExerciseAttempt, TenseId, Pronoun, Verb } from './types'
import { ALL_VERBS, AR_VERBS, ER_VERBS, IR_VERBS } from './tenses'

// ============================================================
// SPACED REPETITION ALGORITHM
// ============================================================

export interface VerbAccuracyMap {
  [key: string]: { correct: number; total: number; lastSeen: string | null }
}

// Key format: "tenseId:verb:pronoun"
function makeKey(tense: TenseId, verb: string, pronoun: Pronoun): string {
  return `${tense}:${verb}:${pronoun}`
}

export function buildAccuracyMap(attempts: ExerciseAttempt[]): VerbAccuracyMap {
  const map: VerbAccuracyMap = {}

  for (const attempt of attempts) {
    const key = makeKey(attempt.tense, attempt.verb, attempt.pronoun as Pronoun)
    if (!map[key]) {
      map[key] = { correct: 0, total: 0, lastSeen: null }
    }
    map[key].total++
    if (attempt.correct) map[key].correct++
    if (!map[key].lastSeen || attempt.attempted_at > map[key].lastSeen!) {
      map[key].lastSeen = attempt.attempted_at
    }
  }

  return map
}

export function getAccuracy(map: VerbAccuracyMap, tense: TenseId, verb: string, pronoun: Pronoun): number {
  const key = makeKey(tense, verb, pronoun)
  const entry = map[key]
  if (!entry || entry.total === 0) return 0.5 // Default for unseen: neutral weight
  return entry.correct / entry.total
}

export function daysSinceLastSeen(map: VerbAccuracyMap, tense: TenseId, verb: string, pronoun: Pronoun): number {
  const key = makeKey(tense, verb, pronoun)
  const entry = map[key]
  if (!entry || !entry.lastSeen) return 999 // Never seen
  const lastSeen = new Date(entry.lastSeen)
  const now = new Date()
  return Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60 * 60 * 24))
}

// ============================================================
// VERB SELECTION FOR PHASE 2 / 4
// ============================================================

export interface WeightedVerb {
  verb: string
  pronoun: Pronoun
  weight: number
}

const PRONOUNS: Pronoun[] = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas']

export function selectWeightedVerbs(
  tense: TenseId,
  verbPool: Verb[],
  map: VerbAccuracyMap,
  count: number,
  excludeVerbs: string[] = [],
): WeightedVerb[] {
  const candidates: WeightedVerb[] = []

  for (const verb of verbPool) {
    if (excludeVerbs.includes(verb.infinitive)) continue

    for (const pronoun of PRONOUNS) {
      const accuracy = getAccuracy(map, tense, verb.infinitive, pronoun)
      const daysSince = daysSinceLastSeen(map, tense, verb.infinitive, pronoun)

      // Weight formula:
      // - Lower accuracy = higher weight (more likely to be selected)
      // - Not seen in 7+ days = extra weight
      // - Never seen = moderate weight (give new things a chance)
      const accuracyWeight = 1 - accuracy
      const recencyBonus = daysSince >= 7 ? 0.3 : 0
      const weight = accuracyWeight + recencyBonus

      candidates.push({ verb: verb.infinitive, pronoun, weight })
    }
  }

  // Weighted random selection (no replacement)
  const selected: WeightedVerb[] = []
  const used = new Set<string>()

  for (let i = 0; i < count && candidates.length > 0; i++) {
    const totalWeight = candidates.reduce((sum, c) => {
      const key = `${c.verb}:${c.pronoun}`
      return sum + (used.has(key) ? 0 : c.weight)
    }, 0)

    let rand = Math.random() * totalWeight
    for (const candidate of candidates) {
      const key = `${candidate.verb}:${candidate.pronoun}`
      if (used.has(key)) continue
      rand -= candidate.weight
      if (rand <= 0) {
        selected.push(candidate)
        used.add(key)
        break
      }
    }
  }

  return selected
}

// ============================================================
// REVIEW DAY VERB SELECTION (Saturday)
// ============================================================

export interface ReviewExercise {
  tense: TenseId
  verb: string
  pronoun: Pronoun
  weight: number
}

const ALL_TENSES: TenseId[] = ['presente', 'indefinido', 'imperfecto', 'futuro', 'condicional']

export function selectReviewExercises(
  map: VerbAccuracyMap,
  count: number = 12,
): ReviewExercise[] {
  const candidates: ReviewExercise[] = []

  for (const tense of ALL_TENSES) {
    for (const verb of ALL_VERBS.slice(0, 20)) { // Top 20 most common
      for (const pronoun of PRONOUNS) {
        const accuracy = getAccuracy(map, tense, verb.infinitive, pronoun)
        const daysSince = daysSinceLastSeen(map, tense, verb.infinitive, pronoun)

        // Only include if attempted at least once
        const key = makeKey(tense, verb.infinitive, pronoun)
        if (!map[key]) continue

        const weight = (1 - accuracy) + (daysSince >= 7 ? 0.3 : 0)
        candidates.push({ tense, verb: verb.infinitive, pronoun, weight })
      }
    }
  }

  // Sort by weight descending, take top N
  return candidates
    .sort((a, b) => b.weight - a.weight)
    .slice(0, count)
}

// ============================================================
// PHASE 2 VERB SELECTION (3 verbs: one -ar, -er, -ir)
// ============================================================

export function selectPhase2Verbs(
  tense: TenseId,
  map: VerbAccuracyMap,
  sessionIndex: number,
): [Verb, Verb, Verb] {
  // Simple rotation with accuracy-based offset
  const arAccuracies = AR_VERBS.map((v, i) => ({
    verb: v,
    score: getAccuracy(map, tense, v.infinitive, 'yo') + i * 0.01,
  }))
  const erAccuracies = ER_VERBS.map((v, i) => ({
    verb: v,
    score: getAccuracy(map, tense, v.infinitive, 'yo') + i * 0.01,
  }))
  const irAccuracies = IR_VERBS.map((v, i) => ({
    verb: v,
    score: getAccuracy(map, tense, v.infinitive, 'yo') + i * 0.01,
  }))

  // Sort by lowest accuracy first, offset by session to avoid repeating
  const arSorted = arAccuracies.sort((a, b) => a.score - b.score)
  const erSorted = erAccuracies.sort((a, b) => a.score - b.score)
  const irSorted = irAccuracies.sort((a, b) => a.score - b.score)

  const arIndex = sessionIndex % arSorted.length
  const erIndex = sessionIndex % erSorted.length
  const irIndex = sessionIndex % irSorted.length

  return [
    arSorted[arIndex].verb,
    erSorted[erIndex].verb,
    irSorted[irIndex].verb,
  ]
}

// ============================================================
// AUTO-ADAPT LEVEL CHECK
// ============================================================

export function checkAutoAdaptEligibility(
  attempts: ExerciseAttempt[],
  currentLevel: number,
): boolean {
  if (currentLevel >= 3) return false

  // Need at least 2 weeks of data
  const twoWeeksAgo = new Date()
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

  const recentAttempts = attempts.filter(
    a => new Date(a.attempted_at) >= twoWeeksAgo
  )

  if (recentAttempts.length < 50) return false // Not enough data

  const correctCount = recentAttempts.filter(a => a.correct).length
  const accuracy = correctCount / recentAttempts.length

  return accuracy >= 0.8
}

// ============================================================
// TENSE ACCURACY SUMMARY
// ============================================================

export interface TenseAccuracySummary {
  tense: TenseId
  correct: number
  total: number
  accuracy: number
  contrastAccuracy: number | null
}

export function buildTenseAccuracySummary(
  attempts: ExerciseAttempt[],
  limitPerTense: number = 10,
): TenseAccuracySummary[] {
  const summaries: Map<TenseId, TenseAccuracySummary> = new Map()

  const tenseAttempts: Map<TenseId, ExerciseAttempt[]> = new Map()

  for (const attempt of attempts) {
    const existing = tenseAttempts.get(attempt.tense) || []
    tenseAttempts.set(attempt.tense, [...existing, attempt])
  }

  for (const [tense, tAttempts] of tenseAttempts.entries()) {
    // Get last N attempts
    const recent = tAttempts
      .sort((a, b) => new Date(b.attempted_at).getTime() - new Date(a.attempted_at).getTime())
      .slice(0, limitPerTense)

    const correct = recent.filter(a => a.correct).length
    const total = recent.length

    // Contrast pair accuracy
    const contrastAttempts = tAttempts.filter(a => a.contrast_pair)
    const contrastRecent = contrastAttempts.slice(-limitPerTense)
    const contrastCorrect = contrastRecent.filter(a => a.correct).length
    const contrastAccuracy = contrastRecent.length > 0
      ? contrastCorrect / contrastRecent.length
      : null

    summaries.set(tense, {
      tense,
      correct,
      total,
      accuracy: total > 0 ? correct / total : 0,
      contrastAccuracy,
    })
  }

  return Array.from(summaries.values())
}
