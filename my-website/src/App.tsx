import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import HeroSection from './components/HeroSection'
import Navigation from './components/Navigation'
import ProjectSection from './components/ProjectSection'
import AboutSection from './components/AboutSection'
import ProtectedRoute from './components/auth/ProtectedRoute'

const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ChatPage = lazy(() => import('./pages/ChatPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))

function BrandSite() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <button
        onClick={toggleTheme}
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

const pageFallback = (
  <div className="flex items-center justify-center min-h-screen text-gray-400 text-sm dark:bg-gray-900">
    加载中…
  </div>
)

function App() {
  return (
    <Suspense fallback={pageFallback}>
      <Routes>
        <Route path="/" element={<BrandSite />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
