# 05 — AI Integration

CivicFlow integrates the official Google Gemini API via `google-genai` SDK on the Django backend.

### JSON Output Contract
```json
{
  "category": "Roads & Bridges",
  "suggested_department": "Public Works Department",
  "priority": "High",
  "summary": "Severe pothole cluster in Pattom resulting in road safety hazards.",
  "suggested_action": "Dispatch PWD road maintenance quick-response crew for cold-mix bitumen patching."
}
```

### Safety & Governance Guardrails
1. **Human-in-the-Loop Enforced**: AI output is strictly advisory. AI cannot approve, reject, reassign, or resolve complaints autonomously.
2. **Backend-Only Credentials**: The Gemini API key remains exclusively on the server and is never exposed to frontend clients.
3. **Resilient Fallback Mode**: When an invalid API key, timeout, or rate-limit occurs, the system seamlessly transitions to a standard rule-based triage fallback without crashing, explicitly tagging `"is_fallback": true`.
