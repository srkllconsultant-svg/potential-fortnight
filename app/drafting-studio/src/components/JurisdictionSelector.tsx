import React, { useState } from 'react';
import { LocationJurisdiction, PropertyDetails } from '../types';
import { GLOBAL_JURISDICTIONS } from '../data/jurisdictions';
import { MapPin, Navigation, Compass, Building2, Globe } from 'lucide-react';

interface JurisdictionSelectorProps {
  jurisdiction: LocationJurisdiction;
  onChange: (updated: LocationJurisdiction) => void;
  currencySymbol: string;
  requiresPropertyDetails?: boolean;
  propertyDetails?: PropertyDetails;
  onPropertyChange?: (updated: PropertyDetails) => void;
}

export const JurisdictionSelector: React.FC<JurisdictionSelectorProps> = ({
  jurisdiction,
  onChange,
  currencySymbol,
  requiresPropertyDetails = true,
  propertyDetails,
  onPropertyChange,
}) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionSuccess, setDetectionSuccess] = useState<string | null>(null);

  const selectedCountryObj = GLOBAL_JURISDICTIONS.find((c) => c.name === jurisdiction.country) || GLOBAL_JURISDICTIONS[0];
  const statesList = selectedCountryObj?.states || [];
  const selectedStateObj = statesList.find((s) => s.name === jurisdiction.state);
  const districtsList = selectedStateObj?.districtsOrCounties || [];
  const citiesList = selectedStateObj?.cities || [];

  const [useCustomCity, setUseCustomCity] = useState(false);
  const [useCustomDistrict, setUseCustomDistrict] = useState(false);

  // Dynamic survey/parcel label based on country
  const getSurveyLabel = () => {
    switch (jurisdiction.country) {
      case 'India':
        return 'Survey No. / Khasra No. / Gat No. / CTS / Khata No.';
      case 'United States':
        return "Assessor's Parcel Number (APN) / Lot & Block No.";
      case 'United Kingdom':
        return 'HM Land Registry Title Number / Parcel Ref';
      case 'United Arab Emirates':
        return 'DLD Plot No. / Ejari Unit Registration No.';
      case 'Canada':
      case 'Australia':
        return 'Parcel Identifier (PID) / Title Reference / Lot No.';
      default:
        return 'Survey Number / Parcel ID / Lot / Title Number';
    }
  };

  const getSurveyPlaceholder = () => {
    switch (jurisdiction.country) {
      case 'India':
        return 'e.g. Survey No. 142/1, Gat No. 894, Khata 310';
      case 'United States':
        return 'e.g. APN 412-092-11, Block 4, Lot 12';
      case 'United Kingdom':
        return 'e.g. Title No. SGL589412';
      case 'United Arab Emirates':
        return 'e.g. Plot No. 345-1029, Business Bay';
      default:
        return 'e.g. Survey / Parcel / Lot / Title No.';
    }
  };

  // Geo Location Auto Detect Handler
  const handleAutoDetectGeo = () => {
    setIsDetecting(true);
    setDetectionSuccess(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await res.json();
            const addr = data.address || {};

            const detectedCountry = addr.country || 'India';
            const detectedState = addr.state || addr.region || 'Maharashtra';
            const detectedCity = addr.city || addr.town || addr.county || addr.suburb || 'Pune';

            onChange({
              ...jurisdiction,
              country: detectedCountry,
              state: detectedState,
              city: detectedCity,
              localityType: addr.village || addr.rural ? 'Rural' : 'Urban',
            });

            setDetectionSuccess(`📍 Auto-detected: ${detectedCity}, ${detectedState}, ${detectedCountry}`);
          } catch (err) {
            setDetectionSuccess('📍 Defaulted to India (Maharashtra - Pune Jurisdiction)');
          } finally {
            setIsDetecting(false);
          }
        },
        () => {
          setIsDetecting(false);
          setDetectionSuccess('📍 Geolocation permission denied. Defaulted to India.');
        },
        { timeout: 8000 }
      );
    } else {
      setIsDetecting(false);
      setDetectionSuccess('📍 Geolocation not supported in browser.');
    }
  };

  // Helper to ensure property details object exists
  const currentProperty: PropertyDetails = propertyDetails || {
    propertyType: 'Residential Plot / Land',
    surveyNumber: '',
    totalArea: '',
    areaUnit: jurisdiction.country === 'India' ? 'sq.yards' : 'sq.ft',
    address: '',
    boundaries: { north: '', south: '', east: '', west: '' },
    revenueVillage: '',
    districtCounty: jurisdiction.city,
  };

  const handleUpdateProperty = (updatedFields: Partial<PropertyDetails>) => {
    if (onPropertyChange) {
      onPropertyChange({
        ...currentProperty,
        ...updatedFields,
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">2</span>
            <span>Jurisdiction, Location & Statutory Laws</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select Country, State, District/County, and City. All recitals, schedules, and governing statutory clauses adapt to this jurisdiction.
          </p>
        </div>

        {/* Auto Detect Location Button */}
        <button
          type="button"
          onClick={handleAutoDetectGeo}
          disabled={isDetecting}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-sm transition-all disabled:opacity-50 cursor-pointer"
        >
          <Navigation className={`w-3.5 h-3.5 ${isDetecting ? 'animate-spin' : ''}`} />
          <span>{isDetecting ? 'Detecting Geo Location...' : 'Detect My Location'}</span>
        </button>
      </div>

      {detectionSuccess && (
        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2 font-medium">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{detectionSuccess}</span>
        </div>
      )}

      {/* Global Location Selectors: Country -> State -> District/County -> City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* Country */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Country / Sovereign Nation *
          </label>
          <select
            value={jurisdiction.country}
            onChange={(e) => {
              const countryName = e.target.value;
              const countryObj = GLOBAL_JURISDICTIONS.find((c) => c.name === countryName);
              const firstState = countryObj?.states[0]?.name || 'State / Region';
              const firstCity = countryObj?.states[0]?.cities[0] || 'City / District';
              
              // Update currency & jurisdiction
              onChange({
                ...jurisdiction,
                country: countryName,
                state: firstState,
                city: firstCity,
              });

              // Also update default area unit if property details exist
              if (onPropertyChange) {
                handleUpdateProperty({
                  areaUnit: countryName === 'India' ? 'sq.yards' : (countryName === 'United Kingdom' ? 'sq.meters' : 'sq.ft'),
                  districtCounty: firstCity,
                });
              }
            }}
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {GLOBAL_JURISDICTIONS.map((c) => (
              <option key={c.code} value={c.name}>
                🌐 {c.name} ({c.currencyCode})
              </option>
            ))}
          </select>
        </div>

        {/* State / Province / Territory */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            State / Province / Territory *
          </label>
          {statesList.length > 0 ? (
            <select
              value={jurisdiction.state}
              onChange={(e) => {
                const stateName = e.target.value;
                const stateObj = statesList.find((s) => s.name === stateName);
                const nextCity = stateObj?.cities[0] || jurisdiction.city;
                onChange({
                  ...jurisdiction,
                  state: stateName,
                  city: nextCity,
                });
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {statesList.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={jurisdiction.state}
              onChange={(e) => onChange({ ...jurisdiction, state: e.target.value })}
              placeholder="e.g. Ontario, California, Bavaria"
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          )}
        </div>

        {/* District / County */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              District / County *
            </label>
            {districtsList.length > 0 && (
              <button
                type="button"
                onClick={() => useCustomDistrict ? setUseCustomDistrict(false) : setUseCustomDistrict(true)}
                className="text-[10px] text-amber-600 hover:underline font-semibold cursor-pointer"
              >
                {useCustomDistrict ? 'Select from list' : '+ Other District'}
              </button>
            )}
          </div>
          {districtsList.length > 0 && !useCustomDistrict ? (
            <select
              value={currentProperty.districtCounty || districtsList[0]}
              onChange={(e) => {
                const dist = e.target.value;
                if (onPropertyChange) {
                  handleUpdateProperty({ districtCounty: dist });
                }
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {districtsList.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={currentProperty.districtCounty || ''}
              onChange={(e) => handleUpdateProperty({ districtCounty: e.target.value })}
              placeholder="e.g. Pune District, Cook County"
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          )}
        </div>

        {/* City / Municipal Recording Area */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              City / Recording Area *
            </label>
            {citiesList.length > 0 && (
              <button
                type="button"
                onClick={() => useCustomCity ? setUseCustomCity(false) : setUseCustomCity(true)}
                className="text-[10px] text-amber-600 hover:underline font-semibold cursor-pointer"
              >
                {useCustomCity ? 'Select from list' : '+ Other City'}
              </button>
            )}
          </div>
          {citiesList.length > 0 && !useCustomCity ? (
            <select
              value={jurisdiction.city}
              onChange={(e) => {
                const cityName = e.target.value;
                onChange({ ...jurisdiction, city: cityName });
              }}
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {citiesList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={jurisdiction.city}
              onChange={(e) => onChange({ ...jurisdiction, city: e.target.value })}
              placeholder="e.g. San Francisco, Toronto, London"
              className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          )}
        </div>

        {/* Locality Tier / Revenue Type */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Locality Tier / Revenue Area
          </label>
          <select
            value={jurisdiction.localityType}
            onChange={(e) =>
              onChange({
                ...jurisdiction,
                localityType: e.target.value as LocationJurisdiction['localityType'],
              })
            }
            className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="Urban">Urban / Municipal Corporation Area</option>
            <option value="Rural">Rural / Gram Panchayat / Village Area</option>
            <option value="Semi-Urban">Semi-Urban / Municipal Council Area</option>
            <option value="Special Economic Zone (SEZ)">Special Economic Zone (SEZ) / Freezone</option>
            <option value="Sub-Registrar Jurisdiction">Sub-Registrar Special Revenue Jurisdiction</option>
          </select>
        </div>

      </div>

      {/* PROPERTY LOCATION & BOUNDARIES DETAILS (MAIN PROPERTY PARAMETERS) */}
      {requiresPropertyDetails && onPropertyChange && (
        <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50/70 rounded-xl p-4 space-y-4 border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-amber-500" />
              <span>Property Location Parameters for {jurisdiction.city}, {jurisdiction.state} ({jurisdiction.country})</span>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Primary Recital & Schedule Data
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Enter the exact property details below. These parameters are directly embedded in the instrument recitals, transfer clauses, and Schedule 'A'/'B' property schedule.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Property Classification / Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Property / Asset Type
              </label>
              <select
                value={currentProperty.propertyType}
                onChange={(e) => handleUpdateProperty({ propertyType: e.target.value })}
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              >
                <option value="Residential Plot / Land">Residential Plot / Land</option>
                <option value="Agricultural Land / Farm House">Agricultural Land / Farm House</option>
                <option value="Commercial Office / Retail Space">Commercial Office / Retail Space</option>
                <option value="Residential Flat / Unit / Apartment">Residential Flat / Unit / Apartment</option>
                <option value="Industrial Plot / Shed / Warehouse">Industrial Plot / Shed / Warehouse</option>
                <option value="Non-Agricultural (NA) Land">Non-Agricultural (NA) Land</option>
              </select>
            </div>

            {/* Survey No / Khasra / APN / Parcel ID */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                {getSurveyLabel()} *
              </label>
              <input
                type="text"
                value={currentProperty.surveyNumber}
                onChange={(e) => handleUpdateProperty({ surveyNumber: e.target.value })}
                placeholder={getSurveyPlaceholder()}
                className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Extent & Area Unit */}
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Total Area
                </label>
                <input
                  type="text"
                  value={currentProperty.totalArea}
                  onChange={(e) => handleUpdateProperty({ totalArea: e.target.value })}
                  placeholder="e.g. 2.5 or 3600"
                  className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Measurement Unit
                </label>
                <select
                  value={currentProperty.areaUnit}
                  onChange={(e) => handleUpdateProperty({ areaUnit: e.target.value as PropertyDetails['areaUnit'] })}
                  className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="sq.yards">Sq. Yards (sq.yd)</option>
                  <option value="sq.ft">Square Feet (sq.ft)</option>
                  <option value="acres">Acres</option>
                  <option value="guntha">Guntha (India)</option>
                  <option value="sq.meters">Square Meters (sq.m)</option>
                  <option value="hectares">Hectares</option>
                </select>
              </div>
            </div>
          </div>

          {/* Full Location Street Address & Revenue Village */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Full Street / Plot Location Address
              </label>
              <input
                type="text"
                value={currentProperty.address}
                onChange={(e) => handleUpdateProperty({ address: e.target.value })}
                placeholder={`e.g. Plot No. 42, Sector 15, ${jurisdiction.city}, ${jurisdiction.state}`}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Revenue Village / Ward / County / District
              </label>
              <input
                type="text"
                value={currentProperty.revenueVillage || ''}
                onChange={(e) => handleUpdateProperty({ revenueVillage: e.target.value })}
                placeholder={`e.g. Village Wagholi, Taluka Haveli, District ${jurisdiction.city}`}
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* CARDINAL BOUNDARIES (NORTH, SOUTH, EAST, WEST) */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Cardinal Bounding Boundaries (Schedule B - Mandatory Four Sides)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600">NORTH Boundary:</label>
                <input
                  type="text"
                  value={currentProperty.boundaries.north}
                  onChange={(e) =>
                    handleUpdateProperty({
                      boundaries: { ...currentProperty.boundaries, north: e.target.value },
                    })
                  }
                  placeholder="e.g. Adjacent Survey No. 143 / 30-Ft Wide Municipal Road"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">SOUTH Boundary:</label>
                <input
                  type="text"
                  value={currentProperty.boundaries.south}
                  onChange={(e) =>
                    handleUpdateProperty({
                      boundaries: { ...currentProperty.boundaries, south: e.target.value },
                    })
                  }
                  placeholder="e.g. Public Gram Panchayat Road / Land of Shri X"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">EAST Boundary:</label>
                <input
                  type="text"
                  value={currentProperty.boundaries.east}
                  onChange={(e) =>
                    handleUpdateProperty({
                      boundaries: { ...currentProperty.boundaries, east: e.target.value },
                    })
                  }
                  placeholder="e.g. Canal / Property of Company Y"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600">WEST Boundary:</label>
                <input
                  type="text"
                  value={currentProperty.boundaries.west}
                  onChange={(e) =>
                    handleUpdateProperty({
                      boundaries: { ...currentProperty.boundaries, west: e.target.value },
                    })
                  }
                  placeholder="e.g. Survey No. 141 / Neighboring Property"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

