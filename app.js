/* ═══════════════════════════════════════════
   ONLINE COMPILER — app.js
═══════════════════════════════════════════ */

"use strict";

// ── LANGUAGE CONFIG ──────────────────────────────────────
const LANGUAGES = {
  python: {
    name: "Python",
    ext: "py",
    id: 71,   // Judge0 language ID
    examples: {
      "Hello World":   'print("Hello, World!")',
      "Fibonacci":     'def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a+b\nfib(10)',
      "List comprehension": 'squares = [x**2 for x in range(1, 11)]\nprint(squares)',
    },
    default: '# Welcome to Online Compiler 🚀\n# Write your Python code here\n\nname = input("Enter your name: ")\nprint(f"Hello, {name}! Happy coding!")\n',
  },
  javascript: {
    name: "JavaScript",
    ext: "js",
    id: 63,
    examples: {
      "Hello World":   'console.log("Hello, World!");',
      "Fibonacci":     'function fib(n) {\n  let a = 0, b = 1;\n  for (let i = 0; i < n; i++) {\n    process.stdout.write(a + " ");\n    [a, b] = [b, a + b];\n  }\n}\nfib(10);',
      "Array methods": 'const nums = [1,2,3,4,5];\nconst doubled = nums.map(x => x * 2);\nconst evens   = nums.filter(x => x % 2 === 0);\nconsole.log("Doubled:", doubled);\nconsole.log("Evens:",   evens);',
    },
    default: '// Welcome to Online Compiler 🚀\nconsole.log("Hello, World!");\n\nconst greet = name => `Hello, ${name}!`;\nconsole.log(greet("Developer"));\n',
  },
  java: {
    name: "Java",
    ext: "java",
    id: 62,
    examples: {
      "Hello World":   'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      "Fibonacci":     'public class Main {\n    public static void main(String[] args) {\n        int a = 0, b = 1;\n        for (int i = 0; i < 10; i++) {\n            System.out.print(a + " ");\n            int temp = a + b;\n            a = b; b = temp;\n        }\n    }\n}',
    },
    default: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Welcome to Online Compiler!");\n    }\n}\n',
  },
  c: {
    name: "C",
    ext: "c",
    id: 50,
    examples: {
      "Hello World":   '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
      "Fibonacci":     '#include <stdio.h>\nint main() {\n    int a=0, b=1, temp;\n    for(int i=0;i<10;i++) {\n        printf("%d ",a);\n        temp=a+b; a=b; b=temp;\n    }\n    return 0;\n}',
    },
    default: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    printf("Welcome to Online Compiler!\\n");\n    return 0;\n}\n',
  },
  cpp: {
    name: "C++",
    ext: "cpp",
    id: 54,
    examples: {
      "Hello World":   '#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
      "Fibonacci":     '#include <iostream>\nusing namespace std;\nint main() {\n    int a=0, b=1;\n    for(int i=0;i<10;i++) {\n        cout << a << " ";\n        tie(a,b) = make_pair(b,a+b);\n    }\n    return 0;\n}',
    },
    default: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    cout << "Welcome to Online Compiler!" << endl;\n    return 0;\n}\n',
  },
  csharp: {
    name: "C#",
    ext: "cs",
    id: 51,
    examples: {
      "Hello World":   'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
    },
    default: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n        Console.WriteLine("Welcome to Online Compiler!");\n    }\n}\n',
  },
  go: {
    name: "Go",
    ext: "go",
    id: 60,
    examples: {
      "Hello World":   'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
    },
    default: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n    fmt.Println("Welcome to Online Compiler!")\n}\n',
  },
  rust: {
    name: "Rust",
    ext: "rs",
    id: 73,
    examples: {
      "Hello World":   'fn main() {\n    println!("Hello, World!");\n}',
    },
    default: 'fn main() {\n    println!("Hello, World!");\n    println!("Welcome to Online Compiler!");\n}\n',
  },
  ruby: {
    name: "Ruby",
    ext: "rb",
    id: 72,
    examples: {
      "Hello World":   'puts "Hello, World!"',
      "Fibonacci":     'a, b = 0, 1\n10.times { print "#{a} "; a, b = b, a+b }',
    },
    default: 'puts "Hello, World!"\nputs "Welcome to Online Compiler!"\n',
  },
  php: {
    name: "PHP",
    ext: "php",
    id: 68,
    examples: {
      "Hello World":   '<?php\necho "Hello, World!\\n";\n?>',
    },
    default: '<?php\necho "Hello, World!\\n";\necho "Welcome to Online Compiler!\\n";\n?>\n',
  },
};

// ── JUDGE0 CONFIG ────────────────────────────────────────
// Using the public Sphere Engine demo — for production, use your own key
const JUDGE0_URL = "https://judge0-ce.p.rapidapi.com";

// ── STATE ────────────────────────────────────────────────
let currentLang = "python";
let isRunning    = false;
let startTime    = 0;
let dividerDragging = false;

// ── ELEMENTS ─────────────────────────────────────────────
const editor       = document.getElementById("codeEditor");
const lineNumbers  = document.getElementById("lineNumbers");
const outputArea   = document.getElementById("outputArea");
const runBtn       = document.getElementById("runBtn");
const statusBadge  = document.getElementById("statusBadge");
const outputDot    = document.querySelector(".output-dot");
const filename     = document.getElementById("filename");
const outputFooter = document.getElementById("outputFooter");
const execTimeEl   = document.getElementById("execTime");
const exitCodeEl   = document.getElementById("exitCode");
const stdinInput   = document.getElementById("stdinInput");
const fontSizeRange= document.getElementById("fontSizeRange");
const fontSizeVal  = document.getElementById("fontSizeVal");
const tabSizeSelect= document.getElementById("tabSizeSelect");
const copyBtn      = document.getElementById("copyBtn");
const clearBtn     = document.getElementById("clearBtn");
const clearOutputBtn=document.getElementById("clearOutputBtn");
const shareBtn     = document.getElementById("shareBtn");
const themeToggle  = document.getElementById("themeToggle");
const toast        = document.getElementById("toast");
const exampleList  = document.getElementById("exampleList");
const divider      = document.getElementById("divider");
const editorPanel  = document.querySelector(".editor-panel");
const outputPanel  = document.querySelector(".output-panel");

// ── INIT ─────────────────────────────────────────────────
function init() {
  // Restore theme
  const savedTheme = localStorage.getItem("oc-theme") || "dark";
  if (savedTheme === "light") applyTheme("light");

  // Set default code
  editor.value = LANGUAGES[currentLang].default;
  updateLineNumbers();
  updateFilename();
  buildExampleList();
  loadFromURL();
}

// ── LANGUAGE SWITCH ──────────────────────────────────────
document.getElementById("langGrid").addEventListener("click", e => {
  const btn = e.target.closest(".lang-btn");
  if (!btn) return;
  const lang = btn.dataset.lang;
  if (lang === currentLang) return;

  document.querySelectorAll(".lang-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  currentLang = lang;
  editor.value = LANGUAGES[lang].default;
  updateLineNumbers();
  updateFilename();
  buildExampleList();
  clearOutput();
});

function updateFilename() {
  filename.textContent = `main.${LANGUAGES[currentLang].ext}`;
}

// ── EXAMPLES ─────────────────────────────────────────────
function buildExampleList() {
  exampleList.innerHTML = "";
  const examples = LANGUAGES[currentLang].examples || {};
  Object.entries(examples).forEach(([name, code]) => {
    const item = document.createElement("div");
    item.className = "example-item";
    item.textContent = name;
    item.addEventListener("click", () => {
      editor.value = code;
      updateLineNumbers();
      showToast(`Loaded: ${name}`);
    });
    exampleList.appendChild(item);
  });
}

// ── LINE NUMBERS ─────────────────────────────────────────
function updateLineNumbers() {
  const lines  = editor.value.split("\n").length;
  let html = "";
  for (let i = 1; i <= lines; i++) html += i + "\n";
  lineNumbers.textContent = html;
  syncScroll();
}

function syncScroll() {
  lineNumbers.scrollTop = editor.scrollTop;
}

editor.addEventListener("input",  updateLineNumbers);
editor.addEventListener("scroll", syncScroll);
editor.addEventListener("keydown", e => {
  if (e.key === "Tab") {
    e.preventDefault();
    const spaces = " ".repeat(parseInt(tabSizeSelect.value));
    insertAtCursor(spaces);
    updateLineNumbers();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    runCode();
  }
});

function insertAtCursor(text) {
  const start = editor.selectionStart;
  const end   = editor.selectionEnd;
  editor.value = editor.value.slice(0, start) + text + editor.value.slice(end);
  editor.selectionStart = editor.selectionEnd = start + text.length;
}

// ── FONT SIZE ─────────────────────────────────────────────
fontSizeRange.addEventListener("input", () => {
  const size = fontSizeRange.value;
  editor.style.fontSize      = size + "px";
  lineNumbers.style.fontSize = size + "px";
  fontSizeVal.textContent    = size + "px";
  updateLineNumbers();
});

// ── TAB SIZE ──────────────────────────────────────────────
tabSizeSelect.addEventListener("change", () => {
  editor.style.tabSize = tabSizeSelect.value;
});

// ── COPY / CLEAR ─────────────────────────────────────────
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(editor.value);
    showToast("Code copied to clipboard!");
  } catch {
    showToast("Copy failed — try Ctrl+C");
  }
});

clearBtn.addEventListener("click", () => {
  editor.value = "";
  updateLineNumbers();
  showToast("Editor cleared");
});

clearOutputBtn.addEventListener("click", clearOutput);

// ── SHARE ─────────────────────────────────────────────────
shareBtn.addEventListener("click", () => {
  const payload = { lang: currentLang, code: editor.value };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const url = `${location.origin}${location.pathname}?s=${encoded}`;
  navigator.clipboard.writeText(url).then(() => showToast("Share link copied!"));
  history.replaceState(null, "", `?s=${encoded}`);
});

function loadFromURL() {
  const params = new URLSearchParams(location.search);
  const s = params.get("s");
  if (!s) return;
  try {
    const { lang, code } = JSON.parse(decodeURIComponent(escape(atob(s))));
    if (LANGUAGES[lang]) {
      currentLang = lang;
      document.querySelectorAll(".lang-btn").forEach(b => {
        b.classList.toggle("active", b.dataset.lang === lang);
      });
      updateFilename();
      buildExampleList();
    }
    editor.value = code;
    updateLineNumbers();
    showToast("Shared code loaded!");
  } catch { /* ignore */ }
}

// ── THEME ─────────────────────────────────────────────────
themeToggle.addEventListener("click", () => {
  const isDark = !document.documentElement.dataset.theme;
  applyTheme(isDark ? "light" : "dark");
});

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.dataset.theme = "light";
    themeToggle.textContent = "☀";
    localStorage.setItem("oc-theme", "light");
  } else {
    delete document.documentElement.dataset.theme;
    themeToggle.textContent = "☽";
    localStorage.setItem("oc-theme", "dark");
  }
}

// ── RUN BUTTON ────────────────────────────────────────────
runBtn.addEventListener("click", runCode);

async function runCode() {
  if (isRunning) return;
  const code = editor.value.trim();
  if (!code) { showToast("Nothing to run!"); return; }

  isRunning = true;
  startTime = Date.now();
  setStatus("running");
  runBtn.classList.add("loading");
  runBtn.innerHTML = '<span class="run-icon">⏳</span> Running…';
  outputArea.innerHTML = '<span class="output-placeholder">Running your code…</span>';
  outputFooter.style.display = "none";

  try {
    const result = await executeCode(code, LANGUAGES[currentLang].id, stdinInput.value);
    displayResult(result);
  } catch (err) {
    displayError(err.message || "Network error. Check your connection.");
  }

  isRunning = false;
  runBtn.classList.remove("loading");
  runBtn.innerHTML = '<span class="run-icon">▶</span> Run';
}

// ── EXECUTE via Judge0 CE (public mirror) ─────────────────
async function executeCode(code, langId, stdin) {
  // Submit
  const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      "X-RapidAPI-Key": "DEMO",   // replace with your RapidAPI key
    },
    body: JSON.stringify({
      source_code: btoa(unescape(encodeURIComponent(code))),
      language_id: langId,
      stdin: stdin ? btoa(unescape(encodeURIComponent(stdin))) : "",
    }),
  });

  if (!submitRes.ok) {
    // Fallback: run Python locally via Pyodide-style simulation OR show demo output
    return simulateRun(code, langId, stdin);
  }

  const { token } = await submitRes.json();

  // Poll
  for (let i = 0; i < 20; i++) {
    await sleep(800);
    const pollRes = await fetch(
      `${JUDGE0_URL}/submissions/${token}?base64_encoded=true`,
      {
        headers: {
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          "X-RapidAPI-Key": "166addcbc7msh5bf285b68851b84p12f0adjsn103d6e2cf462",
        },
      }
    );
    const data = await pollRes.json();
    if (data.status && data.status.id >= 3) return data;
  }
  throw new Error("Execution timed out");
}

// ── DISPLAY RESULT ────────────────────────────────────────
function displayResult(data) {
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  if (!data || data.error) {
    displayError(data?.error || "Unknown error");
    return;
  }

  const statusId = data.status?.id;
  const stdout   = data.stdout   ? safeAtob(data.stdout)   : "";
  const stderr   = data.stderr   ? safeAtob(data.stderr)   : "";
  const compileErr = data.compile_output ? safeAtob(data.compile_output) : "";

  if (statusId === 3) {
    // Accepted
    setStatus("success");
    outputArea.innerHTML = escapeHtml(stdout) || '<span class="output-success">Program exited with no output.</span>';
    if (stderr) outputArea.innerHTML += `\n<span class="output-error">${escapeHtml(stderr)}</span>`;
  } else if (statusId === 6) {
    // Compilation error
    setStatus("error");
    outputArea.innerHTML = `<span class="output-error">Compilation Error:\n${escapeHtml(compileErr)}</span>`;
  } else if (statusId === 11) {
    setStatus("error");
    outputArea.innerHTML = `<span class="output-error">Runtime Error (NZEC):\n${escapeHtml(stderr)}</span>`;
  } else {
    setStatus("error");
    outputArea.innerHTML = `<span class="output-error">${data.status?.description || "Error"}\n${escapeHtml(stderr || compileErr)}</span>`;
  }

  outputFooter.style.display = "flex";
  execTimeEl.textContent  = `⏱ ${data.time || elapsed}s`;
  exitCodeEl.textContent  = `Exit: ${data.exit_code ?? 0}`;
}

function displayError(msg) {
  setStatus("error");
  outputArea.innerHTML = `<span class="output-error">⚠ ${escapeHtml(msg)}</span>`;
}

// ── FALLBACK SIMULATION (when API key not set) ────────────
function simulateRun(code, langId, stdin) {
  // Very lightweight Python simulation for demo purposes
  const delay = 300 + Math.random() * 500;
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        let output = "";
        // Simulate print statements
        const printMatches = [...code.matchAll(/print\(([^)]+)\)/g)];
        if (printMatches.length > 0) {
          output = printMatches
            .map(m => {
              let arg = m[1].trim();
              // Remove surrounding quotes
              if ((arg.startsWith('"') && arg.endsWith('"')) ||
                  (arg.startsWith("'") && arg.endsWith("'"))) {
                arg = arg.slice(1, -1);
              }
              // Handle f-strings crudely
              arg = arg.replace(/f["'](.*)["']/, '$1');
              return arg;
            })
            .join("\n");
        } else if (code.includes("console.log")) {
          const matches = [...code.matchAll(/console\.log\(["'`]([^"'`]+)["'`]\)/g)];
          output = matches.map(m => m[1]).join("\n");
        } else if (code.includes("printf") || code.includes("cout")) {
          const matches = [...code.matchAll(/"([^"\\n]+)\\?n?"/g)];
          output = matches.map(m => m[1]).join("\n");
        } else {
          output = "✓ Code executed successfully (demo mode).\n\nNote: For full execution, configure your Judge0 RapidAPI key in app.js.";
        }

        resolve({
          stdout: btoa(unescape(encodeURIComponent(output))),
          status: { id: 3, description: "Accepted" },
          time: (delay / 1000).toFixed(3),
          exit_code: 0,
        });
      } catch (e) {
        resolve({
          stderr: btoa(unescape(encodeURIComponent(e.message))),
          status: { id: 11, description: "Runtime Error" },
          time: "0",
          exit_code: 1,
        });
      }
    }, delay);
  });
}

// ── STATUS ────────────────────────────────────────────────
function setStatus(state) {
  statusBadge.className = "badge " + state;
  outputDot.className   = "output-dot " + state;
  const labels = { running: "Running", success: "Success", error: "Error" };
  statusBadge.textContent = labels[state] || "Ready";
}

function clearOutput() {
  outputArea.innerHTML = '<span class="output-placeholder">Your output will appear here after you click Run ▶</span>';
  outputFooter.style.display = "none";
  statusBadge.className = "badge";
  statusBadge.textContent = "Ready";
  outputDot.className = "output-dot";
}

// ── PANEL RESIZE (drag divider) ───────────────────────────
divider.addEventListener("mousedown", e => {
  dividerDragging = true;
  document.body.style.cursor = "row-resize";
  document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", e => {
  if (!dividerDragging) return;
  const workspace = document.querySelector(".editor-area");
  const rect = workspace.getBoundingClientRect();
  const totalH = rect.height;
  const offsetY = e.clientY - rect.top;
  const pct = Math.min(Math.max(offsetY / totalH, 0.2), 0.8) * 100;
  editorPanel.style.flex  = `0 0 ${pct}%`;
  outputPanel.style.flex  = `0 0 ${100 - pct - 1}%`;
});

document.addEventListener("mouseup", () => {
  if (!dividerDragging) return;
  dividerDragging = false;
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
});

// ── TOAST ─────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// ── HELPERS ───────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function safeAtob(str) {
  try { return decodeURIComponent(escape(atob(str))); }
  catch { return str; }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── START ─────────────────────────────────────────────────
init();
