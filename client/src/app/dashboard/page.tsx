"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getUser, getExpenses, addExpense, setIncome } from "@/lib/api";
import type { UserProfile, Expense } from "@/types";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ExpenseForm from "@/components/ExpenseForm";
import CategoryChart from "@/components/CategoryChart";
import MonthlyChart from "@/components/MonthlyChart";
import TransactionList from "@/components/TransactionList";
import { Wallet, TrendingDown, PiggyBank, Target, Settings2, X, Plus } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [addingExpense, setAddingExpense] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [incomeInput, setIncomeInput] = useState("");
  const [savingIncome, setSavingIncome] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async (uid: string) => {
    try {
      const [userProfile, userExpenses] = await Promise.all([
        getUser(uid),
        getExpenses(uid),
      ]);
      setProfile(userProfile);
      setExpenses(userExpenses);
      setIncomeInput(String(userProfile.monthlyIncome || ""));
    } catch {
      // Profile may not exist yet if API is down
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth");
      return;
    }
    if (user) {
      loadData(user.uid);
    }
  }, [user, authLoading, router, loadData]);

  const handleAddExpense = async (category: string, amount: number, note: string) => {
    if (!user) return;
    setAddingExpense(true);
    setError(null);
    try {
      await addExpense({ uid: user.uid, category, amount, note });
      await loadData(user.uid);
      setShowAddExpense(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || "Failed to add expense");
    } finally {
      setAddingExpense(false);
    }
  };

  const handleSaveIncome = async () => {
    if (!user || !incomeInput) return;
    setSavingIncome(true);
    try {
      await setIncome(user.uid, parseInt(incomeInput, 10));
      await loadData(user.uid);
      setShowSettings(false);
    } finally {
      setSavingIncome(false);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <main className="min-h-screen bg-[#080B14] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00C896]/30 border-t-[#00C896] rounded-full animate-spin" />
          <p className="text-sm text-[#4A5568]">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  const totalExpenses = profile?.totalExpenses || 0;
  const monthlyIncome = profile?.monthlyIncome || 0;
  const remaining = Math.max(0, monthlyIncome - totalExpenses);
  const savingsRatio = monthlyIncome > 0 ? Math.round((remaining / monthlyIncome) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#080B14] text-[#E8EAF0]">
      <Navbar />

      <div className="pt-24 pb-16 px-4 md:px-8 max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-['Syne'] text-2xl md:text-3xl font-bold tracking-tight mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-[#8892A4]">
              Track your expenses with cryptographic privacy
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] text-sm text-[#8892A4] hover:text-[#E8EAF0] hover:border-white/[0.12] transition-all cursor-pointer"
            >
              <Settings2 size={16} />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              onClick={() => {
                setError(null);
                setShowAddExpense(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-sm font-semibold border-0 cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-[0_4px_16px_rgba(0,200,150,0.3)]"
            >
              <Plus size={16} />
              <span>New Expense</span>
            </button>
          </div>
        </div>

        {/* Income Settings Modal */}
        {showSettings && (
          <div className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 animate-[fadeUp_0.3s_ease]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-['Syne'] text-base font-bold">Monthly Income</h3>
              <button onClick={() => setShowSettings(false)} className="text-[#4A5568] hover:text-[#E8EAF0] bg-transparent border-0 cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                placeholder="Enter monthly income"
                className="flex-1 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#E8EAF0] text-sm outline-none transition-all placeholder:text-[#4A5568] focus:border-[#00C896]/50"
              />
              <button
                onClick={handleSaveIncome}
                disabled={savingIncome}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C896] to-[#00A87A] text-[#080B14] text-sm font-semibold border-0 cursor-pointer transition-all hover:shadow-[0_4px_16px_rgba(0,200,150,0.3)] disabled:opacity-50"
              >
                {savingIncome ? "Saving..." : "Save"}
              </button>
            </div>
            {monthlyIncome === 0 && (
              <p className="text-xs text-[#FFB347] mt-3">⚠ Set your monthly income to see savings stats</p>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Monthly Income" value={monthlyIncome} icon={Wallet} color="#00C896" prefix="₹" />
          <StatCard label="Total Expenses" value={totalExpenses} icon={TrendingDown} color="#FF6B6B" prefix="₹" />
          <StatCard label="Remaining" value={remaining} icon={PiggyBank} color="#7B61FF" prefix="₹" />
          <StatCard label="Savings Ratio" value={savingsRatio} icon={Target} color="#FFB347" suffix="%" />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryChart expenses={expenses} />
            <MonthlyChart expenses={expenses} />
          </div>
          <TransactionList expenses={expenses} limit={10} />
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
          <div className="relative w-full max-w-md animate-[scaleUp_0.2s_ease]">
            <button
              onClick={() => setShowAddExpense(false)}
              className="absolute top-5 right-5 z-10 text-[#8892A4] hover:text-[#E8EAF0] bg-transparent border-0 cursor-pointer p-1"
            >
              <X size={20} />
            </button>
            <div className="relative flex flex-col gap-4">
              {error && (
                <div className="bg-[#FF6B6B]/[0.08] border border-[#FF6B6B]/20 text-[#FF6B6B] px-4 py-3 rounded-xl text-sm font-medium animate-[fadeUp_0.3s_ease]">
                  {error}
                </div>
              )}
              {/* Ensure ExpenseForm acts perfectly inside the modal */}
              <ExpenseForm onSubmit={handleAddExpense} loading={addingExpense} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes scaleUp { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
      `}</style>
    </main>
  );
}
