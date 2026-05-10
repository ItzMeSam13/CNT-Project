"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getCommunityAnalytics } from "@/lib/api";
import type { CommunityAnalytics } from "@/types";
import { CATEGORY_COLORS } from "@/types";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Users, IndianRupee, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";

export default function CommunityPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [analytics, setAnalytics] = useState<CommunityAnalytics | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      const data = await getCommunityAnalytics();
      setAnalytics(data);
    } catch {
      setError("Could not load community data. Make sure the backend is running.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadAnalytics();
    }
  }, [user, authLoading, router]);

  if (authLoading || dataLoading) {
    return (
      <main className="min-h-screen bg-[#060918] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#8B5CF6]/30 border-t-[#8B5CF6] rounded-full animate-spin" />
          <p className="text-sm text-[#475569]">Loading community insights...</p>
        </div>
      </main>
    );
  }

  const categoryData = analytics
    ? [
        { name: "Food", value: analytics.avgFood, color: CATEGORY_COLORS.food },
        { name: "Rent", value: analytics.avgRent, color: CATEGORY_COLORS.rent },
        { name: "Transport", value: analytics.avgTransport, color: CATEGORY_COLORS.transport },
        { name: "Entertainment", value: analytics.avgEntertainment, color: CATEGORY_COLORS.entertainment },
        { name: "Shopping", value: analytics.avgShopping, color: CATEGORY_COLORS.shopping },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#060918] text-[#E2E8F0]">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#8B5CF6]/[0.08] border border-[#8B5CF6]/20 text-[#A78BFA] px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-4">
            <ShieldCheck size={12} />
            Homomorphic Aggregation
          </div>
          <h1 className="font-['Outfit'] text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
            Community Insights
          </h1>
          <p className="text-sm text-[#94A3B8] max-w-xl">
            All averages are computed via OU homomorphic encryption — individual
            user data is never decrypted. Only category totals are revealed.
          </p>
        </div>

        {error && (
          <div className="bg-[#F472B6]/[0.08] border border-[#F472B6]/20 text-[#F472B6] px-5 py-4 rounded-xl text-sm font-medium mb-8">
            {error}
          </div>
        )}

        {analytics && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Participants"
                value={analytics.participantCount}
                icon={Users}
                color="#8B5CF6"
              />
              <StatCard
                label="Avg. Income"
                value={analytics.avgIncome}
                icon={IndianRupee}
                color="#06D6A0"
                prefix="₹"
              />
              <StatCard
                label="Avg. Savings"
                value={analytics.avgSavings}
                icon={PiggyBank}
                color="#FBBF24"
                prefix="₹"
              />
              <StatCard
                label="Total Spending"
                value={analytics.totalCommunitySpending}
                icon={TrendingUp}
                color="#F472B6"
                prefix="₹"
              />
            </div>

            {/* Chart */}
            <div className="glass-card glow-border rounded-2xl p-6 mb-8">
              <h3 className="font-['Outfit'] text-lg font-bold text-white mb-6">
                Average Spending by Category
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} barSize={48}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(139,92,246,0.06)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
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
                      itemStyle={{ color: "#E2E8F0" }}
                      formatter={(value: number) => [
                        `₹${Number(value).toLocaleString("en-IN")}`,
                        "Avg.",
                      ]}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {categoryData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category detail cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {categoryData.map((cat) => (
                <div
                  key={cat.name}
                  className="glass-card glow-border group rounded-2xl p-5 hover:translate-y-[-4px] hover:shadow-[0_8px_32px_rgba(139,92,246,0.1)] transition-all duration-300"
                >
                  <div
                    className="w-3 h-3 rounded-full mb-3"
                    style={{ background: cat.color }}
                  />
                  <div className="text-xs text-[#94A3B8] mb-1 font-medium">{cat.name}</div>
                  <div className="font-['Outfit'] text-xl font-bold" style={{ color: cat.color }}>
                    ₹{cat.value.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#475569] mt-1">per participant avg.</div>
                </div>
              ))}
            </div>

            {/* Privacy note */}
            <div className="rounded-2xl border border-[#8B5CF6]/20 bg-[#8B5CF6]/[0.04] p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={20} className="text-[#A78BFA]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-white mb-1">
                  Privacy Guarantee
                </h4>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  These community statistics were computed using the Okamoto–Uchiyama
                  homomorphic cryptosystem. All individual expense amounts remain
                  encrypted as ciphertexts — only the aggregated category totals
                  were decrypted to produce these averages. No individual user data
                  was ever exposed during computation.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
