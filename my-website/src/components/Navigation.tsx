import { useState } from 'react'

interface NavigationProps {
  brand?: string
}

const NAV_LINKS = [
  { label: '首页', href: '#home' },
  { label: '项目', href: '#projects' },
  { label: '联系我', href: '#about' },
]

export default function Navigation({ brand = '高翔' }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.warn(`Target section ${href} not found`)
    }
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-gray-800">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* 左侧品牌 */}
        <a href="#home" className="text-xl font-bold text-gray-700 dark:text-gray-200">
          {brand}
        </a>

        {/* PC端导航链接（md及以上） */}
        <ul className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 移动端汉堡菜单按钮（md以下） */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-200"
          aria-label="菜单"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 移动端下拉菜单（md以下且打开时） */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-slate-900/90">
          <ul className="px-4 py-2 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
