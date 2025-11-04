# PDF 文件读取和转换指南

本指南介绍如何在 Cursor/Node.js 环境中读取 PDF 文件并转换为 Markdown。

## 📦 安装依赖

首先安装必要的 npm 包：

```bash
npm install
```

主要依赖包：
- **pdf-parse** - 用于提取 PDF 文本内容和元数据
- **pdfjs-dist** - Mozilla 的 PDF.js 库，功能更强大（可选）

## 📖 读取 PDF 文件

### 方法一：提取纯文本

```javascript
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';

async function extractText(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text; // 纯文本字符串
}
```

### 方法二：获取 PDF 元数据

```javascript
async function getMetadata(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  
  return {
    info: data.info,           // 文档信息（标题、作者等）
    metadata: data.metadata,   // PDF 元数据
    numPages: data.numpages,   // 页数
    version: data.version,     // PDF 版本
  };
}
```

### 方法三：转换为 Markdown

```javascript
async function pdfToMarkdown(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const data = await pdfParse(dataBuffer);
  
  // 添加标题和元数据
  let markdown = '';
  if (data.info?.Title) {
    markdown += `# ${data.info.Title}\n\n`;
  }
  
  // 添加文档信息
  markdown += '---\n\n';
  markdown += `**页数**: ${data.numpages}\n\n`;
  markdown += '---\n\n';
  
  // 处理文本内容
  const lines = data.text.split('\n');
  // ... 格式化处理 ...
  
  markdown += processedText;
  return markdown;
}
```

### 运行读取脚本

```bash
npm run read-pdf
```

脚本会读取 `patent/发明专利申请交底书填写示范.pdf` 文件，并将结果保存到 `output/` 目录。

## 🎯 功能特性

### 1. 文本提取
- 提取所有页面的文本内容
- 保留基本格式和换行
- 支持多页文档

### 2. 元数据提取
- 文档标题、作者、主题
- 创建日期、修改日期
- 创建工具、生成工具
- 页数、PDF 版本

### 3. Markdown 转换
- 自动识别标题格式
- 保留段落结构
- 添加文档信息头部
- 格式化列表和编号

## 📝 使用示例

### 基本用法

```javascript
import { extractText, pdfToMarkdown, getMetadata } from './scripts/read-pdf.js';

// 提取文本
const text = await extractText('document.pdf');
console.log(text);

// 转换为 Markdown
const markdown = await pdfToMarkdown('document.pdf');
console.log(markdown);

// 获取元数据
const metadata = await getMetadata('document.pdf');
console.log(metadata);
```

### 批量处理

```javascript
import fs from 'fs/promises';
import path from 'path';
import { pdfToMarkdown } from './scripts/read-pdf.js';

async function batchConvert(directory) {
  const files = await fs.readdir(directory);
  const pdfFiles = files.filter(file => file.endsWith('.pdf'));
  
  for (const file of pdfFiles) {
    const filePath = path.join(directory, file);
    const markdown = await pdfToMarkdown(filePath);
    
    const outputPath = path.join(directory, file.replace('.pdf', '.md'));
    await fs.writeFile(outputPath, markdown, 'utf-8');
    
    console.log(`✅ 已转换: ${file} -> ${path.basename(outputPath)}`);
  }
}

batchConvert('./documents');
```

## ⚠️ 注意事项

### 1. PDF 格式限制
- **文本型 PDF**: 可以完美提取文本
- **扫描型 PDF（图片）**: 需要 OCR 处理，无法直接提取文本
- **加密 PDF**: 需要先解密才能读取

### 2. 格式保留
- PDF 中的表格可能无法完美保留格式
- 图片和图表无法提取
- 复杂的布局可能被打乱

### 3. 性能考虑
- 大文件（>100MB）可能需要较长时间
- 多页文档处理时间与页数成正比
- 建议对超大文件进行分页处理

### 4. 编码问题
- 确保 PDF 文件使用标准编码
- 中文 PDF 需要确保正确的字符编码

## 🔧 高级用法

### 使用 pdfjs-dist（更强大的功能）

如果需要更强大的 PDF 处理能力（如提取表格、图片等），可以使用 `pdfjs-dist`：

```javascript
import * as pdfjsLib from 'pdfjs-dist';

async function advancedExtract(filePath) {
  const data = await fs.readFile(filePath);
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdf = await loadingTask.promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    
    const pageText = textContent.items
      .map(item => item.str)
      .join(' ');
    
    fullText += `\n\n--- 第 ${i} 页 ---\n\n${pageText}`;
  }
  
  return fullText;
}
```

### 处理扫描型 PDF（OCR）

对于图片型 PDF，需要使用 OCR 工具：

```bash
# 安装 OCR 工具（如 tesseract）
npm install tesseract.js
```

```javascript
import Tesseract from 'tesseract.js';
import pdfjsLib from 'pdfjs-dist';

async function ocrPdf(filePath) {
  // 1. 提取 PDF 页面为图片
  // 2. 使用 Tesseract 进行 OCR
  // 3. 合并 OCR 结果
}
```

## 📚 相关资源

- [pdf-parse 文档](https://github.com/mozilla/pdf.js)
- [pdfjs-dist 文档](https://mozilla.github.io/pdf.js/)
- [Tesseract.js 文档](https://github.com/naptha/tesseract.js)（OCR）

## 🚀 在 Cursor 中使用

在 Cursor 中，你可以：

1. **直接运行脚本**: 使用终端运行 `npm run read-pdf`
2. **在代码中调用**: 将脚本中的函数导入到你的项目中
3. **交互式使用**: 在 Cursor 的 AI 助手帮助下，直接处理 PDF

例如，你可以直接对 AI 助手说：
- "读取 patent 目录下的 PDF 文件并转换为 Markdown"
- "提取 PDF 中的所有文本"
- "批量转换 PDF 文件"

AI 助手会帮你生成相应的代码或直接处理文件。

## 🔄 与其他格式对比

| 特性 | PDF | DOCX | Markdown |
|------|-----|------|----------|
| 文本提取 | ✅ | ✅ | ✅ |
| 格式保留 | 部分 | ✅ | ✅ |
| 表格提取 | 困难 | ✅ | ✅ |
| 图片提取 | 需要额外处理 | ✅ | ✅ |
| 元数据 | ✅ | ✅ | 有限 |

## 💡 最佳实践

1. **选择合适的工具**: 
   - 简单文本提取 → `pdf-parse`
   - 复杂格式处理 → `pdfjs-dist`

2. **处理大文件**:
   - 分页处理
   - 使用流式处理
   - 添加进度提示

3. **错误处理**:
   - 检查文件是否存在
   - 处理加密 PDF
   - 处理损坏的 PDF

4. **输出优化**:
   - 清理多余空白
   - 格式化 Markdown
   - 添加适当的标题层级

---

**最后更新**: 2024年
**维护者**: AI Helper 项目

