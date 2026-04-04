'use client'

import { useRouter } from 'next/navigation'
import { getTenseShortName } from '@/lib/utils'
import type { TenseId } from '@/lib/types'

interface SessionCompleteProps {
  tense: TenseId
  dayNumber: number
  accuracy: number
  correctCount: number
  totalCount: number
  currentStreak: number
  onOpenChat: () => void
}

export default function SessionComplete({
  tense,
  dayNumber,
  accuracy,
  correctCount,
  totalCount,
  currentStreak,
  onOpenChat,
}: SessionCompleteProps) {
  const router = useRouter()
  const pct = Math.round(accuracy * 100)

  const emoji = pct >= 85 ? '🌟' : pct >= 70 ? '💪' : '📖'
  const message =
    pct >= 85
      ? '¡Excelente! That was a strong session.'
      : pct >= 70
      ? '¡Muy bien! Some room to grow, but solid progress.'
      : 'Keep at it — every session builds the pattern.'

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Main card */}
      <div className="card px-6 py-8 text-center">
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="heading-serif text-2xl font-bold text-navy-900 mb-2">
          Session complete!
        </h2>
        <p className="text-navy-500 text-sm mb-6">{message}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 py-5 border-y border-cream-200 mb-6">
          <div>
            <p className="text-2xl font-bold text-navy-900">{pct}%</p>
            <p className="text-xs text-navy-400 mt-0.5">Accuracy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-terracotta-500">{currentStreak}</p>
            <p className="text-xs text-navy-400 mt-0.5">Day streak 🔥</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-navy-900">{dayNumber}</p>
            <p className="text-xs text-navy-400 mt-0.5">of 90 days</p>
          </div>
        </div>

        <div className="text-sm text-navy-500">
          Tense practiced:{' '}
          <span className="font-semibold text-navy-800">
            {getTenseShortName(tense)}
          </span>
          {' · '}
          {correctCount}/{totalCount} exercises correct
        </div>
      </div>

      {/* Juanito CTA */}
      <button
        onClick={onOpenChat}
        className="w-full card px-6 py-4 flex items-center gap-4 text-left hover:bg-cream-50 transition-colors active:scale-[0.99]"
      >
        <div className="text-2xl">👋</div>
        <div className="flex-1">
          <p className="font-semibold text-navy-900 text-sm">
            Ask Juanito about today's session
          </p>
          <p className="text-xs text-navy-400 mt-0.5">
            Questions about {getTenseShortName(tense)}? Anything on your mind?
          </p>
        </div>
        <span className="text-terracotta-400 text-lg">→</span>
      </button>

      {/* Nav actions */}
      <div className="flex gap-3">
        <button
          onClick={() => router.push('/progress')}
          className="btn-secondary flex-1"
        >
          View progress
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="btn-primary flex-1"
        >
          Dashboard →
        </button>
      </div>
    </div>
  )
}
