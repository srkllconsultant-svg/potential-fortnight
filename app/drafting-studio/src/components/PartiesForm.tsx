import React from 'react';
import { PartyDetails, EntityType, LocationJurisdiction } from '../types';
import { getPartyProfile } from '../data/taxonomy';
import { User, Building, Plus, Trash2, Users, FileCheck, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

interface PartiesFormProps {
  parties: PartyDetails[];
  onChange: (updatedParties: PartyDetails[]) => void;
  documentName: string;
  categoryName: string;
  jurisdiction?: LocationJurisdiction;
}

export const PartiesForm: React.FC<PartiesFormProps> = ({
  parties,
  onChange,
  documentName,
  categoryName,
  jurisdiction,
}) => {
  const profile = getPartyProfile(documentName, categoryName);
  const country = jurisdiction?.country || 'India';
  const cityState = jurisdiction ? `${jurisdiction.city}, ${jurisdiction.state}` : '';

  // Get country specific default ID type
  const getDefaultIdType = () => {
    switch (country) {
      case 'United States':
        return 'SSN';
      case 'United Kingdom':
      case 'Canada':
      case 'Australia':
        return 'Passport';
      case 'United Arab Emirates':
        return 'Passport';
      default:
        return 'Aadhaar';
    }
  };

  const addParty = (role: string) => {
    const newParty: PartyDetails = {
      id: `party_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      partyRole: role as any,
      entityType: profile.mode === 'mou' || profile.mode === 'employment' ? 'Company' : 'Individual',
      fullName: '',
      fatherSpouseName: '',
      ageDob: '',
      idType: getDefaultIdType(),
      idNumber: '',
      address: '',
      sharePercentage: 100,
    };
    onChange([...parties, newParty]);
  };

  const removeParty = (id: string) => {
    if (parties.length <= 1) {
      alert("At least one party is required.");
      return;
    }
    onChange(parties.filter((p) => p.id !== id));
  };

  const updateParty = (id: string, updatedFields: Partial<PartyDetails>) => {
    onChange(
      parties.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  // Divide parties into first party group and second party group
  const firstParties = parties.slice(0, Math.max(1, Math.ceil(parties.length / 2)));
  const secondParties = parties.slice(firstParties.length);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      
      {/* Form Section Header */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">3</span>
            <span>{profile.isSingleParty ? 'Deponent Identification & Sworn Statement' : 'Executant Parties to the Instrument'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {profile.description}
          </p>
        </div>

        <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-lg text-xs font-bold shrink-0">
          Instrument Mode: <span className="uppercase text-slate-900">{profile.mode.replace('_', ' ')}</span>
        </div>
      </div>

      {/* SINGLE PARTY / AFFIDAVIT MODE */}
      {profile.isSingleParty ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
            <div className="flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                {profile.firstPartyLabel}
              </span>
            </div>
            {parties.length < 3 && (
              <button
                type="button"
                onClick={() => addParty(profile.firstPartyRoleDefault)}
                className="flex items-center space-x-1 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Co-Deponent</span>
              </button>
            )}
          </div>

          {parties.map((p, idx) => (
            <div key={p.id} className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 space-y-3 relative shadow-xs">
              
              <div className="flex items-center justify-between pb-2 border-b border-amber-200/50">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded-md">
                    Deponent #{idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">Deponent / Declarant Taking Oath</span>
                </div>

                {parties.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParty(p.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sworn Statement Inputs for Affidavit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Full Legal Name of Deponent *
                  </label>
                  <input
                    type="text"
                    value={p.fullName}
                    onChange={(e) => updateParty(p.id, { fullName: e.target.value })}
                    placeholder="e.g. Rajesh Kumar Sharma"
                    className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Father's / Husband's / Spouse's Name *
                  </label>
                  <input
                    type="text"
                    value={p.fatherSpouseName || ''}
                    onChange={(e) => updateParty(p.id, { fatherSpouseName: e.target.value })}
                    placeholder="e.g. Late Shri Ramachandra Sharma"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Age / DOB
                  </label>
                  <input
                    type="text"
                    value={p.ageDob || ''}
                    onChange={(e) => updateParty(p.id, { ageDob: e.target.value })}
                    placeholder="e.g. 42 Years (DOB: 14/08/1984)"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Identity Proof Document Type
                  </label>
                  <select
                    value={p.idType}
                    onChange={(e) => updateParty(p.id, { idType: e.target.value as PartyDetails['idType'] })}
                    className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Aadhaar">Aadhaar Card No.</option>
                    <option value="PAN">PAN Card No.</option>
                    <option value="Passport">Passport Number</option>
                    <option value="SSN">SSN / Social Security</option>
                    <option value="Driver License">Driver License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    ID Document Number *
                  </label>
                  <input
                    type="text"
                    value={p.idNumber}
                    onChange={(e) => updateParty(p.id, { idNumber: e.target.value })}
                    placeholder="e.g. 9842-1029-4821"
                    className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase">
                  Full Permanent Residential Address *
                </label>
                <input
                  type="text"
                  value={p.address}
                  onChange={(e) => updateParty(p.id, { address: e.target.value })}
                  placeholder="House No., Street, City, District, State, Pin Code"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

            </div>
          ))}

          {/* Optional Recipient Authority box for Affidavit */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
            <span className="font-bold text-slate-800 uppercase block">
              Recipient Authority / Verification Purpose (Optional):
            </span>
            <input
              type="text"
              placeholder="e.g. To be submitted to Passport Officer / Revenue Sub-Registrar / Municipal Commissioner / Bank"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900"
            />
          </div>
        </div>
      ) : (

        /* MULTI-PARTY MODE (Sale Deed, MOU, Employment, Lease, Loan, Creative) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* FIRST PARTY COLUMN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  {profile.firstPartyLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => addParty(profile.firstPartyRoleDefault)}
                className="flex items-center space-x-1 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Party</span>
              </button>
            </div>

            {firstParties.map((p, idx) => (
              <div key={p.id} className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 space-y-3 relative shadow-xs">
                
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded-md">
                      Party #{idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{profile.firstPartyRoleDefault}</span>
                  </div>

                  {/* Entity Type Toggle */}
                  <div className="flex bg-slate-200 p-0.5 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => updateParty(p.id, { entityType: 'Individual' })}
                      className={`px-2 py-0.5 rounded-md flex items-center space-x-1 ${p.entityType === 'Individual' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'}`}
                    >
                      <User className="w-3 h-3" />
                      <span>Individual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateParty(p.id, { entityType: 'Company' })}
                      className={`px-2 py-0.5 rounded-md flex items-center space-x-1 ${p.entityType === 'Company' || p.entityType === 'LLP' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'}`}
                    >
                      <Building className="w-3 h-3" />
                      <span>Company/Entity</span>
                    </button>
                  </div>

                  {firstParties.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParty(p.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Inputs for Individual vs Entity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      {p.entityType === 'Individual' ? 'Full Legal Name' : 'Company / Entity Registered Name'}
                    </label>
                    <input
                      type="text"
                      value={p.fullName}
                      onChange={(e) => updateParty(p.id, { fullName: e.target.value })}
                      placeholder={
                        p.entityType === 'Individual' 
                          ? (profile.mode === 'employment' ? 'e.g. Rameshchandra Kulkarni' : 'e.g. Rameshchandra Kulkarni')
                          : (profile.mode === 'mou' ? 'e.g. Apex Global Ventures Pvt Ltd' : 'e.g. Apex Enterprises Pvt Ltd')
                      }
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {p.entityType === 'Individual' ? (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        Father's / Spouse's Name
                      </label>
                      <input
                        type="text"
                        value={p.fatherSpouseName || ''}
                        onChange={(e) => updateParty(p.id, { fatherSpouseName: e.target.value })}
                        placeholder="e.g. Late Pandurang Kulkarni"
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        Authorized Representative & Designation
                      </label>
                      <input
                        type="text"
                        value={p.authorizedSignatoryName || ''}
                        onChange={(e) => updateParty(p.id, { authorizedSignatoryName: e.target.value })}
                        placeholder="e.g. Anand Sharma (Managing Director)"
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      ID Document Type
                    </label>
                    <select
                      value={p.idType}
                      onChange={(e) => updateParty(p.id, { idType: e.target.value as PartyDetails['idType'] })}
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Aadhaar">Aadhaar Card No.</option>
                      <option value="PAN">PAN Card No.</option>
                      <option value="Corporate Registration / CIN">Corporate CIN / Reg No</option>
                      <option value="Tax ID / EIN">Tax ID / GSTIN / EIN</option>
                      <option value="Passport">Passport Number</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      ID / Registration Number
                    </label>
                    <input
                      type="text"
                      value={p.idNumber}
                      onChange={(e) => updateParty(p.id, { idNumber: e.target.value })}
                      placeholder="e.g. CIN / PAN / Aadhaar"
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      {p.entityType === 'Individual' ? 'Age / DOB' : 'Equity / Share %'}
                    </label>
                    <input
                      type="text"
                      value={p.entityType === 'Individual' ? (p.ageDob || '') : (p.sharePercentage || 100)}
                      onChange={(e) => updateParty(p.id, p.entityType === 'Individual' ? { ageDob: e.target.value } : { sharePercentage: Number(e.target.value) || 100 })}
                      placeholder={p.entityType === 'Individual' ? 'e.g. 58 Years' : '50%'}
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase">
                    Full Residential / Registered Office Address
                  </label>
                  <input
                    type="text"
                    value={p.address}
                    onChange={(e) => updateParty(p.id, { address: e.target.value })}
                    placeholder="Street, Landmark, City, State, Pin Code"
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

              </div>
            ))}
          </div>

          {/* SECOND PARTY COLUMN */}
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                  {profile.secondPartyLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => addParty(profile.secondPartyRoleDefault)}
                className="flex items-center space-x-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Second Party</span>
              </button>
            </div>

            {secondParties.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-xs text-slate-500 text-center">
                Click "Add Second Party" above to include details for {profile.secondPartyLabel}.
              </div>
            ) : (
              secondParties.map((p, idx) => (
                <div key={p.id} className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 space-y-3 relative shadow-xs">
                  
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200/50">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-md">
                        Party #{idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">{profile.secondPartyRoleDefault}</span>
                    </div>

                    {/* Entity Type Toggle */}
                    <div className="flex bg-slate-200 p-0.5 rounded-lg text-xs font-medium">
                      <button
                        type="button"
                        onClick={() => updateParty(p.id, { entityType: 'Individual' })}
                        className={`px-2 py-0.5 rounded-md flex items-center space-x-1 ${p.entityType === 'Individual' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'}`}
                      >
                        <User className="w-3 h-3" />
                        <span>Individual</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateParty(p.id, { entityType: 'Company' })}
                        className={`px-2 py-0.5 rounded-md flex items-center space-x-1 ${p.entityType === 'Company' || p.entityType === 'LLP' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-600'}`}
                      >
                        <Building className="w-3 h-3" />
                        <span>Company/Entity</span>
                      </button>
                    </div>

                    {secondParties.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeParty(p.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Inputs for Individual vs Entity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        {p.entityType === 'Individual' 
                          ? (profile.mode === 'employment' ? 'Employee / Candidate Name' : 'Full Legal Name') 
                          : 'Company / Entity Registered Name'}
                      </label>
                      <input
                        type="text"
                        value={p.fullName}
                        onChange={(e) => updateParty(p.id, { fullName: e.target.value })}
                        placeholder={
                          p.entityType === 'Individual' 
                            ? (profile.mode === 'employment' ? 'e.g. Vikramaditya Bhosale' : 'e.g. Vikramaditya Bhosale')
                            : 'e.g. Nexus Tech Solutions Ltd'
                        }
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {p.entityType === 'Individual' ? (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase">
                          Father's / Spouse's Name
                        </label>
                        <input
                          type="text"
                          value={p.fatherSpouseName || ''}
                          onChange={(e) => updateParty(p.id, { fatherSpouseName: e.target.value })}
                          placeholder="e.g. Sunil R. Bhosale"
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase">
                          Authorized Signatory & Designation
                        </label>
                        <input
                          type="text"
                          value={p.authorizedSignatoryName || ''}
                          onChange={(e) => updateParty(p.id, { authorizedSignatoryName: e.target.value })}
                          placeholder="e.g. Elena Vance (CEO)"
                          className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        ID Document Type
                      </label>
                      <select
                        value={p.idType}
                        onChange={(e) => updateParty(p.id, { idType: e.target.value as PartyDetails['idType'] })}
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="Aadhaar">Aadhaar Card No.</option>
                        <option value="PAN">PAN Card No.</option>
                        <option value="Corporate Registration / CIN">Corporate CIN / Reg No</option>
                        <option value="Tax ID / EIN">Tax ID / GSTIN / EIN</option>
                        <option value="Passport">Passport Number</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        ID / Registration Number
                      </label>
                      <input
                        type="text"
                        value={p.idNumber}
                        onChange={(e) => updateParty(p.id, { idNumber: e.target.value })}
                        placeholder="e.g. Aadhaar / PAN / CIN"
                        className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">
                        {p.entityType === 'Individual' ? 'Age / DOB' : 'Equity / Share %'}
                      </label>
                      <input
                        type="text"
                        value={p.entityType === 'Individual' ? (p.ageDob || '') : (p.sharePercentage || 100)}
                        onChange={(e) => updateParty(p.id, p.entityType === 'Individual' ? { ageDob: e.target.value } : { sharePercentage: Number(e.target.value) || 100 })}
                        placeholder={p.entityType === 'Individual' ? 'e.g. 36 Years' : '50%'}
                        className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">
                      Full Residential / Registered Office Address
                    </label>
                    <input
                      type="text"
                      value={p.address}
                      onChange={(e) => updateParty(p.id, { address: e.target.value })}
                      placeholder="Street, Landmark, City, State, Pin Code"
                      className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      )}

    </div>
  );
};
