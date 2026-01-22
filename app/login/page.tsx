"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Mail, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 relative">
      
      {/* 1. PERSISTENT HOME NAVIGATION */}
      <nav className="absolute top-8 left-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-amber-600 transition-all">
            <span className="text-amber-500 group-hover:text-white font-serif font-bold text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-slate-900 transition-colors">Back to Home</span>
          </div>
        </Link>
      </nav>

      <div className="w-full max-w-[440px] mt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif italic text-slate-900">Sign In</h1>
          <p className="text-slate-500 text-sm mt-3 font-light tracking-wide">Enter your credentials to access the Strategic Portal.</p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1">Client Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" placeholder="client@firm.com" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400">Security Key</label>
                <button type="button" className="text-[9px] uppercase tracking-widest font-bold text-amber-600 hover:text-slate-900">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-xl shadow-slate-200">
              Authorize Access <ShieldCheck size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold">
              New Project? <Link href="/signup" className="text-amber-600 hover:text-slate-900 ml-2">Request Onboarding</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}