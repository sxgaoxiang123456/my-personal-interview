## 1. 后端：项目脚手架与数据库

- [x] 1.1 在项目根目录新建 `backend/` 目录，创建 `requirements.txt`，列出依赖：`fastapi`、`uvicorn[standard]`、`sqlalchemy[asyncio]`、`alembic`、`aiosqlite`、`python-jose[cryptography]`、`bcrypt`、`python-multipart`
- [x] 1.2 创建 `backend/database.py`：配置 SQLAlchemy async engine（`DATABASE_URL` 从环境变量读取，默认 `sqlite+aiosqlite:///./studypal.db`）和 `AsyncSession` 工厂
- [x] 1.3 创建 `backend/models.py`：定义 `User` ORM 模型（`id`、`email`、`hashed_password`、`avatar_url`、`streak_days`、`level`、`created_at`）
- [x] 1.4 初始化 Alembic：配置 `env.py` 导入 `models.py` 的 metadata，生成并运行首次迁移 `0001_create_users`
- [x] 1.5 验证：`alembic upgrade head` 无报错，`studypal.db` 中 `users` 表结构正确

## 2. 后端：认证工具与 Pydantic Schema

- [x] 2.1 创建 `backend/auth.py`：实现 `hash_password()`、`verify_password()`（bcrypt 直接调用）；`create_access_token()`、`create_refresh_token()`（python-jose，从环境变量读 `SECRET_KEY`）；`decode_token()` 解码并校验签名和过期时间
- [x] 2.2 创建 `backend/schemas.py`：定义 Pydantic 模型 `RegisterRequest`（email EmailStr，password ≥8位）、`LoginRequest`、`TokenResponse`、`RefreshRequest`、`UserProfileResponse`、`UpdateProfileRequest`
- [x] 2.3 验证：单元测试 token 生成与解码通过

## 3. 后端：路由实现

- [x] 3.1 创建 `backend/routers/auth.py`：实现 `POST /api/auth/register`（邮箱重复返回 400，密码 bcrypt 哈希存库，返回 201）；`POST /api/auth/login`（邮密校验，成功返回双 token）；`POST /api/auth/refresh`（校验 refresh token，返回新 access token）
- [x] 3.2 创建 `backend/routers/users.py`：实现 `GET /api/users/me`（Bearer token 认证，返回 Profile）；`PATCH /api/users/me`（更新 `avatar_url`，其余字段不可改）
- [x] 3.3 创建 `backend/main.py`：挂载两个路由器（prefix `/api`），配置 CORS 允许 `http://localhost:5173`，配置 lifespan 在启动时建表
- [x] 3.4 验证：完整集成测试通过（注册→登录→刷新→Profile→防枚举→PATCH）

## 4. 前端：AuthContext 与 API 层

- [x] 4.1 在 `vite.config.ts` 新增 `server.proxy`：`/api` → `http://localhost:8000`（仅开发期有效，不影响构建产物）
- [x] 4.2 新建 `src/contexts/AuthContext.tsx`：定义 `AuthProvider`，state 包含 `accessToken`（内存）、`user: UserProfile | null`、`isLoading: boolean`；挂载时读取 `localStorage` 的 `refresh_token` 并调用 `/api/auth/refresh` 静默续期；暴露 `login()`、`register()`、`logout()`、`useAuth()` hook
- [x] 4.3 在 `src/main.tsx` 中将 `AuthProvider` 包裹于 `ThemeProvider` 内层（`HashRouter → ThemeProvider → AuthProvider → App`）
- [x] 4.4 验证：TypeScript 编译零错误，构建产物正常

## 5. 前端：路由守卫与登录/注册页

- [x] 5.1 新建 `src/components/auth/ProtectedRoute.tsx`：读取 `AuthContext`；`isLoading` 时渲染全屏加载占位；`accessToken` 为 null 时 `<Navigate to="/login" state={{ redirect: location.pathname }} replace />`；否则渲染 `<Outlet />`
- [x] 5.2 新建 `src/pages/LoginPage.tsx`：邮箱 + 密码表单，调用 `useAuth().login()`；成功后读取 `location.state.redirect` 回跳，默认跳 `/dashboard`；错误时显示 inline 错误提示；全部使用 Tailwind class，支持暗色模式
- [x] 5.3 新建 `src/pages/RegisterPage.tsx`：邮箱 + 密码表单，调用 `useAuth().register()`；注册成功后自动登录并跳转 `/dashboard`；邮箱已注册时显示 inline 错误提示
- [x] 5.4 修改 `src/App.tsx`：新增 `Route path="/login"` → `LoginPage`；`Route path="/register"` → `RegisterPage`；将 `Route path="/dashboard"` 改为嵌套在 `ProtectedRoute` 下
- [x] 5.5 验证：TypeScript 编译通过，路由结构正确

## 6. 集成验收

- [x] 6.1 运行 `npm run build` + `tsc --noEmit`，确认前端零 TypeScript 错误，构建产物正常
- [x] 6.2 端到端后端链路验证：注册→登录→刷新→获取 Profile→防枚举→PATCH avatar→权限拦截，全部通过
- [x] 6.3 `backend/README.md` 已写入 `VITE_API_BASE_URL` 环境变量说明
