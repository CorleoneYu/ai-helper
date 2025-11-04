# AI Helper

AI 辅助工具集合，用于文档处理、MCP 服务管理等。

## 📋 功能特性

### 文档处理
- **DOCX 处理**: 读取、修改和创建 Word 文档
  - 转换为 HTML/Markdown
  - 提取纯文本
  - 创建和修改文档内容
  - 支持表格、标题、格式化文本等

- **PDF 处理**: 读取 PDF 并转换为 Markdown
  - 提取文本内容
  - 提取文档元数据
  - 转换为 Markdown 格式
  - 自动清理格式问题

### MCP 服务管理
- **MCP 工具指南**: 查找和使用 MCP 服务器的完整指南
- **MCP 服务市场**: 业界推荐的 MCP 服务列表和资源

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 使用示例

#### 读取 DOCX 文件
```bash
npm run read-docx
```

#### 修改 DOCX 文件
```bash
npm run modify-docx
```

#### 读取 PDF 文件并转换为 Markdown
```bash
npm run read-pdf
```

## 📚 文档

- [DOCX 处理指南](./DOCX_GUIDE.md)
- [PDF 处理指南](./PDF_GUIDE.md)
- [MCP 工具指南](./mcp/MCP_TOOLS_GUIDE.md)
- [MCP 服务市场](./mcp/MCP_SERVER_MARKETPLACE.md)

## 📁 项目结构

```
ai-helper/
├── scripts/           # 处理脚本
│   ├── read-docx.js   # DOCX 读取脚本
│   ├── modify-docx.js # DOCX 修改脚本
│   └── read-pdf.js    # PDF 读取脚本
├── mcp/              # MCP 相关文档
│   ├── MCP_TOOLS_GUIDE.md
│   └── MCP_SERVER_MARKETPLACE.md
├── patent/           # 示例文档
├── output/           # 输出目录
├── DOCX_GUIDE.md     # DOCX 使用指南
├── PDF_GUIDE.md      # PDF 使用指南
└── package.json      # 项目配置
```

## 🛠️ 技术栈

- **Node.js** - 运行环境
- **mammoth** - DOCX 文件处理
- **docx** - DOCX 文件创建和修改
- **pdf-parse** - PDF 文件解析
- **pdfjs-dist** - PDF.js 库

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

使用 AI 来生成一些奇奇怪怪的东西 🚀