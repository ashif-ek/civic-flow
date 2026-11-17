# 04 — API Documentation

### Base URL: `/api/`

#### 1. Authentication
- `POST /api/auth/register/` — Register citizen account (email, full_name, mobile_number, password).
- `POST /api/auth/login/` — Authenticate and receive JWT access and refresh tokens.
- `POST /api/auth/token/refresh/` — Obtain new access token.
- `GET /api/auth/me/` — Retrieve authenticated user profile with role.

#### 2. Public Endpoints
- `GET /api/departments/` — List all active government departments.
- `GET /api/grievances/track/<ref_number>/` — Public grievance timeline tracker by reference number.
- `POST /api/contact/` — Submit contact enquiry (persisted in PostgreSQL).

#### 3. AI Assistant
- `POST /api/ai/analyze/` — Analyze subject & description, returning category, suggested department, priority, executive summary, and recommended action.

#### 4. Citizen Portal
- `GET /api/citizen/grievances/` — List grievances submitted by current citizen.
- `POST /api/citizen/grievances/` — Submit grievance (triggers AI triage and generates reference number).
- `GET /api/citizen/grievances/<id>/` — Retrieve full grievance details, action reports, and timeline.
- `POST /api/grievances/<id>/attachments/` — Upload supporting document/photo.
- `POST /api/grievances/<id>/feedback/` — Submit satisfaction rating (1–5 stars) after resolution.

#### 5. CMO Apex Admin
- `GET /api/cmo/stats/` — Real-time PostgreSQL metrics (district breakdown, department split, priority distribution).
- `GET /api/cmo/grievances/` — Filtered grievance listing (search, district, category, priority, status).
- `GET /api/cmo/grievances/<id>/` — Comprehensive details with all history logs.
- `POST /api/cmo/grievances/<id>/assign/` — Route grievance to department and officer.
- `POST /api/cmo/grievances/<id>/status/` — Approve case resolution or reopen.
- `POST /api/cmo/grievances/<id>/escalate/` — Escalate overdue or critical grievance to High Priority.

#### 6. Department Officer
- `GET /api/officer/grievances/` — List complaints assigned to officer's department.
- `POST /api/officer/grievances/<id>/status/` — Update status to "In Progress" with investigation notes.
- `POST /api/officer/grievances/<id>/action-report/` — Submit Action-Taken Report with evidence.
