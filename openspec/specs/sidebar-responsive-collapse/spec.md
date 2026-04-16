# sidebar-responsive-collapse Specification

## Purpose

AppSidebar 在移动端（视口宽度 < sm / 640px）自动折叠为 icon-only 模式，释放内容区空间；PC 端（≥ 640px）保持完整展开态。内容页 padding 同步缩减以适配移动端布局。

## Requirements

### Requirement: 移动端 sidebar 折叠为 icon-only

在视口宽度 < sm（640px）时，AppSidebar SHALL 折叠为 64px 宽度，所有文字标签隐藏，仅显示图标。

#### Scenario: 移动端 sidebar 宽度折叠

- **WHEN** 视口宽度 < 640px
- **THEN** sidebar 宽度 SHALL 为 64px（`w-16`），不展示任何文字标签

#### Scenario: PC 端 sidebar 保持完整展开

- **WHEN** 视口宽度 ≥ 640px
- **THEN** sidebar 宽度 SHALL 为 240px（`w-60`），文字标签正常显示

#### Scenario: 折叠态导航图标居中对齐

- **WHEN** 视口宽度 < 640px
- **THEN** 三个导航项的 emoji 图标 SHALL 在 sidebar 内水平居中显示

---

### Requirement: 移动端 Logo 显示缩写

在折叠态下，Logo 区域 SHALL 显示缩写 "SP" 替代完整品牌名 "StudyPal"。

#### Scenario: 折叠态显示 "SP"

- **WHEN** 视口宽度 < 640px
- **THEN** Logo 区域 SHALL 显示 "SP"，"StudyPal" 文字隐藏

#### Scenario: 展开态显示 "StudyPal"

- **WHEN** 视口宽度 ≥ 640px
- **THEN** Logo 区域 SHALL 显示 "StudyPal"，"SP" 文字隐藏

---

### Requirement: 移动端内容区 padding 缩减

在视口宽度 < sm（640px）时，各内页（Dashboard、Analytics、Chat）的内容主区域 SHALL 使用较小的内边距以释放可用空间。

#### Scenario: 移动端内容区 padding

- **WHEN** 视口宽度 < 640px
- **THEN** 内容主区域 padding SHALL 为 12px（`p-3`）

#### Scenario: PC 端内容区 padding 不变

- **WHEN** 视口宽度 ≥ 640px
- **THEN** 内容主区域 padding SHALL 保持 24px（`p-6`）
