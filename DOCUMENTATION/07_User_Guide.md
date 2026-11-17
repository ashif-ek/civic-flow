# 07 — User Guide & Demonstration Walkthrough

### Demonstration Credentials (Neon PostgreSQL)

| Role | Email | Password | Access |
|---|---|---|---|
| **CMO Administrator** | `cmo.admin@civicflow.gov.in` | `Admin@123` | Full state-wide apex console, department routing, case closure |
| **PWD Officer** | `officer.pwd@civicflow.gov.in` | `Officer@123` | Public Works complaints, investigation logs, action reports |
| **KWA Officer** | `officer.kwa@civicflow.gov.in` | `Officer@123` | Water Authority complaints |
| **Citizen** | `citizen.rajesh@gmail.com` | `Citizen@123` | Submit complaints, monitor status, rate resolution |

### Step-by-Step Demonstration Workflow
1. **Login as Citizen Rajesh**:
   - Navigate to `/login` and click the quick "Citizen" preset.
   - Click "File New Grievance" (`/citizen/submit`).
   - Enter complaint: "Deep trench on bypass road causing vehicular gridlock".
   - Click "Analyze with AI" to view immediate department/priority recommendations.
   - Click "Submit Grievance" to receive a unique reference number (e.g. `KL-GRV-XXXXXX`).

2. **Login as CMO Admin**:
   - Access Apex Console (`/cmo-dashboard`).
   - View live KPI statistics and district chart updates calculated directly from Neon DB.
   - Open the newly submitted complaint.
   - Click "Assign Department / Officer" and select Public Works Department (PWD).

3. **Login as PWD Officer**:
   - Access Officer Desk (`/officer-dashboard`).
   - Open the assigned case.
   - Update progress status to "In Progress" with inspection remarks.
   - Click "Submit Action-Taken Report", describe the repairs completed, check field visit, and submit.

4. **CMO Case Closure**:
   - Switch back to CMO console.
   - Review officer's Action-Taken Report.
   - Click "Update Status / Approve Resolution" and set status to "Resolved".

5. **Citizen Inspection & Feedback**:
   - Return to Citizen Portal (`/citizen-dashboard`).
   - View the resolved case and verify the timeline.
   - Submit a 5-star satisfaction review.
   - Verify that the case can also be tracked publicly on `/track` using only the reference number.
