import React from "react";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/supabase/api";
import { ArticleCard } from "@/components/articles/article-card";
import { Compass, Sparkles } from "lucide-react";

export async function generateStaticParams() {
  const guideCategories = ["solo-travel", "luxury", "budget", "digital-nomad"];
  return guideCategories.map((slug) => ({ slug }));
}

export default async function GuidesPage({
  params,
}: {
  params?: Promise<{ slug?: string }>;
}) {
  const resolvedParams = params ? await params : {};
  const slug = resolvedParams.slug;
  const articles = await getPublishedArticles();

  const title = slug
    ? slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") + " Guides"
    : "Travel Guides & Field Itineraries";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mb-12 border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Compass className="h-3 w-3" /> Curated Itineraries
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          {title}
        </h1>
        <p className="mt-3 text-sm text-[#6B726F] dark:text-[#95A39E] max-w-xl">
          Detailed trail circuits, route breakdowns, budget forecasts, and cultural etiquette for your next expedition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
