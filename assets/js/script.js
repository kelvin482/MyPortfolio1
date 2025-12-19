/**
 * Main Script
 * Core functionality and utilities
 */

(function() {
  'use strict';

  /**
   * Utility functions
   */
  const utils = {
    qs: (selector) => document.querySelector(selector),
    qsa: (selector) => Array.from(document.querySelectorAll(selector))
  };

  /**
   * Initialize copyright year
   */
  function initCopyrightYear() {
    const yearElements = utils.qsa('#year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
      if (el) {
        el.textContent = currentYear;
      }
    });
  }

  /**
   * Initialize project filters
   */
  function initProjectFilters() {
    const filterButtons = utils.qsa('.chip[data-filter]');
    
    if (filterButtons.length === 0) return;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update button states
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Get filter value
        const filter = btn.dataset.filter?.trim().toLowerCase() || 'all';
        
        // Find the projects list container
        const projectsList = document.getElementById('projectsList');
        if (projectsList && typeof renderProjects === 'function') {
          renderProjects('projectsList', filter);
        }
      });
    });
  }

  /**
   * Initialize all core functionality
   */
  function init() {
    initCopyrightYear();
    initProjectFilters();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
