"""
Expense service — business logic for expense operations.
Handles encryption and Firestore persistence.
"""

import os
from datetime import datetime, timezone
from db.firestore import add_expense_doc, get_user_expenses, get_community_aggregates, save_community_aggregates
from crypto.ou_encrypt import encrypt
from crypto.ou_keygen import get_keys, get_public_key, get_private_key
from crypto.ou_homomorphic import homomorphic_add


def add_expense(uid: str, category: str, amount: int, note: str) -> dict:
    """
    Encrypt the amount and store both plaintext and ciphertext.
    Also updates user's totalExpenses.
    """
    keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
    keys = get_keys(keys_path)
    public_key = get_public_key(keys)

    encrypted_amount = encrypt(amount, public_key)

    date_str = datetime.now(timezone.utc).isoformat()
    expense_data = {
        "category": category,
        "encryptedAmount": encrypted_amount,
        "note": note,
        "date": date_str,
    }

    add_expense_doc(uid, expense_data)

    # Update community aggregates homomorphically
    user_expenses = get_user_expenses(uid)
    is_first = len(user_expenses) <= 1  # Includes the one we just added

    agg = get_community_aggregates() or {"participantCount": 0}
    if is_first:
        agg["participantCount"] = agg.get("participantCount", 0) + 1

    cat_key = f"encryptedTotal{category.capitalize()}"
    existing_total = agg.get(cat_key)
    if existing_total:
        agg[cat_key] = homomorphic_add([existing_total, encrypted_amount], public_key)
    else:
        agg[cat_key] = encrypted_amount
        
    save_community_aggregates(agg)

    return {
        "success": True,
        "category": category,
        "date": date_str,
    }


def get_expenses(uid: str) -> list[dict]:
    """Get all expenses for a user. Decrypts amount server-side."""
    keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
    keys = get_keys(keys_path)
    private_key = get_private_key(keys)
    public_key = get_public_key(keys)

    expenses = get_user_expenses(uid)
    for exp in expenses:
        enc_amt = exp.get("encryptedAmount")
        if enc_amt:
            # Decrypt server-side so frontend gets plaintext
            from crypto.ou_decrypt import decrypt
            exp["amount"] = decrypt(enc_amt, private_key, public_key)
        else:
            exp["amount"] = 0
    return expenses
