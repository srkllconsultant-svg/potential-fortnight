import React from 'react';
import { Scale, PenTool, Phone, Mail, Check, Award, ScrollText, ChevronDown } from 'lucide-react';

const ElegantWebsite = () => {
  return (
    <div className="min-h-screen bg-white text-[#1a1f2e] font-serif selection:bg-amber-100 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <img src="/logo.png" alt="S.R.K Logo" className="h-10 w-auto" />
          <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-bold">
            <a href="#approach" className="hover:text-amber-600 transition-colors">Approach</a>
            <a href="#expertise" className="hover:text-amber-600 transition-colors">Expertise</a>
            <a href="#creative" className="hover:text-amber-600 transition-colors">Creative</a>
            <a href="#connect" className="px-5 py-2.5 bg-[#1a1f2e] text-white hover:bg-amber-700 transition-all">Connect</a>
          </div>
        </div>
      </nav>

      {/* Hero Section — Brand Introduction */}
      <section className="relative pt-40 pb-20 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <span className="inline-block text-amber-600 tracking-[0.4em] uppercase text-[10px] font-bold border-b border-amber-200 pb-1">
              Consultancy Excellence
            </span>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-light tracking-tight">S.R.K</h1>
              <p className="text-xl md:text-2xl font-semibold text-slate-800 leading-tight">
                Legal Liaison <span className="text-amber-600 px-2">·</span> 
                Real Estate Strategist <span className="text-amber-600 px-2">·</span> 
                Creative Consultant
              </p>
            </div>
            <p className="text-base text-slate-500 leading-relaxed max-w-xl">
              A multidisciplinary consultant bridging legal awareness, real estate clarity, and creative intelligence. 
              I work at the intersection of compliance, negotiation, and narrative—helping individuals and developers move forward with confidence.
            </p>
            <p className="text-lg font-medium italic text-[#1a1f2e] border-l-2 border-amber-400 pl-6">
              “Mastering the delicate balance between structure and adaptability.”
            </p>
          </div>

          {/* Profile Image - Refined Frame */}
          <div className="relative w-44 h-44 md:w-52 md:h-52 shrink-0">
            <div className="absolute inset-0 border border-amber-300 translate-x-3 translate-y-3"></div>
            <img 
              src="/profile.jpg" 
              alt="S.R.K" 
              className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Philosophy — The Approach */}
      <section id="approach" className="py-20 bg-white border-y border-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-8">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-slate-400 font-bold">The Philosophy</h2>
            <h3 className="text-2xl md:text-3xl leading-snug font-light text-slate-800 italic">
              “My experience provides a balanced understanding of systems, including their limitations, risks, and effective functioning.”
            </h3>
            <p className="text-base text-slate-500 leading-relaxed">
              I believe effective consultancy comes from lived experience, not theory alone. Understanding loopholes, constraints, and human behavior enables me to anticipate risks, negotiate responsibly, and align outcomes with long-term stability. My approach is observant, ethical, and adaptive—never rigid, never reckless.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise — Professional Capabilities */}
      <section id="expertise" className="py-20 bg-[#1a1f2e] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Land Legal Scrutiny */}
            <div className="space-y-6 group">
              <div className="aspect-video overflow-hidden bg-slate-800">
                 <img src="/compliance.png" alt="Land Scrutiny" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                   <Scale className="text-amber-500" size={24}/> Land Legal Scrutiny
                </h3>
                <p className="text-slate-400 text-sm">Comprehensive land and property due diligence designed to identify risks before they become liabilities.</p>
                <ul className="space-y-2 text-[13px] text-slate-300">
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Title verification and ownership history analysis</li>
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Identification of legal risks and compliance gaps</li>
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Coordination support for layout approvals and RERA processes</li>
                </ul>
                <p className="text-[11px] uppercase tracking-widest text-amber-500 font-bold pt-2">Outcome: Clarity, confidence, and protection before capital commitment.</p>
              </div>
            </div>

            {/* Strategic Negotiation */}
            <div className="space-y-6 group">
              <div className="aspect-video overflow-hidden bg-slate-800">
                 <img src="/handshake.png" alt="Negotiation" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                   <Award className="text-amber-500" size={24}/> Strategic Negotiation
                </h3>
                <p className="text-slate-400 text-sm">Ethical, informed negotiation that balances persuasion with legality.</p>
                <ul className="space-y-2 text-[13px] text-slate-300">
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Structuring negotiations aligned with legal boundaries</li>
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Managing discussions between landowners, developers, and stakeholders</li>
                  <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Acting as a calm intermediary in high-value decisions</li>
                </ul>
                <p className="text-[11px] uppercase tracking-widest text-amber-500 font-bold pt-2">Outcome: Deals that are respected, sustainable, and legally sound.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Creative Consultant — Strategic & Technical Capability */}
      <section id="creative" className="py-20 bg-amber-50/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-6">
            <h2 className="text-4xl font-light text-[#1a1f2e]">
              Creative <span className="font-bold text-amber-600 italic">Consultant</span>
            </h2>
            <p className="text-slate-600 leading-relaxed text-base border-l-2 border-amber-400 pl-6">
              In addition to legal liaison and real estate strategy, I provide structured creative support where analytical thinking, technical skill, and clear communication are essential. My work in this domain is practical, purpose-driven, and aligned with professional outcomes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Script Writing Block */}
            <div className="bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group">
              <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                <img 
                  src="/script-writing.png" 
                  alt="Script Writing" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" 
                />
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-amber-600">
                    <ScrollText size={22}/>
                    <h4 className="font-bold tracking-widest uppercase text-xs text-[#1a1f2e]">Script Writing</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Concept development and script writing for short films, future films, web series, digital narratives, and structured content formats.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scope of Work</p>
                  <ul className="space-y-2 text-[13px] text-slate-600">
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Development of clear, character-driven narratives</li>
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Dialogue writing grounded in realistic human behavior</li>
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Concept refinement with attention to pacing and intent</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-[11px] italic text-[#1a1f2e] leading-relaxed">
                    <span className="font-bold not-italic text-amber-600 mr-2 uppercase tracking-tighter">Professional Focus:</span>
                    Scripts are developed with clarity of purpose, ensuring alignment between creative intent and practical execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Design Block */}
            <div className="bg-white shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 group">
              <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                <img 
                  src="/digital-design.png" 
                  alt="Digital Design" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95" 
                />
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[#1a1f2e]">
                    <PenTool size={22}/>
                    <h4 className="font-bold tracking-widest uppercase text-xs">Digital Design</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Technical design and workflow support aimed at improving efficiency, accuracy, and presentation.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Capabilities</p>
                  <ul className="space-y-2 text-[13px] text-slate-600">
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Process automation and data handling using VBA</li>
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Architectural and technical drafting support (AutoCAD)</li>
                    <li className="flex gap-2"><Check size={14} className="text-amber-500 mt-1"/> Visual communication and layout design (Photoshop)</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-50">
                  <p className="text-[11px] italic text-[#1a1f2e] leading-relaxed">
                    <span className="font-bold not-italic text-[#1a1f2e] mr-2 uppercase tracking-tighter">Professional Focus:</span>
                    Design solutions are approached as functional systems—structured, precise, and outcome-oriented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact — Call to Action */}
      <section id="connect" className="py-24 text-center bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 space-y-8">
          <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-amber-600">Inquiries</h2>
          <h3 className="text-4xl md:text-5xl font-light">Let’s build with clarity.</h3>
          <p className="text-slate-500">
            Whether you require strategic guidance, compliance insight, or creative collaboration, meaningful conversations begin with transparency.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 pt-6">
            <a href="tel:9121074408" className="flex items-center justify-center gap-3 hover:text-amber-600 transition-colors text-xl font-medium">
              <Phone size={20} className="text-amber-600"/> +91 91210 74408
            </a>
            <a href="mailto:srk.llconsultant@gmail.com" className="flex items-center justify-center gap-3 hover:text-amber-600 transition-colors text-xl font-medium">
              <Mail size={20} className="text-amber-600"/> srk.llconsultant@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#fcfcfd] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <p className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-bold">© 2026 S.R.K. | Results‑Driven Real Estate Solutions</p>
          <div className="text-[11px] text-slate-400 italic leading-relaxed opacity-80 pt-6 border-t border-slate-200">
            Disclaimer: Non‑advocate professional opinions intended for business strategy and advisory purposes only. 
            Formal legal representation must be undertaken by a licensed advocate.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ElegantWebsite;