import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const mobileLinks = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/projects' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

function Brand({ compact = false, tone = 'text-white' }) {
  return (
    <Link to="/" className={`flex items-center gap-3 ${tone}`} aria-label="Yatin Khandelwal home">
      <span className="font-mono text-xs tracking-[-0.08em]">YK</span>
      {!compact && <span className="hidden text-xs font-medium tracking-wide sm:inline">Yatin Khandelwal</span>}
    </Link>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isWorkIndex = location.pathname === '/projects';
  const desktopTone = isWorkIndex ? 'text-[#080808]' : 'text-white';
  const desktopRule = isWorkIndex ? 'bg-black/30' : 'bg-white/30';

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-5 pt-5 md:px-10 md:pt-7">
        <nav className={`pointer-events-auto mx-auto flex max-w-[1600px] items-center ${desktopTone}`}>
          <Brand tone={desktopTone} />
          <span className={`mx-7 h-px flex-1 md:mx-12 ${desktopRule}`} aria-hidden="true" />
          <div className="hidden items-center gap-8 text-xs font-medium tracking-wide md:flex">
            <NavLink to="/projects" className="transition-colors hover:text-[#9df4e6]">Work</NavLink>
            <NavLink to="/resume" className="transition-colors hover:text-[#9df4e6]">Resume</NavLink>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            className="ml-auto flex h-8 w-8 flex-col items-end justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-6 ${isWorkIndex ? 'bg-[#080808]' : 'bg-white'}`} />
            <span className={`h-px w-4 ${isWorkIndex ? 'bg-[#080808]' : 'bg-white'}`} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-[60] flex min-h-screen flex-col bg-[#080808] px-5 py-5 text-white transition-[opacity,transform] duration-300 md:hidden ${mobileMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center">
          <Brand compact />
          <span className="mx-6 h-px flex-1 bg-white/30" aria-hidden="true" />
          <button type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation menu" className="text-xs tracking-widest text-white/70 hover:text-white">CLOSE</button>
        </div>
        <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
          {mobileLinks.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `flex items-baseline justify-between border-b border-white/20 py-4 text-[clamp(2.7rem,14vw,5.5rem)] font-bold leading-none tracking-[-.07em] ${isActive ? 'text-[#9df4e6]' : 'text-white'}`}
            >
              <span>{item.label}</span><span className="font-mono text-[10px] tracking-normal text-white/40">0{index + 1}</span>
            </NavLink>
          ))}
        </nav>
        <p className="font-mono text-[10px] uppercase tracking-[.22em] text-white/45">Fullstack developer · DevOps engineer</p>
      </div>
    </>
  );
}

export default Navbar;
