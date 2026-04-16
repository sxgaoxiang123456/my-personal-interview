## 1. 修改 AppSidebar.tsx

- [x] 1.1 sidebar 容器宽度改为 `w-16 sm:w-60`
- [x] 1.2 Logo 区域：新增 `<span className="sm:hidden">SP</span>` 和 `<span className="hidden sm:block">StudyPal</span>`，padding 改为 `px-2 sm:px-6`，内容改为 `justify-center sm:justify-start`
- [x] 1.3 NavLink 样式：gap 改为 `gap-0 sm:gap-3`，padding 改为 `px-0 sm:px-3`，对齐改为 `justify-center sm:justify-start`
- [x] 1.4 NavLink label 文字：加 `hidden sm:inline` 隐藏类
- [x] 1.5 Footer 返回主页：链接对齐改为 `justify-center sm:justify-start`，"返回主页" 文字加 `hidden sm:inline`

## 2. 修改各 Page 内容区 Padding

- [x] 2.1 `DashboardPage.tsx`：`<main>` padding 改为 `p-3 sm:p-6`
- [x] 2.2 `AnalyticsPage.tsx`：`<main>` padding 改为 `p-3 sm:p-6`
- [x] 2.3 `ChatPage.tsx`：`<main>` padding 改为 `p-3 sm:p-6`（如有 main 元素）

## 3. 验证

- [x] 3.1 移动端（390px）下确认 sidebar 宽度为 64px，Logo 显示 "SP"，导航只显示图标且居中
- [x] 3.2 移动端下确认内容区 padding 缩减，内容不再拥挤
- [x] 3.3 PC 端（1280px）下确认 sidebar 完整展开，"StudyPal" 文字显示，样式与改前一致
- [x] 3.4 暗色模式下移动端样式正常
- [x] 3.5 三个页面（Dashboard / Analytics / Chat）均验证无误
