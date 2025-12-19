/**
 * Navigation Dots Component
 * Side navigation dots that highlight active sections on scroll
 */

(function() {
  'use strict';

  function initNavigationDots() {
    // Only create dots on desktop (hide on mobile)
    if (window.innerWidth < 900) return;

    const sections = document.querySelectorAll('main > section[data-reveal]');
    if (sections.length === 0) return;

    // Create dots container
    const dotsContainer = document.createElement('nav');
    dotsContainer.className = 'nav-dots';
    dotsContainer.setAttribute('aria-label', 'Section navigation');
    document.body.appendChild(dotsContainer);

    // Create dot for each section
    sections.forEach((section, index) => {
      const dot = document.createElement('button');
      dot.className = 'nav-dot';
      dot.setAttribute('aria-label', `Go to section ${index + 1}`);
      dot.setAttribute('data-section-index', index);
      
      // Add tooltip with section name
      const sectionId = section.id || section.className.split(' ')[0];
      const sectionName = sectionId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      dot.setAttribute('title', sectionName);
      
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sectionIndex = Array.from(sections).indexOf(entry.target);
          const dot = dotsContainer.querySelector(`[data-section-index="${sectionIndex}"]`);
          
          if (dot) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              // Remove active from all dots
              dotsContainer.querySelectorAll('.nav-dot').forEach(d => {
                d.classList.remove('active');
              });
              // Add active to current dot
              dot.classList.add('active');
            }
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth < 900 && dotsContainer.parentNode) {
          dotsContainer.remove();
        } else if (window.innerWidth >= 900 && !dotsContainer.parentNode) {
          // Reinitialize if resized back to desktop
          initNavigationDots();
        }
      }, 250);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigationDots);
  } else {
    initNavigationDots();
  }
})();


