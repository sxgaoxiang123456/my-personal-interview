## Context

个人品牌站需要项目展示区。项目区以卡片网格形式展示过往项目，提供截图、名称、见解和 GitHub 链接。悬浮时卡片有微特效增强交互体验。

## Goals / Non-Goals

**Goals:**
- 项目展示区位于 Hero Section 下方
- 响应式卡片网格布局（PC 端多列，移动端单列）
- 每个卡片包含：截图、名称、见解、GitHub 链接
- 最少 4 个项目卡片
- 悬浮微特效（scale + shadow）
- 暗色模式支持
- 图片使用 lazy loading

**Non-Goals:**
- 不做项目详情页
- 不做项目搜索功能

## Decisions

### 1. 组件拆分

**Decision**: 拆分为 `ProjectSection`（容器）和 `ProjectCard`（单个卡片）

**Rationale**:
- 单一职责原则：Section 负责布局/数据，Card 负责单个项目展示
- 便于后续扩展和复用
- 符合 React 组件设计最佳实践

### 2. 卡片布局策略

**Decision**: 使用 CSS Grid 实现响应式网格

**Rationale**:
- `grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))` 自动适配
- PC 端多列，移动端自动降为单列
- 卡片等高对齐

**Alternatives**:
- Flexbox 布局: 需要计算宽度，不够灵活
- 纯 CSS columns: 顺序不可控

### 3. 悬浮微特效

**Decision**: 使用 Tailwind `hover:scale-105 hover:shadow-xl transition-all duration-300`

**Rationale**:
- 简洁直观，一行 class 实现
- `scale-105` 轻微放大，不过分
- `shadow-xl` 阴影加深，增加立体感
- `duration-300` 平滑过渡

### 4. 图片处理

**Decision**: 使用 `loading="lazy"` + `aspect-video` 保持比例

**Rationale**:
- 符合项目性能要求（首屏 < 2s + lazy loading）
- `aspect-video` (16:9) 统一截图比例
- object-cover 防止图片变形

### 5. GitHub 链接

**Decision**: 使用 SVG 图标 + 悬浮显示

**Implementation**:
```tsx
<a href={githubUrl} target="_blank" rel="noopener noreferrer">
  <svg className="w-6 h-6 hover:text-blue-500 transition-colors">
    {/* GitHub icon path */}
  </svg>
</a>
```

### 6. 数据结构

**Decision**: 使用 TypeScript 接口定义项目数据

```ts
interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  githubUrl: string
}
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 项目截图失真变形 | 使用 `object-cover` + 统一 `aspect-video` 比例 |
| GitHub 图标在暗色模式不可见 | 使用 `hover:text-blue-500` + 适当默认颜色 |
| 图片加载慢影响性能 | `loading="lazy"` 懒加载 |
| 4 个占位项目数据不真实 | 使用 `https://picsum.photos` 占位图 |

## Open Questions

- **项目数据**: 4 个项目的具体内容（截图、名称、见解、GitHub 链接）待用户提供
- **布局细节**: 卡片之间的间距、section 的 padding 待定
