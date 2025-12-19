/**
 * Projects Page Logic
 * Handles project filtering and rendering on the projects page
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectsList');
  if (!container) return;

  // Initial render - show all projects
  if (typeof renderProjects === 'function') {
    renderProjects('projectsList', 'all');
  }

  // Filter functionality
  const filterButtons = document.querySelectorAll('.chip[data-filter]');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter')?.trim().toLowerCase() || 'all';

      // Update button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter and render projects
      if (typeof renderProjects === 'function') {
        renderProjects('projectsList', filter);
      }
    });
  });
});
