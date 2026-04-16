## Why

StudyPal Dashboard 当前所有数据为全局共享的 mock 数据，无用户身份概念，无法支撑个性化学习记录（连续学习天数、用户等级、头像等）。引入后端用户认证是平台从演示阶段迈向真实多用户产品的基础步骤。

## What Changes

- **新增** FastAPI 后端服务（独立进程，与前端分离部署）
- **新增** SQLite 数据库 + Alembic 迁移管理
- **新增** 用户注册 / 登录接口，返回 JWT access token + refresh token
- **新增** JWT token 刷新接口
- **新增** 用户 Profile 接口：头像 URL、连续学习天数、用户等级
- **新增** 前端登录/注册页面（`/#/login`、`/#/register`）
- **新增** 前端路由守卫：`/dashboard` 需登录方可访问，未登录重定向至 `/login`
- **新增** 前端 Token 管理：access token 存 memory，refresh token 存 `localStorage`

## Capabilities

### New Capabilities

- `user-registration`: 新用户通过邮箱 + 密码注册账号
- `user-login`: 已注册用户登录，获取 JWT token 对
- `token-refresh`: 使用 refresh token 换取新 access token，维持登录态
- `user-profile`: 获取当前登录用户的 Profile（头像、连续学习天数、用户等级）
- `auth-route-guard`: 前端路由层拦截未认证访问，保护 `/dashboard` 等需登录页面

### Modified Capabilities

（无——现有 specs 均为前端 Dashboard UI，与认证无需求层级交叉）

## Impact

**后端（新建）：**
- `backend/` 目录：FastAPI app、路由、模型、迁移脚本
- 依赖：`fastapi`、`uvicorn`、`sqlalchemy`、`alembic`、`python-jose`、`passlib`、`python-multipart`

**前端（修改）：**
- `src/App.tsx`：新增 `/login`、`/register` 路由；`/dashboard` 加路由守卫
- `src/pages/`：新增 `LoginPage.tsx`、`RegisterPage.tsx`
- `src/contexts/`：新增 `AuthContext.tsx`，管理 token 和用户状态
- `vite.config.ts`：开发期新增 `/api` proxy → `http://localhost:8000`

**部署影响：**
- 前端仍为 GitHub Pages 静态托管
- 后端需独立部署（Railway / Render 等），前端通过环境变量 `VITE_API_BASE_URL` 指向后端地址

**回滚方案：**
后端为独立服务，前端对后端的依赖仅通过 `AuthContext` 和 API fetch 封装。回滚时：
1. 将 `/dashboard` 路由守卫移除
2. 删除 `AuthContext`、`LoginPage`、`RegisterPage`
3. Dashboard 恢复使用 mock 数据
品牌站及现有 Dashboard UI 组件不受影响。

## Out of Scope / NOT Doing

- 后台管理系统（用户列表、角色权限管理）
- 第三方 OAuth 登录（GitHub、Google 等）
- 邮箱验证 / 找回密码流程
- 头像上传（Profile 仅存头像 URL，不支持文件上传）
- 前端记住密码 / 自动填充
- 速率限制（Rate Limiting）
