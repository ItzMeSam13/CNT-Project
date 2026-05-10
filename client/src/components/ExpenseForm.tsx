"use client";

import { useState } from "react";
import { CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS, type Category } from "@/types";
import { Plus } from "lucide-react";

interface ExpenseFormProps {
  onSubmit: (category: string, amount: number, note: string) => Promise<void>;
  loading: boolean;
}

export default function ExpenseForm({ onSubmit, loading }: ExpenseFormProps) {
  const [category, setCategory] = useState<Category>("food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseInt(amount, 10);
    if (!amountNum || amountNum <= 0) return;

    await onSubmit(category, amountNum, note);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      <h3 className="font-['Outfit'] text-lg font-bold text-white mb-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center">
          <Plus size={16} className="text-[#8B5CF6]" />
        </div>
        Add Expense
      </h3>

      {/* Category selector */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#94A3B8] mb-2.5 tracking-wider uppercase">
          Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-300 cursor-pointer overflow-hidden ${
                category === cat
                  ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/15 text-[#A78BFA] shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.02]"
                  : "border-[#1E293B] bg-[#060918]/60 text-[#94A3B8] hover:border-[#8B5CF6]/30 hover:text-white hover:bg-[#060918]/80"
              }`}
            >
              <span className="text-sm sm:text-base shrink-0">{CATEGORY_ICONS[cat]}</span>
              <span className="truncate">{CATEGORY_LABELS[cat]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <label
          htmlFor="expense-amount"
          className="block text-xs font-semibold text-[#94A3B8] mb-2.5 tracking-wider uppercase"
        >
          Amount (₹)
        </label>
        <input
          id="expense-amount"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#0F1629] border border-[#1E293B] text-white text-sm font-normal outline-none transition-all duration-300 placeholder:text-[#475569] focus:border-[#8B5CF6]/50 focus:bg-[#8B5CF6]/[0.03] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
        />
      </div>

      {/* Note */}
      <div className="mb-5">
        <label
          htmlFor="expense-note"
          className="block text-xs font-semibold text-[#94A3B8] mb-2.5 tracking-wider uppercase"
        >
          Note (optional)
        </label>
        <input
          id="expense-note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What was this for?"
          className="w-full px-4 py-3 rounded-xl bg-[#0F1629] border border-[#1E293B] text-white text-sm font-normal outline-none transition-all duration-300 placeholder:text-[#475569] focus:border-[#8B5CF6]/50 focus:bg-[#8B5CF6]/[0.03] focus:shadow-[0_0_0_3px_rgba(139,92,246,0.08)]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-sm font-semibold border-0 cursor-pointer transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_12px_32px_rgba(139,92,246,0.35)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
      >
        {loading ? (
          <span className="inline-flex items-center gap-2.5">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Encrypting & Saving...
          </span>
        ) : (
          "Add Expense →"
        )}
      </button>

      <p className="text-center text-xs text-[#475569] mt-3 font-medium">
        Amount will be encrypted using OU cryptosystem
      </p>
    </form>
  );
}
