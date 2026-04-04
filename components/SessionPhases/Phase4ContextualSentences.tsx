'use client'

import { useState } from 'react'
import { cn, checkAnswer } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-react'
import type { TenseData, TenseId, Pronoun, Phase4Exercise } from '@/lib/types'
import { CONTRAST_PAIRS } from '@/lib/contrastPairs'
import type { ContrastPair } from '@/lib/types'

interface Phase4ContextualSentencesProps {
  tenseData: TenseData
  onAttempt: (pronoun: Pronoun, verb: string, given: string, correct: boolean, isContrastPair: boolean) => void
  onComplete: () => void
  showSignalWords: boolean  // true for first 4 weeks or indefinido/imperfecto tenses
}

type ExerciseItem =
  | { type: 'regular'; exercise: Phase4Exercise }
  | { type: 'contrast'; pair: ContrastPair; which: 'indefinido' | 'imperfecto' }

type AnswerState = 'idle' | 'correct' | 'incorrect'

export default function Phase4ContextualSentences({
  tenseData,
  onAttempt,
  onComplete,
  showSignalWords,
}: Phase4ContextualSentencesProps) {
  // Build exercise list once — using lazy useState so Math.random() only runs on mount
  const [exercises] = useState<ExerciseItem[]>(() => buildExerciseList(tenseData))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [input, setInput] = useState('')
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [showFeedback, setShowFeedback] = useState(false)
  const [signalWordsPanelOpen, setSignalWordsPanelOpen] = useState(false)
  const [results, setResults] = useState<boolean[]>([])

  const currentExercise = exercises[currentIndex]
  const isComplete = currentIndex >= exercises.length

  function handleCheck() {
    if (!currentExercise || answerState !== 'idle') return

    let expected: string
    let pronoun: Pronoun
    let verb: string
    let isContrast: boolean

    if (currentExercise.type === 'regular') {
      expected = currentExercise.exercise.expected
      pronoun = currentExercise.exercise.pronoun
      verb = currentExercise.exercise.verb
      isContrast = currentExercise.exercise.isContrastPair || false
    } else {
      const { pair, which } = currentExercise
      expected = which === 'indefinido' ? pair.indefinidoExpected : pair.imperfectoExpected
      pronoun = pair.pronoun
      verb = pair.verb
      isContrast = true
    }

    const correct = checkAnswer(input, expected)
    const newState: AnswerState = correct ? 'correct' : 'incorrect'

    setAnswerState(newState)
    setShowFeedback(true)
    setResults(prev => [...prev, correct])
    onAttempt(pronoun, verb, input, correct, isContrast)
  }

  function handleNext() {
    setInput('')
    setAnswerState('idle')
    setShowFeedback(false)
    if (currentIndex + 1 >= exercises.length) {
      onComplete()
    } else {
      setCurrentIndex(prev => prev + 1)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && answerState === 'idle' && input.trim()) {
      e.preventDefault()
      handleCheck()
    }
    if (e.key === 'Enter' && showFeedback) {
      e.preventDefault()
      handleNext()
    }
  }

  if (isComplete) {
    const correct = results.filter(Boolean).length
    return (
      <div className="card p-6 text-center animate-slide-up">
        <p className="text-3xl mb-3">{correct === exercises.length ? '🎯' : correct >= exercises.length * 0.7 ? '💪' : '📖'}</p>
        <h3 className="heading-serif text-lg font-bold text-navy-900 mb-1">
          {correct}/{exercises.length} correct
        </h3>
        <p className="text-sm text-navy-500 mb-5">
          {correct === exercises.length
            ? '¡Perfecto! All sentences nailed.'
            : 'Review the feedback above — the context clues are everything.'}
        </p>
        <button onClick={onComplete} className="btn-terracotta w-full">
          Continue to Grammar →
        </button>
      </div>
    )
  }

  const renderExercise = () => {
    if (!currentExercise) return null

    if (currentExercise.type === 'regular') {
      const { exercise } = currentExercise
      const sentence = exercise.sentenceFrame

      return (
        <ExerciseCard
          pronoun={exercise.pronoun}
          verb={exercise.verb}
          sentenceFrame={sentence}
          expected={exercise.expected}
          input={input}
          answerState={answerState}
          showFeedback={showFeedback}
          feedback={exercise.feedback}
          signalWord={exercise.signalWord}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          onCheck={handleCheck}
          onNext={handleNext}
          isContrastPair={exercise.isContrastPair}
        />
      )
    }

    // Contrast pair
    const { pair, which } = currentExercise
    const sentenceFrame = which === 'indefinido' ? pair.indefinidoSentence : pair.imperfectoSentence
    const expected = which === 'indefinido' ? pair.indefinidoExpected : pair.imperfectoExpected
    const context = which === 'indefinido' ? pair.indefinidoContext : pair.imperfectoContext

    const tenseLabel = which === 'indefinido' ? 'indefinido' : 'imperfecto'

    return (
      <div className="space-y-3">
        {/* Contrast drill explanation banner */}
        <div className="rounded-xl bg-terracotta-50 border border-terracotta-200 px-4 py-3">
          <p className="text-xs font-bold text-terracotta-700 uppercase tracking-wider mb-1">
            ⚡ Contrast Drill — {pair.verb}
          </p>
          <p className="text-xs text-navy-600 leading-relaxed">
            Same verb, two different moments. This sentence uses the{' '}
            <strong className="text-terracotta-700">{tenseLabel}</strong>.
            The context tells you which — read carefully.
          </p>
        </div>

        <ExerciseCard
          pronoun={pair.pronoun}
          verb={pair.verb}
          sentenceFrame={sentenceFrame}
          expected={expected}
          input={input}
          answerState={answerState}
          showFeedback={showFeedback}
          feedback={context}
          comparisonNote={showFeedback ? pair.comparisonNote : undefined}
          onInputChange={setInput}
          onKeyDown={handleKeyDown}
          onCheck={handleCheck}
          onNext={handleNext}
          isContrastPair={true}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Signal words panel (past tenses only, first 4 weeks) */}
      {showSignalWords && (tenseData.id === 'indefinido' || tenseData.id === 'imperfecto') && (
        <div className="rounded-xl border border-cream-300 bg-cream-50 overflow-hidden">
          <button
            onClick={() => setSignalWordsPanelOpen(prev => !prev)}
            className="w-full flex items-center justify-between px-4 py-2.5"
          >
            <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
              Context Clue Guide
            </span>
            <ChevronDownIcon className={cn('w-4 h-4 text-navy-400 transition-transform', signalWordsPanelOpen && 'rotate-180')} />
          </button>

          {signalWordsPanelOpen && (
            <div className="px-4 pb-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-bold text-terracotta-600 mb-1.5">INDEFINIDO signals</p>
                <div className="space-y-1">
                  {['ayer', 'el lunes', 'una vez', 'de repente', 'al final', 'en ese momento', 'aquella noche'].map(w => (
                    <span key={w} className="block text-xs font-mono text-navy-600">{w}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-ochre-600 mb-1.5">IMPERFECTO signals</p>
                <div className="space-y-1">
                  {['siempre', 'antes', 'de niño', 'todos los días', 'cuando era', 'normalmente', 'solía'].map(w => (
                    <span key={w} className="block text-xs font-mono text-navy-600">{w}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress dots */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-navy-600">
          Sentence {currentIndex + 1} of {exercises.length}
        </span>
        <div className="flex gap-1.5">
          {exercises.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i < currentIndex && results[i] ? 'bg-green-400' :
                i < currentIndex && !results[i] ? 'bg-red-300' :
                i === currentIndex ? 'bg-terracotta-500' : 'bg-cream-300',
              )}
            />
          ))}
        </div>
      </div>

      {renderExercise()}
    </div>
  )
}

// ── Exercise Card ─────────────────────────────────────────────

interface ExerciseCardProps {
  pronoun: Pronoun
  verb: string
  sentenceFrame: string
  expected: string
  input: string
  answerState: AnswerState
  showFeedback: boolean
  feedback: string
  signalWord?: string
  comparisonNote?: string
  isContrastPair?: boolean
  onInputChange: (val: string) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onCheck: () => void
  onNext: () => void
}

function ExerciseCard({
  pronoun, verb, sentenceFrame, expected, input, answerState, showFeedback,
  feedback, signalWord, comparisonNote, isContrastPair,
  onInputChange, onKeyDown, onCheck, onNext,
}: ExerciseCardProps) {
  const parts = sentenceFrame.split('______')

  return (
    <div className={cn(
      'card p-5 space-y-4 transition-all',
      answerState === 'correct' && 'border-green-300',
      answerState === 'incorrect' && 'border-red-300',
    )}>
      {/* Verb prompt */}
      <div className="flex items-center gap-2 text-sm text-navy-500">
        <span className="font-mono bg-cream-100 px-2 py-0.5 rounded text-navy-700">{pronoun}</span>
        <span>—</span>
        <span className="font-mono bg-cream-100 px-2 py-0.5 rounded text-navy-700 italic">{verb}</span>
      </div>

      {/* Sentence frame with inline input */}
      <div className="text-navy-800 text-[15px] leading-relaxed">
        {parts[0] && <span>{parts[0]}</span>}
        <input
          type="text"
          value={input}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={answerState !== 'idle'}
          placeholder="______"
          className={cn(
            'inline-block border-b-2 bg-transparent px-1 py-0.5 text-center font-semibold tracking-wide focus:outline-none transition-colors mx-1',
            'min-w-[80px] max-w-[160px] w-[120px]',
            answerState === 'idle' && 'border-navy-300 focus:border-terracotta-400',
            answerState === 'correct' && 'border-green-400 text-green-700',
            answerState === 'incorrect' && 'border-red-400 text-red-600',
          )}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        {parts[1] && <span>{parts[1]}</span>}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={cn(
          'rounded-xl px-4 py-3 space-y-1.5 animate-slide-up',
          answerState === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200',
        )}>
          {answerState === 'incorrect' && (
            <p className="text-sm font-bold text-red-700">
              Correct: <span className="italic">{expected}</span>
            </p>
          )}
          {answerState === 'correct' && (
            <p className="text-sm font-bold text-green-700">¡Exacto! ✓</p>
          )}
          <p className="text-sm text-navy-600">{feedback}</p>
          {comparisonNote && (
            <div className="pt-1.5 border-t border-current/10">
              <p className="text-xs font-semibold text-navy-500">{comparisonNote}</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!showFeedback ? (
          <button
            onClick={onCheck}
            disabled={!input.trim() || answerState !== 'idle'}
            className="btn-terracotta flex-1"
          >
            Check →
          </button>
        ) : (
          <button onClick={onNext} className="btn-terracotta flex-1">
            Next →
          </button>
        )}
      </div>
    </div>
  )
}

// ── Build exercise list ───────────────────────────────────────

function buildExerciseList(tenseData: TenseData): ExerciseItem[] {
  const items: ExerciseItem[] = []

  // Regular exercises from tense data
  const regular = tenseData.phase4Exercises.filter(e => !e.isContrastPair)
  const regularContrast = tenseData.phase4Exercises.filter(e => e.isContrastPair)

  // Add regular exercises (up to 4)
  for (const ex of regular.slice(0, 4)) {
    items.push({ type: 'regular', exercise: ex })
  }

  // For indefinido/imperfecto: add contrast pairs
  if (tenseData.id === 'indefinido' || tenseData.id === 'imperfecto' || tenseData.id === 'presente') {
    const shuffled = [...CONTRAST_PAIRS].sort(() => Math.random() - 0.5)
    const pair = shuffled[0]

    if (pair) {
      items.push({ type: 'contrast', pair, which: 'indefinido' })
      items.push({ type: 'contrast', pair, which: 'imperfecto' })
    }
  }

  // Fill up to 6 with regular contrast exercises
  for (const ex of regularContrast.slice(0, Math.max(0, 6 - items.length))) {
    items.push({ type: 'regular', exercise: ex })
  }

  return items.slice(0, 6)
}
