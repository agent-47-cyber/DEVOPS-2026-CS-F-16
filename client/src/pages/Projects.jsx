import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProjects } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function Projects() {
  const { data: projects, loading, error, refetch } = useApi(getProjects, []);
  const [selectedTag, setSelectedTag] = useState('All');

  // Derive unique tech tags dynamically from real fetched projects
  const availableTags = useMemo(() => {
    if (!projects || !Array.isArray(projects)) return ['All'];
    const tagSet = new Set();
    projects.forEach((p) => {
      if (Array.isArray(p.techStack)) {
        p.techStack.forEach((tag) => tagSet.add(tag));
      }
    });
    return ['All', ...Array.from(tagSet)];
  }, [projects]);

  // Filter projects by selected tag
  const filteredProjects = useMemo(() => {
    if (!projects || !Array.isArray(projects)) return [];
    if (selectedTag === 'All') return projects;
    return projects.filter(
      (p) => Array.isArray(p.techStack) && p.techStack.includes(selectedTag)
    );
  }, [projects, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Portfolio & Case Studies</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Work & Selected Projects</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Comprehensive catalog of fullstack applications, DevOps pipelines, and telemetry systems loaded directly from the database API.
        </p>
      </div>

      {/* Dynamic Filter Bar from real Tech Stack data */}
      {availableTags.length > 1 && (
        <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-neutral-100 text-neutral-900 font-semibold shadow-sm'
                  : 'border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="animate-pulse rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-6 h-72 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="h-3 w-20 bg-neutral-800 rounded" />
                <div className="h-6 w-3/4 bg-neutral-800 rounded" />
                <div className="h-4 w-full bg-neutral-800/60 rounded" />
                <div className="h-4 w-5/6 bg-neutral-800/60 rounded" />
              </div>
              <div className="h-6 w-2/3 bg-neutral-800 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-8 text-center space-y-3">
          <p className="text-sm text-red-400 font-mono">Failed to fetch projects: {error}</p>
          <button
            onClick={refetch}
            className="rounded-md border border-red-800 bg-red-900/40 px-4 py-1.5 text-xs text-red-200 hover:bg-red-900/60 transition-colors"
          >
            Retry Fetching Projects
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredProjects.length === 0 && (
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/20 p-12 text-center text-sm text-neutral-500">
          No projects found matching the selected filter.
        </div>
      )}

      {/* Real Projects Grid */}
      {!loading && !error && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <Reveal key={project._id || project.id || index} delay={index * 80}>
              <div className="group relative flex h-full flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:bg-neutral-900/70 hover:shadow-2xl">
                <div>
                  {/* Header info */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-3">
                    <span className="uppercase tracking-wider">PROJECT</span>
                    {project.featured && (
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-400">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-neutral-100 transition-colors mb-2">
                    <Link to={`/projects/${project._id || project.id}`} className="focus:outline-none hover:underline">
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
                    {project.techStack?.map((tech) => (
                      <span key={tech} className="rounded bg-neutral-800/70 px-2 py-0.5 text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <Link
                      to={`/projects/${project._id || project.id}`}
                      className="inline-flex items-center gap-1 font-medium text-neutral-300 group-hover:text-white transition-colors hover:underline"
                    >
                      <span>Read Case Study</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                    <div className="flex items-center space-x-3 text-neutral-400">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.liveUrl && project.repoUrl && <span>&bull;</span>}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
