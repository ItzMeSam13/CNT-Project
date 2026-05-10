"use client";

import Navbar from "@/components/Navbar";
import { ShieldCheck, Lock, Unlock, Plus, Server, Eye, EyeOff } from "lucide-react";

const STEPS = [
  {
    icon: Plus,
    title: "User Adds an Expense",
    desc: "The user enters an expense amount (e.g., ₹2000 for food). This plaintext value is sent to the backend.",
    color: "#06D6A0",
  },
  {
    icon: Lock,
    title: "Backend Encrypts with OU",
    desc: "The server encrypts the amount using the shared OU public key: c = g^m × r^n mod n². A random r ensures probabilistic encryption — same amount produces different ciphertexts each time.",
    color: "#8B5CF6",
  },
  {
    icon: Server,
    title: "Ciphertext Stored in Firestore",
    desc: "Both the plaintext (for the user's personal dashboard) and the ciphertext (for community analytics) are stored. The plaintext is only accessible to the user who created it.",
    color: "#FBBF24",
  },
  {
    icon: EyeOff,
    title: "Homomorphic Aggregation",
    desc: "To compute community totals, all ciphertexts in a category are multiplied: Enc(a) × Enc(b) = Enc(a+b). This happens entirely on encrypted data — no decryption occurs during aggregation.",
    color: "#F472B6",
  },
  {
    icon: Unlock,
    title: "Only the Sum is Decrypted",
    desc: "The final aggregated ciphertext is decrypted using the private key to reveal the category total. Individual contributions remain mathematically hidden — they cannot be reverse-engineered from the sum.",
    color: "#06D6A0",
  },
  {
    icon: Eye,
    title: "Averages Displayed",
    desc: "The total is divided by participant count to produce averages. These are the only values ever shown on the community page. No individual user data is ever exposed.",
    color: "#38BDF8",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#060918] text-[#E2E8F0]">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/[0.08] border border-[#8B5CF6]/20 text-[#A78BFA] px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <ShieldCheck size={12} />
            Cryptography
          </div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            The Okamoto–Uchiyama Cryptosystem
          </h1>
          <p className="text-base text-[#94A3B8] leading-relaxed max-w-2xl">
            VaultIQ uses the Okamoto–Uchiyama (OU) public-key cryptosystem — an
            additively homomorphic encryption scheme that allows computation on
            encrypted data without decrypting it first.
          </p>
        </div>

        {/* What is OU */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] text-xl font-bold mb-4 text-white">What is Okamoto–Uchiyama?</h2>
          <div className="glass-card glow-border rounded-2xl p-6 space-y-4">
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              The Okamoto–Uchiyama cryptosystem (1998) is a public-key encryption scheme based on the
              difficulty of factoring integers of the form <span className="text-white font-semibold">n = p² × q</span>,
              where p and q are large primes. It belongs to the family of additively homomorphic encryption
              schemes, meaning it supports addition operations directly on ciphertexts.
            </p>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Unlike RSA (which is multiplicatively homomorphic) or fully homomorphic encryption
              (which supports arbitrary operations but is extremely slow), OU provides efficient
              additive homomorphism — perfect for computing sums and averages on encrypted financial data.
            </p>
          </div>
        </section>

        {/* Key Architecture */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] text-xl font-bold mb-4 text-white">Key Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card glow-border rounded-2xl p-6" style={{"--glow-color": "rgba(6,214,160,0.2)"} as React.CSSProperties}>
              <div className="flex items-center gap-2 mb-3">
                <Unlock size={18} className="text-[#06D6A0]" />
                <h3 className="font-semibold text-sm text-[#06D6A0]">Public Key (n, g)</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li>• Shared with all users via API</li>
                <li>• Used to encrypt expense amounts</li>
                <li>• n = p² × q (very large integer)</li>
                <li>• g is a specially chosen generator</li>
                <li>• Anyone can encrypt, nobody can decrypt</li>
              </ul>
            </div>
            <div className="glass-card glow-border rounded-2xl p-6" style={{"--glow-color": "rgba(244,114,182,0.2)"} as React.CSSProperties}>
              <div className="flex items-center gap-2 mb-3">
                <Lock size={18} className="text-[#F472B6]" />
                <h3 className="font-semibold text-sm text-[#F472B6]">Private Key (p, q)</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#94A3B8]">
                <li>• Stored only on the backend server</li>
                <li>• Never exposed via API or logs</li>
                <li>• p and q are the prime factors of n</li>
                <li>• Used only to decrypt aggregated totals</li>
                <li>• Knowing p allows computing L function</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Encryption Formula */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] text-xl font-bold mb-4 text-white">Encryption Formula</h2>
          <div className="glass-card glow-border rounded-2xl p-6">
            <div className="bg-[#060918] border border-[#1E293B] rounded-xl p-5 font-mono text-sm mb-4 overflow-x-auto">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="text-[#475569]"># Encryption</div>
              <div>
                <span className="text-[#A78BFA]">c</span> = <span className="text-[#06D6A0]">g</span>^<span className="text-white">m</span> × <span className="text-[#FBBF24]">r</span>^<span className="text-white">n</span> <span className="text-[#F472B6]">mod</span> n²
              </div>
              <div className="mt-3 text-[#475569]"># Where:</div>
              <div className="text-[#94A3B8]">  m = plaintext (your expense amount)</div>
              <div className="text-[#94A3B8]">  r = random integer (makes it probabilistic)</div>
              <div className="text-[#94A3B8]">  g = generator from public key</div>
              <div className="text-[#94A3B8]">  n = public modulus (p² × q)</div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              <strong className="text-white">Why probabilistic?</strong> The random r means
              encrypting ₹2000 twice produces completely different ciphertexts each time. This prevents
              anyone from detecting patterns like &quot;User A and User B spent the same amount&quot; by comparing
              ciphertext values.
            </p>
          </div>
        </section>

        {/* Homomorphic Property */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] text-xl font-bold mb-4 text-white">Additive Homomorphic Property</h2>
          <div className="rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/[0.04] p-6">
            <div className="bg-[#060918] border border-[#1E293B] rounded-xl p-5 font-mono text-sm mb-4 overflow-x-auto">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="text-[#475569]"># The magic of OU</div>
              <div><span className="text-[#A78BFA]">Enc</span>(<span className="text-[#06D6A0]">5000</span>) × <span className="text-[#A78BFA]">Enc</span>(<span className="text-[#06D6A0]">7000</span>) = <span className="text-[#A78BFA]">Enc</span>(<span className="text-[#FBBF24]">12000</span>)</div>
              <div className="mt-2 text-[#475569]"># Multiply ciphertexts → add plaintexts</div>
              <div className="text-[#475569]"># No decryption needed during aggregation!</div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              When we multiply two OU ciphertexts together (mod n²), the result is a valid ciphertext
              that encrypts the <strong className="text-white">sum</strong> of the original plaintexts.
              This means we can compute totals across all users without ever decrypting individual amounts.
              Only the final aggregated result is decrypted using the private key.
            </p>
          </div>
        </section>

        {/* Flow */}
        <section className="mb-12">
          <h2 className="font-['Outfit'] text-xl font-bold mb-6 text-white">How an Expense Becomes a Community Stat</h2>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 glass-card glow-border group rounded-2xl p-5 hover:translate-y-[-4px] hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)] transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
                  >
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold font-mono" style={{ color: step.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learn more */}
        <div className="text-center">
          <a
            href="https://en.wikipedia.org/wiki/Okamoto%E2%80%93Uchiyama_cryptosystem"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#8B5CF6]/25 text-[#A78BFA] text-sm font-medium no-underline hover:bg-[#8B5CF6]/[0.06] hover:border-[#8B5CF6]/40 transition-all duration-300"
          >
            Read more on Wikipedia →
          </a>
        </div>
      </div>
    </main>
  );
}
