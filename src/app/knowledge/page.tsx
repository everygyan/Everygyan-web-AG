import React from "react";
import Link from "next/link";
import { getPublishedArticles } from "@/lib/supabase/api";
import { ArticleCard } from "@/components/articles/article-card";
import { BookOpen, Camera, Laptop, Compass } from "lucide-react";

export default async function KnowledgeLandingPage() {
  const articles = await getPublishedArticles();

  const hubs = [
    {
      title: "Expedition Photography",
      slug: "photography",
      desc: "Minimalist full-frame kits, versatile zooms, ND filters, and backcountry workflows.",
      icon: Camera,
    },
    {
      title: "Digital Nomad Frameworks",
      slug: "digital-nomad",
      desc: "Remote work logistics, tax treaties, satellite Wi-Fi, and global housing breakdown.",
      icon: Laptop,
    },
    {
      title: "Ultralight Packing",
      slug: "packing",
      desc: "Layering masterclasses for high-altitude zones above 2,500m.",
      icon: BookOpen,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-3xl mb-12 border-b border-[#E8DFD5] pb-8 dark:border-[#283330]">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#C86446]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#C86446] dark:text-[#E07858] mb-3">
          <Compass className="h-3 w-3" /> Field Intelligence
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
          Field Knowledge & Masterclasses
        </h1>
        <p className="mt-3 text-sm text-[#6B726F] dark:text-[#95A39E] max-w-xl">
          Practical frameworks, expedition photography kits, and remote living blueprints tested in demanding real-world conditions.
        </p>
      </div>

      {/* Topics Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {hubs.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.slug}
              href={`/knowledge/${hub.slug}`}
              className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-8 shadow-sm hover:shadow-xl dark:border-[#283330] dark:bg-[#151B19] transition-all group"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5EFEB] dark:bg-[#1C2422] text-[#C86446] group-hover:scale-105 transition-transform mb-6">
                <Icon className="h-6 w-6 stroke-[1.8]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1A1F1E] group-hover:text-[#C86446] dark:text-[#F2EFE9] transition-colors">
                {hub.title}
              </h3>
              <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E] leading-relaxed">
                {hub.desc}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Related Guides Grid */}
      <section className="pt-6 border-t border-[#E8DFD5] dark:border-[#283330]">
        <div className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#1A1F1E] dark:text-[#F2EFE9]">
            All Knowledge Guides ({articles.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
