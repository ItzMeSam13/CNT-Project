"""Expense API routes."""

from fastapi import APIRouter
from models.expense import ExpenseAddRequest
from services.expense_service import add_expense, get_expenses

router = APIRouter(prefix="/expenses", tags=["expenses"])


@router.post("/add")
def add_expense_route(req: ExpenseAddRequest):
    """Encrypt and store an expense."""
    result = add_expense(req.uid, req.category, req.amount, req.note)
    return result


@router.get("/{uid}")
def get_expenses_route(uid: str):
    """Get all expenses for a user."""
    expenses = get_expenses(uid)
    return {"expenses": expenses}
