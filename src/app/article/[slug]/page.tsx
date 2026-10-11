import React from "react";
import Link from "next/link";
import { getArticleBySlug, getPublishedArticles } from "@/lib/supabase/api";
import { ReadingControls } from "@/components/articles/reading-controls";
import { CommentSection } from "@/components/articles/comment-section";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  MapPin,
  Tag,
  MessageSquare,
  Sparkles,
  Play,
} from "lucide-react";

export async function generateStaticParams() {
  const articles = await getPublishedArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getPublishedArticles();
  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="min-h-screen pb-20">
      {/* Top Breadcrumb & Editorial Header */}
      <div className="bg-[#F5EFEB] border-b border-[#E8DFD5] dark:bg-[#151B19] dark:border-[#283330] py-8">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B726F] hover:text-[#C86446] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Dispatches
          </Link>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#C86446]/10 border border-[#C86446]/20 px-3 py-0.5 text-xs font-semibold text-[#C86446] dark:text-[#E07858]">
              {article.category.name}
            </span>
            {article.destination && (
              <span className="rounded-full bg-[#FFFFFF] dark:bg-[#1C2422] border border-[#E8DFD5] dark:border-[#283330] px-3 py-0.5 text-xs font-medium text-[#1A1F1E] dark:text-[#F2EFE9] flex items-center gap-1">
                <MapPin className="h-3 w-3 text-[#C86446]" />
                {article.destination.name}, {article.destination.country}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9] leading-[1.15]">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#6B726F] dark:text-[#95A39E] leading-relaxed">
            {article.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between border-t border-[#E8DFD5]/80 pt-5 dark:border-[#283330] text-xs text-[#6B726F] dark:text-[#95A39E] gap-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-[#C86446]/30"
              />
              <div>
                <h4 className="font-semibold text-[#1A1F1E] dark:text-[#F2EFE9]">
                  {article.author.name}
                </h4>
                <p className="text-[11px] text-[#6B726F] dark:text-[#95A39E]">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cover Photography / Embedded Video */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 my-10">
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl border border-[#E8DFD5] dark:border-[#283330]">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          {article.videoUrl && (
            <div className="absolute bottom-4 right-4">
              <a
                href={article.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A1F1E]/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-white hover:bg-[#C86446] transition-colors"
              >
                <Play className="h-3.5 w-3.5 fill-white" /> Watch Field Footage
              </a>
            </div>
          )}
        </div>
        <p className="mt-3 text-center text-xs text-[#6B726F] dark:text-[#95A39E] italic">
          EveryGyan field photography • Recorded on location
        </p>
      </div>

      {/* Article Content Layout */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="prose max-w-none text-[#1A1F1E] dark:text-[#F2EFE9] leading-relaxed space-y-6">
            <div className="rounded-2xl border-l-4 border-[#C86446] bg-[#F5EFEB] p-5 dark:bg-[#151B19] text-xs sm:text-sm text-[#1A1F1E] dark:text-[#F2EFE9]">
              <p className="font-semibold text-[#C86446] dark:text-[#E07858] flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[11px]">
                <Sparkles className="h-3.5 w-3.5" /> Field Editorial Note
              </p>
              Audited by EveryGyan correspondents. Always consult local authorities and regional guides before setting out into the backcountry.
            </div>

            {/* Article Body Content */}
            <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-[#1A1F1E]/90 dark:text-[#F2EFE9]/90 font-sans">
              {article.content}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-10 border-t border-[#E8DFD5] pt-6 dark:border-[#283330]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#6B726F] flex items-center gap-1">
                <Tag className="h-3 w-3" /> Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#F5EFEB] px-3 py-1 text-xs font-medium text-[#1A1F1E] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Live Supabase Comments Feed */}
          <CommentSection articleId={article.id} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Floating Controls */}
          <ReadingControls article={article} />

          {/* Author Card */}
          <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
              Field Author
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C86446]/30"
              />
              <div>
                <h3 className="font-serif text-base font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                  {article.author.name}
                </h3>
                <p className="text-xs text-[#6B726F]">{article.author.role}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#6B726F] dark:text-[#95A39E] leading-relaxed">
              {article.author.bio || "Field correspondent documenting mountain ranges and cultural architecture for EveryGyan."}
            </p>
          </div>

          {/* Related Articles */}
          <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
            <h4 className="text-[10px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-4">
              Related Dispatches
            </h4>
            <div className="space-y-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/article/${item.slug}`}
                  className="group flex gap-3 items-center"
                >
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-14 w-14 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#1A1F1E] group-hover:text-[#C86446] dark:text-[#F2EFE9] line-clamp-2">
                      {item.title}
                    </h5>
                    <span className="text-[10px] text-[#6B726F]">{item.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
