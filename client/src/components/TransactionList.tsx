"use client";

import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  type Category,
  type Expense,
} from "@/types";

interface TransactionListProps {
  expenses: Expense[];
  limit?: number;
}

export default function TransactionList({
  expenses,
  limit = 10,
}: TransactionListProps) {
  const displayed = expenses.slice(0, limit);

  return (
    <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
      <h3 className="font-['Outfit'] text-lg font-bold text-white mb-5">
        Recent Transactions
      </h3>

      {displayed.length === 0 ? (
        <p className="text-sm text-[#475569] text-center py-8">
          No transactions yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {displayed.map((exp) => {
            const cat = exp.category as Category;
            const color = CATEGORY_COLORS[cat] || "#94A3B8";
            const icon = CATEGORY_ICONS[cat] || "📋";
            const label = CATEGORY_LABELS[cat] || exp.category;
            const date = new Date(exp.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            });

            return (
              <div
                key={exp.id}
                className="group flex items-center justify-between px-4 py-3.5 rounded-xl bg-[#060918]/60 border border-[#1E293B]/60 hover:border-[#8B5CF6]/40 hover:bg-[#060918]/80 hover:shadow-[0_4px_20px_rgba(139,92,246,0.1)] hover:translate-x-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base shrink-0"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}20`,
                    }}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {label}
                    </div>
                    <div className="text-xs text-[#475569] truncate">
                      {exp.note || date}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-sm font-semibold" style={{ color }}>
                    -₹{exp.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#475569]">{date}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
