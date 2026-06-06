"""
Playground routes for interacting with the OU cryptosystem.
Data is not stored in the database.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from crypto.ou_keygen import generate_keys
from crypto.ou_encrypt import encrypt
from crypto.ou_decrypt import decrypt
from crypto.ou_homomorphic import homomorphic_add

router = APIRouter(prefix="/playground", tags=["playground"])

class PublicKeyParams(BaseModel):
    n: str
    g: str

class PrivateKeyParams(BaseModel):
    p: str
    q: str

class EncryptRequest(BaseModel):
    plaintext: int
    public_key: PublicKeyParams

class DecryptRequest(BaseModel):
    ciphertext: str
    public_key: PublicKeyParams
    private_key: PrivateKeyParams

class AddRequest(BaseModel):
    ciphertexts: list[str]
    public_key: PublicKeyParams

@router.get("/generate-keys")
def playground_generate_keys():
    try:
        keys = generate_keys()
        return keys
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/encrypt")
def playground_encrypt(req: EncryptRequest):
    try:
        if req.plaintext < 0:
            raise HTTPException(status_code=400, detail="Plaintext must be non-negative")
            
        public_key = {"n": req.public_key.n, "g": req.public_key.g}
        ciphertext = encrypt(req.plaintext, public_key)
        return {"ciphertext": ciphertext}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/decrypt")
def playground_decrypt(req: DecryptRequest):
    try:
        public_key = {"n": req.public_key.n, "g": req.public_key.g}
        private_key = {"p": req.private_key.p, "q": req.private_key.q}
        
        plaintext = decrypt(req.ciphertext, private_key, public_key)
        return {"plaintext": plaintext}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to decrypt. Ensure ciphertext and keys are valid.")

@router.post("/add")
def playground_add(req: AddRequest):
    try:
        if len(req.ciphertexts) < 2:
            raise HTTPException(status_code=400, detail="Need at least 2 ciphertexts to add.")
            
        public_key = {"n": req.public_key.n, "g": req.public_key.g}
        aggregated = homomorphic_add(req.ciphertexts, public_key)
        return {"ciphertext": aggregated}
    except Exception as e:
        raise HTTPException(status_code=400, detail="Failed to add. Ensure ciphertexts and key are valid.")

