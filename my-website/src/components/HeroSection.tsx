import ParticleCanvas from './ParticleCanvas'

interface HeroSectionProps {
  name?: string
  title?: string
  description?: string
}

export default function HeroSection({
  name = 'Your Name',
  title = 'Your Title',
  description = 'Your one-line introduction',
}: HeroSectionProps) {
  const handleCTAClick = () => {
    const target = document.getElementById('projects')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.warn('Target section #projects not found')
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 渐变背景层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 z-0" />

      {/* Canvas 粒子层 */}
      <ParticleCanvas className="z-1" />

      {/* 内容层 */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold mb-4">{name}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{title}</p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">{description}</p>
        <button
          onClick={handleCTAClick}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          查看我的项目
        </button>
      </div>
    </section>
  )
}
