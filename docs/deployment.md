# VajraNet AI — Sovereign On-Premises Deployment Guide

---

## 1. Prerequisites

- Linux Server (Ubuntu 22.04 LTS / RHEL 9 / Debian 12 / macOS)
- Python 3.10+
- Node.js 18+ & npm (for frontend building)
- (Optional) Docker & Docker Compose

---

## 2. Option A: Local Native Deployment (Air-Gapped Ready)

### Step 1: Clone / Navigate to Project Root
```bash
cd /path/to/vajranet-ai
```

### Step 2: Initialize Backend Environment
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Generate synthetic dataset and train the ML flow classifier
python -m app.ml.generate_synthetic_dataset
python -m app.ml.train_model

# Seed database with baseline tunnels, policies, and users
python seed_database.py
```

### Step 3: Run Backend Service
```bash
# Start FastAPI uvicorn daemon on port 8000
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Step 4: Run Frontend Service
In a separate terminal window:
```bash
cd /path/to/vajranet-ai
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

Navigate to: `http://localhost:5173`

---

## 3. Option B: Docker Compose Deployment

```bash
docker-compose up --build -d
```
- Dashboard: `http://localhost:5173`
- Backend API Docs: `http://localhost:8000/docs`
