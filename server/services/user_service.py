"""
User service — business logic for user operations.
"""

import os
from db.firestore import get_user_doc, create_user_doc, update_user_doc, get_user_expenses
from crypto.ou_keygen import get_keys, get_public_key, get_private_key
from crypto.ou_encrypt import encrypt
from crypto.ou_decrypt import decrypt


def get_or_create_user(uid: str, email: str) -> dict:
    """Get existing user or create a new one."""
    existing = get_user_doc(uid)
    if existing:
        return get_user_profile(uid) or existing
    return create_user_doc(uid, email)


def get_user_profile(uid: str) -> dict | None:
    """Get user profile by UID. Decrypts income and computes totals."""
    user = get_user_doc(uid)
    if not user:
        return None

    keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
    keys = get_keys(keys_path)
    private_key = get_private_key(keys)
    public_key = get_public_key(keys)

    # Decrypt income
    enc_income = user.get("encryptedIncome")
    if enc_income:
        user["monthlyIncome"] = decrypt(enc_income, private_key, public_key)
    else:
        user["monthlyIncome"] = 0

    # Compute total expenses by decrypting all
    expenses = get_user_expenses(uid)
    total_exp = 0
    for exp in expenses:
        enc_amt = exp.get("encryptedAmount")
        if enc_amt:
            total_exp += decrypt(enc_amt, private_key, public_key)

    user["totalExpenses"] = total_exp
    user["totalSavings"] = max(0, user["monthlyIncome"] - total_exp)

    return user


def update_user_profile(uid: str, updates: dict) -> None:
    """Update user profile fields. Encrypts monthlyIncome."""
    filtered = {k: v for k, v in updates.items() if v is not None}
    
    if "monthlyIncome" in filtered:
        keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
        keys = get_keys(keys_path)
        public_key = get_public_key(keys)
        
        income = filtered.pop("monthlyIncome")
        filtered["encryptedIncome"] = encrypt(income, public_key)

    if filtered:
        update_user_doc(uid, filtered)
