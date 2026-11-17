# 02 — System Architecture

```mermaid
graph TD
    Citizen[Citizen User] -->|Lodge Complaint / Track| ReactApp[React + Vite Frontend]
    CMO[CMO Admin] -->|Review & Assign| ReactApp
    Officer[Department Officer] -->|Investigate & Report| ReactApp

    ReactApp -->|REST API / JWT| Django[Django REST Framework Backend]
    Django -->|Triage Prompt| Gemini[Google Gemini AI Service]
    Django -->|State & Audit Trail| NeonDB[(Neon Hosted PostgreSQL DB)]
    Django -->|Media Files| Storage[Media Storage]
```

### Component Breakdown
1. **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, React Router v7, Recharts, Axios.
2. **Backend**: Python 3.13, Django 6.1, Django REST Framework, SimpleJWT, Psycopg2-binary, Dj-Database-URL.
3. **Database**: Hosted Neon PostgreSQL (with connection pooling and SSL).
4. **AI Engine**: Google Gemini API via official `google-genai` SDK with resilient rule-based fallbacks.
