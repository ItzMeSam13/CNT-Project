"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { createUser } from "@/lib/api";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const ensureUserDoc = async (uid: string, userEmail: string) => {
    try {
      await createUser(uid, userEmail);
    } catch {
      // User doc creation failed — non-critical, dashboard will handle
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await ensureUserDoc(cred.user.uid, email);
      router.push("/dashboard");
    } catch (signInError: unknown) {
      const fbErr = signInError as { code?: string };

      if (
        fbErr.code === "auth/user-not-found" ||
        fbErr.code === "auth/invalid-credential"
      ) {
        try {
          const cred = await createUserWithEmailAndPassword(auth, email, password);
          await ensureUserDoc(cred.user.uid, email);
          router.push("/dashboard");
        } catch (signUpError: unknown) {
          const fbSignUp = signUpError as { code?: string };
          if (fbSignUp.code === "auth/email-already-in-use") {
            setError("Incorrect password. Please try again.");
          } else if (fbSignUp.code === "auth/weak-password") {
            setError("Password must be at least 6 characters.");
          } else if (fbSignUp.code === "auth/invalid-email") {
            setError("Please enter a valid email address.");
          } else {
            setError("Something went wrong. Please try again.");
          }
        }
      } else if (fbErr.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else if (fbErr.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (fbErr.code === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#00C896]/30 border-t-[#00C896] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="font-['DM_Sans'] bg-[#080B14] text-[#E8EAF0] min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 80%)"}} />
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[500px] h-[500px] -top-[15%] left-1/2 -translate-x-1/2" style={{background:"radial-gradient(circle, rgba(0,200,150,0.1) 0%, transparent 70%)"}} />
      <div className="absolute rounded-full blur-[80px] pointer-events-none w-[350px] h-[350px] -bottom-[10%] -right-[5%]" style={{background:"radial-gradient(circle, rgba(123,97,255,0.08) 0%, transparent 70%)"}} />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[440px] px-5 animate-[fadeUp_0.6s_ease_forwards]">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8892A4] hover:text-[#E8EAF0] transition-colors no-underline">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to home
          </Link>
        </div>

        <div className="bg-white/[0.025] border border-white/[0.07] rounded-2xl p-10 backdrop-blur-xl">
          {/* Logo + Title */}
          <div className="flex flex-col items-center mb-9">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#00C896] to-[#7B61FF] flex items-center justify-center text-xl font-bold mb-5 shadow-[0_8px_32px_rgba(0,200,150,0.2)]">₿</div>
            <h1 className="font-['Syne'] text-[28px] font-bold tracking-tight text-center mb-2">Welcome to VaultIQ</h1>
            <p className="text-sm text-[#8892A4] text-center">Sign in to your account or create a new one</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#FF6B6B]/[0.08] border border-[#FF6B6B]/20 text-[#FF6B6B] px-4 py-3 rounded-xl text-sm font-medium mb-5 animate-[fadeUp_0.3s_ease_forwards]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="auth-email" className="block text-xs font-medium text-[#8892A4] mb-2 tracking-wide">Email address</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E8EAF0] text-sm outline-none transition-all placeholder:text-[#4A5568] focus:border-[#00C896]/50 focus:bg-[#00C896]/[0.03] focus:shadow-[0_0_0_3px_rgba(0,200,150,0.08)]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="auth-password" className="block text-xs font-medium text-[#8892A4] mb-2 tracking-wide">Password</label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-16 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E8EAF0] text-sm outline-none transition-all placeholder:text-[#4A5568] focus:border-[#00C896]/50 focus:bg-[#00C896]/[0.03] focus:shadow-[0_0_0_3px_rgba(0,200,150,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-0 text-[#4A5568] hover:text-[#8892A4] text-xs font-medium cursor-pointer p-1 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-sm font-semibold border-0 cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-[0_8px_32px_rgba(0,200,150,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2.5">
                  <span className="w-4 h-4 border-2 border-[#080B14]/30 border-t-[#080B14] rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Continue →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-[#4A5568] font-medium uppercase tracking-widest">Privacy First</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Trust badges */}
          <div className="flex justify-center gap-5 flex-wrap">
            {[
              { icon: "🔐", text: "OU Encrypted" },
              { icon: "🛡️", text: "Zero Knowledge" },
              { icon: "⚡", text: "Instant Access" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs text-[#4A5568] font-medium">
                <span className="text-sm">{b.icon}</span>{b.text}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[#4A5568] mt-6 leading-relaxed">
          Your data is encrypted using the{" "}
          <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-[#00C896] no-underline font-medium">
            Okamoto–Uchiyama cryptosystem
          </a>
        </p>
      </div>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </main>
  );
}
