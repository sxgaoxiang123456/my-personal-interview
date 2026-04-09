## ADDED Requirements

### Requirement: 关于我区域布局
「关于我」区域 SHALL 使用左右分栏布局（PC端）或上下堆叠（移动端）。

#### Scenario: PC端左右分栏
- **WHEN** 在桌面端（>= 768px）渲染「关于我」区域
- **THEN** 左侧显示照片，右侧显示个人简介

#### Scenario: 移动端上下堆叠
- **WHEN** 在移动端（< 768px）渲染「关于我」区域
- **THEN** 照片在上，简介在下，垂直堆叠

---

### Requirement: 照片展示
左侧 SHALL 展示个人照片。

#### Scenario: 照片正常显示
- **WHEN** 照片加载成功
- **THEN** 显示正方形/圆形照片，比例不变形

#### Scenario: 照片加载失败
- **WHEN** 照片 URL 无效或加载失败
- **THEN** 显示占位图或默认头像，不显示破图

---

### Requirement: 个人简介内容
右侧 SHALL 显示 3 段个人简介文字。

#### Scenario: 简介内容完整
- **WHEN** 「关于我」区域渲染
- **THEN** 显示 3 段个人简介文字

#### Scenario: 简介内容为空
- **WHEN** 简介内容未传入
- **THEN** 显示占位文字，不应崩溃

---

### Requirement: 品牌标签展示
下方 SHALL 显示品牌标签「George AI」。

#### Scenario: 品牌标签显示
- **WHEN** 「关于我」区域渲染
- **THEN** 在简介下方显示「George AI」标签

---

### Requirement: 暗色模式支持
「关于我」区域 SHALL 支持暗色模式。

#### Scenario: 亮色模式样式
- **WHEN** 亮色模式下渲染「关于我」区域
- **THEN** 背景为白色，文字为深色

#### Scenario: 暗色模式样式
- **WHEN** 暗色模式下渲染「关于我」区域
- **THEN** 背景为深灰色，文字为浅色
