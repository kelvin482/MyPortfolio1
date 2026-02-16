/**
 * Command Palette
 * Cmd+Space (or Ctrl+K) style command palette for quick navigation
 */

(function() {
  'use strict';

  const commands = [
    { id: 'home', label: 'Go to Home', action: () => window.location.href = 'index.html', icon: 'ðŸ ' },
    { id: 'projects', label: 'View Projects', action: () => window.location.href = 'projects.html', icon: 'ðŸ’¼' },
    { id: 'skills', label: 'View Skills', action: () => window.location.href = 'skills.html', icon: 'âš¡' },
    { id: 'blog', label: 'View Blog', action: () => window.location.href = 'blog.html', icon: '📝' },
    { id: 'services', label: 'View Services', action: () => window.location.href = 'services.html', icon: 'ðŸ› ï¸' },
    { id: 'contact', label: 'Contact Me', action: () => window.location.href = 'contact.html', icon: 'âœ‰ï¸' },
    { id: 'about', label: 'About', action: () => window.location.href = 'about.html', icon: 'ðŸ‘¤' },
    { id: 'theme', label: 'Toggle Theme', action: () => {
      const themeToggle = document.getElementById('themeToggle');
      if (themeToggle) themeToggle.click();
    }, icon: 'ðŸŒ™' },
    { id: 'resume', label: 'Download Resume', action: () => {
      const link = document.createElement('a');
      link.href = 'assets/resume.pdf';
      link.download = 'resume.pdf';
      link.click();
    }, icon: 'ðŸ“„' }
  ];

  let palette = null;
  let input = null;
  let results = null;
  let selectedIndex = 0;
  let isOpen = false;

  function createPalette() {
    palette = document.createElement('div');
    palette.className = 'command-palette';
    palette.setAttribute('role', 'dialog');
    palette.setAttribute('aria-label', 'Command palette');
    palette.setAttribute('aria-hidden', 'true');
    palette.innerHTML = `
      <div class="command-palette-overlay"></div>
      <div class="command-palette-container">
        <div class="command-palette-header">
          <input 
            type="text" 
            class="command-palette-input" 
            placeholder="Type a command or search..."
            autocomplete="off"
            aria-label="Command input"
          >
        </div>
        <div class="command-palette-results" role="listbox"></div>
        <div class="command-palette-footer">
          <span>â†‘â†“ Navigate</span>
          <span>â†µ Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    `;
    document.body.appendChild(palette);
    
    input = palette.querySelector('.command-palette-input');
    results = palette.querySelector('.command-palette-results');
    overlay = palette.querySelector('.command-palette-overlay');

    // Event listeners
    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleKeyDown);
    overlay.addEventListener('click', closePalette);
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closePalette();
      }
      // Open with Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && !isOpen) {
        e.preventDefault();
        openPalette();
      }
      // Also support Cmd+Space on Mac
      if (e.metaKey && e.code === 'Space' && !isOpen) {
        e.preventDefault();
        openPalette();
      }
    });
  }

  function openPalette() {
    if (!palette) createPalette();
    isOpen = true;
    palette.classList.add('open');
    palette.setAttribute('aria-hidden', 'false');
    input.value = '';
    input.focus();
    selectedIndex = 0;
    filterCommands('');
  }

  function closePalette() {
    if (!palette) return;
    isOpen = false;
    palette.classList.remove('open');
    palette.setAttribute('aria-hidden', 'true');
    input.blur();
  }

  function handleInput(e) {
    const query = e.target.value.toLowerCase().trim();
    filterCommands(query);
  }

  function filterCommands(query) {
    const filtered = query 
      ? commands.filter(cmd => 
          cmd.label.toLowerCase().includes(query) || 
          cmd.id.toLowerCase().includes(query)
        )
      : commands;

    results.innerHTML = '';
    selectedIndex = 0;

    if (filtered.length === 0) {
      results.innerHTML = '<div class="command-palette-empty">No commands found</div>';
      return;
    }

    filtered.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = 'command-palette-item';
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      if (index === 0) item.classList.add('selected');
      
      item.innerHTML = `
        <span class="command-icon">${cmd.icon}</span>
        <span class="command-label">${cmd.label}</span>
      `;
      
      item.addEventListener('click', () => executeCommand(cmd));
      item.addEventListener('mouseenter', () => {
        selectedIndex = index;
        updateSelection();
      });
      
      results.appendChild(item);
    });
  }

  function handleKeyDown(e) {
    const items = results.querySelectorAll('.command-palette-item');
    
    switch(e.key) {
      case 'ArrowDown':
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection();
        break;
      case 'ArrowUp':
        e.preventDefault();
        selectedIndex = selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        updateSelection();
        break;
      case 'Enter':
        e.preventDefault();
        if (items[selectedIndex]) {
          const cmdId = items[selectedIndex].textContent.trim();
          const cmd = commands.find(c => c.label === cmdId || cmdId.includes(c.label));
          if (cmd) executeCommand(cmd);
        }
        break;
    }
  }

  function updateSelection() {
    const items = results.querySelectorAll('.command-palette-item');
    items.forEach((item, index) => {
      item.classList.toggle('selected', index === selectedIndex);
      item.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');
      if (index === selectedIndex) {
        item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  function executeCommand(cmd) {
    closePalette();
    setTimeout(() => cmd.action(), 100);
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createPalette);
  } else {
    createPalette();
  }
})();


