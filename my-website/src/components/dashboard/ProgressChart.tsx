import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { MOCK_WEEKLY, MOCK_MONTHLY } from '../../data/mockDashboard'
import { useTheme } from '../../contexts/ThemeContext'

export default function ProgressChart() {
  const { isDark } = useTheme()

  const axisColor = isDark ? '#9ca3af' : '#6b7280'
  const gridColor = isDark ? '#374151' : '#e5e7eb'
  const barColor = '#3b82f6'
  const lineColor = '#8b5cf6'

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-6">学习进度</h2>

      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">本周每日学习时长（小时）</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={MOCK_WEEKLY} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="day" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f3f4f6' : '#111827',
              }}
              formatter={(value) => [`${value} 小时`, '学习时长']}
            />
            <Bar dataKey="hours" fill={barColor} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">近四周学习时长汇总（小时）</p>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={MOCK_MONTHLY} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="week" tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : '#fff',
                border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                borderRadius: '8px',
                color: isDark ? '#f3f4f6' : '#111827',
              }}
              formatter={(value) => [`${value} 小时`, '学习时长']}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke={lineColor}
              strokeWidth={2}
              dot={{ fill: lineColor, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
