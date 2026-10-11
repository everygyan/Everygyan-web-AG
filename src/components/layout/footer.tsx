"use client";

import React from "react";
import Link from "next/link";
import { Compass, Mail, Heart, Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  const [year, setYear] = React.useState("2026");

  React.useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="border-t border-[#E8DFD5] bg-[#F5EFEB] text-[#6B726F] dark:border-[#283330] dark:bg-[#151B19] dark:text-[#95A39E] transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1F1E] text-[#FDFBF7] dark:bg-[#F2EFE9] dark:text-[#0E1211] shadow-sm">
                <Compass className="h-5 w-5 stroke-[1.8]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
                WANDER<span className="italic font-light text-[#C86446] dark:text-[#E07858]">LUST</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-[#6B726F] dark:text-[#95A39E]">
              An independent journal documenting rare landscapes, thoughtful cultural preservation, and practical frameworks for modern wanderers.
            </p>
            <div className="mt-6 flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-[#C86446] dark:text-[#E07858] font-medium">
                <Globe className="h-4 w-4" />
                Worldwide Editions
              </span>
              <span>•</span>
              <span>ISSN 2984-9011</span>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#1A1F1E] dark:text-[#F2EFE9]">
              Destinations
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/destinations/europe" className="hover:text-[#C86446] transition-colors">
                  European High Alps
                </Link>
              </li>
              <li>
                <Link href="/destinations/asia" className="hover:text-[#C86446] transition-colors">
                  Kyoto & Traditional Japan
                </Link>
              </li>
              <li>
                <Link href="/destinations/africa" className="hover:text-[#C86446] transition-colors">
                  Sahara & Northern Africa
                </Link>
              </li>
              <li>
                <Link href="/destinations/nordic" className="hover:text-[#C86446] transition-colors">
                  Sub-Arctic Fjords
                </Link>
              </li>
            </ul>
          </div>

          {/* Field Knowledge */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#1A1F1E] dark:text-[#F2EFE9]">
              Field Knowledge
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/knowledge/photography" className="hover:text-[#C86446] transition-colors">
                  Expedition Camera Kits
                </Link>
              </li>
              <li>
                <Link href="/guides/digital-nomad" className="hover:text-[#C86446] transition-colors">
                  Remote Living Frameworks
                </Link>
              </li>
              <li>
                <Link href="/knowledge/packing" className="hover:text-[#C86446] transition-colors">
                  Minimalist Gear Lists
                </Link>
              </li>
              <li>
                <Link href="/guides/budget" className="hover:text-[#C86446] transition-colors">
                  Low-Impact Travel
                </Link>
              </li>
            </ul>
          </div>

          {/* The Journal */}
          <div>
            <h4 className="font-serif text-xs font-semibold uppercase tracking-widest text-[#1A1F1E] dark:text-[#F2EFE9]">
              The Journal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#C86446] transition-colors">
                  Editorial Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C86446] transition-colors">
                  Submit a Dispatch
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#C86446] transition-colors">
                  Privacy & Cookie Consent
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#C86446] transition-colors">
                  Terms of Publication
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between border-t border-[#E8DFD5]/80 pt-8 sm:flex-row dark:border-[#283330] text-xs">
          <p>© {year} WANDERLUST Editorial. Printed digitally with Next.js & Supabase.</p>
          <p className="mt-3 sm:mt-0 flex items-center gap-1 text-[#6B726F] dark:text-[#95A39E]">
            Automated deployment ready for GitHub & Hostinger
            <ArrowUpRight className="h-3.5 w-3.5" />
          </p>
        </div>
      </div>
    </footer>
  );
}
