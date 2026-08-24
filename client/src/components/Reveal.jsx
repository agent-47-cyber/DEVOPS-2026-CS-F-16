import { useScrollReveal } from '../hooks/useScrollReveal.js';

/**
 * Reusable Reveal component wrapping sections with scroll-triggered fade/translate-up
 */
function Reveal({ children, className = '', delay = 0, once = false }) {
  const ref = useScrollReveal({ threshold: 0.1, once });

  return (
    <div
      ref={ref}
      className={`reveal-init ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export default Reveal;
