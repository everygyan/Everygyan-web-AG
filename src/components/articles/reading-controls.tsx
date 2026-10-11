"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, Share2, Check, Clock } from "lucide-react";
import { Article } from "@/types";

interface ReadingControlsProps {
  article: Article;
}

export function ReadingControls({ article }: ReadingControlsProps) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch (err) {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <>
      {/* Sticky Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#C86446] to-[#D4A373] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Action Controls */}
      <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-4 shadow-sm dark:border-[#283330] dark:bg-[#151B19] flex items-center justify-around text-xs font-medium">
        <button
          onClick={handleBookmark}
          className={`flex items-center gap-1.5 transition-colors ${
            bookmarked
              ? "text-[#C86446] font-semibold"
              : "text-[#6B726F] hover:text-[#C86446] dark:text-[#95A39E]"
          }`}
        >
          <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-[#C86446]" : ""}`} />
          <span>{bookmarked ? "Saved" : "Save Story"}</span>
        </button>

        <div className="h-4 w-px bg-[#E8DFD5] dark:bg-[#283330]" />

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-[#6B726F] hover:text-[#C86446] dark:text-[#95A39E] transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
