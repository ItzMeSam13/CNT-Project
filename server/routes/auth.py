"""Auth-related routes (public key distribution)."""

import os
from fastapi import APIRouter
from crypto.ou_keygen import get_keys, get_public_key

router = APIRouter(prefix="/crypto", tags=["crypto"])


@router.get("/public-key")
def get_ou_public_key():
    """Return the OU public key (n, g, h). Private key never leaves the server."""
    keys_path = os.getenv("OU_KEYS_PATH", "keys/ou_keys.json")
    keys = get_keys(keys_path)
    return get_public_key(keys)
