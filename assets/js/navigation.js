/**
 * Navigation Management
 * Handles mobile menu and active link highlighting
 */

(function() {
  'use strict';

  /**
   * Initialize mobile navigation
   */
  function initMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    const menuButtons = document.querySelectorAll('.menu-btn');
    const closeButton = document.getElementById('closeMobileNav');

    if (!mobileNav) return;

    // Open mobile nav
    menuButtons.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          mobileNav.classList.add('open');
          document.body.style.overflow = 'hidden';
        });
      }
    });

    // Close mobile nav
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    // Close on link click
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /**
   * Highlight active navigation link based on current page
   */
  function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav a, .mobile-links a');

    navLinks.forEach(link => {
      try {
        const linkPath = link.getAttribute('href');
        if (linkPath && (currentPath.endsWith(linkPath) || 
            (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html'))))) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } catch (e) {
        // Silently handle errors
        console.debug('Navigation link processing error:', e);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initMobileNav();
      highlightActiveLink();
    });
  } else {
    initMobileNav();
    highlightActiveLink();
  }
})();

