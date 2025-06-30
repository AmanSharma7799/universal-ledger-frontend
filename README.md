# 🔐 Mini-Google Cloud Universal Ledger (Frontend)

A modern React-based dashboard for interacting with the [Universal Ledger Backend](https://github.com/AmanSharma7799/universal-ledger-backend) — a tamper-evident append-only ledger inspired by blockchain concepts.

---

## 🌟 Features

- ✅ Add new ledger entries in JSON format
- 📜 View all entries in a clean interface
- 🔍 Verify ledger integrity with one click
- 🚨 See detailed errors when ledger integrity fails
- 🗑 **Reset Ledger** to clear all entries and return to genesis block — ideal for managing memory in free hosting
- ⚡ Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Axios](https://axios-http.com/)

---

## 🧪 How It Works

- The frontend connects to the `/api/ledger` endpoints of the backend.
- Each new entry is hashed and linked to the previous one.
- You can reset the entire ledger to its initial state by clicking the **Reset Ledger** button — this is useful when running on limited memory environments like Vercel or Koyeb.

---
