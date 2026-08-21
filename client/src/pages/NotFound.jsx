import { Link } from 'react-router-dom';

function NotFound() {
  return <div className="flex min-h-[80vh] items-center px-5 pt-20 md:px-10"><div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-[#9df4e6]">404 — Lost route</p><h1 className="mt-5 text-[clamp(4rem,13vw,12rem)] font-bold leading-[.72] tracking-[-.12em]">Not<br /><span className="editorial-italic text-[#9df4e6]">here.</span></h1><Link to="/" className="mt-12 inline-block border-b border-white pb-2 text-sm font-semibold hover:text-[#9df4e6] hover:border-[#9df4e6]">Return home ↗</Link></div></div>;
}

export default NotFound;
