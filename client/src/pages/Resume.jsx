import Reveal from '../components/Reveal.jsx';

const strengths = [
  ['Frontend', 'React, Redux Toolkit, React Router, Vite, Tailwind CSS'],
  ['Backend', 'Node.js, Express, REST APIs, JWT security'],
  ['Data', 'MongoDB, Mongoose, schema design'],
  ['DevOps', 'Docker, Compose, Kubernetes, Jenkins CI/CD, Prometheus'],
  ['Quality', 'Jest, Supertest, React Testing Library, ESLint'],
];

function Resume() {
  return <div className="min-h-screen pt-32"><section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1200px]">
    <Reveal><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">Yatin Khandelwal — Resume</p><div className="mt-6 flex flex-col justify-between gap-8 border-b border-white/20 pb-12 md:flex-row md:items-end"><h1 className="text-[clamp(4rem,11vw,10rem)] font-bold leading-[.75] tracking-[-.1em]">Fullstack<br /><span className="editorial-italic text-[#9df4e6]">builder.</span></h1><a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="w-fit border-b border-white pb-2 text-sm font-semibold hover:text-[#9df4e6] hover:border-[#9df4e6]">Download PDF ↓</a></div></Reveal>
    <Reveal className="mt-16 grid gap-12 md:grid-cols-[.75fr_1.25fr]"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">Profile</p><p className="mt-4 text-xl leading-relaxed text-white/80">Fullstack engineer and DevOps-focused computer science student, interested in dependable software and the systems that deliver it.</p></div><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">Capabilities</p><dl className="mt-4">{strengths.map(([label, detail]) => <div key={label} className="grid gap-2 border-t border-white/15 py-4 sm:grid-cols-[150px_1fr]"><dt className="font-mono text-xs text-[#9df4e6]">{label}</dt><dd className="text-sm leading-relaxed text-white/65">{detail}</dd></div>)}</dl></div></Reveal>
    <Reveal className="mt-16 border-t border-white/20 pt-6"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">Education</p><h2 className="mt-4 text-3xl font-bold tracking-[-.06em]">B.Tech in Computer Science</h2><p className="mt-2 text-sm text-white/55">Rajasthan Technical University (RTU) · 2022 — 2026</p></Reveal>
  </div></section></div>;
}

export default Resume;
