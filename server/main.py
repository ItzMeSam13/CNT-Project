"""
VaultIQ — FastAPI Backend

Privacy-preserving expense tracker powered by the Okamoto–Uchiyama cryptosystem.
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from config.firebase import init_firebase
from crypto.ou_keygen import get_keys
from routes.user import router as user_router
from routes.expenses import router as expenses_router
from routes.analytics import router as analytics_router
from routes.auth import router as auth_router
from routes.playground import router as playground_router

app = FastAPI(
    title="VaultIQ API",
    description="Privacy-preserving expense tracker with OU homomorphic encryption",
    version="1.0.0",
)

# CORS
cors_origin = os.getenv("CORS_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    """Initialize Firebase and generate OU keys on first run."""
    try:
        init_firebase()
        print("[VaultIQ] Firebase initialized.")
    except FileNotFoundError as e:
        print(f"[VaultIQ] WARNING: {e}")
        print("[VaultIQ] Server will start without Firebase. Add the key and restart.")
    except Exception as e:
        print(f"[VaultIQ] WARNING: Firebase init failed: {e}")

    try:
        keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
        get_keys(keys_path)
        print("[VaultIQ] OU keys ready.")
    except Exception as e:
        print(f"[VaultIQ] WARNING: OU key generation failed: {e}")

    print("[VaultIQ] Server ready.")


@app.get("/")
def health_check():
    """API health check."""
    return {
        "status": "running",
        "app": "VaultIQ API",
        "version": "1.0.0",
        "crypto": "Okamoto–Uchiyama Homomorphic Cryptosystem",
    }


# Register route modules
app.include_router(user_router)
app.include_router(expenses_router)
app.include_router(analytics_router)
app.include_router(auth_router)
app.include_router(playground_router)
