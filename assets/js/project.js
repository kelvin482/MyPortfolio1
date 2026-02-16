/**
 * Projects Page Logic
 * Handles project filtering and rendering on the projects page
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('projectsList');
  if (!container) return;

  const totalCountEl = document.getElementById('repoTotalCount');
  const webCountEl = document.getElementById('repoWebCount');
  const aiCountEl = document.getElementById('repoAiCount');
  const networkCountEl = document.getElementById('repoNetworkCount');
  const resultCountEl = document.getElementById('projectsResultCount');
  const filterLabelEl = document.getElementById('activeFilterLabel');

  const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : (typeof PROJECTS !== 'undefined' ? PROJECTS : []);
  const getCategoryCount = (category) => projects.filter((item) => String(item.category).toLowerCase() === category).length;
  const toTitle = (text) => text ? text.charAt(0).toUpperCase() + text.slice(1) : 'All';

  if (totalCountEl) totalCountEl.textContent = String(projects.length);
  if (webCountEl) webCountEl.textContent = String(getCategoryCount('web'));
  if (aiCountEl) aiCountEl.textContent = String(getCategoryCount('ai'));
  if (networkCountEl) networkCountEl.textContent = String(getCategoryCount('network'));

  function updateToolbar(filter, total) {
    if (resultCountEl) resultCountEl.textContent = String(total);
    if (filterLabelEl) filterLabelEl.textContent = toTitle(filter === 'all' ? 'all' : filter);
  }

  // Initial render - show all projects
  if (typeof renderProjects === 'function') {
    renderProjects('projectsList', 'all');
    updateToolbar('all', projects.length);
  }

  window.addEventListener('km:projectsRendered', (event) => {
    const detail = event.detail || {};
    if (detail.containerId !== 'projectsList') return;
    updateToolbar(String(detail.filter || 'all').toLowerCase(), Number(detail.total || 0));
  });

  // Prevent duplicate filter listeners if shared script already initialized them.
  if (!window.__KM_PROJECT_FILTERS_BOUND) {
    window.__KM_PROJECT_FILTERS_BOUND = true;

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
  }
});
