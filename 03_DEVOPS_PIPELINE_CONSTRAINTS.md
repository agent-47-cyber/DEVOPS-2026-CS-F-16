# DevOps Pipeline Constraints

These apply from Phase 4 onward (containerization) through Phase 7 (monitoring). Don't build any of this early.

## Version Control (Git) — DevOps Module 3

- Branches: `main` (stable/deployable), `dev` (integration), feature branches `feat/<short-name>`
- Never commit `.env`, `node_modules`, or DB dumps — `.gitignore` from Phase 1
- Commit convention (see Agent Rules #9): `type: short description`
- Merge features into `dev`, merge `dev` into `main` only at end of a phase, in a working state

## Continuous Integration — Jenkins — DevOps Module 4

Jenkinsfile stages, in this order, matching the syllabus's CI concepts (build automation, Jenkinsfile basics, automated testing, continuous feedback):

1. **Checkout** — pull from Git
2. **Install** — `npm ci` for both `client/` and `server/`
3. **Lint** — ESLint on both apps
4. **Build** — `npm run build` for `client/` (Vite build); server has no build step, just a syntax/start check
5. **Test** — run backend tests (Jest/Supertest) and frontend tests (React Testing Library) — see testing phase
6. **Feedback** — pipeline fails loudly on any stage failure; success/failure should be visible in Jenkins UI (this satisfies "Continuous Feedback in CI Process")

Keep the Jenkinsfile declarative, not scripted — simpler to explain in a viva. One `Jenkinsfile` at repo root.

## Containerization — Docker — DevOps Module 5

- Separate `Dockerfile` for `client/` (multi-stage: build with Node, serve with a lightweight static server) and `server/` (Node runtime)
- `docker-compose.yml` at repo root for **local dev only**: `client`, `server`, `mongo` services, with a named volume for Mongo data
- Images should be small — use `-alpine` base images where practical
- No secrets baked into images — all config via environment variables (`.env` for compose, ConfigMaps/Secrets for k8s)
- This stage covers "Virtualization vs Containerization, Docker Basics, Docker Architecture, Docker Commands" — keep Dockerfiles simple and well-labeled over clever

## Orchestration — Kubernetes — DevOps Module 6

- Manifests in `k8s/`: `Deployment` + `Service` for `client`, `Deployment` + `Service` for `server`, `Secret` for Mongo URI/JWT secret, and either a `StatefulSet` for Mongo or (agent: confirm) a documented assumption to use MongoDB Atlas and skip the in-cluster DB — pick whichever is simpler to demo and state the assumption
- Use `ClusterIP` for internal service-to-service, `NodePort` or `Ingress` (whichever the syllabus depth suggests — default to NodePort, simpler to demo without extra ingress controller setup) to expose the frontend
- Add liveness/readiness probes on `server` hitting `GET /api/health`
- This is a **college syllabus depth** deployment — don't add Helm charts, autoscaling, or multi-node cluster concerns unless explicitly asked later

## Monitoring — Prometheus & Grafana — DevOps Module 6

- Backend exposes a `/metrics` endpoint via `prom-client` (Node.js Prometheus client) — request count, request duration histogram, and default Node process metrics
- Prometheus scrape config targets the `server` service on its `/metrics` endpoint
- Grafana connects to Prometheus as a data source; build one dashboard covering: request rate, error rate, response time, and basic Node process health (memory/CPU)
- This satisfies the syllabus's "Metrics Collection and Types (Counter, Gauge, Histogram), Prometheus Architecture, Grafana Dashboard Creation, Logging and Alerting Concepts, Performance Monitoring Basics" — alerting can stay basic (one example Alertmanager rule, e.g. high error rate) rather than a full alerting suite

## Explicitly out of scope for the DevOps layer

Terraform/Ansible/any infra-as-code beyond what's in the syllabus (IaC is discussed as a *concept* only, module 2 — not implemented), cloud provider-specific services, Helm, GitOps tools (ArgoCD/Flux), service mesh, multi-cluster setups, autoscaling policies. If a "more standard industry" version of something tempts you, don't — the grading rubric is this syllabus, not industry best practice.
