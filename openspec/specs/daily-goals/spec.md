# daily-goals Specification

## Purpose
TBD - created by archiving change studypal-dashboard. Update Purpose after archive.
## Requirements
### Requirement: 每日目标清单展示当日目标

Dashboard SHALL 渲染每日目标清单面板，从 `mockDashboard.ts` 加载当日目标列表，每条目标 SHALL 包含：复选框、目标标题、分类标签。

#### Scenario: 目标列表正常渲染

- **WHEN** Dashboard 页面加载
- **THEN** 每日目标面板展示所有 mock 目标条目，未完成项复选框为空，已完成项复选框勾选并附加删除线样式

---

### Requirement: 目标完成状态可切换

用户 SHALL 能够点击复选框切换目标的完成状态。状态变化 SHALL 仅保存在组件 state 中（刷新后重置，不持久化）。

#### Scenario: 勾选未完成目标

- **WHEN** 用户点击某未完成目标的复选框
- **THEN** 该目标立即显示已完成样式（复选框勾选 + 文字删除线），面板顶部完成计数同步更新

#### Scenario: 取消勾选已完成目标

- **WHEN** 用户点击已完成目标的复选框
- **THEN** 该目标恢复为未完成样式，完成计数同步递减

#### Scenario: 全部完成时的状态展示

- **WHEN** 所有目标均被勾选
- **THEN** 面板 SHALL 显示全部完成的成就提示（如"今日目标全部完成 🎉"）

