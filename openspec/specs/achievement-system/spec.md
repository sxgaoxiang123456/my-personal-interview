# achievement-system Specification

## Purpose

定义成就徽章面板（`AchievementPanel`）的行为规范：基于后端返回的用户学习指标（`streak_days`、`level`、`total_messages`），在前端按静态规则判定 8 个成就的解锁状态，已解锁正常显示，未解锁灰色半透明。

## Requirements

### Requirement: 成就系统基于用户指标展示已解锁和待解锁徽章

`AchievementPanel` 组件 SHALL 展示预设的成就列表；成就解锁规则 SHALL 在前端 TypeScript 常量中定义，后端仅返回原始指标（`streak_days`、`level`、`total_messages`）；已解锁成就 SHALL 正常显示，未解锁成就 SHALL 以灰色半透明呈现（`opacity-40 grayscale`）。

预设成就 SHALL 至少包含以下 8 项：
- 初次对话（total_messages ≥ 1）
- 3 天连续（streak_days ≥ 3）
- 一周坚持（streak_days ≥ 7）
- 月度达人（streak_days ≥ 30）
- 进阶学习者（level ≥ 2）
- 学习达人（level ≥ 5）
- 对话积极者（total_messages ≥ 10）
- 深度探索者（total_messages ≥ 50）

#### Scenario: 展示已解锁成就

- **GIVEN** 用户 streak_days=7，level=2，total_messages=15
- **WHEN** `AchievementPanel` 渲染
- **THEN** 「初次对话」「3天连续」「一周坚持」「进阶学习者」「对话积极者」SHALL 正常显示；「月度达人」「学习达人」「深度探索者」SHALL 以 `opacity-40 grayscale` 渲染

#### Scenario: 全部未解锁时的初始状态

- **GIVEN** 新注册用户，streak_days=0，level=1，total_messages=0
- **WHEN** `AchievementPanel` 渲染
- **THEN** 所有成就 SHALL 以灰色半透明展示，页面 SHALL NOT 显示空白或报错
