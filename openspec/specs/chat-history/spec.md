# chat-history Specification

## Purpose
TBD - created by archiving change ai-chat. Update Purpose after archive.
## Requirements
### Requirement: 对话历史持久化到后端数据库

系统 SHALL 将每条用户消息和 AI 回复存储至 `chat_messages` 表，按 `user_id` 隔离。用户 SHALL NOT 能读取其他用户的消息记录。

#### Scenario: 加载历史消息

- **GIVEN** 用户已有历史对话记录
- **WHEN** 用户打开 `/chat` 页面（`GET /api/chat/messages`）
- **THEN** 响应 `200`，返回该用户最近 50 条消息，按 `created_at` 升序排列，格式为 `[{ "role": "user"|"assistant", "content": string, "id": int, "created_at": string }]`

#### Scenario: 历史为空时返回空数组

- **GIVEN** 用户无历史对话
- **WHEN** `GET /api/chat/messages`
- **THEN** 响应 `200`，body 为 `[]`

#### Scenario: 未认证访问历史

- **WHEN** `GET /api/chat/messages`，无有效 Bearer token
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

