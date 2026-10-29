# Kubernetes & Monitoring Architecture (DevOps Module 6)

This directory contains declarative Kubernetes manifests for the fullstack portfolio application, coupled with Prometheus metrics collection and Grafana operational dashboards.

---

## 1. Architecture Overview

```
                        +---------------------------------------------+
                        |           Kubernetes Cluster                |
                        |                                             |
[ Browser / User ] ---> | [NodePort 30080] --> Service: client (5173) |
                        |                              |              |
                        |                              v              |
                        |                      Pod: portfolio-client  |
                        |                              |              |
                        |                              v              |
                        | [ClusterIP 5000] --> Service: server (5000) |
                        |                              |              |
                        |                              v              |
                        |                      Pod: portfolio-server  |
                        |                         |            |      |
                        |                         v            v      |
                        |       Service: mongo (27017)     GET /metrics
                        |               |                      ^      |
                        |               v                      |      |
                        |         Pod: mongo:7.0               |      |
                        |               |                      |      |
                        |        PVC: mongo-pvc                |      |
                        |                                      |      |
[ Prometheus UI ]  ---> | [NodePort 30090] --> Service: prometheus    |
                        |                              | (Scrapes)    |
                        |                      Pod: prometheus        |
                        |                              ^              |
                        |                              |              |
[ Grafana Dashboards] > | [NodePort 30030] --> Service: grafana       |
                        |                              | (Queries)    |
                        |                      Pod: grafana:11        |
                        +---------------------------------------------+
```

---

## 2. Manifest Inventory

| Manifest File | Kind(s) | Description |
|---|---|---|
| `secret.yaml` | `Secret` | Database connection string, JWT secrets, and seeded admin credentials. |
| `mongo.yaml` | `PersistentVolumeClaim`, `Deployment`, `Service` (ClusterIP: 27017) | MongoDB 7.0 database engine with persistent disk volume. |
| `server.yaml` | `Deployment`, `Service` (ClusterIP: 5000) | Express.js REST API with liveness & readiness probes on `/api/health`. |
| `client.yaml` | `Deployment`, `Service` (NodePort: 30080) | React (Vite) production frontend. |
| `prometheus.yaml` | `ConfigMap`, `Deployment`, `Service` (NodePort: 30090) | Prometheus TSDB configured to scrape `server:5000/metrics` and evaluate alerts. |
| `grafana.yaml` | `ConfigMap` (x3), `Deployment`, `Service` (NodePort: 30030) | Grafana 11 with auto-provisioned Prometheus datasource & pre-loaded JSON dashboard. |

---

## 3. Deployment Instructions

### Prerequisites
- Running Kubernetes cluster (Minikube, Docker Desktop Kubernetes, kind, or cloud K8s).
- Pre-built local container images:
  ```bash
  docker build -t portfolio-server:latest ./server
  docker build -t portfolio-client:latest ./client
  ```

### Apply Manifests
Apply all manifests in topological order:
```bash
# 1. Apply Secrets & Database storage
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mongo.yaml

# 2. Deploy Backend & Frontend
kubectl apply -f k8s/server.yaml
kubectl apply -f k8s/client.yaml

# 3. Deploy Monitoring Stack
kubectl apply -f k8s/prometheus.yaml
kubectl apply -f k8s/grafana.yaml
```
*(Or apply all at once with `kubectl apply -f k8s/`)*

### Verify Running Pods & Services
```bash
kubectl get pods -l app.kubernetes.io/part-of=portfolio-capstone
kubectl get services -l app.kubernetes.io/part-of=portfolio-capstone
```

---

## 4. Accessing Services

| Service | Access Type | NodePort URL | Port Forward Command (Alternative) |
|---|---|---|---|
| **Client Frontend** | NodePort | `http://<Node-IP>:30080` | `kubectl port-forward svc/client 5173:5173` -> `http://localhost:5173` |
| **Backend REST API** | Internal (ClusterIP) | N/A | `kubectl port-forward svc/server 5000:5000` -> `http://localhost:5000` |
| **Prometheus UI** | NodePort | `http://<Node-IP>:30090` | `kubectl port-forward svc/prometheus 9090:9090` -> `http://localhost:9090` |
| **Grafana Dashboard** | NodePort | `http://<Node-IP>:30030` | `kubectl port-forward svc/grafana 3000:3000` -> `http://localhost:3000` |

*Note: For Docker Desktop Kubernetes on Windows, `http://localhost:<NodePort>` (e.g. `http://localhost:30080`, `http://localhost:30030`) works directly.*

---

## 5. Prometheus Metrics Exposition & Dashboard Overview

### Metrics Collected by Backend (`/metrics` via `prom-client`)
1. **Counter (`http_requests_total`)**: Total incoming HTTP requests labeled by `method`, `route`, and `status_code`.
2. **Histogram (`http_request_duration_seconds`)**: Latency distributions across configurable duration buckets.
3. **Gauge (`http_active_requests`)**: Number of concurrent in-flight HTTP requests.
4. **Node Process Metrics**: Automatic runtime telemetry including `nodejs_heap_size_used_bytes`, `nodejs_heap_size_total_bytes`, `nodejs_process_cpu_seconds_total`, and `process_uptime_seconds`.

### Pre-Configured Grafana Dashboard Panels
- **Backend Service Status**: Live UP/DOWN indicator (`up{job="portfolio-server"}`).
- **Active In-Flight Requests**: Real-time gauge of pending requests.
- **Total Requests Handled**: Lifetime query counter.
- **Server Process Uptime**: Human-readable uptime display.
- **HTTP Request Rate (RPS)**: Requests per second segmented by endpoint route.
- **HTTP Latency Percentiles**: 95th percentile (p95) and median (p50) latency graphs.
- **HTTP Response Codes**: Breakdown of 2xx, 4xx, and 5xx return codes.
- **5xx Error Rate (%)**: Percentage of failing requests with warning/critical threshold lines.
- **Node.js Memory Utilization**: Heap used, heap total, and external memory consumption over time.
- **Node.js CPU Utilization**: Dynamic process CPU usage percentage graph.

---

## 6. Viva Exam Reference Points

1. **Why use ClusterIP for MongoDB and Server?**
   - Security in depth. Internal databases and backend APIs shouldn't be exposed directly to public node interfaces. Only the client frontend and administrative monitoring services are exposed via NodePort.
2. **What role do Liveness and Readiness Probes play?**
   - **Liveness probe**: Periodically queries `GET /api/health`. If the Node.js process deadlocks, Kubernetes terminates and restarts the container.
   - **Readiness probe**: Ensures Kubernetes routes traffic to the pod only after MongoDB connection is established and the server is genuinely ready to handle requests.
3. **How does Grafana provision dashboards without manual clicks?**
   - Declarative provisioning: Grafana mounts `dashboards.yaml` and `datasource.yaml` via Kubernetes ConfigMaps, automatically establishing the Prometheus link and loading the JSON dashboard upon startup.

