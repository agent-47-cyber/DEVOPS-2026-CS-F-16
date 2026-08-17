# Fullstack Portfolio & DevOps Capstone Project

> A modern, fullstack personal portfolio with an integrated content management admin system, built as a DevOps-methodology capstone project for B.Tech (RTU).

## Tech Stack

Strictly aligned with the RTU syllabus:

| Layer | Technology |
|---|---|
| **Markup & Styling** | HTML5, CSS3, Tailwind CSS |
| **Client Scripting** | Vanilla JavaScript (ES6+), DOM APIs |
| **AJAX / Data Exchange** | Fetch API |
| **Frontend Framework** | React (Vite, Functional Components, Hooks) |
| **Routing** | React Router |
| **Client State** | Redux (Redux Toolkit) — Admin/Auth State |
| **Backend Runtime** | Node.js |
| **Backend Framework** | Express.js (REST APIs, Middleware, Static Files) |
| **Database** | MongoDB |
| **ODM** | Mongoose |
| **Version Control** | Git |
| **Continuous Integration** | Jenkins |
| **Containerization** | Docker |
| **Orchestration** | Kubernetes |
| **Monitoring** | Prometheus + Grafana |

---

## Project Structure

```text
portfolio-project/
├── client/              # React frontend (Vite + Tailwind CSS)
├── server/              # Express REST API backend (Node.js + Mongoose)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
└── README.md
```

---

## How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Server Setup
```bash
cd server
npm install
# Create .env from .env.example
npm run dev
```
Server runs at `http://localhost:5000`

### 2. Client Setup
```bash
cd client
npm install
# Create .env from .env.example
npm run dev
```
Client runs at `http://localhost:5173`
