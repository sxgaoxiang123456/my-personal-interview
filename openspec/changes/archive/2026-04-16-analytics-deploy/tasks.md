## 1. 后端：数据库扩展

- [x] 1.1 在 `backend/models.py` 新增 `StudySession` 模型（`id`、`user_id` FK→users、`date` DATE、`duration_minutes` INTEGER、`created_at`）
- [x] 1.2 生成 Alembic 迁移 `0003_create_study_sessions`，运行 `alembic upgrade head`
- [x] 1.3 验证：`study_sessions` 表结构正确

## 2. 后端：Analytics 路由

- [x] 2.1 创建 `backend/routers/analytics.py`：实现 `GET /api/analytics/calendar`
  - 查询当前用户过去 84 天内 `chat_messages`（`role='user'`）按日期聚合
  - 返回 `[{"date": "YYYY-MM-DD", "count": int}]`（仅 count > 0 的日期，按日升序）
- [x] 2.2 在 `backend/routers/analytics.py` 实现 `GET /api/analytics/achievements`
  - 返回 `{ "streak_days": int, "level": int, "total_messages": int }`
  - `total_messages` 为该用户 `chat_messages` 中 `role='user'` 的总条数
- [x] 2.3 在 `backend/main.py` 挂载 `analytics.router`（prefix `/api`）
- [x] 2.4 验证：两个接口返回格式正确，401 鉴权生效

## 3. 前端：统一侧边栏

- [x] 3.1 新建 `my-website/src/components/shared/AppSidebar.tsx`：
  - 三个 `NavLink`（`/analytics`、`/chat`、`/dashboard`），`isActive` 自动高亮
  - 保留底部「返回主页」链接
  - 布局与现有侧边栏一致（`w-60 h-full flex flex-col`）
- [x] 3.2 修改 `my-website/src/pages/DashboardPage.tsx`：删除内联 `DashboardSidebar`，替换为 `<AppSidebar />`；移除 `activeSection` state 和 `onNavigate` 逻辑；`main` 区域改为直接渲染所有内容（无 section 切换）
- [x] 3.3 修改 `my-website/src/pages/ChatPage.tsx`：删除内联 aside，替换为 `<AppSidebar />`
- [x] 3.4 删除 `my-website/src/components/dashboard/DashboardSidebar.tsx`（已无引用）

## 4. 前端：Analytics 页面与组件

- [x] 4.1 新建 `my-website/src/components/analytics/LearningCalendar.tsx`：
  - 调用 `GET /api/analytics/calendar`，补全 84 天缺失日期（count=0）
  - 渲染 12 列 × 7 行 div 网格，按 5 色阶着色
  - 每格 hover 显示 tooltip（日期 + 消息数）
  - 支持暗色模式
- [x] 4.2 新建 `my-website/src/components/analytics/AchievementPanel.tsx`：
  - 调用 `GET /api/analytics/achievements` 获取原始指标
  - 前端定义 8 个成就规则，计算已解锁/未解锁状态
  - 已解锁正常显示，未解锁 `opacity-40 grayscale`
- [x] 4.3 新建 `my-website/src/pages/AnalyticsPage.tsx`：
  - 使用 `AppSidebar` + `h-screen overflow-hidden` 布局
  - 主内容区依次渲染：`LearningCalendar`、`AchievementPanel`

## 5. 前端：路由接入

- [x] 5.1 在 `my-website/src/App.tsx` 新增 `Route path="/analytics"` → `AnalyticsPage`，嵌套在 `ProtectedRoute` 下
- [x] 5.2 `/analytics` 作为新首页（学习数据），`/dashboard` 对应学习目标，`/chat` 对应 AI 对话建议

## 6. 集成验收

- [x] 6.1 TypeScript 编译零错误（`tsc --noEmit`），`npm run build` 成功
- [x] 6.2 验证三个导航项路由切换正确，active 高亮随路由变化
- [x] 6.3 验证 `/analytics` 日历热力图渲染正确，有数据日期颜色更深
- [x] 6.4 验证成就面板：已满足条件的成就正常显示，未满足的灰色
- [x] 6.5 验证 `ProtectedRoute` 保护 `/analytics`，未登录跳转 `/login`
