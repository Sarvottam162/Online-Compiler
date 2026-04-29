# 🖥️ Online Compiler

A professional, browser-based code editor and compiler supporting **10+ programming languages** — no setup required.

---

## ✨ Features

- **10 Languages**: Python, JavaScript, Java, C, C++, C#, Go, Rust, Ruby, PHP
- **Resizable panels**: Drag the divider to resize editor vs output
- **Line numbers** with synchronized scrolling
- **stdin support** — pass input to your program
- **Font size & tab size** settings
- **Dark / Light theme** toggle (persisted)
- **Share** button — encodes code in URL for sharing
- **Copy / Clear** code actions
- **Example programs** per language
- **Execution time** and **exit code** display

---

## 🚀 Getting Started

Just open `index.html` in any modern browser. That's it — no build step, no dependencies to install.

```bash
# Option 1: open directly
open index.html

# Option 2: serve locally
npx serve .
# or
python -m http.server 8080
```

---

## ⚙️ Enabling Real Code Execution

By default, the compiler runs in **demo / simulation mode** (it simulates simple print statements without a backend).

To enable **real execution** of all languages:

### Step 1 — Get a free Judge0 API key
1. Go to [https://rapidapi.com/judge0-official/api/judge0-ce](https://rapidapi.com/judge0-official/api/judge0-ce)
2. Sign up (free tier available)
3. Copy your **RapidAPI Key**

### Step 2 — Add your key to `app.js`
Open `app.js` and find these two lines (around line 139 and 152):

```js
"X-RapidAPI-Key": "DEMO",
```

Replace `"DEMO"` with your actual key:

```js
"X-RapidAPI-Key": "your_actual_rapidapi_key_here",
```

That's it! The compiler will now execute real code.

---

## 📁 Project Structure

```
online-compiler/
├── index.html   — Main HTML structure
├── style.css    — All styling (CSS variables, dark/light theme)
├── app.js       — Logic: language config, execution, UI interactions
└── README.md    — This file
```

---

## 🌐 Deployment

You can host this on any static host:

| Platform    | Command / Steps |
|-------------|----------------|
| **GitHub Pages** | Push to `gh-pages` branch |
| **Netlify** | Drag & drop the folder |
| **Vercel**  | `vercel deploy` |
| **Surge.sh**| `surge .` |

---

## 🔑 Language IDs (Judge0)

| Language   | ID |
|------------|----|
| Python 3   | 71 |
| JavaScript | 63 |
| Java       | 62 |
| C          | 50 |
| C++        | 54 |
| C#         | 51 |
| Go         | 60 |
| Rust       | 73 |
| Ruby       | 72 |
| PHP        | 68 |

---

## 📄 License

MIT — free to use, modify, and distribute.
