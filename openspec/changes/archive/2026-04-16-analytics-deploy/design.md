## Technical Decisions

### 数据源策略

**学习日历数据**：以 `chat_messages`（`role='user'`）的 `created_at` 日期聚合，按天统计消息数作为活跃度指标。这复用了已有表，无需用户主动打卡。同时新增 `study_sessions` 表，为未来支持手动记录学习时长预留扩展点（本期不写入，仅建表）。

**成就数据**：后端 `GET /api/analytics/achievements` 返回原始指标（`streak_days`、`level`、`total_messages`），成就解锁规则完全在前端 TypeScript 常量中定义，避免规则变更时需要迁移数据库。

---

### 后端架构

**新增路由 `backend/routers/analytics.py`**：

```
GET /api/analytics/calendar
  → 返回过去 84 天（12 周）每天的 user 消息数
  → 格式：[{ "date": "2026-04-01", "count": 5 }, ...]
  → SQL: GROUP BY DATE(created_at) WHERE user_id=? AND role='user' AND created_at >= 84天前

GET /api/analytics/achievements
  → 返回成就判定所需的原始指标
  → 格式：{ "streak_days": 7, "level": 2, "total_messages": 42 }
```

两个接口均复用 `get_current_user` 依赖，需要 Bearer token。

**新增模型 `StudySession`**（仅建表，本期不写入）：
```
study_sessions
  id          INTEGER PK
  user_id     INTEGER FK → users.id
  date        DATE (NOT NULL)
  duration_minutes INTEGER
  created_at  DATETIME
```

**Alembic 迁移**：`0003_create_study_sessions`

---

### 前端架构

**统一侧边栏 `AppSidebar`**：

```ts
// src/components/shared/AppSidebar.tsx
// 三个顶层路由导航项，使用 react-router-dom NavLink 判断 active
const NAV_ITEMS = [
  { to: '/analytics', label: '学习数据',    icon: '📊' },
  { to: '/chat',      label: 'AI 对话建议', icon: '💬' },
  { to: '/dashboard', label: '学习目标',    icon: '🎯' },
]
```

`NavLink` 的 `isActive` 自动处理高亮，不再需要 `activeSection` state + `onNavigate` callback。`DashboardPage` 和 `ChatPage` 均替换为 `<AppSidebar />`，删除各自内联的 aside 代码。

**学习日历 `LearningCalendar`**：

纯前端渲染 12×7 格的热力图网格（SVG 或 div grid）。颜色分 5 档（0 / 1-2 / 3-5 / 6-9 / 10+），对应 Tailwind 色阶（`bg-gray-100` → `bg-blue-200` → `bg-blue-400` → `bg-blue-600` → `bg-blue-800`）。数据来自 `GET /api/analytics/calendar`，前端将日期数组补齐为完整 84 天（缺失日期 count=0）。

**成就系统 `AchievementPanel`**：

前端静态定义成就规则：

```ts
const ACHIEVEMENTS = [
  { id: 'first-chat',   label: '初次对话',   condition: (m) => m.total_messages >= 1 },
  { id: 'streak-3',     label: '3天连续',     condition: (m) => m.streak_days >= 3  },
  { id: 'streak-7',     label: '一周坚持',   condition: (m) => m.streak_days >= 7  },
  { id: 'streak-30',    label: '月度达人',   condition: (m) => m.streak_days >= 30 },
  { id: 'level-2',      label: '进阶学习者', condition: (m) => m.level >= 2        },
  { id: 'level-5',      label: '学习达人',   condition: (m) => m.level >= 5        },
  { id: 'chatter-10',   label: '对话积极者', condition: (m) => m.total_messages >= 10 },
  { id: 'chatter-50',   label: '深度探索者', condition: (m) => m.total_messages >= 50 },
]
```

已解锁成就正常显示徽章；未解锁以灰色半透明展示（`opacity-40 grayscale`）。

**路由结构**：

```
App.tsx
  <ProtectedRoute>
    /analytics  → AnalyticsPage   ← NEW
    /dashboard  → DashboardPage
    /chat       → ChatPage
```

**`AnalyticsPage` 布局**：与 DashboardPage 相同的 `h-screen overflow-hidden` 结构，左侧 `AppSidebar`，右侧 `flex-1 overflow-y-auto` 内容区展示日历 + 成就。

---

### 依赖变更

无新增 npm 包（日历热力图用原生 Tailwind div grid 实现，不引入第三方组件）。

---

### 命名规范

| 层级 | 命名 |
|------|------|
| 路由 | `/analytics` |
| 页面组件 | `AnalyticsPage.tsx` |
| 侧边栏组件 | `AppSidebar.tsx`（放 `src/components/shared/`） |
| 日历组件 | `LearningCalendar.tsx`（放 `src/components/analytics/`） |
| 成就组件 | `AchievementPanel.tsx`（放 `src/components/analytics/`） |
| 后端路由 | `backend/routers/analytics.py` |
| DB 模型 | `StudySession`（表名 `study_sessions`） |
