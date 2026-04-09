## Why

个人品牌站需要展示过往项目，让访客快速了解技术能力和项目经验。项目展示区以卡片形式呈现，包含截图、名称、见解和 GitHub 链接，提供丰富的视觉和交互体验。

## What Changes

- 新增项目展示区组件（`ProjectSection`）
- 卡片式布局，每个卡片包含：
  - 项目截图（图片区域）
  - 项目名称
  - 项目见解（简述）
  - GitHub 链接图标
- 最少展示 4 个项目卡片
- 鼠标悬浮时卡片有微特效（如 scale、shadow 提升）
- Hero Section 的 CTA 按钮锚点从占位改为跳转到此项目区（已有 #projects）

## Capabilities

### New Capabilities

- `project-section`: 项目展示区，包含卡片网格、截图、名称、见解、GitHub 链接、悬浮微特效

### Modified Capabilities

- `hero-section`: Hero CTA 按钮锚点跳转到 #projects（之前是占位 section，现在指向实际项目区）

## Impact

- 新增 `src/components/ProjectSection.tsx` 组件
- 新增 `src/components/ProjectCard.tsx` 项目卡片组件
- `App.tsx` 中 `#projects` section 从占位替换为实际 `ProjectSection` 组件
- 4 个项目数据需提供（截图、名称、见解、GitHub 链接）— 使用占位图片/数据，待用户替换
