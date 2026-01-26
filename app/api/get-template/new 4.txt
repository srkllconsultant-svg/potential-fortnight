import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  try {
    const { templateName } = await req.json();

    // 1. Path to your templates folder
    // Ensure your .docx files are in /public/templates/ or a secure data folder
    const filePath = path.join(process.cwd(), 'lib/templates', `${templateName}.docx`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: "Template file not found." }, { status: 404 });
    }

    // 2. Read the file into a buffer
    const buffer = fs.readFileSync(filePath);

    // 3. Convert .docx to HTML using Mammoth
    // Mammoth maps Word styles to HTML tags automatically
    const result = await mammoth.convertToHtml({ buffer: buffer }, {
      styleMap: [
        "u => u", // Preserve underlines
        "strike => del",
        "p[style-name='Center'] => p.text-center", // Optional: Map custom word styles
      ]
    });

    const html = result.value; // The generated HTML
    const messages = result.messages; // Any warnings (useful for debugging)

    return NextResponse.json({ 
      success: true, 
      html: html,
      warnings: messages 
    });

  } catch (error) {
    console.error("Conversion Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process document." }, { status: 500 });
  }
}