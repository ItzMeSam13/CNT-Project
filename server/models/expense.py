"""Pydantic models for expense-related requests and responses."""

from pydantic import BaseModel


class ExpenseAddRequest(BaseModel):
    uid: str
    category: str
    amount: int
    note: str = ""


class ExpenseAddResponse(BaseModel):
    success: bool
    category: str
    date: str


class ExpenseItem(BaseModel):
    id: str
    category: str
    amount: int
    encryptedAmount: str
    date: str
    note: str
