'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRightIcon, EyeIcon } from 'lucide-react'
import type { TenseData } from '@/lib/types'
import ConjugationTable from '../ConjugationTable'

interface Phase1LearnProps {
  tenseData: TenseData
  onComplete: () => void
}

type Step = 'why' | 'socratic' | 'pattern' | 'table' | 'examples'

export default function Phase1Learn({ tenseData, onComplete }: Phase1LearnProps) {
  const [step, setStep] = useState<Step>('why')
  const [socratiRevealed, setSocratiRevealed] = useState(false)
  const [exampleIndex, setExampleIndex] = useState(0)
  const [exampleTranslationShown, setExampleTranslationShown] = useState(false)

  const { phase1, modelVerbs, patternRule } = tenseData

  function next(nextStep: Step) {
    setSocratiRevealed(false)
    setStep(nextStep)
  }

  // ── Step: WHY ──────────────────────────────────────────────
  if (step === 'why') {
    return (
      <div className="space-y-6 animate-phase-in">
        <div className="card-warm px-6 py-5">
          <p className="text-xs font-semibold text-terracotta-500 uppercase tracking-wider mb-3">
            The Concept
          </p>
          <h2 className="heading-serif text-2xl font-bold text-navy-900 mb-4">
            {tenseData.name}
          </h2>
          <p className="text-navy-700 leading-relaxed text-[15px]">
            {phase1.why}
          </p>

          {tenseData.latinEtymology && (
            <div className="mt-4 pl-4 border-l-2 border-ochre-300">
              <p className="text-sm text-navy-500 italic leading-relaxed">
                {tenseData.latinEtymology}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => next('socratic')}
          className="btn-terracotta w-full"
        >
          I get the concept — let's build the form →
        </button>
      </div>
    )
  }

  // ── Step: SOCRATIC PREDICTION ──────────────────────────────
  if (step === 'socratic') {
    return (
      <div className="space-y-6 animate-phase-in">
        <div className="card px-6 py-5">
          <p className="text-xs font-semibold text-ochre-500 uppercase tracking-wider mb-3">
            Before we look at the table
          </p>
          <p className="text-navy-700 leading-relaxed text-[15px]">
            {phase1.socratiQuestion}
          </p>
        </div>

        {!socratiRevealed ? (
          <button
            onClick={() => setSocratiRevealed(true)}
            className="btn-secondary w-full flex items-center justify-center gap-2"
          >
            <EyeIcon className="w-4 h-4" />
            Reveal →
          </button>
        ) : (
          <>
            <div className="reveal-card">
              <p className="text-xs font-semibold text-terracotta-500 mb-2">Answer</p>
              <p className="text-navy-800 leading-relaxed font-medium">
                {phase1.socratiAnswer}
              </p>
            </div>
            <button
              onClick={() => next('pattern')}
              className="btn-terracotta w-full"
            >
              Got it — show me the rule →
            </button>
          </>
        )}
      </div>
    )
  }

  // ── Step: PATTERN RULE CARD ────────────────────────────────
  if (step === 'pattern') {
    return (
      <div className="space-y-6 animate-phase-in">
        <div className="card px-6 py-5">
          <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-4">
            The Rule
          </p>

          <div className="space-y-3">
            {[
              { label: '-ar verbs', rule: patternRule.ar, color: 'bg-terracotta-50 border-terracotta-200' },
              { label: '-er verbs', rule: patternRule.er, color: 'bg-ochre-50 border-ochre-200' },
              { label: '-ir verbs', rule: patternRule.ir, color: 'bg-navy-50 border-navy-200' },
            ].map(({ label, rule, color }) => (
              <div key={label} className={cn('rounded-xl border px-4 py-3', color)}>
                <p className="text-xs font-semibold text-navy-500 mb-1">{label}</p>
                <p className="font-mono text-sm text-navy-800 leading-relaxed">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          {patternRule.note && (
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-cream-100">
              <span className="text-sm">⚡</span>
              <p className="text-sm text-navy-600 leading-relaxed">{patternRule.note}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => next('table')}
          className="btn-terracotta w-full"
        >
          Show me the full table →
        </button>
      </div>
    )
  }

  // ── Step: FULL TABLE REVEAL ────────────────────────────────
  if (step === 'table') {
    return (
      <div className="space-y-6 animate-phase-in">
        <p className="text-sm text-navy-500 text-center">
          Study the full conjugation for our model verbs. Take your time.
        </p>

        <div className="space-y-4">
          {[
            { verb: 'hablar (-ar)', forms: modelVerbs.hablar },
            { verb: 'comer (-er)', forms: modelVerbs.comer },
            { verb: 'vivir (-ir)', forms: modelVerbs.vivir },
          ].map(({ verb, forms }) => (
            <ConjugationTable
              key={verb}
              verb={verb}
              tense={tenseData.shortName}
              correctForms={forms}
              mode="reveal"
            />
          ))}
        </div>

        <button
          onClick={() => next('examples')}
          className="btn-terracotta w-full"
        >
          I've got it — show me some real examples →
        </button>
      </div>
    )
  }

  // ── Step: EXAMPLE SENTENCES ────────────────────────────────
  if (step === 'examples') {
    const examples = tenseData.phase1.examples
    const currentExample = examples[exampleIndex]
    const isLast = exampleIndex === examples.length - 1

    return (
      <div className="space-y-6 animate-phase-in">
        <div className="card px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider">
              Example {exampleIndex + 1} of {examples.length}
            </p>
            <div className="flex gap-1">
              {examples.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full transition-all',
                    i === exampleIndex ? 'bg-terracotta-500 w-4' : 'bg-cream-300',
                  )}
                />
              ))}
            </div>
          </div>

          <p className="text-navy-900 text-lg font-medium leading-relaxed mb-3 italic">
            "{currentExample.spanish}"
          </p>

          <div className="flex items-start gap-2 p-3 rounded-lg bg-cream-100">
            <span className="text-xs">💬</span>
            <p className="text-sm text-navy-500">{currentExample.contextNote}</p>
          </div>
        </div>

        {!isLast ? (
          <button
            onClick={() => {
              setExampleTranslationShown(false)
              setExampleIndex(prev => prev + 1)
            }}
            className="btn-terracotta w-full"
          >
            Next example →
          </button>
        ) : (
          <button
            onClick={onComplete}
            className="btn-terracotta w-full"
          >
            ¡Perfecto! On to the exercises →
          </button>
        )}
      </div>
    )
  }

  return null
}
