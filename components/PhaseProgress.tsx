import { cn } from '@/lib/utils'
import { PHASE_KEYS, PHASE_LABELS, type PhaseKey } from '@/lib/types'
import { CheckIcon } from 'lucide-react'

interface PhaseProgressProps {
  currentPhase: PhaseKey
  completedPhases: PhaseKey[]
  sessionNumber?: number
  tenseName?: string
}

export default function PhaseProgress({
  currentPhase,
  completedPhases,
  sessionNumber,
  tenseName,
}: PhaseProgressProps) {
  const currentIndex = PHASE_KEYS.indexOf(currentPhase)

  return (
    <div className="w-full">
      {/* Top row: session info */}
      {(sessionNumber || tenseName) && (
        <div className="flex items-center justify-between mb-3">
          {sessionNumber && (
            <span className="text-xs font-medium text-navy-400">
              Day {sessionNumber}
            </span>
          )}
          {tenseName && (
            <span className="text-xs font-semibold text-terracotta-600 bg-terracotta-50 px-2.5 py-1 rounded-full">
              {tenseName}
            </span>
          )}
        </div>
      )}

      {/* Phase steps */}
      <div className="flex items-center gap-0">
        {PHASE_KEYS.map((key, index) => {
          const isCompleted = completedPhases.includes(key)
          const isCurrent = key === currentPhase
          const isUpcoming = !isCompleted && !isCurrent

          return (
            <div key={key} className="flex items-center flex-1">
              {/* Step indicator */}
              <div className="flex flex-col items-center gap-1 flex-1">
                <div
                  className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                    isCompleted && 'bg-navy-200 text-navy-600',
                    isCurrent && 'bg-terracotta-500 text-white shadow-md scale-110',
                    isUpcoming && 'bg-cream-300 text-navy-300',
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-3.5 h-3.5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium whitespace-nowrap',
                    isCurrent && 'text-terracotta-600',
                    isCompleted && 'text-navy-400',
                    isUpcoming && 'text-navy-300',
                  )}
                >
                  {PHASE_LABELS[key]}
                </span>
              </div>

              {/* Connector line */}
              {index < PHASE_KEYS.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-shrink-0 mx-1 w-6 rounded-full transition-all duration-500',
                    index < currentIndex ? 'bg-navy-200' : 'bg-cream-300',
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
