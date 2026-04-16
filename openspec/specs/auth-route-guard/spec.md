# auth-route-guard Specification

## Purpose
TBD - created by archiving change user-auth. Update Purpose after archive.
## Requirements
### Requirement: /dashboard 路由需登录方可访问

`ProtectedRoute` 组件 SHALL 检查 `AuthContext` 中的 access token。token 存在时渲染子路由；token 为 `null` 时 SHALL 重定向至 `/login`，并保留原目标路径以便登录后回跳。

#### Scenario: 已登录用户访问 /dashboard

- **GIVEN** `AuthContext.accessToken` 不为 `null`
- **WHEN** 用户导航至 `/#/dashboard`
- **THEN** Dashboard 页面正常渲染

#### Scenario: 未登录用户访问 /dashboard

- **GIVEN** `AuthContext.accessToken` 为 `null`
- **WHEN** 用户导航至 `/#/dashboard`
- **THEN** 立即重定向至 `/#/login`，URL 中携带 `?redirect=/dashboard`

#### Scenario: 静默续期完成前的加载状态

- **GIVEN** `AuthProvider` 正在执行挂载时的 refresh token 请求（`isLoading: true`）
- **WHEN** 用户访问 `/#/dashboard`
- **THEN** `ProtectedRoute` SHALL 渲染加载占位符，不跳转，待续期完成后再做路由决策

---

### Requirement: 登录成功后回跳至原目标页

系统 SHALL 在登录成功后将用户重定向至登录前尝试访问的页面；若无目标页，则重定向至 `/#/dashboard`。

#### Scenario: 携带 redirect 参数的登录成功

- **GIVEN** 用户从 `/#/login?redirect=/dashboard` 完成登录
- **WHEN** `POST /api/auth/login` 返回 `200`
- **THEN** 前端重定向至 `/#/dashboard`

#### Scenario: 直接访问登录页后成功登录

- **GIVEN** 用户直接访问 `/#/login`（无 redirect 参数）
- **WHEN** 登录成功
- **THEN** 前端重定向至 `/#/dashboard`（默认目标）

