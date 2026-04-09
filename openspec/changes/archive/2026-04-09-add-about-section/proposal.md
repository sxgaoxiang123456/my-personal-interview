## Why

个人品牌站需要一个「关于我」区域，让访客更深入地了解个人的背景、技能和价值观。通过照片和文字介绍，建立信任感和亲近感。

## What Changes

- 新增「关于我」区域组件（`AboutSection`）
- 左侧：个人照片
- 右侧：个人简介（3段文字）
- 下方：品牌标签「George AI」

## Capabilities

### New Capabilities

- `about-section`: 「关于我」展示区，包含照片、个人简介和品牌标签

### Modified Capabilities

- 无

## Impact

- 新增 `src/components/AboutSection.tsx` 组件
- App.tsx 中 `#contact` section 之前插入 `AboutSection`
- 照片使用占位图片，待用户提供真实照片
