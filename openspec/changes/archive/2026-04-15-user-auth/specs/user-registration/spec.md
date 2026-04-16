## ADDED Requirements

### Requirement: 用户可通过邮箱和密码注册账号

系统 SHALL 接受合法邮箱和密码，创建新用户记录，返回用户 ID 和邮箱。密码 SHALL 经 bcrypt 哈希后存储，明文不得落库。同一邮箱 SHALL NOT 重复注册。

密码最短长度 SHALL 为 8 位。

#### Scenario: 成功注册

- **GIVEN** 邮箱未被注册
- **WHEN** `POST /api/auth/register` 携带合法邮箱和 ≥8 位密码
- **THEN** 响应 `201`，body 为 `{ "id": <int>, "email": <string> }`，密码字段不出现在响应中

#### Scenario: 邮箱已被注册

- **GIVEN** 邮箱已存在于数据库
- **WHEN** `POST /api/auth/register` 携带该邮箱
- **THEN** 响应 `400`，body 为 `{ "detail": "Email already registered" }`

#### Scenario: 邮箱格式无效

- **WHEN** `POST /api/auth/register` 携带非邮箱格式的字符串（如 `"notanemail"`）
- **THEN** 响应 `422`，body 含 Pydantic validation error，指明 `email` 字段

#### Scenario: 密码过短

- **WHEN** `POST /api/auth/register` 携带长度 < 8 的密码
- **THEN** 响应 `422`，body 含 validation error，指明 `password` 字段的最小长度约束
