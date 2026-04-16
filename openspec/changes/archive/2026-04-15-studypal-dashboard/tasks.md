## 1. 基础设施：路由 + 主题 Context

- [x] 1.1 安装 `react-router-dom` 和 `recharts` 依赖
- [x] 1.2 新建 `src/contexts/ThemeContext.tsx`，将 `isDark` 状态和 toggle 函数提升为 Context，导出 `useTheme()` hook
- [x] 1.3 修改 `src/main.tsx`：包裹 `HashRouter` 和 `ThemeProvider`
- [x] 1.4 修改 `src/App.tsx`：引入 `Routes`，品牌站内容移至 `Route path="/"`，新增 `Route path="/dashboard"` 指向 `DashboardPage`；更新现有暗色切换按钮使用 `useTheme()`
- [x] 1.5 验证：`npm run dev` 启动，访问 `/` 品牌站完整显示，访问 `/#/dashboard` 不报错（可空页面），暗色切换在两个路由均生效

## 2. Mock 数据层

- [x] 2.1 新建 `src/data/mockDashboard.ts`，定义并导出以下 TypeScript interface 和 mock 数据：
  - `StatItem[]`（4 条 KPI 卡片数据，含趋势字段）
  - `GoalItem[]`（6 条每日目标，含完成状态）
  - `SuggestionItem[]`（3 条 AI 建议，含优先级）
  - `WeeklyData[]`（近 7 天学习时长）
  - `MonthlyData[]`（近 4 周汇总时长）
- [x] 2.2 验证：TypeScript 编译无报错，所有 interface 字段齐全

## 3. Dashboard 布局框架

- [x] 3.1 新建 `src/pages/DashboardPage.tsx`，实现左侧 240px 侧边栏 + 顶部栏 + 右侧主内容区的 CSS Grid 布局（全部使用 Tailwind class）
- [x] 3.2 新建 `src/components/dashboard/DashboardSidebar.tsx`：品牌 Logo、4 个导航项（概览/目标/进度/AI 建议），激活项高亮样式
- [x] 3.3 新建 `src/components/dashboard/DashboardTopBar.tsx`：页面标题 + 暗色切换按钮（复用 `useTheme()`）
- [x] 3.4 验证：访问 `/#/dashboard`，侧边栏和顶部栏正确渲染，暗色模式切换正常，品牌站路由不受影响

## 4. 数据统计卡片（StatsOverview）

- [x] 4.1 新建 `src/components/dashboard/StatCard.tsx`：接受 `StatItem` props，渲染图标、名称、数值、趋势标签（正向绿色 / 负向红色 / 空值显示 `—`）
- [x] 4.2 新建 `src/components/dashboard/StatsOverview.tsx`：从 `mockDashboard.ts` 导入数据，渲染 4 张 `StatCard` 横向排列
- [x] 4.3 验证：4 张卡片正确显示，趋势标签颜色正确，暗色模式样式正常

## 5. 每日目标清单（DailyGoals）

- [x] 5.1 新建 `src/components/dashboard/GoalItem.tsx`：渲染单条目标（复选框 + 标题 + 分类标签），完成状态显示删除线
- [x] 5.2 新建 `src/components/dashboard/DailyGoals.tsx`：从 mock 数据初始化目标列表，管理 `completed` 状态（`useState`），实现点击切换；计算并显示完成计数；全部完成时显示成就提示；空列表时显示空态文案
- [x] 5.3 验证：点击复选框状态立即切换，完成计数同步更新，全勾选后成就提示出现

## 6. AI 建议学习面板（LearningSuggestion）

- [x] 6.1 新建 `src/components/dashboard/SuggestionCard.tsx`：渲染单条建议（标题、描述、优先级标签、预计时长）
- [x] 6.2 新建 `src/components/dashboard/LearningSuggestion.tsx`：从 mock 数据加载建议列表，按优先级排序渲染；面板标题旁显示"演示数据"角标；空列表显示空态占位
- [x] 6.3 验证：3 条建议正确显示，优先级标签颜色正确（红/黄/蓝），"演示数据"角标可见

## 7. 进度趋势图（ProgressChart）

- [x] 7.1 新建 `src/components/dashboard/ProgressChart.tsx`：使用 `React.lazy` 动态导入，内部渲染周趋势 `BarChart` 和月趋势 `LineChart`（均来自 Recharts），适配暗色模式文字和轴线颜色
- [x] 7.2 在 `DashboardPage.tsx` 中用 `<Suspense fallback>` 包裹 `ProgressChart`
- [x] 7.3 验证：图表正常渲染，鼠标悬浮显示 tooltip，暗色模式配色正确，品牌站首页 bundle 不包含 Recharts（DevTools Network 确认）

## 8. 集成 & 最终验收

- [x] 8.1 将所有 Dashboard 子组件集成至 `DashboardPage.tsx` 主内容区，调整间距和响应式布局
- [x] 8.2 运行 `npm run build` + `tsc`，确认无 TypeScript 错误，构建产物正常
- [x] 8.3 验证完整流程：品牌站 `/` 正常 → 切换暗色 → 跳转 `/#/dashboard` → Dashboard 全功能正常 → 暗色状态保持 → 返回品牌站正常
