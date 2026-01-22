"use client";

import React from 'react';
import Link from 'next/link';
import { Home, User, Building2, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col lg:flex-row relative">
      
      {/* 1. HOME BUTTON (TOP LEFT) */}
      <Link href="/" className="absolute top-6 left-6 z-50 group flex items-center gap-2 bg-white/80 backdrop-blur-md p-2 pr-4 rounded-xl border border-slate-200 hover:bg-slate-900 hover:border-slate-900 transition-all shadow-sm">
        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
          <Home size={16} className="text-slate-900" />
        </div>
        <span className="text-[9px] uppercase tracking-widest font-black text-slate-900 group-hover:text-white transition-colors">Return Home</span>
      </Link>

      {/* 2. LEFT BRANDING PANEL */}
      <div className="hidden lg:flex w-5/12 p-16 flex-col justify-between bg-slate-900 text-white sticky top-0 h-screen">
        <div className="mt-24">
          <div className="h-px w-12 bg-amber-500 mb-8"></div>
          <h2 className="text-6xl font-serif italic mb-8 leading-tight">Strategic <br/>Onboarding.</h2>
          <p className="text-slate-400 font-light leading-relaxed max-w-sm text-lg">
            Connect your high-value assets to our digital liaison ecosystem. 
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-slate-500">
             <ShieldCheck className="text-amber-500" size={24} />
             <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Encrypted Data Protocol</span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-600">S.R.K Strategic</p>
        </div>
      </div>

      {/* 3. RIGHT FORM PANEL */}
      <div className="flex-1 p-8 md:p-20 flex items-center justify-center bg-slate-50 min-h-screen">
        <div className="w-full max-w-md py-12">
          <div className="mb-12">
            <h3 className="text-4xl font-serif italic text-slate-900">Request Access</h3>
            <p className="text-slate-500 text-sm mt-3 font-light">Enter your professional details for project verification.</p>
          </div>

          <form className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1 text-xs">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" placeholder="John Doe" className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" required />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1 text-xs">Professional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" placeholder="john@company.com" className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1 text-xs">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="tel" placeholder="+91..." className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" required />
                </div>
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 ml-1 text-xs">Organization</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="text" placeholder="Company Name" className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-amber-500 transition-all outline-none" />
                </div>
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-amber-600 transition-all shadow-xl shadow-slate-200 mt-4 group">
              Initialize Onboarding <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            Already have an account? <Link href="/login" className="text-amber-600 hover:text-slate-900 transition-colors ml-2 border-b border-amber-200 pb-1">Sign In here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}