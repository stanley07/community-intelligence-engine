from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json
import re
from gemini_engine import run_intelligence

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_json(text: str):
    """
    Removes ```json fences and parses JSON safely
    """
    cleaned = re.sub(r"```json|```", "", text).strip()
    return json.loads(cleaned)

@app.get("/analyze")
def analyze():
    result = run_intelligence(load_messages())
    intelligence_json = extract_json(result)
    return intelligence_json


def load_messages():
    with open("../data/messages.json", "r", encoding="utf-8") as f:
        return json.load(f)
