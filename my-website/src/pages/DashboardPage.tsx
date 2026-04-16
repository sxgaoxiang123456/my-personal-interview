import { lazy, Suspense } from 'react'
import AppSidebar from '../components/shared/AppSidebar'
import DashboardTopBar from '../components/dashboard/DashboardTopBar'
import StatsOverview from '../components/dashboard/StatsOverview'
import DailyGoals from '../components/dashboard/DailyGoals'
import LearningSuggestion from '../components/dashboard/LearningSuggestion'

const ProgressChart = lazy(() => import('../components/dashboard/ProgressChart'))

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <DashboardTopBar title="学习目标" />

        <main className="flex-1 p-3 sm:p-6 space-y-6 overflow-y-auto">
          <StatsOverview />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <DailyGoals />
            <LearningSuggestion />
          </div>

          <Suspense
            fallback={
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 text-center text-sm text-gray-400">
                图表加载中…
              </div>
            }
          >
            <ProgressChart />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
