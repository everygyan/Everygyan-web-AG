"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_ARTICLES, TOP_DESTINATIONS } from "@/data/mock-data";
import { Search as SearchIcon, Filter, Clock, MapPin, Tag, ArrowRight } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered = FEATURED_ARTICLES.filter((article) => {
    const matchesQuery =
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.summary.toLowerCase().includes(query.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory =
      selectedCategory === "all" || article.category.slug === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Search Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Knowledge Base & Archive
        </span>
        <h1 className="mt-2 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Search Articles & Guides
        </h1>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          Search across high-elevation expeditions, slow travel guides, photography gear, and digital nomad resources.
        </p>

        {/* Search Input Bar */}
        <div className="mt-6 relative">
          <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search keywords, destinations, equipment or topics (e.g. Alps, Kyoto, gear, nomad)..."
            className="w-full rounded-2xl border border-zinc-200 bg-white pl-12 pr-4 py-3.5 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Category Pills Filter */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "all"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory("adventure-hiking")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "adventure-hiking"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            Adventure & Hiking
          </button>
          <button
            onClick={() => setSelectedCategory("cultural-expeditions")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "cultural-expeditions"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            Culture
          </button>
          <button
            onClick={() => setSelectedCategory("digital-nomad")}
            className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
              selectedCategory === "digital-nomad"
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            Digital Nomad
          </button>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-4 dark:border-zinc-800 mb-6">
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          Showing {filtered.length} {filtered.length === 1 ? "Article" : "Articles"}
        </h2>
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="text-xs text-emerald-600 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Results List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 transition-all"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-xs text-white">
                {article.category.name}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 line-clamp-2">
                  <Link href={`/article/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800 text-xs">
                <span className="text-zinc-500">{article.publishedAt}</span>
                <Link
                  href={`/article/${article.slug}`}
                  className="font-semibold text-emerald-600 flex items-center gap-1"
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
