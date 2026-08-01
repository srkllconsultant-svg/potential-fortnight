import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const draftReq = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY environment variable is missing on the server.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
You are an expert Senior Legal Counsel and Statutory Conveyancer. Draft a comprehensive, court-admissible legal document according to the following specifications:

Legal Master Category: ${draftReq.category}
Instrument Type: ${draftReq.documentType}
Jurisdiction: ${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country} (${draftReq.jurisdiction.localityType})
Parties: ${JSON.stringify(draftReq.parties, null, 2)}
Financial Terms: ${JSON.stringify(draftReq.financialTerms, null, 2)}

REQUIREMENTS:
1. Generate an exhaustive legal draft with Recitals (WHEREAS), Operative Clauses, Consideration, Execution & Signature Blocks.
2. Ensure strict compliance with legal terminology of ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country}.
3. Format documentHtml in clean HTML with bold section titles, numbered paragraphs, and signature blocks.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            documentHtml: { type: Type.STRING },
            stampDutyGuidance: { type: Type.STRING },
            legalRiskAssessment: {
              type: Type.OBJECT,
              properties: {
                riskScore: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                summary: { type: Type.STRING }
              },
              required: ['riskScore', 'summary']
            }
          },
          required: ['title', 'documentHtml', 'stampDutyGuidance', 'legalRiskAssessment']
        }
      }
    });

    const resultJson = JSON.parse(response.text || '{}');

    return NextResponse.json({
      id: `draft_${Date.now()}`,
      title: resultJson.title || draftReq.documentType,
      documentType: draftReq.documentType,
      jurisdictionSummary: `${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}`,
      documentHtml: resultJson.documentHtml || '<p>Draft error</p>',
      stampDutyGuidance: resultJson.stampDutyGuidance || '',
      legalRiskAssessment: resultJson.legalRiskAssessment || { riskScore: 'Low', summary: '' }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to generate legal document.' },
      { status: 500 }
    );
  }
}
