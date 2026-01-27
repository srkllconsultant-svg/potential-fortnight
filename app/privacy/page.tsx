"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Database, FileText, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
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
              <ShieldCheck className="text-amber-500" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">Privacy Policy</h1>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              At S.R.K Strategic, we handle high-stakes property data with discretion and professional integrity.
            </p>
          </div>

          <div className="p-8 md:p-16 space-y-16">
            
            {/* Grid Sections */}
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              
              {/* Data Collection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <Database size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Data Collection</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  We collect survey numbers, link documents, and supporting deeds/documents exclusively to identify technical hurdles in CLU, NOC, and Revenue records.
                </p>
              </div>

              {/* Confidentiality */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <EyeOff size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Confidentiality</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  Your property’s strategic vulnerabilities are never shared with third parties, marketers, or unauthorized consultants.
                </p>
              </div>

              {/* Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <Lock size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Security</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  All digital uploads are encrypted. Data is retained only for the duration necessary to complete the technical assessment unless legally required otherwise. Once a technical audit is finalized or the engagement ends, documents can be purged upon request.
                </p>
              </div>

              {/* Usage */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <FileText size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Usage</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  Information is used strictly for scheduling meetings and preparing briefing notes for liaison officers and legal teams.
                </p>
              </div>

              {/* User Rights */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <UserCheck size={20} />
                  <h3 className="font-bold text-slate-900 uppercase text-xs tracking-widest">User Rights</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed text-justify">
                  Clients may request access, correction, or deletion of submitted data at any stage of engagement, subject to legal and regulatory obligations.
                </p>
              </div>
            </div>
            
            {/* Disclaimer Box */}
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Regulatory Notice</h4>
              <p className="text-xs text-slate-500 leading-relaxed text-justify">
                By using this portal, you acknowledge that S.R.K Strategic (or) S.R.K LL Consultant acts as a private/individual consultancy. While we protect your data, the user assumes responsibility for the authenticity of the documents provided for the technical audit.
              </p>
            </div>

          </div>
        </div>

        {/* Support Footer */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-xs">Questions regarding data protection? Contact our compliance team at <span className="text-slate-900 font-bold underline">srk.llconsultant@gmail.com</span></p>
        </div>
      </div>
    </main>
  );
}