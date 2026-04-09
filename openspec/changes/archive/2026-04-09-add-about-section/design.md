## Context

个人品牌站需要「关于我」区域，展示个人照片、背景介绍和品牌标签。该区域位于项目区下方，Contact 区上方，提供更深层次的个人展示。

## Goals / Non-Goals

**Goals:**
- 「关于我」区域位于项目展示区下方
- 左右分栏布局：左侧照片，右侧文字
- 下方品牌标签「George AI」
- 暗色模式支持
- 响应式布局（移动端堆叠）

**Non-Goals:**
- 不做联系表单

## Decisions

### 1. 布局策略

**Decision**: 使用 CSS Grid/Flex 实现左右分栏，照片和文字并排

**Rationale**:
- 照片和文字并排符合阅读习惯
- 移动端自动堆叠为上下布局
- `flex-col md:flex-row` 实现响应式切换

### 2. 照片展示

**Decision**: 使用 `aspect-square` 保持正方形比例 + `object-cover` 防止变形

**Rationale**:
- 正方形头像更符合个人介绍风格
- `rounded-full` 圆形头像更亲切
- 占位使用 `picsum.photos` 随机头像

### 3. 个人简介

**Decision**: 3 个段落分别介绍背景、技能和价值观

**Implementation**:
```tsx
<div className="space-y-4">
  <p>第一段：个人背景介绍</p>
  <p>第二段：技能和专长</p>
  <p>第三段：价值观和愿景</p>
</div>
```

### 4. 品牌标签

**Decision**: 使用标签样式展示「George AI」品牌

**Implementation**:
```tsx
<div className="mt-8">
  <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
    George AI
  </span>
</div>
```

### 5. 暗色模式

**Decision**: 背景使用 `bg-white dark:bg-gray-800`，文字使用 `text-gray-700 dark:text-gray-300`

**Rationale**:
- 与整站风格保持一致
- 照片边框和阴影在暗色模式下适当调整

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 照片比例失真 | 使用 `aspect-square rounded-full object-cover` |
| 移动端布局不佳 | 响应式 flex-col 堆叠 |
| 品牌标签不够突出 | 使用圆形背景 + 品牌色 |

## Open Questions

- **照片**: 是否需要用户上传？目前使用占位头像
- **品牌标签样式**: 「George AI」是否有特定设计要求
