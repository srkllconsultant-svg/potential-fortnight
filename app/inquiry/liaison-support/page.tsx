"use client";

import imageCompression from 'browser-image-compression';
import { sendEmail } from '@/app/actions/sendEmail';
import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { 
  Send, ShieldCheck, ArrowLeft, 
  Printer, CheckCircle2, Upload, Mail, Phone,
  CreditCard, MapPin, ClipboardCheck, X, Info, AlertCircle, Trash2
} from 'lucide-react';



interface Attachment {
  name: string;
  data: string;
  size: number;
}

export default function LiaisonIntakePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  
  const [formData, setFormData] = useState({
    projectType: '', bottleneck: '', state: '', district: '',
    RevenueDivision: '', Mandal: '', Village: '', surveyNumbers: '',
    extent: '', context: '', email: '', phone: '',
    preferredFee: '', appointmentDate: '',
  });
  const [agreed, setAgreed] = useState(false);

  const MAX_TOTAL_SIZE_MB = 5;
  const BYTES_TO_MB = 1024 * 1024;

  const totalSizeMB = useMemo(() => {
    const totalBytes = attachments.reduce((acc, file) => acc + file.size, 0);
    return totalBytes / BYTES_TO_MB;
  }, [attachments]);

  const isOverLimit = totalSizeMB > MAX_TOTAL_SIZE_MB;

  const formatSize = (bytes: number) => {
    return (bytes / BYTES_TO_MB).toFixed(2) + " MB";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const clearAllAttachments = () => {
    setAttachments([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = Array.from(e.target.files || []);
  let currentTotalBytes = attachments.reduce((acc, f) => acc + f.size, 0);

  for (const file of selectedFiles) {
    let fileToProcess = file;

    // A. IF IMAGE: Shrink it to save space
    if (file.type.startsWith('image/')) {
      try {
        const options = { maxSizeMB: 0.9, maxWidthOrHeight: 2048, useWebWorker: true };
        fileToProcess = await imageCompression(file, options);
      } catch (e) { console.error(e); }
    } 
    
    // B. IF PDF: We can't shrink it easily, so we just check the size
    // Note: PDF text stays 100% readable because we aren't touching it.

    // YOUR ORIGINAL SIZE CHECKS
    if (fileToProcess.size > MAX_TOTAL_SIZE_MB * BYTES_TO_MB) {
      alert(`Rejected: "${file.name}" is too large.`);
      continue;
    }
    if (currentTotalBytes + fileToProcess.size > MAX_TOTAL_SIZE_MB * BYTES_TO_MB) {
      alert(`Total limit of ${MAX_TOTAL_SIZE_MB}MB reached.`);
      continue;
    }

    currentTotalBytes += fileToProcess.size;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachments(prev => [...prev, { 
        name: file.name, 
        data: reader.result as string, // This is still Base64
        size: fileToProcess.size 
      }]);
    };
    reader.readAsDataURL(fileToProcess);
  }
};

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    // Force a theme-friendly white background for printing and unlock visibility
    document.body.classList.add('allow-print');
    
    // Slight delay to ensure the DOM has updated before the print dialog takes control
    setTimeout(() => {
      window.print();
      // Remove class after printing is initiated
      setTimeout(() => {
        document.body.classList.remove('allow-print');
      }, 1000);
    }, 250);
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (isOverLimit) return;

  const readyToSubmit = confirm("Confirm Submission: Proceed with Technical Audit request?");
  if (!readyToSubmit) return;
  
  
  setIsSending(true);
  try {
    const formDataToSend = new FormData();

    // 1. Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    formDataToSend.append('agreed', agreed.toString());

    // 2. Convert Base64 attachments back to actual Blobs
    attachments.forEach((file, index) => {
      const byteString = atob(file.data.split(',')[1]);
      const mimeString = file.data.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formDataToSend.append('files', blob, file.name); 
    });

    // 3. Send via POST to your API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: formDataToSend, // Browser automatically sets Content-Type to multipart/form-data
    });

    const result = await response.json();

    if (result.success) {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } else {
      alert(`Server Error: ${result.error}`);
    }
  } catch (err) {
    console.error(err);
    alert("Connection error. Ensure total size is under 5MB.");
  } finally {
    setIsSending(false);
  }
};

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white pt-10 pb-20 px-6">
        <div className="max-w-4xl mx-auto border border-slate-200 rounded-[2rem] p-8 md:p-12 shadow-2xl print:shadow-none print:border-none">
          <div className="flex justify-between items-start mb-10 no-print">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={32} />
              <h1 className="text-2xl font-bold text-slate-900">Briefing Submitted</h1>
            </div>
            <button type="button" onClick={handlePrint} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all cursor-pointer">
              <Printer size={16} /> Print Brief
            </button>
          </div>

          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-amber-600 text-[10px] font-black uppercase tracking-widest mb-4">S.R.K Strategic - Consultation Receipt</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Case for <strong>{formData.Village}</strong> is now in our secure queue. Meeting scheduled for: <strong>{new Date(formData.appointmentDate).toLocaleString()}</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 text-sm text-slate-900 font-medium">
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Project Type</p><p>{formData.projectType}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Primary Issue</p><p>{formData.bottleneck}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Engagement</p><p className="text-amber-600">{formData.preferredFee}</p></div>
              
              {/* REVENUE DIVISION IN OUTPUT */}
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Revenue Division</p><p>{formData.RevenueDivision || 'N/A'}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Mandal/Village</p><p>{formData.Mandal}, {formData.Village}</p></div>
              
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Survey Nos</p><p className="break-all">{formData.surveyNumbers}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Extent</p><p>{formData.extent}</p></div>
              <div><p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Contact Phone</p><p>{formData.phone}</p></div>
            </div>

            {formData.context && (
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-sm text-slate-700">
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2 not-italic">Issue Context:</p>
                "{formData.context}"
              </div>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center no-print">
            <Link href="/liaison-support" className="text-slate-400 hover:text-amber-600 text-[10px] font-bold uppercase tracking-widest">Return to Liaison Supoort</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/liaison-support" className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-amber-600 mb-8">
          <ArrowLeft size={14} /> Back to Liaison Support
        </Link>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
            
            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                <ClipboardCheck size={14} className="text-amber-600" /> 1. Case Classification
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <select required name="projectType" value={formData.projectType} onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium">
                  <option value="">Select Project Nature *</option>
                  <option value="Residential">Residential Layout</option>
                  <option value="Commercial">Commercial / IT Park</option>
                  <option value="Industrial">Industrial Land</option>
                  <option value="Agricultural">Agricultural Conversion</option>
                </select>
                <select required name="bottleneck" value={formData.bottleneck} onChange={handleInputChange} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium">
                  <option value="">Select Primary Issue *</option>
                  <option value="CLU">CLU / Land Use Change</option>
                  <option value="NOC">NOC Clearances</option>
                  <option value="Title">Title & Succession</option>
                  <option value="Revenue">Revenue Record Correction</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                <MapPin size={14} className="text-amber-600" /> 2. Property Location & Size
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <input required name="state" value={formData.state} onChange={handleInputChange} placeholder="State *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                <input required name="district" value={formData.district} onChange={handleInputChange} placeholder="District *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                
                {/* REVENUE DIVISION IN INPUT */}
                <input required name="RevenueDivision" value={formData.RevenueDivision} onChange={handleInputChange} placeholder="Revenue Division *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                
                <input required name="Mandal" value={formData.Mandal} onChange={handleInputChange} placeholder="Mandal *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                <input required name="Village" value={formData.Village} onChange={handleInputChange} placeholder="Village *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                <input required name="extent" value={formData.extent} onChange={handleInputChange} placeholder="Total Extent *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                <input required name="surveyNumbers" value={formData.surveyNumbers} onChange={handleInputChange} placeholder="Survey Nos *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
              </div>
              <textarea required name="context" value={formData.context} onChange={handleInputChange} rows={3} placeholder="Explain the specific hurdle... *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium resize-none" />
            </div>

            {/* Section 3 & 4 (Contact & Documentation) remain the same as your original provided code */}
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2"><Phone size={14} className="text-amber-600" /> 3. Contact Details</h3>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="Email Address *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="Phone Number *" className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2"><Upload size={14} className="text-amber-600" /> 4. Documentation</h3>
                    {attachments.length > 0 && (
                      <button type="button" onClick={clearAllAttachments} className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1 hover:text-red-700">
                        <Trash2 size={12} /> Clear All
                      </button>
                    )}
                  </div>
                  <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all bg-slate-50 border-slate-200 hover:bg-slate-100 cursor-pointer">
                    <Upload className="text-slate-300" size={20} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase mt-2 text-center">Click to attach Docs<br/>(Max 10MB Total)</span>
                    <input type="file" multiple ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  
                  <div className="space-y-2 max-h-48 overflow-y-auto text-slate-900">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white border border-slate-100 p-2 pl-4 rounded-xl shadow-sm">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold truncate max-w-[150px]">{file.name}</span>
                          <span className="text-[9px] text-slate-400 uppercase">{formatSize(file.size)}</span>
                        </div>
						<button type="button" onClick={() => removeAttachment(index)} className="text-slate-300 hover:text-red-500 p-2 transition-colors"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
				  {attachments.length > 0 && (
					<div className={`mt-4 p-3 rounded-xl flex items-center justify-between border ${isOverLimit ? 'bg-red-50 border-red-100 text-red-600 animate-pulse' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
						<span className="text-[10px] font-bold uppercase">Total Batch Size:</span>
						<span className="text-[10px] font-black">{totalSizeMB.toFixed(2)} MB / {MAX_TOTAL_SIZE_MB} MB</span>
					</div>
					)}
               </div>
            </div>

            <div className="space-y-6 bg-slate-50 p-6 md:p-8 rounded-[2rem] border border-slate-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <CreditCard size={14} className="text-amber-600" /> 5. Finalize Engagement
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <select required name="preferredFee" value={formData.preferredFee} onChange={handleInputChange} className="w-full bg-white border-none rounded-2xl p-4 text-sm text-slate-900 font-medium">
                  <option value="">Select Fee Model *</option>
                  <option value="Audit & Briefing (Fixed Retainer)">Audit & Briefing (Fixed Retainer)</option>
                  <option value="Performance-Based (Custom Quote)">Performance-Based (Custom Quote)</option>
                  <option value="Discuss during meeting">Discuss during meeting</option>
                </select>
                <input required type="datetime-local" name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} className="w-full bg-white border-none rounded-2xl p-4 text-sm text-slate-900 font-medium" />
              </div>
            </div>
		<div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
			<input 
				type="checkbox" 
				id="legal-agree"
				required
				checked={agreed}
				onChange={(e) => setAgreed(e.target.checked)}
				className="mt-1 h-4 w-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500" 
			/>
			<label htmlFor="legal-agree" className="text-[11px] text-slate-600 leading-relaxed">
				I agree to the <Link href="/terms" className="text-amber-700 font-bold underline">Terms of Engagement</Link> and 
			<Link href="/privacy" className="text-amber-700 font-bold underline ml-1">Privacy Policy</Link>. 
				I understand that S.R.K Strategic is a consultancy and does not represent any competent authority.
			</label>
		</div>
           <button
  disabled={isSending || isOverLimit || !agreed} 
  type="submit"
    className="relative overflow-hidden w-full py-4 px-6 rounded-xl font-bold text-white transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed bg-slate-900"
>
  {/* PROGRESS FILL: This layer slides from left to right when isSending is true */}
  {isSending && (
    <div 
      className="absolute top-0 left-0 h-full bg-amber-600 transition-all ease-out"
      style={{ 
        width: '100%', 
        transitionDuration: '20000ms', // Takes 20 seconds to fill
        opacity: 0.6 
      }}
    />
  )}

  {/* BUTTON TEXT: Use z-10 to keep the text on top of the progress color */}
  <div className="relative z-10 flex items-center justify-center gap-2">
    {isSending ? (
      <>
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <span>Uploading Case Files (5MB Limit)...</span>
      </>
    ) : (
      <>
        <Send className="w-5 h-5" />
        <span>Submit Technical Audit Request</span>
      </>
    )}
  </div>
</button>

{/* HELPER TEXT: Shows only during processing to prevent users from leaving */}
{isSending && (
  <p className="text-center text-xs text-slate-500 mt-2 animate-pulse">
    Please do not refresh. Compressing and transmitting your legal documents...
  </p>
)}
          </form>
        </div>
      </div>
    </main>
  );
}