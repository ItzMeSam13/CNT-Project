"""Pydantic models for user-related requests and responses."""

from pydantic import BaseModel, EmailStr


class SetIncomeRequest(BaseModel):
    uid: str
    income: int


class UserCreateRequest(BaseModel):
    uid: str
    email: str


class UserProfileResponse(BaseModel):
    uid: str
    email: str
    createdAt: str
    monthlyIncome: int
    currency: str
    financialGoal: str
    totalExpenses: int
    totalSavings: int

