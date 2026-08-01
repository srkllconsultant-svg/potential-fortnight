import React, { useState } from 'react';
import { GeneratedDraft, LegalDraftRequest } from '../types';
import { exportDraftToDocx } from '../utils/docxExport';
import { FileText, Download, Printer, Copy, Sparkles, Check, Edit3, Eye, AlertTriangle, ShieldCheck, MessageSquarePlus, RefreshCw, Layers } from 'lucide-react';

interface DocumentPreviewProps {
  draft: GeneratedDraft;
  request: LegalDraftRequest;
  onUpdateDraftHtml: (newHtml: string) => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  draft,
  request,
  onUpdateDraftHtml,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState(draft.documentHtml);
  const [showWatermark, setShowWatermark] = useState(true);
  const [showStampPaperHeader, setShowStampPaperHeader] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isDownloadingDocx, setIsDownloadingDocx] = useState(false);

  // AI Refine drawer state
  const [refinePrompt, setRefinePrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [refineSummary, setRefineSummary] = useState<string | null>(null);

  // Synchronize when draft prop changes
  React.useEffect(() => {
    setEditedHtml(draft.documentHtml);
  }, [draft.documentHtml]);

  const handleSaveEdit = () => {
    onUpdateDraftHtml(editedHtml);
    setIsEditing(false);
  };

  const handleDownloadDocx = async () => {
    setIsDownloadingDocx(true);
    try {
      await exportDraftToDocx({ ...draft, documentHtml: editedHtml }, request);
    } catch (err) {
      console.error('Docx export failed:', err);
      alert('Failed to generate Word document.');
    } finally {
      setIsDownloadingDocx(false);
    }
  };

  const handleCopyText = () => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editedHtml;
    const textContent = tempDiv.innerText || tempDiv.textContent || '';
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAIRefine = async () => {
    if (!refinePrompt.trim()) return;
    setIsRefining(true);
    setRefineSummary(null);

    try {
      const res = await fetch('/api/drafts/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentHtml: editedHtml,
          instruction: refinePrompt,
          draftTitle: draft.title,
          jurisdiction: draft.jurisdictionSummary,
        }),
      });

      const data = await res.json();
      if (res.ok && data.updatedHtml) {
        setEditedHtml(data.updatedHtml);
        onUpdateDraftHtml(data.updatedHtml);
        setRefineSummary(data.changesSummary || 'Clause modified successfully by AI.');
        setRefinePrompt('');
      } else {
        alert(data.error || 'Failed to refine document with AI.');
      }
    } catch (err: any) {
      alert(err.message || 'Error communicating with AI server.');
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Toolbar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-md border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-amber-400 flex items-center space-x-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{draft.title}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Governed by: <strong className="text-slate-200">{draft.jurisdictionSummary}</strong>
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          
          {/* Edit / View Toggle */}
          <button
            onClick={() => {
              if (isEditing) handleSaveEdit();
              else setIsEditing(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              isEditing
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Save Edits</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Text</span>
              </>
            )}
          </button>

          {/* Stamp Header & Watermark Toggles */}
          <button
            onClick={() => setShowStampPaperHeader(!showStampPaperHeader)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center space-x-1 ${
              showStampPaperHeader
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Non-Judicial Stamp Paper Simulation"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Stamp Header</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyText}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          {/* Print / PDF */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>

          {/* Export Word .DOCX */}
          <button
            onClick={handleDownloadDocx}
            disabled={isDownloadingDocx}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloadingDocx ? 'Generating Word...' : 'Download Word (.docx)'}</span>
          </button>

        </div>
      </div>

      {/* AI Refine & Clause Inserter Bar */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex flex-col md:flex-row items-center gap-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs shrink-0">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-slate-900">AI Clause Assistant:</span>
        </div>

        <div className="flex-1 w-full flex items-center space-x-2">
          <input
            type="text"
            value={refinePrompt}
            onChange={(e) => setRefinePrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAIRefine()}
            placeholder="Type custom clause instruction e.g. 'Add a 30-day eviction notice clause' or 'Translate to simplified terms'..."
            className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleAIRefine}
            disabled={isRefining || !refinePrompt.trim()}
            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shrink-0 flex items-center space-x-1 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefining ? 'animate-spin' : ''}`} />
            <span>{isRefining ? 'Updating...' : 'Apply AI Change'}</span>
          </button>
        </div>
      </div>

      {refineSummary && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 rounded-lg font-medium flex items-center justify-between">
          <span>✨ {refineSummary}</span>
          <button onClick={() => setRefineSummary(null)} className="text-emerald-600 font-bold">×</button>
        </div>
      )}

      {/* A4 LEGAL DOCUMENT PREVIEW CONTAINER */}
      <div className="flex justify-center bg-slate-100 p-4 sm:p-8 rounded-xl border border-slate-300 shadow-inner overflow-x-auto">
        <div className="w-full max-w-[800px] min-h-[1000px] bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 border border-slate-200 relative font-serif text-sm leading-relaxed printable-document">
          
          {/* Stamp Paper Simulation Header (Optional) */}
          {showStampPaperHeader && (
            <div className="mb-8 p-4 border-2 border-dashed border-amber-600/40 bg-amber-50/50 text-center rounded-md print:block">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-950">
                INDIAN NON-JUDICIAL / OFFICIAL STAMP PAPER SIMULATION
              </div>
              <div className="text-[11px] text-slate-600 mt-1 font-sans">
                GOVERNMENT OF {request.jurisdiction.state.toUpperCase()}, {request.jurisdiction.country.toUpperCase()}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 font-mono border-t border-amber-300/50 pt-1">
                <span>STAMP DUTY CODE: {request.jurisdiction.city.toUpperCase()}-ST-{Date.now().toString().substring(5)}</span>
                <span>SUB-REGISTRAR: {request.jurisdiction.subRegistrarArea || 'STATION NO. 01'}</span>
              </div>
            </div>
          )}

          {/* Watermark */}
          {showWatermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-6xl font-black uppercase rotate-[-35deg] text-slate-900 tracking-widest">
                OFFICIAL DRAFT
              </span>
            </div>
          )}

          {/* Document Content View / Editor */}
          {isEditing ? (
            <div className="space-y-3">
              <div className="text-xs text-amber-800 font-sans font-bold bg-amber-50 p-2 rounded-md border border-amber-200">
                ✏️ Direct HTML / Text Editor Mode: Edit any paragraph or clause below, then click "Save Edits".
              </div>
              <textarea
                rows={30}
                value={editedHtml}
                onChange={(e) => setEditedHtml(e.target.value)}
                className="w-full font-mono text-xs bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          ) : (
            <div
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:my-3 prose-table:border prose-table:border-slate-300 prose-td:p-2 prose-th:p-2 prose-th:bg-slate-100"
              dangerouslySetInnerHTML={{ __html: editedHtml }}
            />
          )}

        </div>
      </div>

    </div>
  );
};
