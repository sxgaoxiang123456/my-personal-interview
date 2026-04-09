## Why

个人品牌站需要一个强有力的第一印象。Hero Section 是访客看到的第一屏内容，需要快速传达个人身份、专业领域和核心价值，同时通过视觉风格（科技感渐变 + 粒子动效）建立品牌调性。

## What Changes

- 新增全屏 Hero Section 组件（`HeroSection`）
- Hero 区域包含：名字（h1）、职业、 一句话自我介绍
- CTA 按钮「查看我的项目」，锚点跳转到 `#projects` 区域
- 背景层：CSS 渐变底 + Canvas 粒子叠加
- 支持亮色/暗色模式主题切换

## Capabilities

### New Capabilities

- `hero-section`: 全屏 Hero 区域，包含身份展示、CTA 按钮、科技感背景

## Impact

- 新增 `src/components/HeroSection.tsx` 组件
- 新增 `src/components/ParticleCanvas.tsx` Canvas 粒子组件
- 需确保暗色模式下粒子/渐变颜色正确适配
- CTA 按钮依赖 `#projects` section 存在（目前不存在，需后续实现）
