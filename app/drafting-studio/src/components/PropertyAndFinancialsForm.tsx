import React from 'react';
import { PropertyDetails, FinancialTerms, PaymentDetail } from '../types';
import { Building2, DollarSign, Plus, Trash2, Compass, CreditCard } from 'lucide-react';

interface PropertyAndFinancialsFormProps {
  requiresPropertyDetails: boolean;
  propertyDetails?: PropertyDetails;
  financialTerms: FinancialTerms;
  onPropertyChange: (updated?: PropertyDetails) => void;
  onFinancialsChange: (updated: FinancialTerms) => void;
}

export const PropertyAndFinancialsForm: React.FC<PropertyAndFinancialsFormProps> = ({
  requiresPropertyDetails,
  propertyDetails,
  financialTerms,
  onPropertyChange,
  onFinancialsChange,
}) => {

  const handleAddPayment = () => {
    const newPay: PaymentDetail = {
      id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      mode: 'Bank Transfer (RTGS/NEFT)',
      referenceNumber: '',
      date: new Date().toISOString().split('T')[0],
      bankName: '',
      amount: 0,
      notes: 'Installment Payment',
    };
    onFinancialsChange({
      ...financialTerms,
      paymentSchedule: [...financialTerms.paymentSchedule, newPay],
    });
  };

  const handleRemovePayment = (id: string) => {
    onFinancialsChange({
      ...financialTerms,
      paymentSchedule: financialTerms.paymentSchedule.filter((p) => p.id !== id),
    });
  };

  const handleUpdatePayment = (id: string, fields: Partial<PaymentDetail>) => {
    onFinancialsChange({
      ...financialTerms,
      paymentSchedule: financialTerms.paymentSchedule.map((p) =>
        p.id === id ? { ...p, ...fields } : p
      ),
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      
      <div className="border-b border-slate-100 pb-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">4</span>
          <span>
            {requiresPropertyDetails
              ? 'Property / Asset Schedule, Boundaries & Financial Breakdown'
              : 'Financial Consideration & Payment Schedule'}
          </span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Provide exact survey/khasra land parameters, cardinal boundaries (N/S/E/W), total price, and installment records.
        </p>
      </div>

      {/* PROPERTY SCHEDULE (IF APPLICABLE) */}
      {requiresPropertyDetails && propertyDetails && (
        <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Schedule of Property / Land Parcel Details</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Survey / Khasra / Khata / Parcel ID
              </label>
              <input
                type="text"
                value={propertyDetails.surveyNumber}
                onChange={(e) =>
                  onPropertyChange({ ...propertyDetails, surveyNumber: e.target.value })
                }
                placeholder="e.g. Gat No. 142 / Khata No. 894 / Parcel 0321"
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Extent / Total Area Measurement
              </label>
              <input
                type="text"
                value={propertyDetails.totalArea}
                onChange={(e) =>
                  onPropertyChange({ ...propertyDetails, totalArea: e.target.value })
                }
                placeholder="e.g. 2.5 or 4500"
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Area Unit
              </label>
              <select
                value={propertyDetails.areaUnit}
                onChange={(e) =>
                  onPropertyChange({
                    ...propertyDetails,
                    areaUnit: e.target.value as PropertyDetails['areaUnit'],
                  })
                }
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="acres">Acres</option>
                <option value="sq.ft">Square Feet (sq.ft)</option>
                <option value="sq.yards">Square Yards (sq.yd)</option>
                <option value="guntha">Guntha (India)</option>
                <option value="sq.meters">Square Meters (sq.m)</option>
                <option value="hectares">Hectares</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Full Property Address & Revenue Location
            </label>
            <input
              type="text"
              value={propertyDetails.address}
              onChange={(e) =>
                onPropertyChange({ ...propertyDetails, address: e.target.value })
              }
              placeholder="e.g. Village Wagholi, Taluka Haveli, Pune 412207, Maharashtra"
              className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* CARDINAL BOUNDARIES (NORTH, SOUTH, EAST, WEST) */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Cardinal Property Boundaries (Schedule B - Four Sides)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600">NORTH Boundary:</label>
                <input
                  type="text"
                  value={propertyDetails.boundaries.north}
                  onChange={(e) =>
                    onPropertyChange({
                      ...propertyDetails,
                      boundaries: { ...propertyDetails.boundaries, north: e.target.value },
                    })
                  }
                  placeholder="e.g. Adjacent Gat No. 143 / 30-Ft Wide Road"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">SOUTH Boundary:</label>
                <input
                  type="text"
                  value={propertyDetails.boundaries.south}
                  onChange={(e) =>
                    onPropertyChange({
                      ...propertyDetails,
                      boundaries: { ...propertyDetails.boundaries, south: e.target.value },
                    })
                  }
                  placeholder="e.g. Public Village Road / Property of Shri X"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">EAST Boundary:</label>
                <input
                  type="text"
                  value={propertyDetails.boundaries.east}
                  onChange={(e) =>
                    onPropertyChange({
                      ...propertyDetails,
                      boundaries: { ...propertyDetails.boundaries, east: e.target.value },
                    })
                  }
                  placeholder="e.g. Irrigation Canal / Property of Company Y"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">WEST Boundary:</label>
                <input
                  type="text"
                  value={propertyDetails.boundaries.west}
                  onChange={(e) =>
                    onPropertyChange({
                      ...propertyDetails,
                      boundaries: { ...propertyDetails.boundaries, west: e.target.value },
                    })
                  }
                  placeholder="e.g. Survey No. 141 / Neighbor Boundary"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FINANCIAL CONSIDERATION & PAYMENTS */}
      <div className="space-y-4">
        
        <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
          <DollarSign className="w-4 h-4 text-emerald-600" />
          <span>Consideration, Stamp Duty & Payment Schedule</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Currency
            </label>
            <select
              value={financialTerms.currency}
              onChange={(e) =>
                onFinancialsChange({ ...financialTerms, currency: e.target.value })
              }
              className="w-full text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="INR">INR (₹ - Indian Rupee)</option>
              <option value="USD">USD ($ - US Dollar)</option>
              <option value="GBP">GBP (£ - British Pound)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="AED">AED (Emirati Dirham)</option>
              <option value="CAD">CAD (Canadian Dollar)</option>
              <option value="AUD">AUD (Australian Dollar)</option>
              <option value="SGD">SGD (Singapore Dollar)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Total Sale / Contract Consideration
            </label>
            <input
              type="number"
              value={financialTerms.totalConsideration || ''}
              onChange={(e) =>
                onFinancialsChange({
                  ...financialTerms,
                  totalConsideration: Number(e.target.value) || 0,
                })
              }
              placeholder="e.g. 12500000"
              className="w-full text-xs font-extrabold bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Stamp Duty Responsibility
            </label>
            <select
              value={financialTerms.stampDutyResponsibility}
              onChange={(e) =>
                onFinancialsChange({
                  ...financialTerms,
                  stampDutyResponsibility: e.target.value as FinancialTerms['stampDutyResponsibility'],
                })
              }
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Purchaser">Solely Paid by Purchaser / Vendee</option>
              <option value="Seller">Solely Paid by Seller / Vendor</option>
              <option value="Shared 50:50">Shared 50:50 between Parties</option>
              <option value="As per Local Act">As per Local Statutory Custom</option>
            </select>
          </div>
        </div>

        {/* PAYMENT BREAKDOWN TABLE (MULTIPLE INSTALLMENTS / INSTRUMENTS) */}
        <div className="pt-2 border-t border-slate-200 space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Payment Installments / Instrument Records (Multiple Payments)</span>
            </div>
            <button
              type="button"
              onClick={handleAddPayment}
              className="flex items-center space-x-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Payment Record</span>
            </button>
          </div>

          {financialTerms.paymentSchedule.length === 0 ? (
            <div className="p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-xs text-slate-500 text-center">
              No payment breakdown added yet. Click "Add Payment Record" to specify cheque, bank transfer, or RTGS details.
            </div>
          ) : (
            <div className="space-y-2">
              {financialTerms.paymentSchedule.map((pay, idx) => (
                <div
                  key={pay.id}
                  className="p-3 bg-emerald-50/30 border border-emerald-200/80 rounded-xl grid grid-cols-1 sm:grid-cols-6 gap-2 text-xs items-center"
                >
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">Payment Mode</label>
                    <select
                      value={pay.mode}
                      onChange={(e) =>
                        handleUpdatePayment(pay.id, { mode: e.target.value as PaymentDetail['mode'] })
                      }
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-md p-1.5"
                    >
                      <option value="Bank Transfer (RTGS/NEFT)">Bank RTGS/NEFT</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Demand Draft">Demand Draft</option>
                      <option value="Wire Transfer">Wire Transfer</option>
                      <option value="UPI / Digital Payment">UPI / Digital</option>
                      <option value="Cash">Cash</option>
                      <option value="Escrow">Escrow Account</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">Ref / Cheque No.</label>
                    <input
                      type="text"
                      value={pay.referenceNumber}
                      onChange={(e) => handleUpdatePayment(pay.id, { referenceNumber: e.target.value })}
                      placeholder="e.g. UTR / Cheque 000412"
                      className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-md p-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">Bank Name</label>
                    <input
                      type="text"
                      value={pay.bankName}
                      onChange={(e) => handleUpdatePayment(pay.id, { bankName: e.target.value })}
                      placeholder="e.g. HDFC / Chase"
                      className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">Date</label>
                    <input
                      type="date"
                      value={pay.date}
                      onChange={(e) => handleUpdatePayment(pay.id, { date: e.target.value })}
                      className="w-full text-xs bg-white border border-slate-300 rounded-md p-1.5"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase">
                      Amount ({financialTerms.currency})
                    </label>
                    <input
                      type="number"
                      value={pay.amount || ''}
                      onChange={(e) =>
                        handleUpdatePayment(pay.id, { amount: Number(e.target.value) || 0 })
                      }
                      placeholder="0"
                      className="w-full text-xs font-bold bg-white border border-slate-300 rounded-md p-1.5"
                    />
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-1 pt-1 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleRemovePayment(pay.id)}
                      className="text-slate-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Delete Payment"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
