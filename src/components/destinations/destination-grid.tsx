import React from "react";
import Link from "next/link";
import { TOP_DESTINATIONS } from "@/data/mock-data";
import { ArrowUpRight, Compass } from "lucide-react";

export function DestinationGrid() {
  return (
    <section className="py-12 border-t border-[#E8DFD5] dark:border-[#283330]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C86446] dark:text-[#E07858]">
            Curated Geographies
          </span>
          <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
            Explore by Terroir & Terrain
          </h2>
        </div>
        <Link
          href="/destinations"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] hover:text-[#C86446] transition-colors"
        >
          View all 24 territories <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOP_DESTINATIONS.map((dest) => (
          <Link
            key={dest.id}
            href={`/destinations/${dest.slug}`}
            className="group relative overflow-hidden rounded-3xl aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E8DFD5]/60 dark:border-[#283330]"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F1E]/90 via-[#1A1F1E]/30 to-transparent" />

            <div className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-medium text-white border border-white/20">
              {dest.articleCount} Dispatches
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4A373]">
                {dest.region}
              </span>
              <h3 className="font-serif text-2xl font-bold tracking-tight mt-0.5">
                {dest.name}
              </h3>
              <p className="mt-2 text-xs text-[#F2EFE9]/80 line-clamp-2 leading-relaxed opacity-90">
                {dest.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
