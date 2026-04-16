## Technical Decisions

### 后端架构

**SSE 流式响应**：使用 `sse-starlette` 的 `EventSourceResponse`，通过 `httpx.AsyncClient` 以流式方式调用 DeepSeek API (`https://api.deepseek.com/chat/completions`)，逐 chunk 转发给前端。选择 SSE 而非 WebSocket，因为对话是单向流（服务端→客户端），SSE 更轻量且对 proxy 友好。

**DeepSeek 模型**：使用 `deepseek-chat`（对话优化模型），`stream: true`，`max_tokens: 2048`。

**个性化 system prompt**：在每次请求时从数据库读取当前用户的 `streak_days` 和 `level`，拼入 system message：
```
你是 StudyPal AI 学习助手。用户当前连续学习 {streak_days} 天，等级 {level}。
请基于用户的学习进度，给出个性化、鼓励性的学习建议。
```

**对话历史**：每次请求携带完整历史（最近 20 条），传给 DeepSeek 作 context。历史持久化到 `chat_messages` 表，角色字段为 `user` / `assistant`。

**数据库设计**：
```
chat_messages
  id          INTEGER PK
  user_id     INTEGER FK → users.id (NOT NULL)
  role        VARCHAR  ('user' | 'assistant')
  content     TEXT     (NOT NULL)
  created_at  DATETIME
```
索引：`ix_chat_messages_user_id`（查询用户历史）

**Alembic 迁移**：`0002_create_chat_messages`

---

### 前端架构

**流式渲染**：使用 `fetch` + `ReadableStream` 读取 SSE，正则解析 `data: {...}` 行，实时 append 到当前 assistant 消息 state。不使用第三方 SSE 库（原生 API 足够）。

**Markdown 渲染**：`react-markdown`（仅渲染 assistant 消息，用户消息纯文本）。不引入代码高亮插件（out-of-scope 范围内保持简单）。

**自动滚动**：维护 `messagesEndRef`，每次 messages state 更新后 `scrollIntoView({ behavior: 'smooth' })`。

**消息 state 结构**：
```ts
interface Message {
  id: string          // uuid，前端生成
  role: 'user' | 'assistant'
  content: string     // streaming 期间逐步追加
  isStreaming?: boolean
}
```

**发送流程**：
1. 用户点击发送 → 追加 user message → 追加空 assistant message（`isStreaming: true`）
2. `fetch POST /api/chat/stream`（携带 Authorization Bearer token）
3. ReadableStream 逐 chunk 解析 → 追加 content → 滚动
4. Stream 结束 → `isStreaming: false` → 保存完整 assistant message

**路由**：`/chat` 纳入 `ProtectedRoute`，与 `/dashboard` 并列。

**导航**：Dashboard 侧边栏新增「AI 助手」入口（链接到 `/chat`）。

---

### 依赖变更

| 位置 | 新增依赖 | 版本 |
|------|---------|------|
| backend/requirements.txt | `httpx>=0.27` | async HTTP 客户端 |
| backend/requirements.txt | `sse-starlette>=2.1` | SSE 响应封装 |
| my-website/package.json | `react-markdown` | ^9.0 |

---

### 安全

- `DEEPSEEK_API_KEY` 从环境变量读取，不出现在代码或版本库中
- 每个 `/api/chat/stream` 请求均需有效 Bearer access token（复用 `get_current_user` 依赖）
- 对话历史按 `user_id` 严格隔离，用户只能读写自己的消息
