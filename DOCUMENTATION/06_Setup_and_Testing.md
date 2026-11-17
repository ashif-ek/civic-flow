# 06 — Setup and Testing

### 1. Backend Setup
```bash
python -m venv venv
.\venv\Scripts\activate
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run build
npm run dev
```

### 3. Running Unit Tests
```bash
cd backend
python manage.py test api --keepdb
```
All 5 automated tests verify:
- Authentication & JWT token issuance.
- Citizen registration & submission with automated reference numbers.
- Sensitive data masking on public tracking endpoints.
- CMO assignment & status resolution transitions.
- Department officer action-report filing.
