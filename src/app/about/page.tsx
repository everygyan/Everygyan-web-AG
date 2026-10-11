import React from "react";
import Link from "next/link";
import { Compass, Mail, Award, Globe, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#1A1F1E] dark:bg-[#F2EFE9] shadow-md p-2 mb-4">
          <img
            src="/everygyan-logo.svg"
            alt="EveryGyan Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858]">
          The EveryGyan Manifesto
        </span>
        <h1 className="mt-2 font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Knowledge for the Modern Explorer
        </h1>
        <p className="mt-4 text-sm sm:text-base text-[#6B726F] dark:text-[#95A39E] max-w-xl mx-auto leading-relaxed">
          Founded as an independent publishing platform to celebrate backcountry expeditions, cultural heritage, and practical remote-living blueprints.
        </p>
      </div>

      <div className="prose max-w-none text-[#1A1F1E] dark:text-[#F2EFE9] space-y-8 text-sm sm:text-base leading-relaxed">
        <div className="rounded-3xl border border-[#E8DFD5] bg-[#F5EFEB] p-8 dark:border-[#283330] dark:bg-[#151B19]">
          <h2 className="font-serif text-2xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9] mb-3">
            Our Editorial Standards
          </h2>
          <p className="text-[#6B726F] dark:text-[#95A39E]">
            Every itinerary and equipment review on EveryGyan is tested firsthand in the field by our correspondents. We never accept paid placement for route recommendations or compromise safety reports for commercial sponsors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
            <Award className="h-6 w-6 text-[#C86446] mb-3" />
            <h3 className="font-serif text-lg font-bold">Uncompromising Quality</h3>
            <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E]">
              Detailed high-elevation GPS waypoints, weather hazards, and gear audits.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
            <Globe className="h-6 w-6 text-[#C86446] mb-3" />
            <h3 className="font-serif text-lg font-bold">Low-Impact Ethos</h3>
            <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E]">
              Promoting leave-no-trace ethics, community stewardship, and slow travel.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
            <Shield className="h-6 w-6 text-[#C86446] mb-3" />
            <h3 className="font-serif text-lg font-bold">Independent & Reader-Led</h3>
            <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E]">
              Supported by our subscribers with full editorial independence.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center pt-8 border-t border-[#E8DFD5] dark:border-[#283330]">
          <h3 className="font-serif text-xl font-bold mb-2">Have a Field Dispatch to Share?</h3>
          <p className="text-xs text-[#6B726F] dark:text-[#95A39E] mb-6">
            We welcome photography portfolios, essays, and regional guides from mountain guides and writers.
          </p>
          <a
            href="mailto:contact@everygyan.com"
            className="inline-flex items-center gap-2 rounded-full bg-[#1A1F1E] dark:bg-[#F2EFE9] dark:text-[#0E1211] text-white px-6 py-3 text-xs font-semibold hover:bg-[#C86446] transition-colors"
          >
            <Mail className="h-4 w-4" /> Pitch an Editorial Story
          </a>
        </div>
      </div>
    </div>
  );
}
