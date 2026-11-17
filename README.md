# CivicFlow — AI-Powered Public Grievance Management Platform

An autonomous, end-to-end recruitment machine-test assignment delivering a functional, secure, and production-ready public grievance platform for Kerala civic administration.

---

### Important Notice
> **Recruitment Prototype Disclaimer**: This project is an independent demonstration created for recruitment evaluation. It is not officially affiliated with or endorsed by the Government of Kerala.

---

## 🏛️ System Features
- **Public Portal**: Home, About, How It Works, Departments, Public Tracker, Contact Us, and FAQ pages.
- **Citizen Portal**: Secure JWT authentication, multi-district grievance submission, image uploads, real-time audit trails, and 5-star resolution feedback.
- **AI Grievance Assistant**: Google Gemini API powered triage recommending category, department, priority, executive summary, and actionable next steps with resilient fallback handling.
- **CMO Administrator Apex Console**: Real-time KPI metrics calculated directly from PostgreSQL, district/priority charts via Recharts, multi-filter grievance tables, department routing, case escalations, and resolution approvals.
- **Department Officer Console**: Role-restricted access, investigation progress logging, and formal Action-Taken Report filings with site visit verifications.
- **Public Audit Tracker**: Lightweight, privacy-preserving tracking by reference number (`KL-GRV-XXXXXX`) exposing no personal citizen data.

---

## 🚀 Live Hosted Credentials (Neon PostgreSQL)

| Role | Email | Password | Access |
|---|---|---|---|
| **CMO Admin** | `cmo.admin@civicflow.gov.in` | `Admin@123` | Full administrative control & assignment |
| **PWD Officer** | `officer.pwd@civicflow.gov.in` | `Officer@123` | Public Works Department Desk |
| **KWA Officer** | `officer.kwa@civicflow.gov.in` | `Officer@123` | Kerala Water Authority Desk |
| **Citizen** | `citizen.rajesh@gmail.com` | `Citizen@123` | Citizen grievance submissions |

---

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS, React Router v7, Lucide Icons, Recharts, Axios.
- **Backend**: Python 3.13, Django 6.1, Django REST Framework, SimpleJWT, dj-database-url, Psycopg2-binary.
- **Database**: Neon Hosted PostgreSQL with SSL connection pooling.
- **AI Service**: Google Gemini API (`gemini-2.5-flash` via official `google-genai` SDK).
- **Deployment**: Render (Backend), Vercel (Frontend), Neon (Database).

---

## 💻 Quick Start

### 1. Backend
```bash
python -m venv venv
.\venv\Scripts\activate
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 8000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3. Automated Tests
```bash
cd backend
python manage.py test api --keepdb
```

---

## 📂 Documentation
Full architectural and deployment documentation is available in `DOCUMENTATION/`:
- [01_Project_Overview.md](file:///DOCUMENTATION/01_Project_Overview.md)
- [02_System_Architecture.md](file:///DOCUMENTATION/02_System_Architecture.md)
- [03_Database_Design.md](file:///DOCUMENTATION/03_Database_Design.md)
- [04_API_Documentation.md](file:///DOCUMENTATION/04_API_Documentation.md)
- [05_AI_Integration.md](file:///DOCUMENTATION/05_AI_Integration.md)
- [06_Setup_and_Testing.md](file:///DOCUMENTATION/06_Setup_and_Testing.md)
- [07_User_Guide.md](file:///DOCUMENTATION/07_User_Guide.md)
