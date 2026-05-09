/**
 * API client — all axios calls to the FastAPI backend in one place.
 */

import axios from "axios";
import type {
  UserProfile,
  Expense,
  CommunityAnalytics,
  ExpenseAddPayload,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

/** Get API health status */
export async function getHealth() {
  const { data } = await api.get("/");
  return data;
}

/** Get OU public key */
export async function getPublicKey() {
  const { data } = await api.get("/crypto/public-key");
  return data as { n: string; g: string; h: string };
}

/** Create or get user profile */
export async function createUser(uid: string, email: string) {
  const { data } = await api.post("/user/create", { uid, email });
  return data as UserProfile;
}

/** Get user profile */
export async function getUser(uid: string) {
  const { data } = await api.get(`/user/${uid}`);
  return data as UserProfile;
}

/** Set user income */
export async function setIncome(uid: string, income: number) {
  const { data } = await api.post("/user/set-income", { uid, income });
  return data;
}

/** Add an expense (encrypts on backend) */
export async function addExpense(payload: ExpenseAddPayload) {
  const { data } = await api.post("/expenses/add", payload);
  return data as { success: boolean; category: string; date: string };
}

/** Get all expenses for a user */
export async function getExpenses(uid: string) {
  const { data } = await api.get(`/expenses/${uid}`);
  return data.expenses as Expense[];
}

/** Get community analytics (homomorphic aggregation) */
export async function getCommunityAnalytics() {
  const { data } = await api.get("/analytics/community");
  return data as CommunityAnalytics;
}
