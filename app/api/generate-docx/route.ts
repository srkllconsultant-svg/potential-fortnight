import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function POST(req: NextRequest) {
  try {
    const { templateName, userData } = await req.json();

    // 1. Load the original .docx file as binary
    const templatePath = path.join(process.cwd(), 'lib/templates', `${templateName}.docx`);
    
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    const content = fs.readFileSync(templatePath, "binary");

    // 2. Initialize Zip and Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 3. Inject Data
    doc.render(userData);

    // 4. Generate the buffer
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    // 5. Return the file for download
    // FIXED: Wrapped 'buf' in new Uint8Array() to satisfy TypeScript/Web API standards
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${templateName}.docx"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });

  } catch (error) {
    console.error("DOCX Export Error:", error);
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 });
  }
}