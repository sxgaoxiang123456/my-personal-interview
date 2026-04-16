## ADDED Requirements

### Requirement: 后端提供学习日历聚合数据接口

`GET /api/analytics/calendar` SHALL 返回当前用户过去 84 天内每天的 user 消息数（以 `chat_messages` 表中 `role='user'` 的记录按日聚合），仅返回 count > 0 的日期，前端负责补全缺失日期。

#### Scenario: 正常返回日历数据

- **GIVEN** 用户在过去 84 天内有若干天发送过消息
- **WHEN** `GET /api/analytics/calendar`，携带有效 Bearer token
- **THEN** 响应 `200`，body 为 `[{ "date": "2026-04-01", "count": 5 }, ...]`，按 date 升序，仅包含 count > 0 的日期

#### Scenario: 无历史消息时返回空数组

- **GIVEN** 用户无任何 chat_messages 记录
- **WHEN** `GET /api/analytics/calendar`
- **THEN** 响应 `200`，body 为 `[]`

#### Scenario: 未认证访问

- **WHEN** `GET /api/analytics/calendar`，无有效 Bearer token
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

---

### Requirement: 后端提供成就指标接口

`GET /api/analytics/achievements` SHALL 返回成就判定所需的原始指标，不在后端做成就解锁判定。

#### Scenario: 正常返回成就指标

- **GIVEN** 用户已登录
- **WHEN** `GET /api/analytics/achievements`，携带有效 Bearer token
- **THEN** 响应 `200`，body 为 `{ "streak_days": int, "level": int, "total_messages": int }`，`total_messages` 为该用户在 `chat_messages` 中 `role='user'` 的总条数

#### Scenario: 未认证访问

- **WHEN** `GET /api/analytics/achievements`，无有效 Bearer token
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`
