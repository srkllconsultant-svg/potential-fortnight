'use client';

import React, { useState } from 'react';
import {
  FileText,
  Scale,
  MapPin,
  Users,
  DollarSign,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  AlertCircle,
  RefreshCw,
  Layers,
  CheckCircle2,
  Copy,
  FileCode,
  Check,
  ChevronRight,
  Plus,
  Trash2,
  Edit3,
  ArrowRight,
  BookOpen,
  Clock
} from 'lucide-react';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

// ==========================================
// 1. TYPES & DATA STRUCTURES
// ==========================================

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
  propertyType: string;
  surveyNumber: string;
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
  referenceNumber: string;
  date: string;
  bankName: string;
  amount: number;
  notes?: string;
}

export interface FinancialTerms {
  totalConsideration: number;
  currency: string;
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

// ==========================================
// 2. JURISDICTIONS DATA
// ==========================================

export const GLOBAL_JURISDICTIONS = [
  {
    code: 'IN',
    name: 'India',
    currencyCode: 'INR',
    defaultGoverningLaw: 'Transfer of Property Act 1882, Indian Registration Act 1908, Indian Stamp Act 1899',
    states: [
      { name: 'Maharashtra', districtsOrCounties: ['Pune District', 'Mumbai City & Suburban', 'Thane District', 'Nagpur District'], cities: ['Mumbai', 'Pune', 'Thane', 'Navi Mumbai'] },
      { name: 'Karnataka', districtsOrCounties: ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru District'], cities: ['Bengaluru', 'Mysuru', 'Mangaluru'] },
      { name: 'Delhi (NCR)', districtsOrCounties: ['New Delhi District', 'South Delhi', 'North Delhi'], cities: ['New Delhi', 'Gurugram', 'Noida'] },
      { name: 'Tamil Nadu', districtsOrCounties: ['Chennai District', 'Coimbatore District'], cities: ['Chennai', 'Coimbatore', 'Madurai'] }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    currencyCode: 'USD',
    defaultGoverningLaw: 'State Real Property Law & Uniform Commercial Code (UCC)',
    states: [
      { name: 'California', districtsOrCounties: ['Los Angeles County', 'San Francisco County', 'Santa Clara County'], cities: ['Los Angeles', 'San Francisco', 'San Jose'] },
      { name: 'New York', districtsOrCounties: ['New York County (Manhattan)', 'Kings County (Brooklyn)'], cities: ['New York City', 'Buffalo', 'Albany'] },
      { name: 'Texas', districtsOrCounties: ['Harris County (Houston)', 'Dallas County', 'Travis County (Austin)'], cities: ['Houston', 'Dallas', 'Austin'] }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currencyCode: 'GBP',
    defaultGoverningLaw: 'Law of Property Act 1925 & Land Registration Act 2002',
    states: [
      { name: 'England & Wales', districtsOrCounties: ['Greater London', 'Greater Manchester'], cities: ['London', 'Birmingham', 'Manchester'] },
      { name: 'Scotland', districtsOrCounties: ['City of Edinburgh', 'Glasgow City'], cities: ['Edinburgh', 'Glasgow'] }
    ]
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currencyCode: 'AED',
    defaultGoverningLaw: 'UAE Civil Code & Dubai Land Department (DLD) Regulations / DIFC Laws',
    states: [
      { name: 'Dubai Emirate', districtsOrCounties: ['Downtown Dubai Zone', 'Dubai Marina & JBR', 'DIFC Freezone'], cities: ['Dubai Downtown', 'Dubai Marina', 'Business Bay'] },
      { name: 'Abu Dhabi Emirate', districtsOrCounties: ['Abu Dhabi Island Sector', 'Yas & Saadiyat Investment Zones'], cities: ['Abu Dhabi City', 'Yas Island'] }
    ]
  }
];

// ==========================================
// 3. TAXONOMY TREE & PRESETS
// ==========================================

export const LEGAL_TAXONOMY_TREE = [
  {
    id: 'real_estate',
    name: 'Real Estate & Conveyancing',
    description: 'Deeds of Sale, Leases, Mortgages, Development Agreements & Land Transfers',
    documents: [
      { name: 'Deed of Absolute Sale of Land / Property', requiresProperty: true },
      { name: 'Commercial Lease Agreement', requiresProperty: true },
      { name: 'Residential Tenancy / Rent Agreement', requiresProperty: true },
      { name: 'Leave & License Agreement', requiresProperty: true },
      { name: 'Gift Deed of Immovable Property', requiresProperty: true },
      { name: 'Joint Development Agreement (JDA)', requiresProperty: true }
    ]
  },
  {
    id: 'corporate_commercial',
    name: 'Corporate & Commercial Contracts',
    description: 'Shareholders, Joint Ventures, Service Agreements & IP Transfer',
    documents: [
      { name: 'Non-Disclosure Agreement (Mutual NDA)', requiresProperty: false },
      { name: 'Master Services Agreement (MSA)', requiresProperty: false },
      { name: 'Shareholders Agreement (SHA)', requiresProperty: false },
      { name: 'Employment & Invention Assignment Contract', requiresProperty: false }
    ]
  }
];

export const SAMPLE_PRESETS = [
  {
    id: 'pune_sale_deed',
    name: 'Sale Deed (Agricultural Land, Pune)',
    description: 'High-value agricultural plot transfer in Haveli Taluka, Pune, Maharashtra',
    data: {
      industry: 'Legal & Corporate',
      category: 'Real Estate & Conveyancing',
      documentType: 'Deed of Absolute Sale of Land / Property',
      assetType: 'Agricultural Land / Farm',
      jurisdiction: {
        country: 'India',
        state: 'Maharashtra',
        city: 'Pune',
        localityType: 'Rural',
        subRegistrarArea: 'Sub-Registrar Haveli No. 12, Pune'
      },
      parties: [
        {
          id: 'p1',
          partyRole: 'Seller',
          entityType: 'Individual',
          fullName: 'Rajesh Ramchandra Patil',
          fatherSpouseName: 'Ramchandra Patil',
          idType: 'Aadhaar',
          idNumber: '9876-5432-1098',
          address: 'Gat No. 45, Village Wagholi, Haveli, Pune 412207'
        },
        {
          id: 'p2',
          partyRole: 'Purchaser',
          entityType: 'Individual',
          fullName: 'Vikram Suresh Deshmukh',
          fatherSpouseName: 'Suresh Deshmukh',
          idType: 'Aadhaar',
          idNumber: '1234-5678-9012',
          address: 'Flat 402, Senate Heights, Baner, Pune 411045'
        }
      ],
      propertyDetails: {
        propertyType: 'Agricultural Land',
        surveyNumber: 'Gat No. 182/2A',
        totalArea: '2.5',
        areaUnit: 'acres',
        address: 'Gat No. 182/2A, Village Wagholi, Haveli Taluka, Pune District',
        boundaries: {
          north: 'Adjacent Gat No. 183 owned by Kulkarni',
          south: '20 Feet Public Gram Panchayat Road',
          east: 'Gat No. 182/1 owned by Patil',
          west: 'Irrigation Canal'
        },
        districtCounty: 'Pune District'
      },
      financialTerms: {
        totalConsideration: 7500000,
        currency: 'INR',
        tokenAmountPaid: 1000000,
        paymentSchedule: [],
        stampDutyResponsibility: 'Purchaser'
      },
      witnesses: [
        { id: 'w1', fullName: 'Amit Sharad Joshi', fatherSpouseName: 'Sharad Joshi', idType: 'Aadhaar', idNumber: '5544-3322-1100', address: 'Baner, Pune' },
        { id: 'w2', fullName: 'Sanjay Vittal Kadam', fatherSpouseName: 'Vittal Kadam', idType: 'Aadhaar', idNumber: '9988-7766-5544', address: 'Wagholi, Pune' }
      ],
      possessionDate: '2026-08-15',
      governingCourtJurisdiction: 'Civil Court Senior Division, Pune',
      arbitrationClause: true,
      indemnityClause: true,
      customClauses: [],
      languageStyle: 'Formal Legal Standard'
    } as LegalDraftRequest
  }
];

// ==========================================
// 4. MAIN PAGE COMPONENT
// ==========================================

export default function DraftingStudioPage() {
  const defaultData = SAMPLE_PRESETS[0].data;

  // Form State
  const [domain, setDomain] = useState<'legal' | 'creative'>('legal');
  const [category, setCategory] = useState<string>(defaultData.category);
  const [documentType, setDocumentType] = useState<string>(defaultData.documentType);
  const [assetType, setAssetType] = useState<string>(defaultData.assetType);
  const [requiresPropertyDetails, setRequiresPropertyDetails] = useState<boolean>(true);

  const [jurisdiction, setJurisdiction] = useState<LocationJurisdiction>(defaultData.jurisdiction);
  const [parties, setParties] = useState<PartyDetails[]>(defaultData.parties);
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | undefined>(defaultData.propertyDetails);
  const [financialTerms, setFinancialTerms] = useState<FinancialTerms>(defaultData.financialTerms);
  const [witnesses, setWitnesses] = useState<WitnessDetail[]>(defaultData.witnesses);
  const [possessionDate, setPossessionDate] = useState<string>(defaultData.possessionDate || '');
  const [governingCourtJurisdiction, setGoverningCourtJurisdiction] = useState<string>(defaultData.governingCourtJurisdiction || '');
  const [arbitrationClause, setArbitrationClause] = useState<boolean>(defaultData.arbitrationClause);
  const [indemnityClause, setIndemnityClause] = useState<boolean>(defaultData.indemnityClause);
  const [customClauses, setCustomClauses] = useState<CustomClause[]>(defaultData.customClauses);
  const [languageStyle, setLanguageStyle] = useState<LegalDraftRequest['languageStyle']>('Formal Legal Standard');

  // Step Wizard State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // Generation State
  const [generatedDraft, setGeneratedDraft] = useState<GeneratedDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'draft' | 'preview' | 'audit'>('draft');

  // Validate Step
  const validateStep = (step: number): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    if (step === 1) {
      if (!category) errors.push('Please select a Legal Master Category.');
      if (!documentType) errors.push('Please select an Instrument / Document Type.');
    }
    if (step === 2) {
      if (!jurisdiction.country) errors.push('Country selection is required.');
      if (!jurisdiction.state) errors.push('State / Province selection is required.');
      if (!jurisdiction.city) errors.push('City / Recording Area is required.');
      if (requiresPropertyDetails && propertyDetails) {
        if (!propertyDetails.surveyNumber) errors.push('Please enter Survey / Parcel ID.');
        if (!propertyDetails.address) errors.push('Property address is required.');
      }
    }
    if (step === 3) {
      if (!parties || parties.length === 0) errors.push('At least one party details must be entered.');
      else {
        parties.forEach((p, idx) => {
          if (!p.fullName.trim()) errors.push(`Party #${idx + 1}: Full Name is required.`);
          if (!p.idNumber.trim()) errors.push(`Party #${idx + 1}: ID Number is required.`);
        });
      }
    }
    if (step === 4) {
      if (financialTerms.totalConsideration === undefined || financialTerms.totalConsideration < 0) {
        errors.push('Consideration amount must be specified.');
      }
    }
    if (step === 5) {
      if (!witnesses || witnesses.length < 1) errors.push('At least 1 witness detail is required.');
    }
    return { isValid: errors.length === 0, errors };
  };

  const handleNextStep = () => {
    const { isValid, errors } = validateStep(currentStep);
    if (isValid) {
      setStepErrors([]);
      setCurrentStep((prev) => Math.min(5, prev + 1));
    } else {
      setStepErrors(errors);
    }
  };

  const handlePrevStep = () => {
    setStepErrors([]);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  // Generate Draft via API Route
  const handleGenerateDraft = async () => {
    let allErrors: string[] = [];
    for (let s = 1; s <= 5; s++) {
      const res = validateStep(s);
      if (!res.isValid) allErrors = [...allErrors, ...res.errors];
    }
    if (allErrors.length > 0) {
      setStepErrors(allErrors);
      setGenerateError('Please fix missing required parameters before generating the draft.');
      return;
    }

    setIsGenerating(true);
    setGenerateError(null);
    setStepErrors([]);

    const draftRequest: LegalDraftRequest = {
      industry: domain === 'creative' ? 'Film & Creative' : 'Legal & Corporate',
      category,
      documentType,
      assetType,
      jurisdiction,
      parties,
      propertyDetails: requiresPropertyDetails ? propertyDetails : undefined,
      financialTerms,
      witnesses,
      possessionDate,
      governingCourtJurisdiction,
      arbitrationClause,
      indemnityClause,
      customClauses,
      languageStyle
    };

    try {
      const res = await fetch('/api/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftRequest)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${res.status} error during draft generation.`);
      }

      const draftResult: GeneratedDraft = await res.json();
      setGeneratedDraft(draftResult);
      setActiveTab('preview');
    } catch (err: any) {
      setGenerateError(err.message || 'Failed to generate legal draft.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export to DOCX
  const handleExportDocx = async () => {
    if (!generatedDraft) return;
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: generatedDraft.title.toUpperCase(), bold: true, size: 28 })]
          }),
          new Paragraph({
            children: [new TextRun({ text: generatedDraft.documentHtml.replace(/<[^>]+>/g, '\n'), size: 22 })]
          })
        ]
      }]
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${generatedDraft.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.docx`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20">
              <Scale className="w-5 h-5 font-black" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                Statutory Conveyance & Legal Drafting Studio
              </h1>
              <p className="text-[10px] text-slate-400">Jurisdiction-Compliant Statutory Conveyancing & Corporate Contracts</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

        {/* TABS HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                activeTab === 'draft' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>1. Drafting Parameters</span>
            </button>

            {generatedDraft && (
              <>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === 'preview' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>2. Document Preview</span>
                </button>

                <button
                  onClick={() => setActiveTab('audit')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
                    activeTab === 'audit' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. Statutory Audit & Compliance</span>
                </button>
              </>
            )}
          </div>
        </div>

        {generateError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
            <div>
              <span className="font-bold">Generation Error:</span>
              <p className="mt-0.5">{generateError}</p>
            </div>
          </div>
        )}

        {/* TAB 1: FORM */}
        {activeTab === 'draft' && (
          <div className="space-y-6">

            {/* STEP NAVIGATION WIZARD */}
            <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-3 shadow-lg">
              <div className="flex items-center justify-between overflow-x-auto pb-1 gap-2">
                {[
                  { num: 1, title: '1. Instrument' },
                  { num: 2, title: '2. Location & Laws' },
                  { num: 3, title: '3. Parties' },
                  { num: 4, title: '4. Consideration' },
                  { num: 5, title: '5. Execution' },
                ].map((s) => {
                  const isActive = currentStep === s.num;
                  const isCompleted = currentStep > s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setCurrentStep(s.num)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : isCompleted
                          ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP ERRORS */}
            {stepErrors.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                <div className="font-extrabold flex items-center space-x-2 text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Missing or Incomplete Parameters in Section #{currentStep}:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-2">
                  {stepErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECTION CONTENT */}
            <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 space-y-4">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Select Legal Instrument & Category</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                      >
                        {LEGAL_TAXONOMY_TREE.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Instrument Type</label>
                      <input
                        type="text"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Location, Jurisdiction & Property</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Country</label>
                      <input
                        type="text"
                        value={jurisdiction.country}
                        onChange={(e) => setJurisdiction({ ...jurisdiction, country: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={jurisdiction.state}
                        onChange={(e) => setJurisdiction({ ...jurisdiction, state: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">City / Recording Area</label>
                      <input
                        type="text"
                        value={jurisdiction.city}
                        onChange={(e) => setJurisdiction({ ...jurisdiction, city: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Parties Involved</h3>
                  {parties.map((p, idx) => (
                    <div key={p.id} className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg space-y-2 mb-3">
                      <div className="text-xs font-bold text-slate-200">Party #{idx + 1} ({p.partyRole})</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="Full Name / Entity Name"
                          value={p.fullName}
                          onChange={(e) => {
                            const updated = [...parties];
                            updated[idx].fullName = e.target.value;
                            setParties(updated);
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100"
                        />
                        <input
                          type="text"
                          placeholder="ID Number (Aadhaar / PAN / Tax ID)"
                          value={p.idNumber}
                          onChange={(e) => {
                            const updated = [...parties];
                            updated[idx].idNumber = e.target.value;
                            setParties(updated);
                          }}
                          className="bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Financial Consideration</h3>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Total Consideration Amount</label>
                    <input
                      type="number"
                      value={financialTerms.totalConsideration}
                      onChange={(e) => setFinancialTerms({ ...financialTerms, totalConsideration: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-100"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div>
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Execution & Witnesses</h3>
                  {witnesses.map((w, idx) => (
                    <div key={w.id} className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg space-y-2 mb-3">
                      <div className="text-xs font-bold text-slate-200">Witness #{idx + 1}</div>
                      <input
                        type="text"
                        placeholder="Witness Full Name"
                        value={w.fullName}
                        onChange={(e) => {
                          const updated = [...witnesses];
                          updated[idx].fullName = e.target.value;
                          setWitnesses(updated);
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-xs text-slate-100"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold"
                >
                  ← Back
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
                >
                  Next Section →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-xs flex items-center space-x-2"
                >
                  {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  <span>Generate Full Legal Draft</span>
                </button>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PREVIEW */}
        {activeTab === 'preview' && generatedDraft && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h2 className="text-sm font-bold text-amber-400">{generatedDraft.title}</h2>
              <button
                onClick={handleExportDocx}
                className="px-4 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download .DOCX</span>
              </button>
            </div>
            <div
              className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl font-serif text-xs leading-relaxed"
              dangerouslySetInnerHTML={{ __html: generatedDraft.documentHtml }}
            />
          </div>
        )}

        {/* TAB 3: AUDIT */}
        {activeTab === 'audit' && generatedDraft && (
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-amber-400">Statutory Risk & Stamp Duty Audit</h2>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-xs font-bold text-slate-300">Risk Assessment Score: {generatedDraft.legalRiskAssessment.riskScore}</div>
              <p className="text-xs text-slate-400 mt-1">{generatedDraft.legalRiskAssessment.summary}</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <div className="text-xs font-bold text-slate-300">Stamp Duty Guidance:</div>
              <p className="text-xs text-slate-400 mt-1">{generatedDraft.stampDutyGuidance}</p>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
