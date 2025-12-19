/**
 * Theme Management
 * Handles dark/light mode toggle across all pages
 */

(function() {
  'use strict';

  const root = document.documentElement;
  const themeKey = CONFIG.theme.storageKey;
  const defaultTheme = CONFIG.theme.defaultTheme;

  /**
   * Apply theme to the document
   * @param {string} theme - 'light' or 'dark'
   */
  function applyTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    
    localStorage.setItem(themeKey, theme);
    updateThemeToggleButtons(theme);
  }

  /**
   * Update all theme toggle buttons with appropriate icon
   * @param {string} theme - Current theme
   */
  function updateThemeToggleButtons(theme) {
    CONFIG.theme.toggleIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.textContent = theme === 'light' ? '🌞' : '🌙';
        btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
      }
    });
  }

  /**
   * Toggle between light and dark theme
   */
  function toggleTheme() {
    const currentTheme = root.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(themeKey) || defaultTheme;
    applyTheme(savedTheme);
  }

  /**
   * Attach event listeners to all theme toggle buttons
   */
  function attachThemeListeners() {
    CONFIG.theme.toggleIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', toggleTheme);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTheme();
      attachThemeListeners();
    });
  } else {
    initTheme();
    attachThemeListeners();
  }
})();

