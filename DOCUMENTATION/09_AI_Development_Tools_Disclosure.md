# 09 — AI Development Tools & Engineering Workflow

This document provides a transparent, factual disclosure of the AI development assistants, runtime AI APIs, and third-party cloud services utilized in the engineering and execution of the **CivicFlow** platform.

---

## 1. AI Coding Assistants Used During Development

The following engineering tools were actively used to analyze requirements, plan the architecture, write code, debug issues, and verify compliance:

### A. Google Antigravity & Gemini Agentic Assistant
- **Role**: Primary autonomous full-stack development environment.
- **Contribution**:
  - Automated project scaffolding across Django backend and Vite React frontend.
  - Implementation of Django custom user models, PostgreSQL schema migrations, serializers, and permission classes.
  - Implementation of the React 19 frontend design system with Tailwind CSS and Recharts.
  - Continuous Git workflow execution (conventional atomic commits and pushes).
  - Background task management, automated unit test execution, and deployment bundle verification.

### B. Claude Code
- **Role**: Deep architectural reasoning, edge-case code review, and gap analysis.
- **Contribution**:
  - Verification of the 10-step grievance lifecycle finite state machine.
  - Review of SLA overdue calculations and multi-role permission boundaries.
  - Verification of privacy-safe data isolation on public tracking endpoints.

---

## 2. Runtime AI Model Integrated into Application

CivicFlow integrates an external LLM into the live product workflow:

### Google Gemini API (`gemini-2.5-flash`)
- **SDK**: Official `google-genai` Python SDK (v3.4.0).
- **Runtime Purpose**:
  - Real-time text analysis of citizen grievance descriptions.
  - Automatic prediction of government departments (e.g., PWD, KWA, KSEB).
  - Automated severity priority assessment (Low / Medium / High).
  - Generation of executive summary briefs for the Chief Minister's Office.
  - Spatial duplicate detection comparing new filings against recent district reports.
- **Safeguards**:
  - Human-in-the-loop: Gemini only provides recommendations; all official assignments and case resolutions are strictly reserved for authorized human administrators.
  - Resilient fallback: Gracefully falls back to rule-based triage if the Gemini service experiences downtime, rate limits, or invalid credentials.

---

## 3. Third-Party Infrastructure & Cloud Services

The project relies on the following external cloud infrastructure providers:

| Service | Category | Function in CivicFlow |
|---|---|---|
| **Neon** | Serverless Database | Production PostgreSQL database with SSL connection pooling in AWS us-east-2. |
| **Railway** | Cloud PaaS Backend Hosting | Containerized Python 3.13 WSGI execution with Gunicorn and WhiteNoise static asset serving. |
| **Vercel** | Edge Frontend Hosting | Global CDN hosting for the React 19 Single Page Application with client-side rewrites. |
| **GitHub** | Source Code Management | Remote repository hosting (`https://github.com/ashif-ek/civic-flow.git`) and CI trigger. |

---

## 4. Tools Explicitly Not Used
To ensure complete transparency, the following tools were **not** used during the construction of this assignment:
- *Grok CLI, OpenCode, Mimo Code*: Evaluated but not utilized.
