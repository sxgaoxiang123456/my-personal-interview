## Context

当前品牌站为纯前端静态单页，无路由库，导航依赖锚点滚动。本次改造在现有代码基础上，新增 `/dashboard` 路由和 StudyPal Dashboard 页面，品牌站完整保留。所有数据为静态 mock，不涉及后端。

## Goals / Non-Goals

**Goals:**
- 在不破坏品牌站的前提下新增 Dashboard 页面
- 建立可扩展的 Dashboard 布局框架（侧边栏 + 主内容区）
- 统一暗色模式状态管理，供两个页面共享

**Non-Goals:**
- 后端 API 接入
- 真实 AI 调用
- 用户认证与数据持久化

## Decisions

### 决策 1：使用 HashRouter（而非 BrowserRouter）

**选择**：`HashRouter`

**理由**：GitHub Pages 为纯静态托管，不支持服务端路由重定向。`BrowserRouter` 在直接访问 `/dashboard` 时会返回 404。`HashRouter` 通过 URL hash 实现路由，无需服务端配置，完全兼容静态部署。

**备选**：BrowserRouter + 404.html 重定向 hack → 增加维护复杂度，放弃。

---

### 决策 2：isDark 提升为 ThemeContext

**选择**：新建 `src/contexts/ThemeContext.tsx`，提供 `useTheme()` hook

**理由**：当前 `isDark` 仅存于 `App.tsx`，Dashboard 页面无法访问。提升为 Context 后两个路由页面共享同一暗色状态，无需 prop drilling。

**备选**：在 DashboardPage 内独立维护 `isDark` → 两页面暗色状态不同步，用户体验差，放弃。

---

### 决策 3：图表库选用 Recharts

**选择**：`recharts`

**理由**：Recharts 基于 React 组件化 API，与现有 React 19 + TypeScript 栈完全兼容，包体积合理（~160KB gzip 后约 50KB），声明式写法与 Tailwind 协作自然，社区活跃度高。

**备选**：Chart.js（需 canvas，API 命令式，与 React 集成繁琐）、D3（过重，需自写动画）。

---

### 决策 4：Mock 数据集中管理

**选择**：`src/data/mockDashboard.ts` 统一导出所有 mock 数据

**理由**：后续接入后端 API 时，只需替换此文件的导入来源（从静态对象改为 API 调用），组件层不需要修改。

---

### 决策 5：Dashboard 子组件目录隔离

**选择**：`src/components/dashboard/` 独立目录

**理由**：避免与品牌站组件（`src/components/`）命名冲突，清晰的模块边界便于后续单独迭代。

## 组件层级图

```
main.tsx
└── HashRouter
    └── ThemeProvider
        └── Routes
            ├── Route path="/"
            │   └── BrandApp (原 App.tsx，不修改)
            │       ├── Navigation
            │       ├── HeroSection → ParticleCanvas
            │       ├── ProjectSection → ProjectCard × N
            │       └── AboutSection
            │
            └── Route path="/dashboard"
                └── DashboardPage
                    ├── DashboardSidebar
                    │   ├── Logo / Brand
                    │   └── SideNavItem × N (概览/目标/进度/建议)
                    ├── DashboardTopBar
                    │   └── ThemeToggle (复用暗色逻辑)
                    └── DashboardMain
                        ├── StatsOverview
                        │   └── StatCard × 4
                        │       (学习时长 / 完成率 / 连续天数 / 本周目标)
                        ├── DailyGoals
                        │   └── GoalItem × N (checkbox + label)
                        ├── LearningSuggestion
                        │   └── SuggestionCard × N (mock AI 建议)
                        └── ProgressChart
                            ├── WeeklyChart (Recharts BarChart)
                            └── MonthlyChart (Recharts LineChart)
```

## 新增文件清单

```
src/
├── contexts/
│   └── ThemeContext.tsx          ← 新增：全局暗色模式
├── data/
│   └── mockDashboard.ts         ← 新增：所有 mock 数据
├── pages/
│   └── DashboardPage.tsx        ← 新增：Dashboard 页面入口
└── components/
    └── dashboard/
        ├── DashboardSidebar.tsx
        ├── DashboardTopBar.tsx
        ├── StatsOverview.tsx
        ├── StatCard.tsx
        ├── DailyGoals.tsx
        ├── GoalItem.tsx
        ├── LearningSuggestion.tsx
        ├── SuggestionCard.tsx
        └── ProgressChart.tsx
```

## 修改文件清单

```
src/
├── main.tsx                     ← 加 HashRouter + ThemeProvider
├── App.tsx                      ← 加 Routes，原内容移至 Route path="/"
```

## Risks / Trade-offs

- **[Risk] HashRouter 与品牌站锚点冲突** → 品牌站的 `#home`/`#projects`/`#about` 锚点在 HashRouter 下会与路由 hash 冲突。缓解：品牌站路由保持 `/`，其内部锚点滚动逻辑不变，HashRouter 的 hash 仅用于路由切换（`#/dashboard`），两者命名空间不同，不冲突。

- **[Risk] Recharts 包体积增加首屏加载** → 使用动态 import（`React.lazy`）懒加载 ProgressChart 组件，仅在 Dashboard 路由下加载图表库。

- **[Risk] 暗色状态在路由切换时丢失** → ThemeContext 在 HashRouter 外层，状态跨路由持久，不丢失。

## API 端点规范

本次变更不涉及任何 API 调用，所有数据来源于 `mockDashboard.ts` 静态导出。
后续接入后端时，各模块对应端点预留如下（不在本次实现范围）：

| 模块 | 预留端点 | 说明 |
|------|---------|------|
| StatsOverview | `GET /api/stats/overview` | 返回 KPI 数据 |
| DailyGoals | `GET /api/goals/today` | 返回今日目标列表 |
| DailyGoals | `PATCH /api/goals/:id` | 更新目标完成状态 |
| LearningSuggestion | `GET /api/suggestions` | 返回 AI 建议列表 |
| ProgressChart | `GET /api/progress/weekly` | 返回周趋势数据 |
| ProgressChart | `GET /api/progress/monthly` | 返回月趋势数据 |
