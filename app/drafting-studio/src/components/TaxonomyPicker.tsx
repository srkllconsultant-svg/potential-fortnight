import React from 'react';
import { 
  MASTER_TAXONOMY_CATEGORIES, 
  SUB_TYPE_CONFIGS, 
  getPartyProfile 
} from '../data/taxonomy';
import { 
  Home, Construction, Banknote, Code, Landmark, Briefcase, 
  Building2, Gift, User, TrendingUp, ShieldCheck, Gavel, 
  Film, Tv, Users2, Ticket, Music, FileText, Megaphone, Smartphone,
  ChevronDown, Layers, Sparkles, Check
} from 'lucide-react';

interface TaxonomyPickerProps {
  selectedDomain: 'legal' | 'creative';
  selectedCategoryName: string;
  selectedDocumentName: string;
  selectedAssetType: string;
  onSelectDomain: (domain: 'legal' | 'creative') => void;
  onSelectCategory: (categoryName: string) => void;
  onSelectDocument: (docName: string, requiresProperty: boolean) => void;
  onSelectAssetType: (assetType: string) => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home': return <Home className="w-4 h-4" />;
    case 'Construction': return <Construction className="w-4 h-4" />;
    case 'Banknote': return <Banknote className="w-4 h-4" />;
    case 'Code': return <Code className="w-4 h-4" />;
    case 'Landmark': return <Landmark className="w-4 h-4" />;
    case 'Briefcase': return <Briefcase className="w-4 h-4" />;
    case 'Building2': return <Building2 className="w-4 h-4" />;
    case 'Gift': return <Gift className="w-4 h-4" />;
    case 'User': return <User className="w-4 h-4" />;
    case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
    case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
    case 'Gavel': return <Gavel className="w-4 h-4" />;
    case 'Film': return <Film className="w-4 h-4" />;
    case 'Tv': return <Tv className="w-4 h-4" />;
    case 'Users2': return <Users2 className="w-4 h-4" />;
    case 'Ticket': return <Ticket className="w-4 h-4" />;
    case 'Music': return <Music className="w-4 h-4" />;
    case 'FileText': return <FileText className="w-4 h-4" />;
    case 'Megaphone': return <Megaphone className="w-4 h-4" />;
    case 'Smartphone': return <Smartphone className="w-4 h-4" />;
    default: return <FileText className="w-4 h-4" />;
  }
};

export const TaxonomyPicker: React.FC<TaxonomyPickerProps> = ({
  selectedDomain,
  selectedCategoryName,
  selectedDocumentName,
  selectedAssetType,
  onSelectDomain,
  onSelectCategory,
  onSelectDocument,
  onSelectAssetType,
}) => {
  const currentCategories = MASTER_TAXONOMY_CATEGORIES[selectedDomain];
  const currentCategoryObj = currentCategories.find(c => c.name === selectedCategoryName) || currentCategories[0];
  const subTypeOptions = SUB_TYPE_CONFIGS[selectedCategoryName] || [];

  const partyProfile = getPartyProfile(selectedDocumentName, selectedCategoryName);

  const checkPropertyNeeded = (docName: string, catName: string): boolean => {
    const lowerDoc = docName.toLowerCase();
    const lowerCat = catName.toLowerCase();
    if (lowerCat.includes('real estate') || lowerCat.includes('lease') || lowerCat.includes('construction')) return true;
    if (lowerDoc.includes('sale deed') || lowerDoc.includes('gift deed') || lowerDoc.includes('lease') || lowerDoc.includes('property') || lowerDoc.includes('partition')) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">1</span>
            <span>Master Industry Domain & Instrument Taxonomy</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select the domain, category, and legal instrument to dynamically adjust required party inputs.
          </p>
        </div>

        {/* Master Domain Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-bold shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              onSelectDomain('legal');
              const firstCat = MASTER_TAXONOMY_CATEGORIES.legal[0];
              onSelectCategory(firstCat.name);
              const firstDoc = firstCat.documents[0];
              onSelectDocument(firstDoc, checkPropertyNeeded(firstDoc, firstCat.name));
            }}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
              selectedDomain === 'legal'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⚖️ Legal & Corporate</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectDomain('creative');
              const firstCat = MASTER_TAXONOMY_CATEGORIES.creative[0];
              onSelectCategory(firstCat.name);
              const firstDoc = firstCat.documents[0];
              onSelectDocument(firstDoc, checkPropertyNeeded(firstDoc, firstCat.name));
            }}
            className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all cursor-pointer ${
              selectedDomain === 'creative'
                ? 'bg-slate-900 text-amber-400 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎬 Film & Creative</span>
          </button>
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Category Dropdown */}
        <div>
          <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Category
          </label>
          <div className="relative">
            <select
              value={selectedCategoryName}
              onChange={(e) => {
                const catName = e.target.value;
                onSelectCategory(catName);
                const catObj = currentCategories.find(c => c.name === catName);
                if (catObj && catObj.documents.length > 0) {
                  const firstDoc = catObj.documents[0];
                  onSelectDocument(firstDoc, checkPropertyNeeded(firstDoc, catName));
                }
              }}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 appearance-none pr-8 cursor-pointer"
            >
              {currentCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">{currentCategoryObj?.description}</p>
        </div>

        {/* Master Document Dropdown */}
        <div>
          <label className="block text-[11px] font-extrabold text-amber-700 uppercase tracking-wider mb-1.5">
            Document Instrument
          </label>
          <div className="relative">
            <select
              value={selectedDocumentName}
              onChange={(e) => {
                const docName = e.target.value;
                onSelectDocument(docName, checkPropertyNeeded(docName, selectedCategoryName));
              }}
              className="w-full text-xs font-extrabold bg-amber-50/80 border border-amber-300 rounded-lg p-2.5 text-slate-950 focus:ring-2 focus:ring-amber-500 appearance-none pr-8 cursor-pointer"
            >
              {currentCategoryObj?.documents.map((doc) => (
                <option key={doc} value={doc}>
                  📜 {doc}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-amber-600">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 font-medium">
            Selected Instrument: <strong className="text-slate-900">{selectedDocumentName}</strong>
          </p>
        </div>

        {/* SubType Context (Asset / Property Type / Seniority) */}
        <div>
          <label className="block text-[11px] font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Property / Asset / Scope Sub-Type
          </label>
          <div className="relative">
            <select
              value={selectedAssetType}
              onChange={(e) => onSelectAssetType(e.target.value)}
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-amber-500 appearance-none pr-8 cursor-pointer"
            >
              {subTypeOptions.length > 0 ? (
                subTypeOptions.map((opt) => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label}
                  </option>
                ))
              ) : (
                <>
                  <option value="General Asset / Contract">General Contract / Asset</option>
                  <option value="Specific Project Scope">Specific Project Scope</option>
                  <option value="Custom Framework">Custom Framework</option>
                </>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 pointer-events-none text-slate-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Adapts specific clauses to {selectedAssetType || 'selected sub-type'}
          </p>
        </div>

      </div>

      {/* Dynamic Party Requirements Callout */}
      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start space-x-3 text-xs">
        <div className="p-1.5 bg-amber-500/20 text-amber-800 rounded-lg shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="font-extrabold text-slate-900 flex items-center space-x-2">
            <span>Dynamic Party Profile for "{selectedDocumentName}":</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 font-mono text-[10px]">
              {partyProfile.isSingleParty ? 'Single Party Mode' : 'Multi-Party Executants'}
            </span>
          </div>
          <p className="text-slate-700 mt-0.5 text-[11px] leading-relaxed">
            {partyProfile.description} Form labels in Step 3 are automatically adapted to:
            <strong className="text-slate-900"> {partyProfile.firstPartyLabel}</strong>
            {!partyProfile.isSingleParty && (
              <> & <strong className="text-slate-900">{partyProfile.secondPartyLabel}</strong></>
            )}.
          </p>
        </div>
      </div>

    </div>
  );
};
