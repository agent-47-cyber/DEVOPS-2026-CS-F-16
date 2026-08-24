import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';

function Resume() {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: [
        'JavaScript (ES6+)',
        'React',
        'Tailwind CSS',
        'HTML5 & CSS3',
        'Redux Toolkit',
        'Vite',
      ],
    },
    {
      title: 'Databases & Backend',
      skills: [
        'Node.js',
        'Express.js',
        'MongoDB',
        'Mongoose ODM',
        'RESTful APIs',
        'JWT & Auth Security',
      ],
    },
    {
      title: 'DevOps & Platforms',
      skills: [
        'Docker & Compose',
        'Kubernetes',
        'Jenkins CI/CD',
        'Git & GitHub',
        'Prometheus & Grafana',
        'Linux / Bash',
      ],
    },
  ];

  const highlightedProjects = [
    {
      title: 'DevScope AI',
      category: 'AI Developer Platform',
      description: 'An AI-powered developer intelligence platform providing real-time code analysis, intelligent architecture inspection, automated workflow insights, and interactive developer tooling.',
      stack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'AI Integration', 'Vercel'],
      link: 'https://devscopeai-nine.vercel.app/',
    },
    {
      title: 'Fullstack Portfolio & DevOps Platform',
      category: 'Capstone Architecture',
      description: 'Fullstack portfolio with content management API, automated Jenkins CI/CD pipeline, multi-stage Docker containerization, and Kubernetes cluster orchestration.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Kubernetes', 'Jenkins'],
      link: 'https://github.com/agent-47-cyber/collge_portfolio',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 text-white">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* =========================================================================
            HEADER & PROFILE (Editorial reference layout)
            ========================================================================= */}
        <Reveal>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
              Yatin Khandelwal
            </h1>
            <p className="font-mono text-sm sm:text-base text-[#0fd6d9]">
              <a
                href="https://github.com/agent-47-cyber"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                github.com/agent-47-cyber ↗
              </a>
            </p>
            <p className="max-w-3xl text-base sm:text-lg text-white/80 leading-relaxed pt-2">
              Currently pursuing B.Tech in Computer Science & Engineering at Rajasthan Technical University (RTU),
              I&apos;m a fullstack developer and DevOps engineer with a passion for designing, architecting,
              and continually expanding my technical skills to create meaningful, high-performance systems.
            </p>

            {/* Status Pill Badge */}
            <div className="pt-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-mono text-white/90 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#0fc97c] animate-pulse" />
                <span>Searching for Opportunities · Fullstack / DevOps Engineer</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            SKILLS SECTION (3-Column layout matching reference screenshot)
            ========================================================================= */}
        <section className="mt-16 pt-10 border-t border-white/15">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-8">
              SKILLS
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            {skillCategories.map((cat, catIdx) => (
              <Reveal key={cat.title} delay={catIdx * 100}>
                <div className="space-y-4">
                  <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider border-b border-white/10 pb-2">
                    {cat.title}
                  </h2>
                  <ul className="space-y-2 text-sm text-white/70">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="transition-colors duration-150 hover:text-[#0fd6d9] hover:translate-x-1 transition-transform inline-block w-full"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            FEATURED PROJECTS (DevScope AI + Fullstack Platform)
            ========================================================================= */}
        <section className="mt-16 pt-10 border-t border-white/15">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-8">
              FEATURED PROJECTS
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlightedProjects.map((proj, idx) => (
              <Reveal key={proj.title} delay={idx * 120}>
                <div className="rounded-2xl border border-white/10 bg-[#121217] p-6 shadow-xl space-y-4 hover:border-[#0fd6d9]/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#0fd6d9] font-medium">
                      {proj.category}
                    </span>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-white/50 hover:text-white transition-colors"
                    >
                      Visit ↗
                    </a>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {proj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-mono text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            EDUCATION SECTION
            ========================================================================= */}
        <section className="mt-16 pt-10 border-t border-white/15">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
              EDUCATION
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h3 className="text-xl font-bold text-white">
                  Bachelor of Technology (B.Tech) in Computer Science & Engineering
                </h3>
                <p className="text-sm text-[#0fd6d9] font-mono mt-1">
                  Rajasthan Technical University (RTU)
                </p>
              </div>
              <span className="font-mono text-xs text-white/50 shrink-0">
                2022 — 2026
              </span>
            </div>
          </Reveal>
        </section>

        {/* =========================================================================
            ACTIONS & FOOTER
            ========================================================================= */}
        <section className="mt-16 pt-10 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#0fd6d9] px-6 py-2.5 text-xs font-mono font-bold text-black hover:bg-[#43e5d8] transition-colors shadow-lg"
              >
                <span>Get in touch</span>
                <span>&rarr;</span>
              </Link>
              <Link
                to="/projects"
                className="font-mono text-xs text-white/70 hover:text-white transition-colors"
              >
                View all work ↗
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center gap-4 font-mono text-xs text-white/40">
              <a
                href="https://github.com/agent-47-cyber"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com/in/yatinkhandelwal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}

export default Resume;

