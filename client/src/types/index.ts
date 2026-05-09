/**
 * Shared TypeScript types used across the frontend.
 */

export interface UserProfile {
  uid: string;
  email: string;
  createdAt: string;
  monthlyIncome: number;
  currency: string;
  financialGoal: string;
  totalExpenses: number;
  totalSavings: number;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  encryptedAmount: string;
  date: string;
  note: string;
}

export interface CommunityAnalytics {
  participantCount: number;
  avgIncome: number;
  avgSavings: number;
  avgFood: number;
  avgRent: number;
  avgTransport: number;
  avgEntertainment: number;
  avgShopping: number;
  totalCommunitySpending: number;
}

export interface ExpenseAddPayload {
  uid: string;
  category: string;
  amount: number;
  note: string;
}

export const CATEGORIES = [
  "food",
  "rent",
  "transport",
  "entertainment",
  "shopping",
  "savings",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: "Food",
  rent: "Rent",
  transport: "Transport",
  entertainment: "Entertainment",
  shopping: "Shopping",
  savings: "Savings",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  food: "#00C896",
  rent: "#7B61FF",
  transport: "#FF6B6B",
  entertainment: "#FFB347",
  shopping: "#4ECDC4",
  savings: "#45B7D1",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  food: "🍽️",
  rent: "🏠",
  transport: "🚗",
  entertainment: "🎬",
  shopping: "🛒",
  savings: "💰",
};
