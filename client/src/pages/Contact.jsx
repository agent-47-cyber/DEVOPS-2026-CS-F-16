import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { submitMessage } from '../api/index.js';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await submitMessage(formData);
      setSuccess(response.message || 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Initiate Contact</span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Let&apos;s Build Together</h1>
        <p className="text-neutral-400 max-w-2xl text-base leading-relaxed">
          Open for software engineering opportunities, DevOps collaborations, and technical discussions. Submit a message directly to MongoDB via the Express API.
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
                <span className="font-mono text-neutral-500 block uppercase">Response SLA</span>
                <span className="font-medium text-emerald-400 mt-0.5 block">&le; 24 hours</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6">
            <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">Architecture Note</span>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Form submissions trigger <code className="text-neutral-300 font-mono">POST /api/messages</code>, validated by Express and persisted in MongoDB for admin review.
            </p>
          </div>
        </Reveal>

        {/* Real Contact Form */}
        <Reveal delay={150} className="md:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-800/80 bg-neutral-900/30 p-6 sm:p-8 space-y-6">
            {/* Feedback Alerts */}
            {success && (
              <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                <p className="font-semibold">{success}</p>
                <p className="text-emerald-400/80 mt-0.5">Your inquiry is stored in MongoDB and ready for admin review.</p>
              </div>
            )}

            {error && (
              <div className="rounded-lg border border-red-800/60 bg-red-950/30 p-4 text-xs text-red-300">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project, role opportunity, or technical inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={submitting}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950/80 px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition-all duration-200 hover:bg-neutral-200 hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting Message...' : 'Send Message'}
            </button>
          </form>
        </Reveal>
      </div>
    </div>
  );
}

export default Contact;
