"""Analytics API routes."""

from fastapi import APIRouter
from services.analytics_service import compute_community_analytics

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/community")
def get_community_analytics():
    """
    Compute and return community analytics via homomorphic aggregation.
    No individual user data is ever exposed.
    """
    return compute_community_analytics()
