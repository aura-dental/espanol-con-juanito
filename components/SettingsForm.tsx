'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { Profile } from '@/lib/types'

export default function SettingsForm({ profile, userId }: { profile: Profile; userId: string }) {
  const [level, setLevel] = useState(profile.current_level)
  const [autoAdapt, setAutoAdapt] = useState(profile.auto_adapt)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetting, setResetting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSave() {
    setSaving(true)
    await supabase
      .from('profiles')
      .update({ current_level: level, auto_adapt: autoAdapt })
      .eq('id', userId)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  async function handleReset() {
    setResetting(true)

    // Delete all sessions and attempts
    await supabase.from('exercise_attempts').delete().eq('user_id', userId)
    await supabase.from('sessions').delete().eq('user_id', userId)
    await supabase.from('grammar_log').delete().eq('user_id', userId)
    await supabase.from('chat_messages').delete().eq('user_id', userId)

    // Reset challenge start date
    await supabase
      .from('profiles')
      .update({
        challenge_start_date: new Date().toISOString().split('T')[0],
        tense_session_counts: {},
      })
      .eq('id', userId)

    setShowResetConfirm(false)
    setResetting(false)
    router.push('/dashboard')
    router.refresh()
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  return (
    <div className="space-y-5">
      {/* Level */}
      <div className="card p-5 space-y-4">
        <h2 className="font-semibold text-navy-900">Learning Level</h2>

        <div className="space-y-2">
          {[
            { value: 1, label: 'Level 1 — Indicativo', desc: 'Presente, Indefinido, Imperfecto, Futuro, Condicional' },
            { value: 2, label: 'Level 2 — Subjuntivo', desc: 'Level 1 + Presente de Subjuntivo (coming soon)' },
            { value: 3, label: 'Level 3 — Advanced', desc: 'All tenses + Imperativo (coming soon)' },
          ].map(({ value, label, desc }) => (
            <label
              key={value}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                level === value
                  ? 'border-terracotta-400 bg-terracotta-50'
                  : 'border-cream-300 bg-cream-50 hover:bg-cream-100'
              }`}
            >
              <input
                type="radio"
                name="level"
                value={value}
                checked={level === value}
                onChange={() => setLevel(value)}
                className="mt-0.5 accent-terracotta-500"
              />
              <div>
                <p className="text-sm font-semibold text-navy-800">{label}</p>
                <p className="text-xs text-navy-400 mt-0.5">{desc}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Auto-adapt */}
      <div className="card p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoAdapt}
            onChange={e => setAutoAdapt(e.target.checked)}
            className="mt-0.5 accent-terracotta-500"
          />
          <div>
            <p className="font-semibold text-navy-900 text-sm">Auto-Adapt</p>
            <p className="text-xs text-navy-500 mt-1">
              Automatically advance to the next level when you score ≥80% accuracy across all tenses over a rolling 2-week window.
            </p>
          </div>
        </label>
      </div>

      {/* Challenge info (read only) */}
      <div className="card p-5 space-y-3">
        <h2 className="font-semibold text-navy-900">Challenge</h2>
        <div className="flex items-center justify-between text-sm">
          <span className="text-navy-500">Start date</span>
          <span className="font-medium text-navy-800">
            {profile.challenge_start_date
              ? formatDate(profile.challenge_start_date)
              : 'Not started'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-navy-500">Daily reminder</span>
          <span className="text-navy-300 text-xs">Coming soon</span>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-terracotta w-full"
      >
        {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save changes'}
      </button>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="btn-secondary w-full"
      >
        Sign out
      </button>

      {/* Danger zone */}
      <div className="card p-5 border-red-200">
        <h2 className="font-semibold text-red-700 mb-3">Danger Zone</h2>
        <p className="text-sm text-navy-500 mb-4">
          Resetting your challenge will delete all session history, exercise attempts, and your streak. This cannot be undone.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
          >
            Reset 90-day challenge
          </button>
        ) : (
          <div className="space-y-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm font-semibold text-red-800">
              ¿Seguro? This deletes everything and starts fresh from today.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary flex-1 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                disabled={resetting}
                className="flex-1 rounded-xl bg-red-600 text-white text-sm font-medium py-2.5 hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {resetting ? 'Resetting…' : 'Yes, reset everything'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
