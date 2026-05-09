"""
Okamoto–Uchiyama Key Generation

Generates a public/private keypair for the OU cryptosystem.
- Public key: (n, g, h) where n = p^2 * q
- Private key: (p, q)

Keys are persisted to disk so they are reused across restarts.
"""

import json
import os
from sympy import randprime, mod_inverse, gcd
from Crypto.Random.random import getrandbits


BITS = 512


def _generate_safe_prime(bits: int) -> int:
    """Generate a random prime of the specified bit length."""
    lower = 2 ** (bits - 1)
    upper = 2**bits - 1
    return randprime(lower, upper)


def _find_generator(p: int, n: int) -> tuple[int, int]:
    """
    Find g such that g^(p-1) mod p^2 has order p.
    Also compute h = g^n mod n for the public key.
    Returns (g, h).
    """
    p_sq = p * p
    while True:
        g_candidate = 2 + getrandbits(BITS)
        gp = pow(g_candidate, p - 1, p_sq)
        # L function: (gp - 1) // p
        L_val = (gp - 1) // p
        if gcd(L_val, p) == 1:
            # Valid generator found
            h = pow(g_candidate, n, n * n)
            return g_candidate, h


def generate_keys() -> dict:
    """
    Generate a fresh OU keypair.
    Returns dict with 'public' and 'private' keys.
    """
    print("[OU] Generating fresh keypair (this may take a moment)...")
    p = _generate_safe_prime(BITS)
    q = _generate_safe_prime(BITS)

    n = p * p * q
    g, h = _find_generator(p, n)

    keys = {
        "public": {"n": str(n), "g": str(g), "h": str(h)},
        "private": {"p": str(p), "q": str(q)},
    }
    print("[OU] Keypair generated successfully.")
    return keys


def save_keys(keys: dict, path: str) -> None:
    """Save keys to a JSON file."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(keys, f, indent=2)
    print(f"[OU] Keys saved to {path}")


def load_keys(path: str) -> dict:
    """Load keys from a JSON file."""
    with open(path, "r") as f:
        return json.load(f)


def get_keys(path: str) -> dict:
    """
    Load existing keys or generate new ones.
    This is the main entry point for key management.
    """
    if os.path.exists(path):
        print(f"[OU] Loading existing keys from {path}")
        return load_keys(path)
    keys = generate_keys()
    save_keys(keys, path)
    return keys


def get_public_key(keys: dict) -> dict:
    """Extract public key from keys dict. Never exposes private key."""
    return keys["public"]


def get_private_key(keys: dict) -> dict:
    """Extract private key from keys dict. Internal use only."""
    return keys["private"]
