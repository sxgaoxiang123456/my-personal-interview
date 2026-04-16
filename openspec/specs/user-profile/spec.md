# user-profile Specification

## Purpose
TBD - created by archiving change user-auth. Update Purpose after archive.
## Requirements
### Requirement: 已认证用户可获取自身 Profile

系统 SHALL 通过 Bearer token 识别当前用户，返回 Profile 数据：`id`、`email`、`avatar_url`、`streak_days`、`level`。未携带 token 或 token 无效 SHALL 返回 `401`。

#### Scenario: 成功获取 Profile

- **GIVEN** 用户已登录，持有有效 access token
- **WHEN** `GET /api/users/me`，header 含 `Authorization: Bearer <token>`
- **THEN** 响应 `200`，body 为 `{ "id": int, "email": string, "avatar_url": string|null, "streak_days": int, "level": int }`

#### Scenario: 未携带 Authorization header

- **WHEN** `GET /api/users/me`，无 `Authorization` header
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

#### Scenario: access token 已过期

- **GIVEN** 用户持有已过期的 access token
- **WHEN** `GET /api/users/me`，携带该 token
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

---

### Requirement: 用户可更新头像 URL

系统 SHALL 允许已认证用户通过 `PATCH /api/users/me` 更新 `avatar_url` 字段。其他 Profile 字段（`streak_days`、`level`）SHALL NOT 可被此接口修改。

#### Scenario: 成功更新头像 URL

- **GIVEN** 用户已登录，持有有效 access token
- **WHEN** `PATCH /api/users/me`，body 为 `{ "avatar_url": "https://example.com/avatar.png" }`
- **THEN** 响应 `200`，body 为更新后的完整 Profile

#### Scenario: 未认证时尝试更新

- **GIVEN** 用户未登录，无有效 token
- **WHEN** `PATCH /api/users/me`
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

