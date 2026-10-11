import React from "react";
import Link from "next/link";
import { FEATURED_ARTICLES } from "@/data/mock-data";
import { Clock, Calendar, ArrowRight, Bookmark, Play, Sparkles } from "lucide-react";

export function BentoHero() {
  const heroStory = FEATURED_ARTICLES[0];
  const sideStory1 = FEATURED_ARTICLES[1];
  const sideStory2 = FEATURED_ARTICLES[2];
  const visualTile = FEATURED_ARTICLES[3];

  return (
    <section className="my-8">
      {/* Bento Grid Mosaic */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Large Editorial Tile (7 Columns) */}
        <div className="group relative overflow-hidden rounded-3xl md:col-span-7 bg-[#FFFFFF] dark:bg-[#151B19] border border-[#E8DFD5] dark:border-[#283330] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={heroStory.coverImage}
              alt={heroStory.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="rounded-full bg-[#1A1F1E]/80 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium uppercase tracking-wider text-[#FDFBF7]">
                Cover Story
              </span>
              <span className="rounded-full bg-[#C86446] px-3.5 py-1 text-[11px] font-medium text-white shadow-sm">
                📍 {heroStory.destination?.name}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C86446] dark:text-[#E07858]">
                <span>{heroStory.category.name}</span>
                <span>•</span>
                <span className="text-[#6B726F] dark:text-[#95A39E] flex items-center gap-1 font-normal">
                  <Clock className="h-3.5 w-3.5" /> {heroStory.readingTime}
                </span>
              </div>

              <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9] group-hover:text-[#C86446] transition-colors leading-tight">
                <Link href={`/article/${heroStory.slug}`}>{heroStory.title}</Link>
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-[#6B726F] dark:text-[#95A39E] line-clamp-2 leading-relaxed">
                {heroStory.summary}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#E8DFD5]/70 dark:border-[#283330] pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={heroStory.author.avatar}
                  alt={heroStory.author.name}
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-[#C86446]/40"
                />
                <div>
                  <span className="text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] block">
                    {heroStory.author.name}
                  </span>
                  <span className="text-[10px] text-[#6B726F] dark:text-[#95A39E]">
                    {heroStory.publishedAt}
                  </span>
                </div>
              </div>

              <Link
                href={`/article/${heroStory.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#C86446] dark:text-[#E07858] hover:underline"
              >
                Read Dispatch <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Bento Column: 2 Stacked Tiles (5 Columns) */}
        <div className="md:col-span-5 flex flex-col gap-6">
          
          {/* Side Tile 1: Cultural Expedition */}
          <div className="group relative overflow-hidden rounded-3xl bg-[#FFFFFF] dark:bg-[#151B19] border border-[#E8DFD5] dark:border-[#283330] shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C86446] dark:text-[#E07858]">
                  {sideStory1.category.name}
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9] group-hover:text-[#C86446] transition-colors leading-snug">
                  <Link href={`/article/${sideStory1.slug}`}>{sideStory1.title}</Link>
                </h3>
                <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E] line-clamp-2">
                  {sideStory1.summary}
                </p>
              </div>
              <img
                src={sideStory1.coverImage}
                alt={sideStory1.title}
                className="h-20 w-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-[#6B726F] dark:text-[#95A39E] border-t border-[#E8DFD5]/60 dark:border-[#283330] pt-3">
              <span>{sideStory1.author.name}</span>
              <span className="font-medium text-[#C86446] dark:text-[#E07858]">
                {sideStory1.readingTime}
              </span>
            </div>
          </div>

          {/* Side Tile 2: Visual Journey with Video Callout */}
          <div className="group relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-auto flex-1 shadow-sm border border-[#E8DFD5] dark:border-[#283330]">
            <img
              src={visualTile.coverImage}
              alt={visualTile.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F1E]/90 via-[#1A1F1E]/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-white">
                <Play className="h-3 w-3 fill-white" /> Expedition Footage
              </span>
            </div>

            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4A373]">
                {visualTile.destination?.name || "Sub-Arctic"}
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight mt-1 line-clamp-2">
                <Link href={`/article/${visualTile.slug}`}>{visualTile.title}</Link>
              </h3>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
