## 1. 环境准备

- [x] 1.1 确认 ParticleCanvas 依赖：仅使用原生 Canvas API，无需额外 npm 包
- [x] 1.2 在 src/components/ 目录创建 HeroSection 和 ParticleCanvas 文件骨架

## 2. ParticleCanvas 组件

- [x] 2.1 实现基础 Canvas 渲染：全屏覆盖、粒子点阵绘制
- [x] 2.2 接入 CSS 变量主题色：根据 `document.body.classList.contains('dark')` 切换粒子颜色
- [x] 2.3 实现 `prefers-reduced-motion` 检测：减少动画或静态降级
- [x] 2.4 Canvas 随窗口 resize 自适应（防撕裂）

## 3. HeroSection 组件

- [x] 3.1 全屏布局：min-h-screen + 垂直水平居中
- [x] 3.2 身份信息展示：h1 名字 + 职业 + 介绍（使用占位文本待用户替换）
- [x] 3.3 CTA 按钮：平滑滚动到 #projects，检测目标不存在时的容错
- [x] 3.4 背景层叠：渐变 CSS 层（z-0）+ Canvas 层（z-1）+ 内容层（z-2）

## 4. 暗色模式适配

- [x] 4.1 亮色模式渐变背景：使用 Tailwind dark: 前缀 + 渐变 class
- [x] 4.2 暗色模式渐变背景：深蓝/深紫系渐变
- [x] 4.3 粒子颜色亮/暗自适应：通过 CSS 变量注入

## 5. 集成和验证

- [x] 5.1 在 App.tsx 引入 HeroSection 组件
- [x] 5.2 浏览器验证：亮/暗模式切换正常
- [x] 5.3 浏览器验证：CTA 按钮点击跳转正常
- [x] 5.4 浏览器验证：窗口 resize 粒子不撕裂
