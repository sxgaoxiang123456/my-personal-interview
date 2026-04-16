# StudyPal Backend

FastAPI + SQLite + Alembic 用户认证服务。

## 启动开发服务器

```bash
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload
```

服务运行于 `http://localhost:8000`，前端 Vite dev server 通过 proxy 转发 `/api` 请求。

## 环境变量

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `SECRET_KEY` | `dev-secret-key-change-in-production` | JWT 签名密钥，生产环境必须替换 |
| `DATABASE_URL` | `sqlite+aiosqlite:///./studypal.db` | 数据库连接串 |
| `DEEPSEEK_API_KEY` | （必填，无默认值）| DeepSeek API 密钥，缺失时服务拒绝启动 |

## 前端配置

前端通过 `VITE_API_BASE_URL` 环境变量指定后端地址：

```bash
# .env.production
VITE_API_BASE_URL=https://your-backend.railway.app
```

开发期留空即可（Vite proxy 自动转发至 `http://localhost:8000`）。
