import { Link, useParams } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProject } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

function ProjectDetail() {
  const { id } = useParams();
  const { data: project, loading, error } = useApi(() => getProject(id), [id]);

  if (loading) return <div className="flex min-h-screen items-center justify-center"><div className="h-2 w-48 animate-pulse bg-white/30" /></div>;
  if (error) return <div className="flex min-h-screen items-center justify-center px-5 text-center"><div><p className="font-mono text-sm text-red-300">Unable to load this project.</p><Link to="/projects" className="mt-5 inline-block border-b border-white pb-1 text-sm">Back to work</Link></div></div>;
  if (!project) return null;

  return (
    <div className="min-h-screen pt-28">
      <section className="px-5 pb-20 md:px-10"><div className="mx-auto max-w-[1400px]">
        <Reveal><Link to="/projects" className="font-mono text-[10px] uppercase tracking-[.2em] text-white/55 hover:text-[#9df4e6]">← Back to work</Link></Reveal>
        <Reveal className="mt-16"><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">{project.featured ? 'Selected project' : 'Project'} — Case study</p><h1 className="mt-5 max-w-6xl text-[clamp(3.4rem,10vw,9rem)] font-bold leading-[.8] tracking-[-.1em]">{project.title}</h1></Reveal>
        <Reveal className="mt-12 grid gap-10 border-t border-white/20 pt-5 md:grid-cols-[1.2fr_.8fr]"><p className="max-w-2xl text-lg leading-relaxed text-white/70">{project.description}</p><div className="font-mono text-[11px] uppercase tracking-[.16em] text-white/50"><p>Stack</p><p className="mt-3 leading-6 text-[#9df4e6]">{project.techStack?.join(' · ') || 'Not specified'}</p></div></Reveal>
      </div></section>
      <Reveal className="px-5 pb-20 md:px-10"><div className="work-image mx-auto aspect-[16/8] max-w-[1400px] overflow-hidden">{project.imageUrl && <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}</div></Reveal>
      <section className="light-surface px-5 py-20 md:px-10"><div className="mx-auto flex max-w-[1400px] flex-wrap gap-5"><p className="mr-auto max-w-md text-sm leading-relaxed text-black/65">A focused build connecting product thinking, dependable systems, and deliberate delivery.</p>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="border-b border-black pb-1 text-sm font-semibold hover:text-[#078f98]">Visit live ↗</a>}{project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="border-b border-black pb-1 text-sm font-semibold hover:text-[#078f98]">View source ↗</a>}</div></section>
    </div>
  );
}

export default ProjectDetail;
