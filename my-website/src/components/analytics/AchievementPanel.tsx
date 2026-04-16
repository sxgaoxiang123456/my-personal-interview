import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

interface Metrics {
  streak_days: number
  level: number
  total_messages: number
}

interface Achievement {
  id: string
  label: string
  icon: string
  desc: string
  condition: (m: Metrics) => boolean
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-chat',
    label: '初次对话',
    icon: '💬',
    desc: '发送第一条消息',
    condition: (m) => m.total_messages >= 1,
  },
  {
    id: 'streak-3',
    label: '3天连续',
    icon: '🔥',
    desc: '连续学习 3 天',
    condition: (m) => m.streak_days >= 3,
  },
  {
    id: 'streak-7',
    label: '一周坚持',
    icon: '⚡',
    desc: '连续学习 7 天',
    condition: (m) => m.streak_days >= 7,
  },
  {
    id: 'streak-30',
    label: '月度达人',
    icon: '🏆',
    desc: '连续学习 30 天',
    condition: (m) => m.streak_days >= 30,
  },
  {
    id: 'level-2',
    label: '进阶学习者',
    icon: '📚',
    desc: '达到等级 2',
    condition: (m) => m.level >= 2,
  },
  {
    id: 'level-5',
    label: '学习达人',
    icon: '🎓',
    desc: '达到等级 5',
    condition: (m) => m.level >= 5,
  },
  {
    id: 'chatter-10',
    label: '对话积极者',
    icon: '🗣️',
    desc: '累计发送 10 条消息',
    condition: (m) => m.total_messages >= 10,
  },
  {
    id: 'chatter-50',
    label: '深度探索者',
    icon: '🔭',
    desc: '累计发送 50 条消息',
    condition: (m) => m.total_messages >= 50,
  },
]

export default function AchievementPanel() {
  const { accessToken } = useAuth()
  const [metrics, setMetrics] = useState<Metrics | null>(null)

  useEffect(() => {
    if (!accessToken) return
    fetch(`${API_BASE}/api/analytics/achievements`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((data: Metrics) => setMetrics(data))
      .catch(() => {})
  }, [accessToken])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">成就系统</h2>

      {metrics && (
        <div className="mb-4 flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>连续 <strong className="text-gray-800 dark:text-white">{metrics.streak_days}</strong> 天</span>
          <span>等级 <strong className="text-gray-800 dark:text-white">{metrics.level}</strong></span>
          <span>对话 <strong className="text-gray-800 dark:text-white">{metrics.total_messages}</strong> 条</span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = metrics ? a.condition(metrics) : false
          return (
            <div
              key={a.id}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${
                unlocked
                  ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-100 dark:border-gray-700 opacity-40 grayscale'
              }`}
            >
              <span className="text-2xl">{a.icon}</span>
              <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">{a.label}</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">{a.desc}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
