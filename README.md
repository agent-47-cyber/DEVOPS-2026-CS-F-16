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

---

## Running with Docker

### Prerequisites
- [Docker Engine](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Build and Start All Containers
```bash
docker compose up --build
```
This single command spins up the complete 3-tier containerized stack:
- **`portfolio-client`**: Multi-stage React/Vite SPA on Node.js Alpine ([http://localhost:5173](http://localhost:5173))
- **`portfolio-server`**: Node.js Alpine Express REST API on [http://localhost:5000](http://localhost:5000)
- **`portfolio-mongo`**: MongoDB 7.0 database container on `localhost:27017` with persistent named volume `portfolio-mongo-data`

### 2. Seed Database Inside Docker
```bash
docker compose exec server npm run seed
```

### 3. Check Container Status and Logs
```bash
# View running services
docker compose ps

# View real-time logs
docker compose logs -f

# View service-specific logs
docker compose logs server
docker compose logs client
docker compose logs mongo
```

### 4. Stop Containers
```bash
# Stop containers (preserves database volume)
docker compose down

# Stop containers and remove volumes (clean wipe)
docker compose down -v
```

---

### Docker Networking Architecture & Notes
- **Browser &rarr; Client Container**: Fetches the production static SPA bundle via Vite preview on port `5173`.
- **Browser &rarr; Server Container**: Client-side JavaScript makes REST API requests to `http://localhost:5000/api` on the host machine.
- **Server Container &rarr; MongoDB Container**: Server communicates with MongoDB internally over the Docker bridge network (`portfolio-network`) using the service hostname:
  - *Local Host Development*: `mongodb://localhost:27017/portfolio_db`
  - *Docker Compose*: `mongodb://mongo:27017/portfolio_db`
- **Data Persistence**: MongoDB stores data in the named volume `portfolio-mongo-data`, ensuring records survive container restarts and updates.

---

## Jenkins CI Pipeline

The project includes a declarative Jenkins Continuous Integration pipeline defined in [`Jenkinsfile`](./Jenkinsfile) at the repository root.

### Pipeline Stages

```text
Checkout ──▶ Install Dependencies ──▶ Lint (ESLint) ──▶ Build Client ──▶ Server Syntax Check ──▶ Continuous Feedback
```

1. **Checkout**: Checks out the latest commit from the Git repository.
2. **Install Dependencies**: Runs deterministic `npm ci` for both `client/` and `server/`.
3. **Lint**: Executes standard ESLint (`npm run lint`) across both React frontend (`client/src/`) and Express backend (`server/`).
4. **Build Client**: Generates the production Vite build (`npm run build`) in `client/dist/`.
5. **Server Syntax Check**: Validates Express server syntax and module imports (`npm run check` &rarr; `node --check server.js`) without hanging or requiring a live database.
6. **Continuous Feedback**: Reports pipeline status with explicit success/failure post-stage handlers.

### Setting Up the Jenkins Pipeline Job

1. **Prerequisites**:
   - Jenkins Controller (running locally or on server)
   - Node.js (v18+) configured on the Jenkins agent
   - Git plugin installed in Jenkins
2. **Job Configuration**:
   - In Jenkins Dashboard, click **New Item** &rarr; Select **Pipeline** &rarr; Enter job name (e.g. `portfolio-ci`).
   - Under **Pipeline**, select **Definition: Pipeline script from SCM**.
   - Select **SCM: Git** and provide the repository URL: `https://github.com/agent-47-cyber/collge_portfolio.git`.
   - Set **Script Path** to `Jenkinsfile`.
   - Click **Save** and trigger **Build Now**.

> *Note: Automated unit and integration testing (Jest, Supertest, React Testing Library) will be integrated into the Jenkins CI pipeline in Phase 10.*



