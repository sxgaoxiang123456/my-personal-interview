## Why

个人品牌站当前仅作对外展示用途，缺乏实用的学习管理功能。将其改造为 StudyPal 学习 Dashboard，使其成为每日可用的学习效率工具，同时为后续接入后端 API 和 AI 能力打好前端基础。

## What Changes

- **新增** `react-router-dom`，在品牌站根路由 `/` 之外新增 `/dashboard` 路由
- **新增** Dashboard 页面，包含：左侧导航栏、数据统计卡片、每日目标清单、AI 建议学习面板（mock）、周/月趋势图
- **保留** 品牌站（`/` 路由）全部现有组件不变
- **提升** `isDark` 暗色模式状态为全局 Context，供 Dashboard 与品牌站共享
- 所有数据使用 mock 静态数据，不调用任何后端 API

## Capabilities

### New Capabilities

- `dashboard-layout`: 左侧固定侧边栏 + 顶部栏 + 主内容区的应用型布局框架
- `stats-overview`: 数据统计卡片区，展示学习时长、完成率、连续天数、本周目标等 KPI
- `daily-goals`: 每日目标清单，支持目标项的勾选状态切换（纯前端 state）
- `learning-suggestion`: AI 建议学习面板（mock 数据，无真实 AI 调用）
- `progress-chart`: 周/月学习趋势图（基于 mock 数据的可视化）

### Modified Capabilities

（无）

## Impact

**代码影响：**
- `my-website/src/main.tsx`：引入 `BrowserRouter`
- `my-website/src/App.tsx`：外层加 `<Routes>`，品牌站内容移至 `Route path="/"`
- 新增 `src/pages/DashboardPage.tsx` 及若干 `src/components/dashboard/` 子组件
- `isDark` 状态从 `App.tsx` 提升至 `ThemeContext`

**依赖变更：**
- 新增 `react-router-dom`

**部署影响：**
- GitHub Pages 为静态托管，不支持服务端路由；需在 `vite.config.ts` 确认 `base` 路径，并使用 `HashRouter` 或为 GitHub Pages 配置 404 重定向

**回滚方案：**
若路由改造出现问题，可通过以下步骤快速回滚：
1. 移除 `react-router-dom`
2. 还原 `App.tsx` 为原始滚动布局
3. 删除 `src/pages/` 和 `src/components/dashboard/`
品牌站原有组件全程不修改，回滚零损耗。

## Out of Scope / NOT Doing

- 后端 API 接入（所有数据为 mock）
- 真实 AI 功能（建议面板为静态 mock 内容）
- 用户认证 / 登录系统
- 数据持久化（刷新后 state 重置）
- 移动端适配优化（以桌面端为主）
- 品牌站内容修改
