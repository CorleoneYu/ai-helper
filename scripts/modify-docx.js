/**
 * 修改和创建 DOCX 文件的示例脚本
 * 
 * 使用 docx 库创建和修改 docx 文件
 * 支持添加文本、段落、表格、图片等元素
 */

import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 创建新的 docx 文档
 * @param {string} outputPath - 输出文件路径
 */
async function createNewDocx(outputPath) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: '基于智能表格的待办应用专利交底书',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: '这是一个示例文档',
              spacing: { after: 400 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '这是',
                  bold: true,
                }),
                new TextRun({
                  text: '一个',
                  italics: true,
                }),
                new TextRun({
                  text: '示例段落',
                  underline: {},
                }),
              ],
            }),
            // 添加表格
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('项目')],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                    new TableCell({
                      children: [new Paragraph('内容')],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('技术领域')],
                    }),
                    new TableCell({
                      children: [new Paragraph('本发明涉及智能表格技术')],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('技术背景')],
                    }),
                    new TableCell({
                      children: [new Paragraph('现有技术存在以下问题...')],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, buffer);
    
    console.log(`✅ 新文档已创建: ${outputPath}`);
    return buffer;
  } catch (error) {
    console.error('创建文档失败:', error);
    throw error;
  }
}

/**
 * 修改现有 docx 文件（添加内容）
 * 注意：docx 库主要是用于创建新文档，修改现有文档需要先读取内容
 * 
 * @param {string} inputPath - 输入文件路径
 * @param {string} outputPath - 输出文件路径
 */
async function modifyDocx(inputPath, outputPath) {
  try {
    // 读取现有文档内容（这里需要先使用 mammoth 读取）
    // 然后基于读取的内容创建新文档
    const { default: mammoth } = await import('mammoth');
    
    const buffer = await fs.readFile(inputPath);
    const result = await mammoth.convertToMarkdown({ buffer });
    
    // 基于读取的内容创建新文档
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: '修改后的文档',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: '原始内容：',
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: result.value.substring(0, 1000), // 限制长度
            }),
            new Paragraph({
              text: '新增内容：',
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              text: '这是新增的段落内容，演示如何修改现有文档。',
            }),
            new Paragraph({
              text: `修改时间: ${new Date().toLocaleString('zh-CN')}`,
              alignment: AlignmentType.RIGHT,
            }),
          ],
        },
      ],
    });

    const newBuffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, newBuffer);
    
    console.log(`✅ 修改后的文档已保存: ${outputPath}`);
    return newBuffer;
  } catch (error) {
    console.error('修改文档失败:', error);
    throw error;
  }
}

/**
 * 创建包含复杂格式的文档
 * @param {string} outputPath - 输出文件路径
 */
async function createComplexDocx(outputPath) {
  try {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // 标题
            new Paragraph({
              text: '基于智能表格的待办应用专利交底书',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),
            
            // 一级标题
            new Paragraph({
              text: '一、技术领域',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              text: '本发明涉及一种基于智能表格的待办应用系统，具体涉及一种能够自动识别和管理待办事项的智能表格系统。',
            }),
            
            // 二级标题
            new Paragraph({
              text: '二、技术背景',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            new Paragraph({
              text: '随着信息管理需求的不断增长，传统的待办事项管理方式存在以下问题：',
            }),
            new Paragraph({
              children: [
                new TextRun('1. '),
                new TextRun('管理效率低下'),
                new TextRun({ text: '；', break: 1 }),
                new TextRun('2. '),
                new TextRun('缺乏智能化处理能力'),
                new TextRun({ text: '；', break: 1 }),
                new TextRun('3. '),
                new TextRun('无法自动识别和分类待办事项'),
              ],
            }),
            
            // 表格示例
            new Paragraph({
              text: '三、技术方案对比',
              heading: HeadingLevel.HEADING_1,
              spacing: { before: 400, after: 200 },
            }),
            new Table({
              columnWidths: [2505, 2505, 2505],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('技术方案')],
                    }),
                    new TableCell({
                      children: [new Paragraph('优点')],
                    }),
                    new TableCell({
                      children: [new Paragraph('缺点')],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('传统方式')],
                    }),
                    new TableCell({
                      children: [new Paragraph('简单直接')],
                    }),
                    new TableCell({
                      children: [new Paragraph('效率低、易出错')],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph('智能表格')],
                    }),
                    new TableCell({
                      children: [new Paragraph('自动化、智能化')],
                    }),
                    new TableCell({
                      children: [new Paragraph('需要技术支持')],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    await fs.writeFile(outputPath, buffer);
    
    console.log(`✅ 复杂格式文档已创建: ${outputPath}`);
    return buffer;
  } catch (error) {
    console.error('创建复杂文档失败:', error);
    throw error;
  }
}

/**
 * 主函数
 */
async function main() {
  const outputDir = path.join(__dirname, '../output');
  await fs.mkdir(outputDir, { recursive: true });
  
  console.log('📝 开始处理 DOCX 文件...\n');
  
  try {
    // 示例1: 创建新文档
    console.log('='.repeat(60));
    console.log('示例1: 创建新文档');
    console.log('='.repeat(60));
    await createNewDocx(path.join(outputDir, 'new-document.docx'));
    
    // 示例2: 修改现有文档
    console.log('\n' + '='.repeat(60));
    console.log('示例2: 修改现有文档');
    console.log('='.repeat(60));
    const inputPath = path.join(__dirname, '../patent/基于智能表格的待办应用专利交底书_副本.docx');
    await modifyDocx(inputPath, path.join(outputDir, 'modified-document.docx'));
    
    // 示例3: 创建复杂格式文档
    console.log('\n' + '='.repeat(60));
    console.log('示例3: 创建复杂格式文档');
    console.log('='.repeat(60));
    await createComplexDocx(path.join(outputDir, 'complex-document.docx'));
    
    console.log('\n✅ 所有操作完成！');
  } catch (error) {
    console.error('❌ 处理失败:', error.message);
    process.exit(1);
  }
}

// 运行主函数
main();

