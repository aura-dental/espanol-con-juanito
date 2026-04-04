'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import JuanitoAvatar from '@/components/JuanitoAvatar'
import { cn } from '@/lib/utils'

export default function AuthPage() {
  const [digits, setDigits] = useState(['', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null])

  async function handlePinSubmit(pin: string) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError('Incorrect PIN — try again')
        setDigits(['', '', '', ''])
        inputRefs.current[0]?.focus()
        setLoading(false)
        return
      }

      // Follow the generated magic link — Supabase verifies it and sends us to /auth/callback
      window.location.href = data.action_link
    } catch {
      setError('Something went wrong — try again')
      setLoading(false)
    }
  }

  function handleChange(i: number, val: string) {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[i] = digit
    setDigits(next)
    setError(null)

    if (digit && i < 3) {
      inputRefs.current[i + 1]?.focus()
    }

    if (digit && i === 3) {
      handlePinSubmit(next.join(''))
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      const next = [...digits]
      next[i - 1] = ''
      setDigits(next)
      inputRefs.current[i - 1]?.focus()
    }
  }

  const filled = digits.filter(Boolean).length

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-terracotta-100 opacity-30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-ochre-100 opacity-30 blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
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

        <div className="card p-8">
          <h2 className="text-lg font-semibold text-navy-900 mb-1 text-center">
            Bienvenido de vuelta
          </h2>
          <p className="text-sm text-navy-500 mb-8 text-center">
            Enter your PIN to continue
          </p>

          {/* PIN boxes */}
          <div className="flex justify-center gap-3 mb-6">
            {digits.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el }}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit ? '●' : ''}
                onChange={e => handleChange(i, e.target.value.replace('●', ''))}
                onKeyDown={e => handleKeyDown(i, e)}
                onFocus={e => e.target.select()}
                disabled={loading}
                className={cn(
                  'w-14 h-14 text-center text-2xl font-bold rounded-xl border-2 transition-all focus:outline-none bg-white',
                  digit
                    ? 'border-terracotta-400 text-terracotta-600'
                    : 'border-cream-300 text-transparent',
                  error && 'border-red-400',
                  loading && 'opacity-50',
                )}
                autoComplete="off"
              />
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center mb-4">{error}</p>
          )}

          <button
            onClick={() => {
              const pin = digits.join('')
              if (pin.length === 4) handlePinSubmit(pin)
            }}
            disabled={filled < 4 || loading}
            className="btn-terracotta w-full"
          >
            {loading ? 'Signing in…' : 'Sign in →'}
          </button>
        </div>

        <p className="text-center text-xs text-navy-400 mt-8">
          20 minutes a day. 90 days. Mastery.
        </p>
      </div>
    </div>
  )
}
