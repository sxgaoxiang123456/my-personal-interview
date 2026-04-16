## Why

StudyPal 当前 Dashboard 仅展示静态 mock 数据，缺乏交互式 AI 支持。添加 AI 学习助手对话页面，让用户可以基于自身学习记录与 DeepSeek 进行实时对话，获取个性化学习建议。

## What Changes

- 新增 `/chat` 路由，独立的 AI 对话页面（气泡式 ChatUI）
- 后端新增 `chat_messages` 表，持久化对话历史（按用户隔离）
- 后端新增流式 SSE 接口 `POST /api/chat/stream`，代理转发至 DeepSeek API
- 后端读取用户学习数据（`streak_days`、`level`）构造个性化系统 prompt
- 前端支持 Markdown 渲染（`react-markdown`）和自动滚动至最新消息
- `ProtectedRoute` 保护 `/chat` 路由（已有机制，无需改动）

## Capabilities

### New Capabilities

- `chat-ui`: 气泡式对话界面，用户输入框、发送、消息流式渲染、Markdown 支持、自动滚动
- `chat-history`: 对话历史持久化到后端数据库（`chat_messages` 表），页面加载时恢复历史
- `chat-stream`: 后端 SSE 流式响应，调用 DeepSeek API，注入用户学习数据构造 system prompt

### Modified Capabilities

- `auth-route-guard`: `/chat` 路由纳入 `ProtectedRoute` 保护（路由表新增一条，spec 行为无变化）

## Impact

- **后端**：`backend/models.py` 新增 `ChatMessage` 模型；`backend/routers/chat.py` 新路由；`requirements.txt` 新增 `httpx`（async DeepSeek 调用）、`sse-starlette`（SSE 支持）
- **前端**：`my-website/src/pages/ChatPage.tsx` 新页面；`package.json` 新增 `react-markdown`；`App.tsx` 新增 `/chat` 路由
- **环境变量**：后端需 `DEEPSEEK_API_KEY`，不硬编码
- **out-of-scope**：语音输入、文件上传、模型切换
