/**
 * Scroll-Based Style Variations
 * Adds different styles to containers as they appear on scroll
 */

(function() {
  'use strict';

  function initScrollStyles() {
    // Observe all sections for style variations
    const sections = document.querySelectorAll('section[data-reveal]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add style variation class based on section index
            const variationClass = `style-variation-${(index % 4) + 1}`;
            entry.target.classList.add('scroll-styled', variationClass);
            
            // Add staggered animation delay
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 100);
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
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('scroll-visible');
            }, index * 150);
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

