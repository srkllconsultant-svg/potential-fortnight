import React from 'react';

export default function BriefNote() {
  return (
    <div className="space-y-10 font-sans text-[11px] p-2 leading-relaxed text-slate-700">
      {/* Header Section */}
      <div className="text-center border-b-2 border-slate-100 pb-6">
        <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-tight">Brief Note</h2>
        <p className="text-slate-400 font-bold mt-1">Date: ____ _______ 20___</p>
      </div>

      {/* Sub & Project Info */}
      <section className="space-y-2">
        <p className="font-bold text-slate-800">
          Sub: <span className="font-normal">Land totally admeasuring __________ Square Yards or Ac.________Gts., in Project “___________”; covered by Draft TLP No. ________________, in collective Survey Nos. _______________ situated at __________ Village.</span>
        </p>
      </section>


      {/* Section I: Land Details */}
      <section>
	  {/*<div className="bg-slate-900 text-amber-500 px-3 py-1.5 font-bold uppercase tracking-widest mb-3 text-[10px]">*/}
		<div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-2 border-l-4 border-amber-500 text-[10px]">        
		I. Land Details
        </div>
        <table className="w-full border-collapse border border-slate-200 text-center">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-[9px]">
              <th className="border border-slate-200 p-2">Survey bi No.</th>
              <th className="border border-slate-200 p-2">Ac.</th>
              <th className="border border-slate-200 p-2">Gts.</th>
              <th className="border border-slate-200 p-2">Belongs to</th>
              <th className="border border-slate-200 p-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, i) => (
              <tr key={i}><td className="border border-slate-200 h-8" colSpan={5}></td></tr>
            ))}
            <tr className="bg-slate-50 font-bold">
              <td className="border border-slate-200 p-2">Total:</td>
              <td className="border border-slate-200 p-2 h-8" colSpan={4}></td>
            </tr>
          </tbody>
        </table>
      </section>

	  {/* Section II: Provided Documents: */}
      <section className="space-y-2">
		<div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-2 border-l-4 border-amber-500 text-[10px]">        
          II. Provided Documents:
        </div>
        <div className="space-y-3 px-2">
          <p className="flex gap-2">
            <span className="font-bold">01.</span>
            <span>Xerox copy of.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">02.</span>
            <span>Xerox copy of Layout Proceedings vide.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">03.</span>
            <span>Xerox copy of registered . </span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">04.</span>
            <span>Xerox copy of registered Development Agreement cum General Power of Attorney (DAGPA). </span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">Links:</span>
            <span></span>
          </p>		  
		  <p className="flex gap-2">
            <span className="font-bold"></span>
            <span>4.1. Xerox copy of NALA Conversion Proceedings No.</span>
          </p>	
		  <p className="flex gap-2">
            <span className="font-bold"></span>
            <span>4.2. Xerox copy of Registered.</span>
          </p>	
		  <p className="flex gap-2">
            <span className="font-bold"></span>
            <span>4.2.1. Xerox copy of.</span>
          </p>	
		  <p className="flex gap-2">
            <span className="font-bold">05.</span>
            <span>Xerox copy of Kashra Pahani 1954-55.</span>
          </p>		          
		  <p className="flex gap-2">
            <span className="font-bold">06.</span>
            <span>Xerox copy of Cesala Pahani 1955-58.</span>
          </p>	
		</div>
      </section>


      {/* Section III: Pahanis History */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-2 border-l-4 border-amber-500 text-[10px]">        
          III. Pahanis History
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-center text-[9px]">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold uppercase">
                <th className="border border-slate-200 p-1">Year</th>
                <th className="border border-slate-200 p-1">Sy. No.</th>
                <th className="border border-slate-200 p-1">Sy. Bi No.</th>
                <th className="border border-slate-200 p-1">Ac.</th>
                <th className="border border-slate-200 p-1">Gts.</th>
                <th className="border border-slate-200 p-1">Pattadar</th>
                <th className="border border-slate-200 p-1">Possessor</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i}><td className="border border-slate-200 h-6" colSpan={7}></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section IV: Online Portal Data */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-2 border-l-4 border-amber-500 text-[10px]">
          IV. Online Portal Data
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-center text-[9px]">
            <thead>
              <tr className="bg-slate-800 text-white font-bold">
                <th className="border border-slate-700 p-1">ఖాతా సంఖ్య</th>
                <th className="border border-slate-700 p-1">పట్టాదారు పేరు</th>
                <th className="border border-slate-700 p-1">భూమి స్థితి</th>
                <th className="border border-slate-700 p-1">సర్వే సంఖ్య</th>
                <th className="border border-slate-700 p-1">ఎ.</th>
                <th className="border border-slate-700 p-1">గుం.</th>
              </tr>
            </thead>
            <tbody>
               <tr><td className="border border-slate-200 h-12" colSpan={6}></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section V: MAPS */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-3 border-l-4 border-amber-500 text-[10px]">
          V. MAPS
        </div>
        <div className="space-y-3 px-2">
          <p className="flex gap-2">
            <span className="font-bold">01.</span>
            <span>Related MAPS will be instered here. </span>
          </p>
        </div>
      </section>
	  {/* Section VI: Observations */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-3 border-l-4 border-amber-500 text-[10px]">
          VI. Observations
        </div>
        <div className="space-y-3 px-2">
          <p className="flex gap-2">
            <span className="font-bold">01.</span>
            <span>As per oinline verificaiotn. </span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">02.</span>
            <span>The following prohibited list in Survey No. ______________________. NEED CLARIFICATION. </span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">03.</span>
            <span>Any discrepancies related to Khata numbers, Pattadar names, or NALA/Agricultural status shall be rectified by the respective landowners prior to submission. </span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">04.</span>
            <span>	_____________ Village falls under the jurisdiction of the _____________________ (__________). </span>
          </p>
        </div>
      </section>
	  {/* Section V: Further Documents required */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-3 border-l-4 border-amber-500 text-[10px]">
          VII. Further Documents required: 
        </div>
        <div className="space-y-3 px-2">
          <p className="flex gap-2">
            <span className="font-bold">01.</span>
            <span>Certified/True copy of P.T. register extract (or) Endorsement/Memo for No P.T.. </span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">02.</span>
            <span>Certified/True copy of Old ROR 1979-80. </span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">03.</span>
            <span>Certified/True copy of New ROR 1989-90. </span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">04.</span>
            <span>Certified/True copy of Pahanis for the years 1960-61, 1964-65, 1969-70, 1971-72, 1974-75, 1979-80, 1984-85, 1989-90, 1994-95, 1999-2000, 2004-05, 2009-10, 2014-15 & 2015-16. </span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">05.</span>
            <span>Certified/True copy of Sethwar along with English Translation.</span>
          </p>		  
		  <p className="flex gap-2">
            <span className="font-bold">06.</span>
            <span>Certified/True copy of Wasool Baqui with English Translation.</span>
          </p>		          
		  <p className="flex gap-2">
            <span className="font-bold">07.</span>
            <span>Xerox copy of Pattadar Passbook and Title Deed No.</span>
          </p>	
		  <p className="flex gap-2">
            <span className="font-bold">08.</span>
            <span>Xerox copy of registered __________ bearing Document No. ____________		.</span>
          </p>			
		  <p className="flex gap-2">
            <span className="font-bold">09.</span>
            <span>Certified copy of Document No. ______/_____ dated __________, SRO, _____________ (_____)  .</span>
          </p>					
		  <p className="flex gap-2">
            <span className="font-bold">10.</span>
            <span>Family Genealogy of Original Pattadar(s).</span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">11.</span>
            <span>Family Genealogy of Present Pattadar(s)</span>
          </p>
		  <p className="flex gap-2">
            <span className="font-bold">12.</span>
            <span>Encumbrance Certificate since the year 1970.</span>
          </p>		  
		</div>
      </section>
	  {/* Section VIII: Note Summary */}
      <section>
        <div className="bg-slate-100 text-slate-800 px-3 py-1.5 font-bold uppercase tracking-widest mb-3 border-l-4 border-amber-500 text-[10px]">
          VIII. Note Summary: 
        </div>
        <div className="space-y-3 px-2">
          <p className="flex gap-2">
            <span className="font-bold">(1.)</span>
            <span>Based on the examination of the present Brief Note, the Observations recorded under Section VI, and the documents furnished and sought under Section VII, the clarifications required, particularly with regard to ________________________________________________________________, shall be examined in detail upon submission of the certified copies of relevant records, deeds, and revenue documents.</span>
          </p>
          <p className="flex gap-2">
            <span className="font-bold">(2.)</span>
            <span>Upon submission of the requirements and scrutiny of the same, if any further discrepancies, clarifications, or additional documents are found necessary, the same shall be duly communicated for compliance. Subject to submission, verification, and rectification of all the requirements, including updation of online revenue records, the final scrutiny report shall be issued accordingly.</span>
          </p>
		</div>
      </section>
    </div>
  );
}