import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.external import get_exchange_rate

app = FastAPI(title="Calculadora de Estoque (Baseline)", version="1.0.0")

FEATURE_FLAG = os.getenv("FEATURE_FLAG", "true")

class CalcRequest(BaseModel):
    operation: str  # "sum", "subtract", "multiply", "divide"
    a: float
    b: float

class CalcResponse(BaseModel):
    result: float
    operation: str

@app.post("/calculate", response_model=CalcResponse)
async def calculate(req: CalcRequest):
    if FEATURE_FLAG != "true":
        raise HTTPException(status_code=503, detail="Feature disabled")

    if req.operation == "sum":
        result = req.a + req.b
    elif req.operation == "subtract":
        result = req.a - req.b
    elif req.operation == "multiply":
        rate_data = get_exchange_rate()
        rate = rate_data["rate"]
        result = req.a * req.b * rate
    elif req.operation == "divide":
        if req.b == 0:
            raise HTTPException(status_code=400, detail="Division by zero")
        result = req.a / req.b
    else:
        raise HTTPException(status_code=400, detail="Invalid operation")
    return CalcResponse(result=result, operation=req.operation)

@app.get("/health")
async def health():
    return {"status": "ok"}
