import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-reveal animations using native IntersectionObserver.
 * Adheres strictly to locked stack (vanilla JS DOM APIs).
 *
 * Options:
 *   threshold   – Intersection ratio to trigger reveal (default: 0.12)
 *   rootMargin  – Margin around root (default: '0px 0px -30px 0px')
 *   once        – Unobserve after first reveal (default: true)
 *   delay       – Animation delay in ms applied via CSS custom property (default: 0)
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect user preference for reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.classList.add('is-revealed');
      return;
    }

    // Apply stagger delay via CSS custom property so Reveal components
    // with a delay prop actually animate at the correct offset
    if (options.delay) {
      element.style.setProperty('--reveal-delay', `${options.delay}ms`);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-revealed');
          if (options.once !== false) {
            observer.unobserve(element);
          }
        } else if (options.once === false) {
          element.classList.remove('is-revealed');
        }
      },
      {
        threshold: options.threshold || 0.12,
        rootMargin: options.rootMargin || '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.once, options.delay]);

  return ref;
}
