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
  color = "#8B5CF6",
  prefix = "",
  suffix = "",
}: StatCardProps) {
  return (
    <div className="glass-card glow-border group rounded-2xl p-5 sm:p-6 cursor-default">
      <div className="flex items-center justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}12`, border: `1px solid ${color}25` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <div
        className="font-['Outfit'] text-xl sm:text-2xl font-bold tracking-tight mb-1 truncate"
        style={{ color }}
        title={`${prefix}${typeof value === "number" ? value.toLocaleString("en-IN") : value}${suffix}`}
      >
        {prefix}
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        {suffix}
      </div>
      <div className="text-xs sm:text-[13px] text-[#94A3B8] font-medium truncate">{label}</div>
    </div>
  );
}
