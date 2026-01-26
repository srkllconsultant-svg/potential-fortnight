import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  try {
    // Receive subType from the frontend
    const { templateName, subType } = await req.json();

    // 1. Build the specific filename
    // If subType is "flat", name becomes "Sale Deed_Flat"
    // If subType is empty, it remains "Sale Deed"
    const subSuffix = subType ? `_${subType.charAt(0).toUpperCase() + subType.slice(1)}` : "";
    const finalFileName = `${templateName}${subSuffix}`;

    // 2. Resolve the file path
    let filePath = path.join(process.cwd(), 'lib/templates', `${finalFileName}.docx`);

    // Fallback: If "Sale Deed_Flat.docx" doesn't exist, try the generic "Sale Deed.docx"
    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'lib/templates', `${templateName}.docx`);
    }

    // Check again if even the fallback exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        success: false, 
        error: `Template "${finalFileName}" or fallback not found.` 
      }, { status: 404 });
    }

    const buffer = fs.readFileSync(filePath);

    // 3. Convert to HTML
    const result = await mammoth.convertToHtml({ buffer: buffer }, {
      styleMap: [
        "u => u",
        "strike => del",
        "p[style-name='Center'] => p.text-center",
      ]
    });

    return NextResponse.json({ 
      success: true, 
      html: result.value,
      warnings: result.messages 
    });

  } catch (error) {
    console.error("Conversion Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process document." }, { status: 500 });
  }
}