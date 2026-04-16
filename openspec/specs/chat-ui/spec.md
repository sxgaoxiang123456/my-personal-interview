# chat-ui Specification

## Purpose

定义 AI 对话页面（`/chat`）的界面行为规范，包括固定侧边栏与标题栏布局、气泡式对话区、GFM Markdown 渲染、流式逐字填充、自动滚动及路由保护。

## Requirements

### Requirement: 页面布局固定侧边栏与标题栏，仅消息区域滚动

`/chat` 页面 SHALL 锁定在视口高度内（`h-screen overflow-hidden`）；左侧导航栏与顶部标题栏 SHALL 始终固定可见，不随内容滚动；仅中间消息列表区域 SHALL 独立滚动（`flex-1 overflow-y-auto`）。

实现约束：
- 外层容器：`h-screen overflow-hidden`（禁止整页滚动）
- 侧边栏：`h-full`（撑满视口高度，不超出）
- 右侧列：`flex-1 flex flex-col min-h-0`（`min-h-0` 是使 flex 子项 overflow 生效的必要条件）
- 消息主体：`flex-1 overflow-y-auto`

#### Scenario: 侧边栏与标题栏在滚动时保持固定

- **GIVEN** 对话历史超出屏幕高度
- **WHEN** 用户在消息区域向上滚动查看历史
- **THEN** 左侧导航栏与顶部标题栏 SHALL 保持在原位不移动；仅消息列表内部滚动

---

### Requirement: 用户可在对话页面发送消息并查看 AI 回复

`/chat` 页面 SHALL 提供气泡式对话界面：用户消息靠右、assistant 消息靠左；消息列表 SHALL 在新消息追加后自动平滑滚动至底部；输入框在流式响应进行中 SHALL 禁用发送按钮。

#### Scenario: 发送消息并接收流式回复

- **GIVEN** 用户已登录，位于 `/chat` 页面
- **WHEN** 用户在输入框输入消息并点击发送
- **THEN** 用户消息气泡立即出现；assistant 消息气泡同时出现并逐字实时填充；发送按钮在流式结束前保持禁用

#### Scenario: 自动滚动至最新消息

- **GIVEN** 对话历史超出可视区域
- **WHEN** 新消息追加或流式 chunk 到达
- **THEN** 页面 SHALL 平滑滚动至消息列表底部

---

### Requirement: assistant 消息支持 GFM Markdown 完整渲染

assistant 消息 SHALL 使用 `react-markdown` + `remark-gfm` 插件渲染，支持 GitHub Flavored Markdown 全集语法。用户消息 SHALL 以纯文本展示，不做 Markdown 解析。

实现约束：
- 渲染库：`react-markdown`（`remarkPlugins={[remarkGfm]}`）
- 样式：`@tailwindcss/typography` 提供的 `prose prose-sm dark:prose-invert` class
- GFM 扩展：通过 `remark-gfm` 支持表格、任务列表、删除线、自动链接

#### Scenario: 章节标题渲染

- **GIVEN** AI 回复包含 `# 标题`、`## 二级标题` 等语法
- **WHEN** 消息渲染
- **THEN** SHALL 渲染为对应层级的 HTML 标题元素，具备字号和粗细区分

#### Scenario: 有序/无序列表渲染

- **GIVEN** AI 回复包含 `1. 条目` 或 `- 条目` 语法
- **WHEN** 消息渲染
- **THEN** SHALL 渲染为带缩进的 `<ol>` 或 `<ul>` 列表，而非原始文本

#### Scenario: GFM 表格渲染

- **GIVEN** AI 回复包含 `| 列1 | 列2 |` 格式的 Markdown 表格
- **WHEN** 消息渲染
- **THEN** SHALL 渲染为 HTML `<table>`，表头行具备背景色区分；原始 `|` 字符 SHALL NOT 出现在页面上

#### Scenario: 代码块渲染

- **GIVEN** AI 回复包含 `` ```language\ncode\n``` `` 围栏代码块或 `` `inline code` `` 行内代码
- **WHEN** 消息渲染
- **THEN** 围栏代码块 SHALL 渲染为 `<pre><code>` 块，具备背景色与圆角；行内代码 SHALL 以 `<code>` 标签渲染，颜色与正文区分

#### Scenario: 暗色模式下 Markdown 样式正确

- **GIVEN** 用户启用暗色模式
- **WHEN** assistant 消息渲染 Markdown 内容
- **THEN** 标题、正文、代码块、表格 SHALL 使用暗色适配色（`dark:prose-invert` 及对应修饰类），不出现白底黑字突兀块

---

### Requirement: `/chat` 路由受登录保护

`/chat` 路由 SHALL 嵌套在 `ProtectedRoute` 下；未登录用户访问 `/#/chat` 时 SHALL 重定向至 `/#/login`（携带 redirect 参数）。

#### Scenario: 未登录用户访问 /chat

- **GIVEN** 用户未登录（`accessToken` 为 null）
- **WHEN** 导航至 `/#/chat`
- **THEN** 重定向至 `/#/login?redirect=/chat`
