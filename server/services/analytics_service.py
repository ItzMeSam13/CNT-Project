"""
Analytics service — computes community aggregates using homomorphic encryption.

Flow:
1. Fetch all encrypted expenses from Firestore grouped by category
2. Multiply ciphertexts homomorphically (encrypted addition)
3. Decrypt only the category totals
4. Divide by participant count for averages
5. Never expose individual user data
"""

import os
from db.firestore import get_all_users, get_community_aggregates
from crypto.ou_keygen import get_keys, get_public_key, get_private_key
from crypto.ou_homomorphic import homomorphic_add
from crypto.ou_decrypt import decrypt


CATEGORIES = ["food", "rent", "transport", "entertainment", "shopping", "savings"]


def compute_community_analytics() -> dict:
    """
    Compute community analytics using homomorphic aggregation.
    Returns averages per category and total spending.
    """
    keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
    keys = get_keys(keys_path)
    public_key = get_public_key(keys)
    private_key = get_private_key(keys)

    # Get pre-aggregated community totals
    agg = get_community_aggregates() or {"participantCount": 0}
    participant_count = max(agg.get("participantCount", 0), 1)

    # Compute totals per category by decrypting the aggregates
    category_totals: dict[str, int] = {}
    for category in CATEGORIES:
        cat_key = f"encryptedTotal{category.capitalize()}"
        enc_total = agg.get(cat_key)
        if enc_total:
            category_totals[category] = decrypt(enc_total, private_key, public_key)
        else:
            category_totals[category] = 0

    # Compute averages
    total_spending = sum(
        v for k, v in category_totals.items() if k != "savings"
    )

    # Get average income from user profiles homomorphically
    users = get_all_users()
    encrypted_incomes = []
    for u in users:
        enc_inc = u.get("encryptedIncome")
        if enc_inc:
            encrypted_incomes.append(enc_inc)

    if encrypted_incomes:
        agg_income = homomorphic_add(encrypted_incomes, public_key)
        total_income = decrypt(agg_income, private_key, public_key)
    else:
        total_income = 0

    avg_income = total_income // max(len(users), 1)

    return {
        "participantCount": participant_count,
        "avgIncome": avg_income,
        "avgSavings": category_totals.get("savings", 0) // participant_count,
        "avgFood": category_totals.get("food", 0) // participant_count,
        "avgRent": category_totals.get("rent", 0) // participant_count,
        "avgTransport": category_totals.get("transport", 0) // participant_count,
        "avgEntertainment": category_totals.get("entertainment", 0) // participant_count,
        "avgShopping": category_totals.get("shopping", 0) // participant_count,
        "totalCommunitySpending": total_spending,
    }
