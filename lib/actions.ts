"use server";
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

export async function getTemplateContent(docName: string) {
  try {
    const filePath = path.join(process.cwd(), 'lib/templates', `${docName}.docx`);
    if (!fs.existsSync(filePath)) return { success: false, error: "File not found" };

    const buffer = fs.readFileSync(filePath);
    // Convert .docx to HTML to preserve bold, alignment, and numbering
    const result = await mammoth.convertToHtml({ buffer });
    
    return { success: true, html: result.value };
  } catch (error) {
    return { success: false, error: "Conversion failed" };
  }
}