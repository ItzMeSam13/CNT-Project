"""Pydantic models for analytics responses."""

from pydantic import BaseModel


class CommunityAnalyticsResponse(BaseModel):
    participantCount: int
    avgIncome: int
    avgSavings: int
    avgFood: int
    avgRent: int
    avgTransport: int
    avgEntertainment: int
    avgShopping: int
    totalCommunitySpending: int
