import { NextRequest, NextResponse } from 'next/server';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // 1. Load the template file
    const templatePath = path.resolve('./lib/templates', 'sale-deed.docx');
    const content = fs.readFileSync(templatePath, 'binary');

    // 2. Initialize zip and docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 3. Flatten the data for the template
    // This turns [{name: 'John'}] into {name0: 'John'} for Word
    const templateData: any = {};
    data.parties.forEach((party: any, index: number) => {
      Object.keys(party).forEach(key => {
        templateData[`${key}${index}`] = party[key];
      });
    });
const templateData: any = {
  ...data.property // This spreads surveyNo, north, south, etc. into the template
};

data.parties.forEach((party: any, index: number) => {
  Object.keys(party).forEach(key => {
    templateData[`${key}${index}`] = party[key];
  });
});
    // 4. Render the document
    doc.render(templateData);

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    // 5. Return the file
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename=draft.docx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}