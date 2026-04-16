import { MOCK_SUGGESTIONS, Priority } from '../../data/mockDashboard'
import SuggestionCard from './SuggestionCard'

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 }

export default function LearningSuggestion() {
  const sorted = [...MOCK_SUGGESTIONS].sort(
    (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
  )

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">AI 建议</h2>
        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-500 dark:text-orange-400 font-medium">
          演示数据
        </span>
      </div>

      <div className="space-y-3">
        {sorted.map(s => (
          <SuggestionCard key={s.id} suggestion={s} />
        ))}
      </div>
    </div>
  )
}
