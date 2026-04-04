'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { TENSES, getTodayTense } from '@/lib/tenses'
import { GRAMMAR_CONCEPTS, getNextGrammarConcept } from '@/lib/grammar'
import { getDayNumber, getTenseName } from '@/lib/utils'
import { selectPhase2Verbs, buildAccuracyMap } from '@/lib/spacedRepetition'
import type {
  Profile, Session as SessionType, ExerciseAttempt,
  Pronoun, TenseId, PhaseKey,
} from '@/lib/types'
import { PHASE_KEYS } from '@/lib/types'

import PhaseProgress from '@/components/PhaseProgress'
import Phase1Learn from '@/components/SessionPhases/Phase1Learn'
import Phase2ConjugationTables from '@/components/SessionPhases/Phase2ConjugationTables'
import Phase3IrregularVerb from '@/components/SessionPhases/Phase3IrregularVerb'
import Phase4ContextualSentences from '@/components/SessionPhases/Phase4ContextualSentences'
import Phase5GrammarConcept from '@/components/SessionPhases/Phase5GrammarConcept'
import SessionComplete from '@/components/SessionPhases/SessionComplete'
import JuanitoChat from '@/components/JuanitoChat'
import JuanitoAvatar from '@/components/JuanitoAvatar'
import { XIcon } from 'lucide-react'

export default function SessionPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<SessionType | null>(null)
  const [currentPhase, setCurrentPhase] = useState<PhaseKey>('learn')
  const [isComplete, setIsComplete] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>([])
  const [grammarConcept, setGrammarConcept] = useState(GRAMMAR_CONCEPTS[0])
  const [userId, setUserId] = useState<string>('')
  const [sessionAttempts, setSessionAttempts] = useState<Array<{
    pronoun: Pronoun; verb: string; given: string; correct: boolean; contrastPair: boolean
  }>>([])

  useEffect(() => {
    initSession()
  }, [])

  async function initSession() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/auth'); return }

    setUserId(user.id)

    // Load profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profileData?.display_name || !profileData?.challenge_start_date) {
      router.push('/dashboard?onboard=true')
      return
    }

    setProfile(profileData)

    // Determine today's tense
    const challengeStart = new Date(profileData.challenge_start_date)
    const tenseId = getTodayTense(challengeStart, profileData.current_level)
    const today = new Date().toISOString().split('T')[0]

    // Load or create today's session
    let { data: existingSession } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('session_date', today)
      .single()

    if (existingSession) {
      setSession(existingSession)
      // Resume from last completed phase
      const completed = existingSession.phase_completed || []
      const nextPhase = PHASE_KEYS.find(p => !completed.includes(p))
      if (nextPhase) setCurrentPhase(nextPhase)
      else setIsComplete(true)
    } else {
      const { data: newSession } = await supabase
        .from('sessions')
        .insert({ user_id: user.id, session_date: today, tense: tenseId })
        .select()
        .single()
      setSession(newSession)
    }

    // Load all previous attempts for spaced rep
    const { data: allAttempts } = await supabase
      .from('exercise_attempts')
      .select('*')
      .eq('user_id', user.id)
      .order('attempted_at', { ascending: false })
      .limit(500)

    if (allAttempts) setAttempts(allAttempts)

    // Get grammar concept (next unseen)
    const { data: grammarLog } = await supabase
      .from('grammar_log')
      .select('concept')
      .eq('user_id', user.id)
    const seenConcepts = grammarLog?.map(g => g.concept) || []
    const nextConcept = getNextGrammarConcept(seenConcepts)
    setGrammarConcept(nextConcept)

    setLoading(false)
  }

  async function completePhase(phase: PhaseKey) {
    if (!session) return

    const updatedCompleted = [...(session.phase_completed || []), phase]
    await supabase
      .from('sessions')
      .update({ phase_completed: updatedCompleted })
      .eq('id', session.id)

    setSession(prev => prev ? { ...prev, phase_completed: updatedCompleted } : prev)

    const nextIndex = PHASE_KEYS.indexOf(phase) + 1
    if (nextIndex >= PHASE_KEYS.length) {
      // All phases done
      await supabase
        .from('sessions')
        .update({ completed_at: new Date().toISOString() })
        .eq('id', session.id)

      // Log grammar concept
      await supabase.from('grammar_log').insert({
        user_id: userId,
        session_date: new Date().toISOString().split('T')[0],
        concept: grammarConcept.id,
      })

      setIsComplete(true)
    } else {
      setCurrentPhase(PHASE_KEYS[nextIndex])
    }
  }

  async function logAttempt(
    pronoun: Pronoun,
    verb: string,
    given: string,
    correct: boolean,
    tense?: TenseId,
    isContrastPair = false,
  ) {
    if (!session || !profile) return
    const challengeStart = new Date(profile.challenge_start_date!)
    const tenseId = tense || getTodayTense(challengeStart, profile.current_level)

    await supabase.from('exercise_attempts').insert({
      user_id: userId,
      session_id: session.id,
      tense: tenseId,
      verb,
      pronoun,
      expected: '',  // filled server-side or we can pass it
      given,
      correct,
      contrast_pair: isContrastPair,
    })

    setSessionAttempts(prev => [...prev, { pronoun, verb, given, correct, contrastPair: isContrastPair }])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-100 flex items-center justify-center">
        <div className="text-center space-y-3">
          <JuanitoAvatar size="lg" animated />
          <p className="text-navy-500 text-sm">Preparing your session…</p>
        </div>
      </div>
    )
  }

  if (!profile || !session) return null

  const challengeStart = new Date(profile.challenge_start_date!)
  const tenseId = getTodayTense(challengeStart, profile.current_level)
  const tenseData = TENSES[tenseId]
  const dayNumber = getDayNumber(challengeStart)
  const accuracyMap = buildAccuracyMap(attempts)
  const tenseSessionCount = (profile.tense_session_counts as Record<string, number>)?.[tenseId] || 0
  const phase2Verbs = selectPhase2Verbs(tenseId, accuracyMap, tenseSessionCount)

  const sessionCorrect = sessionAttempts.filter(a => a.correct).length
  const sessionTotal = sessionAttempts.length
  const sessionAccuracy = sessionTotal > 0 ? sessionCorrect / sessionTotal : 1

  // Show signal words: first 4 weeks (28 sessions) OR past tenses
  const showSignalWords = tenseSessionCount < 8 || tenseId === 'indefinido' || tenseId === 'imperfecto'

  return (
    <div className="min-h-screen bg-cream-100">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-cream-200 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <div className="flex-1">
            <PhaseProgress
              currentPhase={isComplete ? 'grammar' : currentPhase}
              completedPhases={(session.phase_completed || []) as PhaseKey[]}
              sessionNumber={dayNumber}
              tenseName={getTenseName(tenseId)}
            />
          </div>
          {!isComplete && (
            <button
              onClick={() => {
                if (window.confirm('End this session early and go to dashboard?')) {
                  router.push('/dashboard')
                }
              }}
              className="flex-shrink-0 text-xs text-navy-400 hover:text-navy-600 px-2 py-1 rounded-lg hover:bg-cream-100 transition-colors"
              title="End session early"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {isComplete ? (
          <SessionComplete
            tense={tenseId}
            dayNumber={dayNumber}
            accuracy={sessionAccuracy}
            correctCount={sessionCorrect}
            totalCount={sessionTotal}
            currentStreak={0}
            onOpenChat={() => setShowChat(true)}
          />
        ) : (
          <>
            {currentPhase === 'learn' && (
              <Phase1Learn
                tenseData={tenseData}
                onComplete={() => completePhase('learn')}
              />
            )}

            {currentPhase === 'conjugation_tables' && (
              <Phase2ConjugationTables
                tenseData={tenseData}
                verbs={phase2Verbs}
                tenseSessionCount={tenseSessionCount}
                onAttempt={(pronoun, verb, given, correct) => {
                  logAttempt(pronoun, verb, given, correct, tenseId, false)
                }}
                onComplete={() => completePhase('conjugation_tables')}
              />
            )}

            {currentPhase === 'irregular' && (
              <Phase3IrregularVerb
                tenseData={tenseData}
                onAttempt={(pronoun, verb, given, correct) => {
                  logAttempt(pronoun, verb, given, correct, tenseId, false)
                }}
                onComplete={() => completePhase('irregular')}
                irregularIndex={tenseSessionCount}
              />
            )}

            {currentPhase === 'contextual' && (
              <Phase4ContextualSentences
                tenseData={tenseData}
                showSignalWords={showSignalWords}
                onAttempt={(pronoun, verb, given, correct, isContrastPair) => {
                  logAttempt(pronoun, verb, given, correct, tenseId, isContrastPair)
                }}
                onComplete={() => completePhase('contextual')}
              />
            )}

            {currentPhase === 'grammar' && (
              <Phase5GrammarConcept
                concept={grammarConcept}
                onComplete={() => completePhase('grammar')}
              />
            )}
          </>
        )}
      </main>

      {/* Floating Juanito button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-4 z-30 flex items-center gap-2 bg-white border border-cream-300 shadow-lg rounded-full pl-3 pr-4 py-2 hover:shadow-xl transition-all active:scale-95"
        >
          <JuanitoAvatar size="sm" />
          <span className="text-xs font-semibold text-navy-700">Ask Juanito</span>
        </button>
      )}

      {/* Chat overlay */}
      {showChat && (
        <div className="fixed inset-0 z-40 bg-black/20 flex items-end justify-center sm:items-center">
          <div className="w-full max-w-lg h-[85vh] bg-white rounded-t-2xl sm:rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cream-200 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <JuanitoAvatar size="sm" />
                <div>
                  <p className="font-semibold text-navy-900 text-sm">Juanito</p>
                  <p className="text-xs text-navy-400">Your Spanish tutor</p>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="btn-ghost p-2"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Chat component */}
            <div className="flex-1 overflow-hidden">
              <JuanitoChat
                sessionTense={getTenseName(tenseId)}
                sessionConcept={grammarConcept.name}
                sessionId={session.id}
                userId={userId}
                initialMessage={isComplete
                  ? `¡Hola! Great session today — you covered the ${getTenseName(tenseId)}. ${sessionAccuracy >= 0.8 ? 'You did really well! 🌟' : 'Some good work there.'} Any questions about what we did, or anything else on your mind?`
                  : undefined
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
