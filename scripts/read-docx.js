/**
 * 读取 DOCX 文件的示例脚本
 * 
 * 使用 mammoth 库将 docx 文件转换为 HTML 或 Markdown
 * 支持保留格式、提取文本等多种方式
 */

import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 读取 docx 文件并转换为 HTML
 * @param {string} filePath - docx 文件路径
 * @returns {Promise<string>} HTML 内容
 */
async function readDocxAsHtml(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.convertToHtml({ buffer });
    
    if (result.messages.length > 0) {
      console.warn('转换警告:', result.messages);
    }
    
    return result.value;
  } catch (error) {
    console.error('读取文件失败:', error);
    throw error;
  }
}

/**
 * 读取 docx 文件并转换为 Markdown
 * @param {string} filePath - docx 文件路径
 * @returns {Promise<string>} Markdown 内容
 */
async function readDocxAsMarkdown(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.convertToMarkdown({ buffer });
    
    if (result.messages.length > 0) {
      console.warn('转换警告:', result.messages);
    }
    
    return result.value;
  } catch (error) {
    console.error('读取文件失败:', error);
    throw error;
  }
}

/**
 * 提取 docx 文件的纯文本内容
 * @param {string} filePath - docx 文件路径
 * @returns {Promise<string>} 纯文本内容
 */
async function extractText(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    const result = await mammoth.extractRawText({ buffer });
    
    if (result.messages.length > 0) {
      console.warn('提取警告:', result.messages);
    }
    
    return result.value;
  } catch (error) {
    console.error('提取文本失败:', error);
    throw error;
  }
}

/**
 * 主函数 - 读取并显示 docx 文件内容
 */
async function main() {
  const docxPath = path.join(__dirname, '../patent/基于智能表格的待办应用专利交底书_副本.docx');
  
  console.log('📄 正在读取 DOCX 文件...\n');
  console.log(`文件路径: ${docxPath}\n`);
  
  try {
    // 方式1: 转换为 HTML
    console.log('='.repeat(60));
    console.log('方式1: 转换为 HTML');
    console.log('='.repeat(60));
    const html = await readDocxAsHtml(docxPath);
    console.log(html.substring(0, 500) + '...\n');
    
    // 方式2: 转换为 Markdown
    console.log('='.repeat(60));
    console.log('方式2: 转换为 Markdown');
    console.log('='.repeat(60));
    const markdown = await readDocxAsMarkdown(docxPath);
    console.log(markdown.substring(0, 500) + '...\n');
    
    // 方式3: 提取纯文本
    console.log('='.repeat(60));
    console.log('方式3: 提取纯文本');
    console.log('='.repeat(60));
    const text = await extractText(docxPath);
    console.log(text.substring(0, 500) + '...\n');
    
    // 保存结果到文件
    const outputDir = path.join(__dirname, '../output');
    await fs.mkdir(outputDir, { recursive: true });
    
    await fs.writeFile(
      path.join(outputDir, 'docx-content.html'),
      html,
      'utf-8'
    );
    console.log('✅ HTML 内容已保存到: output/docx-content.html');
    
    await fs.writeFile(
      path.join(outputDir, 'docx-content.md'),
      markdown,
      'utf-8'
    );
    console.log('✅ Markdown 内容已保存到: output/docx-content.md');
    
    await fs.writeFile(
      path.join(outputDir, 'docx-content.txt'),
      text,
      'utf-8'
    );
    console.log('✅ 纯文本内容已保存到: output/docx-content.txt');
    
  } catch (error) {
    console.error('❌ 处理失败:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();

