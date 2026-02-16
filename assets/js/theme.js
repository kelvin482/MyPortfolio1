/**
 * Theme Management
 * Dark-mode only lock for the entire portfolio.
 */

(function () {
  'use strict';

  const root = document.documentElement;
  const themeKey = CONFIG.theme.storageKey;

  function applyDarkTheme() {
    root.classList.remove('light');
    localStorage.setItem(themeKey, 'dark');
    updateThemeButtons();
  }

  function updateThemeButtons() {
    CONFIG.theme.toggleIds.forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.textContent = '🌙';
      btn.setAttribute('aria-label', 'Dark mode only');
      btn.setAttribute('title', 'Dark mode only');
    });
  }

  function blockThemeToggle(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    applyDarkTheme();
  }

  function attachThemeListeners() {
    CONFIG.theme.toggleIds.forEach((id) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.addEventListener('click', blockThemeToggle);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      applyDarkTheme();
      attachThemeListeners();
    });
  } else {
    applyDarkTheme();
    attachThemeListeners();
  }
})();

