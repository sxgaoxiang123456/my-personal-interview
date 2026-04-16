## ADDED Requirements

### Requirement: 使用 refresh token 换取新 access token

系统 SHALL 接受有效 refresh token，返回新 access token。refresh token 本身不轮换（不换发新 refresh token）。无效或过期的 refresh token SHALL 返回 `401`。

#### Scenario: 成功刷新

- **GIVEN** 用户持有有效且未过期的 refresh token
- **WHEN** `POST /api/auth/refresh` 携带该 refresh token
- **THEN** 响应 `200`，body 为 `{ "access_token": <string>, "token_type": "bearer" }`

#### Scenario: refresh token 已过期

- **GIVEN** 用户持有已过期的 refresh token
- **WHEN** `POST /api/auth/refresh` 携带该 token
- **THEN** 响应 `401`，body 为 `{ "detail": "Invalid or expired refresh token" }`

#### Scenario: refresh token 签名无效

- **GIVEN** 用户持有被篡改的 token 字符串
- **WHEN** `POST /api/auth/refresh` 携带该 token
- **THEN** 响应 `401`，body 为 `{ "detail": "Invalid or expired refresh token" }`

---

### Requirement: 前端在页面加载时自动静默续期

`AuthProvider` SHALL 在挂载时读取 `localStorage` 中的 refresh token，若存在则调用 `/api/auth/refresh` 换取新 access token，将 access token 写入内存 state；整个过程不触发页面跳转。

#### Scenario: 页面刷新后自动恢复登录态

- **GIVEN** `localStorage` 存有有效 refresh token
- **WHEN** 用户刷新页面，`AuthProvider` 完成挂载
- **THEN** access token 写入内存，`user` state 更新，用户无需重新登录

#### Scenario: localStorage 无 refresh token 时的降级

- **GIVEN** `localStorage` 中无 refresh token（首次访问或已登出）
- **WHEN** `AuthProvider` 完成挂载
- **THEN** access token 保持 `null`，`user` 保持 `null`，不发起网络请求，不报错
