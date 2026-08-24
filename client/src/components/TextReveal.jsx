import { useScrollReveal } from '../hooks/useScrollReveal.js';

/**
 * TextReveal component wraps text and splits it into lines (by splitting on \n)
 * to animate them with a stagger effect when scrolled into view.
 */
export function TextReveal({ text, className = '', delay = 0, stagger = 120 }) {
  // Use once: false to allow reversing on scroll up
  const ref = useScrollReveal({ threshold: 0.1, once: false });
  
  // If text is not provided, fallback to empty string
  const lines = (text || '').split('\n');

  return (
    <div ref={ref} className={`text-reveal-container ${className}`}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <div 
            className="text-reveal-line"
            style={{ 
              transitionDelay: `${delay + (index * stagger)}ms`,
            }}
          >
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}
