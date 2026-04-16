import { useState } from 'react'
import { MOCK_GOALS, GoalItem as GoalItemType } from '../../data/mockDashboard'
import GoalItem from './GoalItem'

export default function DailyGoals() {
  const [goals, setGoals] = useState<GoalItemType[]>(MOCK_GOALS)

  const handleToggle = (id: string) => {
    setGoals(prev =>
      prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g)
    )
  }

  const completedCount = goals.filter(g => g.completed).length
  const allDone = goals.length > 0 && completedCount === goals.length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">每日目标</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completedCount} / {goals.length}
        </span>
      </div>

      {allDone && (
        <div className="mb-4 px-4 py-2.5 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-green-600 dark:text-green-400 text-center">
          今日目标全部完成 🎉
        </div>
      )}

      <ul className="divide-y divide-gray-100 dark:divide-gray-700">
        {goals.map(goal => (
          <GoalItem key={goal.id} goal={goal} onToggle={handleToggle} />
        ))}
      </ul>
    </div>
  )
}
