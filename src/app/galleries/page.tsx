import React from "react";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/supabase/api";
import { Camera, ArrowRight } from "lucide-react";

export default async function VisualStoriesPage() {
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mb-12 border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Camera className="h-3 w-3" /> Visual Essays
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Visual Stories & Galleries
        </h1>
        <p className="mt-3 text-sm text-[#6B726F] dark:text-[#95A39E] max-w-xl">
          High-resolution photography portfolios and film dispatches capturing remote corners of our planet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-md hover:shadow-2xl transition-all duration-500 border border-[#E8DFD5] dark:border-[#283330]"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F1E]/90 via-[#1A1F1E]/30 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <span className="text-[10px] uppercase font-semibold tracking-widest text-[#D4A373]">
                {article.destination?.name || "Global Field"}
              </span>
              <h3 className="font-serif text-xl font-bold mt-1 line-clamp-2 leading-snug">
                {article.title}
              </h3>
              <p className="mt-2 text-xs text-[#F2EFE9]/80 line-clamp-2">
                {article.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
