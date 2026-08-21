import Reveal from '../components/Reveal.jsx';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Development',
    description: 'Modern client-side scripting and component architecture',
    skills: [
      { name: 'React', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'HTML5 & CSS3', level: 'Advanced' },
      { name: 'React Router', level: 'Proficient' },
      { name: 'Redux Toolkit', level: 'Proficient' },
    ]
  },
  {
    title: 'Backend & APIs',
    description: 'RESTful API design and database integrations',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'Mongoose ODM', level: 'Proficient' },
      { name: 'JWT & Authentication', level: 'Proficient' },
    ]
  },
  {
    title: 'DevOps & Cloud Automation',
    description: 'Continuous integration, containerization, and orchestration',
    skills: [
      { name: 'Docker', level: 'Proficient' },
      { name: 'Kubernetes (Pods/Deployments)', level: 'Proficient' },
      { name: 'Jenkins CI/CD', level: 'Proficient' },
      { name: 'Git & Version Control', level: 'Advanced' },
      { name: 'Prometheus & Grafana', level: 'Intermediate' },
      { name: 'Linux / Bash Scripting', level: 'Proficient' },
    ]
  },
  {
    title: 'Methodology & Engineering',
    description: 'Best practices in software delivery and code quality',
    skills: [
      { name: 'Automated Testing (Jest)', level: 'Proficient' },
      { name: 'Container Lifecycle', level: 'Proficient' },
      { name: 'Microservices Concepts', level: 'Intermediate' },
      { name: 'Performance Monitoring', level: 'Intermediate' },
      { name: 'Agile & DevOps Culture', level: 'Advanced' },
    ]
  }
];

function Skills() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Technical Expertise</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Skills & Competencies</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Comprehensive inventory of fullstack web development and DevOps automation technologies. Data will be dynamically loaded from the API in Phase 6.
        </p>
      </div>

      {/* Grid of Categorized Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((category, idx) => (
          <Reveal key={category.title} delay={idx * 100}>
            <div className="h-full rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/60">
              <h2 className="text-lg font-bold text-white mb-1">{category.title}</h2>
              <p className="text-xs text-neutral-400 mb-6">{category.description}</p>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-neutral-800/80 bg-neutral-950/60 px-3 py-1.5 text-xs transition-colors hover:border-neutral-700"
                  >
                    <span className="font-medium text-neutral-200">{skill.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default Skills;
