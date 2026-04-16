import { useTheme } from '../../contexts/ThemeContext'

interface DashboardTopBarProps {
  title: string
}

export default function DashboardTopBar({ title }: DashboardTopBarProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h1>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        {isDark ? '🌙 暗色' : '☀️ 亮色'}
      </button>
    </header>
  )
}
