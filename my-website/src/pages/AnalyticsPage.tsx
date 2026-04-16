import AppSidebar from '../components/shared/AppSidebar'
import DashboardTopBar from '../components/dashboard/DashboardTopBar'
import LearningCalendar from '../components/analytics/LearningCalendar'
import AchievementPanel from '../components/analytics/AchievementPanel'

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <DashboardTopBar title="学习数据" />

        <main className="flex-1 p-3 sm:p-6 space-y-6 overflow-y-auto">
          <LearningCalendar />
          <AchievementPanel />
        </main>
      </div>
    </div>
  )
}
