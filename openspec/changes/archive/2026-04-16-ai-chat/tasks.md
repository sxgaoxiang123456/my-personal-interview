## 1. 后端：数据库扩展

- [x] 1.1 在 `backend/models.py` 新增 `ChatMessage` ORM 模型（`id`、`user_id` FK→users、`role` VARCHAR、`content` TEXT、`created_at`）
- [x] 1.2 在 `backend/requirements.txt` 新增 `httpx>=0.27` 和 `sse-starlette>=2.1`
- [x] 1.3 生成 Alembic 迁移 `0002_create_chat_messages`，运行 `alembic upgrade head`
- [x] 1.4 验证：`chat_messages` 表结构正确，`ix_chat_messages_user_id` 索引存在

## 2. 后端：Chat 路由

- [x] 2.1 创建 `backend/routers/chat.py`：`GET /api/chat/messages`（返回当前用户最近 50 条消息，按 created_at 升序）
- [x] 2.2 在 `backend/routers/chat.py` 实现 `POST /api/chat/stream`：
  - 从环境变量读取 `DEEPSEEK_API_KEY`（启动时校验，缺失则 `ValueError`）
  - 先将 user message 写入 `chat_messages`
  - 构造包含用户 `streak_days`、`level` 的 system prompt
  - 携带最近 20 条历史，调用 DeepSeek API（`httpx.AsyncClient`，`stream=True`）
  - 用 `EventSourceResponse` 逐 chunk 推送 `{"delta": "<text>"}`，结束时推送 `[DONE]`
  - 流结束后将完整 assistant 回复写入 `chat_messages`
  - DeepSeek 返回非 200 时响应 `502`
- [x] 2.3 在 `backend/main.py` 挂载 `chat.router`（prefix `/api`）
- [x] 2.4 验证：`curl` 测试流式接口输出正确 SSE 格式

## 3. 前端：依赖与路由

- [x] 3.1 在 `my-website/` 目录下安装 `react-markdown`（`npm install react-markdown`）
- [x] 3.2 在 `my-website/src/App.tsx` 新增 `Route path="/chat"` → `ChatPage`，嵌套在 `ProtectedRoute` 下

## 4. 前端：ChatPage 实现

- [x] 4.1 新建 `my-website/src/pages/ChatPage.tsx`：
  - 页面挂载时调用 `GET /api/chat/messages` 加载历史，渲染到消息列表
  - 维护 `messages: Message[]` state（`{ id, role, content, isStreaming? }`）
  - 维护 `messagesEndRef`，每次 messages 更新后 `scrollIntoView({ behavior: 'smooth' })`
- [x] 4.2 实现发送逻辑：
  - 追加 user 气泡 → 追加空 assistant 气泡（`isStreaming: true`）→ 禁用发送按钮
  - `fetch POST /api/chat/stream`，携带 Authorization Bearer token
  - 用 `ReadableStream` 逐 chunk 解析 `data: {"delta": "..."}` 行，追加到 assistant content
  - 收到 `[DONE]` 后将 `isStreaming` 置 false，恢复发送按钮
- [x] 4.3 样式：用户气泡靠右（`bg-blue-600 text-white`）；assistant 气泡靠左（白底/dark gray）；assistant 气泡内容用 `<ReactMarkdown>` 渲染；支持暗色模式
- [x] 4.4 在 Dashboard 侧边栏新增「AI 助手」导航链接（`Link to="/chat"`）

## 5. 集成验收

- [x] 5.1 TypeScript 编译零错误（`tsc --noEmit`），`npm run build` 成功
- [x] 5.2 端到端验证：登录 → 访问 `/chat` → 发送消息 → 流式回复正常渲染 → 刷新页面历史恢复
- [x] 5.3 验证 `/chat` 路由守卫：未登录访问 `/#/chat` 重定向至 `/#/login`（与 /dashboard 同一 ProtectedRoute）
- [x] 5.4 `backend/README.md` 新增 `DEEPSEEK_API_KEY` 环境变量说明
