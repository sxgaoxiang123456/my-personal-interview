## ADDED Requirements

### Requirement: 导航栏固定定位
导航栏 SHALL 固定在页面顶部，始终可见。

#### Scenario: 页面加载时导航栏位置
- **WHEN** 用户打开页面或滚动页面
- **THEN** 导航栏固定在视口顶部，不随页面滚动移动

#### Scenario: 导航栏不遮挡 Hero 内容
- **WHEN** Hero Section 渲染在导航栏下方
- **THEN** Hero 内容从导航栏下方开始，不被导航栏遮挡

---

### Requirement: 导航栏布局
导航栏 SHALL 左侧显示品牌，右侧显示导航链接。

#### Scenario: 导航栏左右布局
- **WHEN** 导航栏渲染
- **THEN** 左侧显示品牌（名字或 Logo），右侧水平排列导航链接

#### Scenario: 导航链接项目
- **WHEN** 导航栏渲染
- **THEN** 显示「首页」「项目」「联系我」三个链接

#### Scenario: 品牌展示内容为空
- **WHEN** 品牌名称 prop 未传入
- **THEN** 显示默认文字「高翔」

---

### Requirement: 导航链接平滑滚动
导航栏链接 SHALL 点击后平滑滚动到对应 section。

#### Scenario: 点击「首页」链接
- **WHEN** 用户点击「首页」链接
- **THEN** 页面平滑滚动到 `#home` section

#### Scenario: 点击「项目」链接
- **WHEN** 用户点击「项目」链接
- **THEN** 页面平滑滚动到 `#projects` section

#### Scenario: 点击「联系我」链接
- **WHEN** 用户点击「联系我」链接
- **THEN** 页面平滑滚动到 `#contact` section

#### Scenario: 目标 section 不存在
- **WHEN** 点击导航链接时目标 section 不存在
- **THEN** 页面不跳转，控制台输出警告，不报 JS 错误

---

### Requirement: 毛玻璃背景效果
导航栏 SHALL 有毛玻璃背景模糊效果。

#### Scenario: 亮色模式毛玻璃背景
- **WHEN** 亮色模式下导航栏渲染
- **THEN** 导航栏背景为半透明白色 + backdrop-blur 效果

#### Scenario: 暗色模式毛玻璃背景
- **WHEN** 暗色模式下导航栏渲染
- **THEN** 导航栏背景为半透明深色 + backdrop-blur 效果

---

### Requirement: 暗色/亮色模式自适应
导航栏 SHALL 支持暗色/亮色模式切换。

#### Scenario: 主题从亮变暗
- **WHEN** 主题从亮色切换到暗色
- **THEN** 导航栏背景和文字颜色立即更新为暗色系

#### Scenario: 主题从暗变亮
- **WHEN** 主题从暗色切换到亮色
- **THEN** 导航栏背景和文字颜色立即更新为亮色系

---

### Requirement: 导航栏 z-index
导航栏 SHALL 在其他内容之上。

#### Scenario: 导航栏层级
- **WHEN** 页面渲染多个内容层
- **THEN** 导航栏始终在最上层（z-50），不被其他内容遮挡
