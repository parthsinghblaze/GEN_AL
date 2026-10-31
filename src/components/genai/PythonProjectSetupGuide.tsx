'use client';

import React, { useState } from 'react';
import CodeSnippet from '@/components/common/CodeSnippet';
import NoteCallout from '@/components/common/NoteCallout';
import QuizCard, { QuizQuestionProps } from '@/components/common/QuizCard';

export default function PythonProjectSetupGuide() {
  // Simulator State
  const [selectedOs, setSelectedOs] = useState<'powershell' | 'cmd' | 'bash' | 'uv'>('powershell');
  const [projectPreset, setProjectPreset] = useState<'genai' | 'datascience' | 'fullstack'>('genai');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  // File Inspector State
  const [selectedFile, setSelectedFile] = useState<string>('gitignore');

  // Troubleshooting Wizard State
  const [activeTrap, setActiveTrap] = useState<string>('powershell-exec');

  // Interactive .env vs .gitignore Simulator
  const [leakCheckPassed, setLeakCheckPassed] = useState<boolean>(true);
  const [hasSecretKeyInEnv, setHasSecretKeyInEnv] = useState<boolean>(true);
  const [isEnvInGitignore, setIsEnvInGitignore] = useState<boolean>(true);

  const copyToClipboard = (text: string, stepIdx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIdx);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  // Commands per OS & preset
  const getPackages = () => {
    switch (projectPreset) {
      case 'genai':
        return 'openai python-dotenv tiktoken pydantic';
      case 'datascience':
        return 'numpy pandas matplotlib scikit-learn jupyterlab';
      case 'fullstack':
        return 'fastapi uvicorn[standard] openai python-dotenv pydantic requests';
    }
  };

  const getSteps = () => {
    const pkgs = getPackages();
    if (selectedOs === 'powershell') {
      return [
        {
          num: 1,
          title: 'Create & enter new project directory',
          cmd: 'mkdir my_genai_project; cd my_genai_project',
          desc: 'Creates a clean workspace folder on Windows and moves into it.',
        },
        {
          num: 2,
          title: 'Generate virtual environment (.venv)',
          cmd: 'python -m venv .venv',
          desc: 'Invokes Python venv module to create an isolated runtime inside .venv folder.',
        },
        {
          num: 3,
          title: 'PowerShell Execution Policy Check (Run Once If Blocked)',
          cmd: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser',
          desc: 'Permits your current Windows user account to run local environment scripts.',
        },
        {
          num: 4,
          title: 'Activate the virtual environment',
          cmd: '.\\.venv\\Scripts\\Activate.ps1',
          desc: 'Your shell prompt will change to (.venv) indicating Python is sandboxed.',
        },
        {
          num: 5,
          title: 'Upgrade pip & install production packages',
          cmd: `python -m pip install --upgrade pip\npip install ${pkgs}`,
          desc: 'Installs packages strictly into .venv/Lib/site-packages, leaving global Python untouched.',
        },
        {
          num: 6,
          title: 'Verify Python path is sandboxed',
          cmd: 'where.exe python',
          desc: 'Expected top output: C:\\...\\my_genai_project\\.venv\\Scripts\\python.exe',
        },
      ];
    } else if (selectedOs === 'cmd') {
      return [
        {
          num: 1,
          title: 'Create & enter new project directory',
          cmd: 'mkdir my_genai_project && cd my_genai_project',
          desc: 'Creates and navigates to the project directory in Windows Command Prompt.',
        },
        {
          num: 2,
          title: 'Create virtual environment',
          cmd: 'python -m venv .venv',
          desc: 'Initializes the .venv sandbox folder.',
        },
        {
          num: 3,
          title: 'Activate virtual environment',
          cmd: '.\\.venv\\Scripts\\activate.bat',
          desc: 'Prompt updates with (.venv) prefix.',
        },
        {
          num: 4,
          title: 'Upgrade pip and install dependencies',
          cmd: `python -m pip install --upgrade pip\npip install ${pkgs}`,
          desc: 'Installs project requirements into the active environment.',
        },
        {
          num: 5,
          title: 'Verify sandboxed interpreter location',
          cmd: 'where python',
          desc: 'Confirm the active Python binary is inside .venv\\Scripts.',
        },
      ];
    } else if (selectedOs === 'bash') {
      return [
        {
          num: 1,
          title: 'Create & enter new project directory',
          cmd: 'mkdir -p my_genai_project && cd my_genai_project',
          desc: 'Creates directory on macOS/Linux/WSL.',
        },
        {
          num: 2,
          title: 'Create isolated virtual environment (.venv)',
          cmd: 'python3 -m venv .venv',
          desc: 'Initializes the isolated runtime environment.',
        },
        {
          num: 3,
          title: 'Activate virtual environment',
          cmd: 'source .venv/bin/activate',
          desc: 'Activates sandbox. Notice (.venv) added to your terminal prompt.',
        },
        {
          num: 4,
          title: 'Upgrade pip & install dependencies',
          cmd: `pip install --upgrade pip\npip install ${pkgs}`,
          desc: 'Installs isolated packages into .venv/lib/python3.x/site-packages.',
        },
        {
          num: 5,
          title: 'Verify interpreter binary',
          cmd: 'which python && which pip',
          desc: 'Verifies both point to .../my_genai_project/.venv/bin/python.',
        },
      ];
    } else {
      // Astral uv
      return [
        {
          num: 1,
          title: 'Create directory & initialize uv project',
          cmd: 'mkdir my_genai_project && cd my_genai_project\nuv init',
          desc: 'Initializes a modern Python project with pyproject.toml in <5 milliseconds.',
        },
        {
          num: 2,
          title: 'Create instant virtual environment with uv',
          cmd: 'uv venv',
          desc: 'Generates a virtual environment up to 80x faster than standard venv.',
        },
        {
          num: 3,
          title: 'Activate environment',
          cmd: selectedOs === 'uv' ? '.\\.venv\\Scripts\\activate   # (Windows)\n# OR: source .venv/bin/activate # (macOS/Linux)' : 'source .venv/bin/activate',
          desc: 'Standard activation for shell interop.',
        },
        {
          num: 4,
          title: 'Blazing fast dependency resolution & installation',
          cmd: `uv pip install ${pkgs}`,
          desc: 'Downloads, caches, and links wheels with global parallel cache in ~200ms.',
        },
        {
          num: 5,
          title: 'Zero-activation execution with uv run',
          cmd: 'uv run python main.py',
          desc: 'uv run automatically detects and uses the .venv without needing manual shell activation!',
        },
      ];
    }
  };

  const fileDescriptions: Record<string, { title: string; risk: 'safe' | 'danger' | 'critical'; content: string; note: string }> = {
    gitignore: {
      title: '.gitignore (Git Exclusion Rules)',
      risk: 'critical',
      note: 'CRITICAL: Must be created BEFORE your first "git add .". Never commit .venv or .env!',
      content: `# Python Virtual Environments
.venv/
venv/
env/
ENV/
*.pyc
__pycache__/

# Private API Credentials & Secrets (NEVER COMMIT)
.env
.env.local
.env.*.local
*.key
*.pem

# Jupyter Notebook & Cache
.ipynb_checkpoints/
.pytest_cache/
.coverage
dist/
build/
*.egg-info/`,
    },
    env: {
      title: '.env (Local Secret Credentials - GITIGNORED)',
      risk: 'danger',
      note: 'DANGER: Real API keys reside here. Stays on your local SSD only. Never pushed to GitHub.',
      content: `# ====================================================
# LOCAL PRIVATE CREDENTIALS (NEVER COMMIT TO GIT)
# ====================================================
OPENAI_API_KEY="sk-proj-aB99XyZ10928374650192837465..."
OPENAI_ORG_ID="org-prod92817462"
OPENAI_PROJECT_ID="proj_devtest99"
APP_ENV="development"
PORT=8000`,
    },
    envexample: {
      title: '.env.example (Public Safe Template - COMMITTED)',
      risk: 'safe',
      note: 'SAFE: Committed to git so teammates know what environment variables to fill in.',
      content: `# ====================================================
# TEMPLATE FOR LOCAL ENVIRONMENT - SAFE TO COMMIT
# Copy this file to .env and insert your real credentials:
# cp .env.example .env
# ====================================================
OPENAI_API_KEY="sk-proj-YOUR_SECRET_KEY_HERE"
OPENAI_ORG_ID="org-YOUR_ORG_ID"
OPENAI_PROJECT_ID="proj_YOUR_PROJECT"
APP_ENV="development"
PORT=8000`,
    },
    reqs: {
      title: 'requirements.txt (Pinned Dependencies)',
      risk: 'safe',
      note: 'SAFE: Pinned dependencies ensure identical installations across development and production.',
      content: `# Core AI & Foundation Models
openai>=1.40.0,<2.0.0
tiktoken>=0.7.0
pydantic>=2.7.0,<3.0.0

# Environment & Config
python-dotenv>=1.0.1
requests>=2.31.0

# Optional Async & Server
fastapi>=0.111.0
uvicorn[standard]>=0.30.0`,
    },
    mainpy: {
      title: 'src/main.py (Application Entry Point)',
      risk: 'safe',
      note: 'SAFE: Modular execution script that loads verified configuration and runs API calls.',
      content: `import sys
from config import config
from openai import OpenAI

def main():
    print(f"🐍 Python Runtime: {sys.executable}")
    print(f"📦 Environment Mode: {config.APP_ENV}")
    
    # Initialize isolated client with validated credential
    client = OpenAI(api_key=config.OPENAI_API_KEY)
    
    print("📡 Pinging OpenAI gpt-4o-mini...")
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "Return 'ENVIRONMENT_ONLINE'."}],
        max_tokens=10
    )
    
    print(f"✅ Success! Response: {response.choices[0].message.content}")

if __name__ == "__main__":
    main()`,
    },
    configpy: {
      title: 'src/config.py (Zero-Leak Safe Config Loader)',
      risk: 'safe',
      note: 'SAFE: Validates environment variables at boot using Pydantic, failing fast if keys are missing.',
      content: `import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Load .env from project root
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

class Settings(BaseModel):
    OPENAI_API_KEY: str = Field(..., min_length=20)
    OPENAI_ORG_ID: str = Field(default="")
    OPENAI_PROJECT_ID: str = Field(default="")
    APP_ENV: str = Field(default="development")

try:
    config = Settings(
        OPENAI_API_KEY=os.getenv("OPENAI_API_KEY", ""),
        OPENAI_ORG_ID=os.getenv("OPENAI_ORG_ID", ""),
        OPENAI_PROJECT_ID=os.getenv("OPENAI_PROJECT_ID", ""),
        APP_ENV=os.getenv("APP_ENV", "development"),
    )
except Exception as e:
    raise RuntimeError(
        "❌ Missing or invalid .env configuration! "
        "Please copy .env.example to .env and set your OPENAI_API_KEY."
    ) from e`,
    },
  };

  const troubleshootingTraps = [
    {
      id: 'powershell-exec',
      title: 'Windows PowerShell: "Running scripts is disabled on this system"',
      errorText: `File C:\\...\\.venv\\Scripts\\Activate.ps1 cannot be loaded because running scripts is disabled on this system.
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess`,
      rootCause:
        'Windows enforces a default execution policy (Restricted) that prevents third-party PowerShell scripts from running automatically to protect novice users.',
      fixCmd: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser',
      explanation:
        'Running this command once modifies only your local Windows user profile (does not need Administrator privileges) and allows local scripts you created (like venv Activate.ps1) to run safely.',
    },
    {
      id: 'module-not-found',
      title: 'ModuleNotFoundError: No module named "openai"',
      errorText: `Traceback (most recent call last):
  File "main.py", line 2, in <module>
    import openai
ModuleNotFoundError: No module named 'openai'`,
      rootCause:
        'You either ran "python main.py" in a new terminal window where .venv was NOT activated, or VS Code is executing against your global machine Python interpreter.',
      fixCmd: '# 1. Check which Python is active:\nwhere python  # Windows\nwhich python  # macOS/Linux\n\n# 2. Activate your .venv:\n.\\.venv\\Scripts\\Activate.ps1  # Windows PowerShell\n\n# 3. In VS Code: Press Ctrl+Shift+P -> "Python: Select Interpreter" -> Select (.venv)',
      explanation:
        'When your environment is active, the path to python MUST be inside your project\'s .venv folder, NOT C:\\Python311\\python.exe or /usr/bin/python3.',
    },
    {
      id: 'ms-store-trap',
      title: 'Typing "python" opens the Microsoft Store app',
      errorText: 'Windows opens Microsoft Store page for Python 3.12 instead of executing python in terminal.',
      rootCause:
        'Windows installs zero-byte dummy shortcut stubs called "App execution aliases" in %USERPROFILE%\\AppData\\Local\\Microsoft\\WindowsApps that take precedence over real Python if PATH order is broken.',
      fixCmd: '# Fix in Windows Settings:\n# Windows Settings -> Apps -> Advanced app settings -> "App execution aliases"\n# Turn OFF "App Installer - python.exe" and "App Installer - python3.exe"',
      explanation:
        'Once disabled, your real installed Python from python.org will be resolved properly by PowerShell and Command Prompt.',
    },
    {
      id: 'venv-committed',
      title: 'Emergency: Accidentally staged/committed .venv to Git',
      errorText: `git status:
Untracked files:
  .venv/ (14,820 files staged)`,
      rootCause:
        'You ran "git init" and "git add ." before creating a .gitignore file. Pushing 15,000 internal virtual environment binary files will break Git remotes and fail GitHub push limits.',
      fixCmd: '# 1. Remove .venv from git index without deleting local files:\ngit rm -r --cached .venv\n\n# 2. Add .venv to .gitignore:\necho ".venv/" >> .gitignore\n\n# 3. Commit clean state:\ngit commit -m "chore: remove .venv from tracking and gitignore"',
      explanation:
        'The flag "--cached" deletes the files from Git\'s index tracker while keeping the actual .venv folder intact on your hard drive.',
    },
    {
      id: 'pip-global-leak',
      title: '"pip" installs packages to Global site-packages instead of .venv',
      errorText: `Requirement already satisfied: openai in c:\\users\\parth\\appdata\\roaming\\python\\python311\\site-packages (0.28.1)`,
      rootCause:
        'You ran "pip install" without activating .venv, or pip was invoked via a global binary path.',
      fixCmd: '# Always invoke pip via python -m from within activated environment:\npython -m pip install --upgrade pip\npython -m pip install openai',
      explanation:
        'Running "python -m pip" guarantees that pip executes strictly for the specific Python interpreter currently running, avoiding binary path shadowing.',
    },
  ];

  const quizQuestions: QuizQuestionProps[] = [
    {
      id: 'quiz-venv-01',
      category: 'Virtual Environment Fundamentals',
      question: 'What actually happens under the hood when you run "python -m venv .venv"?',
      options: [
        { id: 'a', text: 'It downloads an entire 4GB guest Linux operating system inside your project.', isCorrect: false },
        { id: 'b', text: 'It creates a lightweight directory containing a symlink/copy of the Python binary and an isolated private site-packages directory.', isCorrect: true },
        { id: 'c', text: 'It copies all global packages already installed on your computer into .venv.', isCorrect: false },
        { id: 'd', text: 'It re-installs Windows Python from scratch.', isCorrect: false },
      ],
      correctExplanation: 'Correct! A virtual environment is just a lightweight directory containing a pointer to the host Python binary, an activation script, and an isolated site-packages folder specifically for that project.',
      wrongExplanation: 'Virtual environments do not copy the whole OS or clone all global packages. They create an isolated directory tree pointing to your existing Python executable with its own private site-packages.',
    },
    {
      id: 'quiz-venv-02',
      category: 'PowerShell Security & Execution',
      question: 'Why does Windows PowerShell show "running scripts is disabled on this system" when trying to activate .venv?',
      options: [
        { id: 'a', text: 'Your Python installation is corrupted and must be reinstalled.', isCorrect: false },
        { id: 'b', text: 'Windows default ExecutionPolicy (Restricted) blocks unsigned .ps1 script execution.', isCorrect: true },
        { id: 'c', text: 'Virtual environments cannot run on Windows systems.', isCorrect: false },
        { id: 'd', text: 'The .venv folder is locked by antivirus.', isCorrect: false },
      ],
      correctExplanation: 'Spot on! Windows defaults to Restricted execution policy. Running "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" enables your local scripts to run safely without touching system-wide admin privileges.',
      wrongExplanation: 'This is a standard Windows PowerShell security policy behavior. The fix is setting ExecutionPolicy to RemoteSigned for CurrentUser.',
    },
    {
      id: 'quiz-venv-03',
      category: 'Security & Git Hygiene',
      question: 'Which of the following files should NEVER be committed to a public or private GitHub repository?',
      options: [
        { id: 'a', text: 'requirements.txt and README.md', isCorrect: false },
        { id: 'b', text: '.env.example and pyproject.toml', isCorrect: false },
        { id: 'c', text: '.venv/ directory and .env secret file', isCorrect: true },
        { id: 'd', text: 'src/main.py and src/config.py', isCorrect: false },
      ],
      correctExplanation: 'Exactly! Both .venv (thousands of local binaries) and .env (contains private secret API keys) must always be excluded in .gitignore.',
      wrongExplanation: 'Never commit .venv (bloats repo and has machine-specific binaries) or .env (contains real secret keys).',
    },
    {
      id: 'quiz-venv-04',
      category: 'VS Code & IDE Configuration',
      question: 'If you install "openai" in your activated terminal, but VS Code editor underlines "import openai" with a yellow warning, what is the cause?',
      options: [
        { id: 'a', text: 'The openai package is broken and cannot be imported.', isCorrect: false },
        { id: 'b', text: 'VS Code language server is using your global system Python instead of your project .venv interpreter.', isCorrect: true },
        { id: 'c', text: 'You must reboot Windows for packages to take effect.', isCorrect: false },
        { id: 'd', text: 'VS Code does not support Python 3.', isCorrect: false },
      ],
      correctExplanation: 'Bingo! The VS Code editor has its own interpreter selector independent of terminal shells. Press Ctrl+Shift+P -> "Python: Select Interpreter" and point it to .venv/Scripts/python.exe.',
      wrongExplanation: 'VS Code uses whatever interpreter is selected in the bottom status bar or settings. Point it to .venv to resolve all imports.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* 01. Why Virtual Environments Matter */}
      <section id="sec-why-venv" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">01</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Architecture &amp; Core Motivation
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Why Virtual Environments Matter in AI &amp; GenAI
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Global pollution, dependency collisions, breaking SDK versions, and runtime isolation.
            </p>
          </div>
        </div>

        {/* Conceptual Visual Card */}
        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <h3 className="font-editorial text-xl font-bold text-[#1c1917] flex items-center space-x-2">
            <span>🌪️</span>
            <span>The &quot;Works on My Machine&quot; Disaster vs. Sandboxing</span>
          </h3>

          <p className="text-sm text-[#3f3f46] leading-relaxed">
            In modern Generative AI development, software moves at lightspeed. Package versions change constantly:
            OpenAI transitioned from legacy <code className="code-inline">openai==0.28</code> to modern <code className="code-inline">openai&gt;=1.0.0</code> with complete breaking syntax changes. PyTorch requires specific CUDA 11.8 vs 12.1 binary compilations. NumPy recently upgraded to 2.0 with ABI breaking changes.
          </p>

          {/* Comparison Matrix */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <div className="flex items-center space-x-2 text-rose-800 font-mono text-xs font-bold">
                <span>❌</span>
                <span>The Global Site-Packages Trap (Anti-Pattern)</span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Installing everything globally via <code className="code-inline">pip install openai</code> installs files into your global operating system directory (e.g. <code className="code-inline">C:\Python311\Lib\site-packages</code>).
              </p>
              <ul className="text-xs text-rose-900 space-y-1.5 list-disc list-inside">
                <li>Project A requires <strong>openai v0.28</strong>; Project B upgrades to <strong>v1.40</strong>.</li>
                <li>Project A instantly crashes with <code className="code-inline">AttributeError: module &apos;openai&apos; has no attribute &apos;ChatCompletion&apos;</code>.</li>
                <li>Uninstalling or upgrading one package breaks 4 other unrelated projects.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-800 font-mono text-xs font-bold">
                <span>✓</span>
                <span>The Isolated Project Sandbox (.venv)</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Each AI project gets its own private, disposable folder (<code className="code-inline">.venv/</code>) right inside the repository.
              </p>
              <ul className="text-xs text-emerald-900 space-y-1.5 list-disc list-inside">
                <li>Zero collision: Each project has its own isolated <code className="code-inline">site-packages</code>.</li>
                <li>100% reproducible: Teammates run <code className="code-inline">pip install -r requirements.txt</code> and get identical behavior.</li>
                <li>Disposable: If something breaks, simply delete <code className="code-inline">.venv</code> and regenerate in 10 seconds.</li>
              </ul>
            </div>
          </div>

          {/* Anatomy Graphic */}
          <div className="card-dark p-5 rounded-xl border border-zinc-800 space-y-3">
            <div className="font-mono text-xs text-purple-400 font-bold uppercase tracking-wider">
              Internal Architecture of a .venv Directory:
            </div>
            <pre className="font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
{`my_genai_project/
├── .venv/                         # The Virtual Environment Sandbox
│   ├── pyvenv.cfg                 # Config: home = C:\\Python311, version = 3.11.8
│   ├── Scripts/ (or bin/ on Unix) # Activation scripts & isolated binaries
│   │   ├── python.exe             # Symlink/redirector to host Python
│   │   ├── pip.exe                # Pip pointing strictly to THIS environment
│   │   └── Activate.ps1           # Shell activation hook (PowerShell)
│   └── Lib/
│       └── site-packages/         # ALL project-specific packages live here!
│           ├── openai/
│           ├── pydantic/
│           └── dotenv/
├── .env                           # Secret API keys (GITIGNORED)
├── .gitignore                     # Ignores .venv/ and .env
└── src/main.py                    # Your application code`}
            </pre>
          </div>
        </div>
      </section>

      {/* 02. Interactive CLI Simulator */}
      <section id="sec-cli-simulator" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">02</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Hands-On Developer Workbench
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Interactive Multi-OS CLI Terminal Simulator
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Select your operating system and project stack to generate exact, copyable terminal commands.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          {/* Selectors Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e2ddd6]">
            {/* OS Tabs */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">
                1. Select Target Shell / OS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'powershell', label: '🪟 Windows PowerShell' },
                  { id: 'cmd', label: '🪟 Windows CMD' },
                  { id: 'bash', label: '🍎 macOS / 🐧 Linux' },
                  { id: 'uv', label: '⚡ Modern Astral uv (Fastest)' },
                ].map((os) => (
                  <button
                    key={os.id}
                    onClick={() => setSelectedOs(os.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      selectedOs === os.id
                        ? 'bg-purple-700 text-white font-bold shadow'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {os.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stack Selector */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">
                2. Project Stack Preset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'genai', label: '🤖 OpenAI GenAI' },
                  { id: 'datascience', label: '📊 NumPy / Pandas / ML' },
                  { id: 'fullstack', label: '🚀 FastAPI + LLM' },
                ].map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setProjectPreset(preset.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      projectPreset === preset.id
                        ? 'bg-[#18181b] text-[#fbbf24] font-bold shadow'
                        : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Steps List */}
          <div className="space-y-4">
            {getSteps().map((step, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-purple-300 transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-700 text-white flex items-center justify-center font-mono text-xs font-bold">
                      {step.num}
                    </span>
                    <h4 className="font-editorial text-sm sm:text-base font-bold text-zinc-900">
                      {step.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(step.cmd, idx)}
                    className="px-2.5 py-1 rounded bg-white hover:bg-zinc-200 text-zinc-700 font-mono text-xs border border-zinc-300 transition-all flex items-center space-x-1"
                  >
                    <span>{copiedStep === idx ? '✓ Copied' : '📋 Copy'}</span>
                  </button>
                </div>

                <pre className="p-3 rounded-lg bg-zinc-900 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner">
                  {step.cmd}
                </pre>

                <p className="text-xs text-zinc-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Full Bash/PowerShell Script Copy Button */}
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-mono text-xs font-bold text-purple-900">
                🚀 One-Liner Quickstart Run:
              </div>
              <p className="text-xs text-purple-950 mt-0.5">
                Run all commands in sequence to get a fully working sandbox in under 15 seconds.
              </p>
            </div>
            <button
              onClick={() =>
                copyToClipboard(
                  getSteps()
                    .map((s) => s.cmd)
                    .join('\n'),
                  999
                )
              }
              className="px-4 py-2 rounded-xl bg-purple-700 text-white font-mono text-xs font-bold hover:bg-purple-800 shadow transition-all self-start sm:self-auto shrink-0"
            >
              {copiedStep === 999 ? '✓ All Commands Copied!' : '⚡ Copy Complete Script'}
            </button>
          </div>
        </div>
      </section>

      {/* 03. Activation Matrix & Windows PowerShell Gotcha */}
      <section id="sec-activation-matrix" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">03</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Shell Mechanics &amp; Security Policy
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Activating, Deactivating &amp; Windows Execution Policy
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Cross-platform activation cheatsheet and resolving the #1 Windows beginner trap.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          {/* Activation Cheatsheet Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100 text-zinc-700">
                  <th className="p-3 font-bold">Platform / Shell</th>
                  <th className="p-3 font-bold">Activation Command</th>
                  <th className="p-3 font-bold">Deactivation Command</th>
                  <th className="p-3 font-bold">Visual Indicator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">Windows PowerShell</td>
                  <td className="p-3 text-purple-700 font-bold">.\.venv\Scripts\Activate.ps1</td>
                  <td className="p-3 text-zinc-600">deactivate</td>
                  <td className="p-3 text-emerald-600 font-bold">(.venv) PS C:\...&gt;</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">Windows Command Prompt</td>
                  <td className="p-3 text-purple-700 font-bold">.\.venv\Scripts\activate.bat</td>
                  <td className="p-3 text-zinc-600">deactivate</td>
                  <td className="p-3 text-emerald-600 font-bold">(.venv) C:\...&gt;</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">macOS / Linux (Bash / Zsh)</td>
                  <td className="p-3 text-purple-700 font-bold">source .venv/bin/activate</td>
                  <td className="p-3 text-zinc-600">deactivate</td>
                  <td className="p-3 text-emerald-600 font-bold">(.venv) user@host:~$</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">Git Bash on Windows</td>
                  <td className="p-3 text-purple-700 font-bold">source .venv/Scripts/activate</td>
                  <td className="p-3 text-zinc-600">deactivate</td>
                  <td className="p-3 text-emerald-600 font-bold">(.venv) user@pc MINGW64</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Deep Dive into PowerShell Execution Policy */}
          <NoteCallout
            type="warning"
            title="The #1 Windows Student Trap: PSSecurityException"
            text="When activating on PowerShell, Windows often throws: 'running scripts is disabled on this system'. Do NOT panic! Run this single safe command once in PowerShell: 'Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser'. This permits local scripts to run for your account only without touching Windows system-wide policies."
          />
        </div>
      </section>

      {/* 04. Production Directory Anatomy & File Inspector */}
      <section id="sec-project-anatomy" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">04</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Project Architecture
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Production Directory Anatomy &amp; File Inspector
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Explore the exact file layout used by professional AI engineering teams.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* File Tree Selector */}
            <div className="lg:col-span-4 card-dark p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="text-[10px] font-mono uppercase font-bold text-purple-400 pb-2 border-b border-zinc-800">
                📁 Project Explorer (Click to Inspect)
              </div>
              <div className="space-y-1 font-mono text-xs">
                {[
                  { id: 'gitignore', label: '.gitignore', tag: 'Must Have', color: 'text-amber-400' },
                  { id: 'env', label: '.env', tag: 'Private Secret', color: 'text-rose-400' },
                  { id: 'envexample', label: '.env.example', tag: 'Committed Template', color: 'text-emerald-400' },
                  { id: 'reqs', label: 'requirements.txt', tag: 'Dependencies', color: 'text-blue-400' },
                  { id: 'configpy', label: 'src/config.py', tag: 'Validation', color: 'text-purple-400' },
                  { id: 'mainpy', label: 'src/main.py', tag: 'Entry Point', color: 'text-white' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedFile(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-all ${
                      selectedFile === item.id
                        ? 'bg-purple-900/50 border border-purple-500/60 font-bold'
                        : 'hover:bg-white/5 text-zinc-400'
                    }`}
                  >
                    <span className={item.color}>📄 {item.label}</span>
                    <span className="text-[9px] bg-white/10 px-1.5 py-0.5 rounded text-zinc-300">
                      {item.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Inspector Preview Pane */}
            <div className="lg:col-span-8 space-y-3">
              {fileDescriptions[selectedFile] && (
                <>
                  <div className="flex items-center justify-between">
                    <h4 className="font-editorial text-base font-bold text-zinc-900">
                      {fileDescriptions[selectedFile].title}
                    </h4>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                        fileDescriptions[selectedFile].risk === 'critical'
                          ? 'bg-amber-100 text-amber-800'
                          : fileDescriptions[selectedFile].risk === 'danger'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {fileDescriptions[selectedFile].note}
                    </span>
                  </div>

                  <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-200 font-mono text-xs overflow-x-auto border border-zinc-800 max-h-[380px] leading-relaxed">
                    {fileDescriptions[selectedFile].content}
                  </pre>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 05. Zero-Leak Security Architecture */}
      <section id="sec-security-leak" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">05</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Secret Protection
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Zero-Leak Security (.env vs .env.example vs .gitignore)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Preventing catastrophic credential exposure, bot scraping, and automated key revocations.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
              <div className="font-mono text-xs font-bold text-rose-900">
                1. The Catastrophe
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                Automated bots continuously monitor GitHub&apos;s public commit firehose. Committing an API key takes less than <strong>3 seconds</strong> to be scraped and used for crypto-mining or high-volume scraping.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="font-mono text-xs font-bold text-amber-900">
                2. Automated Revocation
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                OpenAI and GitHub Secret Scanning will detect leaked keys and revoke them automatically. Your production app will instantly fail with <code className="code-inline">401 Invalid Authentication</code>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="font-mono text-xs font-bold text-emerald-900">
                3. The 3-File Architecture
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                Always create <strong>.gitignore</strong> (contains <code className="code-inline">.env</code>), <strong>.env.example</strong> (committed template with fake keys), and local <strong>.env</strong> (your actual secret key).
              </p>
            </div>
          </div>

          {/* Interactive Leak Checker Simulator */}
          <div className="card-dark p-5 rounded-xl border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="font-mono text-xs font-bold text-purple-400 uppercase tracking-wider">
                🛡️ Interactive Security Verification Simulator
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Pre-Commit Health Check</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono">
              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-zinc-900 cursor-pointer hover:bg-zinc-850">
                <input
                  type="checkbox"
                  checked={isEnvInGitignore}
                  onChange={(e) => setIsEnvInGitignore(e.target.checked)}
                  className="rounded accent-purple-600"
                />
                <span className="text-zinc-200">.gitignore contains &quot;.env&quot; entry</span>
              </label>

              <label className="flex items-center space-x-2.5 p-3 rounded-lg bg-zinc-900 cursor-pointer hover:bg-zinc-850">
                <input
                  type="checkbox"
                  checked={hasSecretKeyInEnv}
                  onChange={(e) => setHasSecretKeyInEnv(e.target.checked)}
                  className="rounded accent-purple-600"
                />
                <span className="text-zinc-200">Secret key is inside .env (NOT hardcoded in code)</span>
              </label>
            </div>

            <div
              className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono ${
                isEnvInGitignore && hasSecretKeyInEnv
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40'
                  : 'bg-rose-950/50 text-rose-300 border-rose-500/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{isEnvInGitignore && hasSecretKeyInEnv ? '✅' : '🚨'}</span>
                <div>
                  <strong>
                    {isEnvInGitignore && hasSecretKeyInEnv
                      ? 'SAFE TO COMMIT: Zero credentials exposed.'
                      : 'SECURITY ALERT: HIGH RISK OF CREDENTIAL LEAK!'}
                  </strong>
                  <div className="text-[11px] opacity-80 mt-0.5">
                    {isEnvInGitignore && hasSecretKeyInEnv
                      ? 'Your .gitignore properly protects .env, and secrets are not hardcoded in Python files.'
                      : !isEnvInGitignore
                      ? 'Your .env file is NOT listed in .gitignore! If you run "git add .", your secret keys will be published to GitHub!'
                      : 'Never hardcode your secret API key directly in Python files! Move it to .env.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06. Package Managers Comparison */}
      <section id="sec-package-managers" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">06</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Tooling Landscape
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Modern Tooling: pip vs. uv vs. conda vs. poetry
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Comparing resolution speeds, lockfiles, and modern Rust-based tooling.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-100 text-zinc-700">
                  <th className="p-3 font-bold">Tool</th>
                  <th className="p-3 font-bold">Speed (Cold Cache)</th>
                  <th className="p-3 font-bold">Virtual Env Creation</th>
                  <th className="p-3 font-bold">Best Use Case</th>
                  <th className="p-3 font-bold">Lockfile Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">pip (Standard)</td>
                  <td className="p-3 text-zinc-600">~15–45 seconds</td>
                  <td className="p-3 text-zinc-600">python -m venv</td>
                  <td className="p-3 text-zinc-800">Everyday scripting &amp; beginner tutorials</td>
                  <td className="p-3 text-zinc-500">requirements.txt</td>
                </tr>
                <tr className="bg-purple-50/50 hover:bg-purple-50">
                  <td className="p-3 font-bold text-purple-800">uv (Astral / Rust)</td>
                  <td className="p-3 text-purple-700 font-bold">~0.2–1.5s (10x–80x faster!)</td>
                  <td className="p-3 text-purple-700 font-bold">uv venv (instant)</td>
                  <td className="p-3 text-purple-900 font-bold">Modern GenAI, Docker builds &amp; fast CI/CD</td>
                  <td className="p-3 text-purple-700 font-bold">uv.lock / pyproject.toml</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">conda / mamba</td>
                  <td className="p-3 text-zinc-600">~60–120 seconds</td>
                  <td className="p-3 text-zinc-600">conda create -n</td>
                  <td className="p-3 text-zinc-800">Heavy C++/CUDA, non-Python system libraries</td>
                  <td className="p-3 text-zinc-500">environment.yml</td>
                </tr>
                <tr className="hover:bg-zinc-50">
                  <td className="p-3 font-bold text-zinc-900">Poetry</td>
                  <td className="p-3 text-zinc-600">~30–60 seconds</td>
                  <td className="p-3 text-zinc-600">Automatic</td>
                  <td className="p-3 text-zinc-800">Publishing Python packages to PyPI</td>
                  <td className="p-3 text-zinc-500">poetry.lock</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
            <div className="font-mono text-xs font-bold text-purple-900 mb-1">
              💡 Why the GenAI Community is Falling in Love with &quot;uv&quot;:
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">
              Created by Astral (the team behind Ruff), <code className="code-inline">uv</code> is written in Rust. It replaces <code className="code-inline">pip</code>, <code className="code-inline">pip-tools</code>, and <code className="code-inline">virtualenv</code> with a single binary that is 10 to 100 times faster. In Docker containers, installing OpenAI + PyTorch drops from 4 minutes to 15 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* 07. VS Code & IDE Integration */}
      <section id="sec-ide-vscode" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">07</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              IDE &amp; Editor Setup
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              VS Code Integration (Fixing &quot;Import Could Not Be Resolved&quot;)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Configuring the Python extension, selecting the active workspace interpreter, and auto-activation.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="space-y-3">
            <h3 className="font-editorial text-lg font-bold text-zinc-900">
              Step-by-Step VS Code Interpreter Configuration:
            </h3>
            <ol className="text-xs text-zinc-700 space-y-2.5 list-decimal list-inside">
              <li>
                Open your project folder in VS Code (<code className="code-inline">code .</code>).
              </li>
              <li>
                Press <kbd className="px-2 py-0.5 bg-zinc-200 border border-zinc-300 rounded font-mono text-[10px]">Ctrl + Shift + P</kbd> (or <kbd className="px-2 py-0.5 bg-zinc-200 border border-zinc-300 rounded font-mono text-[10px]">Cmd + Shift + P</kbd> on macOS) to open the Command Palette.
              </li>
              <li>
                Type <strong>&quot;Python: Select Interpreter&quot;</strong> and hit Enter.
              </li>
              <li>
                Choose <strong>&quot;Enter interpreter path...&quot;</strong> and select <code className="code-inline">.\.venv\Scripts\python.exe</code> (Windows) or <code className="code-inline">./.venv/bin/python</code> (macOS/Linux).
              </li>
              <li>
                Notice the bottom right status bar now displays <code className="code-inline">3.11.x (&apos;.venv&apos;: venv)</code>. The yellow squiggly lines will vanish instantly!
              </li>
            </ol>
          </div>

          <div className="space-y-2">
            <div className="font-mono text-xs font-bold text-zinc-800">
              Pro-Tip: Auto-Configure for All Team Members with <code className="code-inline">.vscode/settings.json</code>:
            </div>
            <pre className="p-3.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs overflow-x-auto">
{`{
  // Point VS Code directly to the project virtual environment
  "python.defaultInterpreterPath": "\${workspaceFolder}/.venv/Scripts/python.exe",
  // Automatically activate .venv whenever an integrated terminal is opened
  "python.terminal.activateEnvironment": true,
  // Format with Ruff or Black
  "[python]": {
    "editor.defaultFormatter": "charliermarsh.ruff",
    "editor.formatOnSave": true
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 08. Troubleshooting Wizard */}
      <section id="sec-troubleshooting" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">08</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Diagnostic Lab
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Interactive Troubleshooting Wizard (Common Traps &amp; Solutions)
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Click any real-world error below to instantly see why it happened and how to solve it.
            </p>
          </div>
        </div>

        <div className="card-paper p-6 sm:p-8 rounded-2xl border border-[#e2ddd6] space-y-6">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Trap Selector */}
            <div className="lg:col-span-5 space-y-2">
              <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">
                Select Observed Error Symptom:
              </span>
              <div className="space-y-1.5">
                {troubleshootingTraps.map((trap) => (
                  <button
                    key={trap.id}
                    onClick={() => setActiveTrap(trap.id)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all ${
                      activeTrap === trap.id
                        ? 'bg-purple-900/10 border-purple-600 text-purple-900 font-bold shadow-sm'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    <div className="truncate font-semibold">{trap.title}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trap Solution Detail */}
            <div className="lg:col-span-7 space-y-4">
              {(() => {
                const current = troubleshootingTraps.find((t) => t.id === activeTrap);
                if (!current) return null;
                return (
                  <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3.5">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                        Terminal Error Output
                      </span>
                      <pre className="p-3 rounded-lg bg-zinc-950 text-rose-400 font-mono text-[11px] overflow-x-auto mt-1 leading-relaxed">
                        {current.errorText}
                      </pre>
                    </div>

                    <div>
                      <div className="font-mono text-xs font-bold text-zinc-800">🔍 Root Cause:</div>
                      <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">
                        {current.rootCause}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="font-mono text-xs font-bold text-emerald-800">✅ Recommended Solution:</div>
                      <pre className="p-3 rounded-lg bg-zinc-900 text-emerald-400 font-mono text-xs overflow-x-auto">
                        {current.fixCmd}
                      </pre>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        {current.explanation}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 09. Production Starter Boilerplate */}
      <section id="sec-starter-templates" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">09</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Copy-Paste Ready
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Ready-to-Run Production Starter Templates
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Grab verified boilerplate code to bootstrap any OpenAI or GenAI application in 60 seconds.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <CodeSnippet
            code={`# requirements.txt
openai>=1.40.0
python-dotenv>=1.0.1
pydantic>=2.7.0
tiktoken>=0.7.0`}
            language="bash"
            title="requirements.txt"
          />

          <CodeSnippet
            code={`# src/config.py
import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic import BaseModel, Field

# Locate root directory and load .env
ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

class AppConfig(BaseModel):
    OPENAI_API_KEY: str = Field(..., min_length=20)
    APP_ENV: str = Field(default="development")

config = AppConfig(
    OPENAI_API_KEY=os.getenv("OPENAI_API_KEY", ""),
    APP_ENV=os.getenv("APP_ENV", "development"),
)`}
            language="python"
            title="src/config.py (Zero-Leak Environment Loader)"
          />

          <CodeSnippet
            code={`# src/main.py
import sys
from config import config
from openai import OpenAI

def main():
    print(f"🐍 Executing from: {sys.executable}")
    
    # Initialize OpenAI client with validated credentials
    client = OpenAI(api_key=config.OPENAI_API_KEY)
    
    # Handshake model verification
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Explain what a Python virtual environment is in one concise sentence."}
        ],
        max_tokens=60,
    )
    
    print("\\n🤖 Model Response:")
    print(completion.choices[0].message.content)

if __name__ == "__main__":
    main()`}
            language="python"
            title="src/main.py (End-to-End Verification Run)"
            output={`🐍 Executing from: C:\\projects\\my_genai_project\\.venv\\Scripts\\python.exe

🤖 Model Response:
A Python virtual environment is an isolated directory tree that keeps a project's dependencies and Python runtime separated from other projects and the global system.`}
          />
        </div>
      </section>

      {/* 10. Knowledge Checkpoint & Readiness Quiz */}
      <section id="sec-readiness-quiz" className="space-y-6 scroll-mt-24">
        <div className="flex items-start space-x-3">
          <span className="font-editorial text-3xl font-black text-purple-700">10</span>
          <div>
            <span className="font-mono text-xs uppercase font-bold text-[#71717a] tracking-wider">
              Verification &amp; Mastery
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#1c1917]">
              Knowledge Checkpoint &amp; Project Readiness Quiz
            </h2>
            <p className="text-xs text-[#71717a] font-mono mt-1">
              Verify your operational understanding of virtual environments and security before starting Section 15.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {quizQuestions.map((q) => (
            <QuizCard key={q.id} {...q} />
          ))}
        </div>
      </section>
    </div>
  );
}
