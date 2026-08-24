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
      stack: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'Node.js', 'AI Integration', 'Vercel'],
      link: 'https://devscopeai-nine.vercel.app/',
    },
    {
      title: 'Fullstack Portfolio',
      category: 'Capstone Architecture',
      description: 'Fullstack personal portfolio with content management REST API, automated Jenkins CI/CD pipeline, multi-stage Docker containerization, and Kubernetes cluster orchestration.',
      stack: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Docker', 'Kubernetes', 'Jenkins'],
      link: 'https://github.com/agent-47-cyber/collge_portfolio',
    },
  ];

  return (
    <div className="resume-light min-h-screen pt-28 pb-24">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* =========================================================================
            HEADER & PROFILE — Light editorial layout matching reference
            ========================================================================= */}
        <Reveal>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black">
              Yatin Khandelwal
            </h1>
            <a
              href="https://github.com/agent-47-cyber"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl font-semibold px-1 rounded outline-[6px] outline-transparent hover:outline-gray-100 hover:bg-gray-100 transition-all duration-200 text-black"
            >
              github.com/agent-47-cyber
            </a>
            <p className="max-w-3xl text-base md:text-lg font-medium leading-snug text-black/80 pt-2">
              Currently pursuing B.Tech in Computer Science &amp; Engineering at SKIT Jaipur,
              I&apos;m a fullstack developer and DevOps engineer with a passion for designing, architecting,
              and continually expanding my technical skills to create meaningful, high-performance systems.
            </p>

            {/* Status Pill Badge — matching reference with ping animation */}
            <div className="pt-3">
              <a
                href="mailto:yatinkhandelwal@example.com?subject=Job%20opportunity"
                aria-label="Currently available for work. Send me an email."
                className="group inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white/70 py-2 pl-3 pr-5 text-sm md:text-base font-medium transition-colors duration-200 hover:border-black hover:bg-white"
              >
                <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
                  <span className="absolute inline-flex size-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-teal-500" />
                </span>
                <span>
                  Searching for Opportunities
                  <span className="text-gray-500 group-hover:text-black transition-colors duration-200"> · Fullstack / DevOps Engineer</span>
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* =========================================================================
            SKILLS SECTION — 3-Column layout matching reference
            ========================================================================= */}
        <section className="mt-16 pt-10">
          <Reveal>
            <p className="uppercase text-base tracking-[4px] text-black mb-6">
              Skills
            </p>
          </Reveal>
          <div className="bg-gray-300 w-full h-px mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            {skillCategories.map((cat, catIdx) => (
              <Reveal key={cat.title} delay={catIdx * 100}>
                <div className="space-y-4">
                  <h2 className="text-base font-bold text-black">
                    {cat.title}
                  </h2>
                  <ul className="list-none flex flex-col gap-2 text-base text-black/70">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="transition-colors duration-150 hover:text-[#0fd6d9]"
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
            EDUCATION SECTION — 3-column grid matching reference
            ========================================================================= */}
        <section className="mt-20 pt-10">
          <Reveal>
            <p className="uppercase text-base tracking-[4px] text-black mb-6">
              Education
            </p>
          </Reveal>
          <div className="bg-gray-300 w-full h-px mb-6" />

          <Reveal delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start">
              <div className="flex items-center gap-5 md:col-span-3">
                <img 
                  src="/skit-logo.png" 
                  alt="SKIT Jaipur Logo" 
                  className="h-20 w-auto object-contain mix-blend-multiply" 
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[28px] md:text-[32px] font-bold text-black leading-none mb-1">
                    skit jaipur
                  </h3>
                  <p className="text-lg text-black/60 font-medium">2024 — 2028</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* =========================================================================
            FEATURED PROJECTS (Work Section)
            ========================================================================= */}
        <section className="mt-20 pt-10">
          <Reveal>
            <p className="uppercase text-base tracking-[4px] text-black mb-6">
              Work
            </p>
          </Reveal>
          <div className="bg-gray-300 w-full h-px mb-6" />

          <div className="flex flex-col gap-10 md:gap-14">
            {highlightedProjects.map((proj, idx) => (
              <Reveal key={proj.title} delay={idx * 120}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start">
                  <div className="flex flex-col gap-1 md:col-span-1">
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block self-start w-fit text-[24px] font-bold text-black rounded outline-[3px] outline-transparent hover:outline-gray-100 hover:bg-gray-100 transition-all duration-200"
                    >
                      {proj.title}
                    </a>
                    <p className="text-base uppercase text-black/60">{proj.category}</p>
                  </div>
                  <div className="flex flex-col gap-4 pt-2 md:col-span-2">
                    <p className="text-base text-black/80">{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {proj.stack.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-black/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            ACTIONS & FOOTER
            ========================================================================= */}
        <section className="mt-16 pt-10 flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <div className="flex items-center gap-6">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors shadow-md"
              >
                <span>Contact me</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex items-center gap-4 text-sm text-black/40">
              <a
                href="https://github.com/agent-47-cyber"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com/in/yatinkhandelwal"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
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
