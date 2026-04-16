## ADDED Requirements

### Requirement: 导航栏展示 AI学习站 CTA 按钮

导航栏 SHALL 在右侧展示 "AI学习站" CTA 按钮，样式与普通导航链接明显区分（filled 渐变按钮），在 PC 端和移动端均可见。

#### Scenario: PC 端展示 CTA 按钮

- **WHEN** 用户在宽度 ≥ md breakpoint 的设备上访问主页
- **THEN** 导航栏右侧显示 "AI学习站" 渐变填充按钮，位于普通导航链接右侧

#### Scenario: 移动端汉堡菜单展示 CTA 按钮

- **WHEN** 用户在移动端点击汉堡菜单打开下拉区域
- **THEN** 下拉菜单底部显示 "AI学习站" 全宽按钮，与上方锚点链接之间有分隔线

#### Scenario: CTA 按钮点击收起移动端菜单

- **WHEN** 用户在移动端菜单中点击 "AI学习站" 按钮
- **THEN** 下拉菜单关闭，页面跳转至目标路由

---

### Requirement: 已登录用户点击 CTA 直达 Dashboard

已登录用户（`AuthContext.accessToken` 不为 null）点击 "AI学习站" 按钮 SHALL 直接跳转至 `/dashboard`，无需经过登录页。

#### Scenario: 已登录用户点击 CTA

- **WHEN** `AuthContext.accessToken` 不为 `null`，用户点击 "AI学习站" 按钮
- **THEN** 前端路由跳转至 `/#/dashboard`，Dashboard 页面正常渲染

---

### Requirement: 未登录用户点击 CTA 跳转登录页并携带 redirect 参数

未登录用户（`AuthContext.accessToken` 为 null）点击 "AI学习站" 按钮 SHALL 跳转至 `/login?redirect=/dashboard`，以便登录后自动回跳。

#### Scenario: 未登录用户点击 CTA

- **WHEN** `AuthContext.accessToken` 为 `null`，用户点击 "AI学习站" 按钮
- **THEN** 前端路由跳转至 `/#/login?redirect=%2Fdashboard`，登录页正常渲染

#### Scenario: 未登录用户登录后自动回跳 Dashboard

- **GIVEN** 用户从 `/#/login?redirect=/dashboard` 完成登录
- **WHEN** `POST /api/auth/login` 返回 200
- **THEN** 前端重定向至 `/#/dashboard`（此行为由现有 `ProtectedRoute` + `LoginPage` 保证，CTA 无需额外处理）
