import React from "react";
import Link from "next/link";
import { FEATURED_ARTICLES } from "@/data/mock-data";
import { TrendingUp, ArrowRight } from "lucide-react";

export function TrendingBar() {
  const trending = FEATURED_ARTICLES.filter((a) => a.isTrending);

  return (
    <div className="border border-[#E8DFD5] bg-[#F5EFEB] dark:border-[#283330] dark:bg-[#151B19] py-3 px-5 my-8 rounded-2xl">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C86446] dark:text-[#E07858] shrink-0">
          <TrendingUp className="h-4 w-4" />
          <span>Curated Dispatches:</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
          {trending.map((item, idx) => (
            <Link
              key={item.id}
              href={`/article/${item.slug}`}
              className="group flex items-center gap-2 text-[#1A1F1E]/80 hover:text-[#C86446] dark:text-[#F2EFE9]/80 dark:hover:text-[#E07858] font-medium transition-colors"
            >
              <span className="text-[#6B726F] font-mono text-[11px]">0{idx + 1}</span>
              <span className="line-clamp-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
