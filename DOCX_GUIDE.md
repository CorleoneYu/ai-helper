# DOCX 文件读取和修改指南

本指南介绍如何在 Cursor/Node.js 环境中读取和修改 `.docx` 文件。

## 📦 安装依赖

首先安装必要的 npm 包：

```bash
npm install
```

主要依赖包：
- **mammoth** - 用于读取 docx 文件内容（转换为 HTML/Markdown）
- **docx** - 用于创建和修改 docx 文件
- **pizzip** - 用于直接操作 docx 的底层结构（mammoth 的依赖）

## 📖 读取 DOCX 文件

### 方法一：转换为 HTML（保留格式）

```javascript
import mammoth from 'mammoth';
import fs from 'fs/promises';

async function readAsHtml(filePath) {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.convertToHtml({ buffer });
  return result.value; // HTML 字符串
}
```

### 方法二：转换为 Markdown

```javascript
async function readAsMarkdown(filePath) {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.convertToMarkdown({ buffer });
  return result.value; // Markdown 字符串
}
```

### 方法三：提取纯文本

```javascript
async function extractText(filePath) {
  const buffer = await fs.readFile(filePath);
  const result = await mammoth.extractRawText({ buffer });
  return result.value; // 纯文本字符串
}
```

### 运行读取脚本

```bash
npm run read-docx
```

脚本会读取 `patent/基于智能表格的待办应用专利交底书_副本.docx` 文件，并将结果保存到 `output/` 目录。

## ✏️ 修改/创建 DOCX 文件

### 创建新文档

```javascript
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: '标题',
          heading: HeadingLevel.HEADING_1,
        }),
        new Paragraph({
          text: '正文内容',
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
await fs.writeFile('output.docx', buffer);
```

### 修改现有文档

由于 `docx` 库主要用于创建新文档，修改现有文档的流程是：

1. 使用 `mammoth` 读取现有文档内容
2. 基于读取的内容创建新文档
3. 添加新内容或修改内容
4. 保存为新文档

```javascript
// 读取现有文档
const buffer = await fs.readFile('input.docx');
const result = await mammoth.convertToMarkdown({ buffer });

// 基于读取的内容创建新文档
const doc = new Document({
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: result.value, // 原始内容
        }),
        new Paragraph({
          text: '新增内容', // 新内容
        }),
      ],
    },
  ],
});

const newBuffer = await Packer.toBuffer(doc);
await fs.writeFile('modified.docx', newBuffer);
```

### 运行修改脚本

```bash
npm run modify-docx
```

脚本会演示：
1. 创建新文档
2. 修改现有文档（添加新内容）
3. 创建包含复杂格式的文档（表格、标题等）

## 🎯 常用功能示例

### 添加段落

```javascript
new Paragraph({
  text: '普通段落',
}),
```

### 添加格式化文本

```javascript
new Paragraph({
  children: [
    new TextRun({ text: '粗体', bold: true }),
    new TextRun({ text: '斜体', italics: true }),
    new TextRun({ text: '下划线', underline: {} }),
  ],
}),
```

### 添加标题

```javascript
new Paragraph({
  text: '一级标题',
  heading: HeadingLevel.HEADING_1,
}),
```

### 添加表格

```javascript
new Table({
  rows: [
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph('单元格1')],
        }),
        new TableCell({
          children: [new Paragraph('单元格2')],
        }),
      ],
    }),
  ],
}),
```

### 设置对齐方式

```javascript
new Paragraph({
  text: '居中文本',
  alignment: AlignmentType.CENTER,
}),
```

### 设置间距

```javascript
new Paragraph({
  text: '带间距的段落',
  spacing: { before: 400, after: 200 },
}),
```

## 📚 更多资源

- [mammoth 文档](https://github.com/mwilliamson/mammoth.js)
- [docx 文档](https://github.com/dolanmiu/docx)
- [docx 示例](https://github.com/dolanmiu/docx/tree/master/demo)

## ⚠️ 注意事项

1. **读取限制**：`mammoth` 主要用于转换文档格式，可能无法完美保留所有格式细节
2. **修改限制**：`docx` 库主要用于创建新文档，修改现有文档需要先读取内容再重建
3. **复杂格式**：对于复杂的格式（如页眉页脚、水印等），可能需要使用更底层的库（如 `pizzip`）
4. **编码问题**：处理中文文件名时，确保文件系统支持 UTF-8 编码

## 🔧 在 Cursor 中使用

在 Cursor 中，你可以：

1. **直接运行脚本**：使用终端运行 `npm run read-docx` 或 `npm run modify-docx`
2. **在代码中调用**：将脚本中的函数导入到你的项目中
3. **交互式使用**：在 Cursor 的 AI 助手帮助下，直接编写代码处理文档

例如，你可以直接对 AI 助手说：
- "读取 patent 目录下的 docx 文件"
- "修改文档，添加一个新的段落"
- "提取文档中的所有标题"

AI 助手会帮你生成相应的代码。

