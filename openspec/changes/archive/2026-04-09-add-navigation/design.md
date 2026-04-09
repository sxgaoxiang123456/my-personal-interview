## Context

个人品牌站需要顶部导航栏。技术栈已确定（React 19 + Tailwind CSS v4）。导航栏需要固定在顶部，支持暗色模式，具备毛玻璃背景效果。

## Goals / Non-Goals

**Goals:**
- 固定顶部导航栏（position: fixed）
- 左侧品牌展示（Logo 或名字）
- 右侧导航链接：首页、项目、联系我
- 点击链接平滑滚动到对应 section
- 毛玻璃背景模糊效果（backdrop-blur）
- 暗色/亮色模式自适应

**Non-Goals:**
- 不做搜索
- 不做多级下拉菜单
- 不做用户登录和注册

## Decisions

### 1. 导航栏定位策略

**Decision**: 使用 `position: fixed` + `top-0` + `w-full` 固定在顶部

**Rationale**:
- 固定定位确保导航始终可达
- 需设置 `padding-top` 防止内容被遮挡（HeroSection 从视口顶部开始）
- 或在 HeroSection 添加足够的 top padding

**Implementation**:
```tsx
<nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md ...">
```

### 2. 毛玻璃背景效果

**Decision**: 使用 Tailwind 的 `backdrop-blur-md` 实现毛玻璃效果

**Rationale**:
- Tailwind v4 原生支持 `backdrop-blur` 系列class
- 配合半透明背景色 `bg-white/80 dark:bg-slate-900/80` 效果最佳
- 不影响下方内容滚动

**Alternatives**:
- CSS `backdrop-filter: blur()`: 需要自定义 CSS，不如 Tailwind class 简洁
- 纯色背景: 缺少毛玻璃的层次感

### 3. 导航链接结构

**Decision**: 使用 `<ul>` + `<li>` + `<a>` 语义化结构

**Rationale**:
- 语义化 HTML 有利于无障碍访问（screen reader）
- 每个链接对应一个 section id
- 使用 `scrollIntoView({ behavior: 'smooth' })` 实现平滑滚动

**链接配置**:
```ts
const navLinks = [
  { label: '首页', href: '#home' },
  { label: '项目', href: '#projects' },
  { label: '联系我', href: '#contact' },
]
```

### 4. 暗色模式适配

**Decision**: 沿用 HeroSection 的 class-based 模式（`document.documentElement.classList.contains('dark')`）

**Rationale**:
- 与现有 HeroSection 保持一致
- 背景色使用 `bg-white/80 dark:bg-slate-900/80`
- 文字色使用 `text-gray-700 dark:text-gray-200`

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 固定导航遮挡 Hero 内容 | HeroSection 添加 `pt-16` 或 Navigation 用 `h-16` |
| 毛玻璃在低端设备性能差 | `prefers-reduced-motion` 时简化背景效果 |
| 暗色模式下列表项对比度不足 | 使用足够对比度的灰色系文字 |

## Open Questions

- **品牌 Logo**: 是否有现成的 Logo 图片？目前使用文字「高翔」
- **联系方式 section**: 「联系我」跳转到 `#contact`，该 section 尚未创建
