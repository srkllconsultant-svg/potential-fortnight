import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TaxonomyPicker } from './components/TaxonomyPicker';
import { JurisdictionSelector } from './components/JurisdictionSelector';
import { PartiesForm } from './components/PartiesForm';
import { PropertyAndFinancialsForm } from './components/PropertyAndFinancialsForm';
import { WitnessesAndCustomForm } from './components/WitnessesAndCustomForm';
import { DocumentPreview } from './components/DocumentPreview';
import { LegalAuditPanel } from './components/LegalAuditPanel';

import {
  LegalDraftRequest,
  GeneratedDraft,
  LocationJurisdiction,
  PartyDetails,
  PropertyDetails,
  FinancialTerms,
  WitnessDetail,
  CustomClause,
  PresetTemplate,
} from './types';
import { SAMPLE_PRESETS } from './data/samplePresets';
import { Sparkles, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  // Default to first preset (Sale Deed Pune, Maharashtra, India)
  const defaultData = SAMPLE_PRESETS[0].data;

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

  const [possessionDate, setPossessionDate] = useState<string>(defaultData.possessionDate || '2026-08-01');
  const [governingCourtJurisdiction, setGoverningCourtJurisdiction] = useState<string>(defaultData.governingCourtJurisdiction || '');
  const [arbitrationClause, setArbitrationClause] = useState<boolean>(defaultData.arbitrationClause);
  const [indemnityClause, setIndemnityClause] = useState<boolean>(defaultData.indemnityClause);
  const [customClauses, setCustomClauses] = useState<CustomClause[]>(defaultData.customClauses);
  const [languageStyle, setLanguageStyle] = useState<LegalDraftRequest['languageStyle']>('Formal Legal Standard');

  // Step Wizard State (Steps 1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepErrors, setStepErrors] = useState<string[]>([]);

  // Generation & View Tab state
  const [generatedDraft, setGeneratedDraft] = useState<GeneratedDraft | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'draft' | 'preview'>('draft');

  // Load Preset Handler
  const handleSelectPreset = (preset: PresetTemplate) => {
    const d = preset.data;
    setDomain(d.industry.toLowerCase().includes('creative') || d.industry.toLowerCase().includes('film') ? 'creative' : 'legal');
    setCategory(d.category);
    setDocumentType(d.documentType);
    setAssetType(d.assetType);
    setRequiresPropertyDetails(Boolean(d.propertyDetails));
    setJurisdiction(d.jurisdiction);
    setParties(d.parties);
    setPropertyDetails(d.propertyDetails);
    setFinancialTerms(d.financialTerms);
    setWitnesses(d.witnesses);
    setPossessionDate(d.possessionDate || '');
    setGoverningCourtJurisdiction(d.governingCourtJurisdiction || '');
    setArbitrationClause(d.arbitrationClause);
    setIndemnityClause(d.indemnityClause);
    setCustomClauses(d.customClauses);
    setLanguageStyle(d.languageStyle || 'Formal Legal Standard');
    setGeneratedDraft(null);
    setCurrentStep(1);
    setStepErrors([]);
    setActiveTab('draft');
  };

  // Reset Form
  const handleReset = () => {
    handleSelectPreset(SAMPLE_PRESETS[0]);
  };

  // Validate specific step parameters
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
        if (!propertyDetails.surveyNumber) {
          errors.push(`Please enter the ${jurisdiction.country === 'India' ? 'Survey / Khasra / Gat No.' : 'Parcel ID / APN / Title No.'}.`);
        }
        if (!propertyDetails.address) {
          errors.push('Property address or location schedule is required.');
        }
      }
    }

    if (step === 3) {
      if (!parties || parties.length === 0) {
        errors.push('At least one party details must be entered.');
      } else {
        parties.forEach((p, index) => {
          if (!p.fullName.trim()) {
            errors.push(`Party #${index + 1} (${p.partyRole}): Full Name is required.`);
          }
          if (!p.idNumber.trim()) {
            errors.push(`Party #${index + 1} (${p.fullName || p.partyRole}): ${p.idType} number is required.`);
          }
        });
      }
    }

    if (step === 4) {
      if (financialTerms.totalConsideration === undefined || financialTerms.totalConsideration < 0) {
        errors.push('Consideration amount must be specified.');
      }
    }

    if (step === 5) {
      if (!witnesses || witnesses.length < 1) {
        errors.push('At least 1 witness detail is required for legal execution.');
      } else {
        witnesses.forEach((w, index) => {
          if (!w.fullName.trim()) {
            errors.push(`Witness #${index + 1}: Full Name is required.`);
          }
        });
      }
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

  const handleJumpToStep = (stepNumber: number) => {
    setStepErrors([]);
    setCurrentStep(stepNumber);
  };

  // Generate Document Call to AI Server
  const handleGenerateDraft = async () => {
    // Validate all steps before generating
    let allErrors: string[] = [];
    for (let s = 1; s <= 5; s++) {
      const res = validateStep(s);
      if (!res.isValid) {
        allErrors = [...allErrors, ...res.errors];
      }
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
      languageStyle,
    };

    try {
      const response = await fetch('/api/drafts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftRequest),
      });

      const data = await response.json();

      if (response.ok && data.documentHtml) {
        setGeneratedDraft(data);
        setActiveTab('preview');
      } else {
        setGenerateError(data.error || 'Failed to generate legal document from server.');
      }
    } catch (err: any) {
      setGenerateError(err.message || 'Error connecting to drafting server.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        jurisdiction={jurisdiction}
        selectedDocName={documentType}
        onSelectPreset={handleSelectPreset}
        onReset={handleReset}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasGeneratedDraft={Boolean(generatedDraft)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Error Banner */}
        {generateError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
              <span>{generateError}</span>
            </div>
            <button onClick={() => setGenerateError(null)} className="text-red-400 font-bold text-sm">×</button>
          </div>
        )}

        {/* TAB 1: DRAFTING PARAMETERS FORM */}
        {activeTab === 'draft' && (
          <div className="space-y-6">

            {/* STEP PROGRESS WIZARD NAVIGATION BAR */}
            <div className="bg-slate-800/80 rounded-xl border border-slate-700/80 p-3 sm:p-4 shadow-lg">
              <div className="flex items-center justify-between overflow-x-auto pb-1 gap-2">
                {[
                  { num: 1, title: '1. Instrument & Domain' },
                  { num: 2, title: '2. Location & Laws' },
                  { num: 3, title: '3. Parties & Identification' },
                  { num: 4, title: '4. Financial Consideration' },
                  { num: 5, title: '5. Execution & Witnesses' },
                ].map((s) => {
                  const isActive = currentStep === s.num;
                  const isCompleted = currentStep > s.num;

                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => handleJumpToStep(s.num)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400'
                          : isCompleted
                          ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-800/50'
                          : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                        isActive ? 'bg-slate-950 text-amber-400' : isCompleted ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : s.num}
                      </span>
                      <span>{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Validation Warnings */}
            {stepErrors.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                <div className="font-extrabold flex items-center space-x-2 text-amber-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Missing or Incomplete Required Parameters in Section #{currentStep}:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-300 pl-2">
                  {stepErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECTION 1: Taxonomy Picker */}
            {currentStep === 1 && (
              <TaxonomyPicker
                selectedDomain={domain}
                selectedCategoryName={category}
                selectedDocumentName={documentType}
                selectedAssetType={assetType}
                onSelectDomain={setDomain}
                onSelectCategory={setCategory}
                onSelectDocument={(docName, reqProp) => {
                  setDocumentType(docName);
                  setRequiresPropertyDetails(reqProp);
                }}
                onSelectAssetType={setAssetType}
              />
            )}

            {/* SECTION 2: Jurisdiction & Location Selector */}
            {currentStep === 2 && (
              <JurisdictionSelector
                jurisdiction={jurisdiction}
                onChange={setJurisdiction}
                currencySymbol={financialTerms.currency === 'INR' ? '₹' : '$'}
                requiresPropertyDetails={requiresPropertyDetails}
                propertyDetails={propertyDetails}
                onPropertyChange={setPropertyDetails}
              />
            )}

            {/* SECTION 3: Dynamic Parties Form */}
            {currentStep === 3 && (
              <PartiesForm
                parties={parties}
                onChange={setParties}
                documentName={documentType}
                categoryName={category}
                jurisdiction={jurisdiction}
              />
            )}

            {/* SECTION 4: Property & Financials Form */}
            {currentStep === 4 && (
              <PropertyAndFinancialsForm
                requiresPropertyDetails={requiresPropertyDetails}
                propertyDetails={propertyDetails}
                financialTerms={financialTerms}
                onPropertyChange={setPropertyDetails}
                onFinancialsChange={setFinancialTerms}
              />
            )}

            {/* SECTION 5: Witnesses & Custom Clauses */}
            {currentStep === 5 && (
              <WitnessesAndCustomForm
                witnesses={witnesses}
                possessionDate={possessionDate}
                governingCourtJurisdiction={governingCourtJurisdiction}
                arbitrationClause={arbitrationClause}
                indemnityClause={indemnityClause}
                customClauses={customClauses}
                languageStyle={languageStyle}
                jurisdiction={jurisdiction}
                onWitnessesChange={setWitnesses}
                onPossessionDateChange={setPossessionDate}
                onCourtJurisdictionChange={setGoverningCourtJurisdiction}
                onArbitrationChange={setArbitrationClause}
                onIndemnityChange={setIndemnityClause}
                onCustomClausesChange={setCustomClauses}
                onLanguageStyleChange={setLanguageStyle}
              />
            )}

            {/* WIZARD STEP NAVIGATION CONTROLS */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-800 gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-2 border border-slate-700 transition-all cursor-pointer"
                >
                  <span>← Previous Section</span>
                </button>
              ) : (
                <div />
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  <span>Continue to Section #{currentStep + 1}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGenerateDraft}
                  disabled={isGenerating}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                      <span>Gemini AI Drafting Legal Instrument...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-slate-950" />
                      <span>Generate Full Legal Instrument ({documentType})</span>
                      <ArrowRight className="w-5 h-5 text-slate-950" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: LEGAL DOCUMENT PREVIEW & AUDIT */}
        {activeTab === 'preview' && generatedDraft && (
          <div className="space-y-6">
            
            {/* Document Preview & In-Place Editor */}
            <DocumentPreview
              draft={generatedDraft}
              request={{
                industry: domain === 'creative' ? 'Film & Creative' : 'Legal & Corporate',
                category,
                documentType,
                assetType,
                jurisdiction,
                parties,
                propertyDetails,
                financialTerms,
                witnesses,
                possessionDate,
                governingCourtJurisdiction,
                arbitrationClause,
                indemnityClause,
                customClauses,
                languageStyle,
              }}
              onUpdateDraftHtml={(newHtml) => {
                setGeneratedDraft({ ...generatedDraft, documentHtml: newHtml });
              }}
            />

            {/* Statutory Compliance & Risk Audit Panel */}
            <LegalAuditPanel draft={generatedDraft} />

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Drafting Studio • AI Statutory Conveyancing Platform</span>
          <span className="text-slate-400">
            Powered by Gemini 3.6 Flash Legal Engine & Location Intelligence
          </span>
        </div>
      </footer>

    </div>
  );
}
