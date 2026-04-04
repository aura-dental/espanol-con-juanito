import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getTodayTense } from '@/lib/tenses'
import { getTenseName, getDayNumber, getStreak } from '@/lib/utils'
import StreakWidget from '@/components/StreakWidget'
import JuanitoAvatar from '@/components/JuanitoAvatar'
import type { Session, Profile } from '@/lib/types'

function buildStreakDays(sessions: Session[], challengeStart: Date): Array<{ date: string; status: 'completed' | 'partial' | 'missed' | 'rest' | 'future' }> {
  const days = []
  for (let i = 0; i < 90; i++) {
    const date = new Date(challengeStart)
    date.setDate(date.getDate() + i)
    const dateStr = date.toISOString().split('T')[0]
    const today = new Date().toISOString().split('T')[0]

    // Sunday = rest
    const dayOfWeek = (i % 7)
    if (dayOfWeek === 6) {
      days.push({ date: dateStr, status: 'rest' as const })
      continue
    }

    if (dateStr > today) {
      days.push({ date: dateStr, status: 'future' as const })
      continue
    }

    const session = sessions.find(s => s.session_date === dateStr)
    if (!session) {
      days.push({ date: dateStr, status: dateStr < today ? 'missed' as const : 'future' as const })
    } else if (session.completed_at) {
      days.push({ date: dateStr, status: 'completed' as const })
    } else {
      days.push({ date: dateStr, status: 'partial' as const })
    }
  }
  return days
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { onboard?: string }
}) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Onboarding: no display name yet
  if (searchParams.onboard === 'true' || !profile?.display_name) {
    return <OnboardingPage userId={user.id} />
  }

  const challengeStart = profile.challenge_start_date
    ? new Date(profile.challenge_start_date)
    : new Date()

  const { data: sessions } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('session_date', { ascending: true })

  const todaySessions = sessions || []
  const tenseId = getTodayTense(challengeStart, profile.current_level)
  const dayNumber = getDayNumber(challengeStart)
  const today = new Date().toISOString().split('T')[0]
  const todaySession = todaySessions.find(s => s.session_date === today)
  const todayDone = !!todaySession?.completed_at

  const completedDates = todaySessions
    .filter(s => s.completed_at)
    .map(s => s.session_date)

  const currentStreak = getStreak(completedDates)
  const longestStreak = currentStreak // simplified
  const totalSessions = completedDates.length

  const streakDays = buildStreakDays(todaySessions, challengeStart)

  // Missed days check
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  const yesterdaySession = todaySessions.find(s => s.session_date === yesterdayStr)
  const missedYesterday = yesterday.getDay() !== 0 && !yesterdaySession?.completed_at && yesterdayStr >= challengeStart.toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="bg-white border-b border-cream-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="heading-serif text-xl font-bold text-navy-900">
              ¡Hola, {profile.display_name}!
            </h1>
            <p className="text-sm text-navy-400">Day {dayNumber} of 90</p>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/progress" className="btn-ghost text-xs px-3 py-1.5">Progress</Link>
            <Link href="/settings" className="btn-ghost text-xs px-3 py-1.5">Settings</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Missed day banner */}
        {missedYesterday && (
          <div className="rounded-xl bg-ochre-50 border border-ochre-200 px-4 py-3 flex items-start gap-3">
            <JuanitoAvatar size="sm" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-800">
                Oye, you missed yesterday — no worries!
              </p>
              <p className="text-xs text-navy-500 mt-0.5">
                Today's session will cover both tenses. You've got this.
              </p>
            </div>
          </div>
        )}

        {/* Today's CTA */}
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-br from-navy-900 to-navy-700 px-6 py-5 text-white">
            <p className="text-xs font-semibold text-navy-300 uppercase tracking-wider mb-1">
              {todayDone ? 'Today — done ✓' : "Today's session"}
            </p>
            <h2 className="heading-serif text-2xl font-bold mb-1">
              {getTenseName(tenseId)}
            </h2>
            <p className="text-navy-300 text-sm">
              {todayDone
                ? 'Session complete. Great work today!'
                : '5 phases · ~20 minutes'}
            </p>
          </div>
          <div className="px-6 py-4">
            {todayDone ? (
              <div className="flex gap-3">
                <Link href="/chat" className="btn-secondary flex-1 text-sm">
                  Chat with Juanito
                </Link>
                <Link href="/progress" className="btn-primary flex-1 text-sm">
                  View progress →
                </Link>
              </div>
            ) : (
              <Link href="/session" className="btn-terracotta w-full">
                {todaySession ? 'Resume session →' : 'Start session →'}
              </Link>
            )}
          </div>
        </div>

        {/* Streak stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Current streak', value: currentStreak, icon: '🔥' },
            { label: 'Sessions done', value: totalSessions, icon: '✅' },
            { label: 'Days to go', value: Math.max(0, 90 - dayNumber + 1), icon: '🎯' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card p-4 text-center">
              <p className="text-xl mb-1">{icon}</p>
              <p className="text-2xl font-bold text-navy-900">{value}</p>
              <p className="text-xs text-navy-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Streak grid */}
        <StreakWidget
          days={streakDays}
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          totalSessions={totalSessions}
        />

        {/* Level badge */}
        <div className="card px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-navy-400 font-medium mb-0.5">Current Level</p>
            <p className="font-bold text-navy-900">
              Level {profile.current_level} — Indicativo
            </p>
            {profile.auto_adapt && (
              <p className="text-xs text-navy-400 mt-1">
                Auto-adapt on · 80% accuracy promotes to Level 2
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
            <span className="heading-serif text-lg font-bold text-terracotta-600">
              {profile.current_level}
            </span>
          </div>
        </div>

        {/* Quick nav */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/chat" className="card px-4 py-4 flex items-center gap-3 hover:bg-cream-50 transition-colors">
            <JuanitoAvatar size="sm" />
            <div>
              <p className="text-sm font-semibold text-navy-900">Ask Juanito</p>
              <p className="text-xs text-navy-400">Chat any time</p>
            </div>
          </Link>
          <Link href="/progress" className="card px-4 py-4 flex items-center gap-3 hover:bg-cream-50 transition-colors">
            <div className="w-9 h-9 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 text-sm">📊</div>
            <div>
              <p className="text-sm font-semibold text-navy-900">Progress</p>
              <p className="text-xs text-navy-400">Your accuracy</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}

// ── Onboarding ────────────────────────────────────────────────

function OnboardingPage({ userId }: { userId: string }) {
  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <JuanitoAvatar size="lg" className="mx-auto mb-4" />
          <h1 className="heading-serif text-2xl font-bold text-navy-900 mb-2">
            ¡Bienvenido!
          </h1>
          <p className="text-navy-500 text-sm">
            Let's set up your 90-day challenge.
          </p>
        </div>
        <OnboardingForm userId={userId} />
      </div>
    </div>
  )
}

// Client component for the onboarding form
import OnboardingForm from '@/components/OnboardingForm'
