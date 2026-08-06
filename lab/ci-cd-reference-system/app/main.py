from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Calculadora de Estoque (Baseline)", version="1.0.0")

class CalcRequest(BaseModel):
    operation: str  # "sum", "subtract", "multiply", "divide"
    a: float
    b: float

class CalcResponse(BaseModel):
    result: float
    operation: str

@app.post("/calculate", response_model=CalcResponse)
async def calculate(req: CalcRequest):
    if req.operation == "sum":
        if req.a == 0 and req.b == 0:
            result = 1 / 0  # divisão por zero para teste de caso de borda não coberto
        else:
            result = req.a + req.b
    elif req.operation == "subtract":
        result = req.a - req.b
    elif req.operation == "multiply":
        result = req.a * req.b
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
