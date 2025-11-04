# MCP 服务市场与推荐列表

## 🌐 官方市场和资源

### 1. **官方 GitHub 组织**
- **地址**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
- **说明**: MCP 官方组织，包含所有官方维护的服务器实现
- **推荐**: 这是最权威的资源来源

### 2. **npm 官方包市场**
- **搜索地址**: [npmjs.com/search?q=%40modelcontextprotocol%2Fserver-](https://www.npmjs.com/search?q=%40modelcontextprotocol%2Fserver-)
- **命名规范**: `@modelcontextprotocol/server-*`
- **说明**: 所有官方服务器都通过 npm 发布

### 3. **PyPI Python 包市场**
- **搜索地址**: [pypi.org/search/?q=mcp-server](https://pypi.org/search/?q=mcp-server)
- **命名规范**: `mcp-server-*` 或 `mcp-*`
- **说明**: Python 实现的 MCP 服务器

### 4. **Awesome MCP 列表（社区维护）**
- **GitHub Awesome Lists**: 搜索 "awesome mcp" 或 "awesome model-context-protocol"
- **社区维护**: 包含官方和社区推荐的服务器列表

## 🏆 业界推荐的 MCP 服务列表

### 📊 官方核心服务器（@modelcontextprotocol）

#### 数据存储类
| 服务器 | npm 包名 | 功能描述 | 下载量 |
|--------|----------|----------|--------|
| **Memory** | `@modelcontextprotocol/server-memory` | 内存管理，知识图谱存储 | ⭐⭐⭐⭐⭐ |
| **PostgreSQL** | `@modelcontextprotocol/server-postgres` | PostgreSQL 数据库集成 | ⭐⭐⭐⭐ |
| **SQLite** | `@modelcontextprotocol/server-sqlite` | SQLite 数据库集成 | ⭐⭐⭐⭐ |

#### 开发工具类
| 服务器 | npm 包名 | 功能描述 | 下载量 |
|--------|----------|----------|--------|
| **GitHub** | `@modelcontextprotocol/server-github` | GitHub API 完整集成 | ⭐⭐⭐⭐⭐ |
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | 文件系统操作 | ⭐⭐⭐⭐ |
| **Puppeteer** | `@modelcontextprotocol/server-puppeteer` | 浏览器自动化 | ⭐⭐⭐⭐ |

#### 思考辅助类
| 服务器 | npm 包名 | 功能描述 | 下载量 |
|--------|----------|----------|--------|
| **Sequential Thinking** | `@modelcontextprotocol/server-sequential-thinking` | 顺序思考工具 | ⭐⭐⭐⭐⭐ |

#### 搜索和抓取类
| 服务器 | npm 包名 | 功能描述 | 下载量 |
|--------|----------|----------|--------|
| **Fetch** | `@modelcontextprotocol/server-fetch` | 网站抓取工具 | ⭐⭐⭐⭐ |

### 🌟 社区优秀服务器

#### 网页搜索和抓取
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **RAG Web Browser** | `@apify/mcp-server-rag-web-browser` | 网页搜索和内容抓取（需要 APIFY_TOKEN） | ⭐⭐⭐⭐⭐ |
| **Fetch Server** | `mcp-server-fetch` (PyPI) | 网站抓取工具 | ⭐⭐⭐⭐ |
| **Brave Search** | `@modelcontextprotocol/server-brave-search` | Brave 搜索引擎集成 | ⭐⭐⭐⭐ |

#### 数据库和存储
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **Supabase** | `@modelcontextprotocol/server-supabase` | Supabase 数据库集成 | ⭐⭐⭐⭐ |
| **MongoDB** | `mcp-server-mongodb` | MongoDB 数据库集成 | ⭐⭐⭐ |

#### 开发工具
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **GitLab** | `mcp-server-gitlab` | GitLab API 集成 | ⭐⭐⭐ |
| **Linear** | `mcp-server-linear` | Linear 项目管理工具 | ⭐⭐⭐⭐ |
| **Jira** | `mcp-server-jira` | Jira 项目管理集成 | ⭐⭐⭐ |

#### AI 和机器学习
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **OpenAI** | `@modelcontextprotocol/server-openai` | OpenAI API 集成 | ⭐⭐⭐⭐⭐ |
| **Anthropic** | `@modelcontextprotocol/server-anthropic` | Anthropic Claude API | ⭐⭐⭐⭐⭐ |
| **Hugging Face** | `mcp-server-huggingface` | Hugging Face 模型集成 | ⭐⭐⭐⭐ |

#### 文档和内容管理
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **Notion** | `mcp-server-notion` | Notion API 集成 | ⭐⭐⭐⭐ |
| **Confluence** | `mcp-server-confluence` | Confluence 文档管理 | ⭐⭐⭐ |
| **Google Drive** | `mcp-server-google-drive` | Google Drive 集成 | ⭐⭐⭐⭐ |

#### 协作工具
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **Slack** | `mcp-server-slack` | Slack 集成 | ⭐⭐⭐⭐ |
| **Discord** | `mcp-server-discord` | Discord 集成 | ⭐⭐⭐ |
| **Microsoft Teams** | `mcp-server-teams` | Teams 集成 | ⭐⭐⭐ |

#### 云服务
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **AWS** | `mcp-server-aws` | AWS 服务集成 | ⭐⭐⭐⭐ |
| **Google Cloud** | `mcp-server-gcp` | GCP 服务集成 | ⭐⭐⭐ |
| **Vercel** | `mcp-server-vercel` | Vercel 部署集成 | ⭐⭐⭐⭐ |

#### 其他实用工具
| 服务器 | 包名/来源 | 功能描述 | 推荐度 |
|--------|-----------|----------|--------|
| **Feedback Enhanced** | `mcp-feedback-enhanced` (PyPI) | 反馈增强工具 | ⭐⭐⭐ |
| **Weather** | `mcp-server-weather` | 天气查询 | ⭐⭐⭐ |
| **News** | `mcp-server-news` | 新闻聚合 | ⭐⭐⭐ |

## 📚 查找和评估 MCP 服务器的方法

### 方法一：npm 搜索
```bash
# 搜索官方包
npm search @modelcontextprotocol/server-

# 搜索社区包
npm search mcp-server
```

### 方法二：GitHub 搜索
```bash
# 搜索 GitHub 上的 MCP 服务器
# 访问: https://github.com/search?q=mcp-server&type=repositories
```

### 方法三：PyPI 搜索
```bash
# 搜索 Python 实现的 MCP 服务器
# 访问: https://pypi.org/search/?q=mcp-server
```

### 方法四：查看 Awesome Lists
- 搜索 GitHub 上的 "awesome mcp" 仓库
- 查看社区维护的精选列表

## 🎯 推荐配置组合

### 基础开发配置
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

### 高级开发配置
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "rag-web-browser": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server-rag-web-browser"],
      "env": {
        "APIFY_TOKEN": "your-apify-token"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "your-connection-string"
      }
    }
  }
}
```

### 内容创作配置
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "notion": {
      "command": "uvx",
      "args": ["mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "your-notion-key"
      }
    },
    "rag-web-browser": {
      "command": "npx",
      "args": ["-y", "@apify/mcp-server-rag-web-browser"],
      "env": {
        "APIFY_TOKEN": "your-apify-token"
      }
    }
  }
}
```

## 🔍 评估服务器质量的标准

### ✅ 推荐指标
1. **维护状态**
   - 最近更新时间（建议 3 个月内）
   - Issue 响应速度
   - PR 合并频率

2. **使用情况**
   - npm/pip 下载量
   - GitHub Stars
   - 社区活跃度

3. **文档质量**
   - README 完整性
   - 使用示例
   - API 文档

4. **功能完整性**
   - 功能覆盖范围
   - 错误处理
   - 类型支持（TypeScript）

5. **安全性**
   - 权限控制
   - 数据加密
   - 环境变量管理

## 🚀 快速开始

### 1. 安装官方服务器
```bash
# 使用 npx（推荐，无需安装）
npx -y @modelcontextprotocol/server-memory

# 或全局安装
npm install -g @modelcontextprotocol/server-memory
```

### 2. 配置到 Cursor
编辑 `mcp.json` 文件，添加服务器配置

### 3. 重启 Cursor
重启应用以加载新的 MCP 服务器

### 4. 验证连接
检查 Cursor 的 MCP 日志，确认服务器正常加载

## 📝 资源链接

- **官方文档**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **GitHub 组织**: [github.com/modelcontextprotocol](https://github.com/modelcontextprotocol)
- **npm 官方包**: [npmjs.com/~modelcontextprotocol](https://www.npmjs.com/~modelcontextprotocol)
- **协议规范**: [spec.modelcontextprotocol.io](https://spec.modelcontextprotocol.io)

## ⚠️ 注意事项

1. **API Key 管理**: 确保妥善保管 API Keys 和 Tokens
2. **权限控制**: 注意服务器可能访问的资源范围
3. **版本兼容**: 确保服务器版本与 MCP 协议版本兼容
4. **性能考虑**: 某些服务器可能影响 Cursor 启动速度

## 🔄 更新日志

本文档会定期更新，建议：
- 定期检查官方 GitHub 组织的新发布
- 关注社区推荐的新服务器
- 参与社区讨论获取最新信息

---

**最后更新**: 2024年
**维护者**: AI Helper 项目

