"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ChevronDown, MapPin, FileText, ShieldCheck, 
  Download, Printer, Loader2, Home, Construction, Banknote, 
  Landmark, Building2, Gift, Key, Briefcase, Gavel, Globe, 
  RotateCcw, ChevronLeft, ChevronRight, Plus, Minus, Search, 
  XCircle, TrendingUp, Film, Tv, Users2, Music, Megaphone, Smartphone,
  Code, User, Ticket  
} from 'lucide-react';

import { getTemplateContent } from '@/lib/actions';

// Add this after the categories object
const subTypeConfigs = {
  "Real Estate & Land": [
    { id: "flat", label: "Flat/Apartment", icon: <Building2 size={12} /> },
    { id: "plot", label: "Plot", icon: <MapPin size={12} /> },
    { id: "Land", label: "Land", icon: <MapPin size={12} /> },
	{ id: "house", label: "House/Villa", icon: <Home size={12} /> },
    { id: "office", label: "Office Space", icon: <Briefcase size={12} /> },
    { id: "shop", label: "Commercial Shop", icon: <Landmark size={12} /> }
  ],
  "Finance & Banking": [
    { id: "vehicle", label: "Vehicle", icon: <RotateCcw size={12} /> },
    { id: "machinery", label: "Machinery", icon: <Construction size={12} /> },
    { id: "business", label: "Business Assets", icon: <Briefcase size={12} /> }
  ],
  "Employment & HR": [
    { id: "senior", label: "Executive/C-Suite", icon: <ShieldCheck size={12} /> },
    { id: "general", label: "General Staff", icon: <Users2 size={12} /> }
  ]
};


export default function DraftingStudio() {
  // --- DATASET ---
  const categories = {
  legal: [
    { title: "Real Estate & Land", icon: <Home size={14} />, items: ["Agreement of Sale", "Agreement of Sale with Possession", "Agreement to Sell", "Conveyance Deed", "Deed of Assignment", "Deed of Cancellation", "Deed of Confirmation", "Deed of Exchange", "Deed of Partition", "Deed of Rectification", "Deed of Release / Relinquishment", "Deed of Transfer", "Handing Over / Taking Over Letter", "Maintenance Agreement", "Possession Letter", "Possession Receipt", "Sale Deed", "Supplementary Deed"] },
    { title: "Construction & Infra", icon: <Construction size={14} />, items: ["Architect Agreement", "Area Sharing Agreement", "Building Contract Agreement", "Collaboration Agreement", "Construction Agreement", "Consultant Agreement", "Development Agreement", "Development Agreement cum Irrevocable General Power of Attorney", "EPC Contract", "Joint Development Agreement (JDA)", "Project Management Agreement", "Redevelopment Agreement", "Revenue Sharing Agreement", "Structural Engineer Agreement", "Turnkey Agreement"] },
    { title: "Finance & Banking", icon: <Banknote size={14} />, items: ["Business Loan Agreement", "Corporate Guarantee", "Deed of Charge", "Deed of Hypothecation", "Demand Promissory Note", "Equitable Mortgage Deed", "Guarantee Agreement", "Home Loan Agreement", "Letter of Comfort", "Loan Agreement", "Mortgage Deed", "Mortgage Deed (for Approvals)", "Personal Guarantee", "Personal Loan Agreement", "Registered Mortgage Deed", "Security Agreement", "Simple Mortgage Deed"] },
    { title: "Technology & IT", icon: <Code size={14} />, items: ["Data Processing Agreement (DPA)", "End User License Agreement (EULA)", "Privacy Policy", "SaaS Agreement", "Service Level Agreement (SLA)", "Software Development Agreement", "Software Licensing Agreement", "Website Terms & Conditions"] },
    { title: "Corporate & Commercial", icon: <Landmark size={14} />, items: ["Agency Agreement", "Articles of Association (AOA)", "Authorization Letter", "Board Minutes", "Board Resolution", "Distribution Agreement", "Franchise Agreement", "Memorandum of Association (MOA)", "Mutual NDA", "Power of Attorney (Corporate)", "Shareholder Resolution", "Supplier Agreement", "Vendor Agreement"] },
    { title: "Employment & HR", icon: <Briefcase size={14} />, items: ["Appointment Letter", "Code of Conduct", "Confidentiality Agreement", "Consultancy Agreement", "Employee Stock Option Plan (ESOP)", "Employment Agreement", "Experience Certificate", "Internship Agreement", "Non-Compete Agreement", "Non-Disclosure Agreement (NDA)", "Non-Solicitation Agreement", "Relieving Letter", "Resignation Acceptance Letter", "Retainer Agreement", "Service Agreement", "Termination Letter", "Training Agreement", "Work From Home Policy"] },
    { title: "Lease & License", icon: <Building2 size={14} />, items: ["Agreement for Sub-Tenancy", "Commercial Lease Agreement", "Lease Deed", "Lease Renewal Agreement", "Lease Termination Agreement", "Leave and License Agreement", "Rental Agreement", "Residential Lease Agreement", "Sub-Lease Deed", "Tenancy Agreement"] },
    { title: "Gift & Succession", icon: <Gift size={14} />, items: ["Codicil to Will", "Conditional Gift Deed", "Family Arrangement Deed", "Family Settlement Deed", "Gift Deed", "Gift Deed (for Approvals)", "Legal Heir Declaration", "Settlement Deed", "Trust Deed", "Will"] },
    { title: "Personal & Family", icon: <User size={14} />, items: ["Child Custody Agreement", "Maintenance Agreement", "Marriage Contract", "Mutual Consent Divorce Petition", "Name Change Affidavit", "Pre-nuptial Agreement"] },
    { title: "Investment & Funding", icon: <TrendingUp size={14} />, items: ["Asset Purchase Agreement", "Investment Agreement", "Joint Venture Agreement", "Letter of Intent (LOI)", "LLP Agreement", "Memorandum of Understanding (MOU)", "Partnership Deed", "Share Purchase Agreement", "Share Subscription Agreement", "Shareholders Agreement", "Term Sheet"] },
    { title: "Govt & Compliance", icon: <ShieldCheck size={14} />, items: ["Affidavit", "Agreement for Approvals", "Application for Approval", "Completion Certificate", "Declaration", "No Objection Certificate (NOC)", "Occupancy Certificate", "Possession Certificate", "Power of Attorney for Liaison", "Undertaking Letter"] },
    { title: "Dispute & Legal", icon: <Gavel size={14} />, items: ["Arbitration Agreement", "Cancellation Deed", "Compromise Deed", "Exit Agreement", "Legal Notice", "Reply to Legal Notice", "Settlement Agreement", "Termination Agreement"] }
  ],
  creative: [
    { title: "Film Production", icon: <Film size={14} />, items: ["Associate Producer Agreement", "Co-Production Agreement (Film/TV)", "Completion Bond Agreement", "Executive Producer Agreement", "Film Assignment Agreement (All Rights)", "Film Distribution Agreement", "Film Exhibition Agreement", "Film Financing Agreement", "Film Production Agreement", "Line Production Agreement"] },
    { title: "TV & Digital Content", icon: <Tv size={14} />, items: ["Channel Broadcast Agreement", "Content Acquisition Agreement", "Content Commissioning Agreement", "OTT Platform Content License Agreement", "Reality Show Format Agreement", "Syndication Agreement", "Television Serial Production Agreement", "Web Series Production Agreement"] },
    { title: "Artist & Crew", icon: <Users2 size={14} />, items: ["Actor Agreement", "Anchor / Host Agreement", "Assistant Director Agreement", "Background Artist Agreement", "Child Artist Agreement", "Choreographer Agreement", "Cinematographer Agreement", "Dialogue Writer Agreement", "Director Agreement", "Dubbing Artist Agreement", "Editor Agreement", "Lead Actor Exclusive Engagement Agreement", "Lyricist Agreement", "Music Director Agreement", "Screenwriter Agreement", "Supporting Artist Agreement", "VFX / Animation Services Agreement"] },
    { title: "Events & Live", icon: <Ticket size={14} />, items: ["Event Management Agreement", "Live Performance Contract", "Technical Rider", "Ticketing Agreement", "Venue Hire Agreement"] },
    { title: "Music & Audio", icon: <Music size={14} />, items: ["Composer Royalty Agreement", "Master Rights License Agreement", "Music Publishing Agreement", "Music Rights Assignment Agreement", "Singer Performance Agreement", "Sound Recording Agreement", "Synchronization License Agreement"] },
    { title: "Creative IP", icon: <FileText size={14} />, items: ["Adaptation Rights Agreement", "Character Rights Agreement", "Copyright Assignment Deed (Creative Works)", "Format Rights Agreement", "Moral Rights Waiver Agreement", "Screenplay Assignment Agreement", "Script Option Agreement", "Story Rights Purchase Agreement", "Trademark Assignment Agreement"] },
    { title: "Marketing & Brands", icon: <Megaphone size={14} />, items: ["Artist Endorsement Agreement", "Brand Placement Agreement", "Film Promotion Agreement", "Product Placement Agreement", "Publicity Management Agreement", "Trailer & Teaser Release Agreement"] },
    { title: "Digital & Influencer", icon: <Smartphone size={14} />, items: ["Content Creator Agreement", "Digital Monetization Agreement", "Influencer Collaboration Agreement", "Podcast Production Agreement", "YouTube Channel Management Agreement"] }
  ]
};

  
  const [activeMain, setActiveMain] = useState<'legal' | 'creative'>('legal');
  const [selectedSub, setSelectedSub] = useState("Real Estate & Land");
  const [selectedDoc, setSelectedDoc] = useState("Sale Deed");
  const [location, setLocation] = useState({ state: "Telangana", country: "India" });
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [htmlContent, setHtmlContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [subType, setSubType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(100);
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setLocation({ state: data.region || "Telangana", country: data.country_name || "India" });
        const symbol = new Intl.NumberFormat('en-IN', { style: 'currency', currency: data.currency || 'INR' })
          .formatToParts(0).find(p => p.type === 'currency')?.value || '₹';
        setCurrencySymbol(symbol);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (contentRef.current && frameRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const viewportHeight = frameRef.current.clientHeight;
      setTotalPages(Math.ceil(contentHeight / viewportHeight) || 1);
    }
  }, [htmlContent, zoom, isFinished]);
  
  useEffect(() => {
  if (isFinished) {
    viewTemplate();
  }
}, [subType]);

  const handleMasterChange = (val: 'legal' | 'creative') => {
    setActiveMain(val);
    const firstSub = categories[val][0];
    setSelectedSub(firstSub.title);
    setSelectedDoc(firstSub.items[0]);
  };

  const viewTemplate = async () => {
  setIsGenerating(true);
  setError(null);
  setHtmlContent("");

  try {
    const response = await fetch('/api/get-template', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Update this line to pass the subType
      body: JSON.stringify({ 
        templateName: selectedDoc,
        subType: subType 
      }),
    });

    const result = await response.json();

    if (result.success && result.html) {
      const stateLaws = location.state === "Telangana" 
        ? "Registration (Telangana Amendment) Act" 
        : "The Registration Act, 1908";
      
      let processed = result.html
        .replace(/{{STATE}}/g, location.state)
        .replace(/{{COUNTRY}}/g, location.country)
        .replace(/{{CURRENCY}}/g, currencySymbol)
        .replace(/\[LAWS\]/g, `<strong>${stateLaws}</strong>`)
        // Add this to handle sub-type names inside the text if needed
        .replace(/{{SUB_TYPE}}/g, subType ? subType.toUpperCase() : "")
        .replace(/(\[.*?\]|\{\{.*?\}\})/g, '<span class="placeholder-highlight">$1</span>');

      const stampSpace = `<div class="stamp-space">Space for Non-Judicial Stamp Paper</div>`;
      
      setHtmlContent(stampSpace + processed);
      setIsFinished(true);
      setCurrentPage(1);
    } else {
      setError(result.error || `The template "${selectedDoc}" could not be processed.`);
    }
  } catch (e) { 
    setError("Failed to connect to the drafting engine. Please try again.");
  } finally { 
    setIsGenerating(false); 
  }
};

const handleDownload = async () => {
  try {
    const userData = {
      STATE: location.state,
      COUNTRY: location.country,
      CURRENCY: currencySymbol,
      SUB_TYPE: subType, 
    };

    const response = await fetch('/api/generate-docx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        templateName: selectedDoc, 
        userData: userData 
      }),
    });

    // 1. Check if the response failed FIRST
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server Error Details:", errorData);
      // Only show the alert if the server actually failed
      alert(`Could not generate the Word file: ${errorData.error || 'Unknown Error'}`);
      return; // Stop execution here
    }

    // 2. If it succeeded, get the BLOB (don't call .json())
    const blob = await response.blob();
    
    // 3. Create the download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    const cleanDocName = selectedDoc.replace(/\s+/g, '_');
    const subName = subType ? `_${subType.charAt(0).toUpperCase() + subType.slice(1)}` : '';
    const timestamp = new Date().toISOString().split('T')[0];

    a.download = `${cleanDocName}${subName}_Draft_${timestamp}.docx`;

    document.body.appendChild(a);
    a.click();
    
    // 4. Cleanup
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

  } catch (err) {
    // This only runs if the network crashes or the code above has a syntax error
    console.error("Download Error:", err);
  }
};

  const currentCategoryObj = categories[activeMain].find(c => c.title === selectedSub);

  return (
    <main className="h-screen w-screen bg-[#F1F5F9] flex flex-col overflow-hidden">
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body, html, main { height: auto !important; overflow: visible !important; background: white !important; }
          .print-container { display: block !important; position: static !important; width: 100% !important; }
          .docx-view-text { transform: none !important; position: static !important; padding: 1in !important; }
          .stamp-space { display: none !important; }
        }

        .print-container { display: none; }

        .docx-view-text { 
          color: #1a1a1a !important; 
          font-family: "Times New Roman", Times, serif !important; 
          background-color: white; 
          width: 100%; 
          /* CRITICAL FIXES FOR FORMATTING */
          text-align: justify;
          line-height: 1.5;
          word-spacing: -1px;
        }

        .docx-view-text p { 
          margin-bottom: 1rem; 
          text-align: justify; 
          display: block;
          width: 100%;
        }

        /* RESTORE WORD NUMBERING & LISTS */
        .docx-view-text ol { list-style-type: decimal !important; padding-left: 2.5rem !important; margin-bottom: 1rem; }
        .docx-view-text ul { list-style-type: disc !important; padding-left: 2.5rem !important; margin-bottom: 1rem; }
        .docx-view-text li { margin-bottom: 0.5rem; display: list-item !important; }

        .docx-view-text table { 
          width: 100% !important; 
          border: 1px solid #000 !important; 
          border-collapse: collapse; 
          margin: 20px 0; 
          table-layout: fixed;
        }

        .docx-view-text td, .docx-view-text th { 
          border: 1px solid #000 !important; 
          padding: 8px; 
          vertical-align: top;
          word-wrap: break-word;
        }

        .docx-view-text strong, .docx-view-text b { font-weight: 700 !important; }

        .placeholder-highlight { 
          background-color: #fef9c3; 
          border-bottom: 1px dashed #ca8a04; 
          color: #854d0e; 
          padding: 0 2px; 
          font-weight: 600; 
        }

        .stamp-space { 
          height: 150px; 
          border: 1px dashed #cbd5e1; 
          margin-bottom: 40px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #94a3b8; 
          font-size: 11px; 
          text-transform: uppercase; 
          letter-spacing: 3px; 
        }
.no-print input {
    color: #0f172a !important; 
    background-color: #ffffff !important;
    border: 1px solid #cbd5e1 !important;
  }

  .no-print input::placeholder {
    color: #94a3b8 !important;
  }

  .print-container { display: none; }
  
  .docx-view-text { 
    color: #1a1a1a !important; 
    font-family: "Times New Roman", Times, serif !important; 
    background-color: white; 
    width: 100%; 
    text-align: justify;
    line-height: 1.5;
  }
      `}
	  </style>

{/* Header - Integrated into the layout flow */}
<nav className="no-print w-full z-[100] bg-white border-b border-slate-100 h-16 md:h-20 flex flex-none items-center px-6 justify-between">
  <Link href="/" className="flex items-center gap-3 shrink-0">
    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
      <span className="text-amber-500 font-serif font-bold text-lg">S</span>
    </div>
    <div className="flex flex-col">
      <h1 className="text-sm md:text-xl font-black tracking-tighter text-slate-900 leading-none">
        S.R.K <span className="text-amber-600 font-medium italic tracking-normal">Strategic</span>
      </h1>
      <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Drafting Studio</span>
    </div>
  </Link>

  <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
    <MapPin size={12} className="text-amber-600" />
    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{location.state}</span>
  </div>
</nav>

      {/* Config Area */}
      <div className={`no-print flex-none p-4 bg-white border-b flex flex-wrap items-end gap-4 ${isFinished ? 'hidden' : 'flex'}`}>
        <div className="flex-1 min-w-[150px] space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase">Master Industry</label>
          <select onChange={(e) => handleMasterChange(e.target.value as any)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[12px] font-bold text-slate-900 outline-none">
            <option value="legal">⚖️ Legal & Corporate</option>
            <option value="creative">🎬 Film & Creative</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px] space-y-1 relative">
          <label className="text-[9px] font-black text-slate-400 uppercase">Category</label>
          <button onClick={() => setIsSubOpen(!isSubOpen)} className="w-full flex items-center justify-between border border-slate-300 rounded-lg px-3 py-2 text-[12px] font-bold text-slate-900 bg-slate-50">
            <span className="flex items-center gap-2">{currentCategoryObj?.icon} {selectedSub}</span>
            <ChevronDown size={14}/>
          </button>
          {isSubOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-300 rounded-lg shadow-2xl z-[100] max-h-40 overflow-y-auto">
              {categories[activeMain].map((cat) => (
                <div key={cat.title} onClick={() => { setSelectedSub(cat.title); setSelectedDoc(cat.items[0]); setIsSubOpen(false); }} className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-[11px] font-bold text-slate-900 border-b last:border-0 flex items-center gap-2">
                  <span className="text-amber-600">{cat.icon}</span> {cat.title}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[200px] space-y-1">
          <label className="text-[9px] font-black text-slate-400 uppercase">Document</label>
          <select value={selectedDoc} onChange={(e) => setSelectedDoc(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[12px] font-bold text-slate-900 outline-none bg-slate-50">
            {currentCategoryObj?.items.map(item => (<option key={item} value={item}>{item}</option>))}
          </select>
        </div>
		{/* Sub-Type Selector: Only shows if the category has configs and a document is selected */}
{/* Sub-Type Dropdown: Place this exactly where the old button block was */}
{selectedDoc && subTypeConfigs[selectedSub as keyof typeof subTypeConfigs] && (
  <div className="flex-1 min-w-[200px] space-y-1 relative animate-in fade-in slide-in-from-top-2">
    <label className="text-[9px] font-black text-amber-600 uppercase">Property/Asset Type</label>
    <div className="relative">
      <select 
        value={subType} 
        onChange={(e) => setSubType(e.target.value)} 
        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-[12px] font-bold text-slate-900 outline-none bg-slate-50 appearance-none pr-8 cursor-pointer hover:border-amber-500 transition-colors"
      >
        <option value="">Select Type...</option>
        {subTypeConfigs[selectedSub as keyof typeof subTypeConfigs].map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.label}</option>
        ))}
      </select>
      {/* This adds the little arrow back to the dropdown */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
        <ChevronDown size={14}/>
      </div>
    </div>
  </div>
)}

        <button onClick={viewTemplate} disabled={isGenerating} className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-colors">
          {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
          Generate Draft
        </button>
      </div>


{/* Control Bar */}
{isFinished && !error && (
  <div className="no-print flex-none bg-slate-900 text-white px-6 py-3 flex items-center justify-end shadow-lg z-50">
    
    {/* This is your buttons group */}
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-white/5 px-3 py-1 rounded border border-white/10">
        <button onClick={() => setZoom(z => Math.max(50, z - 10))}><Minus size={14}/></button>
        <span className="text-[11px] font-bold w-10 text-center">{zoom}%</span>
        <button onClick={() => setZoom(z => Math.min(200, z + 10))}><Plus size={14}/></button>
      </div>
      <button onClick={() => window.location.reload()} className="p-2 text-amber-500 hover:bg-white/5 rounded transition-colors"><RotateCcw size={18}/></button>
      <button onClick={() => window.print()} className="p-2 hover:bg-white/10 rounded"><Printer size={18}/></button>
      <button onClick={handleDownload} className="p-2.5 bg-amber-600 rounded-md flex items-center gap-2 text-[10px] font-black hover:bg-amber-500 transition-colors"><Download size={18}/> Export DOCX</button>
    </div>

  </div>
)}

      {/* VIEWPORT FRAME - FIXED OVERFLOW AND PADDING */}
      <div className="no-print flex-grow flex justify-center bg-slate-300 relative overflow-auto p-4 md:p-12">
        {error ? (
          <div className="flex flex-col items-center justify-center bg-white p-12 rounded-2xl shadow-xl max-w-md text-center border border-red-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500"><XCircle size={32} /></div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">Template Missing</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">{error}</p>
            <button onClick={() => {setError(null); setIsFinished(false);}} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">Select Another</button>
          </div>
        ) : htmlContent ? (
          <div ref={frameRef} className="bg-white shadow-2xl relative border border-slate-400" 
               style={{ 
                 width: `${(zoom / 100) * 8.5}in`, 
                 minWidth: '320px',
                 height: 'fit-content',
                 minHeight: '11in'
               }}>
            <div ref={contentRef} className="docx-view-text" style={{ 
              padding: '1in 0.75in', 
              boxSizing: 'border-box',
              fontSize: `${(zoom / 100) * 12}pt`
            }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center opacity-20"><Globe size={100} className="animate-pulse text-slate-400" /><p className="text-[10px] font-black uppercase tracking-[1em] mt-4">Drafting Studio</p></div>
        )}
      </div>

      <div className="print-container docx-view-text" dangerouslySetInnerHTML={{ __html: htmlContent }} />
{/* COMPACT FOOTER - Optimized for Studio View */}
<footer className="no-print flex-none py-6 bg-white border-t border-slate-100 px-8">
  <div className="max-w-7xl mx-auto">
    {/* Upper Section: Brand and Disclaimer aligned in one row */}
    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
      <div className="shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center">
            <span className="text-amber-500 font-serif font-bold text-xs">S</span>
          </div>
          <h1 className="text-xs font-black tracking-tighter text-slate-800 uppercase">
            S.R.K <span className="text-amber-600 font-medium italic tracking-normal capitalize">Strategic</span>
          </h1>
        </div>
        <p className="text-[9px] text-slate-400 leading-none uppercase tracking-widest font-bold">
          Technical Drafting • Legal Integrity
        </p>
      </div>

      <div className="max-w-2xl">
        <h4 className="text-[8px] font-bold text-slate-900 uppercase tracking-widest mb-1">Drafting Disclaimer</h4>
        <p className="text-[8px] text-slate-400 leading-tight font-light text-justify italic">
          Drafts generated are templates based on standard {location.state} protocols. These documents are provided for structural guidance and do not replace professional legal counsel. Final execution should be preceded by a specific review of your unique transaction details.
        </p>
      </div>
    </div>

    {/* Bottom Section: Copyright and Links */}
    <div className="pt-4 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-slate-300">
        © 2026 S.R.K STRATEGIC / S.R.K LL Consultant.
      </p>
      <div className="flex gap-6 text-[8px] uppercase tracking-widest font-bold text-slate-300">
        <span className="hover:text-amber-600 cursor-default transition-colors">Privacy</span>
        <span className="hover:text-amber-600 cursor-default transition-colors">Terms of Engagement</span>
      </div>
    </div>
  </div>
</footer>
    </main>
  );
}