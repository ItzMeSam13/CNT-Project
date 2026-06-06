"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  playgroundGenerateKeys,
  playgroundEncrypt,
  playgroundDecrypt,
  playgroundAdd,
} from "@/lib/api";
import {
  Lock,
  Unlock,
  Plus,
  AlertCircle,
  ArrowRight,
  KeyRound,
  Info,
  ShieldAlert,
} from "lucide-react";

type Keys = {
  public: { n: string; g: string; h: string };
  private: { p: string; q: string };
};

export default function PlaygroundPage() {
  const [keys, setKeys] = useState<Keys | null>(null);
  const [generatingKeys, setGeneratingKeys] = useState(false);

  const [encryptInput, setEncryptInput] = useState("");
  const [encryptOutput, setEncryptOutput] = useState("");
  const [encryptLoading, setEncryptLoading] = useState(false);

  const [decryptInput, setDecryptInput] = useState("");
  const [decryptOutput, setDecryptOutput] = useState("");
  const [decryptLoading, setDecryptLoading] = useState(false);

  const [addInput1, setAddInput1] = useState("");
  const [addInput2, setAddInput2] = useState("");
  const [addOutput, setAddOutput] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleGenerateKeys = async () => {
    try {
      setError(null);
      setGeneratingKeys(true);
      const generatedKeys = await playgroundGenerateKeys();
      setKeys(generatedKeys);
      
      // Reset subsequent steps
      setEncryptInput("");
      setEncryptOutput("");
      setDecryptInput("");
      setDecryptOutput("");
      setAddInput1("");
      setAddInput2("");
      setAddOutput("");
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to generate keys.");
    } finally {
      setGeneratingKeys(false);
    }
  };

  const handleEncrypt = async () => {
    if (!keys) return;
    try {
      setError(null);
      setEncryptLoading(true);
      const val = parseInt(encryptInput, 10);
      if (isNaN(val) || val < 0) {
        throw new Error("Plaintext must be a non-negative integer.");
      }
      const res = await playgroundEncrypt(val, keys.public);
      setEncryptOutput(res.ciphertext);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to encrypt.");
    } finally {
      setEncryptLoading(false);
    }
  };

  const handleDecrypt = async () => {
    if (!keys) return;
    try {
      setError(null);
      setDecryptLoading(true);
      if (!decryptInput.trim()) {
        throw new Error("Ciphertext cannot be empty.");
      }
      const res = await playgroundDecrypt(decryptInput.trim(), keys.public, keys.private);
      setDecryptOutput(String(res.plaintext));
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to decrypt.");
    } finally {
      setDecryptLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!keys) return;
    try {
      setError(null);
      setAddLoading(true);
      if (!addInput1.trim() || !addInput2.trim()) {
        throw new Error("Both ciphertexts are required.");
      }
      const res = await playgroundAdd([addInput1.trim(), addInput2.trim()], keys.public);
      setAddOutput(res.ciphertext);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to add.");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#060918] text-[#E2E8F0] pb-24">
      <Navbar />

      <div className="pt-24 px-4 md:px-8 max-w-[900px] mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/[0.08] border border-[#8B5CF6]/20 text-[#A78BFA] px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            Educational Sandbox
          </div>
          <h1 className="font-['Outfit'] text-3xl md:text-4xl font-bold text-white mb-4">
            Learn Homomorphic Encryption
          </h1>
          <p className="text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Welcome to the VaultIQ educational playground. Here you can generate your own local keys and see how the Okamoto-Uchiyama (OU) cryptosystem encrypts, mathematically adds, and decrypts numbers—all without ever exposing the underlying plaintexts to the math!
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl flex items-start gap-3 text-[#EF4444] animate-[fadeUp_0.3s_ease]">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-8 relative">
          
          {/* Timeline connecting line */}
          <div className="hidden md:block absolute top-[60px] bottom-[60px] left-[3.2rem] w-px bg-gradient-to-b from-[#8B5CF6]/40 via-[#06D6A0]/40 to-[#F472B6]/40 z-0"></div>

          {/* STEP 1: Key Generation */}
          <section className="glass-card glow-border rounded-2xl p-6 md:p-8 relative z-10 bg-[#060918]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <KeyRound size={20} />
              </div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white">Step 1: Generate Keys</h2>
            </div>

            <div className="p-4 bg-[#8B5CF6]/[0.05] border border-[#8B5CF6]/10 rounded-xl mb-6 flex gap-3 text-sm text-[#94A3B8]">
              <Info size={20} className="text-[#A78BFA] shrink-0 mt-0.5" />
              <p>
                First, we need to create a mathematical lock (<strong>Public Key</strong>) and a mathematical key (<strong>Private Key</strong>). The Public Key is used to encrypt data and add it together. The Private Key is the only thing that can decrypt the final result.
              </p>
            </div>

            {!keys ? (
              <button
                onClick={handleGenerateKeys}
                disabled={generatingKeys}
                className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(139,92,246,0.4)] transition-all disabled:opacity-50"
              >
                {generatingKeys ? "Generating 512-bit Primes..." : "Generate New Key Pair"}
              </button>
            ) : (
              <div className="flex flex-col gap-4 animate-[fadeIn_0.3s_ease]">
                <div className="flex items-center justify-between">
                  <span className="text-[#06D6A0] text-sm font-semibold flex items-center gap-2">
                    <ShieldAlert size={16} /> Keys successfully generated and stored in your browser session.
                  </span>
                  <button onClick={handleGenerateKeys} className="text-xs text-[#8B5CF6] hover:underline">
                    Regenerate
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#0F1629] border border-[#1E293B] rounded-xl">
                    <h3 className="text-xs text-[#A78BFA] font-bold uppercase tracking-wider mb-2">Public Key</h3>
                    <p className="text-xs text-[#475569] mb-2 border-b border-[#1E293B] pb-2">Shared with the server to encrypt and compute.</p>
                    <div className="text-[11px] font-mono text-[#94A3B8] break-all max-h-[80px] overflow-y-auto custom-scrollbar">
                      <span className="text-white">n:</span> {keys.public.n}
                    </div>
                  </div>
                  <div className="p-4 bg-[#0F1629] border border-[#1E293B] rounded-xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#0F1629]/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center group-hover:opacity-0 transition-opacity duration-300">
                      <Lock size={20} className="text-[#F472B6] mb-1" />
                      <span className="text-xs text-[#F472B6] font-semibold">Hover to reveal Private Key</span>
                    </div>
                    <h3 className="text-xs text-[#F472B6] font-bold uppercase tracking-wider mb-2">Private Key</h3>
                    <p className="text-xs text-[#475569] mb-2 border-b border-[#1E293B] pb-2">Kept secret. Used only to decrypt the final output.</p>
                    <div className="text-[11px] font-mono text-[#94A3B8] break-all max-h-[80px] overflow-y-auto custom-scrollbar">
                      <span className="text-white">p:</span> {keys.private.p}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* STEP 2: Encrypt */}
          <section className={`glass-card glow-border rounded-2xl p-6 md:p-8 relative z-10 bg-[#060918] transition-opacity duration-500 ${!keys ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#06D6A0]/20 border border-[#06D6A0]/40 flex items-center justify-center text-[#06D6A0] shadow-[0_0_15px_rgba(6,214,160,0.3)]">
                <Lock size={20} />
              </div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white">Step 2: Encrypt Data</h2>
            </div>

            <div className="p-4 bg-[#06D6A0]/[0.05] border border-[#06D6A0]/10 rounded-xl mb-6 flex gap-3 text-sm text-[#94A3B8]">
              <Info size={20} className="text-[#06D6A0] shrink-0 mt-0.5" />
              <p>
                Enter a plain number. The OU cryptosystem uses your <strong>Public Key</strong> and randomness to turn it into a massive, indistinguishable block of text called a <em>Ciphertext</em>.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <input
                type="number"
                value={encryptInput}
                onChange={(e) => setEncryptInput(e.target.value)}
                placeholder="Enter a positive number (e.g., 5000)..."
                className="flex-1 bg-[#0F1629] border border-[#1E293B] rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#06D6A0]/50 transition-colors"
              />
              <button
                onClick={handleEncrypt}
                disabled={encryptLoading || !keys}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#06D6A0] to-[#05B086] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(6,214,160,0.3)] transition-all disabled:opacity-50"
              >
                {encryptLoading ? "Locking..." : "Encrypt"} <ArrowRight size={16} />
              </button>
            </div>

            {encryptOutput && (
              <div className="mt-4 p-4 bg-[#0F1629] border border-[#1E293B] rounded-xl relative group">
                <p className="text-xs text-[#06D6A0] mb-2 font-medium">Encrypted Ciphertext Result:</p>
                <div className="text-[#94A3B8] font-mono text-sm break-all max-h-[120px] overflow-y-auto custom-scrollbar">
                  {encryptOutput}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(encryptOutput)}
                  className="absolute top-4 right-4 text-xs bg-[#06D6A0]/10 text-[#06D6A0] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#06D6A0]/20"
                >
                  Copy
                </button>
              </div>
            )}
          </section>

          {/* STEP 3: Homomorphic Addition */}
          <section className={`glass-card glow-border rounded-2xl p-6 md:p-8 relative z-10 bg-[#060918] transition-opacity duration-500 ${!keys ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#60A5FA] shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Plus size={20} />
              </div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white">Step 3: Homomorphic Addition</h2>
            </div>

            <div className="p-4 bg-[#3B82F6]/[0.05] border border-[#3B82F6]/10 rounded-xl mb-6 flex gap-3 text-sm text-[#94A3B8]">
              <Info size={20} className="text-[#60A5FA] shrink-0 mt-0.5" />
              <p>
                This is the magic part! Paste two ciphertexts (you can encrypt two different numbers above). The server will multiply the ciphertexts together using the <strong>Public Key</strong>. Mathematically, this perfectly sums the hidden plaintexts without ever seeing them.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <textarea
                value={addInput1}
                onChange={(e) => setAddInput1(e.target.value)}
                placeholder="Paste first ciphertext..."
                className="w-full h-24 bg-[#0F1629] border border-[#1E293B] rounded-xl px-4 py-3 text-[#94A3B8] font-mono text-xs outline-none focus:border-[#3B82F6]/50 transition-colors custom-scrollbar resize-none"
              />
              <div className="flex justify-center -my-2 z-10">
                <div className="w-8 h-8 rounded-full bg-[#060918] border border-[#1E293B] flex items-center justify-center text-[#60A5FA] bg-[#0F1629]">
                  <Plus size={14} />
                </div>
              </div>
              <textarea
                value={addInput2}
                onChange={(e) => setAddInput2(e.target.value)}
                placeholder="Paste second ciphertext..."
                className="w-full h-24 bg-[#0F1629] border border-[#1E293B] rounded-xl px-4 py-3 text-[#94A3B8] font-mono text-xs outline-none focus:border-[#3B82F6]/50 transition-colors custom-scrollbar resize-none"
              />

              <button
                onClick={handleAdd}
                disabled={addLoading || !keys}
                className="mt-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] transition-all disabled:opacity-50"
              >
                {addLoading ? "Computing Math on Encrypted Data..." : "Compute Homomorphic Sum"}
              </button>
            </div>

            {addOutput && (
              <div className="mt-4 p-4 bg-[#0F1629] border border-[#1E293B] rounded-xl relative group">
                <p className="text-xs text-[#60A5FA] mb-2 font-medium">Aggregated Ciphertext Result:</p>
                <div className="text-[#94A3B8] font-mono text-sm break-all max-h-[120px] overflow-y-auto custom-scrollbar">
                  {addOutput}
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(addOutput)}
                  className="absolute top-4 right-4 text-xs bg-[#3B82F6]/10 text-[#60A5FA] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#3B82F6]/20"
                >
                  Copy
                </button>
              </div>
            )}
          </section>

          {/* STEP 4: Decrypt */}
          <section className={`glass-card glow-border rounded-2xl p-6 md:p-8 relative z-10 bg-[#060918] transition-opacity duration-500 ${!keys ? "opacity-40 pointer-events-none" : ""}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#F472B6]/20 border border-[#F472B6]/40 flex items-center justify-center text-[#F472B6] shadow-[0_0_15px_rgba(244,114,182,0.3)]">
                <Unlock size={20} />
              </div>
              <h2 className="font-['Outfit'] text-xl font-bold text-white">Step 4: Decrypt the Result</h2>
            </div>

            <div className="p-4 bg-[#F472B6]/[0.05] border border-[#F472B6]/10 rounded-xl mb-6 flex gap-3 text-sm text-[#94A3B8]">
              <Info size={20} className="text-[#F472B6] shrink-0 mt-0.5" />
              <p>
                Take the aggregated ciphertext from Step 3 and paste it below. Using your <strong>Private Key</strong>, the system will unlock it. If the math worked perfectly, the plaintext will be the exact sum of your original numbers!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <textarea
                value={decryptInput}
                onChange={(e) => setDecryptInput(e.target.value)}
                placeholder="Paste ciphertext to decrypt..."
                className="w-full h-24 bg-[#0F1629] border border-[#1E293B] rounded-xl px-4 py-3 text-[#94A3B8] font-mono text-xs outline-none focus:border-[#F472B6]/50 transition-colors custom-scrollbar resize-none"
              />

              <button
                onClick={handleDecrypt}
                disabled={decryptLoading || !keys}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F472B6] to-[#DB2777] text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(244,114,182,0.3)] transition-all disabled:opacity-50"
              >
                {decryptLoading ? "Unlocking with Private Key..." : "Decrypt to Plaintext"}
              </button>
            </div>

            {decryptOutput && (
              <div className="mt-6 flex flex-col items-center justify-center p-8 bg-[#0F1629] border border-[#F472B6]/30 rounded-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#F472B6]/10 to-transparent"></div>
                <p className="text-xs text-[#94A3B8] mb-3 uppercase tracking-widest font-bold z-10">Revealed Math Sum</p>
                <div className="text-5xl md:text-6xl font-['Outfit'] font-black text-[#F472B6] drop-shadow-[0_0_15px_rgba(244,114,182,0.5)] z-10">
                  {decryptOutput}
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
