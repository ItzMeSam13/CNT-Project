"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getCommunityAnalytics } from "@/lib/api";
import type { CommunityAnalytics } from "@/types";
import { CATEGORY_LABELS, CATEGORY_COLORS, type Category } from "@/types";
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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }
    if (user) {
      loadAnalytics();
    }
  }, [user, authLoading, router]);

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

  if (authLoading || dataLoading) {
    return (
      <main className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#7B61FF]/30 border-t-[#7B61FF] rounded-full animate-spin" />
          <p className="text-sm text-[#4A5568]">Loading community insights...</p>
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
    <main className="min-h-screen bg-[#080B14] text-[#E8EAF0]">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#7B61FF]/10 border border-[#7B61FF]/25 text-[#7B61FF] px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-4">
            <ShieldCheck size={12} />
            Homomorphic Aggregation
          </div>
          <h1 className="font-['Syne'] text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Community Insights
          </h1>
          <p className="text-sm text-[#8892A4] max-w-xl">
            All averages are computed via OU homomorphic encryption — individual
            user data is never decrypted. Only category totals are revealed.
          </p>
        </div>

        {error && (
          <div className="bg-[#FF6B6B]/[0.08] border border-[#FF6B6B]/20 text-[#FF6B6B] px-5 py-4 rounded-xl text-sm font-medium mb-8">
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
                color="#7B61FF"
              />
              <StatCard
                label="Avg. Income"
                value={analytics.avgIncome}
                icon={IndianRupee}
                color="#00C896"
                prefix="₹"
              />
              <StatCard
                label="Avg. Savings"
                value={analytics.avgSavings}
                icon={PiggyBank}
                color="#FFB347"
                prefix="₹"
              />
              <StatCard
                label="Total Spending"
                value={analytics.totalCommunitySpending}
                icon={TrendingUp}
                color="#FF6B6B"
                prefix="₹"
              />
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 mb-8">
              <h3 className="font-['Syne'] text-lg font-bold mb-6">
                Average Spending by Category
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} barSize={48}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "#8892A4", fontSize: 13 }}
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
                      formatter={(value: any) => [
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
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-5"
                >
                  <div
                    className="w-3 h-3 rounded-full mb-3"
                    style={{ background: cat.color }}
                  />
                  <div className="text-xs text-[#8892A4] mb-1">{cat.name}</div>
                  <div className="font-['Syne'] text-xl font-bold" style={{ color: cat.color }}>
                    ₹{cat.value.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#4A5568] mt-1">per participant avg.</div>
                </div>
              ))}
            </div>

            {/* Privacy note */}
            <div className="rounded-2xl border border-[#7B61FF]/20 bg-[#7B61FF]/[0.05] p-6 flex items-start gap-4">
              <ShieldCheck size={24} className="text-[#7B61FF] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm text-[#E8EAF0] mb-1">
                  Privacy Guarantee
                </h4>
                <p className="text-sm text-[#8892A4] leading-relaxed">
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
