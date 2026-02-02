import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export async function POST(req: NextRequest) {
  try {
    const { templateName, userData } = await req.json();
    const subTypeRaw = userData.SUB_TYPE || '';

    // 1. Generate the expected name (e.g., "Sale Deed_Plot.docx")
    // This logic capitalizes the first letter to match your "Sale Deed_Plot" files
    const formattedSubType = subTypeRaw 
      ? `_${subTypeRaw.charAt(0).toUpperCase() + subTypeRaw.slice(1)}` 
      : '';
    
    const fileName = `${templateName}${formattedSubType}.docx`;
    const templatePath = path.resolve(process.cwd(), 'lib/templates', fileName);

    console.log("Looking for:", fileName);

    // 2. Fallback check: If "Sale Deed_Plot" doesn't exist, try "Sale Deed.docx"
    let finalPath = templatePath;
    if (!fs.existsSync(templatePath)) {
      const fallbackName = `${templateName}.docx`;
      const fallbackPath = path.resolve(process.cwd(), 'lib/templates', fallbackName);
      
      if (fs.existsSync(fallbackPath)) {
        finalPath = fallbackPath;
      } else {
        return NextResponse.json({ 
          error: `File not found: ${fileName}`,
          details: `Checked lib/templates for both "${fileName}" and "${fallbackName}"`
        }, { status: 404 });
      }
    }

    // 3. Process the Document
    const content = fs.readFileSync(finalPath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(userData);

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    const finalBuffer = new Uint8Array(buf);

    return new NextResponse(finalBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Length': finalBuffer.byteLength.toString(),
      },
    });

  } catch (error: any) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}