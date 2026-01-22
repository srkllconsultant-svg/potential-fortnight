import { NextRequest, NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { templateName, userData } = await req.json();
    
    // 1. Map the friendly name to your actual file system names
    const fileNameMap: Record<string, string> = {
      "Sale Deed": "sale-deed.docx",
      "Agreement of Sale": "agreement-sale.docx",
      "Lease Deed": "lease-deed.docx",
    };

    const targetFile = fileNameMap[templateName] || 'default-template.docx';
    const templatePath = path.resolve('./lib/templates', targetFile);

    if (!fs.existsSync(templatePath)) {
      return NextResponse.json({ error: 'Template file not found' }, { status: 404 });
    }

    const content = fs.readFileSync(templatePath, 'binary');

    // 2. Initialize zip and docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 3. Prepare Template Data
    const finalTemplateData = {
      ...userData,
      TODAY_DATE: new Date().toLocaleDateString('en-IN'),
    };

    // 4. Render the document
    try {
      doc.render(finalTemplateData);
    } catch (renderError) {
      console.error("Docxtemplater Render Error:", renderError);
      return NextResponse.json({ error: 'Error filling template tags' }, { status: 500 });
    }

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // 5. Return the file as a downloadable blob
    // FIXED: Wrapped 'buf' (Node Buffer) in 'new Uint8Array()' for Next.js 16 compatibility
    const safeFileName = (templateName || 'Document').replace(/\s+/g, '_');
    
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        'Content-Disposition': `attachment; filename="${safeFileName}_Draft.docx"`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });

  } catch (error) {
    console.error("Global API Error:", error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}