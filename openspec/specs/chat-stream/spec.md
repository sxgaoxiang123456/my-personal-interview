# chat-stream Specification

## Purpose
TBD - created by archiving change ai-chat. Update Purpose after archive.
## Requirements
### Requirement: 后端流式代理 DeepSeek API 并注入个性化 system prompt

`POST /api/chat/stream` SHALL 接受用户消息和历史上下文，向 DeepSeek API 发起流式请求，将 SSE chunks 实时转发给前端。system prompt SHALL 包含当前用户的 `streak_days` 和 `level` 字段以生成个性化回复。完整的 assistant 回复 SHALL 在流结束后持久化到 `chat_messages`。

#### Scenario: 成功发起流式对话

- **GIVEN** 用户已登录，DEEPSEEK_API_KEY 环境变量已配置
- **WHEN** `POST /api/chat/stream`，body 为 `{ "message": "帮我规划今天的学习计划" }`，header 含有效 Bearer token
- **THEN** 响应为 `text/event-stream`；逐行推送 `data: {"delta": "<chunk>"}` 格式；流结束时发送 `data: [DONE]`；user 消息和 assistant 完整回复均写入 `chat_messages`

#### Scenario: DeepSeek API 调用失败

- **GIVEN** DeepSeek API 返回非 200 状态码（如网络超时、密钥无效）
- **WHEN** `POST /api/chat/stream`
- **THEN** 响应 `502`，body 为 `{ "detail": "AI service unavailable" }`

#### Scenario: 未认证访问流式接口

- **WHEN** `POST /api/chat/stream`，无有效 Bearer token
- **THEN** 响应 `401`，body 为 `{ "detail": "Not authenticated" }`

---

### Requirement: DEEPSEEK_API_KEY 从环境变量读取

系统 SHALL 从环境变量 `DEEPSEEK_API_KEY` 读取密钥。密钥 SHALL NOT 出现在代码或版本库中。

#### Scenario: 环境变量未设置时启动失败

- **GIVEN** `DEEPSEEK_API_KEY` 未设置
- **WHEN** FastAPI 应用启动
- **THEN** 应用 SHALL 抛出 `ValueError` 并终止，错误信息说明缺少 `DEEPSEEK_API_KEY`

