"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Expense } from "@/types";

interface MonthlyChartProps {
  expenses: Expense[];
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function MonthlyChart({ expenses }: MonthlyChartProps) {
  const monthlyTotals = expenses.reduce<Record<string, number>>((acc, exp) => {
    const d = new Date(exp.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + exp.amount;
    return acc;
  }, {});

  const data = Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([key, total]) => {
      const [, monthStr] = key.split("-");
      return {
        month: MONTH_NAMES[parseInt(monthStr, 10)],
        total,
      };
    });

  if (data.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-['Outfit'] text-lg font-bold text-white mb-4">
          Monthly Spending
        </h3>
        <p className="text-sm text-[#475569] text-center py-8">
          No data yet. Your spending trends will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-[0_8px_32px_rgba(139,92,246,0.06)] transition-shadow duration-300">
      <h3 className="font-['Outfit'] text-lg font-bold text-white mb-4">
        Monthly Spending
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(139,92,246,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#CBD5E1", fontSize: 13, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#CBD5E1", fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              cursor={{ fill: "rgba(139, 92, 246, 0.05)" }}
              contentStyle={{
                background: "#0F1629",
                border: "1px solid rgba(139,92,246,0.3)",
                borderRadius: "12px",
                fontSize: "13px",
                color: "#E2E8F0",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, "Total"]}
            />
            <Bar
              dataKey="total"
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06D6A0" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
