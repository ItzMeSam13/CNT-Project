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
      className="rounded-2xl border border-white/[0.1] bg-[#080B14] shadow-2xl p-6"
    >
      <h3 className="font-['Syne'] text-lg font-bold text-[#E8EAF0] mb-5 flex items-center gap-2">
        <Plus size={18} className="text-[#00C896]" />
        Add Expense
      </h3>

      {/* Category selector */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-[#8892A4] mb-2 tracking-wide uppercase">
          Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-2 px-2 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all cursor-pointer overflow-hidden ${
                category === cat
                  ? "border-[#00C896]/40 bg-[#00C896]/10 text-[#00C896]"
                  : "border-white/[0.07] bg-white/[0.02] text-[#8892A4] hover:border-white/[0.12]"
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
          className="block text-xs font-medium text-[#8892A4] mb-2 tracking-wide uppercase"
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
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E8EAF0] text-sm font-normal outline-none transition-all placeholder:text-[#4A5568] focus:border-[#00C896]/50 focus:bg-[#00C896]/[0.03] focus:shadow-[0_0_0_3px_rgba(0,200,150,0.08)]"
        />
      </div>

      {/* Note */}
      <div className="mb-5">
        <label
          htmlFor="expense-note"
          className="block text-xs font-medium text-[#8892A4] mb-2 tracking-wide uppercase"
        >
          Note (optional)
        </label>
        <input
          id="expense-note"
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What was this for?"
          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E8EAF0] text-sm font-normal outline-none transition-all placeholder:text-[#4A5568] focus:border-[#00C896]/50 focus:bg-[#00C896]/[0.03] focus:shadow-[0_0_0_3px_rgba(0,200,150,0.08)]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-sm font-semibold border-0 cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-[0_8px_32px_rgba(0,200,150,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
      >
        {loading ? "Encrypting & Saving..." : "Add Expense →"}
      </button>

      <p className="text-center text-xs text-[#4A5568] mt-3">
        Amount will be encrypted using OU cryptosystem
      </p>
    </form>
  );
}
