"use client";

import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  prefix?: string;
  suffix?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "#00C896",
  prefix = "",
  suffix = "",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.05]">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div
        className="font-['Syne'] text-xl sm:text-2xl font-bold tracking-tight mb-1 truncate"
        style={{ color }}
        title={`${prefix}${typeof value === "number" ? value.toLocaleString("en-IN") : value}${suffix}`}
      >
        {prefix}
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-[#8892A4] font-normal truncate">{label}</div>
    </div>
  );
}
