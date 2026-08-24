import Reveal from '../components/Reveal.jsx';

const timeline = [
  ['2024 — 2028', 'B.Tech in Computer Science', 'SKIT Jaipur', 'A foundation in data structures, operating systems, databases, networking, and software engineering.'],
  ['2024 — Present', 'Fullstack & DevOps engineering practicum', 'Capstone engineering lab', 'Building containerized web systems with React, Express, MongoDB, automated checks, and continuous delivery.'],
  ['2023 — 2024', 'Advanced web applications & microservices', 'Self-directed applied engineering', 'Developing responsive interfaces, REST APIs, JWT-protected flows, and deliberate state management.'],
];

function Experience() {
  return <div className="min-h-screen pt-32"><section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1200px]"><Reveal><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">Journey</p><h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[.8] tracking-[-.1em]">Learning in public. Building with <span className="editorial-italic text-[#9df4e6]">intent.</span></h1></Reveal><div className="mt-16">{timeline.map(([period, title, source, description], index) => <Reveal key={title} delay={index * 100}><article className="grid gap-5 border-t border-white/20 py-7 md:grid-cols-[.3fr_1fr_.8fr]"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#9df4e6]">{period}</p><div><h2 className="text-2xl font-bold tracking-[-.055em]">{title}</h2><p className="mt-2 font-mono text-[10px] uppercase tracking-[.14em] text-white/45">{source}</p></div><p className="text-sm leading-relaxed text-white/60">{description}</p></article></Reveal>)}</div></div></section></div>;
}

export default Experience;
