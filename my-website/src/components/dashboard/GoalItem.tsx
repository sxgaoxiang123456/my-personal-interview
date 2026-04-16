import { GoalItem as GoalItemType } from '../../data/mockDashboard'

interface GoalItemProps {
  goal: GoalItemType
  onToggle: (id: string) => void
}

export default function GoalItem({ goal, onToggle }: GoalItemProps) {
  return (
    <li className="flex items-center gap-3 py-2.5">
      <input
        type="checkbox"
        checked={goal.completed}
        onChange={() => onToggle(goal.id)}
        className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
      />
      <span
        className={`flex-1 text-sm ${
          goal.completed
            ? 'line-through text-gray-400 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-200'
        }`}
      >
        {goal.title}
      </span>
      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
        {goal.category}
      </span>
    </li>
  )
}
