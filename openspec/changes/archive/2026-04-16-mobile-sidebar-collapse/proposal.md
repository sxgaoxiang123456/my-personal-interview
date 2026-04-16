## Why

StudyPal 内页（Dashboard / Analytics / Chat）在移动端尺寸下，左侧 sidebar 固定 240px 宽度占屏幕 62%，内容区仅剩约 150px，阅读体验极差。通过在移动端折叠 sidebar 为 icon-only 模式释放空间。

## What Changes

- `AppSidebar.tsx`：移动端（< sm / 640px）sidebar 宽度从 `w-60` 收缩为 `w-16`，文字标签全部隐藏，图标居中显示；Logo 区域切换为缩写 "SP"；Footer 仅保留 ← 图标
- `DashboardPage.tsx`：内容区 `main` padding 从 `p-6` 改为 `p-3 sm:p-6`
- `AnalyticsPage.tsx`：同上
- `ChatPage.tsx`：同上
- PC 端（≥ sm）全部维持现状，零改动

## Capabilities

### New Capabilities

- `sidebar-responsive-collapse`：AppSidebar 在移动端自动折叠为 icon-only 模式，PC 端保持完整展开态

### Modified Capabilities

（无——`app-sidebar` spec 的功能需求不变，仅新增响应式外观行为）

## Impact

- **修改文件**：`AppSidebar.tsx`、`DashboardPage.tsx`、`AnalyticsPage.tsx`、`ChatPage.tsx`
- **无新增依赖**：纯 Tailwind utility class 变更
- **无路由/逻辑影响**：页面切换、后端链路、AuthContext 均不涉及

**Not Doing：**
- PC 端（≥ sm）sidebar 样式不做任何改动
- 不新增 sidebar 展开/收起的交互动画或手势
- 不修改页面切换逻辑或路由
- 不改动 DashboardTopBar 组件
