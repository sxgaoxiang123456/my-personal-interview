## ADDED Requirements

### Requirement: 周趋势图展示每日学习时长

Dashboard SHALL 渲染周趋势柱状图（Recharts BarChart），展示近 7 天每日学习时长（小时），数据来源为 `mockDashboard.ts`。图表 SHALL 支持悬浮 tooltip 显示具体数值。

#### Scenario: 周趋势图正常渲染

- **WHEN** Dashboard 页面加载
- **THEN** 图表渲染近 7 天柱状图，X 轴为日期（如"周一"），Y 轴为学习时长（小时）

#### Scenario: 鼠标悬浮显示 tooltip

- **WHEN** 用户将鼠标悬停在某天柱状条上
- **THEN** 显示 tooltip，内容为该天日期和具体学习时长

#### Scenario: 暗色模式下图表样式

- **WHEN** 暗色模式开启
- **THEN** 图表文字、轴线和背景切换为暗色主题配色，不使用默认白色背景

#### Scenario: mock 数据某天为 0 时的展示

- **WHEN** 某天学习时长为 0
- **THEN** 该天柱状条高度为 0（显示空柱），不隐藏该天的 X 轴标签

---

### Requirement: 月趋势图展示每周学习时长汇总

Dashboard SHALL 渲染月趋势折线图（Recharts LineChart），展示近 4 周每周学习时长汇总，数据来源为 `mockDashboard.ts`。

#### Scenario: 月趋势图正常渲染

- **WHEN** Dashboard 页面加载
- **THEN** 图表渲染近 4 周折线图，X 轴为周序号（如"第1周"），Y 轴为小时数

#### Scenario: 图表懒加载

- **WHEN** 用户首次加载 Dashboard 页面
- **THEN** ProgressChart 组件 SHALL 通过 `React.lazy` 动态加载，Recharts 包不计入品牌站首屏 bundle
