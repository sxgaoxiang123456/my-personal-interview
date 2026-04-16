// ── Types ──────────────────────────────────────────────

export interface StatItem {
  id: string
  label: string
  value: string
  icon: string
  trend: number | null   // positive = up, negative = down, null = no data
  unit: string
}

export interface GoalItem {
  id: string
  title: string
  category: string
  completed: boolean
}

export type Priority = 'high' | 'medium' | 'low'

export interface SuggestionItem {
  id: string
  title: string
  description: string
  priority: Priority
  estimatedMinutes: number
}

export interface WeeklyData {
  day: string
  hours: number
}

export interface MonthlyData {
  week: string
  hours: number
}

// ── Mock Data ──────────────────────────────────────────

export const MOCK_STATS: StatItem[] = [
  { id: 'study-hours', label: '本周学习时长', value: '18.5', unit: '小时', icon: '📚', trend: 12 },
  { id: 'completion-rate', label: '目标完成率', value: '76', unit: '%', icon: '✅', trend: -5 },
  { id: 'streak', label: '连续学习天数', value: '9', unit: '天', icon: '🔥', trend: null },
  { id: 'weekly-goals', label: '本周目标数', value: '12', unit: '个', icon: '🎯', trend: 8 },
]

export const MOCK_GOALS: GoalItem[] = [
  { id: 'g1', title: '完成 React 高级模式章节', category: '前端', completed: false },
  { id: 'g2', title: '刷 3 道 LeetCode 中等题', category: '算法', completed: true },
  { id: 'g3', title: '阅读 FastAPI 官方文档 Ch.4', category: '后端', completed: false },
  { id: 'g4', title: '整理本周学习笔记', category: '复习', completed: false },
  { id: 'g5', title: '完成 TypeScript 泛型练习', category: '前端', completed: true },
  { id: 'g6', title: '观看系统设计视频 1 课时', category: '架构', completed: false },
]

export const MOCK_SUGGESTIONS: SuggestionItem[] = [
  {
    id: 's1',
    title: '深入 React Concurrent 模式',
    description: '基于你本周的学习轨迹，建议系统学习 Concurrent 特性，配合 Suspense 使用效果更佳。',
    priority: 'high',
    estimatedMinutes: 90,
  },
  {
    id: 's2',
    title: '补强动态规划基础',
    description: '算法完成率偏低，建议集中 2 天练习 DP 经典题型，提升刷题效率。',
    priority: 'medium',
    estimatedMinutes: 60,
  },
  {
    id: 's3',
    title: '搭建个人 FastAPI 项目脚手架',
    description: '后端文档阅读进度良好，适合动手实践，巩固知识。',
    priority: 'low',
    estimatedMinutes: 45,
  },
]

export const MOCK_WEEKLY: WeeklyData[] = [
  { day: '周一', hours: 2.5 },
  { day: '周二', hours: 3.0 },
  { day: '周三', hours: 1.5 },
  { day: '周四', hours: 4.0 },
  { day: '周五', hours: 3.5 },
  { day: '周六', hours: 2.0 },
  { day: '周日', hours: 0 },
]

export const MOCK_MONTHLY: MonthlyData[] = [
  { week: '第 1 周', hours: 14 },
  { week: '第 2 周', hours: 18 },
  { week: '第 3 周', hours: 12 },
  { week: '第 4 周', hours: 18.5 },
]
