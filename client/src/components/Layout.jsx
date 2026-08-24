import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AnimatedBackground from './AnimatedBackground.jsx';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      className={`scroll-top-btn ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function Layout() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#080808] text-[#f7f7f4] z-0">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
