## ADDED Requirements

### Requirement: 数据统计卡片区展示 KPI 指标

Dashboard 主内容区顶部 SHALL 渲染 4 张统计卡片，每张卡片 SHALL 包含：图标、指标名称、数值、与上期对比的变化趋势。数据来源 SHALL 为 `mockDashboard.ts` 中的静态数据。

4 张卡片的指标 SHALL 分别为：
- 本周学习时长（小时）
- 目标完成率（百分比）
- 连续学习天数（天）
- 本周目标数（个）

#### Scenario: 卡片正常渲染

- **WHEN** Dashboard 页面加载
- **THEN** 4 张统计卡片在一行内水平排列，每张卡片展示图标、指标名称、数值和趋势标签

#### Scenario: 正向趋势显示

- **WHEN** 某指标相比上期增长
- **THEN** 趋势标签显示绿色上升箭头及增幅（如 `↑ 12%`）

#### Scenario: 负向趋势显示

- **WHEN** 某指标相比上期下降
- **THEN** 趋势标签显示红色下降箭头及降幅（如 `↓ 5%`）
