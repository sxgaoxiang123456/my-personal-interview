## 1. 修改 Navigation.tsx

- [x] 1.1 在 `Navigation.tsx` 中引入 `useNavigate` (react-router-dom) 和 `useAuth` (AuthContext)
- [x] 1.2 新增 `handleCtaClick` 函数：已登录跳转 `/dashboard`，未登录跳转 `/login?redirect=/dashboard`，跳转后调用 `setIsOpen(false)` 关闭移动端菜单
- [x] 1.3 PC 端（`hidden md:flex` 区域）在 NAV_LINKS 列表右侧新增 "AI学习站" 渐变填充按钮（`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-full` 样式）
- [x] 1.4 移动端下拉菜单底部新增分隔线 `<hr>` 和全宽 "AI学习站" 按钮（`w-full` 样式）

## 2. 验证

- [x] 2.1 启动 dev server，确认 PC 端导航栏右侧显示渐变 CTA 按钮，样式与普通链接有明显区分
- [x] 2.2 未登录状态点击 CTA，确认跳转至 `/login?redirect=%2Fdashboard`
- [x] 2.3 登录后确认自动回跳 `/dashboard`（复用现有 redirect 逻辑）
- [x] 2.4 已登录状态点击 CTA，确认直接跳转 `/dashboard`
- [x] 2.5 移动端视图下打开汉堡菜单，确认菜单底部显示 CTA 按钮，点击后菜单关闭并正确跳转
- [x] 2.6 暗色模式下确认 CTA 按钮样式正常
