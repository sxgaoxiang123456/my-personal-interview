## ADDED Requirements

### Requirement: Hero Section 全屏布局
Hero Section SHALL 占满整个视口高度（100vh），内容垂直水平居中。

#### Scenario: 视口高度填充
- **WHEN** 用户打开首页
- **THEN** Hero Section 高度等于浏览器视口高度，底部无滚动条（内容撑满一屏）

#### Scenario: 内容居中显示
- **WHEN** Hero Section 渲染
- **THEN** 名字、职业、介绍语、CTA 按钮垂直水平居中

---

### Requirement: Hero Section 身份信息展示
Hero Section SHALL 显示名字（h1）、职业、一句话自我介绍。

#### Scenario: 正常显示身份信息
- **WHEN** Hero Section 渲染
- **THEN** 显示名字（大字 h1）、职业（次级文字）、一句介绍

#### Scenario: 身份信息内容为空
- **WHEN** 名字或职业 prop 未传入
- **THEN** 显示占位文字 "Your Name" / "Your Title"（不应崩溃）

---

### Requirement: CTA 按钮跳转
CTA 按钮 SHALL 点击后平滑滚动到 `#projects` 区域。

#### Scenario: 点击 CTA 按钮
- **WHEN** 用户点击「查看我的项目」按钮
- **THEN** 页面平滑滚动到 `#projects` section

#### Scenario: 目标 section 不存在
- **WHEN** 点击 CTA 时 `#projects` 不存在
- **THEN** 页面不跳转，按钮表现正常（不报 JS 错误）

---

### Requirement: 科技感背景层
Hero Section SHALL 有 CSS 渐变背景 + Canvas 粒子叠加。

#### Scenario: 亮色模式渐变背景
- **WHEN** 亮色模式下渲染 Hero
- **THEN** 显示浅色系科技感渐变背景（如蓝紫渐变）

#### Scenario: 暗色模式渐变背景
- **WHEN** 暗色模式下渲染 Hero
- **THEN** 显示深色系渐变背景（如深蓝/深紫）

#### Scenario: Canvas 粒子渲染
- **WHEN** Hero Section 渲染
- **THEN** Canvas 层绘制粒子点阵，粒子有轻微透明度

#### Scenario: 暗色模式粒子颜色
- **WHEN** 暗色模式时
- **THEN** 粒子颜色为浅色系亮色（如浅蓝/青色），与暗色背景形成对比

#### Scenario: 低性能设备粒子降级
- **WHEN** 设备设置 `prefers-reduced-motion: reduce`
- **THEN** Canvas 粒子静态显示或完全禁用

---

### Requirement: 暗色/亮色模式切换
Hero Section SHALL 支持亮色/暗色主题切换，背景和粒子颜色随之变化。

#### Scenario: 主题从亮变暗
- **WHEN** 主题从亮色切换到暗色
- **THEN** Hero 背景渐变和粒子颜色立即更新为暗色系

#### Scenario: 主题从暗变亮
- **WHEN** 主题从暗色切换到亮色
- **THEN** Hero 背景渐变和粒子颜色立即更新为亮色系
