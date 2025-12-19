/**
 * Horizontal Scroll Animations
 * Handles scroll-based style variations for horizontal project cards
 */

(function() {
  'use strict';

  function initHorizontalScroll() {
    const projectGrid = document.querySelector('.projects-preview .project-grid');
    if (!projectGrid) return;

    const projectCards = projectGrid.querySelectorAll('.project-card');
    if (projectCards.length === 0) return;

    // Create intersection observer for scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add delay based on card index for staggered effect
            setTimeout(() => {
              entry.target.classList.add('scroll-visible');
            }, index * 150); // 150ms delay between each card
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe each project card
    projectCards.forEach(card => {
      observer.observe(card);
    });

    // Add smooth scroll on wheel event (horizontal scrolling)
    let isScrolling = false;
    projectGrid.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        projectGrid.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    projectGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    projectGrid.addEventListener('touchmove', (e) => {
      if (Math.abs(e.touches[0].clientX - touchStartX) > Math.abs(e.touches[0].clientY - touchStartY)) {
        // Horizontal scroll
        e.preventDefault();
        projectGrid.scrollLeft -= (e.touches[0].clientX - touchStartX);
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: false });
  }

  // Wait for projects to be rendered
  function waitForProjects() {
    const projectGrid = document.querySelector('.projects-preview .project-grid');
    if (projectGrid && projectGrid.children.length > 0) {
      initHorizontalScroll();
    } else {
      // Retry after a short delay if projects haven't loaded yet
      setTimeout(waitForProjects, 100);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForProjects);
  } else {
    waitForProjects();
  }
})();

