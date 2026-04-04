'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function OnboardingForm({ userId }: { userId: string }) {
  const [name, setName] = useState('')
  const [level, setLevel] = useState(1)
  const [autoAdapt, setAutoAdapt] = useState(true)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const today = new Date().toISOString().split('T')[0]

    await supabase.from('profiles').upsert({
      id: userId,
      display_name: name.trim(),
      challenge_start_date: today,
      current_level: level,
      auto_adapt: autoAdapt,
    })

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-1.5">
          What should Juanito call you?
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
          className="input"
          required
          autoFocus
        />
      </div>

      {/* Level */}
      <div>
        <label className="block text-sm font-medium text-navy-700 mb-2">
          Starting level
        </label>
        <div className="space-y-2">
          {[
            { value: 1, label: 'Level 1 — Indicativo', desc: 'Presente, Indefinido, Imperfecto, Futuro, Condicional' },
            { value: 2, label: 'Level 2 — Subjuntivo', desc: 'All Level 1 + Presente de Subjuntivo (coming soon)' },
            { value: 3, label: 'Level 3 — Advanced', desc: 'All tenses + Imperativo (coming soon)' },
          ].map(({ value, label, desc }) => (
            <label
              key={value}
              className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                level === value
                  ? 'border-terracotta-400 bg-terracotta-50'
                  : 'border-cream-300 bg-white hover:bg-cream-50'
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
      <label className="flex items-start gap-3 p-3 rounded-xl border border-cream-300 bg-white cursor-pointer">
        <input
          type="checkbox"
          checked={autoAdapt}
          onChange={e => setAutoAdapt(e.target.checked)}
          className="mt-0.5 accent-terracotta-500"
        />
        <div>
          <p className="text-sm font-semibold text-navy-800">Auto-adapt level</p>
          <p className="text-xs text-navy-400 mt-0.5">
            Automatically advance to next level when you hit 80% accuracy across 2 weeks.
          </p>
        </div>
      </label>

      <button
        type="submit"
        disabled={!name.trim() || loading}
        className="btn-terracotta w-full"
      >
        {loading ? 'Setting up…' : 'Start my 90-day challenge →'}
      </button>
    </form>
  )
}
