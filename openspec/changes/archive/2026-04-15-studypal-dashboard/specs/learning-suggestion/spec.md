## ADDED Requirements

### Requirement: AI 建议学习面板展示 mock 推荐内容

Dashboard SHALL 渲染 AI 建议学习面板，从 `mockDashboard.ts` 加载静态建议列表。面板 SHALL 明确标注"AI 建议（演示）"以区分真实 AI 输出。每条建议 SHALL 包含：标题、描述、优先级标签（高/中/低）、预计时长。

#### Scenario: 建议列表正常渲染

- **WHEN** Dashboard 页面加载
- **THEN** 面板显示 mock 建议卡片列表，按优先级从高到低排列

#### Scenario: 优先级标签样式区分

- **WHEN** 渲染优先级标签
- **THEN** 高优先级显示红色标签，中优先级显示黄色，低优先级显示蓝色

#### Scenario: 面板标注演示状态

- **WHEN** 面板渲染
- **THEN** 面板标题旁 SHALL 显示"演示数据"角标或说明文字，不得误导用户认为这是真实 AI 输出
