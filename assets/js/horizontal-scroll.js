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

    const hasHorizontalOverflow = () => projectGrid.scrollWidth > projectGrid.clientWidth + 2;

    // Add smooth wheel-to-horizontal behavior only when overflow exists.
    projectGrid.addEventListener('wheel', (e) => {
      if (!hasHorizontalOverflow()) return;

      const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      if (delta === 0) return;

      const atStart = projectGrid.scrollLeft <= 0;
      const atEnd = projectGrid.scrollLeft + projectGrid.clientWidth >= projectGrid.scrollWidth - 1;

      // Let normal page scroll continue when user reaches the horizontal edges.
      if ((delta < 0 && atStart) || (delta > 0 && atEnd)) return;

      e.preventDefault();
      projectGrid.scrollBy({ left: delta * 0.9, behavior: 'smooth' });
    }, { passive: false });

    // Add touch support for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    projectGrid.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    projectGrid.addEventListener('touchmove', (e) => {
      if (!hasHorizontalOverflow()) return;

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

