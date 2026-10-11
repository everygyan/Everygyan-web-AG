"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { getPublishedArticles } from "@/lib/supabase/api";
import { getUserBookmarks } from "@/lib/supabase/user-interactions";
import { ArticleCard } from "@/components/articles/article-card";
import { Article } from "@/types";
import { Bookmark, ArrowRight, User, Compass, Loader2 } from "lucide-react";

export default function BookmarksPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setCurrentUser(user);

      if (user) {
        const [savedIds, allArticles] = await Promise.all([
          getUserBookmarks(),
          getPublishedArticles(),
        ]);

        if (savedIds.length > 0) {
          const matched = allArticles.filter((a) => savedIds.includes(a.id));
          setBookmarkedArticles(matched.length > 0 ? matched : allArticles.slice(0, 2));
        } else {
          // If no bookmarks yet, show recent
          setBookmarkedArticles(allArticles.slice(0, 2));
        }
      } else {
        const allArticles = await getPublishedArticles();
        setBookmarkedArticles(allArticles.slice(0, 2));
      }
      setLoading(false);
    }

    loadData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-12 border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Bookmark className="h-3 w-3" /> Field Archives
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Saved Stories & Waypoints
        </h1>
        <p className="mt-3 text-xs sm:text-base text-[#6B726F] dark:text-[#95A39E] max-w-xl">
          Your personal library of bookmarked expeditions, gear breakdowns, and high-altitude itineraries.
        </p>
      </div>

      {!currentUser && (
        <div className="mb-10 rounded-3xl border border-[#E8DFD5] bg-[#F5EFEB] p-6 sm:p-8 dark:border-[#283330] dark:bg-[#151B19] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
              Sync Bookmarks Across Devices
            </h3>
            <p className="text-xs text-[#6B726F] dark:text-[#95A39E] mt-1">
              Sign in with your EveryGyan account to save stories to your cloud library permanently.
            </p>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446] hover:bg-[#B25235] px-5 py-2.5 text-xs font-semibold text-white transition-colors shrink-0"
          >
            <User className="h-3.5 w-3.5" /> Sign In / Register
          </Link>
        </div>
      )}

      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center text-xs text-[#6B726F]">
          <Loader2 className="h-8 w-8 animate-spin text-[#C86446] mb-3" />
          <span>Loading your field library...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
