## Context

个人品牌站需要 Hero Section 作为第一印象。技术栈已确定（React 19 + Vite 7 + Tailwind CSS v4）。Hero 需要全屏显示、居中内容、科技感视觉风格（渐变 + 粒子），并支持暗色模式。

## Goals / Non-Goals

**Goals:**
- 全屏 Hero Section，视觉占满首屏
- 居中显示名字（h1）、职业、一句自我介绍
- CTA 按钮「查看我的项目」，点击平滑滚动到 `#projects`
- CSS 渐变背景层 + Canvas 粒子叠加层
- 亮色/暗色模式自适应

**Non-Goals:**
- 不做动画效果（用户明确排除）
- 不做导航栏
- 不做后端 API

## Decisions

### 1. 粒子实现：手写 Canvas 而非库

**Decision**: 使用原生 Canvas API 实现粒子系统，不引入 tsparticles 等库

**Rationale**:
- 用户明确不做「动画效果」，轻量 Canvas 更可控
- 粒子仅作背景装饰，不需要复杂物理引擎
- 减少依赖，提升首屏加载性能

**Alternatives**:
- `tsparticles`: 功能强大但 bundle 大（约 50kb+），违背性能目标
- CSS 渐变 alone: 用户要求「动态粒子风」，纯 CSS 不足以表达

### 2. 暗色模式：Tailwind dark: 前缀 + CSS 变量

**Decision**: 使用 Tailwind 的 `dark:` 变体 + CSS 自定义属性管理主题色

**Rationale**:
- Tailwind v4 原生支持 `dark:` 变体，配置简单
- 粒子颜色通过 CSS 变量控制，便于统一管理亮/暗主题
- 背景渐变色也可以通过 `dark:` 前缀切换

**Implementation**:
```css
/* index.css */
@theme {
  --color-bg-light: #ffffff;
  --color-bg-dark: #0f172a;
  --color-particle-light: rgba(59, 130, 246, 0.5);
  --color-particle-dark: rgba(56, 189, 248, 0.4);
}
```

### 3. 背景层叠顺序

```
z-index: 0  ← 渐变背景层（CSS background）
z-index: 1  ← 粒子 Canvas 层（position: absolute, full coverage）
z-index: 2  ← 内容层（z-10 relative）
```

### 4. 主题切换机制

**Decision**: 使用 React Context 管理主题状态，通过 `class="dark"` 切换

```tsx
// ThemeProvider wraps app
// ParticleCanvas reads document.body.classList.contains('dark') for colors
```

**Rationale**:
- Tailwind 的 `dark:` 变体需要 `html` 或 `body` 有 `dark` class
- 避免 Tailwind 4 兼容性问题的最小改动方案

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Canvas 粒子在低端设备卡顿 | 检测 `prefers-reduced-motion`，粒子静态或禁用 |
| 渐变 + 粒子影响首屏性能 | Canvas 懒加载，渐变使用纯 CSS（GPU 加速） |
| CTA 跳转目标不存在 | 目前加 `href="#projects"` + console.warn 提示 |

## Open Questions

- **文字内容**：名字、职业、介绍语的具体文案未确定 → 待用户补充
- **字体选择**：中文衬线 vs 无衬线？待定
