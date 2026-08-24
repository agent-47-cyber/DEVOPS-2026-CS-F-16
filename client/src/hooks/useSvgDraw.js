import { useEffect, useRef } from 'react';

/**
 * Custom hook for SVG stroke-draw animations using IntersectionObserver.
 * When the observed container enters the viewport, all <path> elements
 * inside will animate their stroke from hidden to fully drawn.
 *
 * @param {Object} options - IntersectionObserver options
 * @param {number} options.threshold - Visibility threshold (default 0.15)
 * @param {string} options.rootMargin - Root margin (default '0px 0px -40px 0px')
 * @param {number} options.staggerMs - Stagger delay between paths in ms (default 120)
 */
export function useSvgDraw(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Respect reduced motion preference
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      container.querySelectorAll('path').forEach((path) => {
        path.style.opacity = '1';
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const paths = container.querySelectorAll('path');
          paths.forEach((path, index) => {
            try {
              const length = path.getTotalLength();
              path.style.strokeDasharray = `${length}`;
              if (!path.style.transition) {
                path.style.transition = `stroke-dashoffset 1.8s cubic-bezier(0.65, 0, 0.35, 1) ${index * (options.staggerMs || 120)}ms`;
              }
              path.style.strokeDashoffset = '0';
            } catch {
              path.style.opacity = '1';
            }
          });
        } else {
          // Reverse animation when scrolling up
          const paths = container.querySelectorAll('path');
          paths.forEach((path) => {
            try {
              const length = path.getTotalLength();
              if (length) {
                path.style.strokeDashoffset = `${length}`;
              }
            } catch {
              // ignore
            }
          });
        }
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.staggerMs]);

  return ref;
}
