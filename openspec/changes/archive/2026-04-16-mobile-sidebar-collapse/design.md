## Context

`AppSidebar.tsx` 目前使用硬编码的 `w-60`（240px）固定宽度，没有任何响应式变体。三个内页（DashboardPage、AnalyticsPage、ChatPage）均使用 `<main className="... p-6">` 固定内边距。在 390px 移动端下，sidebar 占 62% 屏幕宽，内容区仅约 150px。

## Goals / Non-Goals

**Goals:**
- 移动端（< sm = 640px）sidebar 折叠为 `w-16`（64px），图标居中，文字隐藏
- Logo 折叠态显示 "SP"，展开态保持 "StudyPal"
- 三个内页内容区 padding 移动端缩减为 `p-3`，sm+ 保持 `p-6`

**Non-Goals:**
- PC 端（≥ sm）任何样式改动
- 手势滑动展开 / 动画过渡
- 路由、鉴权、后端链路改动

## 组件层级图

```
AppSidebar (修改)
├── <aside w-16 sm:w-60>
│   ├── Logo区  (h-16 border-b)
│   │   ├── "SP"  (sm:hidden)        ← 折叠态
│   │   └── "StudyPal" (hidden sm:block) ← 展开态
│   ├── <nav>
│   │   └── NavLink × 3
│   │       ├── <span> icon (始终显示，折叠态居中)
│   │       └── <span> label (hidden sm:inline)
│   └── Footer
│       ├── ← icon (始终显示)
│       └── "返回主页" (hidden sm:inline)

DashboardPage / AnalyticsPage / ChatPage (修改)
└── <main className="p-3 sm:p-6 ...">  ← 仅改 padding
```

## Decisions

### 决策一：用 Tailwind `sm:` 断点，不用 JS 状态控制

**选择**：纯 CSS 响应式，无 `useState`。  
**理由**：sidebar 折叠是纯视觉行为，不需要 JS 介入；Tailwind 的 `sm:` 前缀（≥ 640px 生效）覆盖目标场景（390px 手机 < 640px）。  
**备选**：JS `window.innerWidth` + state → 增加复杂度，无收益。

### 决策二：折叠后图标使用 `justify-center`，不是 `mx-auto`

**选择**：在折叠态 NavLink 上加 `justify-center sm:justify-start`。  
**理由**：`NavLink` 是 `flex` 容器，`justify-center` 在 icon-only 时居中图标；`sm:justify-start` 恢复展开态左对齐。

### 决策三：Logo 两态共存，不用条件渲染

**选择**：同时渲染 "SP" 和 "StudyPal"，用 `sm:hidden` / `hidden sm:block` 控制显隐。  
**理由**：避免引入 JS 逻辑，HTML 结构简单，SSR 友好。

### 决策四：内容区 padding 在各 Page 文件改，不在 AppSidebar 改

**选择**：`DashboardPage`、`AnalyticsPage`、`ChatPage` 各自的 `<main>` 加 `p-3 sm:p-6`。  
**理由**：padding 属于页面布局语义，不属于 sidebar 职责；AppSidebar 只管自身宽度。

## Risks / Trade-offs

- **[风险] 折叠态 tooltip 缺失**：icon-only 模式下用户可能不认识图标含义。→ 当前图标均为常见 emoji（📊💬🎯），可接受；后续可加 `title` 属性。
- **[权衡] `sm` 断点（640px）vs `md`（768px）**：选 `sm` 使平板（640-767px）也展示完整 sidebar，更合理。
