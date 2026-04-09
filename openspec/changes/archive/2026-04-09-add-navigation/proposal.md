## Why

个人品牌站需要导航功能让访客快速跳转到不同内容区。固定顶部导航栏提供全局可达性，品牌标识强化记忆点，背景模糊效果提升视觉层次感。

## What Changes

- 新增固定顶部导航栏组件（`Navigation`）
- 左侧：品牌 Logo 或名字
- 右侧：导航链接「首页」「项目」「联系我」
- 链接点击后平滑滚动到对应 section
- 导航栏背景添加毛玻璃模糊效果（backdrop-blur）
- 导航栏支持暗色/亮色模式自适应

## Capabilities

### New Capabilities

- `navigation-bar`: 固定顶部导航栏，包含品牌展示、导航链接、毛玻璃背景效果

### Modified Capabilities

- 无

## Impact

- 新增 `src/components/Navigation.tsx` 组件
- App.tsx 需引入 Navigation 组件（位于 HeroSection 上方）
- 各 section 需对应添加 id：`#home`、`#projects`、`#contact`
- HeroSection 的锚点逻辑可能需要调整（已有 `#projects`，需确认其他 id）
