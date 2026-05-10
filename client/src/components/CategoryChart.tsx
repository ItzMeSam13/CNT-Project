"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type Category,
  type Expense,
} from "@/types";

interface CategoryChartProps {
  expenses: Expense[];
}

export default function CategoryChart({ expenses }: CategoryChartProps) {
  const categoryTotals = expenses.reduce<Record<string, number>>((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.entries(categoryTotals)
    .map(([category, total]) => ({
      name: CATEGORY_LABELS[category as Category] || category,
      value: total,
      color: CATEGORY_COLORS[category as Category] || "#94A3B8",
    }))
    .sort((a, b) => b.value - a.value);

  if (data.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-['Outfit'] text-lg font-bold text-white mb-4">
          Spending by Category
        </h3>
        <p className="text-sm text-[#475569] text-center py-8">
          No expenses yet. Add one to see your breakdown.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(139,92,246,0.06)] transition-shadow duration-300">
      <h3 className="font-['Outfit'] text-lg font-bold text-white mb-4">
        Spending by Category
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0F1629",
                border: "1px solid rgba(159, 119, 252, 0.3)",
                borderRadius: "12px",
                fontSize: "13px",
                color: "#E2E8F0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              itemStyle={{ color: "#E2E8F0" }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2 justify-center">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5 text-[13px] font-medium text-[#CBD5E1]">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: entry.color }}
            />
            {entry.name}
          </div>
        ))}
      </div>
    </div>
  );
}
