"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-[#1A1F1E] text-[#FDFBF7] p-8 sm:p-12 lg:p-16 border border-[#283330] shadow-2xl">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A373]">
          The Weekly Field Dispatch
        </span>

        <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FDFBF7]">
          Stories Beyond the Horizon
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-[#FDFBF7]/80 leading-relaxed max-w-lg mx-auto">
          Delivered every Sunday morning. Unfiltered travel essays, private gear discounts, and field-tested trail notes. Strictly GDPR double opt-in.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-2xl bg-[#C86446]/20 border border-[#C86446]/40 p-6 flex flex-col items-center animate-in zoom-in-95">
            <CheckCircle2 className="h-8 w-8 text-[#C86446] mb-2" />
            <h3 className="font-serif text-base font-bold text-white">Confirmation Dispatched</h3>
            <p className="text-xs text-[#FDFBF7]/80 mt-1 text-center max-w-sm">
              Please click the link sent to <span className="text-[#D4A373] font-semibold">{email}</span> to confirm your subscription.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
              className="flex-1 rounded-full bg-[#FFFFFF]/10 px-5 py-3 text-xs text-[#FDFBF7] placeholder-[#FDFBF7]/50 backdrop-blur-md border border-[#FFFFFF]/20 focus:border-[#C86446] focus:outline-none focus:ring-1 focus:ring-[#C86446]"
            />
            <button
              type="submit"
              className="rounded-full bg-[#C86446] hover:bg-[#B25235] px-6 py-3 text-xs font-semibold text-[#FDFBF7] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#C86446]/20"
            >
              Subscribe <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#FDFBF7]/60">
          <ShieldCheck className="h-3.5 w-3.5 text-[#D4A373]" />
          <span>Double opt-in verification. Unsubscribe at any time.</span>
        </div>
      </div>

      {/* Subtle organic warmth glows */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-[#C86446]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#D4A373]/10 blur-3xl" />
    </section>
  );
}
