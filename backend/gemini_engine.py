import os
import json
from dotenv import load_dotenv
from google import genai
from prompts import SYSTEM_PROMPT

# Load env explicitly from project root
load_dotenv("../.env")

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not loaded")

client = genai.Client(api_key=API_KEY)

# ✅ Use a KNOWN-GOOD, SDK-supported model name
# This is the correct pattern for the current google.genai SDK
MODEL_NAME = "gemini-2.0-flash"

print("USING MODEL:", MODEL_NAME)

def run_intelligence(messages):
    prompt = (
        SYSTEM_PROMPT
        + "\n\nMESSAGES:\n"
        + json.dumps(messages, ensure_ascii=False)
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    # Robust extraction across SDK variants
    if hasattr(response, "text") and response.text:
        return response.text

    if hasattr(response, "candidates") and response.candidates:
        return response.candidates[0].content.parts[0].text

    return str(response)
