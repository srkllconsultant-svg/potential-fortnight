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
Specific Asset / Sub-type: ${draftReq.assetType}
Jurisdiction (City/District/State/Country): ${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country} (${draftReq.jurisdiction.localityType})
Governing Laws: ${draftReq.jurisdiction.governingLawOverride || 'Applicable local real property, registration, stamp acts, and contract codes.'}
Language Style: ${draftReq.languageStyle}

PARTIES INVOLVED:
${JSON.stringify(draftReq.parties, null, 2)}

PROPERTY & LOCATION DETAILS (IF APPLICABLE):
${JSON.stringify(draftReq.propertyDetails || 'None', null, 2)}

FINANCIAL TERMS & CONSIDERATION:
${JSON.stringify(draftReq.financialTerms, null, 2)}

WITNESSES:
${JSON.stringify(draftReq.witnesses, null, 2)}

ADDITIONAL CLAUSES & CONDITIONS:
- Possession Date: ${draftReq.possessionDate || 'Upon Registration'}
- Governing Court Jurisdiction: ${draftReq.governingCourtJurisdiction || draftReq.jurisdiction.city}
- Arbitration Clause: ${draftReq.arbitrationClause ? 'Include standard binding arbitration under local Arbitration Act' : 'Exclude'}
- Indemnity Clause: ${draftReq.indemnityClause ? 'Include comprehensive title and encumbrance indemnity clause' : 'Standard'}
- Custom Clauses: ${JSON.stringify(draftReq.customClauses, null, 2)}

REQUIREMENTS FOR documentHtml:
1. Generate an exhaustive, professional draft with Recitals (WHEREAS), Operative Clauses, Consideration & Payment Schedule Table, Property Schedule, Covenants, Execution & Signature Blocks, and Witness Signature Blocks.
2. Ensure strict compliance with legal terminology and statutory formatting of ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country}.
3. Format documentHtml in clean HTML with bold section titles, numbered paragraphs, structured property schedule tables, and signature blocks.
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
            title: { type: Type.STRING, description: 'Formal title of legal instrument' },
            documentHtml: { type: Type.STRING, description: 'Full HTML formatted document ready for preview and printing' },
            keyClausesIncluded: { type: Type.ARRAY, items: { type: Type.STRING } },
            governingLawsCited: { type: Type.ARRAY, items: { type: Type.STRING } },
            stampDutyGuidance: { type: Type.STRING },
            registrationRequirements: { type: Type.STRING },
            legalRiskAssessment: {
              type: Type.OBJECT,
              properties: {
                riskScore: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                summary: { type: Type.STRING },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ['riskScore', 'summary', 'recommendations']
            },
            missingInputWarnings: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            'title',
            'documentHtml',
            'keyClausesIncluded',
            'governingLawsCited',
            'stampDutyGuidance',
            'registrationRequirements',
            'legalRiskAssessment',
            'missingInputWarnings'
          ]
        }
      }
    });

    let resultJson: any = {};
    const text = response.text || '';
    try {
      let cleaned = text.trim();
      if (cleaned.startsWith('```json')) {
        cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      resultJson = JSON.parse(cleaned);
    } catch {
      resultJson = {
        title: `${draftReq.documentType.toUpperCase()}`,
        documentHtml: `<div style="font-family: serif; padding: 20px;"><h2>${draftReq.documentType}</h2><p>Legal instrument generated for ${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}.</p></div>`,
        keyClausesIncluded: ['Preamble & Recitals', 'Consideration', 'Execution & Signatures'],
        governingLawsCited: ['Local Property & Stamp Acts'],
        stampDutyGuidance: 'Check local Sub-Registrar stamp duty rates.',
        registrationRequirements: 'Submit original ID proofs and two witnesses upon registration.',
        legalRiskAssessment: { riskScore: 'Low', summary: 'Standard draft.', recommendations: [] },
        missingInputWarnings: []
      };
    }

    const generatedDraft = {
      id: `draft_${Date.now()}`,
      title: resultJson.title || draftReq.documentType,
      documentType: draftReq.documentType,
      jurisdictionSummary: `${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country} (${draftReq.jurisdiction.localityType})`,
      documentHtml: resultJson.documentHtml || '<p>Draft error</p>',
      rawMarkdown: '',
      keyClausesIncluded: resultJson.keyClausesIncluded || [],
      governingLawsCited: resultJson.governingLawsCited || [],
      stampDutyGuidance: resultJson.stampDutyGuidance || '',
      registrationRequirements: resultJson.registrationRequirements || '',
      legalRiskAssessment: resultJson.legalRiskAssessment || { riskScore: 'Low', summary: '', recommendations: [] },
      missingInputWarnings: resultJson.missingInputWarnings || [],
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(generatedDraft);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate legal document.' },
      { status: 500 }
    );
  }
}
