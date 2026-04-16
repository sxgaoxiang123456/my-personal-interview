import { MOCK_STATS } from '../../data/mockDashboard'
import StatCard from './StatCard'

export default function StatsOverview() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {MOCK_STATS.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  )
}
