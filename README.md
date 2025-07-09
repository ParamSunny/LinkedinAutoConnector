# 🔗 Automated LinkedIn Connection Sender (Playwright + TypeScript + Docker)

This project automates the process of sending LinkedIn connection requests based on a keyword search using **Playwright**, **TypeScript**, and **Docker**.

It searches LinkedIn profiles matching a specific keyword (e.g., “QA Intern”, “Java Developer”), navigates to the **People** section, scrolls through pages, and automatically sends connection requests up to a specified limit.

---

## ✅ Features

- Automated LinkedIn Login  
- Keyword-based Search  
- Auto-switch to **People** tab  
- Scroll & Auto-Connect to profiles  
- Auto-pagination (clicks “Next” button for multiple pages)  
- Configurable connection limit  
- Headless browser support (Docker-friendly)  
- Dockerized for easy deployment

---

## 🚀 Tech Stack

- [Playwright](https://playwright.dev/) (Automation)
- TypeScript (Project Language)
- Node.js
- Docker (Containerization)

---

## 📂 Project Structure

linkedin-connection-sender/

│

├── src/

│ └── linkedin-connector.ts <-- Main Automation Script

│

├── package.json <-- Project Dependencies

├── tsconfig.json <-- TypeScript Configuration

├── Dockerfile <-- Docker Build File

└── README.md <-- Project Documentation


---

## 🚀 Setup
Just download the linkedin-connector.ts file then open terminal and write

``` npm init -y ```

➜ Install Playwright (with TypeScript support): 

```
npm install -D playwright
npx playwright install
```

## ⚙️ How It Works

1. Logs into LinkedIn automatically.
2. Searches with a specified keyword.
3. Switches to **People** tab.
4. Sends connection requests to profiles.
5. Navigates through pages until connection limit is reached.

---

## ⚙️ Configuration

Inside `src/linkedin-connector.ts`:
```ts
const searchKeyword = 'YOUR_KEYWORD';   // <-- Your target search keyword
const maxConnections = 5;            // <-- Limit of connection requests
