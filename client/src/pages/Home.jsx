import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

function Home() {
  return (
    <div className="space-y-24 py-4">
      {/* 1. Hero Section (Staggered Load Animation via CSS keyframes) */}
      <section className="space-y-8 pt-4 pb-8">
        {/* Availability Badge */}
        <div className="animate-hero-1 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1.5 text-xs text-neutral-300 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot" />
          <span>Available for Fullstack & DevOps Roles</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="animate-hero-2 text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Building robust web applications and automated delivery pipelines.
          </h1>
          <p className="animate-hero-3 max-w-2xl text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed">
            I am a fullstack developer and DevOps engineer focused on architecting reliable React & Node.js systems, streamlined CI/CD workflows, and containerized deployments.
          </p>
        </div>

        {/* Hero CTA Actions */}
        <div className="animate-hero-4 flex flex-wrap items-center gap-4 pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition-all duration-200 hover:bg-neutral-200 hover:shadow"
          >
            Explore Projects &rarr;
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/60 px-5 py-3 text-sm font-medium text-neutral-200 backdrop-blur transition-all duration-200 hover:border-neutral-700 hover:bg-neutral-800 hover:text-white"
          >
            Get in Touch
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
          >
            View Resume
          </Link>
        </div>

        {/* Quick Core Tech Strip */}
        <div className="animate-hero-5 pt-8 border-t border-neutral-900">
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">Core Technologies</p>
          <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
            {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Docker', 'Kubernetes', 'Jenkins', 'Prometheus'].map((tech) => (
              <span key={tech} className="rounded-md border border-neutral-800/80 bg-neutral-900/50 px-2.5 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Story / About Section (Scroll-Driven Reveal via IntersectionObserver) */}
      <section className="space-y-12">
        <Reveal>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Philosophy & Approach</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Bridging the gap between software development and production operations.
            </h2>
            <p className="text-neutral-400 leading-relaxed max-w-3xl">
              Software is only as good as its delivery and observability. My work focuses on creating responsive frontend interfaces paired with well-tested backend services and resilient automated pipelines.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={100}>
            <div className="h-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-sm font-mono text-white">
                01
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Modern Frontend</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Responsive, accessible interfaces built with React, modular functional architecture, and clean design systems.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-sm font-mono text-white">
                02
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scalable Backend</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                RESTful APIs and microservices structured with Express and MongoDB, featuring strict validation and JWT security.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="h-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-700 bg-neutral-800 text-sm font-mono text-white">
                03
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">DevOps Automation</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Automated CI in Jenkins, containerization with Docker, orchestration via Kubernetes, and metrics via Prometheus.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Featured Work Preview Section (Scroll-Driven Reveal) */}
      <section className="space-y-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Selected Work</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Featured Case Studies</h2>
            </div>
            <Link
              to="/projects"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              View all projects &rarr;
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Reveal delay={150}>
            <Link
              to="/projects/portfolio-capstone"
              className="group block rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                <span>FULLSTACK & DEVOPS</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 mb-2">
                Fullstack Capstone & DevOps Platform
              </h3>
              <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                Production-grade portfolio system with automated CI/CD pipeline, Docker containerization, and Kubernetes cluster orchestration.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                {['React', 'Node.js', 'Docker', 'Kubernetes'].map((t) => (
                  <span key={t} className="rounded bg-neutral-800/80 px-2 py-0.5">{t}</span>
                ))}
              </div>
            </Link>
          </Reveal>

          <Reveal delay={250}>
            <Link
              to="/projects/cloud-monitoring-service"
              className="group block rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-4">
                <span>OBSERVABILITY</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 mb-2">
                Prometheus & Grafana Telemetry Hub
              </h3>
              <p className="text-sm text-neutral-400 mb-4 leading-relaxed">
                Real-time application telemetry dashboard tracking request rates, error thresholds, and Node process resource utilization.
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                {['Prometheus', 'Grafana', 'Express', 'Alertmanager'].map((t) => (
                  <span key={t} className="rounded bg-neutral-800/80 px-2 py-0.5">{t}</span>
                ))}
              </div>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

export default Home;
