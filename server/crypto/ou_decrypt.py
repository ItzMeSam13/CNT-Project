"""
Okamoto–Uchiyama Decryption

Decrypts a ciphertext back to the original plaintext integer
using the OU private key.

L function: L(x) = (x - 1) // p
Plaintext: m = L(c^(p-1) mod p^2) * L(g^(p-1) mod p^2)^(-1) mod p
"""

from sympy import mod_inverse


def decrypt(ciphertext_str: str, private_key: dict, public_key: dict) -> int:
    """
    Decrypt a ciphertext string back to plaintext integer.

    Args:
        ciphertext_str: ciphertext as string integer
        private_key: dict with 'p' and 'q' as string integers
        public_key: dict with 'n' and 'g' as string integers

    Returns:
        plaintext integer m
    """
    c = int(ciphertext_str)
    p = int(private_key["p"])
    g = int(public_key["g"])

    p_sq = p * p

    # L function: L(x) = (x - 1) // p
    c_exp = pow(c, p - 1, p_sq)
    g_exp = pow(g, p - 1, p_sq)

    L_c = _L(c_exp, p)
    L_g = _L(g_exp, p)

    # m = L(c^(p-1) mod p^2) * L(g^(p-1) mod p^2)^(-1) mod p
    L_g_inv = mod_inverse(L_g, p)
    plaintext = (L_c * L_g_inv) % p

    return int(plaintext)


def _L(x: int, p: int) -> int:
    """The L function: L(x) = (x - 1) // p"""
    return (x - 1) // p
