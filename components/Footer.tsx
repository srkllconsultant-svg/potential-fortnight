import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-slate-900 font-bold text-sm">S.R.K STRATEGIC</p>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">Liaison | Real Estate | Creative</p>
        </div>
        
        <div className="flex gap-8">
          <Link href="/privacy" className="text-slate-500 hover:text-amber-600 text-[10px] font-bold uppercase tracking-widest">Privacy</Link>
          <Link href="/terms" className="text-slate-500 hover:text-amber-600 text-[10px] font-bold uppercase tracking-widest">Terms</Link>
          <Link href="/contact" className="text-slate-500 hover:text-amber-600 text-[10px] font-bold uppercase tracking-widest">Contact</Link>
        </div>

        <p className="text-slate-300 text-[10px]">
          © {new Date().getFullYear()} SRK Strategic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}