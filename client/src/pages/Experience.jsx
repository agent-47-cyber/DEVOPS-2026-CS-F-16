import Reveal from '../components/Reveal.jsx';

const TIMELINE_ITEMS = [
  {
    period: '2022 — 2026',
    title: 'Bachelor of Technology (B.Tech) in Computer Science',
    institution: 'Rajasthan Technical University (RTU)',
    description: 'Core curriculum covering Data Structures, Web Development Modules (HTML/CSS/JS/React/Node/Express/MongoDB), and DevOps Modules (Git/Jenkins/Docker/Kubernetes/Prometheus).',
    tags: ['Fullstack Web Dev', 'DevOps', 'Distributed Systems', 'Software Engineering']
  },
  {
    period: '2025 — 2026',
    title: 'Fullstack & DevOps Capstone Lead',
    institution: 'Academic Capstone Project',
    description: 'Designed and deployed a fullstack portfolio system with automated CI in Jenkins, containerized via multi-stage Dockerfiles, and orchestrated across Kubernetes clusters with real-time Prometheus monitoring.',
    tags: ['CI/CD', 'Kubernetes', 'Prometheus', 'React', 'Express']
  },
  {
    period: '2024 — 2025',
    title: 'Web Application & Cloud Engineering Practicum',
    institution: 'University Practical Labs',
    description: 'Built RESTful services with Express and MongoDB, implemented automated unit testing with Jest/Supertest, and configured container lifecycle management.',
    tags: ['REST APIs', 'MongoDB', 'Docker', 'Linux']
  }
];

function Experience() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Background & Milestones</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Experience & Education</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Academic foundation and engineering timeline aligned with RTU curriculum standards.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-neutral-800 ml-4 space-y-10 pl-6 sm:pl-8">
        {TIMELINE_ITEMS.map((item, idx) => (
          <Reveal key={item.title} delay={idx * 120}>
            <div className="relative group">
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-neutral-800 bg-neutral-950 group-hover:border-white transition-colors" />

              <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">{item.period}</span>
                <h2 className="text-lg font-bold text-white mt-1">{item.title}</h2>
                <h3 className="text-sm text-neutral-400 font-medium mb-3">{item.institution}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>

                <div className="flex flex-wrap gap-1.5 text-xs font-mono text-neutral-400">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded bg-neutral-800/80 px-2 py-0.5 text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Experience;
