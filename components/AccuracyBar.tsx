import { cn } from '@/lib/utils'
import { getTenseShortName } from '@/lib/utils'
import type { TenseId } from '@/lib/types'

interface TenseAccuracyData {
  tense: TenseId
  accuracy: number
  total: number
  contrastAccuracy?: number | null
}

interface AccuracyBarProps {
  data: TenseAccuracyData[]
}

export default function AccuracyBar({ data }: AccuracyBarProps) {
  const sorted = [...data].sort((a, b) => a.accuracy - b.accuracy)
  const weakest = sorted[0]

  return (
    <div className="card p-6">
      <h3 className="heading-serif text-lg font-bold text-navy-900 mb-1">
        Per-Tense Accuracy
      </h3>
      <p className="text-sm text-navy-500 mb-5">Rolling accuracy — last 10 attempts per tense.</p>

      <div className="space-y-4">
        {data.map(({ tense, accuracy, total }) => {
          const isWeakest = tense === weakest?.tense && total > 0
          const pct = Math.round(accuracy * 100)

          return (
            <div key={tense}>
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={cn(
                    'text-sm font-medium',
                    isWeakest ? 'text-ochre-600' : 'text-navy-700',
                  )}
                >
                  {getTenseShortName(tense)}
                  {isWeakest && (
                    <span className="ml-2 text-xs font-normal text-ochre-500">
                      needs attention
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    'text-sm font-bold tabular-nums',
                    pct >= 80
                      ? 'text-green-600'
                      : pct >= 60
                      ? 'text-ochre-600'
                      : 'text-red-500',
                  )}
                >
                  {total === 0 ? '—' : `${pct}%`}
                </span>
              </div>

              <div className="progress-bar">
                <div
                  className={cn(
                    'progress-bar-fill transition-all duration-700',
                    pct >= 80
                      ? 'bg-green-500'
                      : pct >= 60
                      ? 'bg-ochre-400'
                      : 'bg-terracotta-500',
                  )}
                  style={{ width: total === 0 ? '0%' : `${pct}%` }}
                />
              </div>

              {total === 0 && (
                <p className="text-xs text-navy-300 mt-1">Not attempted yet</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Juanito note for weakest tense */}
      {weakest && weakest.total > 0 && weakest.accuracy < 0.75 && (
        <div className="mt-5 p-3 rounded-xl bg-ochre-50 border border-ochre-200">
          <p className="text-sm text-ochre-800">
            <span className="font-semibold">Juanito says:</span>{' '}
            el {getTenseShortName(weakest.tense).toLowerCase()} needs some love! 💪
            Focus on it during Saturday review — you've got this.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Contrast Accuracy Widget ──────────────────────────────────

interface ContrastAccuracyWidgetProps {
  accuracy: number | null
  total: number
}

export function ContrastAccuracyWidget({
  accuracy,
  total,
}: ContrastAccuracyWidgetProps) {
  if (total === 0 || accuracy === null) {
    return (
      <div className="card p-6">
        <h3 className="heading-serif text-lg font-bold text-navy-900 mb-1">
          Past Tense Confusion Score
        </h3>
        <p className="text-sm text-navy-400">
          Indefinido vs Imperfecto contrast exercises will appear here once you've attempted them.
        </p>
      </div>
    )
  }

  const pct = Math.round(accuracy * 100)

  return (
    <div className="card p-6 border-l-4 border-l-terracotta-500">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="heading-serif text-lg font-bold text-navy-900">
            Indefinido vs Imperfecto
          </h3>
          <p className="text-sm text-navy-500 mt-0.5">
            Your primary focus — contrast drill accuracy
          </p>
        </div>
        <span
          className={cn(
            'text-3xl font-bold tabular-nums',
            pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-ochre-500' : 'text-terracotta-600',
          )}
        >
          {pct}%
        </span>
      </div>

      <div className="progress-bar mb-3">
        <div
          className={cn(
            'progress-bar-fill',
            pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-ochre-400' : 'bg-terracotta-500',
          )}
          style={{ width: `${pct}%` }}
        />
      </div>

      <p className="text-xs text-navy-400">
        Based on {total} contrast pair attempts.{' '}
        {pct < 70 && 'These exercises are weighted heavily in your review sessions.'}
        {pct >= 70 && pct < 85 && 'Getting there — keep focusing on the situational signals.'}
        {pct >= 85 && '¡Excelente! Tense selection is becoming instinctive.'}
      </p>
    </div>
  )
}
