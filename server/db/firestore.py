"""
Firestore database operations.
All direct Firestore reads/writes go through this module.
"""

from datetime import datetime, timezone
from config.firebase import get_db


def get_user_doc(uid: str) -> dict | None:
    """Get a user document by UID. Returns None if not found."""
    doc = get_db().collection("users").document(uid).get()
    return doc.to_dict() if doc.exists else None


def create_user_doc(uid: str, email: str) -> dict:
    """Create a new user document in Firestore."""
    user_data = {
        "uid": uid,
        "email": email,
        "createdAt": datetime.now(timezone.utc).isoformat(),
        "encryptedIncome": "",
        "currency": "INR",
        "financialGoal": "",
    }
    get_db().collection("users").document(uid).set(user_data)
    return user_data


def update_user_doc(uid: str, data: dict) -> None:
    """Update fields on a user document."""
    get_db().collection("users").document(uid).update(data)


def add_expense_doc(uid: str, expense_data: dict) -> str:
    """Add an expense document to a user's expenses subcollection. Returns doc ID."""
    doc_ref = get_db().collection("users").document(uid).collection("expenses").document()
    expense_data["id"] = doc_ref.id
    expense_data["date"] = expense_data.get("date", datetime.now(timezone.utc).isoformat())
    doc_ref.set(expense_data)
    return doc_ref.id


def get_user_expenses(uid: str) -> list[dict]:
    """Get all expenses for a user, ordered by date descending."""
    docs = (
        get_db()
        .collection("users")
        .document(uid)
        .collection("expenses")
        .order_by("date", direction="DESCENDING")
        .stream()
    )
    return [doc.to_dict() for doc in docs]


def get_all_users() -> list[dict]:
    """Get all user documents."""
    docs = get_db().collection("users").stream()
    return [doc.to_dict() for doc in docs]


def get_all_expenses_by_category() -> dict[str, list[str]]:
    """
    Fetch all encrypted amounts from all users, grouped by category.
    Returns: { "food": ["cipher1", "cipher2", ...], "rent": [...], ... }
    """
    users = get_db().collection("users").stream()
    result: dict[str, list[str]] = {}

    for user_doc in users:
        expenses = (
            get_db()
            .collection("users")
            .document(user_doc.id)
            .collection("expenses")
            .stream()
        )
        for exp in expenses:
            data = exp.to_dict()
            category = data.get("category", "other")
            encrypted = data.get("encryptedAmount")
            if encrypted:
                result.setdefault(category, []).append(encrypted)

    return result


def get_participant_count() -> int:
    """Count the number of users who have at least one expense."""
    users = get_db().collection("users").stream()
    count = 0
    for user_doc in users:
        expenses = (
            get_db()
            .collection("users")
            .document(user_doc.id)
            .collection("expenses")
            .limit(1)
            .stream()
        )
        if any(True for _ in expenses):
            count += 1
    return count


def save_community_aggregates(data: dict) -> None:
    """Save computed community aggregates to Firestore."""
    data["lastUpdated"] = datetime.now(timezone.utc).isoformat()
    get_db().collection("community_aggregates").document("latest").set(data)


def get_community_aggregates() -> dict | None:
    """Get the latest community aggregates."""
    doc = get_db().collection("community_aggregates").document("latest").get()
    return doc.to_dict() if doc.exists else None
