'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { EyeIcon, TimerIcon } from 'lucide-react'
import type { TenseData, IrregularVerbData, Pronoun } from '@/lib/types'
import { PRONOUNS } from '@/lib/types'
import ConjugationTableComponent from '../ConjugationTable'
import { checkAnswer } from '@/lib/utils'

interface Phase3IrregularVerbProps {
  tenseData: TenseData
  onAttempt: (pronoun: Pronoun, verb: string, given: string, correct: boolean) => void
  onComplete: () => void
  irregularIndex?: number // Rotate through irregulars
}

type Step = 'why' | 'socratic' | 'study' | 'test'

export default function Phase3IrregularVerb({
  tenseData,
  onAttempt,
  onComplete,
  irregularIndex = 0,
}: Phase3IrregularVerbProps) {
  const [step, setStep] = useState<Step>('why')
  const [socratiRevealed, setSocratiRevealed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(90)
  const [timerActive, setTimerActive] = useState(false)

  const irregular = tenseData.irregulars[irregularIndex % Math.max(tenseData.irregulars.length, 1)]

  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false)
          setStep('test')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [timerActive, timeLeft])

  if (!irregular) {
    return (
      <div className="card p-6 text-center">
        <p className="text-navy-500">No irregular verbs to practice for this tense. Excellent work!</p>
        <button onClick={onComplete} className="btn-terracotta mt-4">Continue →</button>
      </div>
    )
  }

  // ── Step: WHY ──────────────────────────────────────────────
  if (step === 'why') {
    return (
      <div className="space-y-5 animate-phase-in">
        <div className="card px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-terracotta-500 uppercase tracking-wider">
              Irregular Verb
            </p>
            <span className="heading-serif text-xl font-bold text-navy-900 italic">
              {irregular.verb}
            </span>
          </div>

          <div className={cn(
            'rounded-xl px-4 py-3 mb-4',
            irregular.whyIsInvented ? 'bg-ochre-50 border border-ochre-200' : 'bg-navy-50 border border-navy-200',
          )}>
            {irregular.whyIsInvented && (
              <p className="text-xs font-semibold text-ochre-600 mb-1.5">
                No deep reason — here's what works:
              </p>
            )}
            <p className="text-sm text-navy-700 leading-relaxed">
              {irregular.why}
            </p>
          </div>

          {irregular.mnemonic && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-cream-100">
              <span className="text-sm">💡</span>
              <p className="text-sm text-navy-600 font-medium">{irregular.mnemonic}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setStep('socratic')}
          className="btn-terracotta w-full"
        >
          Got it — let me try to predict the forms →
        </button>
      </div>
    )
  }

  // ── Step: SOCRATIC PREDICTION ──────────────────────────────
  if (step === 'socratic') {
    return (
      <div className="space-y-5 animate-phase-in">
        <div className="card px-6 py-5">
          <p className="text-xs font-semibold text-ochre-500 uppercase tracking-wider mb-3">
            Your prediction
          </p>
          <p className="text-navy-700 leading-relaxed">
            {irregular.socratiHint}
          </p>
        </div>

        {!socratiRevealed ? (
          <button
            onClick={() => setSocratiRevealed(true)}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Reveal all forms →
          </button>
        ) : (
          <>
            <div className="reveal-card">
              <p className="text-xs font-semibold text-terracotta-500 mb-3">Full conjugation</p>
              <div className="divide-y divide-cream-200">
                {PRONOUNS.map(pronoun => (
                  <div key={pronoun} className="flex items-center py-2.5">
                    <span className="w-28 text-sm text-navy-400">{pronoun}</span>
                    <span className="text-sm font-semibold text-navy-900">
                      {irregular.forms[pronoun]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setStep('study')
                setTimerActive(true)
              }}
              className="btn-terracotta w-full"
            >
              Study these for 90 seconds →
            </button>
          </>
        )}
      </div>
    )
  }

  // ── Step: STUDY TIMER ──────────────────────────────────────
  if (step === 'study') {
    return (
      <div className="space-y-5 animate-phase-in">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-navy-700">
            Study time — then we hide the table.
          </p>
          <div className="flex items-center gap-2">
            <TimerIcon className="w-4 h-4 text-terracotta-500" />
            <span className={cn(
              'text-lg font-bold tabular-nums',
              timeLeft <= 20 ? 'text-red-500' : 'text-navy-700',
            )}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Timer progress bar */}
        <div className="progress-bar">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              timeLeft > 60 ? 'bg-green-500' : timeLeft > 30 ? 'bg-ochre-400' : 'bg-red-500',
            )}
            style={{ width: `${(timeLeft / 90) * 100}%`, transition: 'width 1s linear' }}
          />
        </div>

        <ConjugationTableComponent
          verb={irregular.verb}
          tense={tenseData.shortName}
          correctForms={irregular.forms}
          mode="reveal"
        />

        {/* WHY reminder */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-cream-100 text-sm text-navy-600">
          <span>💡</span>
          <span>{irregular.why.split('.')[0]}.</span>
        </div>

        <button
          onClick={() => {
            setTimerActive(false)
            setStep('test')
          }}
          className="btn-secondary w-full"
        >
          I'm ready — test me now
        </button>
      </div>
    )
  }

  // ── Step: TEST (fill from memory) ─────────────────────────
  if (step === 'test') {
    return (
      <div className="space-y-5 animate-phase-in">
        <div className="card-warm px-4 py-3">
          <p className="text-sm text-navy-600">
            Table hidden. Fill in the conjugation for{' '}
            <span className="font-bold italic">{irregular.verb}</span> from memory.
          </p>
        </div>

        <ConjugationTableComponent
          verb={irregular.verb}
          tense={tenseData.shortName}
          correctForms={irregular.forms}
          mode="fill"
          onAttempt={(pronoun, given, correct) => {
            onAttempt(pronoun, irregular.verb, given, correct)
          }}
          onComplete={() => {
            setTimeout(onComplete, 800)
          }}
        />

        {/* Why reminder — visible during test */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-cream-100 opacity-60">
          <span className="text-xs">🧠</span>
          <p className="text-xs text-navy-500">{irregular.why.split('.')[0]}.</p>
        </div>
      </div>
    )
  }

  return null
}
