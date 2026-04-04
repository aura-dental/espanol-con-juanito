import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getTodayTense } from '@/lib/tenses'
import { getTenseName } from '@/lib/utils'
import { GRAMMAR_CONCEPTS, getNextGrammarConcept } from '@/lib/grammar'
import ChatPageClient from '@/components/ChatPageClient'
import { ArrowLeftIcon } from 'lucide-react'

export default async function ChatPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const challengeStart = profile?.challenge_start_date
    ? new Date(profile.challenge_start_date)
    : new Date()

  const tenseId = getTodayTense(challengeStart, profile?.current_level || 1)

  const { data: grammarLog } = await supabase
    .from('grammar_log')
    .select('concept')
    .eq('user_id', user.id)
  const seenConcepts = grammarLog?.map(g => g.concept) || []
  const latestConcept = getNextGrammarConcept(seenConcepts)

  // Last 20 messages for context
  const today = new Date().toISOString().split('T')[0]
  const { data: todaySession } = await supabase
    .from('sessions')
    .select('id')
    .eq('user_id', user.id)
    .eq('session_date', today)
    .single()

  const { data: recentMessages } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  const messages = (recentMessages || []).reverse()

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <header className="bg-white border-b border-cream-200 px-4 py-4 flex-shrink-0">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/dashboard" className="btn-ghost p-2">
            <ArrowLeftIcon className="w-4 h-4" />
          </Link>
          <h1 className="heading-serif text-xl font-bold text-navy-900">
            Juanito
          </h1>
          <span className="text-xs text-navy-400 ml-auto">
            Today: {getTenseName(tenseId)}
          </span>
        </div>
      </header>

      <div className="flex-1 max-w-lg mx-auto w-full overflow-hidden">
        <ChatPageClient
          sessionTense={getTenseName(tenseId)}
          sessionConcept={latestConcept.name}
          sessionId={todaySession?.id}
          userId={user.id}
          initialMessages={messages as Array<{ role: 'user' | 'assistant'; content: string }>}
        />
      </div>
    </div>
  )
}
