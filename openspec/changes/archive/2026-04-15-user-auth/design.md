## Context

StudyPal 前端当前已有 react-router-dom（HashRouter）和 ThemeContext，路由系统已就位。本次变更引入 FastAPI 后端作为独立服务，通过 `/api` 路径与前端通信，前端静态构建不受影响。

## Goals / Non-Goals

**Goals:**
- 建立完整的注册/登录/Token 刷新链路
- 用 AuthContext 在前端集中管理身份状态
- 保护 `/dashboard` 路由，未登录重定向至 `/login`
- 提供用户 Profile 数据（头像 URL、连续天数、等级）

**Non-Goals:**
- 后台管理、OAuth、邮件验证、头像文件上传、速率限制

---

## Decisions

### 决策 1：JWT 双 Token 策略（access + refresh）

**选择**：access token 存内存（React state），refresh token 存 `localStorage`

**理由**：access token 存 localStorage 易受 XSS 攻击；存内存则页面刷新即失效，通过 refresh token 静默续期。refresh token 存 localStorage 是常见折衷（httpOnly cookie 更安全，但需服务端 cookie 配置，跨域复杂度高，GitHub Pages 静态托管不支持）。

- Access token 有效期：**15 分钟**
- Refresh token 有效期：**7 天**

**备选**：全部存 localStorage → XSS 风险高，放弃。

---

### 决策 2：密码哈希使用 bcrypt（passlib）

**选择**：`passlib[bcrypt]`

**理由**：bcrypt 是认证场景事实标准，passlib 提供 Python 友好封装，FastAPI 官方示例使用同款。

---

### 决策 3：数据库使用 SQLAlchemy ORM + Alembic 迁移

**选择**：`SQLAlchemy 2.x`（async）+ `Alembic`

**理由**：Alembic 提供版本化迁移，便于后续字段扩展；async SQLAlchemy 与 FastAPI async 路由天然契合。SQLite 文件路径通过环境变量 `DATABASE_URL` 配置，便于测试隔离。

---

### 决策 4：前端 AuthContext + ProtectedRoute

**选择**：新建 `AuthContext`（token + user state）和 `ProtectedRoute` 组件

**理由**：与现有 `ThemeContext` 模式一致，复用 Context pattern。`ProtectedRoute` 封装路由守卫逻辑，`App.tsx` 中不散落 if 判断。

---

## 组件层级图

```
main.tsx
└── HashRouter
    └── ThemeProvider
        └── AuthProvider          ← 新增：管理 token、user state、刷新逻辑
            └── Routes
                ├── Route "/"          → BrandSite（不变）
                ├── Route "/login"     → LoginPage（新增）
                ├── Route "/register"  → RegisterPage（新增）
                └── Route "/dashboard" → ProtectedRoute（新增）
                                            └── DashboardPage（已有，不变）

AuthProvider 内部：
  - accessToken: string | null  （仅存 React state，不落 localStorage）
  - user: UserProfile | null
  - login(email, password) → POST /api/auth/login
  - register(email, password) → POST /api/auth/register
  - logout() → 清空 state + localStorage refresh token
  - refreshToken() → POST /api/auth/refresh（自动静默调用）

ProtectedRoute：
  - 读取 AuthContext.accessToken
  - 若 null → <Navigate to="/login" replace />
  - 若有效 → 渲染子路由
```

---

## 后端目录结构

```
backend/
├── main.py                  ← FastAPI app 入口，挂载路由，配置 CORS
├── database.py              ← SQLAlchemy engine + session
├── models.py                ← User ORM 模型
├── schemas.py               ← Pydantic request/response 模型
├── auth.py                  ← JWT 生成/校验、密码哈希工具
├── routers/
│   ├── auth.py              ← /api/auth/* 路由
│   └── users.py             ← /api/users/* 路由
├── alembic/
│   ├── env.py
│   └── versions/
│       └── 0001_create_users.py
├── alembic.ini
└── requirements.txt
```

---

## API 端点规范

### POST /api/auth/register
- **Request**: `{ "email": string, "password": string }`
- **Response 201**: `{ "id": int, "email": string }`
- **Response 400**: `{ "detail": "Email already registered" }`
- **Response 422**: Pydantic validation error（邮箱格式、密码长度）

### POST /api/auth/login
- **Request**: `{ "email": string, "password": string }`
- **Response 200**: `{ "access_token": string, "refresh_token": string, "token_type": "bearer" }`
- **Response 401**: `{ "detail": "Invalid credentials" }`

### POST /api/auth/refresh
- **Request**: `{ "refresh_token": string }`
- **Response 200**: `{ "access_token": string, "token_type": "bearer" }`
- **Response 401**: `{ "detail": "Invalid or expired refresh token" }`

### GET /api/users/me
- **Header**: `Authorization: Bearer <access_token>`
- **Response 200**: `{ "id": int, "email": string, "avatar_url": string | null, "streak_days": int, "level": int }`
- **Response 401**: `{ "detail": "Not authenticated" }`

### PATCH /api/users/me
- **Header**: `Authorization: Bearer <access_token>`
- **Request**: `{ "avatar_url"?: string }`
- **Response 200**: 同 GET /api/users/me 响应结构
- **Response 401**: `{ "detail": "Not authenticated" }`

---

## 数据模型

```sql
-- users 表
CREATE TABLE users (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  email        TEXT    NOT NULL UNIQUE,
  hashed_password TEXT NOT NULL,
  avatar_url   TEXT    DEFAULT NULL,
  streak_days  INTEGER DEFAULT 0,
  level        INTEGER DEFAULT 1,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## Risks / Trade-offs

- **[Risk] refresh token 存 localStorage 的 XSS 风险** → 当前阶段接受此折衷；后续可迁移至 httpOnly cookie（需后端配合 set-cookie）
- **[Risk] SQLite 不支持高并发写入** → 单用户个人工具，并发压力可忽略；后续可迁移至 PostgreSQL，Alembic 迁移脚本兼容
- **[Risk] GitHub Pages 静态托管无法反代 API** → 前端通过 `VITE_API_BASE_URL` 环境变量指向已部署的后端，开发期用 vite proxy
- **[Risk] access token 页面刷新即失效** → `AuthProvider` 在挂载时（`useEffect`）自动调用 `/api/auth/refresh`，用 localStorage 中的 refresh token 静默续期，用户无感知

## 新增文件清单

**前端：**
- `src/contexts/AuthContext.tsx`
- `src/components/auth/ProtectedRoute.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`

**修改：**
- `src/App.tsx`（新增 `/login`、`/register` 路由；`/dashboard` 包裹 ProtectedRoute）
- `src/main.tsx`（AuthProvider 包裹 App）
- `vite.config.ts`（开发期 `/api` proxy）

**后端（全新目录）：**
- `backend/`（见上方目录结构）
