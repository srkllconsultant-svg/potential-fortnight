"use client";


import BriefNote from '@/components/BriefNote';
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Gavel, FileSearch, UserCircle2, FileText, 
  ArrowRight, ScrollText, Check, ChevronDown, ChevronRight, FileBarChart,
  Search, ShieldAlert, Menu, X, Clock, BarChart3, PenTool, Phone, Mail, ClipboardCheck
} from 'lucide-react';


export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

const navLinks = [
    { name: 'Expertise', href: '#expertise' },
    { name: 'Creative', href: '#creative' },
    { name: 'Our Process', href: '#process' },
    { name: 'Resources', href: '#resources' },
    { name: 'Profile', href: '/about' } ];

  const vettingChecklist = [
    "Certified/True copy of P.T. register extract (or) Endorsement/Memo for No P.T.",
    "Certified/True copy of Kashra Pahani 1954-55.",
    "Certified/True copy of Cesala/Sesala Pahani 1955-58.",
    "Certified/True copy of Old ROR 1979-80.",
    "Certified/True copy of New ROR 1989-90.",
    "Certified/True copy of Pahanis for the years 1960-61, 1964-65, 1969-70, 1971-72, 1974-75, 1979-80, 1984-85, 1989-90, 1994-95, 1999-2000, 2004-05, 2009-10, 2014-15 & 2015-16.",
    "Certified/True copy of Sethwar along with English Translation.",
    "Certified/True copy of Wasool Baqui with English Translation.",
    "Mandal Surveyor report with Panchanama.",
    "Copy of Village MAP.",
    "Survey MAP with physical boundaries and approach road width; along with detailly showing the individual Pattadars extent in their respective survey numbers.",
    "If INAM is present, the Pattadars/Sellers have to clear the same.",
    "Family Genealogy of Original Pattadar(s).",
    "Family Genealogy of Present Pattadar(s).",
    "Aadhaar Cards of Present Pattadars.",
    "Encumbrance Certificate (EC) since 1970.",
    "NALA/Non-Agricultural Conversion Certificate (where applicable).",
	"All Link documents. (Example: Proceedings, Old Pattadar Passbooks, Old Title Deeds, Digital Pattadar Passbook & Title Deeds, Sale Deeds, Gift Deeds, Agreements, Mortgage Deeds [or] etc.,)."
  ];

  const timelineSteps = [
    { day: "Day 01-02", task: "Initial link verification based on the documents provided by the client." },
    { day: "Day 03-05", task: "Identification of any shortfall and communication of the same. Based on the receipt of additional documents, the processing timeline will be extended as required." },
    { day: "Day 06-08", task: "Observations and requests for clarification based on the identified shortfall." },
    { day: "Day 09-10", task: "Upon receipt of all clarifications and supporting documents, issuance of Document Scrutiny or Legal Opinion, followed by completion of final asset health indexing." }
  ];

  const healthScoreMetrics = [
    { title: "Title Clarity (40%)", desc: "Unbroken chain of link documents since 1954." },
    { title: "Physical Possession (30%)", desc: "Fencing, encroachment check, and boundary match." },
    { title: "Revenue Alignment (20%)", desc: "Pahani, ROR, and Sethwar name consistency." },
    { title: "Regulatory Safety (10%)", desc: "Masterplan check (Zoning, Buffer zones, etc.)" }
    ];

  return (
    <main className="min-h-screen bg-white">
      {/* 3. PASTE THE NAV BLOCK HERE */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100">
  <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-24 flex items-center justify-between">
    
    {/* Logo */}
    <Link href="/" className="flex items-center gap-3 shrink-0">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-lg flex items-center justify-center">
        <span className="text-amber-500 font-serif font-bold text-lg">S</span>
      </div>
      <div className="flex flex-col">
        <h1 className="text-sm md:text-xl font-black tracking-tighter text-slate-900 leading-none">
          S.R.K <span className="text-amber-600 font-medium italic tracking-normal">Strategic</span>
        </h1>
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Liaison | Real Estate | Creative </span>
      </div>
    </Link>

    {/* Desktop Navigation Links */}
    <div className="hidden lg:flex items-center gap-8">
      {navLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-amber-600 transition-colors"
        >
          {link.name}
        </a>
      ))}
    </div>

    {/* Action Buttons: Portal + Call + Mobile Menu */}
    <div className="flex items-center gap-2 md:gap-4">
      
      {/* Client Portal Button - Visible on Desktop, Hidden on very small screens */}
       {/*<Link href="/login" className="hidden sm:flex items-center gap-2 border-2 border-slate-900 text-slate-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"      >*/}
		   {/* <ShieldCheck size={14} />*/}
			   {/*Client Portal*/}
				   {/*</Link>*/}

      {/* Call Button */}
      <a 
        href="tel:9121074408" 
        className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all shadow-md shadow-amber-200"
      >
       <Phone size={14} />
        <span className="hidden md:inline">Call</span>
      </a>

     {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="lg:hidden p-2 text-slate-900"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown Menu */}
  <div className={`lg:hidden bg-white border-b overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
    <div className="flex flex-col p-6 gap-4">
      {navLinks.map((link) => (
        <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex justify-between font-bold text-[11px] uppercase tracking-widest text-slate-600 border-b border-slate-50 pb-2">
          {link.name} <ChevronRight size={14} className="text-amber-500" />
        </a>
      ))}
      {/* Add Portal to the Mobile Menu too */}
      <Link href="/portal" className="mt-4 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest">
        <ShieldCheck size={16} /> Client Portal
      </Link>
    </div>
  </div>
</nav>

      <header className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            <ShieldCheck size={14} className="text-amber-600" /> High-Stakes Real Estate Vetting
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Invest with <span className="text-amber-600 italic font-serif font-medium underline decoration-slate-200 underline-offset-8">Clarity.</span><br />
            Move with Certainty.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 leading-relaxed mb-12 font-light">
            Professional legal liaisoning and property scrutiny. We transform complex land records into clear, actionable intelligence for secure acquisitions.
          </p>
{/*          <div className="flex justify-center"> */}
{/*            <Link href="/login" className="group px-8 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-950 transition-all flex items-center gap-3 shadow-xl"> */}
{/*              Access My Property Report /*}
{/*              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-amber-500" />*/}
{/*            </Link>*/}
{/*          </div>*/}
        </div>
      </header>

      {/* expertise Section */}
      <section id="expertise" className="max-w-7xl mx-auto px-10 py-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard icon={<FileSearch size={30} />} title="Legal Scrutiny" desc="Exhaustive verification of link documents and title history." />
<Link href="/liaison-support" className="block h-full">          <ServiceCard icon={<Gavel size={30} />} title="Liaison Support" desc="Direct coordination with authorities to streamline approvals." /> </Link>
          <ServiceCard icon={<ScrollText size={30} />} title="Drafting Studio" desc="Professional drafting of Deeds and GPAs based on verified data." isDrafting />
<div className="relative group p-8 bg-slate-900 rounded-3xl shadow-xl text-white cursor-help overflow-visible">
  {/* THE HEALTH SCORE TOOLTIP */}
  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-10 transition-all duration-500 pointer-events-none z-50">
    <div className="bg-amber-500 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 whitespace-nowrap">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
      </span>
      <span className="text-slate-900 text-[9px] font-black uppercase tracking-[0.2em]">Live Indexing Engine Syncing</span>
    </div>
    <div className="w-2 h-2 bg-amber-500 rotate-45 mx-auto -mt-1"></div>
  </div>

  <ShieldCheck className="text-amber-500 mb-6" size={32} />
  <h3 className="text-lg font-bold mb-3">Health Score</h3>
  <p className="text-slate-400 text-xs leading-relaxed font-light">
    Our proprietary index quantifying asset risk via a numerical safety index.
  </p>
</div>
        </div>
      </section>

{/* Technical Arts Section — Creative Intelligence */}
      <section id="creative" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase font-bold text-amber-600">Technical Arts</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic text-slate-900 leading-tight">
                Creative <span className="text-amber-600">Consultancy</span>
              </h3>
            </div>
            <p className="text-slate-500 max-w-md text-sm font-light leading-relaxed border-l border-slate-200 pl-6">
              Applying structured logic and technical precision to narrative design and digital systems. I bridge the gap between creative intent and functional execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Block 1: Script & Narrative */}
            <div className="group relative overflow-hidden bg-slate-50 rounded-[2rem] p-10 hover:bg-slate-100 transition-all duration-500 border border-slate-100">
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm">
                  <ScrollText size={24} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-slate-900">Script & Narrative Design</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Structuring character-driven narratives for feature films and web series, grounded in realistic human behavior and precise pacing logic.
                  </p>
                </div>
                <ul className="space-y-2 pt-4">
                  {['Concept Refinement', 'Dialogue Writing', 'Structural Pacing'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                      <div className="w-1 h-1 bg-amber-500 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                <ScrollText size={200} />
              </div>
            </div>

            {/* Block 2: Digital Systems */}
            <div className="group relative overflow-hidden bg-slate-900 rounded-[2rem] p-10 hover:bg-[#1a1f2e] transition-all duration-500">
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-amber-500 backdrop-blur-sm">
                  <PenTool size={24} />
                </div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-bold text-white">Technical Digital Design</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Deploying technical precision through VBA-based process automation, AutoCAD drafting, and high-end visual communication systems.
                  </p>
                </div>
                <ul className="space-y-2 pt-4">
                  {['VBA Automation', 'AutoCAD Drafting', 'Visual Systems'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                      <div className="w-1 h-1 bg-amber-500 rounded-full" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500 text-white">
                <PenTool size={200} />
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Our Process - The Layers of Scrutiny */}
<section id="process" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-50">
  <div className="flex flex-col md:flex-row gap-16">
    <div className="md:w-1/3">
      <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-600 mb-4">The Scrutiny Framework</h2>
      <h3 className="text-4xl font-serif text-slate-900 italic leading-tight">Beyond the <br/>Surface Level</h3>
      <p className="mt-6 text-slate-500 font-light leading-relaxed">
        Unlike conventional checks limited to current ownership, we analyze the land’s ‘DNA’; validating the continuity of rights across generations and governing regimes, based on the submitted documentation.
      </p>
    </div>
    
    <div className="md:w-2/3 space-y-12">
      <ProcessStep 
        number="01" 
        title="Evolution of Title (Regime Mapping)" 
        desc="We trace the land from the provided 1954-55 Kashra Pahani through the 1955-58 Cesala Pahani and the Old/New ROR periods. This ensures the 'Pattadar' status was legally birthed and transitioned without gaps." 
      />
      <ProcessStep 
        number="02" 
        title="Revenue-Physical Reconciliation" 
        desc="We cross-verify the prvodied Sethwar (initial survey) and village maps against physical boundaries, as per the provided survey report, road widths, and individual Pattadar extents. This confirms whether your ‘paper acres’ actually exist on the ground." 
      />
      <ProcessStep 
        number="03" 
        title="Prohibited Integrity" 
        desc="A deep dive into online land record portals (BhuBharati, Dharani, MeeBhoomi, or any competent authority) to identify prohibited list markers, Khata discrepancies, or pending mutation proceedings that could stall a sale." 
      />
      <ProcessStep 
        number="04" 
        title="Risk Quantification (Brief Note)" 
        desc="All findings are synthesised into a ‘Brief Note’. We identify ‘Further Documents Required’ (Section VII) and provide an indemnity-backed observation on the asset’s health, strictly based on the documents provided and written clarifications submitted." 
      />
    </div>
  </div>
</section>

      {/* Resources Section */}
      <section id="resources" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-24 border-t border-slate-50">
        <div className="mb-12">
          <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-600 mb-4 text-center">Liaison Toolkits</h2>
          <p className="text-4xl font-serif text-slate-900 text-center italic">Professional Intelligence for Investors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ToolkitCard 
            icon={<ScrollText size={48} />} 
            title="Vetting Checklist 2026" 
            desc="Essential documents required for high-value acquisitions." 
            onClick={() => setActiveModal('checklist')}
          />
          <ToolkitCard 
            icon={<Clock size={48} />} 
            title="SOP & Timeline" 
            desc="The 10-day lifecycle of a professional property scrutiny." 
            onClick={() => setActiveModal('timeline')}
          />
          <ToolkitCard 
            icon={<ClipboardCheck size={48} />} 
            title="Sample Basic Report" 
            desc="Illustrative preview of the Basic Report." 
            onClick={() => setActiveModal('health')}
          />
        </div>
      </section>

      {/* MODAL SYSTEM */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl relative border border-slate-100 flex flex-col scale-in">
            
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-serif text-slate-900">
                {activeModal === 'checklist' && "Essential Vetting Documents"}
                {activeModal === 'timeline' && "Standard Scrutiny Timeline"}
                {activeModal === 'health' && "Sample Breif Note"}
              </h3>
              <button onClick={() => setActiveModal(null)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              {activeModal === 'checklist' && (
                <div className="space-y-4">
                  {vettingChecklist.map((doc, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="text-[10px] font-bold text-amber-600 pt-1">{(i+1).toString().padStart(2, '0')}</span>
                      <p className="text-sm text-slate-600 font-light leading-relaxed">{doc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'timeline' && (
                <div className="space-y-8">
                  {timelineSteps.map((step, i) => (
                    <div key={i} className="relative pl-8 border-l border-slate-100">
                      <div className="absolute -left-1.5 top-1 w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm" />
                      <p className="text-[10px] font-bold text-amber-600 uppercase mb-1 tracking-widest">{step.day}</p>
                      <p className="text-sm text-slate-800 font-medium">{step.task}</p>
                    </div>
                  ))}
                </div>
              )}

{activeModal === 'health' && (
  <div className="p-4 overflow-y-auto bg-white">
    <BriefNote />
  </div>
)}
            </div>

            <div className="p-6 bg-white border-t border-slate-50 text-center">
              <button onClick={() => setActiveModal(null)} className="bg-slate-900 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-amber-600 transition-all">
                Close Toolkit
              </button>
            </div>
          </div>
        </div>
      )}

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
				While S.R.K Strategic undertakes rigorous scrutiny of revenue records, including historical records dating back to 1954–55, the findings and reports generated do not constitute a statutory or binding legal opinion.</p>
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
	  {/*   </div>*/}
	</main>
  );
}

// Internal Components
// Corrected Internal Components Block
function ToolkitCard({ icon, title, desc, onClick }: { icon: any, title: string, desc: string, onClick: () => void }) {
  return (
    <div onClick={onClick} className="group cursor-pointer p-2 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-transparent hover:border-slate-100">
      <div className="aspect-[4/3] bg-slate-50 rounded-3xl mb-6 overflow-hidden relative flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
        <div className="text-slate-300 group-hover:text-amber-500 transition-all duration-500 transform group-hover:scale-110">
          {icon}
        </div>
      </div>
      <div className="px-4 pb-4">
        <h4 className="font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">{title}</h4>
        <p className="text-xs text-slate-400 leading-relaxed font-light">{desc}</p>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <span className="text-2xl font-serif text-slate-200">{number}</span>
      <div>
        <h4 className="text-lg font-bold text-slate-800 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 font-light">{desc}</p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc, isDrafting = false }: { icon: any, title: string, desc: string, isDrafting?: boolean }) {
  const getStatusMessage = (title: string) => {
  if (title === "Legal Scrutiny") return "Digital Scrutiny Engine Syncing";
  if (title === "Liaison Support") return "Liaison Protocol Active"; // Updated this
  return "Module Under Integration";
};

  // Define the inner card content exactly as you had it
  const cardInner = (
    <div className="relative group p-8 bg-white rounded-3xl border border-slate-100 hover:border-amber-200 shadow-sm transition-all duration-300 cursor-pointer overflow-visible h-full">
      
      {/* THE POPUP - Conditional Rendering added here */}
      {title !== "Drafting Studio" && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-[999] w-max">
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-amber-500 text-[9px] font-black uppercase tracking-[0.2em]">
              {getStatusMessage(title)}
            </span>
          </div>
          <div className="w-2 h-2 bg-slate-900 rotate-45 mx-auto -mt-1 border-r border-b border-slate-700"></div>
        </div>
      )}

      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 mb-6 group-hover:bg-slate-900 group-hover:text-amber-500 transition-all">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed font-light">{desc}</p>
      
      {isDrafting && (
        <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-amber-600 tracking-tighter uppercase">
          <Check size={12}/> Document Ready
        </div>
      )}
    </div>
  );

  // If it's the Drafting card, wrap it in a Link to the new page
  if (isDrafting) {
    return (
      <Link href="/drafting-studio" className="block">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}