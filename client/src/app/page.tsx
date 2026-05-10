"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const STATS = [
  { label: "Community Members", value: "2,847", suffix: "" },
  { label: "Encrypted Transactions", value: "1.2M", suffix: "+" },
  { label: "Privacy Preserved", value: "100", suffix: "%" },
  { label: "Avg. Monthly Savings", value: "₹18,400", suffix: "" },
];

const FEATURES = [
  {
    icon: "🔐",
    title: "Zero Knowledge Analytics",
    desc: "Your financial data is encrypted using the Okamoto–Uchiyama cryptosystem before it ever leaves your device. No one — not even us — sees your raw numbers.",
  },
  {
    icon: "➕",
    title: "Homomorphic Aggregation",
    desc: "Community insights are computed directly on encrypted data. We add ciphertexts together, decrypt only the sum — individual values are mathematically invisible.",
  },
  {
    icon: "📊",
    title: "Real Budgeting Tools",
    desc: "Track expenses by category, monitor savings ratios, and view monthly trends — all the power of a modern finance app with cryptographic privacy built in.",
  },
  {
    icon: "🌐",
    title: "Community Benchmarks",
    desc: "Compare your spending habits against anonymized community averages. Know if you're saving more than your peers without exposing anyone's data.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "You Add an Expense",
    desc: "Enter your spending like any normal app. The backend encrypts it immediately using the shared OU public key.",
    color: "#8B5CF6",
  },
  {
    step: "02",
    title: "Encrypted Storage",
    desc: "Only the ciphertext is stored for community analytics. A local plaintext copy powers your personal dashboard.",
    color: "#06D6A0",
  },
  {
    step: "03",
    title: "Homomorphic Addition",
    desc: "Enc(5000) × Enc(7000) = Enc(12000). Aggregation happens on ciphertexts — no decryption needed mid-process.",
    color: "#F472B6",
  },
  {
    step: "04",
    title: "Decrypted Aggregate",
    desc: "Only the final community total is decrypted. Individual contributions remain permanently hidden inside the math.",
    color: "#FBBF24",
  },
];

const TRUST_ITEMS = [
  { icon: "🛡️", title: "Bank-Grade Privacy", desc: "Your data is mathematically impossible to extract from aggregated ciphertexts." },
  { icon: "⚡", title: "Real-Time Insights", desc: "Category-wise trends and savings ratios update instantly as you log expenses." },
  { icon: "🔗", title: "Open Architecture", desc: "Transparent cryptographic pipeline — inspect exactly how your data is handled." },
];

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="font-['Inter'] bg-[#060918] text-[#E2E8F0] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 h-16 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrollY > 40 ? "rgba(6,9,24,0.85)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(24px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrollY > 40 ? "blur(24px) saturate(1.4)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(139,92,246,0.15)" : "none",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06D6A0] flex items-center justify-center text-xs font-black text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">V</div>
          <span className="font-['Outfit'] font-bold text-[17px] text-white tracking-tight">VaultIQ</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#how" className="text-[13px] font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 no-underline">How It Works</a>
          <a href="#features" className="text-[13px] font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 no-underline">Features</a>
          <a href="#community" className="text-[13px] font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 no-underline">Community</a>
          <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-[13px] font-medium text-[#94A3B8] hover:text-white transition-colors duration-300 no-underline">About OU</a>
        </div>
        <Link href="/auth" className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[13px] font-semibold no-underline hover:shadow-[0_8px_32px_rgba(139,92,246,0.5)] hover:translate-y-[-1px] transition-all duration-300">
          Sign In
        </Link>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-28 pb-20 text-center overflow-hidden">

        {/* BIG morphing blob - very visible */}
        <div className="absolute top-[5%] right-[5%] w-[400px] h-[400px] pointer-events-none animate-[morph-blob_16s_ease-in-out_infinite] opacity-[0.15]" style={{background:"linear-gradient(135deg, #8B5CF6, #06D6A0, #F472B6)"}} />
        <div className="absolute bottom-[5%] left-[0%] w-[350px] h-[350px] pointer-events-none animate-[morph-blob_20s_ease-in-out_infinite_3s] opacity-[0.1]" style={{background:"linear-gradient(225deg, #06D6A0, #8B5CF6)"}} />

        {/* Big floating hexagons */}
        <svg className="absolute top-[12%] left-[5%] w-32 h-32 pointer-events-none animate-[hex-float_12s_ease-in-out_infinite] text-[#8B5CF6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/></svg>
        <svg className="absolute top-[50%] right-[3%] w-24 h-24 pointer-events-none animate-[hex-float_16s_ease-in-out_infinite_2s] text-[#06D6A0]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15"/></svg>
        <svg className="absolute bottom-[15%] left-[10%] w-20 h-20 pointer-events-none animate-[hex-float_20s_ease-in-out_infinite_4s] text-[#F472B6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.15"/></svg>
        <svg className="absolute top-[30%] right-[20%] w-16 h-16 pointer-events-none animate-[hex-float_14s_ease-in-out_infinite_1s] text-[#FBBF24]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/></svg>
        <svg className="absolute bottom-[35%] right-[35%] w-12 h-12 pointer-events-none animate-[hex-float_18s_ease-in-out_infinite_5s] text-[#8B5CF6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="currentColor" opacity="0.06"/></svg>

        {/* Orbiting ring - larger, more visible */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] pointer-events-none hidden md:block">
          <div className="absolute inset-0 rounded-full border border-[#8B5CF6]/[0.08]" />
          <div className="absolute inset-[60px] rounded-full border border-[#06D6A0]/[0.06]" />
          <div className="absolute w-3 h-3 bg-[#8B5CF6] rounded-full shadow-[0_0_20px_rgba(139,92,246,0.6)] animate-[orbit_18s_linear_infinite]" style={{top:"50%",left:"50%"}} />
          <div className="absolute w-2 h-2 bg-[#06D6A0] rounded-full shadow-[0_0_16px_rgba(6,214,160,0.5)] animate-[orbit-reverse_14s_linear_infinite]" style={{top:"50%",left:"50%"}} />
        </div>

        {/* Glowing dots - bigger */}
        <div className="absolute top-[38%] left-[18%] w-2 h-2 bg-[#A78BFA] rounded-full animate-[float-slow_7s_ease-in-out_infinite] opacity-40 shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
        <div className="absolute top-[25%] right-[15%] w-2.5 h-2.5 bg-[#06D6A0] rounded-full animate-[float-reverse_9s_ease-in-out_infinite] opacity-30 shadow-[0_0_8px_rgba(6,214,160,0.3)]" />
        <div className="absolute bottom-[25%] right-[22%] w-2 h-2 bg-[#F472B6] rounded-full animate-[float-slow_11s_ease-in-out_infinite_2s] opacity-35 shadow-[0_0_8px_rgba(244,114,182,0.3)]" />
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 bg-[#FBBF24] rounded-full animate-[float-reverse_13s_ease-in-out_infinite_1s] opacity-25 shadow-[0_0_6px_rgba(251,191,36,0.3)]" />

        <div className="relative z-10 max-w-[880px]">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-[fadeUp_0.7s_ease_0.1s_forwards] opacity-0">
            <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/[0.08] border border-[#8B5CF6]/20 text-[#A78BFA] px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full animate-pulse" />
              Powered by Okamoto–Uchiyama Cryptosystem
            </div>
          </div>

          <h1 className="font-['Outfit'] text-[clamp(40px,7.5vw,76px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 animate-[fadeUp_0.7s_ease_0.2s_forwards] opacity-0">
            Your finances,{" "}
            <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#06D6A0] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_6s_ease_infinite]">encrypted.</span>
            <br />
            Community insights,{" "}
            <span className="text-[#06D6A0]">unlocked.</span>
          </h1>

          <p className="text-[17px] font-light text-[#94A3B8] leading-[1.7] max-w-[600px] mx-auto mb-12 animate-[fadeUp_0.7s_ease_0.35s_forwards] opacity-0">
            A privacy-preserving budgeting platform where your spending data is homomorphically encrypted — we compute community analytics without ever seeing your numbers.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_0.7s_ease_0.5s_forwards] opacity-0">
            <Link href="/auth" className="group px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-[15px] font-semibold no-underline hover:shadow-[0_16px_48px_rgba(139,92,246,0.4)] hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-2">
              Get Started
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <a href="#how" className="px-8 py-3.5 rounded-2xl border border-[#8B5CF6]/25 text-[#A78BFA] text-[15px] font-semibold no-underline hover:bg-[#8B5CF6]/[0.06] hover:border-[#8B5CF6]/40 transition-all duration-300">
              See How It Works
            </a>
          </div>

          <p className="mt-8 text-xs text-[#475569] tracking-wider font-medium">
            No plaintext stored in community DB · Probabilistic encryption · Open architecture
          </p>
        </div>

        {/* Code block */}
        <div className="relative z-10 mt-16 max-w-[580px] w-full animate-[float_7s_ease-in-out_infinite]">
          <div className="relative bg-[#0F1629]/80 border border-[#8B5CF6]/15 rounded-2xl p-6 font-mono text-[13px] leading-[1.9] text-left backdrop-blur-md shadow-[0_8px_40px_rgba(139,92,246,0.08)]">
            {/* Terminal dots */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-[11px] text-[#475569] font-sans">ou_aggregation.py</span>
            </div>
            <div className="text-[#475569]"># Community aggregation — no plaintext exposed</div>
            <div><span className="text-[#A78BFA]">user_a </span><span>= </span><span className="text-[#06D6A0]">Enc</span>(food=<span className="text-[#06D6A0]">2000</span>)</div>
            <div><span className="text-[#A78BFA]">user_b </span><span>= </span><span className="text-[#06D6A0]">Enc</span>(food=<span className="text-[#06D6A0]">3500</span>)</div>
            <div className="mt-2 text-[#475569]"># Homomorphic addition (ciphertext multiplication)</div>
            <div><span className="text-[#A78BFA]">aggregate </span>= user_a <span className="text-[#F472B6]">×</span> user_b</div>
            <div className="mt-2 text-[#475569]"># Only the sum is ever decrypted</div>
            <div><span className="text-[#A78BFA]">Dec</span>(aggregate) → <span className="text-[#FBBF24]">5500</span> <span className="text-[#475569]"># ✓ privacy preserved</span></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="community" className="py-24 px-5 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#06D6A0]/[0.08] border border-[#06D6A0]/20 text-[#06D6A0] px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 bg-[#06D6A0] rounded-full animate-pulse" />
            Live Community Stats
          </div>
          <h2 className="font-['Outfit'] text-[clamp(28px,4vw,42px)] font-bold tracking-tight">
            Real numbers. <span className="text-[#06D6A0]">Zero exposure.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass-card glow-border group rounded-2xl p-7 text-center cursor-default hover:scale-[1.03]">
              <div className="font-['Outfit'] text-[clamp(28px,3vw,40px)] font-bold bg-gradient-to-r from-[#8B5CF6] to-[#06D6A0] bg-clip-text text-transparent tracking-tight leading-none mb-2">
                {s.value}<span className="text-[0.6em]">{s.suffix}</span>
              </div>
              <div className="text-sm text-[#94A3B8] group-hover:text-[#CBD5E1] transition-colors duration-300">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-5 relative">
        {/* Bg decor */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/[0.02] via-transparent to-transparent pointer-events-none" />
        <svg className="absolute top-[10%] right-[5%] w-24 h-24 pointer-events-none animate-[hex-float_25s_ease-in-out_infinite] text-[#8B5CF6]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/></svg>
        <svg className="absolute bottom-[8%] left-[3%] w-20 h-20 pointer-events-none animate-[hex-float_20s_ease-in-out_infinite_3s] text-[#06D6A0]" viewBox="0 0 100 100"><polygon points="50,2 95,25 95,75 50,98 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.1"/></svg>
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <p className="text-[#8B5CF6] text-xs font-bold tracking-[0.15em] uppercase mb-3">The OU Flow</p>
            <h2 className="font-['Outfit'] text-[clamp(28px,4vw,42px)] font-bold tracking-tight">How your privacy is preserved</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="glass-card glow-border group rounded-2xl p-7 cursor-default" style={{animationDelay:`${i*0.1}s`}}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_24px_var(--step-glow)]" style={{background:`${step.color}18`,border:`1px solid ${step.color}30`,"--step-glow":`${step.color}40`} as React.CSSProperties}>
                  <span className="font-['Outfit'] text-sm font-bold" style={{color:step.color}}>{step.step}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-3 leading-tight">{step.title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#06D6A0] text-xs font-bold tracking-[0.15em] uppercase mb-3">Built Different</p>
            <h2 className="font-['Outfit'] text-[clamp(28px,4vw,42px)] font-bold tracking-tight max-w-[500px] mx-auto">Finance meets cryptography</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass-card glow-border group rounded-2xl p-8 cursor-default">
                <div className="text-3xl mb-5 w-14 h-14 rounded-2xl bg-[#8B5CF6]/[0.1] border border-[#8B5CF6]/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-[#8B5CF6]/[0.15] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]">{f.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight group-hover:text-[#A78BFA] transition-colors duration-300">{f.title}</h3>
                <p className="text-[14px] text-[#94A3B8] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-24 px-5">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#F472B6] text-xs font-bold tracking-[0.15em] uppercase mb-3">Why VaultIQ</p>
            <h2 className="font-['Outfit'] text-[clamp(28px,4vw,42px)] font-bold tracking-tight">Built for trust, designed for you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="glass-card glow-border group rounded-2xl p-7 text-center cursor-default">
                <div className="text-4xl mb-5 transition-transform duration-500 group-hover:scale-110">{item.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-[#F472B6] transition-colors duration-300">{item.title}</h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 px-5">
        <div className="max-w-[900px] mx-auto relative overflow-hidden rounded-3xl">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/20 via-[#06D6A0]/10 to-[#F472B6]/15 rounded-3xl" />
          <div className="relative m-[1px] bg-[#0F1629] rounded-[23px] p-14 md:p-20 text-center">
            {/* Inner glow */}
            <div className="absolute rounded-full blur-[100px] pointer-events-none w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{background:"radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)"}} />
            <div className="relative z-10">
              <h2 className="font-['Outfit'] text-[clamp(28px,5vw,50px)] font-extrabold tracking-tight mb-5 leading-tight">
                Track smarter.<br/>
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#06D6A0] bg-clip-text text-transparent">Stay private.</span>
              </h2>
              <p className="text-base text-[#94A3B8] max-w-[440px] mx-auto mb-10 leading-relaxed">
                Join 2,847 users who manage their finances with mathematical privacy guarantees.
              </p>
              <Link href="/auth" className="inline-flex items-center gap-2 px-9 py-4 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-base font-semibold no-underline hover:shadow-[0_16px_48px_rgba(139,92,246,0.4)] hover:translate-y-[-2px] transition-all duration-300">
                Get Started <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1E293B] py-10 px-5 max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06D6A0] flex items-center justify-center text-[10px] font-black text-white">V</div>
          <span className="font-['Outfit'] font-bold text-sm text-white">VaultIQ</span>
          <span className="text-[#475569] text-xs ml-2">CNT Academic Project · OU Cryptosystem</span>
        </div>
        <div className="flex gap-6">
          <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-[#94A3B8] text-xs no-underline hover:text-white transition-colors duration-300">About OU</a>
          <Link href="/auth" className="text-[#94A3B8] text-xs no-underline hover:text-white transition-colors duration-300">Sign In</Link>
        </div>
      </footer>
    </main>
  );
}
