import Reveal from '../components/Reveal.jsx';

function Resume() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Curriculum Vitae</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Engineering Resume</h1>
          <p className="text-neutral-400 max-w-xl text-base leading-relaxed">
            Summary of qualifications, academic background, and technical skillset.
          </p>
        </div>

        {/* Resume Download Action */}
        <div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition-all duration-200 hover:bg-neutral-200 hover:shadow"
          >
            <span>Download PDF</span>
            <span className="font-mono text-xs">&darr;</span>
          </a>
        </div>
      </div>

      {/* Resume Highlights Grid */}
      <div className="space-y-8">
        <Reveal>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Executive Summary</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Computer Science graduate (B.Tech RTU) with a strong foundation in modern fullstack JavaScript ecosystems (React, Node.js, Express, MongoDB) and cloud DevOps engineering (Docker containerization, Kubernetes cluster management, Jenkins CI/CD pipelines, and Prometheus monitoring).
              </p>
            </div>

            <div className="border-t border-neutral-800/80 pt-6">
              <h2 className="text-lg font-bold text-white mb-4">Core Competencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-mono text-neutral-500 uppercase block mb-1">Web Development</span>
                  <p className="text-neutral-300 font-medium">React, JavaScript (ES6+), Tailwind CSS, HTML5/CSS3, React Router</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-mono text-neutral-500 uppercase block mb-1">Backend & DB</span>
                  <p className="text-neutral-300 font-medium">Node.js, Express.js, MongoDB, Mongoose, REST APIs, JWT Auth</p>
                </div>
                <div className="p-4 rounded-lg bg-neutral-950/60 border border-neutral-800/60">
                  <span className="font-mono text-neutral-500 uppercase block mb-1">DevOps & Cloud</span>
                  <p className="text-neutral-300 font-medium">Docker, Kubernetes, Jenkins CI/CD, Git, Prometheus, Grafana</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-800/80 pt-6">
              <h2 className="text-lg font-bold text-white mb-2">Education</h2>
              <div>
                <p className="text-sm font-semibold text-neutral-200">Bachelor of Technology (B.Tech) in Computer Science</p>
                <p className="text-xs text-neutral-400 font-mono">Rajasthan Technical University (RTU) &bull; 2022 — 2026</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Resume;
