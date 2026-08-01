import React from 'react';
import { GeneratedDraft } from '../types';
import { ShieldCheck, AlertTriangle, BookOpen, Calculator, CheckCircle2, FileCheck } from 'lucide-react';

interface LegalAuditPanelProps {
  draft: GeneratedDraft;
}

export const LegalAuditPanel: React.FC<LegalAuditPanelProps> = ({ draft }) => {
  const risk = draft.legalRiskAssessment;

  const getRiskBadge = (score: string) => {
    switch (score) {
      case 'Low':
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>Low Legal Risk</span></span>;
      case 'Medium':
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5" /><span>Medium Risk</span></span>;
      default:
        return <span className="bg-red-500/10 text-red-600 border border-red-500/30 px-2.5 py-1 rounded-full text-xs font-bold flex items-center space-x-1"><AlertTriangle className="w-3.5 h-3.5" /><span>High Risk</span></span>;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
      
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-amber-500" />
            <span>Statutory Compliance & Legal Audit Inspector</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated legal risk audit, stamp duty guidelines, and sub-registrar registration requirements.
          </p>
        </div>
        {getRiskBadge(risk.riskScore)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Risk Profile & Recommendations */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-900 uppercase">
            <FileCheck className="w-4 h-4 text-amber-500" />
            <span>Risk Profile & Covenants</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {risk.summary}
          </p>
          {risk.recommendations.length > 0 && (
            <div className="pt-2 border-t border-slate-200 space-y-1">
              <span className="text-[11px] font-bold text-slate-800 uppercase block">Recommendations:</span>
              <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                {risk.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stamp Duty Guidance */}
        <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-amber-950 uppercase">
            <Calculator className="w-4 h-4 text-amber-600" />
            <span>Locality Stamp Duty Guidance</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed">
            {draft.stampDutyGuidance}
          </p>
        </div>

        {/* Sub-Registrar & Registration Procedure */}
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-950 uppercase">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Sub-Registrar Registration Procedure</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed">
            {draft.registrationRequirements}
          </p>
        </div>

      </div>

      {/* Governing Statutory Acts Cited */}
      <div className="pt-2 border-t border-slate-100">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
          Statutory Legal Acts & Codes Cited in Draft:
        </div>
        <div className="flex flex-wrap gap-2">
          {draft.governingLawsCited.map((act, i) => (
            <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 text-amber-400 font-mono text-[11px] font-bold">
              ⚖️ {act}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Input Warnings (If any) */}
      {draft.missingInputWarnings.length > 0 && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
          <div className="font-bold flex items-center space-x-1.5 text-red-900">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Recommended Additional Parameters:</span>
          </div>
          <ul className="list-disc pl-5 space-y-0.5">
            {draft.missingInputWarnings.map((warn, i) => (
              <li key={i}>{warn}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};
