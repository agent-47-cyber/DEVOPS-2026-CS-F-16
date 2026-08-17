# AGENT RULES — Read This File First

You are building a **fullstack portfolio website** for a B.Tech (RTU) student, delivered as a **DevOps-methodology capstone project**. Two other files define scope — read them in this order:

1. `01_AGENT_RULES.md` (this file)
2. `02_TECH_STACK_AND_SCOPE.md`
3. `03_DEVOPS_PIPELINE_CONSTRAINTS.md`

Do not start writing code until you have read all three.

## Non-negotiable rules

1. **Stack lock.** Use only what `02_TECH_STACK_AND_SCOPE.md` allows. If a task seems to need something outside that list (a new npm package, a different DB, a UI framework, etc.), **stop and ask instead of substituting or adding it silently.** This project is graded against a fixed college syllabus — "better" tools that aren't on the syllabus are a wrong answer, not a bonus.
2. **No scope creep.** Build exactly the pages/features/endpoints listed in `02_TECH_STACK_AND_SCOPE.md`. Don't invent extra pages, extra models, or "nice to have" features unless asked.
3. **Phase discipline.** This project will be built in phases, delivered to you as separate prompts, one at a time. Complete only the current phase. Don't pre-build later phases "to save time" — it causes drift from what's actually asked. End each phase by summarizing what was built and what's explicitly deferred to the next phase.
4. **No unexplained scaffolding.** Don't generate boilerplate features from a template (auth providers, analytics, i18n, testing frameworks not specified, etc.) unless a phase prompt asks for it.
5. **Ask, don't assume, on ambiguity.** If a phase prompt is underspecified (e.g. exact field names, styling detail), pick the most obvious college-project-appropriate default, state the assumption in one line, and continue — don't block on it. Only stop and ask if the ambiguity affects the tech stack or data model.
6. **Real data over mock data by the end of each phase.** Placeholder/mock data is fine mid-phase, but each phase should end wired to the real API/DB where the phase covers that layer — not left on hardcoded arrays.
7. **Comment sparingly, and only where non-obvious.** No comment-per-line. This is a student project — code should read as something the student can explain in a viva, not as generated noise.
8. **Consistent structure.** Keep the folder structure defined in `02_TECH_STACK_AND_SCOPE.md`. Don't reorganize it mid-project.
9. **Commit discipline.** One logical change per commit. Conventional commit style: `feat:`, `fix:`, `chore:`, `docs:`, `ci:`, `build:`. This history is itself a graded DevOps artifact (Version Control module) — messy commits are a real deduction, not cosmetic.
10. **Don't touch the DevOps layer until told to.** Jenkinsfile, Dockerfiles, K8s manifests, and monitoring config are built in their own later phases per `03_DEVOPS_PIPELINE_CONSTRAINTS.md` — don't add them speculatively while building the app itself.

## How phases will be delivered

Each phase will arrive as its own prompt, referencing this rules file and the scope/pipeline files. Expected phase order (12 phases, subject to the exact prompts you'll receive):

1. **Repo scaffolding** — folder structure, client/server init, .gitignore, base package.jsons, README stub
2. **Backend foundation** — Express app + MongoDB connection + Mongoose models (Project, Skill, Message, Admin)
3. **Backend API** — full REST endpoints + validation + JWT auth middleware
4. **Frontend foundation** — React (Vite) + Tailwind + React Router, static shell pages, nav
5. **Frontend design/animation pass** — hero, scroll-reveal about section, project grid — CSS/vanilla-JS motion only (see design direction in scope file)
6. **Frontend ⇄ Backend integration** — real project/skill data, contact form wired to API, project case-study detail pages
7. **Admin panel** — login UI + Redux auth state + CRUD dashboard for projects/skills/messages
8. **Containerization** — Dockerfiles (client + server) + docker-compose for local dev
9. **CI** — Jenkins pipeline: checkout, install, lint, build
10. **Testing** — Jest/Supertest (backend) + React Testing Library (frontend), added as a real stage in the Jenkins pipeline
11. **CD + Kubernetes** — manifests (Deployments, Services, Secrets, probes), deployment strategy
12. **Monitoring + final polish** — Prometheus + Grafana + one alert rule, README/demo script, last pass over the whole app

Testing is not a bolt-on at the end — phase 10 exists specifically to wire real automated tests into the CI pipeline built in phase 9, per the DevOps syllabus's "Automated Testing in CI Pipeline" item.

Do not renumber or merge these phases on your own initiative.

## When a phase is done

Give a short summary: what was built, which files changed, how to run/verify it locally, and what's intentionally left for the next phase. Don't write a long report — this is a working session, not documentation deliverable (docs come at the end if asked).
