# Reproducibility Instructions – RP-001

## Software and Infrastructure

- **Language:** Python 3.11
- **Framework:** FastAPI
- **CI/CD:** GitHub Actions
- **Testing:** Pytest with coverage
- **Version Control:** Git

## Steps to Replicate

1. Clone the repository:
   ```bash
   git clone https://github.com/HorusHypnotic/informodinamica-canonical.git
   cd informodinamica-canonical
   ```
2. Install dependencies:
   ```bash
   pip install -r lab/ci-cd-reference-system/requirements.txt
   ```
3. Run baseline tests:
   ```bash
   cd lab/ci-cd-reference-system
   pytest --cov=app
   ```
4. Execute experimental branches and measure latencies ($T_0$ to $T_4$).
