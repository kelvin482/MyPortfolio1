/**
 * Scroll-Based Style Variations
 * Adds different styles to containers as they appear on scroll
 */

(function() {
  'use strict';

  function initScrollStyles() {
    // Observe all sections and reveal them without decorative edge variations.
    const sections = document.querySelectorAll('section[data-reveal]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-styled');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    // Observe certification cards
    const certCards = document.querySelectorAll('.cert-card');
    const certObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            certObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    certCards.forEach(card => {
      certObserver.observe(card);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollStyles);
  } else {
    initScrollStyles();
  }
})();

