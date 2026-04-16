import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ''

interface CalendarEntry {
  date: string
  count: number
}

// Build an array of the last 84 days (12 weeks × 7), oldest first
function buildDateGrid(): string[] {
  const days: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push(d.toISOString().slice(0, 10))
  }
  return days
}

function colorClass(count: number): string {
  if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
  if (count <= 2)  return 'bg-blue-200 dark:bg-blue-900'
  if (count <= 5)  return 'bg-blue-400 dark:bg-blue-700'
  if (count <= 9)  return 'bg-blue-600 dark:bg-blue-500'
  return 'bg-blue-800 dark:bg-blue-400'
}

const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六']

export default function LearningCalendar() {
  const { accessToken } = useAuth()
  const [data, setData] = useState<Record<string, number>>({})
  const [tooltip, setTooltip] = useState<{ date: string; count: number } | null>(null)

  useEffect(() => {
    if (!accessToken) return
    fetch(`${API_BASE}/api/analytics/calendar`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((r) => r.json())
      .then((entries: CalendarEntry[]) => {
        const map: Record<string, number> = {}
        entries.forEach((e) => { map[e.date] = e.count })
        setData(map)
      })
      .catch(() => {})
  }, [accessToken])

  const grid = buildDateGrid()
  // Split into 12 columns (weeks), each with 7 days
  const weeks: string[][] = []
  for (let i = 0; i < 12; i++) {
    weeks.push(grid.slice(i * 7, i * 7 + 7))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-800 dark:text-white mb-4">学习日历</h2>

      <div className="flex gap-1">
        {/* Weekday labels */}
        <div className="flex flex-col gap-1 mr-1">
          <div className="h-3" /> {/* spacer aligns with grid top */}
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className="h-3 text-[10px] text-gray-400 leading-3 w-4 text-right">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {/* Month label on first day of month */}
            <div className="h-3 text-[10px] text-gray-400 leading-3">
              {week[0] && new Date(week[0] + 'T00:00:00').getDate() <= 7
                ? new Date(week[0] + 'T00:00:00').toLocaleString('zh-CN', { month: 'short' })
                : ''}
            </div>
            {week.map((date) => {
              const count = data[date] ?? 0
              return (
                <div
                  key={date}
                  className={`h-3 w-3 rounded-sm cursor-default transition-opacity ${colorClass(count)}`}
                  onMouseEnter={() => setTooltip({ date, count })}
                  onMouseLeave={() => setTooltip(null)}
                />
              )
            })}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          {tooltip.date}：{tooltip.count > 0 ? `${tooltip.count} 条对话` : '无活动'}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className="text-xs text-gray-400">少</span>
        {['bg-gray-100 dark:bg-gray-800', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600', 'bg-blue-800'].map((c, i) => (
          <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
        ))}
        <span className="text-xs text-gray-400">多</span>
      </div>
    </div>
  )
}
