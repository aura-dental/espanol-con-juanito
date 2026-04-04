import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// GET /api/session — get today's session status
export async function GET(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const today = new Date().toISOString().split('T')[0]
    const { data: session } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_date', today)
      .single()

    return NextResponse.json({ session })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// POST /api/session/attempt — log a single exercise attempt
export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { session_id, tense, verb, pronoun, expected, given, correct, contrast_pair } = body

    const { data, error } = await supabase
      .from('exercise_attempts')
      .insert({
        user_id: user.id,
        session_id,
        tense,
        verb,
        pronoun,
        expected: expected || '',
        given,
        correct,
        contrast_pair: contrast_pair || false,
      })
      .select()
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ attempt: data })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
