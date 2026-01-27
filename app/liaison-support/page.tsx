"use client";

import React from 'react';
import Link from 'next/link';
import { 
  Gavel, 
  Landmark, 
  Building2, 
  MapPin, 
  Search,
  LayoutGrid,
  ClipboardList,
  AlertTriangle,
  Zap,
  ShieldAlert,
  ChevronRight 
} from 'lucide-react';

/**
 * LIAISON SUPPORT PAGE - S.R.K STRATEGIC
 * Last Updated: 2026
 * Features: Sticky Nav, Anchored Scroll, Responsive Dark/Light Sections
 */

export default function LiaisonSupportPage() {
  const locationState = "Telangana"; 

  // Smooth scroll handler with offset for sticky headers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* 1. PRIMARY NAVIGATION */}
      <nav className="no-print w-full sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 h-16 md:h-20 flex items-center px-6 justify-between">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-amber-500 font-serif font-bold text-lg">S</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm md:text-xl font-black tracking-tighter text-slate-900 leading-none">
              S.R.K <span className="text-amber-600 font-medium italic tracking-normal">Strategic</span>
            </h1>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Liaison Support</span>
          </div>
        </Link>
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
          <MapPin size={12} className="text-amber-600" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{locationState}</span>
        </div>
      </nav>

      {/* 2. CATEGORY QUICK-JUMP BAR */}
      <div className="no-print sticky top-16 md:top-20 z-[90] bg-slate-900 py-3 overflow-x-auto border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-4 md:gap-10 whitespace-nowrap">
    <button onClick={() => scrollToSection('authority-matrix')} className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
      <LayoutGrid size={14} /> Authority Matrix
    </button>
    <button onClick={() => scrollToSection('approval-protocol')} className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
      <ClipboardList size={14} /> Approval Protocol
    </button>
    <button onClick={() => scrollToSection('issue-resolution')} className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
      <AlertTriangle size={14} /> Bottleneck Resolution
    </button>
    {/* NEW PRICING BUTTON */}
    <button onClick={() => scrollToSection('pricing-structure')} className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
      < Landmark size={14} /> Pricing
    </button>
    <button onClick={() => scrollToSection('regulatory-cta')} className="flex items-center gap-2 text-[10px] font-black text-white/60 hover:text-amber-500 uppercase tracking-widest transition-colors">
      <Search size={14} /> Regulatory Review
    </button>
  </div>
</div>

      {/* 3. AUTHORITY MATRIX */}
      <section id="authority-matrix" className="py-24 px-6 border-b border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mb-4">Jurisdictional Hierarchy</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
                Revenue & Survey <span className="italic font-serif text-amber-600">Matrix</span>
              </h3>
              <div className="space-y-10">
                {[
                  { level: "District/RDO Level", text: "Collectorate liaison for NALA conversions, large scale land use changes, and land regularization.", icon: <Landmark size={20}/> },
                  { level: "Mandal/Tehsil Level", text: "Ground coordination for Mutation proceedings, Pahani corrections, and Succession/Virasat entries.", icon: <Building2 size={20}/> },
                  { level: "Survey Department", text: "Technical alignment for Demarcation, Sub-division.", icon: <Search size={20}/> },
                  { level: "Technical & Legal", text: "Liaison for Architectural drafting, Layout/Building approvals, and coordination with External Advocates.", icon: <Gavel size={20}/> }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group text-left">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-slate-50 text-amber-600 flex items-center justify-center transition-all group-hover:bg-amber-600 group-hover:text-white shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.level}</h4>
                      <p className="text-base text-slate-600 font-light leading-relaxed italic">"{item.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full bg-slate-50 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-inner">
              <h4 className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-[0.4em] text-center">Core Representative Tasks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "NALA Conversions/C.L.U.", "Mutation Proceedings", "Pahani Corrections", 
                  "Succession/Virasat", "Demarcation (Survey)", "Private Survey"
                  "Rectification", "Layout/Building Plan Drafting", "Shortfall Analysis", 
                  "Multi-Department NOCs", "Legal Compliance Support", "Coordinatoin with Advocates"
                ].map((task) => (
                  <div key={task} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-[9px] font-bold text-slate-600 text-center uppercase tracking-widest hover:border-amber-500 transition-all">
                    {task}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPROVAL PROTOCOL */}
      <section id="approval-protocol" className="py-24 px-6 border-b border-slate-100 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em] mb-4">Approval Protocol</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                <span className="italic font-serif text-amber-600">Approval</span> Management
              </h3>
              <div className="space-y-8">
                {[
                  { step: "01", text: "Technical Drafting: Assisting in Layout and Building plans aligned with regional bye-laws." },
                  { step: "02", text: "Authority Liaison: Strategic coordination across competent authorities for approval cycles." },
                  { step: "03", text: "Legal Support: Facilitating direct engagement with counsel for title due diligence." },
                  { step: "04", text: "Lifecycle Coordination: Ongoing advisory through construction to final occupancy docs." }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-row gap-6 group text-left">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-900 text-amber-500 flex items-center justify-center text-xs font-bold shadow-lg">
                      {item.step}
                    </div>
                    <p className="text-base text-slate-500 font-light leading-relaxed italic">"{item.text}"</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-1/2 w-full bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl">
              <h4 className="text-[10px] font-black text-white/40 mb-8 uppercase tracking-[0.4em] text-center">Inter-Departmental Liaison</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Town Planning / U.D.A.", "Municipal Corporation / U.L.B.", "Fire & Emergency Services", 
                  "State Pollution Control (N.O.C.)", "Revenue & Records", "Irrigation & Water Resources", 
                  "Aviation / A.A.I. (N.O.C.)", "National & State Highways", "R.E.R.A. Compliance Cell", "Registration & Stamps"
                ].map((dept) => (
                  <div key={dept} className="bg-white/5 p-4 rounded-xl border border-white/10 text-[9px] font-bold text-amber-600 text-center uppercase tracking-widest hover:border-amber-500 transition-all cursor-default">
                    {dept}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTLENECK RESOLUTION */}
      <section id="issue-resolution" className="py-24 bg-slate-900 text-white overflow-hidden relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4">Strategic Resolution</h2>
            <h3 className="text-3xl md:text-5xl font-serif italic">Navigating Technical Bottlenecks</h3>
            <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-sm font-light">
              Regulatory hurdles stem from historical data gaps. We provide facilitation to bridge administrative requirements and ground reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <ShieldAlert/>, title: "Prohibited Registry", desc: "Technical representation for properties under restrictive categories like endowment or custodial." },
              { icon: <Zap/>, title: "Digital Reconciliation", desc: "Navigating complex grievance modules to address systemic digital record discrepancies." },
              { icon: <Search/>, title: "Field Coordination", desc: "Ensuring survey applications are backed by correct Tipon or FMB data for physical possession." },
              { icon: <Gavel/>, title: "Statutory Deadlocks", desc: "Resolving stalled approvals due to overlapping jurisdictions or conflicting departmental notifications." }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="group p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-all flex flex-col justify-between min-h-[350px]"
              >
                <div>
                  <div className="text-amber-500 mb-8 group-hover:scale-110 transition-transform origin-left">
                    {React.cloneElement(card.icon as React.ReactElement<any>, { size: 32 })}
                  </div>
                  <h4 className="text-xl font-bold mb-4 tracking-tight">{card.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-6">
                  <div className="w-8 h-1 bg-amber-500/20 rounded-full group-hover:w-12 group-hover:bg-amber-500 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

	{/* 6. PRICING STRUCTURE */}
<section id="pricing-structure" className="py-40 px-6 bg-slate-50 border-y border-slate-100 scroll-mt-32 relative">
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="grid lg:grid-cols-3 gap-12 items-stretch">
      
      {/* Sidebar Text */}
      <div className="flex flex-col justify-center">
        <h4 className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.4em] mb-6">Fee Structure</h4>
        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">
          Transparent & <br/> <span className="italic font-serif text-amber-600">Value-Driven</span>
        </h3>
        <p className="text-slate-500 text-sm font-light leading-relaxed max-w-sm">
          Our engagement model is designed to provide clarity before commitment. We prioritize solving technical deadlocks with a clear roadmap of costs.
        </p>
      </div>
      
      {/* Card 1: Audit & Briefing */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between min-h-[450px] transition-transform hover:-translate-y-2">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 mb-8">
            <ClipboardList size={24} />
          </div>
          <h5 className="font-bold text-slate-900 mb-4 text-xl tracking-tight uppercase">Audit & <br/>Briefing Fee</h5>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            A comprehensive diagnostic of your existing land records. Includes a physical verification of the ground reality vs. digital entries and a formal strategic briefing on the path forward.
          </p>
        </div>
        <div className="pt-8 border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Standard Retainer</span>
          <span className="text-amber-600 font-bold text-2xl tracking-tighter">Fixed Retainer</span>
        </div>
      </div>

      {/* Card 2: Performance-Based */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between min-h-[450px] transition-transform hover:-translate-y-2">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-500 mb-8">
            <Zap size={24} />
          </div>
          <h5 className="font-bold text-slate-900 mb-4 text-xl tracking-tight uppercase">Performance-<br/>Based Execution</h5>
          <p className="text-slate-500 text-sm font-light leading-relaxed">
            Custom pricing tailored to the specific resolution of bottlenecks. Fees are calculated based on land extent (Acres), complexity of departmental notifications, and the nature of the statutory deadlock.
          </p>
        </div>
        <div className="pt-8 border-t border-slate-50">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Success Oriented</span>
          <span className="text-amber-600 font-bold text-2xl tracking-tighter">Custom Quote</span>
        </div>
      </div>

    </div>
  </div>

  {/* Subtle Background Decoration to fill visual space */}
  <div className="absolute left-0 bottom-0 opacity-[0.03] pointer-events-none select-none">
    <h2 className="text-[20rem] font-black leading-none -ml-20 -mb-20">FEE</h2>
  </div>
</section>

      {/* 7. CALL TO ACTION (Initiate Regulatory Review) */}
      <section id="regulatory-cta" className="py-32 px-6 text-center scroll-mt-32 border-t border-slate-50">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Accepting Strategic Inquiries</span>
          </div>

          <h3 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tight">
            Initiate a <span className="italic font-serif text-amber-600">Regulatory Review</span>
          </h3>

          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mb-12 max-w-2xl mx-auto italic">
            "Our Regulatory Review process provides a comprehensive audit of your land records, identifying potential setbacks before they become legal hurdles. We analyze your specific case against current Revenue and Municipal frameworks to chart a clear path for approval."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/inquiry/liaison-support" 
              className="group relative bg-slate-900 text-white px-12 py-6 rounded-2xl font-bold shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Request Case Briefing</span>
              <ChevronRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Est. Response Time: 24-48 Hours
            </p>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="no-print py-12 bg-white border-t border-slate-100 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="shrink-0">
             <h1 className="text-xs font-black tracking-tighter text-slate-800 uppercase">S.R.K <span className="text-amber-600">Strategic</span></h1>
             <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-2 font-bold">Liaison Support • Technical Facilitation</p>
          </div>
          <p className="text-[8px] text-slate-400 max-w-2xl italic">S.R.K Strategic provides technical facilitation and liaison support. All representative actions are performed in accordance with Land Revenue Codes and Municipal Bye-laws. © 2026 S.R.K STRATEGIC.</p>
        </div>
      </footer>
    </main>
  );
}