import { useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import Navigation from './components/Navigation'
import ProjectSection from './components/ProjectSection'
import AboutSection from './components/AboutSection'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      {/* 临时主题切换按钮，便于验证 */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-[68px] right-4 z-[60] px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
      >
        {isDark ? '🌙 暗色' : '☀️ 亮色'}
      </button>

      <Navigation />

      <section id="home">
        <HeroSection
          name="高翔"
          title="自驱力极强的全栈开发工程师"
          description="热爱AI技术，痴迷Vibe Coding，用代码改变世界！"
        />
      </section>

      <ProjectSection />

      <AboutSection />
    </div>
  )
}

export default App
