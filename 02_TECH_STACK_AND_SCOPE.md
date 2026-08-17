# Tech Stack & Project Scope

## Locked stack (syllabus-derived — nothing outside this list)

| Layer | Allowed | Source (syllabus module) |
|---|---|---|
| Markup/Styling | HTML5, CSS3, **Tailwind CSS** | Web Dev Module 2 |
| Client scripting | Vanilla JS (ES6), DOM APIs | Web Dev Module 3 |
| AJAX/data exchange | `fetch` (AJAX concept from module 3) | Web Dev Module 3 |
| Frontend framework | **React** (functional components, JSX, hooks) via Vite | Web Dev Module 4 |
| Routing | **React Router** | Web Dev Module 4 |
| Client state | **Redux** (Redux Toolkit) — used only for admin/auth state, not everywhere | Web Dev Module 4 |
| Backend runtime | **Node.js** | Web Dev Module 5 |
| Backend framework | **Express.js** (REST APIs, middleware, static files) | Web Dev Module 5 |
| Database | **MongoDB** | Web Dev Module 6 |
| ODM | **Mongoose** (CRUD) | Web Dev Module 6 |
| Version control | **Git** | DevOps Module 3 |
| CI | **Jenkins** | DevOps Module 4 |
| Containerization | **Docker** | DevOps Module 5 |
| Orchestration | **Kubernetes** (Pods, Deployments, Services) | DevOps Module 6 |
| Monitoring | **Prometheus + Grafana** | DevOps Module 6 |

## Explicitly NOT allowed

Next.js or any other meta-framework, TypeScript, GraphQL, Prisma/Sequelize/any non-Mongoose ODM, any DB other than MongoDB, any CI tool other than Jenkins, Terraform/Ansible/Pulumi, Helm, ArgoCD/GitOps tools, service mesh, any UI kit beyond Tailwind (no MUI/Chakra/Bootstrap), any auth provider/library beyond plain JWT (`jsonwebtoken` + `bcrypt`). If it's not in the table above, it's not in this project — flag it instead of adding it.

> Note: outside this project, day-to-day work uses Node/TypeScript — that preference does **not** apply here. This project is graded strictly against the syllabus above, so plain JS throughout, no TS.

## Design direction (visual reference)

Reference: `emilianmisera.com` — an Awwwards-style creative-developer portfolio. Take from it: a bold animated hero/intro, a minimal top nav (Home / Work / Resume / Contact), a scroll-driven "story" section for the about content, a clean project grid leading into individual **project case-study pages** (not just a modal), and a separate Resume page. Match the *structure and polish level*, not literal content or copy.

**Constraint on motion:** the reference site is built with animation libraries (Framer Motion/GSAP-class tooling). Those are **not** in the locked stack. Recreate the feel with plain CSS (`transition`, `@keyframes`, `transform`) plus vanilla JS (`IntersectionObserver` for scroll-reveal, simple `requestAnimationFrame` where needed). This is a real constraint, not a downgrade to skip — scroll-reveal and hover/entry animation are achievable this way and it keeps the project inside what the syllabus actually teaches (DOM manipulation, JS ES6 — Web Dev Module 3). If a phase prompt asks for something animation-heavy, implement it this way by default.

Add to page scope: each `Project` needs enough fields to support a case-study-style detail page — long description, image, techStack[], repoUrl, liveUrl already covers this.

## Project scope

A personal portfolio site with a small real backend behind it (not a static site) — public-facing site + a private admin panel to manage its own content.

### Public pages
- **Home** — intro/hero, short about, featured projects (pulled from API)
- **Projects** — full list from DB, each with title, description, tech tags, links (repo/live), image
- **Project detail** — single project view (case-study style)
- **Skills** — list from DB, grouped by category
- **Experience/Education** — static-ish timeline, can be DB-backed or hardcoded (default to DB-backed for consistency)
- **Contact** — form (name, email, message) → POSTs to backend, stored in DB
- **Resume** — download link (static file served by Express)

### Admin (protected, not public-linked)
- **Login** — JWT-based, single admin user (seeded, not self-registration)
- **Dashboard** — CRUD for Projects, CRUD for Skills, read-only list of Contact messages (with mark-as-read)

### Data models (Mongoose schemas)
- `Project`: title, description, techStack[], repoUrl, liveUrl, imageUrl, featured (bool), order, timestamps
- `Skill`: name, category, level (optional), timestamps
- `Message`: name, email, message, read (bool, default false), createdAt
- `Admin`: username, passwordHash (seeded via script, not a public signup endpoint)

### Core API endpoints (REST, under `/api`)
- `GET /api/projects`, `GET /api/projects/:id`, `POST/PUT/DELETE /api/projects` (auth-protected)
- `GET /api/skills`, `POST/PUT/DELETE /api/skills` (auth-protected)
- `POST /api/messages` (public), `GET /api/messages`, `PATCH /api/messages/:id/read` (auth-protected)
- `POST /api/auth/login` → returns JWT
- `GET /api/health` — used later by Kubernetes liveness/readiness probes and Prometheus

## Folder structure (lock this in from phase 1)

```
portfolio-project/
├── client/              # React app (Vite)
├── server/              # Express app
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── config/
├── docker/              # Dockerfiles live here or alongside each app — decide in Phase 4, don't pre-create
├── k8s/                 # manifests — created in Phase 6
├── jenkins/             # Jenkinsfile — created in Phase 5
└── README.md
```
