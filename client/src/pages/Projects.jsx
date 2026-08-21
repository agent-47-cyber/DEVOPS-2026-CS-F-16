import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProjects } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function ProjectEntry({ project, index }) {
  return (
    <Link to={`/projects/${project._id || project.id}`} className={`editorial-work block border-t border-black/20 pt-4 ${index % 2 ? 'md:ml-[12%]' : 'md:mr-[12%]'}`}>
      <div className="grid gap-5 md:grid-cols-[.9fr_1.1fr] md:items-end">
        <div className="order-2 md:order-1 md:pb-3">
          <p className="font-mono text-[10px] uppercase tracking-[.2em] text-black/45">Project {String(index + 1).padStart(2, '0')} — {project.techStack?.slice(0, 2).join(' / ') || 'Case study'}</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[.9] tracking-[-.07em]">{project.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-black/65">{project.description}</p>
          <span className="mt-5 inline-block border-b border-black pb-1 text-xs font-semibold">Read project ↗</span>
        </div>
        <div className="work-image order-1 aspect-[4/3] overflow-hidden md:order-2">
          {project.imageUrl && <img src={project.imageUrl} alt={project.title} loading="lazy" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
        </div>
      </div>
    </Link>
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
