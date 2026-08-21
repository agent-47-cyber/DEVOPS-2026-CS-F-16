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
| **Client State** | Redux — Admin/Auth State |
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
│   ├── config/          # DB connection & seed script
│   ├── controllers/     # Route logic (auth, projects, skills, messages)
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # Mongoose schemas (Admin, Project, Skill, Message)
│   └── routes/          # REST API endpoints (/api/*)
└── README.md
```

---

## API Summary (Quick Reference)

| Method | Route | Protection | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Liveness probe & service status |
| `POST` | `/api/auth/login` | Public | Admin login & JWT retrieval |
| `GET` | `/api/projects` | Public | List all / featured projects |
| `GET` | `/api/projects/:id` | Public | Single project detail |
| `POST` | `/api/projects` | **Protected** | Create project |
| `PUT` | `/api/projects/:id` | **Protected** | Update project |
| `DELETE` | `/api/projects/:id` | **Protected** | Delete project |
| `GET` | `/api/skills` | Public | List skills |
| `POST` | `/api/skills` | **Protected** | Create skill |
| `PUT` | `/api/skills/:id` | **Protected** | Update skill |
| `DELETE` | `/api/skills/:id` | **Protected** | Delete skill |
| `POST` | `/api/messages` | Public | Submit contact message |
| `GET` | `/api/messages` | **Protected** | Read admin messages |
| `PATCH` | `/api/messages/:id/read` | **Protected** | Mark message as read |

Detailed documentation available at [`server/README.md`](server/README.md).

---

## How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 1. Server Setup
```bash
cd server
npm install
npm run seed  # Seeds default admin user
npm run dev   # Starts server at http://localhost:5000
```

### 2. Client Setup
```bash
cd client
npm install
npm run dev   # Starts client at http://localhost:5173
```
