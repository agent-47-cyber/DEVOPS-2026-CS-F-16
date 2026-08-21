import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { getProjects } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

const codeLines = ['docker compose up -d', 'pipeline { stage(\'test\') }', 'kubectl apply -f app.yaml', 'GET /api/projects'];

function WorkPreview({ project, index }) {
  const projectId = project._id || project.id;
  return (
    <Link to={`/projects/${projectId}`} className={`editorial-work block ${index % 2 ? 'md:translate-y-24' : ''}`}>
      <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em] text-black/55">
        <span>Project {String(index + 1).padStart(2, '0')}</span><span>View case study ↗</span>
      </div>
      <div className="work-image relative aspect-[4/3] overflow-hidden">
        {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
        <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/45 via-transparent to-transparent p-6 font-mono text-[10px] uppercase tracking-[.18em] text-white/80">{project.techStack?.slice(0, 2).join(' · ') || 'Engineering project'}</span>
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-[-.06em] text-black md:text-3xl">{project.title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-black/65">{project.description?.length > 130 ? `${project.description.slice(0, 130)}…` : project.description}</p>
    </Link>
  );
}

function Home() {
  const { data: featuredProjects, loading, error } = useApi(() => getProjects({ featured: true }), []);

  return (
    <div>
      <section id="hero-section" className="relative flex min-h-screen items-center justify-center px-5 pt-20 md:px-10">
        <div className="w-full max-w-[1600px]">
          <h1 className="max-w-6xl text-[clamp(3.35rem,9vw,9.5rem)] font-bold leading-[.81] tracking-[-.085em] text-white">
            <span className="block">say hello to your</span>
            <span className="block pl-[.03em]"><span className="editorial-italic gradient-text-reference">creative</span></span>
            <span className="block">developer</span>
          </h1>
        </div>
        <div className="absolute bottom-10 left-5 flex items-center gap-3 md:bottom-12 md:left-10">
          <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/60">Have a look</span>
          <span className="scroll-hint h-9 w-px bg-gradient-to-b from-[#9df4e6] to-transparent" aria-hidden="true" />
        </div>
      </section>

      <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 md:px-10">
        <span className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[.18em] text-[#9df4e6] md:left-10">01 — Origin</span>
        <Reveal className="relative mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-white/45"><span className="rounded-full bg-[#24d6d2] px-2 py-1 text-[#080808]">Yatin</span><span>the first commit</span></div>
          <h2 className="text-[clamp(2.7rem,7vw,7.5rem)] font-bold leading-[.9] tracking-[-.08em] text-white">It began with the thrill of making an idea <span className="editorial-italic text-[#9df4e6]">work.</span></h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-white/55">From algorithms and interface craft to software that feels clear, capable, and worth using.</p>
        </Reveal>
      </section>

      <section className="story-orbit relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-20 md:px-10">
        <span className="absolute right-5 top-24 font-mono text-[10px] uppercase tracking-[.18em] text-[#9df4e6] md:right-10">02 — Systems</span>
        <Reveal className="relative z-10 max-w-6xl text-center">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[.22em] text-white/45">Frontends met backends</p>
          <h2 className="text-[clamp(2.8rem,7.5vw,8rem)] font-bold leading-[.87] tracking-[-.08em] text-white">Then I went deeper into <span className="text-white/45">how software holds together.</span></h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/55">APIs, databases, authentication, and the quiet engineering decisions that make products reliable.</p>
        </Reveal>
      </section>

      <section className="story-grid relative flex min-h-screen items-center overflow-hidden px-5 py-20 md:px-10">
        <span className="absolute left-5 top-24 font-mono text-[10px] uppercase tracking-[.18em] text-[#9df4e6] md:left-10">03 — Build</span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
        <Reveal className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1fr_.75fr]">
          <h2 className="text-[clamp(3rem,7vw,7.3rem)] font-bold leading-[.88] tracking-[-.08em] text-white">I build the entire <span className="editorial-italic text-[#9df4e6]">picture.</span></h2>
          <div className="border-l border-white/25 pl-6 font-mono text-xs leading-8 text-white/55">
            {codeLines.map((line, index) => <p key={line}><span className="mr-4 text-[#24d6d2]">0{index + 1}</span>{line}</p>)}
          </div>
        </Reveal>
      </section>

      <section className="relative flex min-h-screen items-center px-5 py-20 md:px-10">
        <span className="absolute right-5 top-24 font-mono text-[10px] uppercase tracking-[.18em] text-[#9df4e6] md:right-10">04 — Continue</span>
        <Reveal className="mx-auto w-full max-w-6xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[.22em] text-white/45">Infrastructure, automation, deployment</p>
          <h2 className="max-w-5xl text-[clamp(3rem,8vw,8.5rem)] font-bold leading-[.84] tracking-[-.09em] text-white">And I keep making the way from idea to <span className="editorial-italic gradient-text-reference">release</span> simpler.</h2>
        </Reveal>
      </section>

      <section className="light-surface flex min-h-screen items-center px-5 py-20 md:px-10">
        <Reveal className="mx-auto w-full max-w-6xl">
          <p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/45">A project, a problem, a conversation</p>
          <h2 className="mt-5 max-w-5xl text-[clamp(3.2rem,9vw,9.5rem)] font-bold leading-[.82] tracking-[-.09em] text-black">Let&apos;s <span className="editorial-italic text-[#078f98]">create</span> something together.</h2>
          <Link to="/contact" className="mt-12 inline-flex border-b border-black pb-2 text-sm font-semibold text-black transition-colors hover:text-[#078f98] hover:border-[#078f98]">Start a conversation <span className="ml-8">↗</span></Link>
        </Reveal>
      </section>

      <section id="selected-work-section" className="light-surface px-5 pb-28 pt-10 md:px-10">
        <div className="mx-auto max-w-[1400px] border-t border-black/25 pt-8">
          <Reveal className="mb-16 flex items-end justify-between gap-5">
            <div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-black/45">Selected work</p><h2 className="mt-3 text-[clamp(3rem,6vw,6.5rem)] font-bold leading-none tracking-[-.08em] text-black">Built to ship.</h2></div>
            <Link to="/projects" className="mb-2 shrink-0 border-b border-black pb-1 text-xs font-semibold text-black hover:text-[#078f98]">All work ↗</Link>
          </Reveal>
          {loading && <div className="grid gap-10 md:grid-cols-2"><div className="h-96 animate-pulse bg-black/10" /><div className="h-96 animate-pulse bg-black/10" /></div>}
          {error && <p className="py-16 font-mono text-sm text-red-700">Unable to load selected work.</p>}
          {!loading && !error && (!featuredProjects || featuredProjects.length === 0) && <p className="py-16 font-mono text-sm text-black/50">No featured work is available yet.</p>}
          {!loading && !error && featuredProjects?.length > 0 && <div className="grid gap-x-14 gap-y-14 md:grid-cols-2 md:gap-y-28">{featuredProjects.map((project, index) => <Reveal key={project._id || project.id}><WorkPreview project={project} index={index} /></Reveal>)}</div>}
        </div>
      </section>
    </div>
  );
}

export default Home;
