import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import { submitMessage } from '../api/index.js';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const handleChange = ({ target: { name, value } }) => setFormData((previous) => ({ ...previous, [name]: value }));
  const handleSubmit = async (event) => { event.preventDefault(); setSubmitting(true); setError(null); setSuccess(null); try { await submitMessage(formData); setSuccess('Message sent successfully.'); setFormData({ name: '', email: '', message: '' }); } catch (requestError) { setError(requestError.message || 'Failed to send message.'); } finally { setSubmitting(false); } };
  return <div className="min-h-screen pt-32"><section className="px-5 pb-24 md:px-10"><div className="mx-auto max-w-[1200px]">
    <Reveal><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">Contact</p><h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,10vw,9rem)] font-bold leading-[.8] tracking-[-.1em]">Let&apos;s make something <span className="editorial-italic text-[#9df4e6]">useful.</span></h1></Reveal>
    <Reveal className="mt-14 grid gap-14 border-t border-white/20 pt-6 md:grid-cols-[.65fr_1.35fr]"><div className="text-sm leading-relaxed text-white/60"><p>Have a role, product, or technical challenge in mind? Send a note and I&apos;ll get back to you.</p><div className="mt-8 space-y-3 font-mono text-[11px]"><a className="block hover:text-[#9df4e6]" href="https://github.com/agent-47-cyber" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a className="block hover:text-[#9df4e6]" href="https://linkedin.com/in/yatinkhandelwal" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div></div>
    <form onSubmit={handleSubmit} className="space-y-7"><div><label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-[.18em] text-white/50">Your Name</label><input id="contact-name" name="name" required value={formData.name} onChange={handleChange} placeholder="How should I call you?" className="mt-2 w-full border-b border-white/25 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#9df4e6]" /></div><div><label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-[.18em] text-white/50">Email Address</label><input id="contact-email" type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@company.com" className="mt-2 w-full border-b border-white/25 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#9df4e6]" /></div><div><label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-[.18em] text-white/50">Message</label><textarea id="contact-message" name="message" required rows="5" value={formData.message} onChange={handleChange} placeholder="Tell me what you are building." className="mt-2 w-full resize-none border-b border-white/25 bg-transparent py-3 text-lg text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#9df4e6]" /></div>{error && <p className="font-mono text-xs text-red-300">{error}</p>}{success && <p className="font-mono text-xs text-[#9df4e6]">{success}</p>}<button type="submit" disabled={submitting} className="border-b border-white pb-2 text-sm font-semibold hover:border-[#9df4e6] hover:text-[#9df4e6] disabled:opacity-50">{submitting ? 'Sending…' : 'Send Message'} ↗</button></form></Reveal>
  </div></section></div>;
}

export default Contact;
