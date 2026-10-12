"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  checkIsAdmin,
  adminFetchArticles,
  adminCreateArticle,
  adminUpdateArticleStatus,
  adminDeleteArticle,
  adminFetchComments,
  adminModerateComment,
  adminAddMenuItem,
  adminDeleteMenuItem,
} from "@/lib/supabase/admin-api";
import { getNavigationMenus } from "@/lib/supabase/api";
import { MenuItem } from "@/types";
import {
  Shield,
  FileText,
  MessageSquare,
  Users,
  Plus,
  CheckCircle,
  Layers,
  Trash2,
  Edit,
  Eye,
  Loader2,
  Sparkles,
  ArrowUpRight,
  X,
  Send,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"articles" | "menus" | "comments">("articles");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [submittingArticle, setSubmittingArticle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCover, setNewCover] = useState("");
  const [newVideo, setNewVideo] = useState("");
  const [newStatus, setNewStatus] = useState<"draft" | "published">("published");

  // Menus state
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [isAddingMenu, setIsAddingMenu] = useState(false);
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuUrl, setNewMenuUrl] = useState("");
  const [newMenuParentId, setNewMenuParentId] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState<any[]>([]);

  // Load Admin Data
  useEffect(() => {
    async function loadAdminDashboard() {
      setLoading(true);
      const { isAdmin, user: authUser } = await checkIsAdmin();

      if (!authUser) {
        router.push("/auth/login");
        return;
      }

      setUser(authUser);

      // Load all dynamic data in parallel
      const [dbArticles, dbMenus, dbComments] = await Promise.all([
        adminFetchArticles(),
        getNavigationMenus(),
        adminFetchComments(),
      ]);

      setArticles(dbArticles);
      setMenus(dbMenus);
      setComments(dbComments);
      setLoading(false);
    }

    loadAdminDashboard();
  }, [router]);

  // Handle article creation
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingArticle(true);

    const generatedSlug =
      newSlug.trim() ||
      newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const res = await adminCreateArticle({
      title: newTitle,
      slug: generatedSlug,
      summary: newSummary,
      content_body: newContent,
      featured_image_url:
        newCover ||
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80",
      video_url: newVideo || undefined,
      status: newStatus,
    });

    if (res.success && res.data) {
      setArticles((prev) => [res.data, ...prev]);
      setIsCreatingArticle(false);
      // Reset form
      setNewTitle("");
      setNewSlug("");
      setNewSummary("");
      setNewContent("");
      setNewCover("");
      setNewVideo("");
    } else {
      alert("Error: " + (res.error || "Failed to create article."));
    }
    setSubmittingArticle(false);
  };

  // Toggle publish state
  const handleToggleStatus = async (articleId: string, currentStatus: string) => {
    const nextStatus = currentStatus === "published" ? "draft" : "published";
    const ok = await adminUpdateArticleStatus(articleId, nextStatus);
    if (ok) {
      setArticles((prev) =>
        prev.map((a) => (a.id === articleId ? { ...a, status: nextStatus } : a))
      );
    }
  };

  // Delete article
  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    const ok = await adminDeleteArticle(articleId);
    if (ok) {
      setArticles((prev) => prev.filter((a) => a.id !== articleId));
    }
  };

  // Moderate comment
  const handleModerateComment = async (
    commentId: string,
    action: "approved" | "pending" | "delete"
  ) => {
    const ok = await adminModerateComment(commentId, action);
    if (ok) {
      if (action === "delete") {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } else {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, status: action } : c))
        );
      }
    }
  };

  // Add menu item
  const handleAddMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuTitle || !newMenuUrl) return;

    const ok = await adminAddMenuItem({
      title: newMenuTitle,
      custom_url: newMenuUrl,
      parent_id: newMenuParentId,
    });

    if (ok) {
      const refreshed = await getNavigationMenus();
      setMenus(refreshed);
      setIsAddingMenu(false);
      setNewMenuTitle("");
      setNewMenuUrl("");
      setNewMenuParentId(null);
    } else {
      alert("Failed to save menu item to Supabase.");
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-xs text-[#6B726F]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C86446] mb-3" />
        <span>Authenticating Administrator Session...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E8DFD5] pb-6 dark:border-[#283330] gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858]">
              <Shield className="h-3.5 w-3.5" />
              EveryGyan Editorial Studio
            </span>
            <span className="text-xs text-[#6B726F]">• {user?.email}</span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
            Administrator CMS & Menu Customizer
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreatingArticle(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#C86446] hover:bg-[#B25235] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-colors"
          >
            <Plus className="h-4 w-4" />
            Write Article
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="flex items-center justify-between text-xs text-[#6B726F]">
            <span>Published Stories</span>
            <FileText className="h-4 w-4 text-[#C86446]" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            {articles.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Live in database</span>
        </div>

        <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="flex items-center justify-between text-xs text-[#6B726F]">
            <span>Comments Moderated</span>
            <MessageSquare className="h-4 w-4 text-[#D4A373]" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            {comments.length}
          </div>
          <span className="text-[11px] text-[#6B726F] font-medium">Community feedback</span>
        </div>

        <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="flex items-center justify-between text-xs text-[#6B726F]">
            <span>Dynamic Menus</span>
            <Layers className="h-4 w-4 text-[#C86446]" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            {menus.length}
          </div>
          <span className="text-[11px] text-[#C86446] font-medium">Root navigation nodes</span>
        </div>

        <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="flex items-center justify-between text-xs text-[#6B726F]">
            <span>Newsletter Subscribers</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            42,810
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">+142 this week</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-4 border-b border-[#E8DFD5] dark:border-[#283330]">
        <button
          onClick={() => setActiveTab("articles")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "articles"
              ? "border-b-2 border-[#C86446] text-[#C86446] dark:text-[#E07858]"
              : "text-[#6B726F] hover:text-[#1A1F1E] dark:hover:text-[#F2EFE9]"
          }`}
        >
          Articles Publishing Studio
        </button>
        <button
          onClick={() => setActiveTab("menus")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "menus"
              ? "border-b-2 border-[#C86446] text-[#C86446] dark:text-[#E07858]"
              : "text-[#6B726F] hover:text-[#1A1F1E] dark:hover:text-[#F2EFE9]"
          }`}
        >
          Visual Menu Builder
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "comments"
              ? "border-b-2 border-[#C86446] text-[#C86446] dark:text-[#E07858]"
              : "text-[#6B726F] hover:text-[#1A1F1E] dark:hover:text-[#F2EFE9]"
          }`}
        >
          Community Moderation
        </button>
      </div>

      {/* Modal: Create Article */}
      {isCreatingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-6 sm:p-8 shadow-2xl dark:border-[#283330] dark:bg-[#151B19]">
            <div className="flex items-center justify-between border-b border-[#E8DFD5] pb-4 mb-6 dark:border-[#283330]">
              <h3 className="font-serif text-2xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                Write & Publish Article
              </h3>
              <button
                onClick={() => setIsCreatingArticle(false)}
                className="p-1 rounded-full text-[#6B726F] hover:text-[#1A1F1E]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Traversing the Swiss Alps: Hidden High-Altitude Trails"
                  className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                    URL Slug (auto-generated if empty)
                  </label>
                  <input
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    placeholder="swiss-alps-trail-guide"
                    className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                    Publication Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                  >
                    <option value="published">Published (Live instantly)</option>
                    <option value="draft">Draft (Saved private)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                  Summary / Deck
                </label>
                <textarea
                  rows={2}
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="One or two sentences highlighting the core thesis..."
                  className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                  Full Article Body (Markdown supported)
                </label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write your story using markdown headers, quotes and lists..."
                  className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                    Cover Photo URL
                  </label>
                  <input
                    type="url"
                    value={newCover}
                    onChange={(e) => setNewCover(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                    YouTube/Vimeo Video URL (optional)
                  </label>
                  <input
                    type="url"
                    value={newVideo}
                    onChange={(e) => setNewVideo(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingArticle(false)}
                  className="rounded-xl px-5 py-2.5 text-xs font-semibold text-[#6B726F] hover:text-[#1A1F1E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingArticle}
                  className="rounded-xl bg-[#C86446] hover:bg-[#B25235] px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-colors flex items-center gap-1.5"
                >
                  {submittingArticle ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save & Publish"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 1: Articles Publishing Studio */}
      {activeTab === "articles" && (
        <div className="mt-6 rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] overflow-hidden shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5EFEB] dark:bg-[#1C2422] text-[#6B726F] font-semibold border-b border-[#E8DFD5] dark:border-[#283330]">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD5]/70 dark:divide-[#283330] text-[#1A1F1E] dark:text-[#F2EFE9]">
                {articles.map((article) => (
                  <tr key={article.id} className="hover:bg-[#F5EFEB]/50 dark:hover:bg-[#1C2422]/50">
                    <td className="p-4 font-bold max-w-xs truncate">{article.title}</td>
                    <td className="p-4 font-mono text-[11px] text-[#6B726F]">{article.slug}</td>
                    <td className="p-4">{article.authors?.display_name || "Elena Vance"}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(article.id, article.status)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                          article.status === "published"
                            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        {article.status === "published" ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="p-4 text-[#6B726F]">
                      {new Date(article.created_at || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/article/${article.slug}`}
                        target="_blank"
                        className="text-[#C86446] hover:underline font-semibold"
                      >
                        Preview
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Visual Menu Builder */}
      {activeTab === "menus" && (
        <div className="mt-6 rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-8 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                Live Dynamic Navigation Hierarchy
              </h3>
              <p className="text-xs text-[#6B726F] mt-1">
                Connected directly to the Supabase <code className="font-mono">menu_items</code> table. Changes reflect live on the website.
              </p>
            </div>
            <button
              onClick={() => {
                setNewMenuParentId(null);
                setIsAddingMenu(true);
              }}
              className="rounded-xl bg-[#C86446] hover:bg-[#B25235] px-4 py-2 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Add Root Menu Item
            </button>
          </div>

          {/* Add Menu Item Inline Modal */}
          {isAddingMenu && (
            <form
              onSubmit={handleAddMenu}
              className="mb-8 rounded-2xl border border-[#C86446]/40 bg-[#F5EFEB] p-4 dark:border-[#C86446]/40 dark:bg-[#1C2422]"
            >
              <h4 className="font-semibold text-xs text-[#C86446] uppercase tracking-wider mb-3">
                {newMenuParentId ? "Add Sub-Menu Link" : "Add Root Navigation Link"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  required
                  value={newMenuTitle}
                  onChange={(e) => setNewMenuTitle(e.target.value)}
                  placeholder="Menu Title (e.g. South America)"
                  className="rounded-xl border border-[#E8DFD5] bg-white px-3 py-2 text-xs text-[#1A1F1E] dark:border-[#283330] dark:bg-[#151B19] dark:text-[#F2EFE9]"
                />
                <input
                  type="text"
                  required
                  value={newMenuUrl}
                  onChange={(e) => setNewMenuUrl(e.target.value)}
                  placeholder="URL Path (e.g. /destinations/south-america)"
                  className="rounded-xl border border-[#E8DFD5] bg-white px-3 py-2 text-xs text-[#1A1F1E] dark:border-[#283330] dark:bg-[#151B19] dark:text-[#F2EFE9]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingMenu(false)}
                  className="px-3 py-1.5 text-xs text-[#6B726F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#C86446] px-4 py-1.5 text-xs font-semibold text-white"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {menus.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#E8DFD5] bg-[#F5EFEB]/60 p-4 dark:border-[#283330] dark:bg-[#1C2422]/60"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-[#C86446]" />
                    <span className="text-sm font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                      {item.title}
                    </span>
                    <span className="rounded-md bg-white dark:bg-[#151B19] px-2 py-0.5 text-[10px] font-mono text-[#6B726F]">
                      {item.href}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setNewMenuParentId(item.id);
                        setIsAddingMenu(true);
                      }}
                      className="text-xs text-[#C86446] hover:underline font-semibold"
                    >
                      + Add Sub-menu
                    </button>
                  </div>
                </div>

                {/* Submenu preview */}
                {item.children && item.children.length > 0 && (
                  <div className="mt-3 pl-6 border-l-2 border-[#C86446]/30 space-y-2">
                    {item.children.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between rounded-xl bg-white p-2.5 shadow-2xs dark:bg-[#151B19] border border-[#E8DFD5]/70 dark:border-[#283330] text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#1A1F1E] dark:text-[#F2EFE9]">
                            {sub.title}
                          </span>
                          <span className="text-[#6B726F] text-[10px] font-mono">{sub.href}</span>
                        </div>
                        <span className="text-[10px] text-[#6B726F]">
                          {sub.children ? `${sub.children.length} Nested links` : "Leaf Node"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Community Moderation */}
      {activeTab === "comments" && (
        <div className="mt-6 rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-8 shadow-sm dark:border-[#283330] dark:bg-[#151B19]">
          <h3 className="font-serif text-xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9] mb-4">
            Recent Reader Submissions ({comments.length})
          </h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-2xl border border-[#E8DFD5] p-5 dark:border-[#283330] bg-[#F5EFEB]/50 dark:bg-[#1C2422]/50 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
                      {comment.profiles?.full_name || comment.profiles?.username || "Explorer"}
                    </span>
                    <span className="text-[#6B726F]">
                      • On "{comment.articles?.title || "Article"}"
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${
                        comment.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : "bg-amber-500/10 text-amber-700"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-[#1A1F1E]/85 dark:text-[#F2EFE9]/85 leading-relaxed">
                    "{comment.content}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {comment.status !== "approved" && (
                    <button
                      onClick={() => handleModerateComment(comment.id, "approved")}
                      className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white"
                    >
                      Approve
                    </button>
                  )}
                  {comment.status !== "pending" && (
                    <button
                      onClick={() => handleModerateComment(comment.id, "pending")}
                      className="rounded-lg border border-[#E8DFD5] dark:border-[#283330] px-3 py-1 text-xs text-[#6B726F]"
                    >
                      Hide
                    </button>
                  )}
                  <button
                    onClick={() => handleModerateComment(comment.id, "delete")}
                    className="rounded-lg bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 text-xs font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
