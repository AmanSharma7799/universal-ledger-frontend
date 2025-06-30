# 🔐 Mini-Google Cloud Universal Ledger (Frontend)

A modern React-based dashboard for interacting with the [Universal Ledger Backend](https://github.com/AmanSharma7799/universal-ledger-backend) — a tamper-evident append-only ledger inspired by blockchain concepts.

---

Access the App here ->  [Universal Ledger](https://universal-ledger-frontend.vercel.app/)

---

## 🌟 Features

- ✅ Append-only entries (no edits or deletes)
- 🔐 Cryptographic hash chaining (SHA-256)
- 📜 Full audit trail
- 🌱 Lightweight, in-memory implementation (can be extended to use PostgreSQL or MongoDB)
- ✅ Add new ledger entries in JSON format
- 📜 View all entries in a clean interface
- 🔍 Verify ledger integrity with one click
- 🚨 See detailed errors when ledger integrity fails
- 🗑 **Reset Ledger** to clear all entries and return to genesis block — ideal for managing memory in free hosting
- ⚡ Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Axios](https://axios-http.com/)

---

## 🌲 Merkle Tree Visualization

- Every ledger entry is hashed using SHA-256.
- These hashes are used to construct a **Merkle Tree**, which is:
  - ✅ **Built dynamically** on the frontend
  - ✅ **Rendered visually** showing all levels from leaves to root
- This provides a transparent way to inspect how the Merkle Root is derived.

Use this visualization to:
- Demonstrate **tamper-evident integrity**
- Educate others about how Merkle Trees work
- Validate entry inclusion with ease

---

## 🧪 How It Works

- The frontend connects to the `/api/ledger` endpoints of the backend.
- Each new entry is hashed and linked to the previous one.
- You can reset the entire ledger to its initial state by clicking the **Reset Ledger** button — this is useful when running on limited memory environments like Vercel or Koyeb.

---

## 🚀 Backend App Hosted:

Backend: [https://universal-ledger-backend.onrender.com](https://universal-ledger-backend.onrender.com)

---
