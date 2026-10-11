import React from "react";
import Link from "next/link";
import { getDestinations, getPublishedArticles } from "@/lib/supabase/api";
import { ArticleCard } from "@/components/articles/article-card";
import { Compass, MapPin, ArrowRight } from "lucide-react";

export default async function DestinationsLandingPage() {
  const destinations = await getDestinations();
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-3xl mb-12 border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Compass className="h-3 w-3" /> Global Territories
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Destinations & Terroirs
        </h1>
        <p className="mt-3 text-sm text-[#6B726F] dark:text-[#95A39E] max-w-xl">
          Curated guides organized by geographical region. From the European high peaks to sub-arctic fjords and tropical archipelagos.
        </p>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {destinations.map((dest) => (
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
              {dest.region}
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4A373] flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {dest.country}
              </span>
              <h3 className="font-serif text-2xl font-bold tracking-tight mt-0.5">
                {dest.name}
              </h3>
              <p className="mt-2 text-xs text-[#F2EFE9]/80 line-clamp-2 leading-relaxed">
                {dest.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Field Dispatches across all territories */}
      <section className="pt-6 border-t border-[#E8DFD5] dark:border-[#283330]">
        <div className="mb-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C86446] dark:text-[#E07858]">
            Archived Expeditions
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
            Recent Field Reports by Region
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
