## Why

StudyPal 当前 Dashboard 仅展示静态 mock 数据，缺乏基于真实用户行为的学习统计视图。添加学习数据分析面板，提供学习日历热力图与成就系统，让用户直观感受学习积累；同步重构导航结构，将「学习数据」「AI 对话建议」「学习目标」作为顶层入口统一呈现。

## What Changes

- 新增 `/analytics` 路由，承载学习日历热力图和成就徽章面板
- 后端新增 `GET /api/analytics/calendar`（按日聚合 chat_messages 活跃度）和 `GET /api/analytics/achievements`（基于 streak_days / level 计算成就）
- 后端新增 `study_sessions` 表，记录每次主动学习行为，作为日历热力图的数据源
- 重构左侧导航栏为三个顶层路由入口：**学习数据**（`/analytics`）、**AI 对话建议**（`/chat`）、**学习目标**（`/dashboard`）
- 提取共用 `AppSidebar` 组件，替换现有 `DashboardSidebar` 和 `ChatPage` 内的各自独立侧边栏

## Capabilities

### New Capabilities

- `learning-calendar`: 学习日历热力图组件，展示过去 12 周的每日学习活跃度（以 chat_messages 发送数量聚合），颜色深浅表示活跃程度
- `achievement-system`: 成就徽章面板，基于 `streak_days`、`level`、消息总数等指标解锁预设成就，前端静态规则判定，后端返回原始指标数据
- `analytics-backend`: FastAPI 聚合接口，返回日历热力图数据和成就所需指标，所有计算在数据库层完成
- `app-sidebar`: 提取统一侧边栏组件（`AppSidebar`），支持路由级别的三个顶层导航项，取代现有页面各自内联的侧边栏实现

### Modified Capabilities

- `dashboard-layout`: 导航结构从「概览 / 每日目标 / 学习进度 / AI 建议」重构为「学习数据 / AI 对话建议 / 学习目标」三项顶层路由入口

## Impact

- **后端**：`backend/models.py` 新增 `StudySession` 模型；`backend/routers/analytics.py` 新路由；Alembic 迁移 `0003_create_study_sessions`
- **前端**：新增 `src/pages/AnalyticsPage.tsx`；新增 `src/components/shared/AppSidebar.tsx`；`DashboardPage` 和 `ChatPage` 替换为共用侧边栏；`App.tsx` 新增 `/analytics` 路由
- **out-of-scope**：实时通知、数据导出
