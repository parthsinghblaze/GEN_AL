'use client';

import React, { useState, useEffect } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

interface StructuredExampleCase {
  id: string;
  title: string;
  domain: string;
  badge: string;
  desc: string;
  inputQuery: string;
  zeroShotFlaw: {
    systemPrompt: string;
    rawOutput: string;
    flaws: string[];
    parserStatus: 'CRASH' | 'TYPE_MISMATCH' | 'CORRUPTED';
  };
  fewShotSuccess: {
    systemPrompt: string;
    exemplars: { role: 'user' | 'assistant'; content: string }[];
    rawOutput: string;
    parsedObject: Record<string, any>;
    whyItWorks: string;
  };
}

export default function Section16StructuredFewShot() {
  const [activeTab, setActiveTab] = useState<'python-code' | 'matrix' | 'simulator' | 'architecture' | 'best-practices'>('python-code');
  const [codeType, setCodeType] = useState<'math' | 'ticket' | 'lead' | 'medical' | 'pydantic'>('math');
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [matrixView, setMatrixView] = useState<'split' | 'zero' | 'few'>('split');

  // Simulator State
  const [simScenario, setSimScenario] = useState<'math-refusal' | 'math-solve' | 'ticket-angry' | 'lead-resume' | 'medical-emergency'>('math-refusal');
  const [simMode, setSimMode] = useState<'with-few-shot' | 'without-few-shot'>('with-few-shot');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [terminalText, setTerminalText] = useState<string>('');
  const [validationReport, setValidationReport] = useState<{
    rfc8259: boolean;
    schemaValid: boolean;
    keysPresent: string;
    pydanticOk: boolean;
    latency: number;
  } | null>(null);

  // Python Code Samples
  const mathStructuredCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

# 1. Load secrets securely from .env
load_dotenv()

# 2. Point OpenAI SDK to Google Gemini endpoint
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# 3. Define the strict JSON schema in System Prompt
system_prompt = """You are a strict Math AI Gatekeeper & Solver.
Analyze the user's input and return strictly valid RFC-8259 JSON matching this schema:
{
  "is_math_query": boolean,
  "category": "arithmetic" | "algebra" | "calculus" | "geometry" | "non_math",
  "status": "SOLVED" | "REJECTED",
  "steps": list of strings or null,
  "solution": string or null,
  "rejection_reason": string or null
}
CRITICAL RULES:
- Never wrap output in markdown fences (\`\`\`json).
- If non-math, "status" must be "REJECTED" and "solution" must be null.
- Output raw JSON object starting with "{" and ending with "}"."""

# 4. Invoke with Few-Shot Exemplars (Teaches both math solving & domain rejection)
response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.0,  # Zero temperature for deterministic structured output
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": system_prompt},
        # --- Exemplar 1: Math Query (Calculated & Solved) ---
        {
            "role": "user",
            "content": "Solve 3x + 12 = 0"
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "is_math_query": True,
                "category": "algebra",
                "status": "SOLVED",
                "steps": ["3x + 12 = 0", "3x = -12", "x = -4"],
                "solution": "x = -4",
                "rejection_reason": None
            })
        },
        # --- Exemplar 2: Non-Math Query (The User's France Refusal Scenario) ---
        {
            "role": "user",
            "content": "Who painted the Mona Lisa?"
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "is_math_query": False,
                "category": "non_math",
                "status": "REJECTED",
                "steps": None,
                "solution": None,
                "rejection_reason": "Query belongs to art history, not mathematics."
            })
        },
        # --- Target Query ---
        {
            "role": "user",
            "content": "What is the capital of France?"
        }
    ]
)

raw_output = response.choices[0].message.content
print("=== Raw Model Output ===")
print(raw_output)

# 5. Direct, safe JSON parsing into Python dictionary
data = json.loads(raw_output)
print("\\n=== Parsed Structured Object ===")
print(f"Is Math Query    : {data['is_math_query']}")
print(f"Domain Category  : {data['category']}")
print(f"Execution Status : {data['status']}")
print(f"Rejection Reason : {data['rejection_reason']}")
# Output:
# Is Math Query    : False
# Domain Category  : non_math
# Execution Status : REJECTED
# Rejection Reason : Query asks for geography/political capital instead of mathematics.`;

  const ticketRouterCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

system_prompt = """You are an Enterprise Support Triage Classifier.
Parse incoming customer support messages into strictly valid JSON schema:
{
  "ticket_prefix": "TCK-BIL" | "TCK-LOG" | "TCK-TECH" | "TCK-GEN",
  "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "urgency": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "category": "BILLING" | "LOGISTICS" | "TECHNICAL" | "INQUIRY",
  "refund_eligible": boolean,
  "action_items": list of strings,
  "assigned_queue": string
}
Rules:
- Mark refund_eligible as true ONLY for double-charges, defective hardware, or >7-day shipping delays.
- Urgency is CRITICAL if customer mentions production downtime or legal escalation."""

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.0,
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": system_prompt},
        # Exemplar 1: Double charge
        {
            "role": "user",
            "content": "You charged my Visa twice ($99.00 x 2) for order #4491. Fix this immediately!"
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "ticket_prefix": "TCK-BIL",
                "sentiment": "NEGATIVE",
                "urgency": "HIGH",
                "category": "BILLING",
                "refund_eligible": True,
                "action_items": ["Reverse duplicate $99.00 transaction on Visa", "Send receipt email"],
                "assigned_queue": "tier2_billing_escalations"
            })
        },
        # Exemplar 2: General question
        {
            "role": "user",
            "content": "Do you offer Saturday delivery to Austin, Texas?"
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "ticket_prefix": "TCK-LOG",
                "sentiment": "NEUTRAL",
                "urgency": "LOW",
                "category": "LOGISTICS",
                "refund_eligible": False,
                "action_items": ["Provide regional weekend carrier guide link"],
                "assigned_queue": "general_inquiries"
            })
        },
        # Target Query
        {
            "role": "user",
            "content": "Our server rack went dark after your firmware push! 500 branch offices are down, our lawyers are getting involved unless this is patched within 1 hour!"
        }
    ]
)

ticket = json.loads(response.choices[0].message.content)
print(json.dumps(ticket, indent=2))
# Output:
# {
#   "ticket_prefix": "TCK-TECH",
#   "sentiment": "NEGATIVE",
#   "urgency": "CRITICAL",
#   "category": "TECHNICAL",
#   "refund_eligible": false,
#   "action_items": [
#     "Immediately escalate to Infrastructure On-Call SRE",
#     "Rollback firmware push to previous stable release",
#     "Initiate bridge call with enterprise account representative"
#   ],
#   "assigned_queue": "critical_incident_command"
# }`;

  const leadExtractorCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

system_prompt = """Extract candidate profile data into pure RFC-8259 JSON matching:
{
  "candidate": {
    "full_name": string,
    "current_title": string,
    "years_experience": number,
    "contact": {
      "email": string or null,
      "phone": string or null,
      "location": string or null
    }
  },
  "skills": list of strings,
  "highest_degree": {
    "title": string or null,
    "institution": string or null,
    "year": number or null
  },
  "willing_to_relocate": boolean or null
}
CRITICAL: Use actual JSON null for missing values. Never output strings like "N/A" or "None"."""

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.0,
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": system_prompt},
        # Exemplar: Teaches strict null handling for omitted phone & relocation
        {
            "role": "user",
            "content": "Marcus Vance. Senior Cloud Architect with 8 years building AWS pipelines. Reach me at marcus@cloudscale.io. Graduated with B.S. from Georgia Tech in 2016."
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "candidate": {
                    "full_name": "Marcus Vance",
                    "current_title": "Senior Cloud Architect",
                    "years_experience": 8,
                    "contact": {
                        "email": "marcus@cloudscale.io",
                        "phone": None,
                        "location": None
                    }
                },
                "skills": ["AWS", "Cloud Architecture", "CI/CD"],
                "highest_degree": {
                    "title": "B.S.",
                    "institution": "Georgia Tech",
                    "year": 2016
                },
                "willing_to_relocate": None
            })
        },
        # Target Query
        {
            "role": "user",
            "content": "Hi! I am Dr. Priya Sharma, Lead AI Researcher at DeepHealth with 6 years experience in Medical Imaging and PyTorch. Email me at priya@deephealth.org, phone 415-555-0199 in San Francisco. PhD in Biomedical Informatics from Stanford in 2020. Open to remote or relocating to Zurich!"
        }
    ]
)

profile = json.loads(response.choices[0].message.content)
print(f"Name      : {profile['candidate']['full_name']}")
print(f"Title     : {profile['candidate']['current_title']}")
print(f"Exp Years : {profile['candidate']['years_experience']}")
print(f"Contact   : {profile['candidate']['contact']}")
print(f"Degree    : {profile['highest_degree']}")`;

  const medicalTriageCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

system_prompt = """You are a Clinical Emergency Triage Parser.
Structure incoming ER nursing notes into strictly validated JSON schema:
{
  "patient_age": number,
  "gender": "male" | "female" | "other",
  "primary_symptoms": list of strings,
  "vital_signs": {
    "blood_pressure": string,
    "heart_rate_bpm": number,
    "is_hypertensive_crisis": boolean
  },
  "triage_urgency": "EMERGENCY_RED" | "URGENT_YELLOW" | "ROUTINE_GREEN",
  "immediate_order": string,
  "requires_attending_md": boolean
}
Rules:
- EMERGENCY_RED is mandatory for chest pain radiating to left arm, BP systolic > 180, or severe dyspnea."""

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.0,
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": system_prompt},
        # Exemplar 1 (Routine cold)
        {
            "role": "user",
            "content": "24yo female with 2-day runny nose and mild cough. BP 118/76, HR 72bpm."
        },
        {
            "role": "assistant",
            "content": json.dumps({
                "patient_age": 24,
                "gender": "female",
                "primary_symptoms": ["rhinorrhea", "mild cough"],
                "vital_signs": {
                    "blood_pressure": "118/76",
                    "heart_rate_bpm": 72,
                    "is_hypertensive_crisis": False
                },
                "triage_urgency": "ROUTINE_GREEN",
                "immediate_order": "Rapid viral panel swab and discharge counseling",
                "requires_attending_md": False
            })
        },
        # Target Query (Critical Cardiac emergency)
        {
            "role": "user",
            "content": "56yo male presenting with sudden crushing substernal chest pressure radiating into left arm and jaw for 40 minutes. Diaphoretic. BP 190/115, HR 112bpm."
        }
    ]
)

triage = json.loads(response.choices[0].message.content)
print(f"Urgency Level : {triage['triage_urgency']}")
print(f"Hypertensive  : {triage['vital_signs']['is_hypertensive_crisis']}")
print(f"Immediate Plan: {triage['immediate_order']}")
print(f"Attending MD  : {triage['requires_attending_md']}")`;

  const pydanticSdkCode = `import os
from typing import Optional, List, Literal
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from openai import OpenAI

load_dotenv()

# 1. Define your Pydantic Schema with strict type annotations & field validators
class MathGatekeeperSchema(BaseModel):
    is_math_query: bool = Field(description="True if query is strictly mathematical")
    category: Literal["arithmetic", "algebra", "geometry", "calculus", "out_of_domain"]
    status: Literal["SOLVED", "REJECTED"]
    steps: Optional[List[str]] = Field(default=None, description="Step-by-step mathematical reasoning")
    solution: Optional[str] = Field(default=None, description="Final numerical or algebraic answer")
    rejection_reason: Optional[str] = Field(default=None, description="Detailed reason if query was out of domain")

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# 2. Combine Pydantic response_format with Few-Shot exemplars
# Notice: Few-Shot exemplars teach semantic boundary enforcement,
# while Pydantic guarantees 100% syntactic type compliance!
completion = client.beta.chat.completions.parse(
    model="gemini-3.8-flash",
    response_format=MathGatekeeperSchema,
    messages=[
        {
            "role": "system",
            "content": "You are a specialized Math Router. Solve arithmetic/algebra queries or reject out-of-domain topics."
        },
        # Exemplar 1 (Math solved)
        {
            "role": "user",
            "content": "Compute 15% tip on a $80 bill."
        },
        {
            "role": "assistant",
            "content": MathGatekeeperSchema(
                is_math_query=True,
                category="arithmetic",
                status="SOLVED",
                steps=["15% = 0.15", "0.15 * 80 = 12.00"],
                solution="$12.00",
                rejection_reason=None
            ).model_dump_json()
        },
        # Exemplar 2 (Non-math rejected)
        {
            "role": "user",
            "content": "Write a poem about the ocean."
        },
        {
            "role": "assistant",
            "content": MathGatekeeperSchema(
                is_math_query=False,
                category="out_of_domain",
                status="REJECTED",
                steps=None,
                solution=None,
                rejection_reason="Creative writing is outside the mathematics domain."
            ).model_dump_json()
        },
        # Target Query
        {
            "role": "user",
            "content": "What is the capital of France?"
        }
    ]
)

# 3. Model returns a fully validated Pydantic object instance
parsed_record: MathGatekeeperSchema = completion.choices[0].message.parsed
print("Type of object    :", type(parsed_record))
print("Is Math Query     :", parsed_record.is_math_query)
print("Execution Status  :", parsed_record.status)
print("Domain Category   :", parsed_record.category)
print("Rejection Reason  :", parsed_record.rejection_reason)
print("Calculated Solution:", parsed_record.solution)`;

  // Comparative Cases for Matrix Tab
  const cases: StructuredExampleCase[] = [
    {
      id: 'math-bot',
      title: '01. Math Domain Gatekeeper & Calculator',
      domain: 'Mathematics & Logical Boundaries',
      badge: 'Your Exact Scenario',
      desc: 'Classifying math queries vs non-math queries into a strict JSON contract with conditional step execution and standardized rejection.',
      inputQuery: 'What is the capital of France?',
      zeroShotFlaw: {
        systemPrompt: 'You are a Math AI. Output JSON only. If a question is not about math, reject it.',
        rawOutput: '```json\n{\n  "error": "I can only do math, but Paris is the capital of France!",\n  "success": false\n}\n```\nLet me know if you need any algebra help!',
        flaws: [
          'Wraps payload in markdown fences (```json ... ```), which causes json.loads() in Python to throw json.decoder.JSONDecodeError.',
          'Leaks the answer ("Paris") inside the error string due to attention leakage.',
          'Invented arbitrary keys ("error", "success") instead of the required standardized schema keys.',
          'Appends conversational greeting at the end.'
        ],
        parserStatus: 'CRASH'
      },
      fewShotSuccess: {
        systemPrompt: 'Return strictly valid JSON with keys: is_math_query, category, status, steps, solution, rejection_reason.',
        exemplars: [
          { role: 'user', content: 'Calculate 14 * 7' },
          { role: 'assistant', content: '{"is_math_query": true, "category": "arithmetic", "status": "SOLVED", "steps": ["14 * 7 = 98"], "solution": "98", "rejection_reason": null}' },
          { role: 'user', content: 'Who wrote Romeo and Juliet?' },
          { role: 'assistant', content: '{"is_math_query": false, "category": "non_math", "status": "REJECTED", "steps": null, "solution": null, "rejection_reason": "Query out of mathematical scope."}' }
        ],
        rawOutput: '{"is_math_query": false, "category": "non_math", "status": "REJECTED", "steps": null, "solution": null, "rejection_reason": "Query asks for geography/political capital instead of mathematics."}',
        parsedObject: {
          is_math_query: false,
          category: 'non_math',
          status: 'REJECTED',
          steps: null,
          solution: null,
          rejection_reason: 'Query asks for geography/political capital instead of mathematics.'
        },
        whyItWorks: 'Exemplars establish an ironclad attention anchor: when non-math tokens are detected, the model mirrors the demonstrated schema transition, setting status to "REJECTED" and solution to null without leaking Paris.'
      }
    },
    {
      id: 'ticket-routing',
      title: '02. Enterprise Support Ticket Router',
      domain: 'Customer Ops & CRM Pipelines',
      badge: 'Multi-Class Enums',
      desc: 'Routing angry customer complaints, detecting financial refund eligibility, and assigning urgency levels for Zendesk / Salesforce APIs.',
      inputQuery: 'My monitor arrived with a completely shattered screen! My client presentation is tomorrow and I need a replacement or full refund right now!',
      zeroShotFlaw: {
        systemPrompt: 'Categorize this ticket into JSON with urgency, category, and refund_eligible.',
        rawOutput: '{\n  "Urgency": "Extremely Urgent",\n  "Category": "Hardware Damage",\n  "refund_eligible": "Yes, absolutely"\n}',
        flaws: [
          'Inconsistent casing: used "Urgency" and "Category" capitalized, breaking downstream pydantic parsers expecting snake_case.',
          'Enum violation: returned "Extremely Urgent" instead of the defined constraint ["LOW", "MEDIUM", "HIGH", "CRITICAL"].',
          'Type mutation: returned string "Yes, absolutely" instead of boolean true.'
        ],
        parserStatus: 'TYPE_MISMATCH'
      },
      fewShotSuccess: {
        systemPrompt: 'Output raw JSON adhering to schema with typed enums: urgency in ["LOW", "MEDIUM", "HIGH", "CRITICAL"], refund_eligible as boolean.',
        exemplars: [
          { role: 'user', content: 'Where is my order #123?' },
          { role: 'assistant', content: '{"ticket_prefix":"TCK-LOG","sentiment":"NEUTRAL","urgency":"LOW","category":"LOGISTICS","refund_eligible":false,"action_items":["Track parcel via FedEx"],"assigned_queue":"general_inquiries"}' }
        ],
        rawOutput: '{"ticket_prefix":"TCK-TECH","sentiment":"NEGATIVE","urgency":"CRITICAL","category":"TECHNICAL","refund_eligible":true,"action_items":["Dispatch immediate replacement monitor with overnight shipping","Process RMA damage claim"],"assigned_queue":"vip_hardware_support"}',
        parsedObject: {
          ticket_prefix: 'TCK-TECH',
          sentiment: 'NEGATIVE',
          urgency: 'CRITICAL',
          category: 'TECHNICAL',
          refund_eligible: true,
          action_items: [
            'Dispatch immediate replacement monitor with overnight shipping',
            'Process RMA damage claim'
          ],
          assigned_queue: 'vip_hardware_support'
        },
        whyItWorks: 'Demonstrations enforce both the exact key names and valid enum vocabulary, ensuring database foreign keys and workflow triggers never fail.'
      }
    },
    {
      id: 'resume-extractor',
      title: '03. Candidate Resume & Lead Profiler',
      domain: 'HR Tech & Deeply Nested JSON',
      badge: 'Complex Nested Schemas',
      desc: 'Extracting candidate bio details, skills arrays, contact objects, and nested education records with strict null handling.',
      inputQuery: 'Elena Rostova. Senior ML Engineer with 6 yrs experience in PyTorch and CUDA. Reach me at elena@tensor.org. M.S. in Computer Science from ETH Zurich (2020). Open to relocation.',
      zeroShotFlaw: {
        systemPrompt: 'Extract candidate details into JSON matching contact, skills, and highest_degree.',
        rawOutput: '{\n  "candidate_name": "Elena Rostova",\n  "experience": "6 years",\n  "contact": "elena@tensor.org (phone: N/A, location: N/A)",\n  "skills": "PyTorch, CUDA",\n  "degree": "M.S. ETH Zurich 2020"\n}',
        flaws: [
          'Flattened nested objects: converted "contact" into an unparseable unstructured text string.',
          'Stringified arrays: output "skills" as a comma-separated string instead of a valid JSON string array ["PyTorch", "CUDA"].',
          'Failed null handling: wrote "phone: N/A" instead of JSON null.'
        ],
        parserStatus: 'CORRUPTED'
      },
      fewShotSuccess: {
        systemPrompt: 'Extract profile into nested JSON: candidate.contact.phone must be null if omitted. skills must be string array.',
        exemplars: [
          { role: 'user', content: 'David Kim. DevOps Lead, 4 yrs. david@kim.net. B.S. from UCLA (2018).' },
          { role: 'assistant', content: '{"candidate":{"full_name":"David Kim","current_title":"DevOps Lead","years_experience":4,"contact":{"email":"david@kim.net","phone":null,"location":null}},"skills":["DevOps","CI/CD"],"highest_degree":{"title":"B.S.","institution":"UCLA","year":2018},"willing_to_relocate":null}' }
        ],
        rawOutput: '{"candidate":{"full_name":"Elena Rostova","current_title":"Senior ML Engineer","years_experience":6,"contact":{"email":"elena@tensor.org","phone":null,"location":null}},"skills":["PyTorch","CUDA"],"highest_degree":{"title":"M.S.","institution":"ETH Zurich","year":2020},"willing_to_relocate":true}',
        parsedObject: {
          candidate: {
            full_name: 'Elena Rostova',
            current_title: 'Senior ML Engineer',
            years_experience: 6,
            contact: {
              email: 'elena@tensor.org',
              phone: null,
              location: null
            }
          },
          skills: ['PyTorch', 'CUDA'],
          highest_degree: {
            title: 'M.S.',
            institution: 'ETH Zurich',
            year: 2020
          },
          willing_to_relocate: true
        },
        whyItWorks: 'The exemplar illustrates the exact nested depth and proves that missing keys should be populated with null rather than omitted or concatenated.'
      }
    },
    {
      id: 'sql-generator',
      title: '04. Natural Language to Safe SQL Generator',
      domain: 'Data Engineering & Query Governance',
      badge: 'Security & AST Verification',
      desc: 'Translating plain English questions into audited SQL queries with metadata flags verifying read-only safety.',
      inputQuery: 'Show me total revenue by country for 2024, but only where revenue exceeds $50,000.',
      zeroShotFlaw: {
        systemPrompt: 'Convert the question into SQL query JSON.',
        rawOutput: 'Here is your SQL query:\n\n```sql\nSELECT country, SUM(amount) FROM sales WHERE year=2024 GROUP BY country HAVING SUM(amount) > 50000;\n```',
        flaws: [
          'Completely ignored the JSON specification; generated conversational text and a raw SQL markdown fence.',
          'Missing security verification flags (is_read_only, tables_referenced).',
          'Zero schema introspection: backend microservice crashes on json.loads().'
        ],
        parserStatus: 'CRASH'
      },
      fewShotSuccess: {
        systemPrompt: 'Translate text to audited SQL JSON schema: { sql_query, tables_referenced, is_read_only, risk_score }.',
        exemplars: [
          { role: 'user', content: 'List all active users.' },
          { role: 'assistant', content: '{"sql_query":"SELECT id, username, email FROM users WHERE is_active = TRUE;","tables_referenced":["users"],"is_read_only":true,"risk_score":0.01}' }
        ],
        rawOutput: '{"sql_query":"SELECT country, SUM(revenue) AS total_revenue FROM orders WHERE order_year = 2024 GROUP BY country HAVING total_revenue > 50000 ORDER BY total_revenue DESC;","tables_referenced":["orders"],"is_read_only":true,"risk_score":0.05}',
        parsedObject: {
          sql_query: 'SELECT country, SUM(revenue) AS total_revenue FROM orders WHERE order_year = 2024 GROUP BY country HAVING total_revenue > 50000 ORDER BY total_revenue DESC;',
          tables_referenced: ['orders'],
          is_read_only: true,
          risk_score: 0.05
        },
        whyItWorks: 'Demonstrations enforce the JSON container pattern, preventing conversational preamble and ensuring enterprise data governance flags are always populated.'
      }
    }
  ];

  const currentCase = cases[selectedCaseIdx];

  // Animated Terminal Simulator Runner
  const runSimulator = (scenario: typeof simScenario, mode: typeof simMode) => {
    setIsTyping(true);
    setTerminalText('');
    setValidationReport(null);

    let outputJson = '';
    let report = {
      rfc8259: true,
      schemaValid: true,
      keysPresent: '6/6',
      pydanticOk: true,
      latency: 185
    };

    if (mode === 'without-few-shot') {
      report.rfc8259 = false;
      report.schemaValid = false;
      report.pydanticOk = false;
      report.latency = 310;

      if (scenario === 'math-refusal') {
        outputJson = '```json\n{\n  "response": "I can only answer math queries, but Paris is the capital of France!",\n  "status": "error"\n}\n```\nHope that helps!';
        report.keysPresent = '2/6 (4 Missing)';
      } else if (scenario === 'math-solve') {
        outputJson = 'Here is the step-by-step math solution:\n\n3x + 15 = 45\n3x = 30\nx = 10\n\n```json\n{"ans": 10}\n```';
        report.keysPresent = '1/6 (5 Missing)';
      } else if (scenario === 'ticket-angry') {
        outputJson = '{\n  "Urgency": "VERY HIGH",\n  "Refund": "Yes",\n  "Customer_Message": "Angry"\n}';
        report.keysPresent = '3/7 (Type Mismatch)';
      } else {
        outputJson = 'Candidate: Elena Rostova\nExperience: 6 years\nSkills: PyTorch, CUDA\nEmail: elena@tensor.org';
        report.keysPresent = '0/6 (Plain Text Fail)';
      }
    } else {
      // With Few-Shot: Perfect RFC-8259 JSON
      report.rfc8259 = true;
      report.schemaValid = true;
      report.pydanticOk = true;
      report.latency = 195;

      if (scenario === 'math-refusal') {
        outputJson = JSON.stringify({
          is_math_query: false,
          category: 'non_math',
          status: 'REJECTED',
          steps: null,
          solution: null,
          rejection_reason: 'Query asks for geography/political capital instead of mathematics.'
        }, null, 2);
        report.keysPresent = '6/6 (100% Match)';
      } else if (scenario === 'math-solve') {
        outputJson = JSON.stringify({
          is_math_query: true,
          category: 'algebra',
          status: 'SOLVED',
          steps: ['3x + 15 = 45', '3x = 30', 'x = 10'],
          solution: 'x = 10',
          rejection_reason: null
        }, null, 2);
        report.keysPresent = '6/6 (100% Match)';
      } else if (scenario === 'ticket-angry') {
        outputJson = JSON.stringify({
          ticket_prefix: 'TCK-TECH',
          sentiment: 'NEGATIVE',
          urgency: 'CRITICAL',
          category: 'TECHNICAL',
          refund_eligible: true,
          action_items: [
            'Dispatch replacement monitor immediately',
            'Issue prepaid return label for damaged goods'
          ],
          assigned_queue: 'vip_hardware_support'
        }, null, 2);
        report.keysPresent = '7/7 (Strict Enums)';
      } else {
        outputJson = JSON.stringify({
          candidate: {
            full_name: 'Elena Rostova',
            current_title: 'Senior ML Engineer',
            years_experience: 6,
            contact: {
              email: 'elena@tensor.org',
              phone: null,
              location: null
            }
          },
          skills: ['PyTorch', 'CUDA'],
          highest_degree: {
            title: 'M.S.',
            institution: 'ETH Zurich',
            year: 2020
          },
          willing_to_relocate: true
        }, null, 2);
        report.keysPresent = 'Nested Object Validated';
      }
    }

    let idx = 0;
    const interval = setInterval(() => {
      idx += 5;
      if (idx >= outputJson.length) {
        setTerminalText(outputJson);
        setIsTyping(false);
        setValidationReport(report);
        clearInterval(interval);
      } else {
        setTerminalText(outputJson.substring(0, idx));
      }
    }, 15);
  };

  useEffect(() => {
    runSimulator(simScenario, simMode);
  }, [simScenario, simMode]);

  return (
    <section id="sec-structured-fewshot" className="space-y-10 scroll-mt-24 pt-8 border-t-2 border-purple-800/40">
      {/* Title Banner */}
      <div className="border-b-2 border-purple-800/40 pb-3 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
          Section 16 // Topic 02 // Production Schema Engineering
        </span>
        <span className="font-mono text-[11px] text-zinc-500 font-bold flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          <span>RFC-8259 &amp; Pydantic Integration</span>
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">02</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            Deterministic API Integration
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Structured Output with Few-Shot Prompting: Zero-Leakage Architecture
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Why schema declarations alone fail in production, how in-context exemplars guarantee 100% schema compliance, and multi-domain implementations spanning Math Routers, Support Triage, Entity Extractors, and Pydantic models.
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#e2ddd6] pb-3">
        {[
          { id: 'python-code', label: '🐍 Full Python Implementations', icon: '🐍' },
          { id: 'matrix', label: '⚖️ Zero-Shot vs. Few-Shot Matrix', icon: '⚖️' },
          { id: 'simulator', label: '🧪 Interactive JSON Schema Simulator', icon: '💻' },
          { id: 'architecture', label: '🧠 Syntactic vs. Semantic Blueprint', icon: '📐' },
          { id: 'best-practices', label: '📋 Production Cheat Sheet & Pitfalls', icon: '🛡️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-purple-700 text-white shadow-md scale-102'
                : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-[#e2ddd6]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: PYTHON CODE IMPLEMENTATIONS */}
      {activeTab === 'python-code' && (
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                <span>🐍</span>
                <span>Production Python Pipelines</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                End-to-End Structured Few-Shot Scripts (OpenAI SDK + Gemini)
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Ready-to-run Python implementations configured with your Google Gemini endpoint.
              </p>
            </div>

            {/* Code Selector Pills */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200">
              {[
                { id: 'math', label: 'Math Gatekeeper (Your Example)' },
                { id: 'ticket', label: 'Ticket Triage Engine' },
                { id: 'lead', label: 'Nested Lead Extractor' },
                { id: 'medical', label: 'Clinical Triage' },
                { id: 'pydantic', label: 'Pydantic V2 Native' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCodeType(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                    codeType === item.id
                      ? 'bg-purple-700 text-white shadow'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Code 1: Math Gatekeeper */}
          {codeType === 'math' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 space-y-2">
                <div className="font-mono font-bold text-purple-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>The Evolved Math Guardrail (Your Exact France Refusal Problem Solved):</span>
                </div>
                <p className="leading-relaxed">
                  In Section 15 &amp; Topic 01, when asking <em>&quot;What is the capital of France?&quot;</em>, zero-shot models often apologize conversationally or leak partial trivia. Here, we enforce a strict <strong>JSON Contract</strong>. By providing one solved math exemplar and one rejected geography exemplar, Gemini 3.8 Flash outputs clean RFC-8259 JSON with <code className="code-inline">&quot;status&quot;: &quot;REJECTED&quot;</code> and <code className="code-inline">&quot;solution&quot;: null</code>, ready for automated routing!
                </p>
              </div>

              <CodeSnippet
                code={mathStructuredCode}
                language="python"
                title="structured_math_gatekeeper.py"
                output={`=== Raw Model Output ===
{
  "is_math_query": false,
  "category": "non_math",
  "status": "REJECTED",
  "steps": null,
  "solution": null,
  "rejection_reason": "Query asks for geography/political capital instead of mathematics."
}

=== Parsed Structured Object ===
Is Math Query    : False
Domain Category  : non_math
Execution Status : REJECTED
Rejection Reason : Query asks for geography/political capital instead of mathematics.`}
              />
            </div>
          )}

          {/* Sub-Code 2: Ticket Triage Engine */}
          {codeType === 'ticket' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-2">
                <div className="font-mono font-bold text-blue-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Enterprise Support Ticket Triage (Categorical Enums &amp; Business Logic):</span>
                </div>
                <p className="leading-relaxed">
                  Notice how few-shot demonstrations calibrate what counts as <code className="code-inline">CRITICAL</code> urgency (e.g. server outage / legal action) vs <code className="code-inline">LOW</code> urgency (shipping questions), and ensure <code className="code-inline">refund_eligible</code> is a boolean rather than text like <code className="code-inline">&quot;yes&quot;</code>.
                </p>
              </div>

              <CodeSnippet
                code={ticketRouterCode}
                language="python"
                title="structured_ticket_triage.py"
                output={`{
  "ticket_prefix": "TCK-TECH",
  "sentiment": "NEGATIVE",
  "urgency": "CRITICAL",
  "category": "TECHNICAL",
  "refund_eligible": false,
  "action_items": [
    "Immediately escalate to Infrastructure On-Call SRE",
    "Rollback firmware push to previous stable release",
    "Initiate bridge call with enterprise account representative"
  ],
  "assigned_queue": "critical_incident_command"
}`}
              />
            </div>
          )}

          {/* Sub-Code 3: Lead Extractor */}
          {codeType === 'lead' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="font-mono font-bold text-emerald-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Deeply Nested JSON Extraction &amp; The Strict Null Standard:</span>
                </div>
                <p className="leading-relaxed">
                  In zero-shot extraction, missing phone numbers or graduation years get filled with strings like <code className="code-inline">&quot;N/A&quot;</code>, <code className="code-inline">&quot;None&quot;</code>, or empty strings <code className="code-inline">&quot;&quot;</code>, which causes crashes in typed databases. The few-shot exemplar demonstrates returning true JSON <code className="code-inline">null</code>.
                </p>
              </div>

              <CodeSnippet
                code={leadExtractorCode}
                language="python"
                title="structured_lead_extractor.py"
                output={`Name      : Dr. Priya Sharma
Title     : Lead AI Researcher
Exp Years : 6
Contact   : {'email': 'priya@deephealth.org', 'phone': '415-555-0199', 'location': 'San Francisco'}
Degree    : {'title': 'Ph.D.', 'institution': 'Stanford University', 'year': 2020}`}
              />
            </div>
          )}

          {/* Sub-Code 4: Clinical Triage */}
          {codeType === 'medical' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-mono font-bold text-amber-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>Clinical Emergency Note Parser (Safety-Critical Enums):</span>
                </div>
                <p className="leading-relaxed">
                  In healthcare and high-reliability systems, schema validation alone is insufficient: the model must reliably classify chest pressure and hypertensive crisis as <code className="code-inline">EMERGENCY_RED</code> without hallucinating softer triage categories. Few-shot exemplars establish this safety threshold.
                </p>
              </div>

              <CodeSnippet
                code={medicalTriageCode}
                language="python"
                title="structured_medical_triage.py"
                output={`Urgency Level : EMERGENCY_RED
Hypertensive  : True
Immediate Plan: Stat 12-lead ECG, troponin I blood draw, and immediate transfer to cardiac cath lab
Attending MD  : True`}
              />
            </div>
          )}

          {/* Sub-Code 5: Pydantic V2 Native */}
          {codeType === 'pydantic' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 space-y-2">
                <div className="font-mono font-bold text-purple-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Pydantic V2 + OpenAI/Gemini SDK Structured Outputs:</span>
                </div>
                <p className="leading-relaxed">
                  Using <code className="code-inline">client.beta.chat.completions.parse(..., response_format=MathGatekeeperSchema)</code> allows the SDK to automatically validate the returned JSON against your Pydantic model. Combining this with few-shot exemplars gives you the ultimate double guarantee: <strong>Pydantic enforces the syntax</strong>, while <strong>Few-Shot exemplars enforce the semantic logic</strong>!
                </p>
              </div>

              <CodeSnippet
                code={pydanticSdkCode}
                language="python"
                title="pydantic_v2_gemini_structured.py"
                output={`Type of object    : <class '__main__.MathGatekeeperSchema'>
Is Math Query     : False
Execution Status  : REJECTED
Domain Category   : out_of_domain
Rejection Reason  : Query asks for geography/political capital instead of mathematics.
Calculated Solution: None`}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ZERO-SHOT VS. FEW-SHOT MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          {/* Case Pills */}
          <div className="flex flex-wrap gap-2">
            {cases.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCaseIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all text-left flex items-center space-x-2 border ${
                  selectedCaseIdx === idx
                    ? 'bg-zinc-900 text-[#fbbf24] border-zinc-700 font-bold shadow'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{cs.title}</span>
              </button>
            ))}
          </div>

          {/* Current Case Header Card */}
          <div className="card-paper p-5 rounded-2xl border border-[#e2ddd6] bg-gradient-to-r from-purple-50/50 via-white to-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-[10px] uppercase font-bold text-purple-700 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded">
                  {currentCase.badge}
                </span>
                <span className="text-xs text-zinc-400 font-mono">Domain: {currentCase.domain}</span>
              </div>
              <h3 className="font-editorial text-lg font-bold text-zinc-900 mt-1">
                {currentCase.title}
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5 max-w-xl">
                {currentCase.desc}
              </p>
            </div>

            {/* Matrix View Toggle */}
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0 self-start sm:self-auto font-mono text-[11px]">
              <button
                onClick={() => setMatrixView('zero')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  matrixView === 'zero' ? 'bg-rose-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ❌ Zero-Shot Failure
              </button>
              <button
                onClick={() => setMatrixView('split')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  matrixView === 'split' ? 'bg-purple-700 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ⚖️ Side-by-Side
              </button>
              <button
                onClick={() => setMatrixView('few')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  matrixView === 'few' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                ✅ Few-Shot Structured
              </button>
            </div>
          </div>

          {/* Target Query Display */}
          <div className="p-3.5 rounded-xl bg-white border border-[#e2ddd6] text-xs font-mono flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-purple-700 font-bold uppercase text-[10px]">Test Query Under Analysis:</span>
              <span className="text-zinc-900 font-bold">&quot;{currentCase.inputQuery}&quot;</span>
            </div>
            <span className="text-[10px] text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">Identical Input for Both Modes</span>
          </div>

          {/* Comparison Columns */}
          <div className={`grid gap-6 ${matrixView === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
            {/* ZERO-SHOT FAILURE */}
            {(matrixView === 'zero' || matrixView === 'split') && (
              <div className="card-paper rounded-2xl border-2 border-rose-300 bg-rose-50/20 p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">✕</span>
                    <span className="font-mono text-xs font-bold text-rose-900 uppercase tracking-wider">
                      Zero-Shot Structured Attempt
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-bold">
                    Parser Status: {currentCase.zeroShotFlaw.parserStatus}
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500">System Instruction Sent:</span>
                    <div className="p-2.5 rounded-lg bg-zinc-900 text-rose-300 border border-rose-500/30 mt-1">
                      &quot;{currentCase.zeroShotFlaw.systemPrompt}&quot;
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-700">Raw Model Response (Unparseable):</span>
                    <div className="p-3 rounded-lg bg-zinc-950 text-rose-200 border border-rose-700/50 mt-1 whitespace-pre-wrap">
                      {currentCase.zeroShotFlaw.rawOutput}
                    </div>
                  </div>
                </div>

                {/* Specific Flaws */}
                <div className="p-3.5 rounded-xl bg-rose-100/70 border border-rose-300 text-xs text-rose-950 space-y-2">
                  <div className="font-mono font-bold text-rose-900 flex items-center space-x-1.5">
                    <span>⚠️</span>
                    <span>Production Breaking Points:</span>
                  </div>
                  <ul className="space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                    {currentCase.zeroShotFlaw.flaws.map((flaw, i) => (
                      <li key={i}>{flaw}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* FEW-SHOT STRUCTURED SUCCESS */}
            {(matrixView === 'few' || matrixView === 'split') && (
              <div className="card-paper rounded-2xl border-2 border-emerald-300 bg-emerald-50/20 p-5 sm:p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                    <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Few-Shot Structured Success
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    100% Schema Validated
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500">Exemplars Injected in Context:</span>
                    <div className="p-2.5 rounded-lg bg-zinc-900 text-zinc-300 border border-purple-500/30 mt-1 space-y-1 max-h-32 overflow-y-auto">
                      {currentCase.fewShotSuccess.exemplars.map((ex, i) => (
                        <div key={i} className="flex space-x-1.5 text-[11px]">
                          <span className={ex.role === 'user' ? 'text-blue-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {ex.role}:
                          </span>
                          <span className="truncate">{ex.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700">Validated JSON Response:</span>
                    <div className="p-3 rounded-lg bg-zinc-950 text-emerald-300 border border-emerald-500/60 mt-1 whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {JSON.stringify(currentCase.fewShotSuccess.parsedObject, null, 2)}
                    </div>
                  </div>
                </div>

                {/* Why It Works */}
                <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <div className="font-mono font-bold text-emerald-900 flex items-center space-x-1.5">
                    <span>💡</span>
                    <span>Mechanistic Victory:</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">
                    {currentCase.fewShotSuccess.whyItWorks}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE JSON SCHEMA SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                <span>💻</span>
                <span>Live Schema Execution Engine</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Interactive Multi-Scenario JSON Validator
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Simulate how Gemini 3.8 Flash handles prompts with and without few-shot schema exemplars.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center space-x-1.5 bg-zinc-100 p-1 rounded-xl border border-zinc-200">
              <button
                onClick={() => setSimMode('without-few-shot')}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  simMode === 'without-few-shot'
                    ? 'bg-rose-600 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                Without Few-Shot (Zero-Shot)
              </button>
              <button
                onClick={() => setSimMode('with-few-shot')}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                  simMode === 'with-few-shot'
                    ? 'bg-purple-700 text-white shadow'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                With Few-Shot Exemplars
              </button>
            </div>
          </div>

          {/* Test Scenario Controls */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono uppercase font-bold text-zinc-500 mb-1">
                Select Query Scenario:
              </label>
              <select
                value={simScenario}
                onChange={(e) => setSimScenario(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-300 font-mono text-xs outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="math-refusal">What is the capital of France? (Math Gatekeeper Refusal - Your Example)</option>
                <option value="math-solve">Solve 3x + 15 = 45 (Math Gatekeeper Solver)</option>
                <option value="ticket-angry">Hardware smashed during delivery, lawyers called! (Support Triage)</option>
                <option value="lead-resume">Elena Rostova: 6yrs ML exp at ETH Zurich, elena@tensor.org (Lead Extractor)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => runSimulator(simScenario, simMode)}
                disabled={isTyping}
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-mono text-xs font-bold transition-all shadow disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>{isTyping ? '⏳ Model Generating...' : '▶ Re-run Live Validation'}</span>
              </button>
            </div>
          </div>

          {/* Simulator Terminal Output */}
          <div className="card-dark p-5 rounded-2xl border border-zinc-800 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px] text-zinc-400">
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${simMode === 'with-few-shot' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span>gemini-3.8-flash // {simMode === 'with-few-shot' ? 'FEW_SHOT_SCHEMA_PIPELINE' : 'ZERO_SHOT_NAIVE_PIPELINE'}</span>
              </div>
              <span className="text-zinc-500">Latency: {validationReport ? `${validationReport.latency}ms` : '---'}</span>
            </div>

            {/* Validation HUD Chips */}
            {validationReport && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1">
                <div className={`p-2 rounded-lg border text-center ${validationReport.rfc8259 ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
                  <div className="text-[10px] text-zinc-400">RFC-8259 JSON</div>
                  <div className="font-bold">{validationReport.rfc8259 ? '✓ PASS' : '✕ FAIL (Fence Leak)'}</div>
                </div>

                <div className={`p-2 rounded-lg border text-center ${validationReport.schemaValid ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
                  <div className="text-[10px] text-zinc-400">Schema Conformance</div>
                  <div className="font-bold">{validationReport.schemaValid ? '✓ 100% VALID' : '✕ INVALID'}</div>
                </div>

                <div className={`p-2 rounded-lg border text-center ${validationReport.pydanticOk ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
                  <div className="text-[10px] text-zinc-400">Key Completeness</div>
                  <div className="font-bold">{validationReport.keysPresent}</div>
                </div>

                <div className={`p-2 rounded-lg border text-center ${validationReport.pydanticOk ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'}`}>
                  <div className="text-[10px] text-zinc-400">Pydantic Parser</div>
                  <div className="font-bold">{validationReport.pydanticOk ? '✓ Model Instantiated' : '✕ ValidationError'}</div>
                </div>
              </div>
            )}

            {/* Code Output Box */}
            <div className="p-4 rounded-xl bg-zinc-950 text-emerald-300 border border-zinc-800 min-h-[120px] whitespace-pre font-mono leading-relaxed overflow-x-auto">
              {terminalText}
              {isTyping && <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1" />}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARCHITECTURE BLUEPRINT */}
      {activeTab === 'architecture' && (
        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="pb-4 border-b border-[#e2ddd6]">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>📐</span>
              <span>Architectural Deep Dive</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              The Dual Constraint Paradigm: Syntactic vs. Semantic Planes
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              Why schemas define what the output looks like, but few-shot exemplars define what the output means.
            </p>
          </div>

          {/* Visual Architecture Diagram */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Plane 1: Syntactic */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-amber-400 font-bold uppercase text-[11px]">Plane 1: Syntactic Constraint</span>
                <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">JSON Schema / Grammar</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                Tools like OpenAI <code className="code-inline">response_format</code> or Gemini <code className="code-inline">response_schema</code> use <strong>Context-Free Grammar (CFG) masking</strong> at the logits level. It guarantees the model outputs valid brackets <code className="code-inline">&#123;&#125;</code>, quoted keys, and proper data types.
              </p>
              <div className="p-3 rounded-xl bg-zinc-950 border border-amber-500/30 text-amber-300 text-[11px]">
                <div>⚠️ The Critical Limitation:</div>
                <div className="text-zinc-400 mt-1">
                  CFG masking knows that &quot;status&quot; must be a string, but it <strong>cannot know</strong> whether &quot;What is the capital of France?&quot; should produce &quot;SOLVED&quot; or &quot;REJECTED&quot;!
                </div>
              </div>
            </div>

            {/* Plane 2: Semantic */}
            <div className="p-6 rounded-2xl bg-zinc-900 border border-purple-800 text-zinc-100 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-purple-800">
                <span className="text-purple-400 font-bold uppercase text-[11px]">Plane 2: Semantic Alignment</span>
                <span className="text-[10px] text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded">Few-Shot Exemplars</span>
              </div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                Few-shot demonstrations prime the transformer multi-head attention layers with the <strong>decision boundary</strong>: non-math queries trigger the rejection branch, missing data triggers the true <code className="code-inline">null</code> value, and angry tickets trigger <code className="code-inline">CRITICAL</code> urgency.
              </p>
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-[11px]">
                <div>✓ The Resulting Synergy:</div>
                <div className="text-zinc-300 mt-1">
                  Syntactic constraints ensure downstream code never crashes with JSONDecodeError, while Few-Shot exemplars ensure business logic is executed flawlessly!
                </div>
              </div>
            </div>
          </div>

          {/* Token Flow Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-[#e2ddd6] rounded-xl overflow-hidden">
              <thead className="bg-zinc-100 border-b border-[#e2ddd6] text-zinc-700">
                <tr>
                  <th className="p-3">Prompting Strategy</th>
                  <th className="p-3">Syntax Integrity</th>
                  <th className="p-3">Business Logic Reliability</th>
                  <th className="p-3">Markdown Fence Immunity</th>
                  <th className="p-3">Production Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ddd6] bg-white">
                <tr>
                  <td className="p-3 font-bold text-rose-700">Zero-Shot Naive</td>
                  <td className="p-3 text-rose-600">Poor (20-40% errors)</td>
                  <td className="p-3 text-rose-600">Low (prone to leaks)</td>
                  <td className="p-3 text-rose-600">High Risk of ```json</td>
                  <td className="p-3 text-rose-600">❌ Anti-Pattern</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-700">Schema Only (JSON Mode)</td>
                  <td className="p-3 text-emerald-600">High (Valid JSON)</td>
                  <td className="p-3 text-amber-600">Medium (Edge cases fail)</td>
                  <td className="p-3 text-emerald-600">Moderate</td>
                  <td className="p-3 text-amber-600">⚠️ Partial Solution</td>
                </tr>
                <tr className="bg-purple-50/50">
                  <td className="p-3 font-bold text-purple-900">Schema + Few-Shot Exemplars</td>
                  <td className="p-3 text-emerald-600 font-bold">Flawless (99.9%+)</td>
                  <td className="p-3 text-emerald-600 font-bold">Airtight Grounding</td>
                  <td className="p-3 text-emerald-600 font-bold">100% Raw Clean JSON</td>
                  <td className="p-3 text-purple-700 font-bold">⭐ Enterprise Standard</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: PRODUCTION BEST PRACTICES & PITFALLS */}
      {activeTab === 'best-practices' && (
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="pb-4 border-b border-[#e2ddd6]">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>🛡️</span>
              <span>Engineering Playbook</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Structured Few-Shot Rules of Engagement
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              Battle-tested rules for building fault-tolerant structured prompting pipelines.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                rule: '1. Never Tolerate Stringified Nulls',
                desc: 'In your exemplars, always explicitly demonstrate JSON null (not "N/A", "None", or ""). Python pydantic parsers treat string "None" as a valid 4-character string instead of an empty value.',
                icon: '🚫'
              },
              {
                rule: '2. Enforce Deterministic Temperature = 0.0',
                desc: 'When generating structured contracts, entropy is your enemy. Set temperature=0.0 or 0.1 so the model picks the highest-probability schema tokens deterministically.',
                icon: '❄️'
              },
              {
                rule: '3. Exemplar Diversity Over Exemplar Volume',
                desc: '2 diverse exemplars (e.g. 1 standard success and 1 boundary refusal) provide superior grounding compared to 10 repetitive positive exemplars, while saving precious prompt tokens.',
                icon: '⚖️'
              },
              {
                rule: '4. Leverage Context Caching in Gemini',
                desc: 'Since few-shot structured system prompts and exemplars are static, Google Gemini automatically caches these prefixes. You get sub-100ms latency and up to 75% cost savings on prompt tokens!',
                icon: '⚡'
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-[#e2ddd6] space-y-2">
                <div className="flex items-center space-x-2 font-mono text-xs font-bold text-zinc-900">
                  <span>{item.icon}</span>
                  <span>{item.rule}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <NoteCallout
            type="tip"
            title="Golden Rule of Structured Few-Shot Prompting"
            text="When writing few-shot exemplars for structured JSON, always pass the assistant content through json.dumps() in Python. This guarantees that quotes, escaped characters, and booleans in your exemplars are 100% compliant with RFC-8259, teaching the LLM the exact token sequence to mirror!"
          />
        </div>
      )}
    </section>
  );
}
