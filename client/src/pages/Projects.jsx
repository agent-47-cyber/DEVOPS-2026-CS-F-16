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
        <div className="work-image order-1 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-md md:order-2">
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

function Projects() {
  const { data: projects, loading, error, refetch } = useApi(getProjects, []);
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
        {loading && [1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse border-t border-black/20 bg-black/5" />)}
        {error && <div className="py-20"><p className="font-mono text-sm text-red-700">Unable to load work: {error}</p><button type="button" className="mt-5 border-b border-black pb-1 text-sm" onClick={refetch}>Try again</button></div>}
        {!loading && !error && visibleProjects.length === 0 && <p className="py-20 font-mono text-sm text-black/55">No projects match this selection.</p>}
        {!loading && !error && visibleProjects.map((project, index) => <Reveal key={project._id || project.id}><ProjectEntry project={project} index={index} /></Reveal>)}
      </div></section>
    </div>
  );
}

export default Projects;
