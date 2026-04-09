## Context

个人品牌站需要 SEO 基础优化，确保在搜索引擎中有良好的表现。技术栈为 React + Vite，部署在 GitHub Pages。

## Goals / Non-Goals

**Goals:**
- 设置 HTML title 和 description meta tags
- 添加 Open Graph 和 Twitter Card tags
- 添加 robots.txt 允许 Google 爬虫
- 审查并确保语义化 HTML 结构正确

**Non-Goals:**
- 不做 sitemap.xml（后续考虑）
- 不做 Google Analytics

## Decisions

### 1. HTML Meta Tags

**Decision**: 在 `index.html` 中添加完整的 meta tags

**Implementation**:
```html
<title>高翔 | 自驱力极强的全栈开发工程师</title>
<meta name="description" content="高翔的个人品牌网站，热爱AI技术，痴迷Vibe Coding的全栈开发者" />
<meta name="keywords" content="全栈开发,React,TypeScript,AI" />
```

### 2. Open Graph Tags

**Decision**: 添加社交分享所需的 Open Graph tags

**Implementation**:
```html
<meta property="og:title" content="高翔 | 全栈开发工程师" />
<meta property="og:description" content="热爱AI技术，痴迷Vibe Coding的全栈开发者" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sxgaoxiang123456.github.io/my-website/" />
```

### 3. Twitter Card Tags

**Decision**: 添加 Twitter Card tags

**Implementation**:
```html
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="高翔 | 全栈开发工程师" />
<meta name="twitter:description" content="热爱AI技术，痴迷Vibe Coding的全栈开发者" />
```

### 4. robots.txt

**Decision**: 在 `public/` 目录下创建 `robots.txt`

**Implementation**:
```
User-agent: *
Allow: /

Sitemap: https://sxgaoxiang123456.github.io/my-website/sitemap.xml
```

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| GitHub Pages 部署路径问题 | 使用 base path /my-website/ 确保链接正确 |
| 社交分享图片缺失 | 后续添加 og:image |

## Open Questions

- **网站 URL**: 确认最终部署 URL 是否正确
- **og:image**: 是否需要添加社交分享图片
