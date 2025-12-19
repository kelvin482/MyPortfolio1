/**
 * About Page Interactive Controls
 * Handles button state management and content transitions
 */

(function() {
  'use strict';

  // Wait for DOM to be ready
  function init() {
    const buttons = document.querySelectorAll('.about-btn');
    const sections = document.querySelectorAll('.content-section');
    
    if (buttons.length === 0 || sections.length === 0) return;

    // Initialize: show first section
    const firstSection = document.getElementById('overview');
    if (firstSection) {
      firstSection.classList.add('active');
    }

    // Add click handlers to buttons
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetSection = this.dataset.section;
        if (!targetSection) return;

        // Update button states
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');

        // Update content sections
        sections.forEach(section => {
          if (section.id === targetSection) {
            // Fade in new section
            section.classList.remove('fade-out');
            section.classList.add('active', 'fade-in');
            
            // Remove fade-in after animation completes
            setTimeout(() => {
              section.classList.remove('fade-in');
            }, 300);
          } else {
            // Fade out inactive sections
            section.classList.remove('active', 'fade-in');
            section.classList.add('fade-out');
            
            // Remove fade-out after animation completes
            setTimeout(() => {
              section.classList.remove('fade-out');
            }, 300);
          }
        });
      });

      // Set initial aria-pressed state
      if (btn.classList.contains('active')) {
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Keyboard navigation support
    buttons.forEach((btn, index) => {
      btn.addEventListener('keydown', function(e) {
        let targetIndex = index;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          targetIndex = (index + 1) % buttons.length;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          targetIndex = (index - 1 + buttons.length) % buttons.length;
        } else if (e.key === 'Home') {
          e.preventDefault();
          targetIndex = 0;
        } else if (e.key === 'End') {
          e.preventDefault();
          targetIndex = buttons.length - 1;
        } else {
          return; // Not a navigation key
        }
        
        buttons[targetIndex].focus();
        buttons[targetIndex].click();
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

