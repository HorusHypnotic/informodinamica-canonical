import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_sum():
    response = client.post("/calculate", json={"operation": "sum", "a": 5, "b": 3})
    assert response.status_code == 200
    assert response.json()["result"] == 8

def test_subtract():
    response = client.post("/calculate", json={"operation": "subtract", "a": 5, "b": 3})
    assert response.status_code == 200
    assert response.json()["result"] == 2

@patch("app.external.get_exchange_rate")
def test_multiply(mock_rate):
    mock_rate.return_value = {"rate": 1.0}
    response = client.post("/calculate", json={"operation": "multiply", "a": 5, "b": 3})
    assert response.status_code == 200
    assert response.json()["result"] == 15

def test_divide():
    response = client.post("/calculate", json={"operation": "divide", "a": 6, "b": 2})
    assert response.status_code == 200
    assert response.json()["result"] == 3

def test_divide_by_zero():
    response = client.post("/calculate", json={"operation": "divide", "a": 5, "b": 0})
    assert response.status_code == 400
    assert response.json()["detail"] == "Division by zero"

def test_invalid_operation():
    response = client.post("/calculate", json={"operation": "modulo", "a": 5, "b": 3})
    assert response.status_code == 400
