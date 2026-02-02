import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/app/actions/sendEmail';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const data: any = {};
    
    // Extract text fields
    formData.forEach((value, key) => {
      if (key !== 'files') data[key] = value;
    });

    // Extract files as actual Buffers (FASTER)
    const files = formData.getAll('files') as File[];
    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          name: file.name,
          // We send the raw Buffer, which Nodemailer handles better than Base64 strings
          content: Buffer.from(arrayBuffer), 
          contentType: file.type
        };
      })
    );

    // Pass the raw attachments to your email function
    data.attachments = attachments;

    const result = await sendEmail(data);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error: any) {
    console.error("API ROUTE CRASH:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}