import os
import json
import logging
from dotenv import load_dotenv
from google import genai
from pathlib import Path

# Load env
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / '.env')

logger = logging.getLogger(__name__)

FALLBACK_ANALYSIS = {
    "category": "Public Infrastructure",
    "suggested_department": "Public Works Department",
    "priority": "Medium",
    "summary": "Complaint regarding public utility or infrastructure maintenance requiring inspection.",
    "suggested_action": "Assign to field engineer for site verification and condition assessment.",
    "is_fallback": True
}

def analyze_grievance_with_gemini(description: str, subject: str = "", recent_grievances: list = None):
    """
    Analyzes citizen complaint text using Google Gemini API.
    Also detects potentially similar recent grievances if recent_grievances are provided.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        logger.warning("GEMINI_API_KEY is not configured. Using standard fallback logic.")
        return FALLBACK_ANALYSIS

    context_str = ""
    if recent_grievances and len(recent_grievances) > 0:
        context_str = "\nExisting recent complaints in the same area for duplicate analysis:\n"
        for idx, g in enumerate(recent_grievances[:5]):
            context_str += f"- [Ref: {g.get('reference_number')}] Subject: {g.get('subject')} | Summary: {g.get('summary', '')[:100]}\n"

    prompt = f"""
You are an expert AI Grievance Classification Assistant for CivicFlow, a Public Grievance Management Platform for the Government of Kerala.
Analyze the following public grievance subject and description submitted by a citizen:

Subject: {subject}
Description: {description}
{context_str}

Determine the following fields in valid JSON format:
1. "category": Choose the most appropriate general category (e.g., "Roads & Bridges", "Public Health & Sanitation", "Water Supply", "Electricity & Energy", "General Education", "Public Transport", "Revenue & Land", "Law & Order", "Local Self Government").
2. "suggested_department": Suggest the most appropriate government department (e.g., "Public Works Department", "Health and Family Welfare", "Kerala Water Authority", "Kerala State Electricity Board", "General Education Department", "Transport Department", "Local Self Government Department").
3. "priority": One of "Low", "Medium", or "High" based on public safety, urgency, risk to life, health hazard, or scope of disturbance.
4. "summary": A concise 1-2 sentence executive summary of the complaint for the Chief Minister's Office.
5. "suggested_action": Recommended initial operational step for the department officer.
6. "potential_duplicate_refs": A list of reference numbers from the existing complaints list that appear to refer to the exact same incident or location (return empty list [] if none).

Return ONLY the raw JSON object without markdown formatting, code fences or additional commentary:
{{
  "category": "...",
  "suggested_department": "...",
  "priority": "...",
  "summary": "...",
  "suggested_action": "...",
  "potential_duplicate_refs": []
}}
"""
    try:
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        text_response = response.text.strip()
        # Clean markdown code fences if present
        if text_response.startswith("```json"):
            text_response = text_response[7:]
        if text_response.startswith("```"):
            text_response = text_response[3:]
        if text_response.endswith("```"):
            text_response = text_response[:-3]
        text_response = text_response.strip()

        data = json.loads(text_response)
        required_fields = ["category", "suggested_department", "priority", "summary", "suggested_action"]
        for field in required_fields:
            if field not in data:
                raise ValueError(f"Missing field in Gemini response: {field}")
        
        priority = data.get("priority", "Medium").capitalize()
        if priority not in ["Low", "Medium", "High"]:
            priority = "Medium"
        data["priority"] = priority
        data["is_fallback"] = False
        if "potential_duplicate_refs" not in data:
            data["potential_duplicate_refs"] = []
        return data

    except Exception as e:
        logger.error(f"Error calling Gemini API: {str(e)}")
        fallback = FALLBACK_ANALYSIS.copy()
        fallback["api_error"] = str(e)
        fallback["potential_duplicate_refs"] = []
        return fallback
