"use client";

import Link from 'next/link';
import { 
  ArrowLeft, Scale, Landmark, AlertTriangle, 
  BadgeCheck, Gavel, Database, FileText, ShieldAlert 
} from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Link href="/inquiry/liaison-support" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-amber-600 transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Audit Briefing
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-slate-900 p-10 md:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-2xl mb-6">
              <Scale className="text-amber-500" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Terms of Engagement</h1>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Establishing the professional framework for technical audits, land strategy, and liaison support services.
            </p>
          </div>

          <div className="p-8 md:p-16 space-y-16">
            
            {/* Expanded 8-Point Legal Grid */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">

              {/* 1. Consultancy Nature */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <Landmark size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Consultancy Nature</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    S.R.K Strategic is a private/individual consultancy. We provide expert strategy and liaison support; we do not represent or hold government authority.
  </p>
</div>

{/* 2. No Outcome Guarantee */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <ShieldAlert size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">No Outcome Guarantee</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Final approval for any services provided by S.R.K Strategic (or) S.R.K LL Consultant rests with government bodies. Our fees are for professional expertise and time, not for guaranteed administrative results.
  </p>
</div>

{/* 3. Client Responsibility */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <BadgeCheck size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Client Responsibility</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Clients must provide authentic and complete documentation. S.R.K Strategic is not liable for hurdles arising from misrepresented or withheld property information.
  </p>
</div>

{/* 4. Liability Limit */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <Gavel size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Liability Limit</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Our professional liability is strictly limited to the value of the service fee paid for the specific technical audit, service rendered or briefing session.
  </p>
</div>

{/* 5. Data Usage & Retention */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <Database size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Data Usage & Retention</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Information submitted is used solely for technical audits and strategy notes. Data is retained only for the duration of the engagement unless legally required otherwise.
  </p>
</div>

{/* 6. Scope of Services */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <FileText size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Scope of Services</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Services are limited to the specific audit or advisory scope agreed at the time of engagement. Additional work beyond the defined scope may require a separate agreement.
  </p>
</div>

{/* 7. No Legal Representation */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <Scale size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">No Legal Representation</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    We do not provide legal representation. Where required, S.R.K Strategic may share or suggest licensed legal professionals for client consideration. Any references to statutes or procedures are strategic and informational in nature. The final decision to engage legal counsel rests solely with the client.
  </p>
</div>

{/* 8. Regulatory Variability */}
<div className="space-y-4">
  <div className="flex items-center gap-3 text-amber-600">
    <AlertTriangle size={20} />
    <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Regulatory Variability</h3>
  </div>
  <p className="text-sm text-slate-500 leading-relaxed text-justify">
    Regulatory procedures and timelines vary by jurisdiction. We are not responsible for delays resulting from administrative discretion or policy updates.
  </p>
</div>

            </div>

            {/* Bottom Notice */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Engagement Affirmation</h4>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                By submitting an audit request through this portal, you acknowledge that you have read, understood, and accepted these terms. This establishes a professional consultant-client relationship based on the data provided.
              </p>
            </div>

          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs">Need clarification on these terms? Contact our desk at <span className="text-slate-900 font-bold underline">srk.llconsultant@gmail.com</span></p>
        </div>
      </div>
    </main>
  );
}