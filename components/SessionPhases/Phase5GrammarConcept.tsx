import type { GrammarConcept } from '@/lib/types'

interface Phase5GrammarConceptProps {
  concept: GrammarConcept
  onComplete: () => void
}

export default function Phase5GrammarConcept({
  concept,
  onComplete,
}: Phase5GrammarConceptProps) {
  return (
    <div className="space-y-5 animate-phase-in">
      {/* Header */}
      <div className="card-warm px-6 py-5">
        <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-2">
          Grammar Concept
        </p>
        <h2 className="heading-serif text-2xl font-bold text-navy-900 mb-4">
          {concept.name}
        </h2>
        <p className="text-navy-700 leading-relaxed text-[15px]">
          {concept.explanation}
        </p>
      </div>

      {/* Examples */}
      <div className="card px-6 py-5">
        <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-4">
          Examples
        </p>
        <div className="space-y-4">
          {concept.examples.map((example, i) => (
            <div key={i} className="space-y-1.5">
              <p className="text-navy-900 font-medium italic leading-relaxed">
                "{example.spanish}"
              </p>
              <p className="text-sm text-navy-500">
                {example.english}
              </p>
              {i < concept.examples.length - 1 && (
                <div className="pt-2 border-b border-cream-200" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Watch out */}
      <div className="rounded-xl bg-ochre-50 border border-ochre-200 px-5 py-4">
        <div className="flex items-start gap-2">
          <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
          <div>
            <p className="text-xs font-bold text-ochre-700 mb-1">Watch out</p>
            <p className="text-sm text-navy-700 leading-relaxed">
              {concept.watchOut}
            </p>
          </div>
        </div>
      </div>

      <button onClick={onComplete} className="btn-terracotta w-full">
        Understood — finish session →
      </button>
    </div>
  )
}
