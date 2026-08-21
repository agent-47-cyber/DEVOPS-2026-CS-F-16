import { useParams, Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProject } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error, refetch } = useApi(
    () => getProject(id),
    [id]
  );

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-4 w-32 bg-neutral-800 rounded" />
        <div className="h-10 w-3/4 bg-neutral-800 rounded" />
        <div className="h-24 w-full bg-neutral-800/60 rounded" />
        <div className="grid grid-cols-4 gap-4 h-16 bg-neutral-900 rounded" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="space-y-6 text-center py-16">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-12 max-w-lg mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400">Error 404</span>
          <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
          <p className="text-sm text-neutral-400">
            {error || `Unable to locate project with ID: ${id}`}
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={refetch}
              className="rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
            >
              Retry
            </button>
            <Link
              to="/projects"
              className="rounded-lg bg-neutral-100 px-4 py-2 text-xs font-semibold text-neutral-900 hover:bg-neutral-300 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          {project.featured && (
            <>
              <span>&bull;</span>
              <span className="text-amber-400 font-medium">FEATURED</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          {project.title}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed">
          {project.description}
        </p>

        {/* Metadata summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-neutral-900 text-xs">
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Role</span>
            <span className="font-medium text-neutral-200 mt-1 block">Fullstack & DevOps</span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Created</span>
            <span className="font-medium text-neutral-200 mt-1 block">
              {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : '2026'}
            </span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Tech Stack</span>
            <span className="font-medium text-neutral-200 mt-1 block">
              {project.techStack?.length || 0} Technologies
            </span>
          </div>
          <div>
            <span className="font-mono text-neutral-500 block uppercase">Links</span>
            <div className="flex gap-2 mt-1">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:underline hover:text-white"
                >
                  Live Demo
                </a>
              ) : (
                <span className="text-neutral-600">No Demo</span>
              )}
              {project.liveUrl && project.repoUrl && <span className="text-neutral-600">|</span>}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:underline hover:text-white"
                >
                  Source
                </a>
              ) : (
                <span className="text-neutral-600">No Source</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Case study story sections with Reveal animations */}
      <div className="space-y-10">
        <Reveal>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">01. Overview & Architecture</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">02. Technologies & Tools Employed</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Implemented with the following technology components from the capstone specification:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack?.map((tech) => (
                <div
                  key={tech}
                  className="rounded-lg border border-neutral-800 bg-neutral-950/80 px-3.5 py-2 text-xs font-mono text-neutral-200"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-8 space-y-4">
            <h2 className="text-xl font-bold text-white">03. Project Actions & Verification</h2>
            <div className="flex flex-wrap gap-4 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-neutral-200 transition-colors"
                >
                  <span>Launch Live System</span>
                  <span>&rarr;</span>
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-xs font-medium text-neutral-200 hover:bg-neutral-700 hover:text-white transition-colors"
                >
                  <span>View Repository on GitHub</span>
                  <span>&rarr;</span>
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default ProjectDetail;
