"use client";

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Check, 
  Scale, 
  Award, 
  ScrollText, 
  PenTool, 
  Phone, 
  Mail,
  ShieldCheck,
  Target,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[22px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> HOME
          </Link>
          <div className="text-[22px] uppercase tracking-[0.3em] font-bold text-slate-400">
            <span className="text-amber-500 ml-2">Profile </span>
          </div>
        </div>
      </nav>

  
{/* Hero Section */}
      <section className="relative pt-40 pb-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <span className="inline-block text-amber-600 tracking-[0.4em] uppercase text-[10px] font-bold border-b border-amber-200 pb-1">
              Consultancy Excellence
            </span>
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-serif text-slate-900 tracking-tighter italic">S.R.K</h1>
              <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-tight">
                Legal Liaison <span className="text-amber-600 px-2">·</span> 
                Real Estate Strategist <span className="text-amber-600 px-2">·</span> 
                Creative Consultant
              </p>
            </div>
            <p className="text-base text-slate-500 leading-relaxed max-w-xl font-light">
              A multidisciplinary consultant bridging legal awareness, real estate clarity, and creative intelligence. I work at the intersection of compliance, negotiation, and narrative.
            </p>
            <div className="pt-4 border-l-2 border-amber-400 pl-6 italic text-slate-800 font-medium">
              “Mastering the delicate balance between structure and adaptability.”
            </div>
          </div>

          {/* Profile & Contact Block */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative w-56 h-72 shrink-0">
              <div className="absolute inset-0 border-2 border-amber-500 translate-x-4 translate-y-4 rounded-2xl"></div>
              <div className="relative z-10 w-full h-full bg-slate-200 rounded-2xl overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-4 border-white">
			  <img 
                src="/profile.jpg" 
                alt="S.R.K Profile" 
                className="w-full h-full object-cover"
              />
			  </div>
            </div>
            
            {/* Contact Details Under Photo */}
            <div className="z-20 space-y-3 px-2">
              <a href="tel:9121074408" className="flex items-center gap-3 text-slate-600 hover:text-amber-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                  <Phone size={14} className="text-amber-600" />
                </div>
                <span className="text-xs font-bold tracking-widest">+91 91210 74408</span>
              </a>
              <a href="mailto:srk.llconsultant@gmail.com" className="flex items-center gap-3 text-slate-600 hover:text-amber-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                  <Mail size={14} className="text-amber-600" />
                </div>
                <span className="text-xs font-bold tracking-widest lowercase">srk.llconsultant@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>	  

{/* Philosophy — The Approach */}
      <section id="approach" className="py-24 bg-white border-y border-slate-50 relative overflow-hidden">
        {/* Subtle background decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-amber-600 font-bold">The Philosophy</h2>
              <h3 className="text-3xl md:text-5xl font-serif leading-tight text-slate-900 italic">
                “My experience provides a balanced understanding of systems, including their <span className="text-amber-600">limitations, risks</span>, and effective functioning.”
              </h3>
            </div>
            
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3">
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  I believe effective consultancy comes from lived experience, not theory alone. Understanding loopholes, constraints, and human behavior enables me to anticipate risks, negotiate responsibly, and align outcomes with long-term stability. 
                </p>
              </div>
              <div className="md:col-span-2 pt-2">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-4">Methodology</p>
                  <ul className="space-y-3">
                    {['Observant', 'Ethical', 'Adaptive'].map((trait) => (
                      <li key={trait} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                        {trait}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[10px] text-slate-400 italic">
                    Never rigid. Never reckless.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Capabilities - The Core */}
      <section className="py-24 bg-[#1a1f2e] text-white rounded-[3rem] mx-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Core Competencies</h2>
            <h3 className="text-3xl font-serif italic">The Strategic Scrutiny Framework</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Land Legal Scrutiny */}
            <div className="space-y-8 group">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                <img src="/compliance.png" alt="Compliance Scrutiny" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Scale className="text-amber-500" size={24}/> Land Legal Scrutiny
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Comprehensive property due diligence designed to identify latent risks before they become capital liabilities. Based on 1954-55 root verification.
                </p>
                <div className="grid gap-3 pt-2">
                  {["Title verification & chain analysis", "Section 22-A Prohibited List checks", "Layout & RERA compliance support"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px] text-slate-300">
                      <Check size={14} className="text-amber-500"/> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Negotiation */}
            <div className="space-y-8 group">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                <img src="/handshake.png" alt="Negotiation strategy" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Award className="text-amber-500" size={24}/> Strategic Negotiation
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ethical and informed negotiation mapping that balances developer intent with legal boundaries to ensure sustainable deal closures.
                </p>
                <div className="grid gap-3 pt-2">
                  {["Stakeholder consensus building", "Legal boundary structuring", "High-value decision mediation"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px] text-slate-300">
                      <Check size={14} className="text-amber-500"/> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Technical Arts — Systems & Narrative (Mirrors Core Competencies Style) */}
      <section id="creative" className="py-24 bg-[#1a1f2e] text-white rounded-[3rem] mx-4 mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-amber-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-4">Technical Arts</h2>
            <h3 className="text-3xl font-serif italic">The Intersection of Narrative & Logic</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Script & Narrative Design */}
            <div className="space-y-8 group">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                <img 
                  src="/script-writing.png" 
                  alt="Script & Narrative Design" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <ScrollText className="text-amber-500" size={24}/> Script & Narrative Design
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Structuring complex human behaviors into clear, character-driven narratives for feature films, web series, and professional digital content.
                </p>
                <div className="grid gap-3 pt-2">
                  {["Concept development & pacing logic", "Dialogue grounded in realistic behavior", "Narrative refinement for digital formats"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px] text-slate-300">
                      <Check size={14} className="text-amber-500"/> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Digital Design */}
            <div className="space-y-8 group">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700">
                <img 
                  src="/digital-design.png" 
                  alt="Technical Design Systems" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] to-transparent"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <PenTool className="text-amber-500" size={24}/> Technical Digital Design
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Deploying technical precision through automated workflows and architectural drafting to improve efficiency and visual accuracy.
                </p>
                <div className="grid gap-3 pt-2">
                  {["VBA-based process automation", "AutoCAD architectural drafting support", "Photoshop visual systems & layout"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px] text-slate-300">
                      <Check size={14} className="text-amber-500"/> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

 <footer className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center">
                  <span className="text-amber-500 font-serif font-bold text-sm">S</span>
                </div>
                <h1 className="text-lg font-black tracking-tighter text-slate-800">
                  S.R.K <span className="text-amber-600 font-medium italic tracking-normal">Strategic</span>
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed uppercase tracking-widest font-bold">
                Liaison • Real Estate • Creative
              </p>
            </div>

            <div className="max-w-2xl">
              <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-4">Disclaimer</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed font-light text-justify">
                The information provided on this platform, including “Brief Note” summaries and “Asset Health Indexing,” is intended solely for informational and strategic purposes. All observations and analyses are strictly based on the documents, certified copies, and written clarifications furnished by the client/property owner.</p>
			  <p className="text-[10px] text-slate-400 leading-relaxed font-light text-justify">
				While SRK Strategic undertakes rigorous scrutiny of revenue records, including historical records dating back to 1954–55, the findings and reports generated do not constitute a statutory or binding legal opinion.</p>
			  <p className="text-[10px] text-slate-400 leading-relaxed font-light text-justify">				
				Users are strongly advised to conduct independent legal, financial, and technical due diligence and seek appropriate professional advice before making any financial or investment commitments.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-slate-400">
				© 2026 S.R.K STRATEGIC/S.R.K LL Consultant. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-8 text-[9px] uppercase tracking-widest font-bold text-slate-400">
              <span className="hover:text-amber-600 cursor-default transition-colors">Privacy Policy</span>
              <span className="hover:text-amber-600 cursor-default transition-colors">Terms of Engagement</span>
            </div>
          </div>
        </div>
      </footer>
	</div>
  );
}