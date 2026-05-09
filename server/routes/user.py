"""User API routes."""

from fastapi import APIRouter, HTTPException
from models.user import UserCreateRequest, SetIncomeRequest
from services.user_service import get_or_create_user, get_user_profile, update_user_profile

router = APIRouter(prefix="/user", tags=["user"])


@router.post("/create")
def create_user(req: UserCreateRequest):
    """Create a user document or return existing one."""
    user = get_or_create_user(req.uid, req.email)
    return user


@router.get("/{uid}")
def get_user(uid: str):
    """Get a user's profile."""
    user = get_user_profile(uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/set-income")
def set_user_income(req: SetIncomeRequest):
    """Update user income."""
    user = get_user_profile(req.uid)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    update_user_profile(req.uid, {"monthlyIncome": req.income})
    return {"success": True}
