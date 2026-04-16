# dashboard-layout Specification

## Purpose
TBD - created by archiving change studypal-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Dashboard 页面可通过路由访问

系统 SHALL 在路径 `/dashboard`（HashRouter 下为 `#/dashboard`）渲染 Dashboard 页面。品牌站根路径 `/` 的现有内容 SHALL NOT 受影响。

#### Scenario: 访问 /dashboard 路由

- **WHEN** 用户访问 `/#/dashboard`
- **THEN** 渲染 Dashboard 页面，不显示品牌站内容

#### Scenario: 访问根路径

- **WHEN** 用户访问 `/`
- **THEN** 渲染品牌站（HeroSection、ProjectSection、AboutSection），不显示 Dashboard

#### Scenario: 访问不存在的路由

- **WHEN** 用户访问未定义路径（如 `/#/unknown`）
- **THEN** 重定向至 `/` 品牌站首页

---

### Requirement: Dashboard 采用统一侧边栏（AppSidebar）+ 主内容区布局

Dashboard 页面 SHALL 使用共用的 `AppSidebar` 组件作为左侧导航，侧边栏导航为路由级（`NavLink`），不再依赖页面内 section 切换机制。`DashboardPage` SHALL NOT 维护 `activeSection` state，侧边栏与主内容区均固定在视口高度内（`h-screen overflow-hidden`）。

#### Scenario: 桌面端布局渲染

- **WHEN** 页面宽度 ≥ 1024px
- **THEN** 侧边栏（宽 240px）固定显示于左侧，主内容区占据剩余宽度，仅主内容区可滚动

#### Scenario: 侧边栏导航项路由高亮

- **WHEN** 用户位于 `/#/dashboard`
- **THEN** `AppSidebar` 中「学习目标」导航项 SHALL 高亮显示（背景高亮 + 文字加粗），其余导航项为正常灰色

#### Scenario: 暗色模式下布局样式

- **WHEN** 全局暗色模式开启
- **THEN** 侧边栏和主内容区均切换为暗色主题配色

---

### Requirement: 暗色模式状态跨路由共享

系统 SHALL 通过 ThemeContext 全局管理暗色模式，Dashboard 与品牌站 SHALL 共享同一暗色状态。

#### Scenario: 品牌站切换暗色后跳转 Dashboard

- **WHEN** 用户在品牌站开启暗色模式后导航至 `/dashboard`
- **THEN** Dashboard 以暗色模式渲染

