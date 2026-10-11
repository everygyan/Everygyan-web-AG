"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { User, Mail, ShieldCheck, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);
      setFullName(user.user_metadata?.full_name || "");

      // Fetch from profiles table
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        if (profile.full_name) setFullName(profile.full_name);
        if (profile.username) setUsername(profile.username);
        if (profile.bio) setBio(profile.bio);
      } else {
        setUsername(user.email?.split("@")[0] || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullName,
        username: username,
        bio: bio,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setStatusMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err: any) {
      setStatusMsg({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-xs text-[#6B726F]">
        <Loader2 className="h-8 w-8 animate-spin text-[#C86446] mb-3" />
        <span>Loading your profile...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <div className="rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-8 sm:p-10 shadow-xl dark:border-[#283330] dark:bg-[#151B19]">
        <div className="text-center mb-8 border-b border-[#E8DFD5]/70 pb-6 dark:border-[#283330]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1F1E] text-white text-2xl font-serif font-bold shadow-md">
            {fullName ? fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
          </div>
          <h1 className="mt-4 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
            Explorer Profile
          </h1>
          <p className="mt-1 text-xs text-[#6B726F] dark:text-[#95A39E]">{user.email}</p>
        </div>

        {statusMsg && (
          <div
            className={`mb-6 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs ${
              statusMsg.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                : "bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Elena Vance"
              required
              className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1.5">
              Explorer Handle / Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="elenavance"
              required
              className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1.5">
              Bio / Field Specialization
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="High-elevation trekker, landscape photographer, and coffee enthusiast..."
              className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] px-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
            />
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-[#C86446] hover:bg-[#B25235] disabled:opacity-50 py-3 text-xs font-semibold text-white shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] hover:bg-zinc-200 py-3 px-5 text-xs font-semibold text-[#1A1F1E] dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9] transition-all"
            >
              Sign Out
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-[#E8DFD5]/70 pt-6 dark:border-[#283330] flex items-center justify-between text-xs">
          <Link
            href="/user/bookmarks"
            className="text-[#C86446] dark:text-[#E07858] hover:underline font-semibold"
          >
            View My Saved Articles →
          </Link>
          <span className="text-[11px] text-[#6B726F] dark:text-[#95A39E]">
            Supabase Auth Verified
          </span>
        </div>
      </div>
    </div>
  );
}
