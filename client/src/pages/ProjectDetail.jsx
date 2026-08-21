import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <span>&larr;</span>
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Case Study Header */}
      <div className="space-y-4 border-b border-neutral-800 pb-8">
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
          <span>PROJECT CASE STUDY</span>
          <span>&bull;</span>
          <span className="text-neutral-300">ID: {id}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Fullstack Capstone & DevOps Architecture
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed">
          In-depth architectural review of the fullstack portfolio system, automated CI/CD pipeline in Jenkins, container lifecycle with Docker, and Kubernetes deployment topology.
        </p>

        {/* Metadata summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-900 text-xs">
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Role</span>
            <span className="font-medium text-neutral-200 mt-1 block">Fullstack & DevOps</span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Timeline</span>
            <span className="font-medium text-neutral-200 mt-1 block">2026 Academic Project</span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Deliverable</span>
            <span className="font-medium text-neutral-200 mt-1 block">B.Tech RTU Capstone</span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Links</span>
            <div className="flex gap-2 mt-1">
              <span className="text-neutral-300 hover:underline cursor-pointer">Live Demo</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-300 hover:underline cursor-pointer">Source</span>
            </div>
          </div>
        </div>
      </div>

      {/* Case study story sections with Reveal animations */}
      <div className="space-y-10">
        <Reveal>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">01. Overview & Problem Statement</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Traditional portfolios are static websites without real backend capabilities or automated delivery workflows. This capstone project addresses this gap by engineering an integrated platform featuring a protected Express REST API, MongoDB document storage, and an automated continuous delivery pipeline.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">02. Technical Architecture & Stack</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Built strictly in accordance with RTU B.Tech syllabus modules:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-neutral-300 pt-2">
              <li className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/60">
                <span className="text-neutral-500 block">Frontend</span>
                React (Vite) + Tailwind CSS + React Router
              </li>
              <li className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/60">
                <span className="text-neutral-500 block">Backend</span>
                Node.js + Express.js + Mongoose CRUD
              </li>
              <li className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/60">
                <span className="text-neutral-500 block">DevOps Automation</span>
                Jenkins Declarative CI + Docker Alpine Images
              </li>
              <li className="p-3 rounded-lg border border-neutral-800 bg-neutral-950/60">
                <span className="text-neutral-500 block">Orchestration & Metrics</span>
                Kubernetes Deployments + Prometheus / Grafana
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">03. Key Engineering Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-neutral-400">Automated build & lint CI pass rate in Jenkins</div>
              </div>
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                <div className="text-2xl font-bold text-white mb-1">&lt; 50ms</div>
                <div className="text-xs text-neutral-400">API health & endpoint latency</div>
              </div>
              <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
                <div className="text-2xl font-bold text-white mb-1">Zero-Downtime</div>
                <div className="text-xs text-neutral-400">Kubernetes rolling update strategy</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default ProjectDetail;
