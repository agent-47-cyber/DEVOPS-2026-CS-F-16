import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProjects } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function ProjectEntry({ project, index }) {
  return (
    <div className={`editorial-work block border-t border-black/20 pt-8 ${index % 2 ? 'md:ml-[8%]' : 'md:mr-[8%]'}`}>
      <div className="grid gap-6 md:grid-cols-[.9fr_1.1fr] md:items-end">
        <div className="order-2 md:order-1 md:pb-3 space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/50">
            Project {String(index + 1).padStart(2, '0')} — {project.techStack?.slice(0, 3).join(' · ') || 'Case study'}
          </p>
          <h2 className="text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[0.9] tracking-[-0.06em] text-black">
            {project.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-black/70">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 border-b-2 border-[#078f98] pb-0.5 text-xs font-mono font-bold text-[#078f98] hover:text-black hover:border-black transition-colors"
              >
                <span>Visit Live</span>
                <span>↗</span>
              </a>
            )}
            <Link
              to={`/projects/${project._id || project.id}`}
              className="inline-flex items-center gap-1 border-b border-black pb-0.5 text-xs font-mono font-semibold text-black/80 hover:text-black hover:border-black transition-colors"
            >
              <span>Read Case Study</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="work-image order-1 aspect-[5/4] overflow-hidden rounded-xl bg-gray-100 shadow-md md:order-2">
          <Link to={`/projects/${project._id || project.id}`} className="block h-full w-full group">
            {project.imageUrl ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(event) => { event.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-500 font-mono text-xs p-4 text-center">
                Interactive Preview
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_PROJECTS = [
  {
    _id: 'devscope-ai-01',
    title: 'DevScope AI',
    description: 'An AI-powered developer intelligence platform providing real-time code analysis, intelligent architecture inspection, automated workflow insights, and interactive developer tooling.',
    techStack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'AI Integration', 'Vercel'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://devscopeai-nine.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 1
  },
  {
    _id: 'orbit-portfolio-station-02',
    title: 'My Portfolio Station',
    description: 'An interactive 3D futuristic observation station portfolio floating in deep space. Features immersive spatial audio, interactive controls, and 3D web environments.',
    techStack: ['Three.js', 'WebGL', 'React', 'Cloudflare Workers', 'Tailwind CSS'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://yatin-portfolio.khandelwalyatin2.workers.dev/',
    imageUrl: '/orbit-station.jpg',
    featured: true,
    order: 2
  },
  {
    _id: 'cicd-infra-03',
    title: 'Automated CI/CD & Cloud Infrastructure',
    description: 'Production-grade declarative automation pipeline orchestrating GitHub webhook triggers, automated multi-stage Docker image builds, code quality & security testing gates, and seamless multi-container cluster deployments.',
    techStack: ['Jenkins', 'Docker', 'Kubernetes', 'GitHub Actions', 'Linux / Bash', 'Nginx'],
    repoUrl: 'https://github.com/agent-47-cyber/collge_portfolio',
    liveUrl: 'https://github.com/agent-47-cyber/collge_portfolio',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=80',
    featured: true,
    order: 3
  },
  {
    _id: 'observability-04',
    title: 'Distributed Observability & Telemetry Hub',
    description: 'Real-time application performance monitoring infrastructure instrumented with Prometheus client metrics, Grafana visualization dashboards, request rate histograms, latency tracking, and threshold alerts.',
    techStack: ['Prometheus', 'Grafana', 'Node.js', 'Express', 'Docker'],
    repoUrl: 'https://github.com/agent-47-cyber',
    liveUrl: 'https://github.com/agent-47-cyber',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    featured: false,
    order: 4
  }
];

function Projects() {
  const { data: remoteProjects, loading, error, refetch } = useApi(getProjects, []);
  const projects = (remoteProjects && remoteProjects.length > 0) ? remoteProjects : DEFAULT_PROJECTS;
  const [selectedTag, setSelectedTag] = useState('All');
  const tags = useMemo(() => ['All', ...new Set((projects || []).flatMap((project) => project.techStack || []))], [projects]);
  const visibleProjects = useMemo(() => selectedTag === 'All' ? projects || [] : (projects || []).filter((project) => project.techStack?.includes(selectedTag)), [projects, selectedTag]);

  return (
    <div className="light-surface min-h-screen pt-32">
      <section className="px-5 pb-16 md:px-10"><div className="mx-auto max-w-[1400px]">
        <Reveal><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/45">Yatin Khandelwal — selected work</p><h1 className="mt-5 max-w-5xl text-[clamp(3.8rem,11vw,10rem)] font-bold leading-[.78] tracking-[-.1em]">Work that connects idea to <span className="editorial-italic text-[#078f98]">release.</span></h1></Reveal>
        {tags.length > 1 && <Reveal className="mt-12 border-y border-black/20 py-4"><div className="flex flex-wrap gap-x-5 gap-y-2">{tags.map((tag) => <button key={tag} type="button" onClick={() => setSelectedTag(tag)} className={`text-xs ${selectedTag === tag ? 'font-bold text-black underline' : 'text-black/50 hover:text-black'}`}>{tag}</button>)}</div></Reveal>}
      </div></section>
      <section className="px-5 pb-28 md:px-10"><div className="mx-auto max-w-[1400px] space-y-14 md:space-y-24">
        {loading && !projects.length && [1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse border-t border-black/20 bg-black/5" />)}
        {visibleProjects.length === 0 && <p className="py-20 font-mono text-sm text-black/55">No projects match this selection.</p>}
        {visibleProjects.map((project, index) => <Reveal key={project._id || project.id}><ProjectEntry project={project} index={index} /></Reveal>)}
      </div></section>
    </div>
  );
}

export default Projects;
