import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { buildTenseAccuracySummary } from '@/lib/spacedRepetition'
import AccuracyBar, { ContrastAccuracyWidget } from '@/components/AccuracyBar'
import { LEVEL_1_TENSES } from '@/lib/tenses'
import { ArrowLeftIcon } from 'lucide-react'

export default async function ProgressPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: attempts } = await supabase
    .from('exercise_attempts')
    .select('*')
    .eq('user_id', user.id)
    .order('attempted_at', { ascending: false })
    .limit(1000)

  const allAttempts = attempts || []
  const summaries = buildTenseAccuracySummary(allAttempts)

  // Build data for all level 1 tenses (including unseen)
  const accuracyData = LEVEL_1_TENSES.map(tense => {
    const summary = summaries.find(s => s.tense === tense)
    return {
      tense,
      accuracy: summary?.accuracy || 0,
      total: summary?.total || 0,
    }
  })

  // Contrast accuracy (indefinido + imperfecto contrast pairs combined)
  const contrastAttempts = allAttempts.filter(a => a.contrast_pair)
  const contrastCorrect = contrastAttempts.filter(a => a.correct).length
  const contrastAccuracy = contrastAttempts.length > 0
    ? contrastCorrect / contrastAttempts.length
    : null

  const totalAttempts = allAttempts.length
  const overallCorrect = allAttempts.filter(a => a.correct).length
  const overallAccuracy = totalAttempts > 0 ? Math.round((overallCorrect / totalAttempts) * 100) : 0

  const { data: sessions } = await supabase
    .from('sessions')
    .select('completed_at')
    .eq('user_id', user.id)
    .not('completed_at', 'is', null)

  return (
    <div className="min-h-screen bg-cream-100">
      <header className="bg-white border-b border-cream-200 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost p-2">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <h1 className="heading-serif text-xl font-bold text-navy-900">Progress</h1>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Overall stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-navy-900">{overallAccuracy}%</p>
            <p className="text-xs text-navy-400 mt-0.5">Overall accuracy</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-navy-900">{sessions?.length || 0}</p>
            <p className="text-xs text-navy-400 mt-0.5">Sessions done</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-navy-900">{totalAttempts}</p>
            <p className="text-xs text-navy-400 mt-0.5">Total exercises</p>
          </div>
        </div>

        {/* Contrast accuracy — primary goal widget */}
        <ContrastAccuracyWidget
          accuracy={contrastAccuracy}
          total={contrastAttempts.length}
        />

        {/* Per-tense accuracy */}
        <AccuracyBar data={accuracyData} />

        {/* Level info */}
        {profile && (
          <div className="card p-5">
            <p className="text-xs font-semibold text-navy-400 uppercase tracking-wider mb-3">
              Level {profile.current_level}
            </p>
            {profile.auto_adapt ? (
              <>
                <p className="text-sm text-navy-700 mb-2">
                  Auto-adapt is <strong>on</strong> — you'll advance to Level 2 when you maintain ≥80% accuracy across all tenses for 2 weeks.
                </p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${Math.min(overallAccuracy, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-navy-400 mt-1.5">
                  {overallAccuracy}% overall (target: 80%)
                </p>
              </>
            ) : (
              <p className="text-sm text-navy-500">
                Auto-adapt is off. Change your level in{' '}
                <Link href="/settings" className="text-terracotta-500 underline">
                  Settings
                </Link>.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
