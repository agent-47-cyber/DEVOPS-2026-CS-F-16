import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { useSvgDraw } from '../hooks/useSvgDraw.js';
import { getProjects } from '../api/index.js';
import { useApi } from '../hooks/useApi.js';

const DEFAULT_FEATURED_PROJECTS = [
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
  }
];

function Home() {
  const { data: remoteProjects, loading, error } = useApi(
    () => getProjects({ featured: true }),
    []
  );

  const featuredProjects = (remoteProjects && remoteProjects.length > 0)
    ? remoteProjects
    : DEFAULT_FEATURED_PROJECTS;

  const [activeStack, setActiveStack] = useState('frontend');

  const stackDetails = {
    frontend: {
      title: 'Interactive Frontend Engineering',
      techs: ['React 19', 'Vite', 'Tailwind CSS v4', 'Redux Toolkit', 'Responsive Systems'],
      code: '// UI State & Animation Pipeline\nconst [view, setView] = useState("creative");\nuseEffect(() => renderScene(view), [view]);',
    },
    backend: {
      title: 'Distributed Backend & APIs',
      techs: ['Node.js', 'Express', 'MongoDB Atlas', 'Mongoose ODM', 'JWT Auth Security'],
      code: '// Scalable RESTful API Route\nrouter.get("/api/projects", authGuard, async (req, res) => {\n  const docs = await Project.find({ featured: true });\n  res.json(docs);\n});',
    },
    devops: {
      title: 'Cloud Infrastructure & CI/CD',
      techs: ['Docker Compose', 'Kubernetes Mesh', 'Jenkins Automated CI', 'Prometheus', 'Nginx Gateway'],
      code: '# Multi-Stage Production Container\nFROM node:20-alpine AS builder\nWORKDIR /app\nRUN npm ci && npm run build',
    },
  };

  return (
    <div className="relative">
      {/* =========================================================================
          CHAPTER 0 — HERO
          Reference: Fullscreen, minimal, creative display type, scroll hint at bottom-[25%]
          ========================================================================= */}
      <section
        id="hero-section"
        className="relative flex min-h-screen w-full flex-col items-center justify-center text-center px-6"
      >
        <Reveal>
          <h1 className="flex w-full flex-col items-center gap-2 text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08]">
            <span className="hero-line hero-line-1 inline-block whitespace-nowrap">say hello to your</span>
            <div className="hero-line hero-line-2 flex flex-wrap justify-center items-center gap-x-4 gap-y-1">
              <span
                className="gradient-text-reference font-creative text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal"
                style={{ paddingRight: '0.15em' }}
              >
                creative
              </span>
              <span className="inline-block whitespace-nowrap">developer</span>
            </div>
          </h1>
        </Reveal>

        {/* Scroll indicator positioned at bottom-[25%] */}
        <div className="hero-line hero-line-3 absolute bottom-[25%] flex flex-col items-center gap-3">
          <span className="scroll-text text-[10px] uppercase font-mono tracking-[0.25em] text-white/70">
            Have a look
          </span>
          <div className="scroll-hint flex flex-col items-center">
            <svg width="18" height="28" viewBox="0 0 18 28" fill="none" aria-hidden="true">
              <rect x="1.5" y="1.5" width="15" height="25" rx="7.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="7.5" y="5" width="3" height="6" rx="1.5" fill="rgba(15,214,217,1)" />
            </svg>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 1 — ORIGIN STORY (The Software Logic Chapter)
          Reference: Grid of 8 cyan & white sketch geometric figures + floating speech card
          ========================================================================= */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 overflow-hidden">
        {/* Floating Developer Comment Badge with Cursor + Morphing Bubble */}
        <div className="absolute z-20 pointer-events-none top-[18%] sm:top-[22%] left-[8%] sm:left-[18%] md:left-[26%] max-w-[85vw] sm:max-w-md">
          <ChatBubbleMorph />
        </div>

        {/* 8 Geometric Architectural Vector Sketches in 4x2 Grid */}
        <SvgSketchGrid />

      </section>

      {/* =========================================================================
          CHAPTER 2 — EVOLUTION (UI/UX & Distributed Backends)
          Reference: 8 red guide columns + wireframe modal/controls + headline in bounding box
          ========================================================================= */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 py-24">
        {/* 8 Dark Red Vertical Column Guides in background */}
        <div className="pointer-events-none absolute inset-0 grid grid-cols-8 gap-4 px-6 md:px-16 opacity-70" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-full w-full bg-red-950/20 border-x border-red-900/10" />
          ))}
        </div>

        {/* Floating Wireframe Peripherals */}
        {/* Top-Left: Wireframe Modal Window with diagonal cross */}
        <div className="pointer-events-none absolute top-[8%] left-[4%] w-24 sm:w-36 md:w-44 opacity-40" aria-hidden="true">
          <svg viewBox="0 0 185 185" fill="none" className="w-full h-full">
            <rect x="2" y="2" width="181" height="181" rx="8" stroke="#8D8D8D" strokeWidth="3" />
            <line x1="2" y1="2" x2="183" y2="183" stroke="#8D8D8D" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="183" y1="2" x2="2" y2="183" stroke="#8D8D8D" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Top-Center: Wireframe Search / Header Pill */}
        <div className="pointer-events-none absolute top-[10%] left-[32%] w-36 sm:w-56 md:w-72 opacity-35" aria-hidden="true">
          <svg viewBox="0 0 528 94" fill="none" className="w-full h-full">
            <rect x="2" y="2" width="524" height="90" rx="45" stroke="#8D8D8D" strokeWidth="3" />
          </svg>
        </div>

        {/* Bottom-Right: Wireframe Controls (Radio Buttons & Checkboxes) */}
        <div className="pointer-events-none absolute bottom-[14%] right-[6%] w-28 sm:w-40 opacity-40" aria-hidden="true">
          <svg viewBox="0 0 178 166" fill="none" className="w-full h-full">
            {/* Checkbox 1 (checked) */}
            <rect x="8" y="103" width="50" height="50" rx="6" stroke="#8D8D8D" strokeWidth="4" />
            <path d="M20 128 L32 140 L50 115" stroke="#0fd6d9" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Checkbox 2 */}
            <rect x="114" y="103" width="50" height="50" rx="6" stroke="#8D8D8D" strokeWidth="4" />
            {/* Radio 1 (selected) */}
            <circle cx="36" cy="30" r="25" stroke="#8D8D8D" strokeWidth="4" />
            <circle cx="36" cy="30" r="12" fill="#0fd6d9" />
            {/* Radio 2 */}
            <circle cx="141" cy="30" r="25" stroke="#8D8D8D" strokeWidth="4" />
          </svg>
        </div>

        {/* Bottom-Left: Wireframe Action Button Pill */}
        <div className="pointer-events-none absolute bottom-[12%] left-[10%] w-32 sm:w-48 opacity-35" aria-hidden="true">
          <svg viewBox="0 0 387 93" fill="none" className="w-full h-full">
            <rect x="2" y="2" width="383" height="89" rx="44" stroke="#8D8D8D" strokeWidth="3" />
          </svg>
        </div>

        {/* Central Statement in Interactive Resizable Bounding Box */}
        <Reveal className="relative z-10 max-w-4xl text-center">
          <div className="wireframe-box inline-block bg-[#080808]/90 backdrop-blur-sm rounded-lg shadow-2xl">
            {/* 8 Bounding Box Handles */}
            <span className="wireframe-handle tl" aria-hidden="true" />
            <span className="wireframe-handle tr" aria-hidden="true" />
            <span className="wireframe-handle bl" aria-hidden="true" />
            <span className="wireframe-handle br" aria-hidden="true" />
            <span className="wireframe-handle tc" aria-hidden="true" />
            <span className="wireframe-handle bc" aria-hidden="true" />
            <span className="wireframe-handle ml" aria-hidden="true" />
            <span className="wireframe-handle mr" aria-hidden="true" />

            <h2 className="flex flex-col gap-2 text-3xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              <span className="stagger-item overflow-hidden"><span className="block text-reveal-line">Then I discovered</span></span>
              <span className="stagger-item overflow-hidden" style={{ transitionDelay: '100ms' }}><span className="block text-reveal-line text-white">fullstack engineering</span></span>
              <span className="stagger-item overflow-hidden" style={{ transitionDelay: '200ms' }}><span className="block text-reveal-line text-white/50 font-normal">— and loved it.</span></span>
            </h2>
          </div>
        </Reveal>
      </section>

      {/* =========================================================================
          CHAPTER 3 — BUILDING (Interactive Stack Switcher)
          Reference: Glowing top pill selector + large centered headline + active architecture
          ========================================================================= */}
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 bg-black">
        <div className="flex w-full max-w-4xl flex-col items-center gap-10 sm:gap-14 text-center">
          {/* Top Interactive Mode Switcher with Glowing Halo */}
          <Reveal>
            <div className="relative">
              {/* Subtle Cyan Glow behind the switcher */}
              <div className="absolute -inset-1 rounded-2xl bg-[#0fd6d9]/20 blur-xl opacity-75" />

              <div className="relative flex rounded-2xl p-1.5 border border-white/10 bg-[#1c1c22] shadow-2xl">
                {[
                  { id: 'frontend', label: 'Frontend', icon: '< / >' },
                  { id: 'backend', label: 'Backend', icon: '{ ; }' },
                  { id: 'devops', label: 'DevOps', icon: '☁ ⚙' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveStack(tab.id)}
                    className={`flex items-center gap-2 px-5 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 ${
                      activeStack === tab.id
                        ? 'bg-[#080808] text-white border border-white/20 shadow-lg font-bold scale-[1.03]'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className={activeStack === tab.id ? 'text-[#0fd6d9]' : 'text-white/40'}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Central Headline */}
          <Reveal>
            <h2 className="flex flex-col gap-1 text-center text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              <span className="stagger-item overflow-hidden"><span className="block text-reveal-line">I started building</span></span>
              <span className="stagger-item overflow-hidden" style={{ transitionDelay: '120ms' }}><span className="block text-reveal-line text-white">what I architect</span></span>
            </h2>
          </Reveal>

          {/* Interactive Live Stack Detail Panel */}
          <Reveal className="w-full max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-[#111116]/90 p-6 text-left shadow-2xl transition-all duration-300 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs text-[#0fd6d9] font-semibold uppercase tracking-wider">
                  {stackDetails[activeStack].title}
                </span>
                <span className="font-mono text-[11px] text-white/40">Active Pipeline</span>
              </div>

              {/* Tech stack badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {stackDetails[activeStack].techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-xs font-mono text-white/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mini syntax code block */}
              <div className="rounded-xl bg-[#080808] p-4 border border-white/5 font-mono text-xs text-white/80 overflow-x-auto">
                <pre className="text-[#0fd6d9]/90 leading-relaxed">
                  {stackDetails[activeStack].code}
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 4 — CODE VISUAL STORYTELLING (The Conviction Chapter)
          Reference: 52px grid background + authentic code snippets floating + "and I stuck with it."
          ========================================================================= */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-code-grid px-6 py-24">
        {/* Floating Code Snippets around the periphery */}
        {/* Top-Left Snippet */}
        <div
          className="absolute select-none block opacity-70 hover:opacity-100 transition-opacity font-mono text-xs pointer-events-none"
          style={{ top: '8%', left: '4%', maxWidth: '44vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#50fa7b]">useEffect</span>
              <span className="text-white/80">{'(() => {'}</span>
              <div className="pl-4">
                <span className="text-[#ff79c6]">const </span>
                <span className="text-white/90">el = document.</span>
                <span className="text-[#8be9fd]">querySelector</span>
                <span className="text-[#f1fa8c]">{"('.container')"}</span>
              </div>
              <span className="text-white/80">{'}, [])'}</span>
            </div>
          </Reveal>
        </div>

        {/* Upper Mid-Left Snippet */}
        <div
          className="absolute select-none hidden sm:block opacity-60 font-mono text-xs pointer-events-none"
          style={{ top: '24%', left: '3%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#ff79c6]">import </span>
              <span className="text-white/90">{'{ '}</span>
              <span className="text-[#50fa7b]">useState, useEffect</span>
              <span className="text-white/90">{' }'}</span>
              <span className="text-[#ff79c6]"> from </span>
              <span className="text-[#f1fa8c]">{"'react'"}</span>
            </div>
          </Reveal>
        </div>

        {/* Mid-Left Snippet */}
        <div
          className="absolute select-none block opacity-60 font-mono text-xs pointer-events-none"
          style={{ top: '44%', left: '2%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#f1fa8c]">{'"use client";'}</span>
              <div className="text-white/70">
                <span className="text-[#ff79c6]">const </span>
                <span className="text-white">[open, setOpen] = </span>
                <span className="text-[#50fa7b]">useState</span>
                <span className="text-[#bd93f9]">(false)</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Lower Mid-Left Snippet */}
        <div
          className="absolute select-none hidden sm:block opacity-65 font-mono text-xs pointer-events-none"
          style={{ bottom: '22%', left: '4%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#ff79c6]">app</span>
              <span className="text-white/90">.get(</span>
              <span className="text-[#f1fa8c]">{'"/api/projects"'}</span>
              <span className="text-white/90">, getProjectsHandler)</span>
            </div>
          </Reveal>
        </div>

        {/* Bottom-Left Snippet */}
        <div
          className="absolute select-none hidden md:block opacity-55 font-mono text-xs pointer-events-none"
          style={{ bottom: '8%', left: '6%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#8be9fd]">transition: </span>
              <span className="text-[#f8f8f2]">all </span>
              <span className="text-[#bd93f9]">0.3s </span>
              <span className="text-[#50fa7b]">ease;</span>
            </div>
          </Reveal>
        </div>

        {/* Top-Right Snippet */}
        <div
          className="absolute select-none hidden md:block opacity-70 font-mono text-xs pointer-events-none"
          style={{ top: '7%', right: '6%', maxWidth: '42vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed text-right">
              <span className="text-[#50fa7b]">docker</span>
              <span className="text-white/90"> compose up --build -d</span>
            </div>
          </Reveal>
        </div>

        {/* Upper Mid-Right Snippet */}
        <div
          className="absolute select-none hidden sm:block opacity-60 font-mono text-xs pointer-events-none"
          style={{ top: '23%', right: '4%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#ff79c6]">export default function </span>
              <span className="text-[#50fa7b]">App</span>
              <span className="text-white">()</span>
            </div>
          </Reveal>
        </div>

        {/* Mid-Right Snippet */}
        <div
          className="absolute select-none hidden sm:block opacity-65 font-mono text-xs pointer-events-none"
          style={{ top: '42%', right: '4%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#ff79c6]">type </span>
              <span className="text-[#50fa7b]">Theme</span>
              <span className="text-white"> = </span>
              <span className="text-[#f1fa8c]">{"'dark'"}</span>
              <span className="text-white/60"> | </span>
              <span className="text-[#f1fa8c]">{"'light'"}</span>
            </div>
          </Reveal>
        </div>

        {/* Lower Mid-Right Snippet */}
        <div
          className="absolute select-none hidden md:block opacity-65 font-mono text-xs pointer-events-none"
          style={{ bottom: '22%', right: '5%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#8be9fd]">kubectl </span>
              <span className="text-white">apply -f deployment.yaml</span>
            </div>
          </Reveal>
        </div>

        {/* Bottom-Right Snippet */}
        <div
          className="absolute select-none block opacity-60 font-mono text-xs pointer-events-none"
          style={{ bottom: '8%', right: '4%', maxWidth: '40vw' }}
          aria-hidden="true"
        >
          <Reveal>
            <div className="leading-relaxed">
              <span className="text-[#8be9fd]">ref</span>
              <span className="text-white">={'{{{ containerRef }}}'}</span>
            </div>
          </Reveal>
        </div>

        {/* Central Dominant Statement */}
        <Reveal className="relative z-10 text-center px-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
            and I stuck with it.
          </h2>
        </Reveal>
      </section>

      {/* =========================================================================
          CHAPTER 5 — CTA (DRAMATIC WHITE BACKGROUND INVERSION)
          Reference: Fullscreen white background + large display type + dashed border button
          ========================================================================= */}
      <section className="section-light relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-24 text-center">
        <Reveal className="max-w-4xl space-y-10">
          <h2
            className="font-bold leading-[1.08] text-black tracking-tight"
            style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5.5rem)', maxWidth: '18ch', margin: '0 auto' }}
          >
            <span className="inline-block mr-3">Let&apos;s</span>
            <span
              className="gradient-text-reference font-creative inline-block mr-3 font-normal"
              style={{ paddingRight: '0.12em' }}
            >
              create
            </span>
            <span className="inline-block mr-3">something</span>
            <span className="inline-block">together.</span>
          </h2>

          {/* Dashed Border Button Container */}
          <div className="relative inline-block mt-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-xl border border-dashed border-gray-400"
            />
            <Link
              to="/contact"
              className="relative inline-flex items-center justify-center rounded-lg border border-[#0fd6d9] bg-[#edfefd] px-8 py-3.5 text-sm font-bold text-black shadow-md hover:bg-[#0fd6d9] hover:text-black transition-all duration-200"
            >
              Start a conversation
            </Link>
          </div>
        </Reveal>
      </section>

      {/* =========================================================================
          CHAPTER 6 — SELECTED WORK PREVIEW (Editorial Light Background)
          Reference: Light background, two-column offset desktop layout, corner handles,
          and playful collaborative cursor tags (Milena, You, Joschi, Anonym, Lilia)
          ========================================================================= */}
      <section
        id="selected-work-section"
        className="section-light relative min-h-screen w-full px-6 md:px-16 pb-32 pt-16 border-t border-gray-200 overflow-hidden"
      >
        {/* Section Heading with playful collaborator badge */}
        <div className="relative flex flex-col items-center justify-center pt-20 pb-16 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight">
              Selected Work
            </h2>
          </Reveal>


        </div>

        {/* Loading skeleton */}
        {loading && !featuredProjects?.length && (
          <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {[1, 2].map((n) => (
              <div key={n} className="animate-pulse bg-white rounded-xl p-6 h-72 shadow-sm">
                <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                <div className="h-44 w-full bg-gray-100 rounded-lg mb-4" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Editorial Project Cards — Responsive Asymmetric Layout */}
        {featuredProjects && featuredProjects.length > 0 && (
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 max-w-4xl mx-auto">


            {featuredProjects.map((project, idx) => (
              <div
                key={project._id || project.id || idx}
                className={idx % 2 === 1 ? 'md:mt-20 w-full' : 'w-full'}
              >
                <Reveal delay={idx * 120}>
                  <ProjectCard project={project} index={idx} isSelected={idx === 0} />
                </Reveal>
              </div>
            ))}
          </div>
        )}


      </section>
    </div>
  );
}

/**
 * Editorial project card matching reference design with corner handles and live external links.
 */
function ProjectCard({ project, index, isSelected }) {
  return (
    <div className="flex w-full flex-col gap-1.5 group">
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-medium tracking-wide transition-colors duration-150 ${isSelected ? 'text-[#00a3ff]' : 'text-gray-400'}`}>
          Project {index + 1}
        </span>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono font-semibold text-[#00a3ff] hover:underline flex items-center gap-1"
          >
            <span>Visit Live</span>
            <span>↗</span>
          </a>
        )}
      </div>

      <div className={`project-card-light ${isSelected ? 'project-card-selected' : ''}`}>
        {/* Corner selection handles for Project 1 */}
        {isSelected && (
          <>
            <span className="corner-handle tl" aria-hidden="true" />
            <span className="corner-handle tr" aria-hidden="true" />
            <span className="corner-handle bl" aria-hidden="true" />
            <span className="corner-handle br" aria-hidden="true" />
          </>
        )}

        {/* Image preview with graceful fallback */}
        <div className="relative mb-4 aspect-square md:aspect-[5/4] w-full overflow-hidden bg-[#2a2a30] rounded-lg">
          {project.imageUrl ? (
            <img
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={project.imageUrl}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div
            className="absolute inset-0 flex items-center justify-center text-white/60 font-mono text-xs p-4 text-center"
            style={project.imageUrl ? { display: 'none' } : {}}
          >
            <span>Interactive Architecture Preview</span>
          </div>
        </div>

        {/* Project details */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[16px] font-semibold leading-snug text-black group-hover:text-[#00a3ff] transition-colors">
              {project.title}
            </h3>
            <span className="shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" aria-hidden="true">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2.75 1C2.286 1 1.841 1.184 1.513 1.513 1.184 1.841 1 2.286 1 2.75V10.25C1 10.714 1.184 11.159 1.513 11.487 1.841 11.816 2.286 12 2.75 12H10.25C10.714 12 11.159 11.816 11.487 11.487 11.816 11.159 12 10.714 12 10.25V8C12 7.867 12.053 7.74 12.146 7.646 12.24 7.553 12.367 7.5 12.5 7.5 12.633 7.5 12.76 7.553 12.854 7.646 12.947 7.74 13 7.867 13 8V10.25C13 10.979 12.71 11.679 12.195 12.195 11.679 12.71 10.979 13 10.25 13H2.75C2.021 13 1.321 12.71 0.805 12.195 0.29 11.679 0 10.979 0 10.25V2.75C0 2.021 0.29 1.321 0.805 0.805 1.321 0.29 2.021 0 2.75 0H5C5.133 0 5.26 0.053 5.354 0.146 5.447 0.24 5.5 0.367 5.5 0.5 5.5 0.633 5.447 0.76 5.354 0.854 5.26 0.947 5.133 1 5 1H2.75ZM7.5 0.5C7.5 0.367 7.553 0.24 7.646 0.146 7.74 0.053 7.867 0 8 0H12.5C12.633 0 12.76 0.053 12.854 0.146 12.947 0.24 13 0.367 13 0.5V5C13 5.133 12.947 5.26 12.854 5.354 12.76 5.447 12.633 5.5 12.5 5.5 12.367 5.5 12.24 5.447 12.146 5.354 12.053 5.26 12 5.133 12 5V1.707L8.354 5.354C8.259 5.445 8.133 5.495 8.002 5.494 7.871 5.493 7.745 5.44 7.653 5.347 7.56 5.255 7.507 5.129 7.506 4.998 7.505 4.867 7.555 4.741 7.647 4.647L11.293 1H8C7.867 1 7.74 0.947 7.646 0.854 7.553 0.76 7.5 0.633 7.5 0.5Z" fill="black" />
              </svg>
            </span>
          </div>

          <p className="text-[13px] leading-snug text-[#555]">
            {project.description?.length > 90
              ? project.description.substring(0, 90) + '...'
              : project.description}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap gap-1.5">
              {project.techStack?.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm border border-[#ddd] px-2 py-1 text-[11px] leading-none text-[#333]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <Link
                to={`/projects/${project._id || project.id}`}
                className="text-gray-700 hover:text-black font-semibold underline decoration-gray-300 underline-offset-2"
              >
                Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ChatBubbleMorph — Circle-to-expanded card with IntersectionObserver.
 * Matches reference: starts as 50x50 circle, expands on scroll with text fading in.
 */
function ChatBubbleMorph() {
  const bubbleRef = useRef(null);

  useEffect(() => {
    const el = bubbleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-expanded');
        } else {
          el.classList.remove('is-expanded');
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Cursor Badge */}
      <div className="absolute -top-4 -left-3 z-30 cursor-float-1">
        <div className="relative inline-flex" style={{ background: 'transparent' }}>
          <div className="absolute blur-xl opacity-60 pointer-events-none" style={{ width: '40px', height: '40px', backgroundColor: '#ff30d9', borderRadius: '9999px', top: '-8px', left: '-8px' }} />
          <div className="absolute" style={{ top: '-16px', left: '-10px', filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }}>
            <svg width="23" height="28" viewBox="0 0 23 28" fill="none">
              <path d="M10.7139 15.4972L5.71387 25.4972L0.713867 0.997192L21.2139 12.9972L10.7139 15.4972Z" fill="#ff30d9" stroke="white" />
            </svg>
          </div>
          <span className="py-1 px-3 text-[14px] text-white rounded-full whitespace-nowrap relative z-10" style={{ backgroundColor: '#ff30d9', boxShadow: '0px 2px 8px rgba(0,0,0,0.2)' }}>Yatin</span>
        </div>
      </div>

      {/* Morphing Bubble */}
      <div ref={bubbleRef} className="chat-bubble-morph mt-3">
        <div className="bubble-inner space-y-2">
          <div className="flex items-baseline gap-2 text-xs">
            <span className="font-semibold text-white/90 text-[13px] md:text-[16px]">Yatin</span>
            <span className="text-white/40 text-[13px] md:text-[16px]">1 year ago</span>
          </div>
          <p className="text-[18px] md:text-[28px] font-medium leading-[1.25] text-white">
            I started with algorithms and logic,<br />
            then turned that curiosity into<br />
            building things for the web.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * SvgSketchGrid — 8 geometric sketches with stroke-draw animation.
 * Uses useSvgDraw hook to animate paths on viewport entry.
 */
function SvgSketchGrid() {
  const svgGridRef = useSvgDraw({ staggerMs: 80 });

  return (
    <div ref={svgGridRef} className="relative z-10 grid w-full max-w-4xl grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-8 sm:gap-12 md:gap-16 pt-16">
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 136 163" fill="none" className="w-full h-full object-contain">
          <path d="M58.9 70.4L55.6 108.1M58.9 70.4L47.3 62.7M58.9 70.4L89.3 59.6M55.6 108.1L130.6 78.2L133.6 43.8M55.6 108.1L6.9 73.7L10.1 37.9M133.6 43.8L79.4 15.3M133.6 43.8L89.3 59.6M10.1 37.9L79.4 15.3M10.1 37.9L47.3 62.7M79.4 15.3L76.1 52.7M76.1 52.7L47.3 62.7M76.1 52.7L89.3 59.6" stroke="#0FD6D9" strokeWidth="4" strokeLinecap="round" />
          <path d="M15 25C25 18 55 5 57 18C49 28 22 55 25 58C35 48 65 25 70 30C58 48 30 75 32 78C45 68 85 35 90 42C75 65 48 95 50 98" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 130 141" fill="none" className="w-full h-full object-contain">
          <path d="M91 5L29.7 16.5L11 80.9L50.5 129L112.7 115.7M11.7 81.6L68.8 70" stroke="#0FD6D9" strokeWidth="6" strokeLinecap="round" />
          <path d="M10 30C25 15 45 2 45 10C35 25 20 50 25 52C40 38 65 22 70 28C55 45 35 78 40 82C60 65 95 38 98 45" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 119 101" fill="none" className="w-full h-full object-contain">
          <path d="M51.7 73.1C81.5 57.7 92.2 51.7 99.7 39.5C107.2 27.3 105.4 17.8 91.5 17.8C77.5 17.8 70.2 17.6 45.5 36.5C20.8 55.4 20.5 58.7 18 70.6C15.5 82.6 27.8 96 43 97.5C58.2 99 94 94.8 107.7 91.5" stroke="#0FD6D9" strokeWidth="5" strokeLinecap="round" />
          <path d="M5 50C15 38 35 20 40 25C30 40 18 60 22 65C35 50 68 22 72 28C58 48 42 75 48 80C65 65 95 45 98 52" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 124 113" fill="none" className="w-full h-full object-contain">
          <path d="M48.7 47.2L81.1 41.8C87.6 40.8 92 34.6 90.9 28.1C89.9 21.6 83.7 17.2 77.2 18.3L58.8 21.3C42.8 23.9 31.9 39.1 34.6 55.1C37.2 71.2 52.4 82 68.4 79.4L109.3 72.7" stroke="#0FD6D9" strokeWidth="5" strokeLinecap="round" />
          <path d="M12 28C22 18 35 10 38 15C28 30 15 50 18 55C32 40 60 22 65 28C52 45 35 70 40 75" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 140 150" fill="none" className="w-full h-full object-contain">
          <path d="M70 15L120 45V105L70 135L20 105V45L70 15Z" stroke="#0FD6D9" strokeWidth="4" />
          <path d="M70 15V135M20 45L120 105M120 45L20 105" stroke="#0FD6D9" strokeWidth="3" opacity="0.6" />
          <path d="M25 50C40 35 85 20 90 30C75 55 45 85 50 90C70 75 110 50 115 60" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 140 140" fill="none" className="w-full h-full object-contain">
          <path d="M30 30H110V55H60V80H100V105H30V30Z" stroke="#0FD6D9" strokeWidth="5" strokeLinejoin="round" />
          <path d="M25 35C45 25 95 18 100 25C85 45 50 65 55 70C75 58 105 48 110 55" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 136 123" fill="none" className="w-full h-full object-contain">
          <path d="M119.5 48.7L69.3 56.6C69.3 56.6 76.2 24.7 91.8 23.4C106.4 22.3 119.5 48.7 119.5 48.7Z" stroke="#0FD6D9" strokeWidth="5" />
          <path d="M59.1 58.2C58 37.2 90.3 14.2 90.3 14.2C90.3 14.2 66.9 9.2 48.2 19.7C33.5 27.9 22.3 49.6 23.2 63.9C24.2 78.7 41.7 101.4 58.6 106.4" stroke="#0FD6D9" strokeWidth="5" />
          <path d="M15 50C30 35 70 15 75 22C60 45 35 75 40 80" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
      <div className="group flex h-28 w-24 sm:h-36 sm:w-32 items-center justify-center transition-transform hover:scale-105">
        <svg width="120" height="140" viewBox="0 0 141 186" fill="none" className="w-full h-full object-contain">
          <rect x="45.5" y="34.5" width="72.5" height="19.3" rx="9.6" transform="rotate(8 45.5 34.5)" stroke="#0FD6D9" strokeWidth="5" />
          <path d="M131 92.5L133.1 77.4C133.8 72.3 130.3 67.6 125.2 66.9C120.1 66.2 115.4 69.7 114.7 74.8L114.3 77.7C113.3 84.4 107.1 89.1 100.4 88.1L57.4 81.9C52 81.2 47.1 84.9 46.3 90.2C45.6 95.5 49.3 100.5 54.6 101.2L108.9 109" stroke="#0FD6D9" strokeWidth="5" />
          <rect x="32.7" y="124" width="72.5" height="19.8" rx="9.9" transform="rotate(8 32.7 124)" stroke="#0FD6D9" strokeWidth="5" />
          <path d="M35 30C50 20 90 10 95 18C80 40 45 70 50 75" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        </svg>
      </div>
    </div>
  );
}

export default Home;
