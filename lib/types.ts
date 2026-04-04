// ============================================================
// CONJUGATION TYPES
// ============================================================

export type Pronoun = 'yo' | 'tú' | 'él/ella' | 'nosotros' | 'ellos/ellas'

export const PRONOUNS: Pronoun[] = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas']

export type ConjugationTable = Record<Pronoun, string>

export interface PatternRule {
  ar: string
  er: string
  ir: string
  note?: string
}

export interface IrregularVerbData {
  verb: string
  why: string
  whyIsInvented: boolean
  socratiHint: string
  forms: ConjugationTable
  mnemonic?: string
}

export interface ExampleSentence {
  spanish: string
  contextNote: string
}

export interface Phase1Step {
  why: string
  latinEtymology?: string
  socratiQuestion: string
  socratiAnswer: string
  patternRuleDisplay: string
  examples: ExampleSentence[]
}

export interface Phase4Exercise {
  pronoun: Pronoun
  verb: string
  sentenceFrame: string    // Spanish sentence with blank marked as ______
  expected: string         // Correct conjugated form
  tense: TenseId
  signalWord: string       // The context clue in the sentence
  feedback: string         // Situational explanation (no English tense names for tense choice)
  isContrastPair?: boolean
  contrastPartner?: string // ID of the contrast pair partner exercise
}

export interface TenseData {
  id: TenseId
  name: string
  shortName: string
  conceptualWhy: string
  latinEtymology?: string
  patternRule: PatternRule
  phase1: Phase1Step
  modelVerbs: {
    hablar: ConjugationTable
    comer: ConjugationTable
    vivir: ConjugationTable
  }
  irregulars: IrregularVerbData[]
  signalWords: {
    strong: string[]
    weak: string[]
  }
  phase4Exercises: Phase4Exercise[]
}

export type TenseId =
  | 'presente'
  | 'indefinido'
  | 'imperfecto'
  | 'futuro'
  | 'condicional'
  | 'perfecto'
  | 'pluscuamperfecto'

// ============================================================
// GRAMMAR TYPES
// ============================================================

export interface GrammarExample {
  spanish: string
  english: string
}

export interface GrammarConcept {
  id: string
  name: string
  explanation: string
  examples: GrammarExample[]
  watchOut: string
}

// ============================================================
// CONTRAST PAIR TYPES
// ============================================================

export interface ContrastPair {
  id: string
  pronoun: Pronoun
  verb: string
  indefinidoSentence: string
  indefinidoExpected: string
  indefinidoContext: string
  imperfectoSentence: string
  imperfectoExpected: string
  imperfectoContext: string
  comparisonNote: string
}

// ============================================================
// SUPABASE DB TYPES
// ============================================================

export interface Profile {
  id: string
  display_name: string | null
  challenge_start_date: string | null
  current_level: number
  auto_adapt: boolean
  tense_session_counts: Record<TenseId, number>
  created_at: string
}

export interface Session {
  id: string
  user_id: string
  session_date: string
  tense: TenseId
  phase_completed: string[]
  completed_at: string | null
  created_at: string
}

export interface ExerciseAttempt {
  id: string
  user_id: string
  session_id: string
  tense: TenseId
  verb: string
  pronoun: Pronoun
  expected: string
  given: string
  correct: boolean
  contrast_pair: boolean
  attempted_at: string
}

export interface ChatMessage {
  id: string
  user_id: string
  session_id: string | null
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

// ============================================================
// SESSION FLOW TYPES
// ============================================================

export type Phase = 1 | 2 | 3 | 4 | 5
export type PhaseKey = 'learn' | 'conjugation_tables' | 'irregular' | 'contextual' | 'grammar'

export const PHASE_KEYS: PhaseKey[] = ['learn', 'conjugation_tables', 'irregular', 'contextual', 'grammar']

export const PHASE_LABELS: Record<PhaseKey, string> = {
  learn: 'Learn',
  conjugation_tables: 'Tables',
  irregular: 'Irregular',
  contextual: 'Context',
  grammar: 'Grammar',
}

// ============================================================
// VERB POOL TYPES
// ============================================================

export type VerbClass = 'ar' | 'er' | 'ir'

export interface Verb {
  infinitive: string
  class: VerbClass
  stem: string
  english: string
}

// ============================================================
// PROGRESS TYPES
// ============================================================

export interface TenseAccuracy {
  tense: TenseId
  correct: number
  total: number
  accuracy: number
  lastAttempted: string | null
}

export interface ContrastAccuracy {
  correct: number
  total: number
  accuracy: number
}
