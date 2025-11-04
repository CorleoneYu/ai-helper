/**
 * 读取 PDF 文件并转换为 Markdown 的示例脚本
 * 
 * 使用 pdf-parse 和 pdfjs-dist 库提取 PDF 内容
 * 支持提取文本、元数据，并转换为 Markdown 格式
 */

import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 使用 pdf-parse 提取 PDF 文本内容
 * @param {string} filePath - PDF 文件路径
 * @returns {Promise<{text: string, metadata: object}>} 文本内容和元数据
 */
async function extractTextWithPdfParse(filePath) {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdfParse(dataBuffer);
    
    return {
      text: data.text,
      metadata: {
        info: data.info,
        metadata: data.metadata,
        numPages: data.numpages,
        version: data.version,
      },
    };
  } catch (error) {
    console.error('使用 pdf-parse 提取失败:', error);
    throw error;
  }
}

/**
 * 清理重复字符（处理 PDF 格式问题）
 * @param {string} text - 原始文本
 * @returns {string} 清理后的文本
 */
function cleanDuplicateChars(text) {
  // 处理中文字符重复（如：关关键键 -> 关键）
  let cleaned = text.replace(/([一-龥])/g, (match, char) => {
    // 检查是否有重复
    const repeated = new RegExp(`${char}${char}`, 'g');
    if (repeated.test(text)) {
      // 如果发现重复，只保留一个
      return char;
    }
    return match;
  });
  
  // 清理常见的重复模式（如：关关键键 -> 关键）
  cleaned = cleaned.replace(/([一-龥])\1+/g, '$1');
  
  // 清理连续的空格
  cleaned = cleaned.replace(/ +/g, ' ');
  
  // 清理多余的换行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  return cleaned;
}

/**
 * 将文本转换为 Markdown 格式
 * @param {string} text - 原始文本
 * @param {object} metadata - PDF 元数据
 * @returns {string} Markdown 格式的文本
 */
function convertToMarkdown(text, metadata = {}) {
  let markdown = '';
  
  // 清理文本中的重复字符
  text = cleanDuplicateChars(text);
  
  // 添加文档标题（如果有）
  if (metadata.info?.Title) {
    markdown += `# ${metadata.info.Title}\n\n`;
  }
  
  // 添加文档信息
  if (metadata.info) {
    markdown += '---\n\n';
    markdown += '**文档信息**\n\n';
    
    if (metadata.info.Title) {
      markdown += `- **标题**: ${metadata.info.Title}\n`;
    }
    if (metadata.info.Author) {
      markdown += `- **作者**: ${metadata.info.Author}\n`;
    }
    if (metadata.info.Subject) {
      markdown += `- **主题**: ${metadata.info.Subject}\n`;
    }
    if (metadata.info.Creator) {
      markdown += `- **创建工具**: ${metadata.info.Creator}\n`;
    }
    if (metadata.info.Producer) {
      markdown += `- **生成工具**: ${metadata.info.Producer}\n`;
    }
    if (metadata.info.CreationDate) {
      markdown += `- **创建日期**: ${metadata.info.CreationDate}\n`;
    }
    if (metadata.info.ModDate) {
      markdown += `- **修改日期**: ${metadata.info.ModDate}\n`;
    }
    if (metadata.numPages) {
      markdown += `- **页数**: ${metadata.numPages}\n`;
    }
    
    markdown += '\n---\n\n';
  }
  
  // 处理文本内容
  const lines = text.split('\n');
  const processedLines = [];
  let lastLineWasEmpty = false;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    // 跳过空行（但保留段落间的空行）
    if (!line) {
      if (!lastLineWasEmpty) {
        processedLines.push('');
        lastLineWasEmpty = true;
      }
      continue;
    }
    
    lastLineWasEmpty = false;
    
    // 检测标题格式
    // 1. 中文章节标题（如：第一章、第一条）
    if (line.match(/^第[一二三四五六七八九十\d]+[章节条]/)) {
      processedLines.push(`## ${line}\n`);
    }
    // 2. 带方括号的标题（如：【关键术语】）
    else if (line.match(/^【[^】]+】/)) {
      processedLines.push(`## ${line}\n`);
    }
    // 3. 数字编号标题（如：1、关键术语）
    else if (line.match(/^\d+[、\s]/)) {
      processedLines.push(`## ${line}\n`);
    }
    // 4. 全大写短标题
    else if (line.length < 100 && /^[A-Z\s\d]+$/.test(line) && line.split(' ').length <= 10) {
      processedLines.push(`## ${line}\n`);
    }
    // 5. 列表项
    else if (line.match(/^[\(（][一二三四五六七八九十\d]+[\)）]/)) {
      processedLines.push(`- ${line}\n`);
    }
    // 6. 普通段落
    else {
      // 合并短行（可能是 PDF 换行导致的）
      if (i < lines.length - 1 && lines[i + 1].trim() && 
          !lines[i + 1].trim().match(/^第|^【|^\d+[、\s]/)) {
        line += ' ';
      }
      processedLines.push(`${line}\n`);
    }
  }
  
  // 合并被换行分割的段落
  let mergedText = processedLines.join('');
  // 合并连续的短行（移除不必要的换行）
  mergedText = mergedText.replace(/([^\n])\n([^\n#])/g, '$1 $2');
  
  markdown += mergedText;
  
  return markdown;
}

/**
 * 提取 PDF 并转换为 Markdown
 * @param {string} filePath - PDF 文件路径
 * @returns {Promise<string>} Markdown 内容
 */
async function pdfToMarkdown(filePath) {
  try {
    const { text, metadata } = await extractTextWithPdfParse(filePath);
    const markdown = convertToMarkdown(text, metadata);
    return markdown;
  } catch (error) {
    console.error('PDF 转 Markdown 失败:', error);
    throw error;
  }
}

/**
 * 提取 PDF 纯文本
 * @param {string} filePath - PDF 文件路径
 * @returns {Promise<string>} 纯文本内容
 */
async function extractText(filePath) {
  try {
    const { text } = await extractTextWithPdfParse(filePath);
    return text;
  } catch (error) {
    console.error('提取文本失败:', error);
    throw error;
  }
}

/**
 * 获取 PDF 元数据
 * @param {string} filePath - PDF 文件路径
 * @returns {Promise<object>} PDF 元数据
 */
async function getMetadata(filePath) {
  try {
    const { metadata } = await extractTextWithPdfParse(filePath);
    return metadata;
  } catch (error) {
    console.error('获取元数据失败:', error);
    throw error;
  }
}

/**
 * 主函数 - 读取并转换 PDF 文件
 */
async function main() {
  const pdfPath = path.join(__dirname, '../patent/发明专利申请交底书填写示范.pdf');
  
  console.log('📄 正在读取 PDF 文件...\n');
  console.log(`文件路径: ${pdfPath}\n`);
  
  try {
    // 检查文件是否存在
    try {
      await fs.access(pdfPath);
    } catch {
      console.error(`❌ 文件不存在: ${pdfPath}`);
      console.log('\n💡 提示: 请确保 PDF 文件存在于指定路径');
      process.exit(1);
    }
    
    // 方式1: 提取元数据
    console.log('='.repeat(60));
    console.log('方式1: 提取 PDF 元数据');
    console.log('='.repeat(60));
    const metadata = await getMetadata(pdfPath);
    console.log('元数据:', JSON.stringify(metadata, null, 2));
    console.log('');
    
    // 方式2: 提取纯文本
    console.log('='.repeat(60));
    console.log('方式2: 提取纯文本');
    console.log('='.repeat(60));
    const text = await extractText(pdfPath);
    console.log(`文本长度: ${text.length} 字符`);
    console.log(`前 500 字符预览:\n${text.substring(0, 500)}...\n`);
    
    // 方式3: 转换为 Markdown
    console.log('='.repeat(60));
    console.log('方式3: 转换为 Markdown');
    console.log('='.repeat(60));
    const markdown = await pdfToMarkdown(pdfPath);
    console.log(`Markdown 长度: ${markdown.length} 字符`);
    console.log(`前 500 字符预览:\n${markdown.substring(0, 500)}...\n`);
    
    // 保存结果到文件
    const outputDir = path.join(__dirname, '../output');
    await fs.mkdir(outputDir, { recursive: true });
    
    // 保存纯文本
    await fs.writeFile(
      path.join(outputDir, 'pdf-content.txt'),
      text,
      'utf-8'
    );
    console.log('✅ 纯文本已保存到: output/pdf-content.txt');
    
    // 保存 Markdown
    await fs.writeFile(
      path.join(outputDir, 'pdf-content.md'),
      markdown,
      'utf-8'
    );
    console.log('✅ Markdown 已保存到: output/pdf-content.md');
    
    // 保存元数据
    await fs.writeFile(
      path.join(outputDir, 'pdf-metadata.json'),
      JSON.stringify(metadata, null, 2),
      'utf-8'
    );
    console.log('✅ 元数据已保存到: output/pdf-metadata.json');
    
    console.log('\n✅ 所有操作完成！');
  } catch (error) {
    console.error('❌ 处理失败:', error.message);
    if (error.stack) {
      console.error('错误堆栈:', error.stack);
    }
    process.exit(1);
  }
}

// 运行主函数
main();

