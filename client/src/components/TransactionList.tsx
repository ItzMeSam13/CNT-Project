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
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
      <h3 className="font-['Syne'] text-lg font-bold text-[#E8EAF0] mb-4">
        Recent Transactions
      </h3>

      {displayed.length === 0 ? (
        <p className="text-sm text-[#4A5568] text-center py-8">
          No transactions yet.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {displayed.map((exp) => {
            const cat = exp.category as Category;
            const color = CATEGORY_COLORS[cat] || "#8892A4";
            const icon = CATEGORY_ICONS[cat] || "📋";
            const label = CATEGORY_LABELS[cat] || exp.category;
            const date = new Date(exp.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            });

            return (
              <div
                key={exp.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    {icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-[#E8EAF0] truncate">
                      {label}
                    </div>
                    <div className="text-xs text-[#4A5568] truncate">
                      {exp.note || date}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className="text-sm font-semibold" style={{ color }}>
                    -₹{exp.amount.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#4A5568]">{date}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
