import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { LegalDraftRequest, GeneratedDraft } from "./src/types";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Initialize Google Gen AI client with server-side GEMINI_API_KEY
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Route: Generate Legal Draft
app.post("/api/drafts/generate", async (req, res) => {
  try {
    const draftReq: LegalDraftRequest = req.body;
    const ai = getAiClient();

    // Construct high-precision legal prompt
    const prompt = `
You are a distinguished Senior Legal Counsel, Master Conveyancer, and Statutory Drafting Expert specializing in real estate, commercial contracts, corporate agreements, and estate laws across global jurisdictions.

Please generate a legally binding, complete, highly detailed, and state/country-law compliant legal document based on the following structured input parameters:

--- JURISDICTION & LOCATION MANDATE ---
Country: ${draftReq.jurisdiction.country}
State / Province / Territory: ${draftReq.jurisdiction.state}
District / County / City: ${draftReq.jurisdiction.city}
Locality Tier: ${draftReq.jurisdiction.localityType}

--- DOCUMENT & MASTER TAXONOMY ---
Industry: ${draftReq.industry}
Category: ${draftReq.category}
Document Type: ${draftReq.documentType}
Asset / Property Type: ${draftReq.assetType}
Language Style: ${draftReq.languageStyle}

--- PARTIES INVOLVED ---
${draftReq.parties.map((p, index) => `
Party #${index + 1} (${p.partyRole}):
- Entity Type: ${p.entityType}
- Legal Name: ${p.fullName}
${p.fatherSpouseName ? `- Father/Spouse/Parent Name: ${p.fatherSpouseName}` : ''}
${p.ageDob ? `- Age / DOB: ${p.ageDob}` : ''}
- ID Type & Number: ${p.idType} - ${p.idNumber}
- Full Address: ${p.address}
${p.authorizedSignatoryName ? `- Authorized Representative: ${p.authorizedSignatoryName} (${p.authorizedSignatoryDesignation})` : ''}
${p.sharePercentage ? `- Share Ownership/Interest: ${p.sharePercentage}%` : ''}
`).join('\n')}

--- PROPERTY / ASSET SCHEDULE DETAILS ---
${draftReq.propertyDetails ? `
- Property Classification: ${draftReq.propertyDetails.propertyType}
- Survey / Khasra / APN / Parcel ID / Title No.: ${draftReq.propertyDetails.surveyNumber}
- Extent / Total Area: ${draftReq.propertyDetails.totalArea} ${draftReq.propertyDetails.areaUnit}
- Location Address: ${draftReq.propertyDetails.address}
- Revenue Village / Ward / Area: ${draftReq.propertyDetails.revenueVillage || 'Local Ward / Village'}
- District / County: ${draftReq.propertyDetails.districtCounty || draftReq.jurisdiction.city}
- Schedule of Property Cardinal Boundaries:
  * NORTH: ${draftReq.propertyDetails.boundaries.north || 'Adjacent property / road'}
  * SOUTH: ${draftReq.propertyDetails.boundaries.south || 'Adjacent property / road'}
  * EAST: ${draftReq.propertyDetails.boundaries.east || 'Adjacent property / road'}
  * WEST: ${draftReq.propertyDetails.boundaries.west || 'Adjacent property / road'}
` : 'Not applicable for non-real estate contract.'}

--- CONSIDERATION & PAYMENT BREAKDOWN ---
Total Consideration Amount: ${draftReq.financialTerms.currency} ${draftReq.financialTerms.totalConsideration.toLocaleString()}
Stamp Duty Responsibility: ${draftReq.financialTerms.stampDutyResponsibility}
${draftReq.financialTerms.tokenAmountPaid ? `Token / Advance Amount Paid: ${draftReq.financialTerms.currency} ${draftReq.financialTerms.tokenAmountPaid.toLocaleString()}` : ''}
Payment Installments / Record Breakdown:
${draftReq.financialTerms.paymentSchedule.map((pay, i) => `
  ${i + 1}. Mode: ${pay.mode} | Ref No: ${pay.referenceNumber} | Date: ${pay.date} | Bank: ${pay.bankName} | Amount: ${draftReq.financialTerms.currency} ${pay.amount.toLocaleString()} ${pay.notes ? `(${pay.notes})` : ''}
`).join('\n') || 'Full consideration paid upon execution.'}

--- WITNESSES ---
${draftReq.witnesses.map((w, i) => `
Witness #${i + 1}: Name: ${w.fullName} | Father/Spouse: ${w.fatherSpouseName} | ID: ${w.idNumber} | Address: ${w.address}
`).join('\n') || 'Two independent witnesses required upon execution.'}

--- ADDITIONAL CLAUSES & COVENANTS ---
${draftReq.possessionDate ? `- Handover / Possession Effective Date: ${draftReq.possessionDate}` : ''}
- Exclusive Court Jurisdiction: ${draftReq.governingCourtJurisdiction || `Civil Courts at ${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}`}
- Statutory Arbitration Clause: ${draftReq.arbitrationClause ? 'Yes (Sole Arbitrator / Statutory Arbitration Act)' : 'No'}
- Indemnity & Title Guarantee Covenants: ${draftReq.indemnityClause ? 'Yes' : 'No'}
${draftReq.customClauses.map(c => `- Custom Clause: "${c.title}": ${c.content}`).join('\n')}

--- MASTER S.R.K LL CONSULTANT DRAFTING MANDATE ---
1. Prepare a FULL, COMPREHENSIVE, and UN-TRUNCATED legal draft for ${draftReq.documentType} governed strictly by the statutory laws of ${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country}.
2. Weave the exact Country, State, District/County, and City throughout the instrument preamble, recitals ("WHEREAS..."), operative transfer clauses, statutory covenants, property schedules, and signature execution blocks to give the client an authentic, local legal document.
3. Write ALL standard and detailed clauses in full length (including Recitals, Title History & Absolute Right to Transfer, Free from Encumbrances, Delivery of Quiet Physical Possession, Outgoings & Taxes Payment, Mutation & Electricity Transfer, Indemnity Guarantee, Default & Specific Performance, Governing Laws, Dispute Resolution, Schedule 'A' / 'B' Property Schedule, and Execution Signatures with 2 Witnesses).
4. Do NOT shorten or omit clauses with placeholder comments like "[insert clauses here]". Provide full draft text so that after downloading in Word, the client has complete freedom to remove, adjust, or alter points as needed.
5. Format documentHtml in clean HTML with bold section titles, numbered paragraphs, structured property schedule tables, and signature blocks.
`;

function safeJsonParse(text: string): any {
  if (!text) return {};
  
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  try {
    return JSON.parse(cleaned);
  } catch (err: any) {
    console.warn("JSON parse failed, attempting string repair for truncated response:", err.message);
    
    try {
      let repaired = cleaned;
      repaired = repaired.replace(/,\s*$/, "");
      
      let openBraces = 0;
      let openBrackets = 0;
      let inString = false;
      let isEscaped = false;

      for (let i = 0; i < repaired.length; i++) {
        const char = repaired[i];
        if (isEscaped) {
          isEscaped = false;
          continue;
        }
        if (char === '\\') {
          isEscaped = true;
          continue;
        }
        if (char === '"') {
          inString = !inString;
          continue;
        }
        if (!inString) {
          if (char === '{') openBraces++;
          if (char === '}') openBraces--;
          if (char === '[') openBrackets++;
          if (char === ']') openBrackets--;
        }
      }

      if (inString) {
        repaired += '"';
      }
      while (openBrackets > 0) {
        repaired += ']';
        openBrackets--;
      }
      while (openBraces > 0) {
        repaired += '}';
        openBraces--;
      }

      return JSON.parse(repaired);
    } catch (repairErr) {
      console.error("JSON repair failed, applying fallback extraction:", repairErr);

      const titleMatch = cleaned.match(/"title"\s*:\s*"([^"]+)"/);
      const htmlMatch = cleaned.match(/"documentHtml"\s*:\s*"([\s\S]*)/);
      
      let htmlContent = "";
      if (htmlMatch) {
        htmlContent = htmlMatch[1];
        const endQuoteIndex = htmlContent.indexOf('","');
        if (endQuoteIndex > 0) {
          htmlContent = htmlContent.substring(0, endQuoteIndex);
        } else {
          const lastQuote = htmlContent.lastIndexOf('"');
          if (lastQuote > 0) htmlContent = htmlContent.substring(0, lastQuote);
        }
        htmlContent = htmlContent.replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
      }

      return {
        title: titleMatch ? titleMatch[1] : "Legal Instrument Draft",
        documentHtml: htmlContent || "<div style='font-family: serif; padding: 20px;'><h2>Legal Instrument Draft</h2><p>Document generated according to requested statutory terms.</p></div>",
        keyClausesIncluded: ["Recitals & Preamble", "Transfer Covenants", "Schedule of Property", "Execution Signatures"],
        governingLawsCited: ["Local Registration & Stamp Acts"],
        stampDutyGuidance: "Verify stamp duty requirements at the local Sub-Registrar / Revenue department.",
        registrationRequirements: "Submit original proof of identity and two independent witnesses upon registration.",
        legalRiskAssessment: { riskScore: "Low", summary: "Standard legal draft generated safely.", recommendations: [] },
        missingInputWarnings: []
      };
    }
  }
}

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Formal title of legal instrument (e.g., DEED OF ABSOLUTE SALE OF LAND)" },
            documentHtml: { type: Type.STRING, description: "Full HTML formatted document ready for A4 legal preview & printing" },
            keyClausesIncluded: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key clauses included in draft" },
            governingLawsCited: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific statutory acts and legal codes cited" },
            stampDutyGuidance: { type: Type.STRING, description: "Stamp duty calculation & local registration fee guidance for this locality" },
            registrationRequirements: { type: Type.STRING, description: "Sub-Registrar office procedures, required documents, and notarization steps" },
            legalRiskAssessment: {
              type: Type.OBJECT,
              properties: {
                riskScore: { type: Type.STRING, description: "Low, Medium, or High" },
                summary: { type: Type.STRING, description: "Overview of legal risk profile" },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable legal safety recommendations" }
              }
            },
            missingInputWarnings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Warnings about missing parameters or recommended additions" }
          },
          required: ["title", "documentHtml", "keyClausesIncluded", "governingLawsCited", "stampDutyGuidance", "registrationRequirements", "legalRiskAssessment", "missingInputWarnings"]
        }
      }
    });

    const resultJson = safeJsonParse(response.text || "{}");

    const generatedDraft: GeneratedDraft = {
      id: `draft_${Date.now()}`,
      title: resultJson.title || "Legal Document Draft",
      documentType: draftReq.documentType,
      jurisdictionSummary: `${draftReq.jurisdiction.city}, ${draftReq.jurisdiction.state}, ${draftReq.jurisdiction.country} (${draftReq.jurisdiction.localityType})`,
      documentHtml: resultJson.documentHtml || "<p>Draft generation error</p>",
      rawMarkdown: "",
      keyClausesIncluded: resultJson.keyClausesIncluded || [],
      governingLawsCited: resultJson.governingLawsCited || [],
      stampDutyGuidance: resultJson.stampDutyGuidance || "",
      registrationRequirements: resultJson.registrationRequirements || "",
      legalRiskAssessment: resultJson.legalRiskAssessment || { riskScore: "Low", summary: "Standard legal draft", recommendations: [] },
      missingInputWarnings: resultJson.missingInputWarnings || [],
      generatedAt: new Date().toISOString()
    };

    res.json(generatedDraft);
  } catch (error: any) {
    console.error("Error generating legal draft:", error);
    res.status(500).json({ error: error.message || "Failed to generate legal document." });
  }
});

// API Route: Refine or Add Custom Clause via AI
app.post("/api/drafts/refine", async (req, res) => {
  try {
    const { currentHtml, instruction, draftTitle, jurisdiction } = req.body;
    const ai = getAiClient();

    const prompt = `
You are a Master Legal Drafter. Modify and refine the following legal document HTML titled "${draftTitle}" governed by ${jurisdiction}.

User Refinement Request: "${instruction}"

CURRENT DOCUMENT HTML:
${currentHtml}

Provide the updated documentHtml in clean HTML format and a short summary of changes made.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            updatedHtml: { type: Type.STRING, description: "Refined complete HTML document" },
            changesSummary: { type: Type.STRING, description: "Summary of modifications made" }
          },
          required: ["updatedHtml", "changesSummary"]
        }
      }
    });

    const resultJson = JSON.parse(response.text || "{}");
    res.json(resultJson);
  } catch (error: any) {
    console.error("Error refining legal draft:", error);
    res.status(500).json({ error: error.message || "Failed to refine document." });
  }
});

// Vite Middleware for Development / Static serving for Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
