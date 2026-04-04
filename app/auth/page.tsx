'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import JuanitoAvatar from '@/components/JuanitoAvatar'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-terracotta-100 opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ochre-100 opacity-30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo / header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <JuanitoAvatar size="lg" animated />
          </div>
          <h1 className="heading-serif text-3xl font-bold text-navy-900 mb-2">
            Español con Juanito
          </h1>
          <p className="text-navy-500 text-sm">
            Tu reto de 90 días empieza aquí.
          </p>
        </div>

        {!sent ? (
          <div className="card p-8">
            <h2 className="text-lg font-semibold text-navy-900 mb-1">
              Bienvenido de vuelta
            </h2>
            <p className="text-sm text-navy-500 mb-6">
              Enter your email and we'll send you a magic link — no password needed.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-navy-700 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input"
                  required
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="btn-terracotta w-full"
              >
                {loading ? 'Sending…' : 'Send magic link →'}
              </button>
            </form>

            <p className="mt-6 text-xs text-center text-navy-400">
              New here? Just enter your email and we'll set everything up automatically.
            </p>
          </div>
        ) : (
          <div className="card p-8 text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-lg font-semibold text-navy-900 mb-2">
              Check your inbox
            </h2>
            <p className="text-sm text-navy-500 mb-6">
              We've sent a magic link to <strong>{email}</strong>. Click it to sign in — valid for 1 hour.
            </p>
            <button
              onClick={() => { setSent(false); setEmail('') }}
              className="btn-ghost text-sm"
            >
              ← Use a different email
            </button>
          </div>
        )}

        {/* Tagline */}
        <p className="text-center text-xs text-navy-400 mt-8">
          20 minutes a day. 90 days. Mastery.
        </p>
      </div>
    </div>
  )
}
