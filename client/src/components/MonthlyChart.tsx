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
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
        <h3 className="font-['Syne'] text-lg font-bold text-[#E8EAF0] mb-4">
          Monthly Spending
        </h3>
        <p className="text-sm text-[#4A5568] text-center py-8">
          No data yet. Your spending trends will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
      <h3 className="font-['Syne'] text-lg font-bold text-[#E8EAF0] mb-4">
        Monthly Spending
      </h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8892A4", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#8892A4", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: "#0D1117",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                fontSize: "13px",
                color: "#E8EAF0",
              }}
              formatter={(value: number) => [`₹${Number(value).toLocaleString("en-IN")}`, "Total"]}
            />
            <Bar
              dataKey="total"
              fill="#00C896"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
