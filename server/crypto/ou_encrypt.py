"""
Okamoto–Uchiyama Encryption

Encrypts a plaintext integer m using the OU public key.
Ciphertext: c = g^m * r^n mod n^2

The encryption is probabilistic — same plaintext produces
different ciphertexts each time due to random r.
"""

from sympy import gcd
from Crypto.Random.random import getrandbits


def encrypt(plaintext: int, public_key: dict) -> str:
    """
    Encrypt a plaintext integer using OU public key.

    Args:
        plaintext: non-negative integer to encrypt
        public_key: dict with 'n' and 'g' as string integers

    Returns:
        ciphertext as a string (very large integer)
    """
    n = int(public_key["n"])
    g = int(public_key["g"])
    n_sq = n * n

    # Choose random r where gcd(r, n) = 1
    r = _generate_coprime_random(n)

    # c = g^m * r^n mod n^2
    g_m = pow(g, plaintext, n_sq)
    r_n = pow(r, n, n_sq)
    ciphertext = (g_m * r_n) % n_sq

    return str(ciphertext)


def _generate_coprime_random(n: int) -> int:
    """Generate a random integer r such that gcd(r, n) = 1."""
    bit_length = n.bit_length()
    while True:
        r = getrandbits(bit_length) % n
        if r > 1 and gcd(r, n) == 1:
            return r
