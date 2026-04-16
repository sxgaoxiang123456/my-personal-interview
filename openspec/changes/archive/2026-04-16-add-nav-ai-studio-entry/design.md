## Context

`Navigation.tsx` 目前使用 `NAV_LINKS` 数组管理纯锚点链接，通过 `handleNavClick` + `scrollIntoView` 实现页内平滑滚动。导航栏没有任何路由级别的跳转能力。

`AuthContext` 已提供 `useAuth()` hook，暴露 `accessToken`（null 表示未登录）。`ProtectedRoute` 已实现 `?redirect=` 参数回跳，即未登录时跳转 `/login?redirect=/dashboard`，登录后自动回跳 `/dashboard`。`react-router-dom` 已安装并在 `App.tsx` 中配置。

## Goals / Non-Goals

**Goals:**
- 在导航栏新增 "AI学习站" CTA 按钮，视觉上与锚点链接明显区分
- PC 端：按钮排列在现有链接右侧；移动端：按钮嵌入汉堡菜单底部，独立一行
- 点击时根据登录状态路由到正确页面，复用现有 auth redirect 机制

**Non-Goals:**
- 不修改现有锚点导航逻辑
- 不修改 `AuthContext`、`ProtectedRoute` 或任何路由配置
- 不新增组件文件，修改仅限 `Navigation.tsx`

## Decisions

### 决策一：修改 Navigation.tsx，不新建组件

**选择**：直接在 `Navigation.tsx` 内新增 CTA 按钮逻辑。  
**理由**：改动仅涉及单一文件，CTA 与导航本身强耦合，独立组件会引入不必要的 props 传递。  
**备选**：拆出 `NavCTAButton.tsx`——过度拆分，当前复杂度不值得。

### 决策二：使用 useNavigate 而非 window.location

**选择**：引入 `useNavigate` hook 处理路由跳转。  
**理由**：与 `react-router-dom` 一致，保持 SPA 内无刷新跳转体验，且 `ProtectedRoute` 的 `redirect` 参数逻辑基于 router state。  
**备选**：`window.location.href`——会触发页面刷新，丢失 SPA 体验。

### 决策三：CTA 样式明显区分于普通链接

**选择**：使用 filled 渐变按钮样式（`bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1.5 rounded-full`），与普通文字链接形成对比。  
**理由**：符合"CTA 需要视觉权重"的 UI 原则，同时与整站蓝色调一致。

### 决策四：移动端按钮放入汉堡菜单

**选择**：在移动端下拉菜单列表底部单独渲染 CTA 按钮，与锚点链接之间加分隔线区分。  
**理由**：移动端屏幕宽度有限，不适合在 nav bar 顶部并排展示，放入菜单保持一致的信息架构。

## 组件层级图

```
Navigation.tsx
├── <nav>
│   ├── Brand link (高翔)
│   ├── PC 端区域 (hidden md:flex)
│   │   ├── NAV_LINKS (锚点链接)
│   │   └── [NEW] CTA Button → useNavigate('/dashboard' | '/login?redirect=/dashboard')
│   └── 移动端汉堡按钮 (md:hidden)
│
└── 移动端下拉菜单 (isOpen && md:hidden)
    ├── NAV_LINKS (锚点链接)
    ├── [NEW] <hr> 分隔线
    └── [NEW] CTA Button (full-width style)
```

## Risks / Trade-offs

- **[风险] AuthContext 加载中闪烁**：页面初始化时 `accessToken` 可能尚未从 refresh 中恢复（`isLoading: true`），按钮会短暂指向 `/login` 而非 `/dashboard`。→ **缓解**：`isLoading` 期间按钮正常显示（不 disable），跳转 `/login` 后 `ProtectedRoute` 已处理 `isLoading` 状态，用户最终仍会正确落到 `/dashboard`，影响极低。
- **[权衡] 直接写入 Navigation.tsx 而非组件化**：若未来需要在多处复用 CTA 逻辑，需提取。当前仅一处，不提前抽象。
