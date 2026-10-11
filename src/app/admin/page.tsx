"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FEATURED_ARTICLES, NAVIGATION_MENU } from "@/data/mock-data";
import {
  Shield,
  FileText,
  Menu as MenuIcon,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "menus" | "comments">("articles");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Admin Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200/80 pb-6 dark:border-zinc-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Shield className="h-3.5 w-3.5" />
              Administrator Control Center
            </span>
          </div>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Editorial CMS & Content Manager
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-emerald-500 transition-colors">
            <Plus className="h-4 w-4" />
            New Article
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50">
            <ImageIcon className="h-4 w-4 text-emerald-600" />
            Media Storage
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Published Stories</span>
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {FEATURED_ARTICLES.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">All systems healthy</span>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Pending Comments</span>
            <MessageSquare className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            2
          </div>
          <span className="text-[11px] text-zinc-400 font-medium">Auto-moderation active</span>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Dynamic Menus</span>
            <Layers className="h-4 w-4 text-teal-600" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {NAVIGATION_MENU.length}
          </div>
          <span className="text-[11px] text-teal-600 font-medium">Database-driven hierarchy</span>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Newsletter Audience</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 font-serif text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            42,810
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">+142 this week</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-4 border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab("articles")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "articles"
              ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Articles Management
        </button>
        <button
          onClick={() => setActiveTab("menus")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "menus"
              ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Visual Menu Builder
        </button>
        <button
          onClick={() => setActiveTab("comments")}
          className={`pb-3 text-xs font-semibold uppercase tracking-wider transition-colors ${
            activeTab === "comments"
              ? "border-b-2 border-emerald-600 text-emerald-600 dark:text-emerald-400"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          Comment Moderation
        </button>
      </div>

      {/* Tab 1: Articles */}
      {activeTab === "articles" && (
        <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white overflow-hidden shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-850/50 text-zinc-500 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="p-4">Article Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                {FEATURED_ARTICLES.map((article) => (
                  <tr key={article.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-850/30">
                    <td className="p-4 font-semibold text-zinc-900 dark:text-zinc-100 max-w-xs truncate">
                      {article.title}
                    </td>
                    <td className="p-4">{article.category.name}</td>
                    <td className="p-4">{article.author.name}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <CheckCircle className="h-3 w-3" /> Published
                      </span>
                    </td>
                    <td className="p-4 text-zinc-500">{article.publishedAt}</td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/article/${article.slug}`}
                        className="text-emerald-600 hover:underline font-semibold"
                      >
                        Preview
                      </Link>
                      <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">
                        Edit
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
        <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Main Header Navigation Tree
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Database-driven multi-level navigation. Drag or reorder items and sub-menus.
              </p>
            </div>
            <button className="rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
              <Plus className="h-3.5 w-3.5" /> Add Root Menu Item
            </button>
          </div>

          <div className="space-y-3">
            {NAVIGATION_MENU.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-850"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Layers className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </span>
                    <span className="rounded-md bg-zinc-200/80 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                      {item.href}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <button className="text-emerald-600 hover:underline">+ Submenu</button>
                    <button className="text-zinc-500 hover:text-zinc-800">Edit</button>
                  </div>
                </div>

                {/* Submenu preview */}
                {item.children && (
                  <div className="mt-3 pl-6 border-l-2 border-emerald-500/30 space-y-2">
                    {item.children.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-xs dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                            {sub.title}
                          </span>
                          <span className="text-zinc-400 text-[10px]">{sub.href}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400">
                          {sub.children ? `${sub.children.length} Nested links` : "Leaf"}
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

      {/* Tab 3: Comments Moderation */}
      {activeTab === "comments" && (
        <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Recent Community Submissions
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">Sarah Jenkins</span>
                  <span className="text-zinc-400">• On "The Ultimate Guide to Swiss Alps"</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  "Did this exact traverse two seasons ago! Make sure to pack trekking poles; the scree descent after the col is no joke on the knees."
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="rounded-lg bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                  Approve
                </button>
                <button className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-300">
                  Hide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
