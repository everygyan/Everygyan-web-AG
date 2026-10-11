import React from "react";
import Link from "next/link";
import { getDestinations, getPublishedArticles } from "@/lib/supabase/api";
import { ArticleCard } from "@/components/articles/article-card";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, Compass } from "lucide-react";

export async function generateStaticParams() {
  const destinations = await getDestinations();
  const regions = ["europe", "asia", "africa", "nordic"];
  const staticSlugs = destinations.map((d) => ({ slug: d.slug }));
  const regionSlugs = regions.map((r) => ({ slug: r }));
  return [...staticSlugs, ...regionSlugs];
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destinations = await getDestinations();
  const articles = await getPublishedArticles();

  // Find either specific destination or region
  const dest = destinations.find((d) => d.slug.toLowerCase() === slug.toLowerCase());
  const isRegion = ["europe", "asia", "africa", "nordic"].includes(slug.toLowerCase());

  const title = dest
    ? dest.name
    : isRegion
    ? `${slug.charAt(0).toUpperCase() + slug.slice(1)} Region`
    : slug.charAt(0).toUpperCase() + slug.slice(1);

  const filteredArticles = articles.filter((a) => {
    if (dest) {
      return (
        a.destination?.name.toLowerCase() === dest.name.toLowerCase() ||
        a.tags.some((t) => t.toLowerCase() === dest.name.toLowerCase()) ||
        a.title.toLowerCase().includes(dest.name.toLowerCase())
      );
    }
    return (
      a.destination?.country.toLowerCase().includes(slug.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(slug.toLowerCase()))
    );
  });

  const displayArticles = filteredArticles.length > 0 ? filteredArticles : articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/destinations"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B726F] hover:text-[#C86446] transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to All Destinations
      </Link>

      {/* Header */}
      <div className="rounded-3xl border border-[#E8DFD5] bg-[#F5EFEB] p-8 sm:p-12 dark:border-[#283330] dark:bg-[#151B19] mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <MapPin className="h-3 w-3" /> Geographical Territory
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          {title}
        </h1>
        <p className="mt-3 text-xs sm:text-base text-[#6B726F] dark:text-[#95A39E] max-w-2xl leading-relaxed">
          {dest?.description ||
            `Curated dispatches, high-altitude trail itineraries, and slow cultural knowledge from ${title}.`}
        </p>
      </div>

      {/* Articles matching destination */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
          Dispatches & Itineraries ({displayArticles.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
