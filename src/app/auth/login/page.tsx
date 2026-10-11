"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Compass,
  Mail,
  Lock,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        // Sign In with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      } else {
        // Sign Up with Supabase Auth & create profile
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data?.user) {
          // Sync profile table
          await supabase.from("profiles").upsert({
            id: data.user.id,
            full_name: fullName,
            username: email.split("@")[0],
          });
        }

        setSuccessMsg(
          "Account registered! If confirmation is enabled, please check your email inbox to verify."
        );
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An authentication error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[#E8DFD5] bg-[#FFFFFF] p-8 shadow-xl dark:border-[#283330] dark:bg-[#151B19]">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1F1E] text-[#FDFBF7] dark:bg-[#F2EFE9] dark:text-[#0E1211] shadow-md">
            <Compass className="h-6 w-6 stroke-[1.8]" />
          </div>
          <h1 className="mt-4 font-serif text-2xl font-bold tracking-tight text-[#1A1F1E] dark:text-[#F2EFE9]">
            {isLogin ? "Welcome Back to WANDERLUST" : "Create Explorer Account"}
          </h1>
          <p className="mt-2 text-xs text-[#6B726F] dark:text-[#95A39E]">
            {isLogin
              ? "Sign in to save articles, join discussions, and manage your preferences."
              : "Register to bookmark high-altitude routes and participate in discussions."}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 rounded-2xl bg-red-500/10 border border-red-500/30 p-3.5 flex items-center gap-2.5 text-xs text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 flex items-center gap-2.5 text-xs text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-[#6B726F]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Elena Vance"
                  className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] pl-10 pr-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#6B726F]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="explorer@wanderlust.com"
                className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] pl-10 pr-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1F1E] dark:text-[#F2EFE9] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#6B726F]" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#E8DFD5] bg-[#F5EFEB] pl-10 pr-4 py-2.5 text-xs text-[#1A1F1E] focus:border-[#C86446] focus:bg-white focus:outline-none dark:border-[#283330] dark:bg-[#1C2422] dark:text-[#F2EFE9]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#C86446] hover:bg-[#B25235] disabled:opacity-50 py-3 text-xs font-semibold text-white shadow-md shadow-[#C86446]/20 transition-all flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isLogin ? (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Register Account
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-[#E8DFD5]/70 pt-5 dark:border-[#283330] text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
            className="text-xs font-medium text-[#C86446] dark:text-[#E07858] hover:underline"
          >
            {isLogin
              ? "Don't have an account yet? Register here"
              : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#6B726F] dark:text-[#95A39E]">
          <ShieldCheck className="h-3.5 w-3.5 text-[#C86446]" />
          <span>Secured with Live Supabase Auth & PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}
