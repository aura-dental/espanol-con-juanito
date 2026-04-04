import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { TenseId } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getDayNumber(challengeStart: Date | null): number {
  if (!challengeStart) return 1
  const today = new Date()
  const diff = Math.floor(
    (today.getTime() - challengeStart.getTime()) / (1000 * 60 * 60 * 24)
  )
  return diff + 1
}

export function getTenseName(tenseId: TenseId): string {
  const names: Record<TenseId, string> = {
    presente: 'Presente de Indicativo',
    indefinido: 'Pretérito Indefinido',
    imperfecto: 'Pretérito Imperfecto',
    futuro: 'Futuro Simple',
    condicional: 'Condicional Simple',
    perfecto: 'Pretérito Perfecto',
    pluscuamperfecto: 'Pluscuamperfecto',
  }
  return names[tenseId] || tenseId
}

export function getTenseShortName(tenseId: TenseId): string {
  const names: Record<TenseId, string> = {
    presente: 'Presente',
    indefinido: 'Indefinido',
    imperfecto: 'Imperfecto',
    futuro: 'Futuro',
    condicional: 'Condicional',
    perfecto: 'Perfecto',
    pluscuamperfecto: 'Pluscuamperfecto',
  }
  return names[tenseId] || tenseId
}

export function getTenseColor(tenseId: TenseId): string {
  const colors: Record<TenseId, string> = {
    presente: 'bg-navy-700 text-white',
    indefinido: 'bg-terracotta-500 text-white',
    imperfecto: 'bg-ochre-500 text-white',
    futuro: 'bg-navy-500 text-white',
    condicional: 'bg-terracotta-700 text-white',
    perfecto: 'bg-navy-800 text-white',
    pluscuamperfecto: 'bg-navy-900 text-white',
  }
  return colors[tenseId] || 'bg-navy-700 text-white'
}

export function getStreak(sessionDates: string[]): number {
  if (sessionDates.length === 0) return 0

  const sorted = sessionDates
    .map(d => new Date(d).toDateString())
    .filter((d, i, arr) => arr.indexOf(d) === i) // unique
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const today = new Date().toDateString()
  const yesterday = new Date(Date.now() - 86400000).toDateString()

  if (sorted[0] !== today && sorted[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < sorted.length; i++) {
    const current = new Date(sorted[i - 1])
    const prev = new Date(sorted[i])
    const diff = Math.floor(
      (current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
    )
    if (diff === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}

// Derive conjugated form for regular verbs
export function conjugateRegularVerb(
  stem: string,
  verbClass: 'ar' | 'er' | 'ir',
  pronoun: string,
  tenseId: TenseId,
): string {
  const endings: Record<TenseId, Record<'ar' | 'er' | 'ir', string[]>> = {
    presente: {
      ar: ['o', 'as', 'a', 'amos', 'an'],
      er: ['o', 'es', 'e', 'emos', 'en'],
      ir: ['o', 'es', 'e', 'imos', 'en'],
    },
    indefinido: {
      ar: ['é', 'aste', 'ó', 'amos', 'aron'],
      er: ['í', 'iste', 'ió', 'imos', 'ieron'],
      ir: ['í', 'iste', 'ió', 'imos', 'ieron'],
    },
    imperfecto: {
      ar: ['aba', 'abas', 'aba', 'ábamos', 'aban'],
      er: ['ía', 'ías', 'ía', 'íamos', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'ían'],
    },
    futuro: {
      // Futuro uses full infinitive as stem — passed as stem already
      ar: ['é', 'ás', 'á', 'emos', 'án'],
      er: ['é', 'ás', 'á', 'emos', 'án'],
      ir: ['é', 'ás', 'á', 'emos', 'án'],
    },
    condicional: {
      ar: ['ía', 'ías', 'ía', 'íamos', 'ían'],
      er: ['ía', 'ías', 'ía', 'íamos', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'ían'],
    },
    perfecto: {
      ar: ['ado', 'ado', 'ado', 'ado', 'ado'],
      er: ['ido', 'ido', 'ido', 'ido', 'ido'],
      ir: ['ido', 'ido', 'ido', 'ido', 'ido'],
    },
    pluscuamperfecto: {
      ar: ['ado', 'ado', 'ado', 'ado', 'ado'],
      er: ['ido', 'ido', 'ido', 'ido', 'ido'],
      ir: ['ido', 'ido', 'ido', 'ido', 'ido'],
    },
  }

  const pronounIndex: Record<string, number> = {
    'yo': 0,
    'tú': 1,
    'él/ella': 2,
    'nosotros': 3,
    'ellos/ellas': 4,
  }

  const idx = pronounIndex[pronoun]
  if (idx === undefined) return ''

  const endingSet = endings[tenseId]?.[verbClass]
  if (!endingSet) return ''

  const ending = endingSet[idx]

  if (tenseId === 'perfecto' || tenseId === 'pluscuamperfecto') {
    const haberPresente = ['he', 'has', 'ha', 'hemos', 'han']
    const haberImperfecto = ['había', 'habías', 'había', 'habíamos', 'habían']
    const aux = tenseId === 'perfecto' ? haberPresente[idx] : haberImperfecto[idx]
    return `${aux} ${stem}${ending}`
  }

  return `${stem}${ending}`
}

export function normalizeInput(input: string): string {
  return input.trim().toLowerCase()
}

export function checkAnswer(given: string, expected: string): boolean {
  return normalizeInput(given) === normalizeInput(expected)
}

export function getProgressPercent(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}
