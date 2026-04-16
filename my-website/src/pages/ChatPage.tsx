import { useEffect, useRef, useState, FormEvent, useCallback } from 'react'
import AppSidebar from '../components/shared/AppSidebar'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAuth } from '../contexts/AuthContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

interface HistoryItem {
  id: number
  role: string
  content: string
  created_at: string
}

function generateId() {
  return Math.random().toString(36).slice(2)
}

export default function ChatPage() {
  const { accessToken } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load history on mount
  useEffect(() => {
    if (!accessToken) return
    fetch(`${API_BASE}/api/chat/messages`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((items: HistoryItem[]) => {
        setMessages(
          items.map((m) => ({
            id: String(m.id),
            role: m.role as 'user' | 'assistant',
            content: m.content,
          }))
        )
      })
      .catch(() => {/* silent */})
  }, [accessToken])

  // Auto-scroll on new messages / streaming chunks
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      const text = input.trim()
      if (!text || isStreaming || !accessToken) return

      setInput('')
      setIsStreaming(true)

      const userMsgId = generateId()
      const assistantMsgId = generateId()

      setMessages((prev) => [
        ...prev,
        { id: userMsgId, role: 'user', content: text },
        { id: assistantMsgId, role: 'assistant', content: '', isStreaming: true },
      ])

      try {
        const res = await fetch(`${API_BASE}/api/chat/stream`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ message: text }),
        })

        if (!res.ok || !res.body) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? { ...m, content: '抱歉，AI 服务暂时不可用，请稍后重试。', isStreaming: false }
                : m
            )
          )
          return
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data:')) continue
            const dataStr = line.slice(5).trim()
            if (dataStr === '[DONE]') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, isStreaming: false } : m
                )
              )
              continue
            }
            try {
              const parsed = JSON.parse(dataStr)
              if (parsed.delta) {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsgId
                      ? { ...m, content: m.content + parsed.delta }
                      : m
                  )
                )
              }
            } catch {
              // skip malformed chunk
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? { ...m, content: '网络错误，请检查连接后重试。', isStreaming: false }
              : m
          )
        )
      } finally {
        setIsStreaming(false)
      }
    },
    [input, isStreaming, accessToken]
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AppSidebar />

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Top bar */}
        <header className="h-16 flex items-center px-6 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">AI 学习助手</h1>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500 text-sm">
              发送消息开始对话，AI 将基于你的学习数据给出个性化建议
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[72%] min-w-0 px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:rounded-lg prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-table:text-sm prose-th:bg-gray-50 dark:prose-th:bg-gray-700 prose-headings:text-gray-800 dark:prose-headings:text-gray-100">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        table: ({ children }) => (
                          <div className="overflow-x-auto">
                            <table className="min-w-max">{children}</table>
                          </div>
                        ),
                      }}
                    >
                      {msg.content || (msg.isStreaming ? '▍' : '')}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </main>

        {/* Input area */}
        <footer className="px-6 py-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <form onSubmit={sendMessage} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isStreaming}
              placeholder="输入消息…"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium rounded-xl text-sm transition-colors"
            >
              {isStreaming ? '生成中…' : '发送'}
            </button>
          </form>
        </footer>
      </div>
    </div>
  )
}
