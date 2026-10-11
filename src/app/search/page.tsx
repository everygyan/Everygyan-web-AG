"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { searchArticles } from "@/lib/supabase/api";
import { Article } from "@/types";
import { Search as SearchIcon, ArrowRight, Clock, Loader2, Sparkles } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    let active = true;
    setLoading(true);

    const delayDebounce = setTimeout(async () => {
      try {
        const data = await searchArticles(query);
        if (active) {
          setResults(data);
        }
      } catch (err) {
        // Handle error gracefully
      } finally {
        if (active) setLoading(false);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(delayDebounce);
    };
  }, [query]);

  const filtered = results.filter((article) => {
    if (selectedCategory === "all") return true;
    return article.category.slug === selectedCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Sparkles className="h-3 w-3" /> EveryGyan Search Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Explore Dispatches & Guides
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-[#6B726F] dark:text-[#95A39E]">
          Full-text PostgreSQL search across alpine traverses, nomad logistics, photography gear, and cultural essays.
        </p>

        {/* Search Input Bar */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-[#6B726F]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, destinations, equipment or topics (e.g. Alps, Kyoto, gear, nomad)..."
            className="w-full rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] pl-12 pr-12 py-3.5 text-xs sm:text-sm text-[#1A1F1E] shadow-sm focus:border-[#C86446] focus:outline-none focus:ring-1 focus:ring-[#C86446] dark:border-[#283330] dark:bg-[#151B19] dark:text-[#F2EFE9]"
          />
          {loading && (
            <Loader2 className="absolute right-4 top-3.5 h-5 w-5 animate-spin text-[#C86446]" />
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "all"
                ? "bg-[#1A1F1E] text-white dark:bg-[#F2EFE9] dark:text-[#0E1211]"
                : "bg-[#F5EFEB] text-[#6B726F] hover:text-[#1A1F1E] dark:bg-[#1C2422] dark:text-[#95A39E]"
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory("expedition")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "expedition"
                ? "bg-[#C86446] text-white"
                : "bg-[#F5EFEB] text-[#6B726F] hover:text-[#1A1F1E] dark:bg-[#1C2422] dark:text-[#95A39E]"
            }`}
          >
            Expeditions
          </button>
          <button
            onClick={() => setSelectedCategory("cultural-expeditions")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "cultural-expeditions"
                ? "bg-[#C86446] text-white"
                : "bg-[#F5EFEB] text-[#6B726F] hover:text-[#1A1F1E] dark:bg-[#1C2422] dark:text-[#95A39E]"
            }`}
          >
            Culture
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4 dark:border-[#283330] mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#1A1F1E] dark:text-[#F2EFE9]">
          Showing {filtered.length} {filtered.length === 1 ? "Dispatch" : "Dispatches"}
        </h2>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs text-[#C86446] hover:underline"
          >
            Reset Query
          </button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] shadow-sm hover:shadow-xl dark:border-[#283330] dark:bg-[#151B19] transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#1A1F1E]/80 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white">
                {article.category.name}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1A1F1E] group-hover:text-[#C86446] dark:text-[#F2EFE9] line-clamp-2 leading-snug">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E] line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-[#E8DFD5]/70 pt-3 dark:border-[#283330] text-xs">
                <span className="text-[#6B726F] text-[11px]">{article.publishedAt}</span>
                <Link
                  href={`/article/${article.slug}`}
                  className="font-semibold text-[#C86446] hover:text-[#B25235] flex items-center gap-1"
                >
                  Read <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
