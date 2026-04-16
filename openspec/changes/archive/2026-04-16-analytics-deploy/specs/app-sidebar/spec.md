## ADDED Requirements

### Requirement: 统一侧边栏组件跨页面共用，导航三个顶层路由

`AppSidebar` 组件 SHALL 取代 `DashboardSidebar` 和 `ChatPage` 内各自的内联侧边栏；导航项 SHALL 固定为三个顶层路由：**学习数据**（`/analytics`）、**AI 对话建议**（`/chat`）、**学习目标**（`/dashboard`）；当前所在路由对应的导航项 SHALL 高亮显示（`NavLink` isActive）。

#### Scenario: 当前路由导航项高亮

- **GIVEN** 用户位于 `/#/analytics`
- **WHEN** `AppSidebar` 渲染
- **THEN** 「学习数据」导航项 SHALL 显示蓝色高亮（`bg-blue-50 text-blue-600`）；其余两项 SHALL 为正常灰色

#### Scenario: 导航切换路由

- **GIVEN** 用户位于 `/#/dashboard`
- **WHEN** 用户点击「AI 对话建议」
- **THEN** 路由跳转至 `/#/chat`，「AI 对话建议」导航项高亮

## MODIFIED Requirements

### dashboard-layout: 导航结构重构为三个顶层路由入口

原 `DashboardSidebar` 基于 `onNavigate` callback 的页面内 section 切换模式 SHALL 替换为 `AppSidebar` 的路由级导航。`DashboardPage` SHALL NOT 再渲染自己的侧边栏，改为使用 `AppSidebar`。
