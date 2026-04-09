import { useState } from 'react'

interface AboutSectionProps {
  name?: string
  bio?: string[]
  brand?: string
  photoUrl?: string
}

const DEFAULT_BIO = [
  '全栈开发工程师，专注于现代 Web 技术栈，拥有多年从前端到后端的全链路开发经验。',
  '热爱 AI 技术，积极探索大语言模型在实际产品中的应用，追求用技术解决实际问题。',
  '坚信代码改变世界，愿用技术创造价值，让生活更美好。',
]

const DEFAULT_PHOTO = 'https://picsum.photos/seed/avatar/400/400'
const DEFAULT_BRAND = 'George AI'

export default function AboutSection({
  name = '高翔',
  bio = DEFAULT_BIO,
  brand = DEFAULT_BRAND,
  photoUrl = DEFAULT_PHOTO,
}: AboutSectionProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* 左侧照片 */}
          <div className="flex-shrink-0">
            {!imageError ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-xl"
              />
            ) : (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">{name.charAt(0)}</span>
              </div>
            )}
          </div>

          {/* 右侧简介 */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              关于我
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
              {bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* 品牌标签 */}
            <div className="mt-8">
              <span className="inline-block px-6 py-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-lg font-medium">
                {brand}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
