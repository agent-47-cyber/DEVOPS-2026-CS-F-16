import { useEffect, useState } from 'react';

/**
 * AnimatedBackground component creates a subtle, scroll-tied background effect.
 * It uses requestAnimationFrame to update CSS custom properties based on scroll position.
 */
export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let animationFrameId;
    
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth performance
      animationFrameId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        // Update custom properties on the root or a specific container
        document.documentElement.style.setProperty('--scroll-y', `${currentScrollY}px`);
        document.documentElement.style.setProperty('--scroll-progress', Math.min(currentScrollY / (document.body.scrollHeight - window.innerHeight), 1));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set starting values
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Subtle moving grid */}
      <div 
        className="absolute inset-0 bg-code-grid opacity-20 transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      />
      
    </div>
  );
}
