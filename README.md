# CivicFlow — AI-Powered Public Grievance Management Platform

An autonomous, end-to-end recruitment machine-test assignment delivering a functional, secure, and production-ready public grievance platform for Kerala civic administration.

---

## 🌐 Live Hosted Links

- **Frontend Application (Vercel)**: [https://civicflow-v1.vercel.app/](https://civicflow-v1.vercel.app/)
- **Backend API & Swagger Documentation (Railway)**: [https://civicflow-backend-production.up.railway.app/api/docs/](https://civicflow-backend-production.up.railway.app/api/docs/)
- **ReDoc Interactive Reference**: [https://civicflow-backend-production.up.railway.app/api/redoc/](https://civicflow-backend-production.up.railway.app/api/redoc/)

---

## 🔑 Demonstration Login Credentials (Pre-Seeded)

Use the credentials below on [https://civicflow-v1.vercel.app/login](https://civicflow-v1.vercel.app/login) (or click the quick-fill buttons on the login page):

| Role | Email / Username | Password | Access Rights & Dashboard Scope |
|---|---|---|---|
| **CMO Administrator** | `cmo.admin@civicflow.gov.in` | `Admin@123` | **Apex Console**: State-wide KPI metrics, SLA overdue alerts, assign departments & officers, approve resolutions, reopen cases |
| **PWD Department Officer** | `officer.pwd@civicflow.gov.in` | `Officer@123` | **Officer Desk**: Public Works complaints, update status (*In Progress*), submit formal Action-Taken Reports with inspection proof |
| **KWA Department Officer** | `officer.kwa@civicflow.gov.in` | `Officer@123` | **Officer Desk**: Kerala Water Authority complaints & field inspection reporting |
| **Citizen User** | `citizen.rajesh@gmail.com` | `Citizen@123` | **Citizen Portal**: File new complaints, AI triage recommendations, track status history, submit 5-star resolution feedback |

---

### Important Notice
> **Recruitment Prototype Disclaimer**: This project is an independent demonstration created for recruitment evaluation. It is not officially affiliated with or endorsed by the Government of Kerala.

---

## 🛠️ Technology Stack & Modular Architecture
- **Frontend (Layer 1)**: React 19, Vite, Tailwind CSS, React Router v7, Lucide Icons, Recharts, Axios.
- **API & Auth (Layer 2)**: Django REST Framework, SimpleJWT, `drf-spectacular` (OpenAPI 3 / Swagger).
- **Business Logic (Layer 3)**: Grievance lifecycle state machine, SLA overdue engine, immutable audit trail engine.
- **Database & Storage (Layer 4)**: Neon Serverless PostgreSQL (SSL pooling), WhiteNoise for compressed static assets.
- **AI Integration (Layer 5)**: Google Gemini API (`gemini-2.5-flash` via official `google-genai` SDK).
- **Deployment & Cloud (Layer 6)**: Railway / Render (Backend Gunicorn), Vercel (Frontend SPA), Neon (Database).

---

## 🤖 AI Development Tools & Engineering Workflow Disclosure

### A. AI Coding Assistants Used During Development
1. **Google Antigravity & Gemini Agentic Assistant**:
   - Acted as the primary autonomous full-stack coding agent.
   - Handled project initialization, Django model/view/serializer design, React frontend implementation, Vite build optimization, and automated testing.
   - Maintained strict Git conventional commit workflows with atomic pushes after each verified milestone.
2. **Claude Code**:
   - Conducted deep architectural reasoning, permission boundary audits, and gap analysis against machine-test specifications.

### B. Runtime AI Model Integrated into Application
- **Google Gemini API (`gemini-2.5-flash`)**:
  - Integrated on the Django backend using the official `google-genai` Python SDK.
  - Performs live text analysis on citizen complaint descriptions to classify department, category, and urgency priority, detect potential duplicate filings in the same district, and generate executive summaries for the CMO.
  - Human-in-the-Loop Safeguard: Gemini never approves, rejects, or resolves grievances; all decisions remain under human administrative control.
  - Resilient Fallback: If the API key is unconfigured or experiences network downtime, the system automatically transitions to a rule-based triage fallback without crashing.

### C. Third-Party Infrastructure & Cloud Services
- **Neon Cloud**: Serverless PostgreSQL database in AWS us-east-2.
- **Railway & Render**: Cloud container execution with Gunicorn and WhiteNoise.
- **Vercel**: Edge network CDN for the React Single Page Application.
- **GitHub**: Remote repository management at `https://github.com/ashif-ek/civic-flow.git`.

*(Note: Grok CLI, OpenCode, and Mimo Code were evaluated but not utilized).*

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

### 3. Automated Tests & API Docs
```bash
cd backend
python manage.py test api --keepdb
```
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

---

## 📂 Documentation Suite
Full architectural and deployment documentation is available in `DOCUMENTATION/`:
- [01_Project_Overview.md](file:///DOCUMENTATION/01_Project_Overview.md)
- [02_System_Architecture.md](file:///DOCUMENTATION/02_System_Architecture.md)
- [03_Database_Design.md](file:///DOCUMENTATION/03_Database_Design.md)
- [04_API_Documentation.md](file:///DOCUMENTATION/04_API_Documentation.md)
- [05_AI_Integration.md](file:///DOCUMENTATION/05_AI_Integration.md)
- [06_Setup_and_Testing.md](file:///DOCUMENTATION/06_Setup_and_Testing.md)
- [07_User_Guide.md](file:///DOCUMENTATION/07_User_Guide.md)
- [08_Compliance_Report.md](file:///DOCUMENTATION/08_Compliance_Report.md)
- [09_AI_Development_Tools_Disclosure.md](file:///DOCUMENTATION/09_AI_Development_Tools_Disclosure.md)
