export type EntityType = 'Individual' | 'Company' | 'LLP' | 'Partnership' | 'Trust' | 'HUF / Joint Family' | 'Government Body';

export interface PartyDetails {
  id: string;
  partyRole: 'Seller' | 'Purchaser' | 'Lessor' | 'Lessee' | 'Licensor' | 'Licensee' | 'Employer' | 'Employee' | 'Disclosing Party' | 'Receiving Party' | 'First Party' | 'Second Party' | 'Borrower' | 'Lender';
  entityType: EntityType;
  fullName: string;
  fatherSpouseName?: string;
  ageDob?: string;
  idType: 'Aadhaar' | 'PAN' | 'SSN' | 'Passport' | 'Driver License' | 'Tax ID / EIN' | 'Corporate Registration / CIN';
  idNumber: string;
  address: string;
  email?: string;
  phone?: string;
  authorizedSignatoryName?: string;
  authorizedSignatoryDesignation?: string;
  sharePercentage?: number;
}

export interface PropertyBoundaries {
  north: string;
  south: string;
  east: string;
  west: string;
}

export interface PropertyDetails {
  propertyType: string; // e.g. "Agricultural Land", "Residential Plot", "Commercial Unit", "Apartment"
  surveyNumber: string; // Survey / Khasra / Khata / Tax Assessment / Parcel ID / APN
  totalArea: string;
  areaUnit: 'sq.ft' | 'acres' | 'sq.yards' | 'sq.meters' | 'hectares' | 'guntha';
  address: string;
  boundaries: PropertyBoundaries;
  registrationSubRegistrarOffice?: string;
  revenueVillage?: string;
  districtCounty?: string;
}

export interface PaymentDetail {
  id: string;
  mode: 'Bank Transfer (RTGS/NEFT)' | 'Cheque' | 'Demand Draft' | 'UPI / Digital Payment' | 'Cash' | 'Escrow' | 'Promissory Note' | 'Wire Transfer';
  referenceNumber: string; // Cheque No / UTR No / Ref ID
  date: string;
  bankName: string;
  amount: number;
  notes?: string;
}

export interface FinancialTerms {
  totalConsideration: number;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD' | 'SGD' | string;
  tokenAmountPaid?: number;
  paymentSchedule: PaymentDetail[];
  stampDutyResponsibility: 'Purchaser' | 'Seller' | 'Shared 50:50' | 'As per Local Act';
}

export interface WitnessDetail {
  id: string;
  fullName: string;
  fatherSpouseName: string;
  idNumber: string;
  address: string;
}

export interface LocationJurisdiction {
  country: string;
  state: string;
  city: string;
  localityType: 'Urban' | 'Rural' | 'Semi-Urban' | 'Special Economic Zone (SEZ)' | 'Sub-Registrar Jurisdiction';
  subRegistrarArea?: string;
  governingLawOverride?: string;
}

export interface CustomClause {
  id: string;
  title: string;
  content: string;
  isMandatory?: boolean;
}

export interface LegalDraftRequest {
  industry: string;
  category: string;
  documentType: string;
  assetType: string;
  jurisdiction: LocationJurisdiction;
  parties: PartyDetails[];
  propertyDetails?: PropertyDetails;
  financialTerms: FinancialTerms;
  witnesses: WitnessDetail[];
  possessionDate?: string;
  governingCourtJurisdiction?: string;
  arbitrationClause: boolean;
  indemnityClause: boolean;
  customClauses: CustomClause[];
  languageStyle: 'Formal Legal Standard' | 'Modern Simplified Legal' | 'Bilingual Standard';
}

export interface GeneratedDraft {
  id: string;
  title: string;
  documentType: string;
  jurisdictionSummary: string;
  documentHtml: string;
  rawMarkdown: string;
  keyClausesIncluded: string[];
  governingLawsCited: string[];
  stampDutyGuidance: string;
  registrationRequirements: string;
  legalRiskAssessment: {
    riskScore: 'Low' | 'Medium' | 'High';
    summary: string;
    recommendations: string[];
  };
  missingInputWarnings: string[];
  generatedAt: string;
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  data: LegalDraftRequest;
}
