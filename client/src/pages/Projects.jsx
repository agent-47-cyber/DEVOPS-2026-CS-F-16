import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

// High-polish placeholder projects conforming to Mongoose Project schema
const PLACEHOLDER_PROJECTS = [
  {
    id: 'portfolio-capstone',
    title: 'Fullstack Portfolio & DevOps Capstone',
    description: 'An automated portfolio platform integrated with a full CI/CD Jenkins pipeline, Docker containerization, Kubernetes orchestration, and Prometheus telemetry.',
    techStack: ['React', 'Express', 'MongoDB', 'Docker', 'Kubernetes', 'Jenkins'],
    featured: true,
    category: 'Fullstack / DevOps',
    repoUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com'
  },
  {
    id: 'k8s-microservices-deployer',
    title: 'Kubernetes Microservices Mesh',
    description: 'Declarative Kubernetes architecture configuring multi-tier Pods, ClusterIP/NodePort Services, ConfigMaps, Secrets, and automated health probes.',
    techStack: ['Kubernetes', 'Docker', 'Node.js', 'Nginx'],
    featured: true,
    category: 'DevOps',
    repoUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com'
  },
  {
    id: 'prometheus-telemetry-hub',
    title: 'Prometheus & Grafana Telemetry Hub',
    description: 'Custom metrics collector instrumented with prom-client to monitor HTTP traffic rates, error histograms, and Node.js event loop lag in Grafana.',
    techStack: ['Prometheus', 'Grafana', 'Node.js', 'Express'],
    featured: false,
    category: 'Monitoring',
    repoUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com'
  },
  {
    id: 'jenkins-cicd-pipeline',
    title: 'Declarative CI/CD Jenkins Engine',
    description: 'Multi-stage automated pipeline orchestrating checkout, dependency verification, linting, production Vite build, and automated test execution.',
    techStack: ['Jenkins', 'Git', 'Bash', 'Jest'],
    featured: false,
    category: 'CI/CD',
    repoUrl: 'https://github.com',
    liveUrl: 'https://demo.example.com'
  }
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Fullstack / DevOps', 'DevOps', 'Monitoring', 'CI/CD'];

  const filteredProjects = activeFilter === 'All'
    ? PLACEHOLDER_PROJECTS
    : PLACEHOLDER_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Portfolio & Case Studies</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Work & Selected Projects</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          A showcase of fullstack web applications, DevOps infrastructure pipelines, and telemetry systems. Real API data integration will be connected in Phase 6.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeFilter === filter
                ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-sm'
                : 'border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Responsive Projects Grid with CSS Hover Interactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 100}>
            <div className="group relative flex h-full flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/70 hover:shadow-2xl">
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                  <span className="uppercase tracking-wider">{project.category}</span>
                  {project.featured && (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors mb-2">
                  <Link to={`/projects/${project.id}`} className="focus:outline-none">
                    {project.title}
                  </Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Footer: Tech Stack & Case Study Link */}
              <div className="space-y-4 pt-4 border-t border-neutral-800/60">
                <div className="flex flex-wrap gap-1.5 text-xs font-mono text-neutral-400">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded bg-neutral-800/70 px-2 py-0.5 text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 font-medium text-neutral-300 group-hover:text-white transition-colors hover:underline"
                  >
                    <span>Read Case Study</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </Link>
                  <div className="flex items-center space-x-3 text-neutral-500">
                    <span className="hover:text-neutral-300 transition-colors cursor-pointer">Live Demo</span>
                    <span>&bull;</span>
                    <span className="hover:text-neutral-300 transition-colors cursor-pointer">GitHub</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Projects;
