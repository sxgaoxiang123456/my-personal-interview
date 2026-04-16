import { StatItem } from '../../data/mockDashboard'

interface StatCardProps {
  stat: StatItem
}

function TrendLabel({ trend }: { trend: number | null }) {
  if (trend === null) return <span className="text-xs text-gray-400">—</span>
  const isUp = trend > 0
  return (
    <span className={`text-xs font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
      {isUp ? '↑' : '↓'} {Math.abs(trend)}%
    </span>
  )
}

export default function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{stat.icon}</span>
        <TrendLabel trend={stat.trend} />
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        {stat.value}
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">{stat.unit}</span>
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
    </div>
  )
}
