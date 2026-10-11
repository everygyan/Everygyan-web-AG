import React from "react";
import Link from "next/link";
import { Article } from "@/types";
import { Clock, Calendar, ArrowRight, Bookmark } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] shadow-sm hover:shadow-xl dark:border-[#283330] dark:bg-[#151B19] transition-all duration-300">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="rounded-full bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#1A1F1E] dark:bg-[#151B19]/90 dark:text-[#F2EFE9]">
            {article.category.name}
          </span>
          {article.destination && (
            <span className="rounded-full bg-[#1A1F1E]/70 backdrop-blur-md px-2.5 py-1 text-[10px] text-white">
              📍 {article.destination.name}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#6B726F] dark:text-[#95A39E]">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readingTime}
            </span>
          </div>

          <h3 className="mt-2.5 font-serif text-xl font-bold leading-snug text-[#1A1F1E] group-hover:text-[#C86446] dark:text-[#F2EFE9] dark:group-hover:text-[#E07858] transition-colors">
            <Link href={`/article/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#6B726F] dark:text-[#95A39E] line-clamp-2">
            {article.summary}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[#E8DFD5]/70 pt-4 dark:border-[#283330]">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-7 w-7 rounded-full object-cover ring-1 ring-[#C86446]/40"
            />
            <span className="text-xs font-medium text-[#1A1F1E] dark:text-[#F2EFE9]">
              {article.author.name}
            </span>
          </div>

          <Link
            href={`/article/${article.slug}`}
            className="text-xs font-semibold text-[#C86446] hover:text-[#B25235] dark:text-[#E07858] flex items-center gap-1"
          >
            Read <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
