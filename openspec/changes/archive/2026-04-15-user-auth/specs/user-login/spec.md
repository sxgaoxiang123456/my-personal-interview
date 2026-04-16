## ADDED Requirements

### Requirement: 已注册用户可通过邮箱密码登录

系统 SHALL 校验邮箱和密码，通过后返回 access token（有效期 15 分钟）和 refresh token（有效期 7 天）。邮箱不存在与密码错误 SHALL 返回相同错误信息，不得区分，以防枚举攻击。

#### Scenario: 成功登录

- **GIVEN** 用户已注册
- **WHEN** `POST /api/auth/login` 携带正确邮箱和密码
- **THEN** 响应 `200`，body 为 `{ "access_token": <string>, "refresh_token": <string>, "token_type": "bearer" }`

#### Scenario: 密码错误

- **GIVEN** 邮箱已注册
- **WHEN** `POST /api/auth/login` 携带正确邮箱但错误密码
- **THEN** 响应 `401`，body 为 `{ "detail": "Invalid credentials" }`

#### Scenario: 邮箱不存在

- **GIVEN** 邮箱未注册于数据库
- **WHEN** `POST /api/auth/login` 携带该邮箱
- **THEN** 响应 `401`，body 为 `{ "detail": "Invalid credentials" }`（与密码错误响应一致）
