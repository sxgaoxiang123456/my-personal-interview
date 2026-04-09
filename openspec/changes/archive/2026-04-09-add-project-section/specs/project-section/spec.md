## ADDED Requirements

### Requirement: 项目展示区布局
项目展示区 SHALL 使用响应式卡片网格布局。

#### Scenario: PC端显示多列卡片
- **WHEN** 在桌面端（>= 768px）渲染项目区
- **THEN** 卡片以多列网格形式展示，每行至少 2 列

#### Scenario: 移动端显示单列卡片
- **WHEN** 在移动端（< 768px）渲染项目区
- **THEN** 卡片以单列形式垂直排列

---

### Requirement: 项目卡片内容
每个项目卡片 SHALL 包含截图、名称、见解和 GitHub 链接。

#### Scenario: 卡片内容完整
- **WHEN** 项目卡片渲染
- **THEN** 显示项目截图、项目名称、项目见解（简述）、GitHub 链接图标

#### Scenario: GitHub 链接点击
- **WHEN** 用户点击 GitHub 链接图标
- **THEN** 在新标签页打开 GitHub 仓库页面

#### Scenario: 项目数据为空
- **WHEN** 项目数据未传入或数据不完整
- **THEN** 卡片显示占位内容，不应崩溃

---

### Requirement: 卡片悬浮微特效
鼠标悬浮在项目卡片上时 SHALL 有微特效。

#### Scenario: 悬浮时卡片放大
- **WHEN** 用户鼠标悬浮在项目卡片上
- **THEN** 卡片轻微放大（scale 约 1.05）并增加阴影

#### Scenario: 悬浮时 GitHub 图标变色
- **WHEN** 用户鼠标悬浮在 GitHub 图标上
- **THEN** 图标颜色变为蓝色或其他高亮色

#### Scenario: 鼠标移出恢复原状
- **WHEN** 用户鼠标离开项目卡片
- **THEN** 卡片恢复原始大小和阴影

---

### Requirement: 暗色模式支持
项目展示区 SHALL 支持暗色模式。

#### Scenario: 亮色模式卡片样式
- **WHEN** 亮色模式下渲染项目区
- **THEN** 卡片背景为白色，文字为深色，阴影适当

#### Scenario: 暗色模式卡片样式
- **WHEN** 暗色模式下渲染项目区
- **THEN** 卡片背景为深灰色，文字为浅色，对比度足够

---

### Requirement: 图片懒加载
项目截图 SHALL 使用懒加载。

#### Scenario: 图片懒加载生效
- **WHEN** 项目卡片渲染在视口外
- **THEN** 图片不立即加载，待滚动到可视区域再加载

#### Scenario: 图片加载失败
- **WHEN** 项目图片 URL 无效或加载失败
- **THEN** 显示占位图或默认背景色，不显示破图
