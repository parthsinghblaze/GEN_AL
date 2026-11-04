'use client';

import React, { useState, useEffect } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';

interface CotComparisonItem {
  id: string;
  title: string;
  category: string;
  prompt: string;
  naiveOutput: {
    answer: string;
    verdict: 'FAIL';
    explanation: string;
  };
  cotOutput: {
    steps: string[];
    finalAnswer: string;
    verdict: 'PASS';
    explanation: string;
  };
}

export default function Section16ChainOfThought() {
  const [activeTab, setActiveTab] = useState<'python-code' | 'interactive-stepper' | 'cot-comparison' | 'architecture' | 'best-practices'>('python-code');
  const [codeType, setCodeType] = useState<'user-exact' | 'autonomous-loop' | 'zero-cot' | 'fibonacci' | 'pydantic-cot'>('user-exact');

  // Stepper Visualizer State
  const [stepperProblem, setStepperProblem] = useState<'fibonacci' | 'bodmas' | 'logic'>('fibonacci');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  // Comparison Selector
  const [selectedCompIdx, setSelectedCompIdx] = useState<number>(0);

  // Python Code Snippets
  const userExactCode = `import os
from dotenv import load_dotenv
from openai import OpenAI

# 1. Load secrets securely from .env (Best Practice: Never hardcode raw API keys)
load_dotenv()

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

print("gemini response:")
SYSTEM_PROMPT = """
You're an expert AI Assistant in resolving user queries using chain of thought.
You work on START, PLAN and OUTPUT steps.
You need to first PLAN what needs to be done. The PLAN can be multiple steps.
Once you think enough PLAN has been done, finally you can give an OUTPUT.

Rules:
- Strictly Follow the given JSON output format.
- Only run one step at a time.
- The sequence of steps is START (where user gives an input), PLAN (that can be multiple times) and finally OUTPUT (which is going to be displayed to the user)

Output JSON format:
{
    "step": "START" | "PLAN" | "OUTPUT",
    "content": "string"
}

Example:

START: Hey, Can you solve 2+2*5 / 10
PLAN: {"step": "PLAN", "content": "seems like user is interested in math problem"}
PLAN: {"step": "PLAN", "content": "Looking at the problem, we should solve this using BODMAS method"}
PLAN: {"step": "PLAN", "content": "first we should solve the multiplication and division left to right: 2*5 = 10"}
PLAN: {"step": "PLAN", "content": "then solve division 10 / 10 = 1"}
PLAN: {"step": "PLAN", "content": "then solve addition 2 + 1 = 3"}
PLAN: {"step": "PLAN", "content": "final answer is 3"}
OUTPUT: {"step": "OUTPUT", "content": "The answer to 2+2*5 / 10 is 3"}
"""

# Calling Gemini 3.8 Flash with your Structured CoT System Prompt
response = client.chat.completions.create(
    model="gemini-3.8-flash",
    response_format={"type": "json_object"},
    messages=[
        {
            "role": "system",
            "content": SYSTEM_PROMPT
        },
        {
            "role": "user",
            "content": "What is fibonacie series?"
        }
    ]
)

print(response.choices[0].message.content)`;

  const autonomousLoopCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

SYSTEM_PROMPT = """You are an Agentic Reasoning AI.
You execute queries step-by-step using START -> PLAN -> OUTPUT.
Return strictly valid RFC-8259 JSON:
{
    "step": "PLAN" | "OUTPUT",
    "content": "string",
    "ready_for_output": boolean
}
Rules:
- Generate ONE reasoning step at a time in "content".
- If further reasoning or verification is needed, set "step": "PLAN" and "ready_for_output": false.
- When ready to give final answer to user, set "step": "OUTPUT" and "ready_for_output": true.
"""

def solve_with_cot_loop(user_query: str):
    print(f"\\n🚀 STARTING CHAIN OF THOUGHT FOR: \\"{user_query}\\"\\n" + "-"*50)
    
    # Initialize message history
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"START: {user_query}"}
    ]
    
    step_num = 1
    max_steps = 8
    
    while step_num <= max_steps:
        response = client.chat.completions.create(
            model="gemini-3.8-flash",
            temperature=0.2,
            response_format={"type": "json_object"},
            messages=messages
        )
        
        raw_content = response.choices[0].message.content
        data = json.loads(raw_content)
        
        step_type = data.get("step")
        thought = data.get("content")
        is_done = data.get("ready_for_output", False)
        
        if step_type == "PLAN":
            print(f"🧠 [STEP {step_num} - PLAN] : {thought}")
            # Feed the model's own thought back into conversation context!
            messages.append({"role": "assistant", "content": raw_content})
            messages.append({"role": "user", "content": "Next step or final output?"})
        elif step_type == "OUTPUT":
            print(f"\\n🎯 [FINAL OUTPUT] :\\n{thought}\\n" + "="*50)
            return thought
            
        if is_done or step_type == "OUTPUT":
            break
            
        step_num += 1

# Execute Autonomous Loop on the User's Fibonacci Query
solve_with_cot_loop("What is fibonacie series?")`;

  const zeroShotCotCode = `import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# KOJIMA ET AL. (2022) ZERO-SHOT CHAIN OF THOUGHT:
# Simply appending "Let's think step by step." unlocks latent reasoning paths!
query = """A farmer has 17 sheep. All but 9 run away. 
Then the farmer buys 4 more sheep, and half of the total sheep give birth to twin lambs. 
How many total sheep and lambs does the farmer have now?"""

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.1,
    messages=[
        {
            "role": "system",
            "content": "You are a logical problem solver."
        },
        {
            "role": "user",
            # The magic trigger phrase that transforms zero-shot guessing into CoT reasoning
            "content": f"{query}\\n\\nLet's think step by step."
        }
    ]
)

print("=== ZERO-SHOT COT REASONING TRACE ===")
print(response.choices[0].message.content)`;

  const fibonacciDeepCode = `import os
import json
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

# Multi-Step Pedagogical CoT for Explaining Complex Concepts
SYSTEM_PROMPT = """Explain mathematical and CS topics using structured Chain of Thought.
Format your answer as pure JSON matching:
{
  "concept_breakdown": {
    "step_1_origin": "Historical / Etymological context",
    "step_2_recurrence_relation": "Exact mathematical equation F(n)",
    "step_3_base_cases": "Initial values F(0) and F(1)",
    "step_4_sample_sequence": "First 10 numbers generated step-by-step",
    "step_5_golden_ratio": "Connection to phi (1.618033...)",
    "step_6_code_implementation": "Python code snippet"
  },
  "user_summary": "Concise intuitive summary"
}"""

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    temperature=0.1,
    response_format={"type": "json_object"},
    messages=[
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "What is fibonacie series?"}
    ]
)

result = json.loads(response.choices[0].message.content)
print("=== Mathematical Definition ===")
print("Recurrence :", result["concept_breakdown"]["step_2_recurrence_relation"])
print("Base Cases :", result["concept_breakdown"]["step_3_base_cases"])
print("Sequence   :", result["concept_breakdown"]["step_4_sample_sequence"])
print("Golden Ratio:", result["concept_breakdown"]["step_5_golden_ratio"])
print("\\n=== Intuitive Summary ===")
print(result["user_summary"])`;

  const pydanticCotCode = `import os
from typing import List, Optional
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from openai import OpenAI

load_dotenv()

# Pydantic Schema that forces internal Chain of Thought before giving the answer
class ChainOfThoughtReasoning(BaseModel):
    problem_type: str = Field(description="Classification of problem (e.g. arithmetic, logic, algorithm)")
    identified_constraints: List[str] = Field(description="Explicit constraints or edge cases extracted from user prompt")
    reasoning_steps: List[str] = Field(description="Sequential logical steps (e.g., Step 1, Step 2, Step 3)")
    verification: str = Field(description="Self-check verifying whether the calculated steps are correct")
    final_output: str = Field(description="The crisp user-facing answer")

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

completion = client.beta.chat.completions.parse(
    model="gemini-3.8-flash",
    response_format=ChainOfThoughtReasoning,
    messages=[
        {
            "role": "system",
            "content": "You are a rigorous analytical engine. You MUST write out reasoning_steps and verification before returning final_output."
        },
        {
            "role": "user",
            "content": "Calculate the 7th term of the Fibonacci sequence starting at F(0)=0, F(1)=1."
        }
    ]
)

cot: ChainOfThoughtReasoning = completion.choices[0].message.parsed
print(f"Problem Type : {cot.problem_type}")
print(f"Constraints  : {cot.identified_constraints}")
print("\\n--- Reasoning Steps (Chain of Thought) ---")
for idx, step in enumerate(cot.reasoning_steps, 1):
    print(f"Step {idx}: {step}")
print(f"\\nVerification : {cot.verification}")
print(f"Final Output : {cot.final_output}")`;

  // Stepper Visualizer Data
  const stepperScenarios = {
    fibonacci: {
      query: "What is fibonacie series?",
      steps: [
        { type: "START", badge: "User Input", label: "User Prompt Ingested", content: "What is fibonacie series?" },
        { type: "PLAN", badge: "Plan 1 // Intent", label: "Semantic Identification", content: "User is asking about the Fibonacci Sequence. Note typo 'fibonacie' -> Normalize to 'Fibonacci'." },
        { type: "PLAN", badge: "Plan 2 // Base Cases", label: "Formal Definition Setup", content: "Define recurrence relation: F(n) = F(n-1) + F(n-2). Set initial base cases: F(0) = 0 and F(1) = 1." },
        { type: "PLAN", badge: "Plan 3 // Sequence Generation", label: "Manual Term Verification", content: "Compute first 8 terms: 0, 1, (0+1)=1, (1+1)=2, (1+2)=3, (2+3)=5, (3+5)=8, (5+8)=13." },
        { type: "PLAN", badge: "Plan 4 // Real World Ties", label: "Nature & Golden Ratio Connection", content: "Note ratio of consecutive terms converges to Golden Ratio φ ≈ 1.618. Found in sunflower seed spirals, pinecones, and computer algorithms (dynamic programming)." },
        { type: "OUTPUT", badge: "Final Output", label: "Customer-Facing Delivery", content: "The Fibonacci Series is a sequence of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.\\n\\n• Mathematical Formula: F(n) = F(n-1) + F(n-2)\\n• Base Values: F(0) = 0, F(1) = 1\\n• First 10 Numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34\\n• Golden Ratio Connection: The ratio between successive terms approaches φ ≈ 1.618033, ubiquitous in nature and computer science recursion." }
      ]
    },
    bodmas: {
      query: "Can you solve 2 + 2 * 5 / 10?",
      steps: [
        { type: "START", badge: "User Input", label: "Arithmetic Query", content: "Can you solve 2 + 2 * 5 / 10?" },
        { type: "PLAN", badge: "Plan 1 // Operator Parsing", label: "Hierarchy of Operations", content: "Identify expression: 2 + 2 * 5 / 10. Operators present: Addition (+), Multiplication (*), Division (/)." },
        { type: "PLAN", badge: "Plan 2 // Order Rule", label: "BODMAS Precedence", content: "According to BODMAS/PEMDAS, Multiplication and Division have equal precedence and must be evaluated from left to right before Addition." },
        { type: "PLAN", badge: "Plan 3 // Multiply & Divide", label: "Intermediate Evaluation", content: "Evaluate 2 * 5 = 10. The expression becomes: 2 + (10 / 10). Next evaluate division: 10 / 10 = 1." },
        { type: "PLAN", badge: "Plan 4 // Addition", label: "Final Step Arithmetic", content: "Expression is now: 2 + 1 = 3." },
        { type: "OUTPUT", badge: "Final Output", label: "Deterministic Answer", content: "The answer to 2 + 2 * 5 / 10 is 3.\\n\\nStep-by-step breakdown (BODMAS):\\n1. Multiply: 2 * 5 = 10\\n2. Divide: 10 / 10 = 1\\n3. Add: 2 + 1 = 3" }
      ]
    },
    logic: {
      query: "How many 'r's are in the word 'strawberry'?",
      steps: [
        { type: "START", badge: "User Input", label: "Character Token Problem", content: "How many 'r's are in the word 'strawberry'?" },
        { type: "PLAN", badge: "Plan 1 // Tokenization Warning", label: "BPE Token Trap Detection", content: "BPE tokenizers often encode 'strawberry' as a single token [straw, berry], causing naive models to falsely answer 2. Must spell letter by letter." },
        { type: "PLAN", badge: "Plan 2 // Letter Decomposition", label: "Array Splitting", content: "Characters: s - t - r (1) - a - w - b - e - r (2) - r (3) - y." },
        { type: "PLAN", badge: "Plan 3 // Position Verification", label: "Indexing Check", content: "Position 3 = 'r', Position 8 = 'r', Position 9 = 'r'. Total count = 3." },
        { type: "OUTPUT", badge: "Final Output", label: "Guaranteed Accuracy", content: "There are 3 'r's in the word 'strawberry'.\\n\\nBreakdown:\\n• st[r]awberry (1st 'r')\\n• strawbe[r]ry (2nd 'r')\\n• strawber[r]y (3rd 'r')" }
      ]
    }
  };

  const currentScenario = stepperScenarios[stepperProblem];

  // Auto-play for Stepper
  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStepIdx((prev) => (prev + 1) % currentScenario.steps.length);
      }, 2200);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentScenario.steps.length]);

  // Comparison Test Cases
  const comparisonCases: CotComparisonItem[] = [
    {
      id: 'bodmas-order',
      title: '01. Order of Operations (2 + 2 * 5 / 10)',
      category: 'Mathematical Ambiguity',
      prompt: 'Can you solve 2 + 2 * 5 / 10?',
      naiveOutput: {
        answer: '2 + 2 = 4, 4 * 5 = 20, 20 / 10 = 2. The answer is 2.',
        verdict: 'FAIL',
        explanation: 'Naive forward-pass left-to-right evaluation ignores operator precedence (BODMAS/PEMDAS) and yields the wrong answer (2 instead of 3).'
      },
      cotOutput: {
        steps: [
          '1. Identify operators: Addition (+), Multiplication (*), Division (/).',
          '2. According to standard arithmetic rules (PEMDAS), Multiplication and Division take precedence over Addition.',
          '3. Compute 2 * 5 = 10.',
          '4. Compute 10 / 10 = 1.',
          '5. Add the remaining term: 2 + 1 = 3.'
        ],
        finalAnswer: 'The answer is 3.',
        verdict: 'PASS',
        explanation: 'Generating intermediate tokens forces the model to register operator precedence before outputting the final number.'
      }
    },
    {
      id: 'strawberry-r',
      title: '02. Character Counting in BPE Tokens ("strawberry")',
      category: 'Sub-word Tokenization Trap',
      prompt: 'How many times does the letter "r" appear in the word "strawberry"?',
      naiveOutput: {
        answer: 'The letter "r" appears 2 times in the word "strawberry".',
        verdict: 'FAIL',
        explanation: 'Byte-Pair Encoding (BPE) lumps "berry" into sub-word tokens. Without character-by-character unfolding, transformers cannot "see" individual characters.'
      },
      cotOutput: {
        steps: [
          '1. Spell out the word into an explicit list of characters: ["s", "t", "r", "a", "w", "b", "e", "r", "r", "y"].',
          '2. Character 3: "r" (Count = 1)',
          '3. Character 8: "r" (Count = 2)',
          '4. Character 9: "r" (Count = 3)',
          '5. Summing the count yields 3.'
        ],
        finalAnswer: 'There are exactly 3 "r"s in "strawberry".',
        verdict: 'PASS',
        explanation: 'Listing characters sequentially converts a latent perception failure into an explicit token matching problem.'
      }
    },
    {
      id: 'logic-sheep',
      title: '03. Linguistic Distractor ("All but 9 run away")',
      category: 'Logical & Semantic Trick',
      prompt: 'A farmer has 17 sheep. All but 9 run away. How many sheep are left with the farmer?',
      naiveOutput: {
        answer: '17 - 9 = 8. There are 8 sheep left with the farmer.',
        verdict: 'FAIL',
        explanation: 'Naive completion matches the surface pattern "17 sheep minus 9 sheep" and performs automatic subtraction, failing the reading comprehension test.'
      },
      cotOutput: {
        steps: [
          '1. Analyze the statement: "All but 9 run away".',
          '2. "All but 9" means that 9 sheep stayed behind, while the rest ran away.',
          '3. The number of sheep that ran away is 17 - 9 = 8.',
          '4. The question asks for how many sheep are LEFT with the farmer, which is the 9 that stayed.'
        ],
        finalAnswer: 'There are 9 sheep left with the farmer.',
        verdict: 'PASS',
        explanation: 'Chain of thought isolates the phrase meaning before executing arithmetic, avoiding the subtraction reflex.'
      }
    }
  ];

  const currentComp = comparisonCases[selectedCompIdx];

  return (
    <section id="sec-chain-of-thought" className="space-y-10 scroll-mt-24 pt-8 border-t-2 border-purple-800/40">
      {/* Title Banner */}
      <div className="border-b-2 border-purple-800/40 pb-3 flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest bg-purple-900/40 text-purple-300 border border-purple-700/50 px-3.5 py-1.5 rounded-lg shadow-sm">
          Section 16 // Topic 03 // Deep Reasoning Paradigms
        </span>
        <span className="font-mono text-[11px] text-zinc-500 font-bold flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>START → PLAN → OUTPUT State Machine</span>
        </span>
      </div>

      {/* Header */}
      <div className="flex items-start space-x-3">
        <span className="font-editorial text-3xl font-black text-purple-700">03</span>
        <div>
          <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
            Cognitive Computation &amp; Working Memory
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
            Chain of Thought (CoT): Structured Reasoning &amp; State Machine Planning
          </h2>
          <p className="text-xs text-[#71717a] font-mono mt-1">
            Why LLMs fail on direct answers, how generating intermediate tokens expands effective compute via KV-cache working memory, and production patterns spanning single-turn JSON scaffolding, autonomous loops, and Pydantic validation.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#e2ddd6] pb-3">
        {[
          { id: 'python-code', label: '🐍 Python Code (Your START-PLAN-OUTPUT)', icon: '🐍' },
          { id: 'interactive-stepper', label: '⚡ Interactive Thought Stepper', icon: '🧠' },
          { id: 'cot-comparison', label: '⚔️ Naive vs. CoT Showdown', icon: '⚖️' },
          { id: 'architecture', label: '📐 Why CoT Works: The KV-Memory Theory', icon: '🔬' },
          { id: 'best-practices', label: '📋 Production Rules & Cost Governance', icon: '🛡️' },
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
                Chain of Thought Implementations (Google Gemini + OpenAI SDK)
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Explore your exact START-PLAN-OUTPUT prompt, autonomous agentic loops, and Pydantic CoT models.
              </p>
            </div>

            {/* Code Selector Pills */}
            <div className="flex flex-wrap gap-1.5 bg-zinc-100 p-1.5 rounded-xl border border-zinc-200">
              {[
                { id: 'user-exact', label: 'Your Exact Script (.env Secured)' },
                { id: 'autonomous-loop', label: 'Autonomous Agentic Loop' },
                { id: 'fibonacci', label: 'Fibonacci Multi-Step Deep Dive' },
                { id: 'zero-cot', label: 'Zero-Shot "Think Step-by-Step"' },
                { id: 'pydantic-cot', label: 'Pydantic CoT Schema' },
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

          {/* Sub-Code 1: User's Exact Script */}
          {codeType === 'user-exact' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 space-y-2">
                <div className="font-mono font-bold text-purple-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Your Exact START → PLAN → OUTPUT System Prompt (Secured with .env):</span>
                </div>
                <p className="leading-relaxed">
                  This script implements your state machine architecture. Note that we secured the API key with <code className="code-inline">os.getenv(&quot;GEMINI_API_KEY&quot;)</code> so secrets are never committed to git. When queried with <em>&quot;What is fibonacie series?&quot;</em>, Gemini 3.8 Flash adheres strictly to your schema and decomposes the concept before producing the final answer!
                </p>
              </div>

              <CodeSnippet
                code={userExactCode}
                language="python"
                title="cot_user_exact.py"
                output={`gemini response:
{
  "step": "PLAN",
  "content": "The user is asking for an explanation of the Fibonacci series (with a slight typo 'fibonacie'). I need to: 1) Define what the Fibonacci sequence is, 2) Explain how each term is calculated (F(n) = F(n-1) + F(n-2)), 3) Provide the initial base values (0, 1), and 4) Show the first few numbers in the series (0, 1, 1, 2, 3, 5, 8...)."
}`}
              />

              <NoteCallout
                type="tip"
                title="Observation on Single-Turn vs Multi-Turn CoT"
                text="In your single-turn call, because the prompt states 'Only run one step at a time', the model correctly returns the first 'PLAN' step! To see the entire sequence executed dynamically until 'OUTPUT' is reached, check out the 'Autonomous Agentic Loop' tab next!"
              />
            </div>
          )}

          {/* Sub-Code 2: Autonomous Loop */}
          {codeType === 'autonomous-loop' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 space-y-2">
                <div className="font-mono font-bold text-blue-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>The Autonomous Agentic Loop (Running Step-by-Step until OUTPUT):</span>
                </div>
                <p className="leading-relaxed">
                  To turn your START-PLAN-OUTPUT prompt into a living agent, this Python script executes a <code className="code-inline">while</code> loop. In each turn, the model emits one <code className="code-inline">PLAN</code>. That thought is fed back into the message history, enabling the model to reflect on its own prior thoughts until it sets <code className="code-inline">&quot;step&quot;: &quot;OUTPUT&quot;</code>!
                </p>
              </div>

              <CodeSnippet
                code={autonomousLoopCode}
                language="python"
                title="cot_autonomous_loop.py"
                output={`🚀 STARTING CHAIN OF THOUGHT FOR: "What is fibonacie series?"
--------------------------------------------------
🧠 [STEP 1 - PLAN] : Identify the topic: Fibonacci sequence (user wrote 'fibonacie'). Plan explanation structure: definition, formula, initial numbers, and significance.
🧠 [STEP 2 - PLAN] : Define the core mathematical rule: each number is the sum of the two preceding ones. State initial conditions: F(0)=0, F(1)=1.
🧠 [STEP 3 - PLAN] : Calculate the first 10 numbers explicitly: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 to provide clear visual intuition.
🧠 [STEP 4 - PLAN] : Mention the connection to the Golden Ratio (phi ≈ 1.618) and real-world occurrences in nature (spiral phyllotaxis in sunflowers). All necessary planning is complete.

🎯 [FINAL OUTPUT] :
The Fibonacci sequence is an infinite series of numbers where each number is the sum of the two preceding ones.

• Base Values: F(0) = 0, F(1) = 1
• Recurrence Formula: F(n) = F(n-1) + F(n-2)
• Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
• Real World: The ratio of successive terms converges to the Golden Ratio (φ ≈ 1.618), found in pinecones, tree branches, and spiral galaxies!
==================================================`}
              />
            </div>
          )}

          {/* Sub-Code 3: Fibonacci Multi-Step */}
          {codeType === 'fibonacci' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="font-mono font-bold text-emerald-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Structured Concept Deconstruction (Your Fibonacci Query Deepened):</span>
                </div>
                <p className="leading-relaxed">
                  This pipeline forces the LLM to populate specific sub-reasoning fields: recurrence relation, base cases, manual term derivation, and the Golden Ratio, ensuring no critical technical details are omitted.
                </p>
              </div>

              <CodeSnippet
                code={fibonacciDeepCode}
                language="python"
                title="fibonacci_concept_deconstruction.py"
                output={`=== Mathematical Definition ===
Recurrence : F(n) = F(n-1) + F(n-2) for n >= 2
Base Cases : F(0) = 0, F(1) = 1
Sequence   : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
Golden Ratio: As n -> infinity, F(n)/F(n-1) approaches phi = (1 + sqrt(5))/2 ≈ 1.6180339887

=== Intuitive Summary ===
The Fibonacci series is a sequence where each number equals the sum of the previous two numbers, forming the backbone of recursive algorithms and patterns in nature.`}
              />
            </div>
          )}

          {/* Sub-Code 4: Zero-Shot CoT */}
          {codeType === 'zero-cot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 space-y-2">
                <div className="font-mono font-bold text-amber-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  <span>The Seminal Discovery: Zero-Shot CoT (&quot;Let&apos;s think step by step&quot;):</span>
                </div>
                <p className="leading-relaxed">
                  In 2022, Kojima et al. discovered that simply appending the 5-word trigger phrase <code className="code-inline">&quot;Let&apos;s think step by step.&quot;</code> to any zero-shot prompt dramatically boosts math accuracy from ~17% to over 78% on GSM8K without any few-shot examples!
                </p>
              </div>

              <CodeSnippet
                code={zeroShotCotCode}
                language="python"
                title="zero_shot_step_by_step.py"
                output={`=== ZERO-SHOT COT REASONING TRACE ===
Let's break this problem down step by step:

1. Initial sheep count: The farmer starts with 17 sheep.
2. The statement says "All but 9 run away". 
   - This means exactly 9 sheep remained on the farm.
   - (17 - 9 = 8 sheep ran away, leaving 9 behind).
3. The farmer buys 4 more sheep:
   - Current total sheep = 9 + 4 = 13 sheep.
4. "Half of the total sheep give birth to twin lambs":
   - Wait, can half of 13 give birth? In practical math, 13 / 2 = 6.5 (or if rounded to 6 sheep giving birth).
   - Assuming 6 sheep give birth to twins (2 lambs each): 6 * 2 = 12 lambs.
   - Total sheep and lambs = 13 sheep + 12 lambs = 25 animals.`}
              />
            </div>
          )}

          {/* Sub-Code 5: Pydantic CoT */}
          {codeType === 'pydantic-cot' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-purple-950 space-y-2">
                <div className="font-mono font-bold text-purple-900 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  <span>Pydantic V2 CoT Schema (Type-Safe Reasoning Scaffolding):</span>
                </div>
                <p className="leading-relaxed">
                  By defining <code className="code-inline">reasoning_steps: List[str]</code> and <code className="code-inline">verification: str</code> before <code className="code-inline">final_output: str</code> in the Pydantic schema, the model is physically constrained to generate its step-by-step reasoning tokens before it can emit the final answer!
                </p>
              </div>

              <CodeSnippet
                code={pydanticCotCode}
                language="python"
                title="pydantic_cot_reasoning.py"
                output={`Problem Type : arithmetic_sequence
Constraints  : ['Starting index F(0)=0, F(1)=1', 'Find the 7th term (F(6) or F(7) depending on 0-indexing)']

--- Reasoning Steps (Chain of Thought) ---
Step 1: Clarify 0-indexed terms: F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13.
Step 2: If 1-indexed (1st term is 0): 1st=0, 2nd=1, 3rd=1, 4th=2, 5th=3, 6th=5, 7th=8.
Step 3: In standard mathematics, the 7th Fibonacci number is F(7) = 13 (or F(6) = 8 under 0-based counting). Let us provide both clearly.

Verification : Verified via recursive addition: 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13. Arithmetic verified.
Final Output : The 7th term of the Fibonacci sequence is 13 (evaluated as F(7)), or 8 if counting strictly 0-indexed terms starting at F(0).`}
              />
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE STEPPER VISUALIZER */}
      {activeTab === 'interactive-stepper' && (
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2ddd6] gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                <span>🧠</span>
                <span>Visual State Machine Runner</span>
              </div>
              <h3 className="font-editorial text-xl font-bold text-zinc-900">
                Interactive START → PLAN → OUTPUT State Machine
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                Watch the model transition between planning states before emitting the user-facing output.
              </p>
            </div>

            {/* Problem Selector & Auto-Play */}
            <div className="flex items-center space-x-2 shrink-0">
              <select
                value={stepperProblem}
                onChange={(e) => {
                  setStepperProblem(e.target.value as any);
                  setCurrentStepIdx(0);
                  setIsAutoPlaying(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 font-mono text-xs font-bold text-zinc-800 outline-none"
              >
                <option value="fibonacci">What is fibonacie series? (Your Query)</option>
                <option value="bodmas">2 + 2 * 5 / 10 (Your BODMAS Example)</option>
                <option value="logic">How many 'r's in 'strawberry'?</option>
              </select>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  isAutoPlaying
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-purple-700 text-white hover:bg-purple-800'
                }`}
              >
                <span>{isAutoPlaying ? '⏸ Pause' : '▶ Auto-Step'}</span>
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="grid grid-cols-6 gap-1.5">
            {currentScenario.steps.map((st, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentStepIdx(idx);
                  setIsAutoPlaying(false);
                }}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  currentStepIdx === idx
                    ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-sm font-bold scale-102 ring-2 ring-purple-400'
                    : idx < currentStepIdx
                    ? 'border-emerald-300 bg-emerald-50/50 text-emerald-800'
                    : 'border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
                }`}
              >
                <div className="font-mono text-[10px] font-bold">
                  {st.type === 'START' ? '🔵 START' : st.type === 'OUTPUT' ? '🟢 OUTPUT' : `🟣 PLAN ${idx}`}
                </div>
                <div className="text-[10px] truncate text-zinc-600 mt-0.5">{st.label}</div>
              </button>
            ))}
          </div>

          {/* Active Step Visual Stage */}
          <div className="card-dark p-6 rounded-2xl border border-zinc-800 font-mono text-xs space-y-4 min-h-[220px] flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 text-[11px]">
              <div className="flex items-center space-x-2">
                <span className={`w-3 h-3 rounded-full ${
                  currentScenario.steps[currentStepIdx].type === 'START'
                    ? 'bg-blue-500'
                    : currentScenario.steps[currentStepIdx].type === 'OUTPUT'
                    ? 'bg-emerald-500 animate-ping'
                    : 'bg-purple-500'
                }`} />
                <span className="font-bold text-zinc-200">
                  CURRENT STATE: [{currentScenario.steps[currentStepIdx].type}]
                </span>
                <span className="text-zinc-500">// {currentScenario.steps[currentStepIdx].badge}</span>
              </div>
              <span className="text-zinc-500">Step {currentStepIdx + 1} of {currentScenario.steps.length}</span>
            </div>

            {/* JSON Output Payload */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="text-zinc-500 text-[10px]">// Active Payload Emitted by LLM:</div>
              <div className="text-emerald-400 font-bold whitespace-pre-wrap leading-relaxed">
                {JSON.stringify({
                  step: currentScenario.steps[currentStepIdx].type,
                  content: currentScenario.steps[currentStepIdx].content
                }, null, 2)}
              </div>
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
              <button
                disabled={currentStepIdx === 0}
                onClick={() => setCurrentStepIdx((prev) => Math.max(0, prev - 1))}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white disabled:opacity-30"
              >
                ← Previous Step
              </button>
              <span className="text-[11px] text-zinc-500">
                {currentScenario.steps[currentStepIdx].type === 'OUTPUT' ? '✅ Execution Complete' : 'Thinking in progress...'}
              </span>
              <button
                disabled={currentStepIdx === currentScenario.steps.length - 1}
                onClick={() => setCurrentStepIdx((prev) => Math.min(currentScenario.steps.length - 1, prev + 1))}
                className="px-3.5 py-1.5 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 disabled:opacity-30"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NAIVE VS. COT SHOWDOWN */}
      {activeTab === 'cot-comparison' && (
        <div className="space-y-6">
          {/* Comparison Pills */}
          <div className="flex flex-wrap gap-2">
            {comparisonCases.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setSelectedCompIdx(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all text-left flex items-center space-x-2 border ${
                  selectedCompIdx === idx
                    ? 'bg-zinc-900 text-[#fbbf24] border-zinc-700 font-bold shadow'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>{cs.title}</span>
              </button>
            ))}
          </div>

          {/* Test Case Overview */}
          <div className="card-paper p-5 rounded-2xl border border-[#e2ddd6] bg-gradient-to-r from-purple-50/40 via-white to-amber-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                Category: {currentComp.category}
              </span>
              <h3 className="font-editorial text-lg font-bold text-zinc-900 mt-1">
                {currentComp.title}
              </h3>
              <p className="text-xs text-zinc-600 font-mono mt-1">
                Prompt Sent: <span className="font-bold text-zinc-900">&quot;{currentComp.prompt}&quot;</span>
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* NAIVE ZERO-SHOT GUESSING */}
            <div className="card-paper rounded-2xl border-2 border-rose-300 bg-rose-50/20 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">✕</span>
                  <span className="font-mono text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Direct Zero-Shot Answer (No CoT)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-bold">
                  VERDICT: {currentComp.naiveOutput.verdict}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-500">Immediate Model Output:</span>
                  <div className="p-3 rounded-lg bg-zinc-950 text-rose-200 border border-rose-700/50 mt-1 leading-relaxed">
                    &quot;{currentComp.naiveOutput.answer}&quot;
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-100/70 border border-rose-300 text-xs text-rose-950 space-y-1">
                  <div className="font-mono font-bold text-rose-900">Why It Failed:</div>
                  <p className="leading-relaxed text-[11px]">
                    {currentComp.naiveOutput.explanation}
                  </p>
                </div>
              </div>
            </div>

            {/* CHAIN OF THOUGHT REASONING */}
            <div className="card-paper rounded-2xl border-2 border-emerald-300 bg-emerald-50/20 p-5 sm:p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Chain of Thought (CoT Reasoning)
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  VERDICT: {currentComp.cotOutput.verdict}
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-purple-700">Intermediate Thinking Steps:</span>
                  <div className="p-3 rounded-lg bg-zinc-950 text-zinc-300 border border-purple-500/30 mt-1 space-y-1 text-[11px]">
                    {currentComp.cotOutput.steps.map((st, i) => (
                      <div key={i} className="text-purple-300">
                        {st}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-700">Final Answer:</span>
                  <div className="p-2.5 rounded-lg bg-zinc-900 text-emerald-300 border border-emerald-500/60 mt-1 font-bold">
                    &quot;{currentComp.cotOutput.finalAnswer}&quot;
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-100/70 border border-emerald-300 text-xs text-emerald-950 space-y-1">
                  <div className="font-mono font-bold text-emerald-900">Mechanistic Victory:</div>
                  <p className="leading-relaxed text-[11px]">
                    {currentComp.cotOutput.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ARCHITECTURE & KV-CACHE THEORY */}
      {activeTab === 'architecture' && (
        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="pb-4 border-b border-[#e2ddd6]">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>🔬</span>
              <span>Theoretical Foundations</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Why Chain of Thought Works: The KV-Memory Theory
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              The mathematical and architectural explanation of why autoregressive transformers need intermediate tokens to perform reasoning.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-100 space-y-3 font-mono text-xs">
              <div className="text-amber-400 font-bold uppercase text-[11px]">1. The Fixed-Compute Bottleneck</div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                A transformer has a fixed number of layers <code className="code-inline">L</code>. When predicting the very next token, it can only perform exactly <code className="code-inline">O(L)</code> sequential matrix multiplications. For problems requiring <code className="code-inline">O(N)</code> reasoning steps, a single forward-pass is mathematically incapable of solving it.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-purple-800 text-zinc-100 space-y-3 font-mono text-xs">
              <div className="text-purple-400 font-bold uppercase text-[11px]">2. KV-Cache as Working Memory</div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                When the model outputs <code className="code-inline">&quot;PLAN&quot;</code> tokens, those tokens are appended to the Key-Value (KV) cache. This acts as an external RAM scratchpad. When computing Step 4, attention heads can attend back to the results of Step 1, 2, and 3!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900 border border-emerald-800 text-zinc-100 space-y-3 font-mono text-xs">
              <div className="text-emerald-400 font-bold uppercase text-[11px]">3. Test-Time Compute Scaling</div>
              <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                Chain of thought is the engine powering modern reasoning models (like Gemini 2.0 Flash Thinking, OpenAI o1/o3, and DeepSeek-R1). It trades token budget for cognitive accuracy: more thinking tokens = higher IQ!
              </p>
            </div>
          </div>

          {/* Token Flow Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border border-[#e2ddd6] rounded-xl overflow-hidden">
              <thead className="bg-zinc-100 border-b border-[#e2ddd6] text-zinc-700">
                <tr>
                  <th className="p-3">Reasoning Architecture</th>
                  <th className="p-3">Working Memory</th>
                  <th className="p-3">Multi-Step Arithmetic</th>
                  <th className="p-3">Token Cost</th>
                  <th className="p-3">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2ddd6] bg-white">
                <tr>
                  <td className="p-3 font-bold text-zinc-900">Direct Zero-Shot</td>
                  <td className="p-3 text-rose-600">None (1 Forward Pass)</td>
                  <td className="p-3 text-rose-600">Fails on Complex Logic</td>
                  <td className="p-3 text-emerald-600">Minimal (1x)</td>
                  <td className="p-3 text-zinc-600">Simple Fact Retrieval</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-amber-700">Zero-Shot CoT (&quot;Step by Step&quot;)</td>
                  <td className="p-3 text-amber-600">Unstructured Text Trace</td>
                  <td className="p-3 text-emerald-600">High Accuracy</td>
                  <td className="p-3 text-amber-600">Moderate (2x - 3x)</td>
                  <td className="p-3 text-zinc-600">Ad-hoc Problem Solving</td>
                </tr>
                <tr className="bg-purple-50/50">
                  <td className="p-3 font-bold text-purple-900">Structured CoT (START-PLAN-OUTPUT)</td>
                  <td className="p-3 text-purple-700 font-bold">State Machine / JSON Scaffolding</td>
                  <td className="p-3 text-emerald-600 font-bold">Airtight &amp; Verifiable</td>
                  <td className="p-3 text-purple-700 font-bold">Predictable (3x)</td>
                  <td className="p-3 text-purple-700 font-bold">Production Software &amp; APIs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: BEST PRACTICES & PRODUCTION GOVERNANCE */}
      {activeTab === 'best-practices' && (
        <div className="card-paper p-6 sm:p-7 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="pb-4 border-b border-[#e2ddd6]">
            <div className="inline-flex items-center space-x-1.5 font-mono text-[11px] font-bold text-purple-700 uppercase tracking-widest bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
              <span>🛡️</span>
              <span>Production Playbook</span>
            </div>
            <h3 className="font-editorial text-xl font-bold text-zinc-900">
              Chain of Thought Rules of Engagement
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">
              How to avoid runaway token bills, handle faithless reasoning, and architect production systems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                rule: '1. Never Use CoT for Simple Lookups',
                desc: 'Asking "What is the capital of France?" does not require planning or CoT. Running CoT on simple retrieval triples latency and multiplies cost with zero accuracy gain.',
                icon: '⚡'
              },
              {
                rule: '2. Guard Against "Faithless Rationalization"',
                desc: 'If a model is asked to defend a predetermined conclusion, it will generate intermediate steps that invent fake evidence. Always prompt the model to plan BEFORE reaching a conclusion.',
                icon: '⚖️'
              },
              {
                rule: '3. Enforce Step Budget Limits',
                desc: 'In autonomous multi-turn loops (like your START-PLAN-OUTPUT script), always set a hard ceiling (e.g. max_steps = 8) to prevent infinite loops if the model gets stuck in repetitive planning.',
                icon: '🛑'
              },
              {
                rule: '4. Separate Internal Thoughts from User Output',
                desc: 'Your JSON format with "step": "PLAN" vs "OUTPUT" is an industry gold standard. It allows your backend to log thoughts for debugging while streaming only "OUTPUT" to the end-user.',
                icon: '🎯'
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
            title="The Golden Law of Chain of Thought"
            text="The sequence of tokens determines the flow of attention. If you want the final answer to be mathematically sound, the model MUST generate the reasoning tokens before the answer token. If the answer token is generated first, subsequent reasoning is merely post-hoc justification!"
          />
        </div>
      )}
    </section>
  );
}
