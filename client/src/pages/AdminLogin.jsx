import Reveal from '../components/Reveal.jsx';

function AdminLogin() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Reveal className="w-full max-w-md">
        <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-8 shadow-2xl backdrop-blur-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Security Gate</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Authentication</h1>
            <p className="text-xs text-neutral-400">
              Access the administrative control center to manage projects, skills, and inbox.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                placeholder="admin"
                disabled
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                disabled
                className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-2.5 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none"
              />
            </div>

            <button
              type="button"
              disabled
              className="w-full rounded-lg bg-neutral-800 py-2.5 text-sm font-semibold text-neutral-400 cursor-not-allowed opacity-80"
            >
              Sign In (Redux Auth in Phase 7)
            </button>
          </form>

          <div className="border-t border-neutral-800/80 pt-4 text-center">
            <p className="text-[11px] font-mono text-neutral-500">
              Single seeded admin account &bull; Protected by JWT Bearer token
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default AdminLogin;
