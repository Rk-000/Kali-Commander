# ⚡ KALI COMMANDER

> 🚀 Build • Customize • Execute Kali Linux Commands Effortlessly

---

## 🧠 Overview

**Kali Commander** is a modern web-based command builder designed for Kali Linux tools.  
It simplifies complex command-line usage into an interactive interface where users can select options, generate commands, and execute them efficiently.

---

## 🔥 Features

- 🛠️ 64 Kali Linux Tools  
- 📂 15 Organized Categories  
- ⚡ Real-time Command Generation  
- 💾 Save & Load Commands  
- 🧩 Custom Flags Support  
- 📁 Output Configuration System  
- 🎯 Beginner-Friendly Interface  
- 🧠 Advanced Options for Professionals  

---

## 🏗️ How It Works

### 1️⃣ Homepage
- Loads all categories dynamically from `tools-data.js`
- Displays tools grouped into 15 categories

### 2️⃣ Tool Pages
- Each tool has a dedicated page
- Options are generated dynamically using the shared template
- Custom-designed pages (like WPScan, theHarvester) include advanced UI

### 3️⃣ Command Builder Engine
- Powered by `command-builder.js`
- Collects selected options
- Builds valid CLI commands in real-time

### 4️⃣ Utilities
- `utils.js` handles validation, formatting, and notifications

---

## 📁 Project Structure

```
kali-commander/
│
├── index.html
├── css/
│   ├── style.css
│   ├── categories.css
│   └── tool-pages.css
│
├── js/
│   ├── main.js
│   ├── tools-data.js
│   ├── command-builder.js
│   └── utils.js
│
└── pages/
    ├── nmap.html
    ├── sqlmap.html
    ├── wpscan.html
    └── ...
```

---

## 🚀 Usage

1. Open the project in your browser  
2. Select a category  
3. Choose a tool  
4. Pick your options  
5. Copy the generated command  
6. Run it in Kali Linux  

---

## 📌 Version

Version 1.0 Complete Build — this release includes the full Kali Commander file set for the current project structure, with all planned tool pages included in this version.

---

## 📜 License

Free for individual use.  
Commercial use by companies or organizations requires a paid license.

---

## 👤 Author

**Rownok Ahmed Khan**  
https://sites.google.com/view/rownokahmedkhan  

---

## ⚠️ Disclaimer

This tool is for educational and ethical security testing purposes only.  
Unauthorized use is strictly prohibited.

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
