## ADDED Requirements

### Requirement: 用户可在对话页面发送消息并查看 AI 回复

`/chat` 页面 SHALL 提供气泡式对话界面：用户消息靠右、assistant 消息靠左；消息列表 SHALL 在新消息追加后自动平滑滚动至底部；输入框在流式响应进行中 SHALL 禁用发送按钮。

#### Scenario: 发送消息并接收流式回复

- **GIVEN** 用户已登录，位于 `/chat` 页面
- **WHEN** 用户在输入框输入消息并点击发送
- **THEN** 用户消息气泡立即出现；assistant 消息气泡同时出现并逐字实时填充；发送按钮在流式结束前保持禁用

#### Scenario: assistant 消息 Markdown 渲染

- **GIVEN** AI 回复包含 Markdown 语法（如 `**加粗**`、`# 标题`、`` `代码` ``）
- **WHEN** 流式传输完成
- **THEN** assistant 气泡内容 SHALL 以渲染后的 HTML 展示，而非原始 Markdown 字符串

#### Scenario: 自动滚动至最新消息

- **GIVEN** 对话历史超出可视区域
- **WHEN** 新消息追加或流式 chunk 到达
- **THEN** 页面 SHALL 平滑滚动至消息列表底部

---

### Requirement: `/chat` 路由受登录保护

`/chat` 路由 SHALL 嵌套在 `ProtectedRoute` 下；未登录用户访问 `/#/chat` 时 SHALL 重定向至 `/#/login`（携带 redirect 参数）。

#### Scenario: 未登录用户访问 /chat

- **GIVEN** 用户未登录（`accessToken` 为 null）
- **WHEN** 导航至 `/#/chat`
- **THEN** 重定向至 `/#/login?redirect=/chat`
