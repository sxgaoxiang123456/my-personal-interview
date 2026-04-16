import { SuggestionItem, Priority } from '../../data/mockDashboard'

interface SuggestionCardProps {
  suggestion: SuggestionItem
}

const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  low: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
}

const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高优先级',
  medium: '中优先级',
  low: '低优先级',
}

export default function SuggestionCard({ suggestion }: SuggestionCardProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[suggestion.priority]}`}>
          {PRIORITY_LABELS[suggestion.priority]}
        </span>
        <span className="text-xs text-gray-400">约 {suggestion.estimatedMinutes} 分钟</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{suggestion.title}</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{suggestion.description}</p>
    </div>
  )
}
