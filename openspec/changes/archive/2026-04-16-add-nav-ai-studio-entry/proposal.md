## Why

主页导航栏缺少直接进入 AI 学习站（Dashboard）的入口，用户无法从个人品牌主页一键跳转到 AI 学习功能，造成使用断层。通过在导航栏新增 CTA 按钮打通这一入口。

## What Changes

- 在 `Navigation.tsx` 导航栏右侧新增 "AI学习站" CTA 按钮
- PC 端：按钮显示在导航链接右侧，样式与普通导航链接明显区分（filled button 样式）
- 移动端：按钮嵌入汉堡菜单下拉区域，单独一行展示
- 点击逻辑：已登录 → 跳转 `/dashboard`；未登录 → 跳转 `/login?redirect=/dashboard`
- 复用 `AuthContext` 判断登录状态，无需新增鉴权逻辑

## Capabilities

### New Capabilities

- `nav-ai-studio-cta`: 导航栏 AI 学习站入口按钮，覆盖 PC 端和移动端呈现，包含基于登录状态的路由跳转逻辑

### Modified Capabilities

（无）

## Impact

- **修改文件**：`my-website/src/components/Navigation.tsx`
- **依赖**：`AuthContext`（`useAuth` hook），`react-router-dom`（`useNavigate`）
- **现有功能**：锚点滚动导航不受影响，`ProtectedRoute` 的 redirect 逻辑已支持 `?redirect=/dashboard` 回跳，无需修改

**Not Doing**：
- 不修改 `ProtectedRoute` 或 `AuthContext`
- 不在 Hero Section 新增按钮
- 不改变现有三个导航链接的样式或行为
- 不引入新的状态管理或路由配置
