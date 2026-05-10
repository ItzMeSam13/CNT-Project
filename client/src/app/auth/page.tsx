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
      <main className="min-h-screen bg-[#060918] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#8B5CF6]/30 border-t-[#8B5CF6] rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="font-['Inter'] bg-[#060918] text-[#E2E8F0] min-h-screen flex">

      {/* LEFT PANEL — Branding / Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F1629] via-[#060918] to-[#0F1629]" />

        {/* Animated orbs - BIG and visible */}
        <div className="absolute rounded-full blur-[100px] pointer-events-none w-[500px] h-[500px] -top-[10%] -left-[10%] animate-[float-slow_14s_ease-in-out_infinite]" style={{background:"radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)"}} />
        <div className="absolute rounded-full blur-[80px] pointer-events-none w-[400px] h-[400px] bottom-[0%] right-[-5%] animate-[float-reverse_16s_ease-in-out_infinite]" style={{background:"radial-gradient(circle, rgba(6,214,160,0.18) 0%, transparent 70%)"}} />

        {/* Morphing blob - visible */}
        <div className="absolute top-[10%] right-[10%] w-[280px] h-[280px] pointer-events-none animate-[morph-blob_16s_ease-in-out_infinite] opacity-[0.15]" style={{background:"linear-gradient(135deg, #8B5CF6, #06D6A0, #F472B6)"}} />
        <div className="absolute bottom-[10%] left-[5%] w-[200px] h-[200px] pointer-events-none animate-[morph-blob_22s_ease-in-out_infinite_5s] opacity-[0.1]" style={{background:"linear-gradient(225deg, #06D6A0, #8B5CF6)"}} />

        {/* Big floating hexagons */}
        <svg className="absolute top-[15%] left-[8%] w-28 h-28 pointer-events-none animate-[hex-float_14s_ease-in-out_infinite] text-[#8B5CF6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18"/></svg>
        <svg className="absolute bottom-[20%] right-[6%] w-20 h-20 pointer-events-none animate-[hex-float_18s_ease-in-out_infinite_2s] text-[#06D6A0]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.14"/></svg>
        <svg className="absolute top-[55%] left-[15%] w-16 h-16 pointer-events-none animate-[hex-float_22s_ease-in-out_infinite_4s] text-[#F472B6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/></svg>

        {/* Orbiting ring */}
        <div className="absolute top-[30%] left-[40%] w-[250px] h-[250px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/[0.1]" />
          <div className="absolute w-2 h-2 bg-[#8B5CF6] rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)] animate-[orbit_18s_linear_infinite]" style={{top:"50%",left:"50%"}} />
        </div>

        {/* Glowing dots */}
        <div className="absolute top-[45%] left-[30%] w-2.5 h-2.5 bg-[#A78BFA] rounded-full animate-[float-slow_8s_ease-in-out_infinite] opacity-40 shadow-[0_0_10px_rgba(167,139,250,0.4)]" />
        <div className="absolute top-[55%] right-[28%] w-2 h-2 bg-[#06D6A0] rounded-full animate-[float-reverse_10s_ease-in-out_infinite] opacity-35 shadow-[0_0_8px_rgba(6,214,160,0.3)]" />
        <div className="absolute bottom-[30%] left-[48%] w-2 h-2 bg-[#F472B6] rounded-full animate-[float-slow_12s_ease-in-out_infinite_2s] opacity-30 shadow-[0_0_8px_rgba(244,114,182,0.3)]" />

        {/* Content */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06D6A0] flex items-center justify-center text-sm font-black text-white shadow-[0_0_24px_rgba(139,92,246,0.3)]">V</div>
            <span className="font-['Outfit'] font-bold text-lg text-white tracking-tight">VaultIQ</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-[420px]">
          <h2 className="font-['Outfit'] text-[40px] font-extrabold leading-[1.1] tracking-tight mb-5">
            Your data.{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#06D6A0] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]">
              Encrypted.
            </span>
            <br/>
            Always.
          </h2>
          <p className="text-[15px] text-[#94A3B8] leading-[1.7] mb-8">
            VaultIQ uses the Okamoto–Uchiyama homomorphic cryptosystem to ensure your financial data stays private — even from us.
          </p>

          {/* Visual code block */}
          <div className="bg-[#060918]/80 border border-[#1E293B] rounded-2xl p-5 font-mono text-[12px] leading-[1.9] backdrop-blur-md">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-2 text-[10px] text-[#475569] font-sans">encryption_flow.py</span>
            </div>
            <div className="text-[#475569]"># Your expense → encrypted</div>
            <div><span className="text-[#A78BFA]">amount</span> = <span className="text-[#06D6A0]">5000</span></div>
            <div><span className="text-[#A78BFA]">cipher</span> = <span className="text-[#06D6A0]">OU.encrypt</span>(amount, <span className="text-[#FBBF24]">pub_key</span>)</div>
            <div className="mt-1 text-[#475569]"># → 8f3a...c7d2 (no one sees 5000)</div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {[
            { val: "2,847", label: "Users" },
            { val: "1.2M+", label: "Encrypted" },
            { val: "100%", label: "Private" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-['Outfit'] text-lg font-bold bg-gradient-to-r from-[#8B5CF6] to-[#06D6A0] bg-clip-text text-transparent">{s.val}</div>
              <div className="text-[11px] text-[#475569] font-medium uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-hidden px-5 py-12">
        {/* Subtle background */}
        <div className="absolute rounded-full blur-[100px] pointer-events-none w-[400px] h-[400px] -top-[15%] right-[-10%]" style={{background:"radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)"}} />
        <div className="absolute rounded-full blur-[80px] pointer-events-none w-[300px] h-[300px] bottom-[-10%] left-[-5%]" style={{background:"radial-gradient(circle, rgba(6,214,160,0.06) 0%, transparent 70%)"}} />

        <div className="w-full max-w-[420px] animate-[fadeUp_0.6s_ease_forwards]">
          {/* Mobile-only back link and logo */}
          <div className="lg:hidden mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 no-underline mb-6">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to home
            </Link>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06D6A0] flex items-center justify-center text-sm font-black text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]">V</div>
              <span className="font-['Outfit'] font-bold text-lg text-white tracking-tight">VaultIQ</span>
            </div>
          </div>

          {/* Form header */}
          <div className="mb-8">
            <h1 className="font-['Outfit'] text-[30px] font-bold tracking-tight text-white mb-2">Welcome back</h1>
            <p className="text-[15px] text-[#94A3B8]">Sign in to your account or create a new one</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-[#F472B6]/[0.08] border border-[#F472B6]/20 text-[#F472B6] px-4 py-3 rounded-xl text-sm font-medium mb-5 animate-[fadeUp_0.3s_ease_forwards]">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="auth-email" className="block text-[13px] font-semibold text-[#94A3B8] mb-2 tracking-wide">Email address</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-[#0F1629] border border-[#1E293B] text-white text-sm outline-none transition-all duration-300 placeholder:text-[#475569] focus:border-[#8B5CF6]/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08),0_0_20px_rgba(139,92,246,0.06)]"
              />
            </div>

            <div>
              <label htmlFor="auth-password" className="block text-[13px] font-semibold text-[#94A3B8] mb-2 tracking-wide">Password</label>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3.5 pr-16 rounded-xl bg-[#0F1629] border border-[#1E293B] text-white text-sm outline-none transition-all duration-300 placeholder:text-[#475569] focus:border-[#8B5CF6]/50 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08),0_0_20px_rgba(139,92,246,0.06)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-0 text-[#475569] hover:text-[#A78BFA] text-xs font-semibold cursor-pointer p-1 transition-colors duration-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[15px] font-semibold border-0 cursor-pointer transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_16px_48px_rgba(139,92,246,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2.5">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Continue →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#1E293B]" />
            <span className="text-[11px] text-[#475569] font-semibold uppercase tracking-widest">Secured by OU</span>
            <div className="flex-1 h-px bg-[#1E293B]" />
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🔐", title: "Encrypted", desc: "OU Cryptosystem" },
              { icon: "🛡️", title: "Private", desc: "Zero Knowledge" },
              { icon: "⚡", title: "Instant", desc: "Quick Access" },
            ].map((b) => (
              <div key={b.title} className="bg-[#0F1629]/60 border border-[#1E293B] rounded-xl p-3 text-center transition-all duration-300 hover:border-[#8B5CF6]/20">
                <div className="text-xl mb-1">{b.icon}</div>
                <div className="text-[11px] font-semibold text-[#CBD5E1]">{b.title}</div>
                <div className="text-[10px] text-[#475569]">{b.desc}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#475569] mt-6 leading-relaxed">
            Your data is encrypted using the{" "}
            <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-[#8B5CF6] no-underline font-medium hover:text-[#A78BFA] transition-colors duration-300">
              Okamoto–Uchiyama cryptosystem
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
