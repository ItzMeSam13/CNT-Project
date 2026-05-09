"use client";

import Navbar from "@/components/Navbar";
import { ShieldCheck, Lock, Unlock, Plus, Server, Eye, EyeOff } from "lucide-react";

const STEPS = [
  {
    icon: Plus,
    title: "User Adds an Expense",
    desc: "The user enters an expense amount (e.g., ₹2000 for food). This plaintext value is sent to the backend.",
    color: "#00C896",
  },
  {
    icon: Lock,
    title: "Backend Encrypts with OU",
    desc: "The server encrypts the amount using the shared OU public key: c = g^m × r^n mod n². A random r ensures probabilistic encryption — same amount produces different ciphertexts each time.",
    color: "#7B61FF",
  },
  {
    icon: Server,
    title: "Ciphertext Stored in Firestore",
    desc: "Both the plaintext (for the user's personal dashboard) and the ciphertext (for community analytics) are stored. The plaintext is only accessible to the user who created it.",
    color: "#FFB347",
  },
  {
    icon: EyeOff,
    title: "Homomorphic Aggregation",
    desc: "To compute community totals, all ciphertexts in a category are multiplied: Enc(a) × Enc(b) = Enc(a+b). This happens entirely on encrypted data — no decryption occurs during aggregation.",
    color: "#FF6B6B",
  },
  {
    icon: Unlock,
    title: "Only the Sum is Decrypted",
    desc: "The final aggregated ciphertext is decrypted using the private key to reveal the category total. Individual contributions remain mathematically hidden — they cannot be reverse-engineered from the sum.",
    color: "#00C896",
  },
  {
    icon: Eye,
    title: "Averages Displayed",
    desc: "The total is divided by participant count to produce averages. These are the only values ever shown on the community page. No individual user data is ever exposed.",
    color: "#4ECDC4",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080B14] text-[#E8EAF0]">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-[900px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#00C896]/10 border border-[#00C896]/25 text-[#00C896] px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
            <ShieldCheck size={12} />
            Cryptography
          </div>
          <h1 className="font-['Syne'] text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            The Okamoto–Uchiyama Cryptosystem
          </h1>
          <p className="text-base text-[#8892A4] leading-relaxed max-w-2xl">
            VaultIQ uses the Okamoto–Uchiyama (OU) public-key cryptosystem — an
            additively homomorphic encryption scheme that allows computation on
            encrypted data without decrypting it first.
          </p>
        </div>

        {/* What is OU */}
        <section className="mb-12">
          <h2 className="font-['Syne'] text-xl font-bold mb-4">What is Okamoto–Uchiyama?</h2>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 space-y-4">
            <p className="text-sm text-[#8892A4] leading-relaxed">
              The Okamoto–Uchiyama cryptosystem (1998) is a public-key encryption scheme based on the
              difficulty of factoring integers of the form <span className="text-[#E8EAF0] font-medium">n = p² × q</span>,
              where p and q are large primes. It belongs to the family of additively homomorphic encryption
              schemes, meaning it supports addition operations directly on ciphertexts.
            </p>
            <p className="text-sm text-[#8892A4] leading-relaxed">
              Unlike RSA (which is multiplicatively homomorphic) or fully homomorphic encryption
              (which supports arbitrary operations but is extremely slow), OU provides efficient
              additive homomorphism — perfect for computing sums and averages on encrypted financial data.
            </p>
          </div>
        </section>

        {/* Key Architecture */}
        <section className="mb-12">
          <h2 className="font-['Syne'] text-xl font-bold mb-4">Key Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#00C896]/20 bg-[#00C896]/[0.05] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Unlock size={18} className="text-[#00C896]" />
                <h3 className="font-semibold text-sm text-[#00C896]">Public Key (n, g)</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#8892A4]">
                <li>• Shared with all users via API</li>
                <li>• Used to encrypt expense amounts</li>
                <li>• n = p² × q (very large integer)</li>
                <li>• g is a specially chosen generator</li>
                <li>• Anyone can encrypt, nobody can decrypt</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#FF6B6B]/20 bg-[#FF6B6B]/[0.05] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Lock size={18} className="text-[#FF6B6B]" />
                <h3 className="font-semibold text-sm text-[#FF6B6B]">Private Key (p, q)</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#8892A4]">
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
          <h2 className="font-['Syne'] text-xl font-bold mb-4">Encryption Formula</h2>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 font-mono text-sm mb-4 overflow-x-auto">
              <div className="text-[#4A5568]"># Encryption</div>
              <div>
                <span className="text-[#7B61FF]">c</span> = <span className="text-[#00C896]">g</span>^<span className="text-[#E8EAF0]">m</span> × <span className="text-[#FFB347]">r</span>^<span className="text-[#E8EAF0]">n</span> <span className="text-[#FF6B6B]">mod</span> n²
              </div>
              <div className="mt-3 text-[#4A5568]"># Where:</div>
              <div className="text-[#8892A4]">  m = plaintext (your expense amount)</div>
              <div className="text-[#8892A4]">  r = random integer (makes it probabilistic)</div>
              <div className="text-[#8892A4]">  g = generator from public key</div>
              <div className="text-[#8892A4]">  n = public modulus (p² × q)</div>
            </div>
            <p className="text-sm text-[#8892A4] leading-relaxed">
              <strong className="text-[#E8EAF0]">Why probabilistic?</strong> The random r means
              encrypting ₹2000 twice produces completely different ciphertexts each time. This prevents
              anyone from detecting patterns like "User A and User B spent the same amount" by comparing
              ciphertext values.
            </p>
          </div>
        </section>

        {/* Homomorphic Property */}
        <section className="mb-12">
          <h2 className="font-['Syne'] text-xl font-bold mb-4">Additive Homomorphic Property</h2>
          <div className="rounded-2xl border border-[#7B61FF]/20 bg-[#7B61FF]/[0.05] p-6">
            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 font-mono text-sm mb-4 overflow-x-auto">
              <div className="text-[#4A5568]"># The magic of OU</div>
              <div><span className="text-[#7B61FF]">Enc</span>(<span className="text-[#00C896]">5000</span>) × <span className="text-[#7B61FF]">Enc</span>(<span className="text-[#00C896]">7000</span>) = <span className="text-[#7B61FF]">Enc</span>(<span className="text-[#FFB347]">12000</span>)</div>
              <div className="mt-2 text-[#4A5568]"># Multiply ciphertexts → add plaintexts</div>
              <div className="text-[#4A5568]"># No decryption needed during aggregation!</div>
            </div>
            <p className="text-sm text-[#8892A4] leading-relaxed">
              When we multiply two OU ciphertexts together (mod n²), the result is a valid ciphertext
              that encrypts the <strong className="text-[#E8EAF0]">sum</strong> of the original plaintexts.
              This means we can compute totals across all users without ever decrypting individual amounts.
              Only the final aggregated result is decrypted using the private key.
            </p>
          </div>
        </section>

        {/* Flow */}
        <section className="mb-12">
          <h2 className="font-['Syne'] text-xl font-bold mb-6">How an Expense Becomes a Community Stat</h2>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all hover:border-white/[0.12]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                  >
                    <Icon size={18} style={{ color: step.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold font-mono" style={{ color: step.color }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-semibold text-[#E8EAF0]">{step.title}</h3>
                    </div>
                    <p className="text-sm text-[#8892A4] leading-relaxed">{step.desc}</p>
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#00C896]/30 text-[#00C896] text-sm font-medium no-underline hover:bg-[#00C896]/[0.06] transition-colors"
          >
            Read more on Wikipedia →
          </a>
        </div>
      </div>
    </main>
  );
}
