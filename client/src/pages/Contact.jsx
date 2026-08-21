import Reveal from '../components/Reveal.jsx';

function Contact() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Initiate Contact</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Let&apos;s Build Together</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Open for software engineering opportunities, DevOps collaborations, and technical discussions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <Reveal className="space-y-6">
          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Direct Channels</h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-mono text-neutral-500 block uppercase">Email</span>
                <span className="font-medium text-neutral-200 mt-0.5 block">khandelwalyatin2@gmail.com</span>
              </div>
              <div>
                <span className="font-mono text-neutral-500 block uppercase">Location</span>
                <span className="font-medium text-neutral-200 mt-0.5 block">India (RTU Syllabus Track)</span>
              </div>
              <div>
                <span className="font-mono text-neutral-500 block uppercase">Response Time</span>
                <span className="font-medium text-emerald-400 mt-0.5 block">&le; 24 hours</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6">
            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Status</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              API contact form submission will be wired directly to MongoDB via Express in Phase 6.
            </p>
          </div>
        </Reveal>

        {/* Contact Form Layout (Placeholder UI) */}
        <Reveal delay={150} className="md:col-span-2">
          <form onSubmit={(e) => e.preventDefault()} className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  disabled
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. jane@example.com"
                  disabled
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, role, or inquiry..."
                  disabled
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-600 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center rounded-lg bg-neutral-800 px-6 py-3 text-sm font-semibold text-neutral-400 cursor-not-allowed opacity-80"
            >
              Send Message (Wired in Phase 6)
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

export default Contact;
