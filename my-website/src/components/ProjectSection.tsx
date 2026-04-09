import ProjectCard, { Project } from './ProjectCard'

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI 驱动的博客系统',
    description: '基于大语言模型的智能博客平台，支持自动摘要、标签推荐和语义搜索功能。',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    githubUrl: 'https://github.com',
  },
  {
    id: '2',
    title: '实时协作白板',
    description: '支持多人实时协作的在线白板工具，基于 WebSocket 实现毫秒级同步。',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    githubUrl: 'https://github.com',
  },
  {
    id: '3',
    title: '个人仪表盘',
    description: '聚合天气、股票、待办事项的个人仪表盘，使用 React 和 Tailwind CSS 构建。',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    githubUrl: 'https://github.com',
  },
  {
    id: '4',
    title: '开源组件库',
    description: '一套面向 React 的高质量组件库，包含 50+ 常用组件，完善的 TypeScript 支持。',
    imageUrl: 'https://picsum.photos/seed/project4/600/400',
    githubUrl: 'https://github.com',
  },
]

export default function ProjectSection() {
  return (
    <section id="projects" className="min-h-screen py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            我的项目
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            这里展示了我过往的一些项目作品，涵盖 AI、Web、移动端等多个领域。
          </p>
        </div>

        {/* 项目卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
