'use client'

import { useState, useRef, useEffect } from 'react'
import { cn, checkAnswer, normalizeInput } from '@/lib/utils'
import { PRONOUNS, type Pronoun, type ConjugationTable as ConjugationTableType } from '@/lib/types'
import { CheckIcon, XIcon } from 'lucide-react'

type FillMode = 'fill' | 'reveal'

interface ConjugationTableProps {
  verb: string
  tense: string
  correctForms: ConjugationTableType
  mode: FillMode
  onAttempt?: (pronoun: Pronoun, given: string, correct: boolean) => void
  onComplete?: (results: Record<Pronoun, boolean>) => void
}

interface PronounState {
  value: string
  status: 'idle' | 'correct' | 'incorrect' | 'revealed'
}

export default function ConjugationTable({
  verb,
  tense,
  correctForms,
  mode,
  onAttempt,
  onComplete,
}: ConjugationTableProps) {
  const [states, setStates] = useState<Record<Pronoun, PronounState>>(
    () => Object.fromEntries(
      PRONOUNS.map(p => [p, { value: '', status: 'idle' }])
    ) as Record<Pronoun, PronounState>
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const currentPronoun = PRONOUNS[currentIndex]
  const isComplete = currentIndex >= PRONOUNS.length

  useEffect(() => {
    if (!isComplete) {
      inputRefs.current[currentPronoun]?.focus()
    }
  }, [currentIndex, currentPronoun, isComplete])

  function handleCheck() {
    const pronoun = currentPronoun
    const given = states[pronoun].value
    const expected = correctForms[pronoun]
    const correct = checkAnswer(given, expected)

    setStates(prev => ({
      ...prev,
      [pronoun]: { ...prev[pronoun], status: correct ? 'correct' : 'incorrect' },
    }))

    onAttempt?.(pronoun, given, correct)

    // Auto-advance after brief pause
    setTimeout(() => {
      if (currentIndex + 1 >= PRONOUNS.length) {
        // Build results
        const results = Object.fromEntries(
          PRONOUNS.map((p, i) => {
            if (i < currentIndex) return [p, states[p].status === 'correct']
            if (i === currentIndex) return [p, correct]
            return [p, false]
          })
        ) as Record<Pronoun, boolean>
        onComplete?.(results)
      }
      setCurrentIndex(prev => prev + 1)
    }, correct ? 600 : 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const pronoun = currentPronoun
      if (states[pronoun].value && states[pronoun].status === 'idle') {
        handleCheck()
      }
    }
  }

  function handleReveal() {
    const pronoun = currentPronoun
    setStates(prev => ({
      ...prev,
      [pronoun]: { value: correctForms[pronoun], status: 'revealed' },
    }))
    setTimeout(() => setCurrentIndex(prev => prev + 1), 800)
  }

  if (mode === 'reveal') {
    // Display mode — show all forms at once
    return (
      <div className="overflow-hidden rounded-xl border border-cream-300 bg-white">
        <div className="px-4 py-2 bg-navy-900 text-cream-50">
          <span className="text-xs font-semibold tracking-wider uppercase">
            {verb} — {tense}
          </span>
        </div>
        <div className="divide-y divide-cream-200">
          {PRONOUNS.map(pronoun => (
            <div key={pronoun} className="flex items-center px-4 py-3">
              <span className="w-24 text-xs text-navy-400 font-medium">
                {pronoun}
              </span>
              <span className="text-sm font-semibold text-navy-900 tracking-wide">
                {correctForms[pronoun]}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Verb header */}
      <div className="flex items-center justify-between">
        <h3 className="heading-serif text-xl font-bold text-navy-900">
          <span className="italic">{verb}</span>
        </h3>
        <span className="text-xs text-navy-400">
          {currentIndex}/{PRONOUNS.length} pronouns
        </span>
      </div>

      {/* Pronoun rows */}
      <div className="rounded-xl border border-cream-300 bg-white overflow-hidden">
        {PRONOUNS.map((pronoun, index) => {
          const state = states[pronoun]
          const isCurrent = index === currentIndex
          const isPast = index < currentIndex
          const isFuture = index > currentIndex

          return (
            <div
              key={pronoun}
              className={cn(
                'flex items-center px-4 py-3 transition-colors',
                index > 0 && 'border-t border-cream-200',
                isCurrent && 'bg-cream-50',
                isFuture && 'opacity-40',
              )}
            >
              {/* Pronoun label */}
              <span className="w-24 text-xs font-medium text-navy-500 flex-shrink-0">
                {pronoun}
              </span>

              {/* Input or display */}
              {isCurrent ? (
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <input
                    ref={el => { inputRefs.current[pronoun] = el }}
                    type="text"
                    value={state.value}
                    onChange={e => setStates(prev => ({
                      ...prev,
                      [pronoun]: { ...prev[pronoun], value: e.target.value, status: 'idle' },
                    }))}
                    onKeyDown={handleKeyDown}
                    disabled={state.status !== 'idle'}
                    placeholder="conjugar…"
                    className={cn(
                      'w-full rounded-lg border px-3 py-2 text-sm font-medium tracking-wide focus:outline-none focus:ring-2 transition-all',
                      state.status === 'idle' && 'border-navy-300 focus:border-terracotta-400 focus:ring-terracotta-100',
                      state.status === 'correct' && 'border-green-400 bg-green-50 text-green-800 focus:ring-green-100',
                      state.status === 'incorrect' && 'border-red-400 bg-red-50 text-red-800',
                    )}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleCheck}
                      disabled={!state.value || state.status !== 'idle'}
                      className="btn-terracotta flex-1 py-2 text-xs"
                    >
                      Check →
                    </button>
                    <button
                      onClick={handleReveal}
                      className="btn-ghost py-2 px-3 text-xs"
                    >
                      Reveal
                    </button>
                  </div>
                </div>
              ) : isPast ? (
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <span
                    className={cn(
                      'text-sm font-semibold tracking-wide',
                      state.status === 'correct' && 'text-green-700',
                      state.status === 'incorrect' && 'text-red-600',
                      state.status === 'revealed' && 'text-navy-400',
                    )}
                  >
                    {state.status === 'incorrect'
                      ? correctForms[pronoun]
                      : state.value || correctForms[pronoun]}
                  </span>
                  {state.status === 'correct' && (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  )}
                  {state.status === 'incorrect' && (
                    <div className="flex items-center gap-1">
                      <XIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-xs text-red-400 line-through">
                        {normalizeInput(state.value)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-cream-300">——</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Status feedback */}
      {states[currentPronoun]?.status === 'incorrect' && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 animate-slide-up">
          <p className="text-sm font-medium text-red-700">
            <span className="font-bold">Correct form:</span>{' '}
            {correctForms[currentPronoun]}
          </p>
        </div>
      )}
    </div>
  )
}
