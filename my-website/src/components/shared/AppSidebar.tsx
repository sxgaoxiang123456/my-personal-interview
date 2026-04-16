import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/analytics', label: '学习数据',    icon: '📊' },
  { to: '/chat',      label: 'AI 对话建议', icon: '💬' },
  { to: '/dashboard', label: '学习目标',    icon: '🎯' },
]

export default function AppSidebar() {
  return (
    <aside className="w-16 sm:w-60 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center sm:justify-start px-2 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 sm:hidden">SP</span>
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400 hidden sm:block">StudyPal</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-1 sm:px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center justify-center sm:justify-start gap-0 sm:gap-3 px-0 sm:px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            <span>{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-1 sm:px-3 py-4 border-t border-gray-200 dark:border-gray-700">
        <a
          href="#/"
          className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3 px-0 sm:px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span>←</span>
          <span className="hidden sm:inline">返回主页</span>
        </a>
      </div>
    </aside>
  )
}
