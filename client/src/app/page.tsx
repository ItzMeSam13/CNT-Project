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
    color: "#00C896",
  },
  {
    step: "02",
    title: "Encrypted Storage",
    desc: "Only the ciphertext is stored for community analytics. A local plaintext copy powers your personal dashboard.",
    color: "#7B61FF",
  },
  {
    step: "03",
    title: "Homomorphic Addition",
    desc: "Enc(5000) × Enc(7000) = Enc(12000). Aggregation happens on ciphertexts — no decryption needed mid-process.",
    color: "#FF6B6B",
  },
  {
    step: "04",
    title: "Decrypted Aggregate",
    desc: "Only the final community total is decrypted. Individual contributions remain permanently hidden inside the math.",
    color: "#FFB347",
  },
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
    <main className="font-['DM_Sans'] bg-[#080B14] text-[#E8EAF0] min-h-screen overflow-x-hidden">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]" style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundRepeat:"repeat",backgroundSize:"180px"}} />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 h-16 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrollY > 40 ? "rgba(8,11,20,0.85)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrollY > 40 ? "blur(20px)" : "none",
          borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00C896] to-[#7B61FF] flex items-center justify-center text-xs font-bold">₿</div>
          <span className="font-['Syne'] font-bold text-base text-[#E8EAF0] tracking-tight">VaultIQ</span>
        </div>
        <div className="hidden md:flex gap-8">
          <a href="#how" className="text-sm font-medium text-[#8892A4] hover:text-[#E8EAF0] transition-colors no-underline">How It Works</a>
          <a href="#features" className="text-sm font-medium text-[#8892A4] hover:text-[#E8EAF0] transition-colors no-underline">Features</a>
          <a href="#community" className="text-sm font-medium text-[#8892A4] hover:text-[#E8EAF0] transition-colors no-underline">Community</a>
          <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[#8892A4] hover:text-[#E8EAF0] transition-colors no-underline">About OU</a>
        </div>
        <Link href="/auth" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-sm font-semibold no-underline hover:translate-y-[-1px] hover:shadow-[0_8px_32px_rgba(0,200,150,0.3)] transition-all">
          Sign In
        </Link>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-20 text-center overflow-hidden">
        {/* Grid bg */}
        <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px",maskImage:"radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 80%)"}} />
        {/* Orbs */}
        <div className="absolute rounded-full blur-[80px] pointer-events-none w-[600px] h-[600px] top-[10%] left-1/2" style={{background:"radial-gradient(circle, rgba(0,200,150,0.12) 0%, transparent 70%)",transform:`translateX(-50%) translateY(${scrollY*0.1}px)`}} />
        <div className="absolute rounded-full blur-[80px] pointer-events-none w-[400px] h-[400px] top-[20%] -right-[10%]" style={{background:"radial-gradient(circle, rgba(123,97,255,0.1) 0%, transparent 70%)"}} />

        <div className="relative z-10 max-w-[900px]">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-[fadeUp_0.7s_ease_0.1s_forwards] opacity-0">
            <div className="inline-flex items-center gap-1.5 bg-[#00C896]/10 border border-[#00C896]/25 text-[#00C896] px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase">
              <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full animate-pulse" />
              Powered by Okamoto–Uchiyama Cryptosystem
            </div>
          </div>

          <h1 className="font-['Syne'] text-[clamp(44px,8vw,80px)] font-extrabold leading-[1.05] tracking-tighter mb-6 animate-[fadeUp_0.7s_ease_0.2s_forwards] opacity-0">
            Your finances, <span className="bg-gradient-to-r from-[#00C896] to-[#7B61FF] bg-clip-text text-transparent">encrypted.</span>
            <br />
            Community insights, <span className="text-[#7B61FF]">unlocked.</span>
          </h1>

          <p className="text-lg font-light text-[#8892A4] leading-relaxed max-w-[620px] mx-auto mb-12 animate-[fadeUp_0.7s_ease_0.35s_forwards] opacity-0">
            A privacy-preserving budgeting platform where your spending data is homomorphically encrypted — we compute community analytics without ever seeing your numbers.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-[fadeUp_0.7s_ease_0.5s_forwards] opacity-0">
            <Link href="/auth" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-base font-semibold no-underline hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(0,200,150,0.35)] transition-all">
              Get Started →
            </Link>
          </div>

          <p className="mt-7 text-xs text-[#4A5568] tracking-wide">
            No plaintext stored in community DB · Probabilistic encryption · Open architecture
          </p>
        </div>

        {/* Code block */}
        <div className="relative z-10 mt-16 max-w-[560px] w-full animate-[float_6s_ease-in-out_infinite]">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 font-mono text-[13px] leading-[1.8] text-left">
            <div className="text-[#4A5568]"># Community aggregation — no plaintext exposed</div>
            <div><span className="text-[#7B61FF]">user_a </span><span>= </span><span className="text-[#00C896]">Enc</span>(food=<span className="text-[#00C896]">2000</span>)</div>
            <div><span className="text-[#7B61FF]">user_b </span><span>= </span><span className="text-[#00C896]">Enc</span>(food=<span className="text-[#00C896]">3500</span>)</div>
            <div className="mt-2 text-[#4A5568]"># Homomorphic addition (ciphertext multiplication)</div>
            <div><span className="text-[#7B61FF]">aggregate </span>= user_a <span className="text-[#FF6B6B]">×</span> user_b</div>
            <div className="mt-2 text-[#4A5568]"># Only the sum is ever decrypted</div>
            <div><span className="text-[#7B61FF]">Dec</span>(aggregate) → <span className="text-[#FFB347]">5500</span> <span className="text-[#4A5568]"># ✓ privacy preserved</span></div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section id="community" className="py-20 px-6 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#00C896]/10 border border-[#00C896]/25 text-[#00C896] px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-[#00C896] rounded-full animate-pulse" />
            Live Community Stats
          </div>
          <h2 className="font-['Syne'] text-[clamp(28px,4vw,40px)] font-bold tracking-tight">
            Real numbers. Zero exposure.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 text-center">
              <div className="font-['Syne'] text-[clamp(28px,3vw,38px)] font-bold text-[#00C896] tracking-tight leading-none mb-2">
                {s.value}<span className="text-[0.6em] text-[#00A87A]">{s.suffix}</span>
              </div>
              <div className="text-sm text-[#8892A4]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 px-6 bg-white/[0.01]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#7B61FF] text-xs font-semibold tracking-[0.1em] uppercase mb-3">The OU Flow</p>
            <h2 className="font-['Syne'] text-[clamp(28px,4vw,40px)] font-bold tracking-tight">How your privacy is preserved</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="px-6 relative" style={{borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none"}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{background:`${step.color}15`,border:`1px solid ${step.color}30`}}>
                  <span className="font-['Syne'] text-sm font-bold" style={{color:step.color}}>{step.step}</span>
                </div>
                <h3 className="text-base font-semibold text-[#E8EAF0] mb-3 leading-tight">{step.title}</h3>
                <p className="text-sm text-[#8892A4] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#00C896] text-xs font-semibold tracking-[0.1em] uppercase mb-3">Built Different</p>
            <h2 className="font-['Syne'] text-[clamp(28px,4vw,40px)] font-bold tracking-tight max-w-[500px] mx-auto">Finance meets cryptography</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 transition-all hover:border-[#00C896]/25 hover:bg-[#00C896]/[0.03] hover:translate-y-[-4px]">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-[#E8EAF0] mb-3 tracking-tight">{f.title}</h3>
                <p className="text-sm text-[#8892A4] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto bg-gradient-to-br from-[#00C896]/[0.08] to-[#7B61FF]/[0.08] border border-[#00C896]/20 rounded-3xl p-16 text-center relative overflow-hidden">
          <div className="absolute rounded-full blur-[80px] pointer-events-none w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{background:"radial-gradient(circle, rgba(0,200,150,0.08) 0%, transparent 70%)"}} />
          <div className="relative z-10">
            <h2 className="font-['Syne'] text-[clamp(28px,5vw,48px)] font-extrabold tracking-tight mb-4 leading-tight">
              Track smarter.<br/>
              <span className="bg-gradient-to-r from-[#00C896] to-[#7B61FF] bg-clip-text text-transparent">Stay private.</span>
            </h2>
            <p className="text-base text-[#8892A4] max-w-[440px] mx-auto mb-10 leading-relaxed">
              Join 2,847 users who manage their finances with mathematical privacy guarantees.
            </p>
            <Link href="/auth" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-base font-semibold no-underline hover:translate-y-[-2px] hover:shadow-[0_12px_40px_rgba(0,200,150,0.35)] transition-all inline-block">
              Get Started →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 px-6 max-w-[1100px] mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#00C896] to-[#7B61FF] flex items-center justify-center text-[9px] font-bold">₿</div>
          <span className="font-['Syne'] font-bold text-sm">VaultIQ</span>
          <span className="text-[#4A5568] text-xs ml-2">CNT Academic Project · OU Cryptosystem</span>
        </div>
        <div className="flex gap-6">
          <a href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem" target="_blank" rel="noopener noreferrer" className="text-[#8892A4] text-xs no-underline hover:text-[#E8EAF0] transition-colors">About OU</a>
          <Link href="/auth" className="text-[#8892A4] text-xs no-underline hover:text-[#E8EAF0] transition-colors">Sign In</Link>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
      `}</style>
    </main>
  );
}
