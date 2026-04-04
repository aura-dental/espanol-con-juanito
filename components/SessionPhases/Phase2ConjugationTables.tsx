'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { conjugateRegularVerb } from '@/lib/utils'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import type { TenseData, Verb, Pronoun, ConjugationTable } from '@/lib/types'
import ConjugationTableComponent from '../ConjugationTable'

interface Phase2ConjugationTablesProps {
  tenseData: TenseData
  verbs: [Verb, Verb, Verb]
  tenseSessionCount: number // How many sessions for this tense (for rule fading)
  onAttempt: (pronoun: Pronoun, verb: string, given: string, correct: boolean) => void
  onComplete: () => void
}

export default function Phase2ConjugationTables({
  tenseData,
  verbs,
  tenseSessionCount,
  onAttempt,
  onComplete,
}: Phase2ConjugationTablesProps) {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0)
  const [verbResults, setVerbResults] = useState<Record<string, boolean>[]>([])
  const [ruleVisible, setRuleVisible] = useState(true)
  const [showingVerbSummary, setShowingVerbSummary] = useState(false)

  // Rule fading: sessions 1-8 always visible, 9-16 collapsed by default, 17+ hidden
  const showRuleToggle = tenseSessionCount >= 9
  const hideRuleByDefault = tenseSessionCount >= 17

  const isLastVerb = currentVerbIndex === verbs.length - 1
  const currentVerb = verbs[currentVerbIndex]

  // Build correct forms for this verb
  function buildCorrectForms(verb: Verb): ConjugationTable {
    const pronouns: Pronoun[] = ['yo', 'tú', 'él/ella', 'nosotros', 'ellos/ellas']

    // For futuro/condicional, stem = infinitive
    const stem = (tenseData.id === 'futuro' || tenseData.id === 'condicional')
      ? verb.infinitive
      : verb.stem

    return Object.fromEntries(
      pronouns.map(p => [
        p,
        conjugateRegularVerb(stem, verb.class, p, tenseData.id),
      ])
    ) as ConjugationTable
  }

  function handleVerbComplete(results: Record<Pronoun, boolean>) {
    const newResults = [...verbResults, results]
    setVerbResults(newResults)
    setShowingVerbSummary(true)
  }

  function handleNextVerb() {
    setShowingVerbSummary(false)
    if (isLastVerb) {
      onComplete()
    } else {
      setCurrentVerbIndex(prev => prev + 1)
    }
  }

  const correctForms = buildCorrectForms(currentVerb)

  return (
    <div className="space-y-5">
      {/* Rule Card */}
      <div className={cn('rounded-xl overflow-hidden border transition-all', hideRuleByDefault ? 'border-dashed border-cream-300' : 'border-cream-200 bg-cream-50')}>
        <button
          onClick={() => showRuleToggle && setRuleVisible(prev => !prev)}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3',
            showRuleToggle ? 'cursor-pointer' : 'cursor-default',
          )}
          disabled={!showRuleToggle}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-navy-500 uppercase tracking-wider">
              Pattern Rule — {tenseData.shortName}
            </span>
            {hideRuleByDefault && (
              <span className="text-xs text-ochre-500 font-medium">(tap to reveal)</span>
            )}
          </div>
          {showRuleToggle && (
            ruleVisible ? <ChevronUpIcon className="w-4 h-4 text-navy-400" /> : <ChevronDownIcon className="w-4 h-4 text-navy-400" />
          )}
        </button>

        {ruleVisible && (
          <div className="px-4 pb-4 space-y-2">
            {[
              { label: '-ar', rule: tenseData.patternRule.ar },
              { label: '-er', rule: tenseData.patternRule.er },
              { label: '-ir', rule: tenseData.patternRule.ir },
            ].map(({ label, rule }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-xs font-bold text-navy-400 w-8 flex-shrink-0 mt-0.5">{label}</span>
                <span className="font-mono text-xs text-navy-700">{rule}</span>
              </div>
            ))}
            {tenseData.patternRule.note && (
              <p className="text-xs text-navy-400 italic mt-1 pt-2 border-t border-cream-200">
                ⚡ {tenseData.patternRule.note}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-navy-700">
          Verb {currentVerbIndex + 1} of {verbs.length}
        </span>
        <div className="flex gap-1.5">
          {verbs.map((_, i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i < currentVerbIndex ? 'bg-navy-300' : i === currentVerbIndex ? 'bg-terracotta-500' : 'bg-cream-300',
              )}
            />
          ))}
        </div>
      </div>

      {/* Conjugation table */}
      {!showingVerbSummary ? (
        <ConjugationTableComponent
          verb={currentVerb.infinitive}
          tense={tenseData.shortName}
          correctForms={correctForms}
          mode="fill"
          onAttempt={(pronoun, given, correct) => {
            onAttempt(pronoun, currentVerb.infinitive, given, correct)
          }}
          onComplete={handleVerbComplete}
        />
      ) : (
        <VerbSummary
          verb={currentVerb.infinitive}
          correctForms={correctForms}
          results={verbResults[verbResults.length - 1]}
          isLast={isLastVerb}
          onNext={handleNextVerb}
        />
      )}
    </div>
  )
}

interface VerbSummaryProps {
  verb: string
  correctForms: ConjugationTable
  results: Record<string, boolean>
  isLast: boolean
  onNext: () => void
}

function VerbSummary({ verb, correctForms, results, isLast, onNext }: VerbSummaryProps) {
  const correct = Object.values(results).filter(Boolean).length
  const total = Object.values(results).length

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="heading-serif text-lg font-bold text-navy-900 italic">{verb}</h3>
          <span className={cn(
            'text-sm font-bold',
            correct === total ? 'text-green-600' : correct >= total / 2 ? 'text-ochre-600' : 'text-red-500',
          )}>
            {correct}/{total} correct
          </span>
        </div>

        <div className="divide-y divide-cream-200">
          {(Object.entries(correctForms) as [Pronoun, string][]).map(([pronoun, form]) => (
            <div key={pronoun} className="flex items-center py-2.5">
              <span className="w-28 text-sm text-navy-400">{pronoun}</span>
              <span className={cn(
                'text-sm font-semibold',
                results[pronoun] ? 'text-green-700' : 'text-navy-900',
              )}>
                {form}
              </span>
              {!results[pronoun] && (
                <span className="ml-auto text-xs text-red-400">missed</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <button onClick={onNext} className="btn-terracotta w-full">
        {isLast ? 'All done — continue →' : 'Next verb →'}
      </button>
    </div>
  )
}
