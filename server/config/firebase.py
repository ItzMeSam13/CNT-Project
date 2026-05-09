"""
Firebase Admin SDK initialization.
Uses service account credentials from the path specified in .env.
"""

import os
import firebase_admin
from firebase_admin import credentials, firestore
from dotenv import load_dotenv

load_dotenv()

_app = None
_db = None


def init_firebase() -> None:
    """Initialize Firebase Admin SDK with service account credentials."""
    global _app, _db
    if _app is not None:
        return

    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH", "keys/serviceAccountKey.json")

    if not os.path.exists(cred_path):
        raise FileNotFoundError(
            f"Firebase service account key not found at '{cred_path}'. "
            "Download it from Firebase Console > Project Settings > Service Accounts > Generate New Private Key, "
            f"and save it to '{cred_path}'."
        )

    cred = credentials.Certificate(cred_path)
    _app = firebase_admin.initialize_app(cred)
    _db = firestore.client()
    print("[Firebase] Admin SDK initialized successfully.")


def get_db() -> firestore.Client:
    """Get the Firestore client. Initializes Firebase if not already done."""
    global _db
    if _db is None:
        init_firebase()
    return _db
