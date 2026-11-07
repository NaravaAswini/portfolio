/**
 * Narava Aswini - Portfolio Interactive Controller
 * Neural Canvas, Dynamic Typist, Interactive AI Lab, Skills Filter & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initDynamicTyping();
  initMobileMenu();
  initSkillsFilter();
  loadSampleJob('ai');
  loadCodeSnippet('resource_leak');
});

/* ----------------------------------------------------
   1. Interactive Neural Particle Canvas
   ---------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.5 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles within distance
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------
   2. Dynamic Role Typist
   ---------------------------------------------------- */
function initDynamicTyping() {
  const target = document.getElementById('typedRole');
  if (!target) return;

  const roles = [
    'Software Engineer',
    'Generative AI & LLM Specialist',
    'Full-Stack Developer (React & FastAPI)',
    'RAG & Intelligent Systems Architect',
    'MCA Graduate @ GVPCE (CGPA: 8.55)'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeLoop() {
    const current = roles[roleIdx];

    if (isDeleting) {
      target.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      target.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      typeSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeLoop, typeSpeed);
  }

  typeLoop();
}

/* ----------------------------------------------------
   3. Mobile Navigation Menu
   ---------------------------------------------------- */
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/* ----------------------------------------------------
   4. Skills Matrix Filtering
   ---------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-category-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || filter === cat) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.3s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   5. Interactive AI Lab: Tab Switching
   ---------------------------------------------------- */
function switchLabTab(tab) {
  const resumeBtn = document.getElementById('tabDemoResume');
  const codeBtn = document.getElementById('tabDemoCode');
  const resumeContainer = document.getElementById('demoResumeContainer');
  const codeContainer = document.getElementById('demoCodeContainer');

  if (tab === 'resume') {
    resumeBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2';
    codeBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 flex items-center gap-2';
    resumeContainer.classList.remove('hidden');
    codeContainer.classList.add('hidden');
  } else {
    codeBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 flex items-center gap-2';
    resumeBtn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 flex items-center gap-2';
    resumeContainer.classList.add('hidden');
    codeContainer.classList.remove('hidden');
  }
}

/* ----------------------------------------------------
   6. AI Lab Simulator: ResumeIQ
   ---------------------------------------------------- */
const sampleJobDescriptions = {
  ai: `Seeking an enthusiastic AI/GenAI Software Engineer to design, evaluate, and deploy autonomous LLM agents and RAG applications. Must have strong hands-on proficiency in Python, FastAPI/Flask, Prompt Engineering, open-source models (DeepSeek, StarCoder, Qwen), and vector embeddings. Familiarity with React.js, AST code parsing, and Azure cloud is highly desirable.`,
  fullstack: `Looking for a Full-Stack Web Developer proficient in React.js, Node.js, Express.js, and MongoDB (MERN stack) or Python FastAPI. Responsibilities include building responsive UI components, developing RESTful APIs, securing endpoints with JWT authentication, and integrating database systems with clean architecture.`
};

function loadSampleJob(type) {
  const textarea = document.getElementById('jobDescInput');
  if (textarea && sampleJobDescriptions[type]) {
    textarea.value = sampleJobDescriptions[type];
    simulateResumeMatch();
  }
}

const aswiniSkillsMaster = [
  'python', 'fastapi', 'flask', 'react', 'react.js', 'llm', 'llms', 'generative ai', 'genai',
  'rag', 'deepseek', 'deepseek-coder', 'starcoder', 'qwen', 'azure', 'ast', 'ast parsing',
  'restful', 'rest api', 'jwt', 'mongodb', 'sqlite', 'mysql', 'sql', 'node.js', 'express',
  'pandas', 'numpy', 'git', 'github'
];

function simulateResumeMatch() {
  const jobText = (document.getElementById('jobDescInput').value || '').toLowerCase();
  const matchedContainer = document.getElementById('matchedKeywordsContainer');
  const scoreNum = document.getElementById('scoreNumber');
  const scoreCircle = document.getElementById('scoreCircle');
  const scoreBadge = document.getElementById('scoreBadge');
  const atsSummaryText = document.getElementById('atsSummaryText');

  const matched = [];
  aswiniSkillsMaster.forEach(skill => {
    if (jobText.includes(skill)) {
      if (!matched.some(m => m.toLowerCase() === skill.toLowerCase())) {
        matched.push(skill);
      }
    }
  });

  // Calculate simulated TF-IDF & Cosine Similarity score
  let baseScore = 65;
  let dynamicScore = Math.min(Math.round(baseScore + (matched.length * 4.2)), 98);
  if (matched.length === 0) dynamicScore = 45;

  // Animate Gauge Circle (circumference = 2 * PI * 42 ≈ 263.89)
  const maxCircumference = 264;
  const offset = maxCircumference - (dynamicScore / 100) * maxCircumference;
  scoreCircle.style.strokeDashoffset = offset;
  scoreNum.textContent = dynamicScore;

  if (dynamicScore >= 85) {
    scoreCircle.style.stroke = '#2dd4bf'; // Teal
    scoreBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40';
    scoreBadge.textContent = 'High ATS Match';
    atsSummaryText.textContent = `Strong alignment with target specifications! Candidate possesses ${matched.length} core technical requirements, including key GenAI and backend skills.`;
  } else if (dynamicScore >= 70) {
    scoreCircle.style.stroke = '#38bdf8'; // Sky
    scoreBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40';
    scoreBadge.textContent = 'Solid Match';
    atsSummaryText.textContent = `Good compatibility. Meets core stack expectations with potential in cross-functional AI pipelines.`;
  } else {
    scoreCircle.style.stroke = '#fbbf24'; // Amber
    scoreBadge.className = 'text-xs font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800/40';
    scoreBadge.textContent = 'Moderate Match';
    atsSummaryText.textContent = `Partial overlap detected. Try inputting keywords relevant to Python, React, AI, or Full Stack.`;
  }

  // Populate Matched Keywords
  matchedContainer.innerHTML = '';
  if (matched.length === 0) {
    matchedContainer.innerHTML = `<span class="text-slate-500 text-xs italic">No direct keyword overlap found.</span>`;
  } else {
    matched.slice(0, 10).forEach(m => {
      const tag = document.createElement('span');
      tag.className = 'px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/50 text-[11px] capitalize';
      tag.textContent = m;
      matchedContainer.appendChild(tag);
    });
    if (matched.length > 10) {
      const more = document.createElement('span');
      more.className = 'px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[11px]';
      more.textContent = `+${matched.length - 10} more`;
      matchedContainer.appendChild(more);
    }
  }
}

/* ----------------------------------------------------
   7. AI Lab Simulator: AI Code Review & AST Fixer
   ---------------------------------------------------- */
const codeSnippets = {
  resource_leak: `def read_training_dataset(filepath):
    # Potential AST violation: unclosed file descriptor
    f = open(filepath, "r")
    records = []
    for line in f.readlines():
        records.append(line.strip().split(","))
    return records`,

  sql_injection: `def authenticate_user(username, password_hash):
    # Insecure query composition vulnerable to SQL injection
    query = f"SELECT * FROM users WHERE user = '{username}' AND hash = '{password_hash}'"
    cursor.execute(query)
    return cursor.fetchone()`,

  mutable_default: `def append_to_agent_history(message, history=[]):
    # Dangerous mutable default argument bug in Python AST
    history.append(message)
    return history`
};

const codeFixes = {
  resource_leak: {
    issue: "AST Node Warning: 'open()' called without context manager ('with' statement). Risk of resource exhaustion / leaked file descriptor.",
    model: "DeepSeek-Coder-V2 (AST Optimizer)",
    patch: `def read_training_dataset(filepath: str) -> list[list[str]]:
    # Fixed using Python Context Manager (PEP-343)
    records = []
    with open(filepath, "r", encoding="utf-8") as f:
        for line in f:
            records.append(line.strip().split(","))
    return records`
  },
  sql_injection: {
    issue: "AST Security Alert: Unsanitized string interpolation (f-string) in DB cursor execution creates severe SQL Injection vulnerability.",
    model: "Qwen2.5-Coder-7B (Security Guard)",
    patch: `def authenticate_user(username: str, password_hash: str):
    # Fixed using Parameterized Query to prevent SQL injection
    query = "SELECT id, user, role FROM users WHERE user = %s AND hash = %s"
    cursor.execute(query, (username, password_hash))
    return cursor.fetchone()`
  },
  mutable_default: {
    issue: "AST Static Violation: Mutable default argument 'history=[]'. Object is created once at function definition time, sharing state across invocations.",
    model: "StarCoder2-15B (Best Practice)",
    patch: `def append_to_agent_history(message: str, history: list = None) -> list:
    # Fixed using immutable None default and dynamic assignment
    if history is None:
        history = []
    history.append(message)
    return history`
  }
};

let currentSnippetType = 'resource_leak';

function loadCodeSnippet(type) {
  currentSnippetType = type;
  const input = document.getElementById('codeInput');
  if (input && codeSnippets[type]) {
    input.value = codeSnippets[type];
    simulateCodeReview();
  }
}

function simulateCodeReview() {
  const issuesEl = document.getElementById('detectedIssues');
  const patchEl = document.getElementById('codePatchOutput');
  const modelEl = document.getElementById('modelSelected');
  const astStatus = document.getElementById('astStatus');

  const fixData = codeFixes[currentSnippetType] || codeFixes.resource_leak;

  astStatus.textContent = "AST Analysis Complete";
  modelEl.textContent = fixData.model;
  issuesEl.innerHTML = `<div class="font-medium text-amber-300">${fixData.issue}</div>`;
  patchEl.textContent = fixData.patch;
}

/* ----------------------------------------------------
   8. Clipboard Copy & Toast Notifications
   ---------------------------------------------------- */
function copyToClipboard(text, customMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(customMessage || `Copied "${text}" to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-slide-in pointer-events-auto flex items-center gap-3 bg-slate-900/95 text-slate-100 border border-cyan-500/40 px-4 py-3 rounded-2xl shadow-xl shadow-cyan-950/40 text-xs sm:text-sm font-medium';
  toast.innerHTML = `
    <div class="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
      <i class="fa-solid fa-check"></i>
    </div>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-slide-in');
    toast.classList.add('toast-slide-out');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

/* ----------------------------------------------------
   9. Contact Form Dispatch
   ---------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;

  const mailtoLink = `mailto:aswininarava@gmail.com?subject=${encodeURIComponent(subject + " - from " + name)}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  window.location.href = mailtoLink;
  showToast(`Preparing email to Aswini from ${name}...`);
  event.target.reset();
}
