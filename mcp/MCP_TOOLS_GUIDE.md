# MCP 工具查找与使用指南

## 📚 查找 MCP 工具的渠道

### 1. **npm 官方包**
- 官方命名空间：`@modelcontextprotocol/server-*`
- 搜索方式：
  - 访问 [npmjs.com](https://www.npmjs.com) 搜索 `@modelcontextprotocol/server-`
  - 或使用命令行：`npm search @modelcontextprotocol/server-`

**常用官方工具：**
- `@modelcontextprotocol/server-memory` - 内存管理工具
- `@modelcontextprotocol/server-github` - GitHub 集成
- `@modelcontextprotocol/server-sequential-thinking` - 顺序思考工具
- `@modelcontextprotocol/server-filesystem` - 文件系统操作
- `@modelcontextprotocol/server-postgres` - PostgreSQL 数据库

### 2. **第三方 npm 包**
- 社区开发的 MCP 服务器通常以 `mcp-server-*` 或 `@组织/mcp-server-*` 命名
- 示例：
  - `@apify/mcp-server-rag-web-browser` - 网页搜索和抓取
  - `mcp-server-fetch` - 网站抓取工具

### 3. **Python 包（通过 uvx）**
- 通过 `uvx` 工具运行 Python 实现的 MCP 服务器
- 搜索 [PyPI](https://pypi.org) 上的 `mcp-server-*` 或 `mcp-*` 包
- 示例：
  - `mcp-server-fetch`
  - `mcp-feedback-enhanced`

### 4. **GitHub 仓库**
- 访问 [ModelContextProtocol 官方组织](https://github.com/modelcontextprotocol)
- 查看官方示例和社区贡献
- 搜索 GitHub 上的 `mcp-server` 关键词

## 🔧 安装和配置方式

### 方式一：npm 包（推荐）

```json
{
  "mcpServers": {
    "工具名称": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-工具名"]
    }
  }
}
```

**示例：**
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

### 方式二：Python 包（通过 uvx）

```json
{
  "mcpServers": {
    "工具名称": {
      "command": "uvx",
      "args": ["mcp-server-工具名"]
    }
  }
}
```

**示例：**
```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```

### 方式三：带环境变量配置

```json
{
  "mcpServers": {
    "工具名称": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-工具名"],
      "env": {
        "API_KEY": "your-api-key",
        "TOKEN": "your-token"
      }
    }
  }
}
```

**示例：**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    }
  }
}
```

### 方式四：HTTP 服务器

```json
{
  "mcpServers": {
    "自定义服务器": {
      "type": "http",
      "url": "http://localhost:3001/mcp"
    }
  }
}
```

## 📋 你当前的配置示例

从你的 `mcp.json` 可以看到已配置的工具：

1. **server memory** - 内存管理
2. **fetch website** - 网站抓取
3. **sequential thinking** - 顺序思考
4. **git service** - GitHub 集成
5. **rag-web-browser** - 网页搜索（需要 APIFY_TOKEN）
6. **mcp-feedback-enhanced** - 反馈增强

## 🎯 查找工具的最佳实践

### 1. **明确需求**
- 你想实现什么功能？
- 需要访问哪些外部服务？
- 需要处理什么类型的数据？

### 2. **搜索策略**
- 先搜索官方包：`@modelcontextprotocol/server-*`
- 再搜索社区包：`mcp-server-*` 或 `mcp-*`
- 检查 GitHub 上的相关项目

### 3. **评估工具**
- ✅ 查看 README 文档
- ✅ 检查下载量和使用情况
- ✅ 查看 Issue 和 PR 了解维护状态
- ✅ 确认是否有必要的环境变量配置

### 4. **测试配置**
1. 将工具添加到 `mcp.json`
2. 重启 Cursor（如果使用 Cursor）
3. 检查工具是否正常加载
4. 验证工具功能是否正常

## 🔍 推荐的官方工具列表

基于官方文档，以下是一些常用的 MCP 工具：

### 数据存储类
- `server-memory` - 内存管理
- `server-postgres` - PostgreSQL 数据库
- `server-sqlite` - SQLite 数据库

### 开发工具类
- `server-github` - GitHub 集成
- `server-filesystem` - 文件系统操作
- `server-puppeteer` - 浏览器自动化

### 思考辅助类
- `server-sequential-thinking` - 顺序思考

### 搜索和抓取类
- `server-fetch` - 网站抓取
- `@apify/mcp-server-rag-web-browser` - 网页搜索

## ⚠️ 注意事项

1. **环境变量**：某些工具需要配置 API Key 或 Token
2. **权限控制**：注意工具可能访问的文件系统或网络资源
3. **版本兼容性**：确保工具支持你使用的 MCP 协议版本
4. **错误处理**：配置失败时检查日志输出

## 🚀 下一步

1. 访问 [npmjs.com](https://www.npmjs.com/search?q=%40modelcontextprotocol%2Fserver-) 搜索官方包
2. 访问 [GitHub ModelContextProtocol](https://github.com/modelcontextprotocol) 查看官方仓库
3. 在社区搜索特定的功能需求
4. 根据你的实际需求选择合适的工具并添加到配置中

## 📦 更多资源

- **查看完整市场列表**: 请参考 [MCP_SERVER_MARKETPLACE.md](./MCP_SERVER_MARKETPLACE.md)
- **该文档包含**: 业界推荐的 MCP 服务列表、市场资源、评估标准等

