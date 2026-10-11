import React from "react";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/supabase/api";
import { ArticleCard } from "@/components/articles/article-card";
import { ArrowLeft, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  const topics = ["photography", "digital-nomad", "packing", "flight-hacks"];
  return topics.map((slug) => ({ slug }));
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articles = await getPublishedArticles();

  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const filtered = articles.filter(
    (a) =>
      a.category.slug.toLowerCase().includes(slug.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(slug.toLowerCase()))
  );

  const displayArticles = filtered.length > 0 ? filtered : articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/knowledge"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B726F] hover:text-[#C86446] transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Knowledge Base
      </Link>

      <div className="rounded-3xl border border-[#E8DFD5] bg-[#F5EFEB] p-8 sm:p-12 dark:border-[#283330] dark:bg-[#151B19] mb-12">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <BookOpen className="h-3 w-3" /> Field Syllabus
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          {title} Masterclass
        </h1>
        <p className="mt-3 text-xs sm:text-base text-[#6B726F] dark:text-[#95A39E] max-w-2xl leading-relaxed">
          Comprehensive field manuals, technical breakdowns, and verified field reports on {title}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
