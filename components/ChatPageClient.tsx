'use client'

import JuanitoChat from './JuanitoChat'

interface ChatPageClientProps {
  sessionTense: string
  sessionConcept: string
  sessionId?: string
  userId: string
  initialMessages: Array<{ role: 'user' | 'assistant'; content: string }>
}

export default function ChatPageClient({
  sessionTense,
  sessionConcept,
  sessionId,
  userId,
  initialMessages,
}: ChatPageClientProps) {
  return (
    <div className="h-[calc(100vh-65px)]">
      <JuanitoChat
        sessionTense={sessionTense}
        sessionConcept={sessionConcept}
        sessionId={sessionId}
        userId={userId}
      />
    </div>
  )
}
