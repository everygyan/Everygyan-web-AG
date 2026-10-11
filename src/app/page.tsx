import React from "react";
import Link from "next/link";
import { BentoHero } from "@/components/home/bento-hero";
import { ArticleCard } from "@/components/articles/article-card";
import { DestinationGrid } from "@/components/destinations/destination-grid";
import { TrendingBar } from "@/components/articles/trending-bar";
import { Newsletter } from "@/components/newsletter/newsletter";
import { getPublishedArticles } from "@/lib/supabase/api";
import { Sparkles } from "lucide-react";

export default async function HomePage() {
  const articles = await getPublishedArticles();
  const editorialArchive = articles.slice(2);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Journal Masthead */}
      <div className="mb-10 text-center max-w-3xl mx-auto border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Sparkles className="h-3 w-3" />
          The EveryGyan Collection
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9] leading-[1.1]">
          Chronicles of the Untamed & Curious
        </h1>
        <p className="mt-4 text-xs sm:text-base text-[#6B726F] dark:text-[#95A39E] font-normal leading-relaxed">
          Firsthand dispatches from remote alpine ranges, quiet cultural sanctuaries, and practical frameworks for the intentional wanderer.
        </p>
      </div>

      {/* Bento Grid Visual Mosaic */}
      <BentoHero />

      {/* Trending Bar */}
      <TrendingBar />

      {/* Curated Destination Terroirs */}
      <DestinationGrid />

      {/* The Field Archive Grid */}
      <section className="py-12 border-t border-[#E8DFD5] dark:border-[#283330]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C86446] dark:text-[#E07858]">
              Field Notes
            </span>
            <h2 className="mt-1 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
              Latest Dispatches & Guides
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-[#1A1F1E] text-white dark:bg-[#F2EFE9] dark:text-[#0E1211] px-4 py-1.5 text-xs font-semibold">
              All Stories
            </button>
            <button className="rounded-full bg-[#F5EFEB] dark:bg-[#1C2422] text-[#6B726F] dark:text-[#95A39E] px-4 py-1.5 text-xs font-medium hover:text-[#1A1F1E]">
              Expeditions
            </button>
            <button className="rounded-full bg-[#F5EFEB] dark:bg-[#1C2422] text-[#6B726F] dark:text-[#95A39E] px-4 py-1.5 text-xs font-medium hover:text-[#1A1F1E]">
              Gear Kits
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {editorialArchive.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="my-14">
        <Newsletter />
      </section>
    </div>
  );
}
