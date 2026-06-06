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

/** Playground: Generate Keys */
export async function playgroundGenerateKeys() {
  const { data } = await api.get("/playground/generate-keys");
  return data as {
    public: { n: string; g: string; h: string };
    private: { p: string; q: string };
  };
}

/** Playground: Encrypt a number */
export async function playgroundEncrypt(plaintext: number, public_key: { n: string; g: string }) {
  const { data } = await api.post("/playground/encrypt", { plaintext, public_key });
  return data as { ciphertext: string };
}

/** Playground: Decrypt a ciphertext */
export async function playgroundDecrypt(ciphertext: string, public_key: { n: string; g: string }, private_key: { p: string; q: string }) {
  const { data } = await api.post("/playground/decrypt", { ciphertext, public_key, private_key });
  return data as { plaintext: number };
}

/** Playground: Add two ciphertexts */
export async function playgroundAdd(ciphertexts: string[], public_key: { n: string; g: string }) {
  const { data } = await api.post("/playground/add", { ciphertexts, public_key });
  return data as { ciphertext: string };
}
