import React from 'react';
import { WitnessDetail, CustomClause, LocationJurisdiction } from '../types';
import { ShieldCheck, Plus, Trash2, Gavel, Scale, FileCode, MapPin } from 'lucide-react';

interface WitnessesAndCustomFormProps {
  witnesses: WitnessDetail[];
  possessionDate?: string;
  governingCourtJurisdiction?: string;
  arbitrationClause: boolean;
  indemnityClause: boolean;
  customClauses: CustomClause[];
  languageStyle: 'Formal Legal Standard' | 'Modern Simplified Legal' | 'Bilingual Standard';
  jurisdiction?: LocationJurisdiction;
  onWitnessesChange: (updated: WitnessDetail[]) => void;
  onPossessionDateChange: (date: string) => void;
  onCourtJurisdictionChange: (court: string) => void;
  onArbitrationChange: (val: boolean) => void;
  onIndemnityChange: (val: boolean) => void;
  onCustomClausesChange: (clauses: CustomClause[]) => void;
  onLanguageStyleChange: (style: 'Formal Legal Standard' | 'Modern Simplified Legal' | 'Bilingual Standard') => void;
}

export const WitnessesAndCustomForm: React.FC<WitnessesAndCustomFormProps> = ({
  witnesses,
  possessionDate,
  governingCourtJurisdiction,
  arbitrationClause,
  indemnityClause,
  customClauses,
  languageStyle,
  jurisdiction,
  onWitnessesChange,
  onPossessionDateChange,
  onCourtJurisdictionChange,
  onArbitrationChange,
  onIndemnityChange,
  onCustomClausesChange,
  onLanguageStyleChange,
}) => {
  const defaultCourt = jurisdiction 
    ? `Jurisdictional Civil Courts at ${jurisdiction.city}, ${jurisdiction.state} (${jurisdiction.country})` 
    : 'Jurisdictional Civil Courts';

  const addWitness = () => {
    if (witnesses.length >= 4) return;
    const newW: WitnessDetail = {
      id: `wit_${Date.now()}`,
      fullName: '',
      fatherSpouseName: '',
      idNumber: '',
      address: '',
    };
    onWitnessesChange([...witnesses, newW]);
  };

  const updateWitness = (id: string, fields: Partial<WitnessDetail>) => {
    onWitnessesChange(witnesses.map((w) => (w.id === id ? { ...w, ...fields } : w)));
  };

  const removeWitness = (id: string) => {
    if (witnesses.length <= 1) {
      alert("At least one witness is recommended for legal execution.");
      return;
    }
    onWitnessesChange(witnesses.filter((w) => w.id !== id));
  };

  const addCustomClause = () => {
    const newC: CustomClause = {
      id: `cc_${Date.now()}`,
      title: 'Special Condition / Covenant',
      content: '',
    };
    onCustomClausesChange([...customClauses, newC]);
  };

  const updateCustomClause = (id: string, fields: Partial<CustomClause>) => {
    onCustomClausesChange(customClauses.map((c) => (c.id === id ? { ...c, ...fields } : c)));
  };

  const removeCustomClause = (id: string) => {
    onCustomClausesChange(customClauses.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">5</span>
          <span>Witnesses, Dispute Resolution & Custom Covenants</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          At least 2 attesting witnesses are standard under most statutory conveyance codes.
        </p>
      </div>

      {/* WITNESSES SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-lg">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-slate-700" />
            <span>Attesting Witnesses (Mostly 2 Persons Required)</span>
          </span>
          {witnesses.length < 4 && (
            <button
              type="button"
              onClick={addWitness}
              className="flex items-center space-x-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Witness</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {witnesses.map((w, idx) => (
            <div key={w.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="font-bold text-slate-900">Witness #{idx + 1}</span>
                {witnesses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWitness(w.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={w.fullName}
                    onChange={(e) => updateWitness(w.id, { fullName: e.target.value })}
                    placeholder="e.g. Ganesh Pawar"
                    className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase">Father/Spouse Name</label>
                  <input
                    type="text"
                    value={w.fatherSpouseName}
                    onChange={(e) => updateWitness(w.id, { fatherSpouseName: e.target.value })}
                    placeholder="e.g. Devidas Pawar"
                    className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase">ID / Aadhaar / Passport</label>
                  <input
                    type="text"
                    value={w.idNumber}
                    onChange={(e) => updateWitness(w.id, { idNumber: e.target.value })}
                    placeholder="e.g. 4102-9981-2210"
                    className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-600 uppercase">Full Address</label>
                  <input
                    type="text"
                    value={w.address}
                    onChange={(e) => updateWitness(w.id, { address: e.target.value })}
                    placeholder="e.g. At Post Wagholi, Pune 412207"
                    className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* POSSESSION, COURTS & LEGAL PREFERENCES */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Handover / Possession Effective Date
          </label>
          <input
            type="date"
            value={possessionDate || ''}
            onChange={(e) => onPossessionDateChange(e.target.value)}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
            Exclusive Governing Court Jurisdiction
          </label>
          <input
            type="text"
            value={governingCourtJurisdiction || ''}
            onChange={(e) => onCourtJurisdictionChange(e.target.value)}
            placeholder={defaultCourt}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900"
          />
        </div>

      </div>

      {/* LEGAL TOGGLES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        
        <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={arbitrationClause}
            onChange={(e) => onArbitrationChange(e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
          />
          <div>
            <span className="text-xs font-bold text-slate-900 block">Include Statutory Arbitration Clause</span>
            <span className="text-[11px] text-slate-500">Fast-track dispute resolution by a Sole Arbitrator</span>
          </div>
        </label>

        <label className="p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={indemnityClause}
            onChange={(e) => onIndemnityChange(e.target.checked)}
            className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
          />
          <div>
            <span className="text-xs font-bold text-slate-900 block">Include Indemnity & Title Guarantee</span>
            <span className="text-[11px] text-slate-500">Protects against third-party claims or statutory tax dues</span>
          </div>
        </label>

      </div>

      {/* CUSTOM CLAUSES MANAGER */}
      <div className="pt-2 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
            <Scale className="w-3.5 h-3.5 text-amber-500" />
            <span>Custom Conditions / Additional Clauses</span>
          </span>
          <button
            type="button"
            onClick={addCustomClause}
            className="flex items-center space-x-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded-md transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Clause</span>
          </button>
        </div>

        {customClauses.map((c) => (
          <div key={c.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={c.title}
                onChange={(e) => updateCustomClause(c.id, { title: e.target.value })}
                placeholder="Clause Title (e.g. Lock-In Period / Maintenance Charges)"
                className="text-xs font-bold bg-white border border-slate-300 rounded-md p-1.5 text-slate-900 w-2/3"
              />
              <button
                type="button"
                onClick={() => removeCustomClause(c.id)}
                className="text-slate-400 hover:text-red-500 text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              rows={2}
              value={c.content}
              onChange={(e) => updateCustomClause(c.id, { content: e.target.value })}
              placeholder="Exact text of the condition or legal covenant..."
              className="w-full text-xs bg-white border border-slate-300 rounded-md p-2 text-slate-800 focus:ring-2 focus:ring-amber-500"
            />
          </div>
        ))}
      </div>

    </div>
  );
};
