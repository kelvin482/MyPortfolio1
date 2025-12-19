/**
 * Scroll Reveal Animations
 * Enhanced scroll-based animations with staggered effects
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Initialize scroll reveal animations with enhanced effects
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    if (revealElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add visible class with slight delay for stagger effect
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 50); // 50ms stagger between elements
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: prefersReducedMotion ? '0px' : '-50px 0px -50px 0px'
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });
  }

  /**
   * Initialize card animations with individual triggers
   */
  function initCardAnimations() {
    const cards = document.querySelectorAll('.feature, .cert-card, [class*="project-card"]');
    
    if (cards.length === 0) return;

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('card-visible');
            }, index * 100); // 100ms stagger for cards
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    cards.forEach(card => {
      cardObserver.observe(card);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initCardAnimations();
    });
  } else {
    initScrollReveal();
    initCardAnimations();
  }
})();

