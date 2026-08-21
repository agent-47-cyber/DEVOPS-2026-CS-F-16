import Reveal from '../components/Reveal.jsx';

function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-neutral-800 pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Administration Panel</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">System Dashboard</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Central management console for Projects, Skills, and Contact inquiries. Real CRUD operations will be activated in Phase 7.
        </p>
      </div>

      {/* Metric Cards Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Reveal delay={50}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6">
            <span className="text-xs font-mono text-neutral-500 uppercase">Projects</span>
            <div className="text-3xl font-bold text-white mt-2">4</div>
            <p className="text-xs text-neutral-400 mt-1">Managed via /api/projects</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6">
            <span className="text-xs font-mono text-neutral-500 uppercase">Skills</span>
            <div className="text-3xl font-bold text-white mt-2">24</div>
            <p className="text-xs text-neutral-400 mt-1">Managed via /api/skills</p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6">
            <span className="text-xs font-mono text-neutral-500 uppercase">Messages</span>
            <div className="text-3xl font-bold text-white mt-2">0</div>
            <p className="text-xs text-neutral-400 mt-1">Managed via /api/messages</p>
          </div>
        </Reveal>
      </div>

      {/* CRUD Management Stubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal delay={200}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Project Management</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Create, edit, reorder, and remove case studies stored in MongoDB.
            </p>
            <div className="rounded border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-500 font-mono">
              CRUD UI arriving in Phase 7
            </div>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Contact Submissions</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Review received contact inquiries and mark messages as read.
            </p>
            <div className="rounded border border-dashed border-neutral-800 p-6 text-center text-xs text-neutral-500 font-mono">
              Admin Inbox arriving in Phase 7
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default AdminDashboard;
