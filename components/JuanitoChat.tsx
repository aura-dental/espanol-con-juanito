'use client'

import { useState, useRef, useEffect } from 'react'
import { SendIcon, Loader2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import JuanitoAvatar from './JuanitoAvatar'
import type { ChatMessage } from '@/lib/claudeApi'

interface JuanitoChatProps {
  sessionTense?: string
  sessionConcept?: string
  sessionId?: string
  initialMessage?: string
  userId: string
}

export default function JuanitoChat({
  sessionTense = 'Presente',
  sessionConcept = '',
  sessionId,
  initialMessage,
  userId,
}: JuanitoChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialMessage) {
      return [{ role: 'assistant', content: initialMessage }]
    }
    return [
      {
        role: 'assistant',
        content: `¡Hola! I'm Juanito, tu tutor de español. 😊 Ask me anything about Spanish — grammar, conjugation, why something sounds weird... whatever's on your mind. Today we worked on **${sessionTense}**. What would you like to explore?`,
      },
    ]
  })
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingContent])

  async function sendMessage() {
    if (!input.trim() || streaming) return

    const userMessage: ChatMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setStreaming(true)
    setStreamingContent('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          tense: sessionTense,
          concept: sessionConcept,
          sessionId,
          userId,
        }),
      })

      if (!response.ok) throw new Error('Chat request failed')
      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let accumulatedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                accumulatedContent += parsed.text
                setStreamingContent(accumulatedContent)
              }
            } catch {}
          }
        }
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: accumulatedContent },
      ])
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lo siento, something went wrong. Try again in a moment.',
        },
      ])
    } finally {
      setStreaming(false)
      setStreamingContent('')
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex gap-2.5 animate-fade-in',
              msg.role === 'user' && 'flex-row-reverse',
            )}
          >
            {msg.role === 'assistant' && (
              <div className="flex-shrink-0 mt-0.5">
                <JuanitoAvatar size="sm" />
              </div>
            )}

            <div
              className={cn(
                'max-w-[80%]',
                msg.role === 'user' && 'chat-bubble-user',
                msg.role === 'assistant' && 'chat-bubble-juanito',
              )}
            >
              <MessageContent content={msg.content} />
            </div>
          </div>
        ))}

        {/* Streaming message */}
        {streaming && (
          <div className="flex gap-2.5 animate-fade-in">
            <div className="flex-shrink-0 mt-0.5">
              <JuanitoAvatar size="sm" />
            </div>
            <div className="chat-bubble-juanito max-w-[80%]">
              {streamingContent ? (
                <MessageContent content={streamingContent} />
              ) : (
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-300 animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-300 animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-navy-300 animate-bounce" />
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-cream-200 p-3">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Juanito anything… (Enter to send)"
            rows={1}
            className="flex-1 rounded-xl border border-cream-300 bg-white px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100 resize-none transition-colors"
            style={{ maxHeight: '120px' }}
            disabled={streaming}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || streaming}
            className={cn(
              'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all',
              !input.trim() || streaming
                ? 'bg-cream-200 text-navy-300'
                : 'bg-terracotta-500 text-white hover:bg-terracotta-600 active:scale-95',
            )}
          >
            {streaming ? (
              <Loader2Icon className="w-4 h-4 animate-spin" />
            ) : (
              <SendIcon className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-navy-300 mt-1.5 text-center">
          Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}

// Simple markdown-aware message renderer
function MessageContent({ content }: { content: string }) {
  // Process basic markdown: **bold**, *italic*, `code`, line breaks
  const lines = content.split('\n')

  return (
    <div className="text-sm leading-relaxed space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <br key={i} />

        // Process inline formatting
        const parts = processInlineMarkdown(line)
        return <p key={i}>{parts}</p>
      })}
    </div>
  )
}

function processInlineMarkdown(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining) {
    // Bold: **text**
    const boldMatch = remaining.match(/^(.*?)\*\*(.*?)\*\*(.*)$/)
    if (boldMatch) {
      if (boldMatch[1]) parts.push(<span key={key++}>{boldMatch[1]}</span>)
      parts.push(<strong key={key++} className="font-semibold">{boldMatch[2]}</strong>)
      remaining = boldMatch[3]
      continue
    }

    // Italic: *text*
    const italicMatch = remaining.match(/^(.*?)\*(.*?)\*(.*)$/)
    if (italicMatch) {
      if (italicMatch[1]) parts.push(<span key={key++}>{italicMatch[1]}</span>)
      parts.push(<em key={key++} className="italic">{italicMatch[2]}</em>)
      remaining = italicMatch[3]
      continue
    }

    // Code: `text`
    const codeMatch = remaining.match(/^(.*?)`(.*?)`(.*)$/)
    if (codeMatch) {
      if (codeMatch[1]) parts.push(<span key={key++}>{codeMatch[1]}</span>)
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-navy-100 text-navy-800 font-mono text-xs">
          {codeMatch[2]}
        </code>
      )
      remaining = codeMatch[3]
      continue
    }

    parts.push(<span key={key++}>{remaining}</span>)
    break
  }

  return parts
}
