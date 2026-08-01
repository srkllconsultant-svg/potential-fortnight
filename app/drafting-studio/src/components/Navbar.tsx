import React from 'react';
import { FileText, MapPin, Sparkles, RotateCcw, BookOpenCheck } from 'lucide-react';
import { LocationJurisdiction, PresetTemplate } from '../types';
import { SAMPLE_PRESETS } from '../data/samplePresets';

interface NavbarProps {
  jurisdiction: LocationJurisdiction;
  selectedDocName: string;
  onSelectPreset: (preset: PresetTemplate) => void;
  onReset: () => void;
  activeTab: 'draft' | 'preview';
  setActiveTab: (tab: 'draft' | 'preview') => void;
  hasGeneratedDraft: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  jurisdiction,
  selectedDocName,
  onSelectPreset,
  onReset,
  activeTab,
  setActiveTab,
  hasGeneratedDraft,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-300 p-2 rounded-xl text-slate-950 font-bold shadow-md shadow-amber-500/10">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Drafting Studio
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Sparkles className="w-3 h-3 mr-1 text-amber-400" /> AI Statutory Drafter
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              State & Country Specific Legal Instrument Conveyancing Engine
            </p>
          </div>
        </div>

        {/* Selected Jurisdiction Pill */}
        <div className="hidden md:flex items-center px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 space-x-2">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-medium truncate max-w-[240px]">
            {jurisdiction.city}, {jurisdiction.state}, {jurisdiction.country} ({jurisdiction.localityType})
          </span>
        </div>

        {/* Navigation Controls & Presets */}
        <div className="flex items-center space-x-3">
          {/* Quick Presets Dropdown */}
          <div className="relative">
            <select
              onChange={(e) => {
                const preset = SAMPLE_PRESETS.find((p) => p.id === e.target.value);
                if (preset) onSelectPreset(preset);
              }}
              defaultValue=""
              className="bg-slate-800 hover:bg-slate-700/90 text-amber-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-500/30 cursor-pointer focus:outline-none transition-all"
            >
              <option value="" disabled>⚡ Load Demo Presets</option>
              {SAMPLE_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex space-x-1 text-xs">
            <button
              onClick={() => setActiveTab('draft')}
              className={`px-3 py-1 rounded-md font-medium transition-all ${
                activeTab === 'draft'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              1. Parameters & Data
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              disabled={!hasGeneratedDraft}
              className={`px-3 py-1 rounded-md font-medium transition-all flex items-center space-x-1 ${
                activeTab === 'preview'
                  ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                  : hasGeneratedDraft
                  ? 'text-slate-300 hover:text-white cursor-pointer'
                  : 'text-slate-600 cursor-not-allowed opacity-60'
              }`}
            >
              <BookOpenCheck className="w-3.5 h-3.5" />
              <span>2. Legal Document Preview</span>
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset Form"
            className="p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
