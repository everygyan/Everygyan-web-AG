"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import {
  CommentItem,
  getArticleComments,
  submitComment,
} from "@/lib/supabase/user-interactions";
import { MessageSquare, Send, User, Loader2, AlertCircle } from "lucide-react";

interface CommentSectionProps {
  articleId: string;
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch comments
    getArticleComments(articleId).then(setComments);

    // 2. Check current authenticated user
    supabase.auth.getUser().then(({ data }) => {
      setCurrentUser(data.user);
    });

    // 3. Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    setErrorMsg(null);

    const res = await submitComment(articleId, content);

    if (res.success && res.comment) {
      setComments((prev) => [...prev, res.comment!]);
      setContent("");
    } else {
      setErrorMsg(res.error || "Failed to submit comment.");
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-12 rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 sm:p-8 dark:border-[#283330] dark:bg-[#151B19]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#C86446]" />
          <h3 className="font-serif text-xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            Discussion ({comments.length})
          </h3>
        </div>
        <span className="text-[11px] font-medium text-[#6B726F] dark:text-[#95A39E]">
          Community Field Notes
        </span>
      </div>

      {errorMsg && (
        <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Comment Form */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="rounded-2xl border border-[#E8DFD5] bg-[#F5EFEB] p-3 dark:border-[#283330] dark:bg-[#1C2422]">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience, trail conditions, or advice..."
              required
              className="w-full bg-transparent text-xs sm:text-sm text-[#1A1F1E] dark:text-[#F2EFE9] placeholder-[#6B726F] focus:outline-none resize-none"
            />
            <div className="flex items-center justify-between border-t border-[#E8DFD5]/70 pt-2.5 dark:border-[#283330]">
              <span className="text-[11px] text-[#6B726F] dark:text-[#95A39E]">
                Posting as {currentUser.user_metadata?.full_name || currentUser.email}
              </span>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446] hover:bg-[#B25235] disabled:opacity-50 px-4 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                {submitting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Send className="h-3.5 w-3.5" />
                )}
                Post Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-2xl border border-[#E8DFD5] bg-[#F5EFEB] p-4 text-center dark:border-[#283330] dark:bg-[#1C2422]">
          <p className="text-xs text-[#6B726F] dark:text-[#95A39E] mb-3">
            Sign in to join the conversation and bookmark this dispatch.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1F1E] dark:bg-[#F2EFE9] dark:text-[#0E1211] text-white px-5 py-2 text-xs font-semibold hover:bg-[#C86446] transition-colors"
          >
            <User className="h-3.5 w-3.5" /> Sign In to Comment
          </Link>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-2xl bg-[#F5EFEB] p-4 dark:bg-[#1C2422] border border-[#E8DFD5]/60 dark:border-[#283330]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {comment.authorAvatar ? (
                  <img
                    src={comment.authorAvatar}
                    alt={comment.authorName}
                    className="h-6 w-6 rounded-full object-cover ring-1 ring-[#C86446]/40"
                  />
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1F1E] text-[10px] font-bold text-white">
                    {comment.authorName.charAt(0)}
                  </div>
                )}
                <span className="text-xs font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                  {comment.authorName}
                </span>
              </div>
              <span className="text-[11px] text-[#6B726F] dark:text-[#95A39E]">
                {comment.createdAt}
              </span>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-[#1A1F1E]/85 dark:text-[#F2EFE9]/85 leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
