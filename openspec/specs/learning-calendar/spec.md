# learning-calendar Specification

## Purpose

定义学习日历热力图组件（`LearningCalendar`）的行为规范：以 12 周 × 7 天的网格展示用户过去 84 天的每日学习活跃度，颜色深浅反映当日对话消息数量。

## Requirements

### Requirement: 学习日历以热力图展示过去 12 周的每日活跃度

`LearningCalendar` 组件 SHALL 渲染过去 84 天（12 列 × 7 行）的热力图网格，每格代表一天；颜色深浅 SHALL 反映当天的学习消息数量；数据来自 `GET /api/analytics/calendar`，后端缺失日期 SHALL 在前端补全为 count=0。

颜色分级 SHALL 为 5 档：
- 0 条：`bg-gray-100 dark:bg-gray-800`（无活跃）
- 1-2 条：`bg-blue-200 dark:bg-blue-900`
- 3-5 条：`bg-blue-400 dark:bg-blue-700`
- 6-9 条：`bg-blue-600 dark:bg-blue-500`
- 10+ 条：`bg-blue-800 dark:bg-blue-400`

#### Scenario: 正常渲染 12 周热力图

- **GIVEN** `GET /api/analytics/calendar` 返回部分日期的活跃数据
- **WHEN** `LearningCalendar` 组件挂载
- **THEN** SHALL 渲染 84 个格子，已有数据的日期按颜色分级着色，缺失日期显示 count=0 对应的最浅色

#### Scenario: 鼠标悬停显示日期与条数

- **GIVEN** 热力图已渲染
- **WHEN** 用户将鼠标悬停在某个格子上
- **THEN** SHALL 显示 tooltip 内容：日期（`YYYY-MM-DD`）和当天消息数（如「3 条对话」）；无活动则显示「无活动」

#### Scenario: 暗色模式适配

- **GIVEN** 用户启用暗色模式
- **WHEN** 热力图渲染
- **THEN** 无活跃格子 SHALL 使用 `dark:bg-gray-800`，有活跃格子保持蓝色系，整体对比度清晰
