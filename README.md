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
Checkout ──▶ Install Dependencies ──▶ Lint (ESLint) ──▶ Build Client ──▶ Server Syntax Check ──▶ Automated Tests ──▶ Continuous Feedback
```

1. **Checkout**: Checks out the latest commit from the Git repository.
2. **Install Dependencies**: Runs deterministic `npm ci` for both `client/` and `server/`.
3. **Lint**: Executes standard ESLint (`npm run lint`) across both React frontend (`client/src/`) and Express backend (`server/`).
4. **Build Client**: Generates the production Vite build (`npm run build`) in `client/dist/`.
5. **Server Syntax Check**: Validates Express server syntax and module imports (`npm run check` &rarr; `node --check server.js`) without hanging or requiring a live database.
6. **Automated Tests**: Runs Jest and Supertest backend tests along with React Testing Library frontend tests (`npm test`).
7. **Continuous Feedback**: Reports pipeline status with explicit success/failure post-stage handlers.

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

---

## Kubernetes Orchestration (DevOps Module 6)

The project includes production-ready, declarative Kubernetes manifests in [`k8s/`](k8s/):

| Manifest File | Components Deployed | Description |
|---|---|---|
| `k8s/secret.yaml` | `Secret` | Database connection strings, JWT secret, and admin credentials. |
| `k8s/mongo.yaml` | `PersistentVolumeClaim`, `Deployment`, `Service` (ClusterIP: 27017) | MongoDB 7.0 database engine with persistent disk storage. |
| `k8s/server.yaml` | `Deployment`, `Service` (ClusterIP: 5000) | Express.js REST API with liveness & readiness probes on `/api/health`. |
| `k8s/client.yaml` | `Deployment`, `Service` (NodePort: 30080) | React (Vite) production frontend. |
| `k8s/prometheus.yaml` | `ConfigMap`, `Deployment`, `Service` (NodePort: 30090) | Prometheus TSDB configured to scrape `/metrics` and evaluate alert rules. |
| `k8s/grafana.yaml` | `ConfigMap`, `Deployment`, `Service` (NodePort: 30030) | Grafana 11 with auto-provisioned Prometheus datasource & preloaded dashboard. |

### Deploying to Kubernetes

```bash
# Apply all manifests to your active Kubernetes cluster
kubectl apply -f k8s/

# Verify status of all pods and services
kubectl get pods
kubectl get services
```

### Accessing Kubernetes Services

- **Frontend Application**: `http://localhost:30080` (or `kubectl port-forward svc/client 5173:5173`)
- **Backend API & Health**: `http://localhost:5000` (via `kubectl port-forward svc/server 5000:5000`)
- **Prometheus UI**: `http://localhost:30090` (or `kubectl port-forward svc/prometheus 9090:9090`)
- **Grafana Dashboard**: `http://localhost:30030` (or `kubectl port-forward svc/grafana 3000:3000`)

---

## Monitoring: Prometheus & Grafana Dashboard (DevOps Module 6)

### 1. Prometheus Metrics Collection (`prom-client`)
The Express backend exposes real-time telemetry at `GET /metrics` and `GET /api/metrics`:
- **Counter (`http_requests_total`)**: Total HTTP requests categorized by `method`, `route`, and `status_code`.
- **Histogram (`http_request_duration_seconds`)**: Latency percentiles across response time buckets.
- **Gauge (`http_active_requests`)**: Instantaneous in-flight HTTP requests.
- **Node.js System Telemetry**: Memory heap (`nodejs_heap_size_used_bytes`), CPU utilization, and process uptime.

### 2. Pre-Configured Grafana Dashboard
A comprehensive operations dashboard is automatically loaded into Grafana:
1. **Backend Service Status**: Live UP/DOWN indicator (`up{job="portfolio-server"}`).
2. **Active In-Flight Requests**: Real-time gauge of pending requests.
3. **Total Requests Handled**: Lifetime query counter.
4. **Server Process Uptime**: Human-readable uptime display.
5. **HTTP Request Rate (RPS)**: Requests per second segmented by endpoint route.
6. **HTTP Latency Percentiles**: 95th percentile (p95) and median (p50) latency graphs.
7. **HTTP Status Codes**: Breakdown of 2xx, 4xx, and 5xx return codes.
8. **HTTP 5xx Error Rate (%)**: Percentage of failing requests with warning threshold lines.
9. **Node.js Memory Utilization**: Heap used, heap total, and external memory consumption over time.
10. **Node.js CPU Utilization**: Dynamic process CPU usage percentage graph.

### 3. Running with Docker Compose (Local Monitoring)
```bash
# Build and start all 5 containers (client, server, mongo, prometheus, grafana)
docker compose up --build -d

# Open Grafana in your browser:
# URL: http://localhost:3000
# User: admin / Pass: admin
```



