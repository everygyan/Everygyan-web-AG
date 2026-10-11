"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/types";
import { useTheme } from "@/components/theme-provider";
import {
  Compass,
  Search,
  Bookmark,
  Sun,
  Moon,
  Menu as MenuIcon,
  X,
  ChevronDown,
  ChevronRight,
  Shield,
  ArrowUpRight,
} from "lucide-react";

interface HeaderProps {
  menus: MenuItem[];
}

export function Header({ menus }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8DFD5] bg-[#FDFBF7]/90 backdrop-blur-md dark:border-[#283330] dark:bg-[#0E1211]/90 transition-colors">
      {/* Top Editorial Ribbon */}
      <div className="border-b border-[#E8DFD5]/60 bg-[#F5EFEB] dark:border-[#283330]/60 dark:bg-[#151B19] py-1.5 px-4 text-center text-[11px] uppercase tracking-widest text-[#6B726F] dark:text-[#95A39E]">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="hidden sm:inline">Dispatch No. 42 • Global Field Expeditions</span>
          <span className="mx-auto sm:mx-0 font-medium text-[#C86446] dark:text-[#E07858]">
            Autumn Field Reports Now Live
          </span>
          <span className="hidden md:inline">Curated for Thoughtful Explorers</span>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo with Editorial Serif Aesthetic */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1F1E] text-[#FDFBF7] dark:bg-[#F2EFE9] dark:text-[#0E1211] shadow-sm group-hover:scale-105 transition-transform">
              <Compass className="h-5 w-5 stroke-[1.8]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
                WANDER<span className="italic font-light text-[#C86446] dark:text-[#E07858]">LUST</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#6B726F] dark:text-[#95A39E] font-medium -mt-1">
                The Travel Journal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {menus.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#1A1F1E]/80 hover:text-[#C86446] dark:text-[#F2EFE9]/80 dark:hover:text-[#E07858] transition-colors rounded-lg"
                >
                  {item.title}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* Level 1 Luxury Dropdown */}
                {item.children && activeDropdown === item.id && (
                  <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] p-2 shadow-xl dark:border-[#283330] dark:bg-[#151B19]">
                      {item.children.map((subItem) => (
                        <div key={subItem.id} className="group/sub relative">
                          <Link
                            href={subItem.href}
                            className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#1A1F1E] hover:bg-[#F5EFEB] hover:text-[#C86446] dark:text-[#F2EFE9] dark:hover:bg-[#1C2422] dark:hover:text-[#E07858] transition-colors"
                          >
                            <span>{subItem.title}</span>
                            {subItem.children && (
                              <ChevronRight className="h-3.5 w-3.5 text-[#6B726F]" />
                            )}
                          </Link>

                          {/* Level 2 Submenu */}
                          {subItem.children && (
                            <div className="hidden group-hover/sub:block absolute left-full top-0 pl-2 w-60">
                              <div className="rounded-2xl border border-[#E8DFD5] bg-[#FFFFFF] p-2 shadow-xl dark:border-[#283330] dark:bg-[#151B19]">
                                {subItem.children.map((leaf) => (
                                  <Link
                                    key={leaf.id}
                                    href={leaf.href}
                                    className="block rounded-lg px-3 py-2 text-xs text-[#6B726F] hover:bg-[#F5EFEB] hover:text-[#C86446] dark:text-[#95A39E] dark:hover:bg-[#1C2422] dark:hover:text-[#E07858] transition-colors"
                                  >
                                    {leaf.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Right Action Icons: Search, Dark Mode, Bookmarks, Login & Admin Link */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            aria-label="Search articles"
            className="rounded-full p-2.5 text-[#1A1F1E] hover:bg-[#F5EFEB] dark:text-[#F2EFE9] dark:hover:bg-[#1C2422] transition-colors"
          >
            <Search className="h-4 w-4" />
          </Link>

          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="rounded-full p-2.5 text-[#1A1F1E] hover:bg-[#F5EFEB] dark:text-[#F2EFE9] dark:hover:bg-[#1C2422] transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-[#D4A373]" />
            ) : (
              <Moon className="h-4 w-4 text-[#1A1F1E]" />
            )}
          </button>

          <Link
            href="/user/bookmarks"
            aria-label="Saved Bookmarks"
            className="hidden sm:inline-flex rounded-full p-2.5 text-[#1A1F1E] hover:bg-[#F5EFEB] dark:text-[#F2EFE9] dark:hover:bg-[#1C2422] transition-colors"
          >
            <Bookmark className="h-4 w-4" />
          </Link>

          <Link
            href="/admin"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#C86446]/30 bg-[#C86446]/10 px-3.5 py-1.5 text-xs font-medium text-[#C86446] dark:text-[#E07858] hover:bg-[#C86446]/20 transition-all"
          >
            <Shield className="h-3.5 w-3.5" />
            <span>Admin</span>
          </Link>

          <Link
            href="/auth/login"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1A1F1E] px-4 py-2 text-xs font-semibold text-[#FDFBF7] shadow-sm hover:bg-[#C86446] dark:bg-[#F2EFE9] dark:text-[#0E1211] dark:hover:bg-[#E07858] transition-colors"
          >
            <span>Sign In</span>
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation drawer"
            className="lg:hidden rounded-lg p-2 text-[#1A1F1E] dark:text-[#F2EFE9] hover:bg-[#F5EFEB] dark:hover:bg-[#1C2422] transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#E8DFD5] dark:border-[#283330] bg-[#FDFBF7] dark:bg-[#0E1211] px-5 py-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {menus.map((item) => (
              <div key={item.id} className="border-b border-[#E8DFD5]/70 dark:border-[#283330] pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-1 text-sm font-semibold uppercase tracking-wider text-[#1A1F1E] dark:text-[#F2EFE9]"
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() =>
                        setExpandedMobileItem(
                          expandedMobileItem === item.id ? null : item.id
                        )
                      }
                      className="p-1 text-[#6B726F]"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedMobileItem === item.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.children && expandedMobileItem === item.id && (
                  <div className="pl-3 pt-2 space-y-2">
                    {item.children.map((sub) => (
                      <div key={sub.id}>
                        <Link
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1 text-xs font-semibold text-[#C86446] dark:text-[#E07858]"
                        >
                          {sub.title}
                        </Link>
                        {sub.children && (
                          <div className="pl-2 py-1 space-y-1">
                            {sub.children.map((leaf) => (
                              <Link
                                key={leaf.id}
                                href={leaf.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1 text-xs text-[#6B726F] dark:text-[#95A39E]"
                              >
                                {leaf.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-2">
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-[#E8DFD5] dark:border-[#283330] py-2.5 text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9]"
              >
                <Shield className="h-4 w-4 text-[#C86446]" />
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
