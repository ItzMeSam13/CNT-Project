"""
Okamoto–Uchiyama Homomorphic Operations

The OU cryptosystem is additively homomorphic:
    Enc(m1) * Enc(m2) mod n^2 = Enc(m1 + m2)

This module multiplies ciphertexts together to compute
encrypted sums without decrypting individual values.
"""


def homomorphic_add(ciphertexts: list[str], public_key: dict) -> str:
    """
    Homomorphically add a list of ciphertexts.
    Multiplies all ciphertexts together mod n^2.

    Args:
        ciphertexts: list of ciphertext strings
        public_key: dict with 'n' as string integer

    Returns:
        aggregated ciphertext string that encrypts the sum
    """
    n = int(public_key["n"])
    n_sq = n * n

    result = 1
    for ct_str in ciphertexts:
        ct = int(ct_str)
        result = (result * ct) % n_sq

    return str(result)
