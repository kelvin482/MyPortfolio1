(function () {
  'use strict';

  const skillsData = [
    {
      category: 'Frontend Development',
      icon: 'FE',
      description: 'Building responsive and interactive user interfaces',
      skills: [
        { name: 'HTML5', level: 95, tools: ['Semantic HTML', 'Accessibility'] },
        { name: 'CSS3', level: 92, tools: ['Flexbox', 'Grid', 'Animations'] },
        { name: 'JavaScript', level: 90, tools: ['ES6+', 'DOM Manipulation'] },
        { name: 'React', level: 88, tools: ['Hooks', 'Context API', 'State Management'] },
        { name: 'TypeScript', level: 85, tools: ['Type Safety', 'Interfaces'] }
      ]
    },
    {
      category: 'Backend Development',
      icon: 'BE',
      description: 'Creating robust server-side applications and APIs',
      skills: [
        { name: 'Python', level: 92, tools: ['Django', 'Flask', 'REST APIs'] },
        { name: 'Django', level: 90, tools: ['ORM', 'Authentication', 'Admin'] },
        { name: 'REST APIs', level: 88, tools: ['JSON', 'Authentication', 'Documentation'] },
        { name: 'Database Design', level: 85, tools: ['PostgreSQL', 'SQLite', 'Migrations'] }
      ]
    },
    {
      category: 'DevOps and Networking',
      icon: 'OPS',
      description: 'Infrastructure management and network administration',
      skills: [
        { name: 'Linux', level: 90, tools: ['Bash', 'System Administration'] },
        { name: 'Docker', level: 85, tools: ['Containers', 'Docker Compose'] },
        { name: 'Nginx', level: 88, tools: ['Reverse Proxy', 'Load Balancing'] },
        { name: 'Network Design', level: 82, tools: ['LAN/WAN', 'Security'] }
      ]
    },
    {
      category: 'UI and UX Design',
      icon: 'UX',
      description: 'Designing intuitive and polished user experiences',
      skills: [
        { name: 'Figma', level: 88, tools: ['Prototyping', 'Design Systems'] },
        { name: 'Wireframing', level: 85, tools: ['User Flows', 'Information Architecture'] },
        { name: 'Design Systems', level: 80, tools: ['Components', 'Style Guides'] }
      ]
    },
    {
      category: 'AI and Automation',
      icon: 'AI',
      description: 'Integrating AI capabilities and automating workflows',
      skills: [
        { name: 'OpenAI API', level: 85, tools: ['GPT Integration', 'Chatbots'] },
        { name: 'LangChain', level: 80, tools: ['AI Workflows', 'Vector Stores'] },
        { name: 'Automation', level: 88, tools: ['Scripts', 'Workflows'] }
      ]
    },
    {
      category: 'Tools and Version Control',
      icon: 'VC',
      description: 'Essential development tools and collaboration',
      skills: [
        { name: 'Git', level: 95, tools: ['Version Control', 'Branching'] },
        { name: 'GitHub', level: 92, tools: ['CI/CD', 'Collaboration'] },
        { name: 'VS Code', level: 90, tools: ['Extensions', 'Debugging'] }
      ]
    },
    {
      category: 'Testing and Quality',
      icon: 'QA',
      description: 'Ensuring code quality and reliability',
      skills: [
        { name: 'Testing', level: 85, tools: ['Unit Tests', 'Integration Tests'] },
        { name: 'Debugging', level: 90, tools: ['Browser DevTools', 'Error Handling'] },
        { name: 'Code Quality', level: 88, tools: ['Linting', 'Best Practices'] }
      ]
    }
  ];

  function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function getStats() {
    const allSkills = skillsData.flatMap((category) => category.skills);
    const totalSkills = allSkills.length;
    const avgLevel = Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills);
    const strongest = allSkills.reduce((best, skill) => (skill.level > best.level ? skill : best), allSkills[0]);

    return {
      categories: skillsData.length,
      totalSkills,
      avgLevel,
      strongest
    };
  }

  function renderSummary() {
    const summaryContainer = document.getElementById('skillsSummary');
    if (!summaryContainer) return;

    const stats = getStats();
    summaryContainer.innerHTML = `
      <article class="summary-card">
        <span class="summary-label">Categories</span>
        <strong class="summary-value">${stats.categories}</strong>
      </article>
      <article class="summary-card">
        <span class="summary-label">Skill Items</span>
        <strong class="summary-value">${stats.totalSkills}</strong>
      </article>
      <article class="summary-card">
        <span class="summary-label">Average Proficiency</span>
        <strong class="summary-value">${stats.avgLevel}%</strong>
      </article>
      <article class="summary-card">
        <span class="summary-label">Strongest Skill</span>
        <strong class="summary-value">${stats.strongest.name}</strong>
      </article>
    `;
  }

  async function runBootSequence() {
    const output = document.querySelector('#terminalBody .terminal-output');
    if (!output) return;

    const steps = [
      'Loading skills database...',
      'Indexing categories...',
      'Calculating proficiency metrics...',
      'Ready.'
    ];

    output.innerHTML = '<div class="terminal-text">Loading skills database...</div>';

    for (const step of steps) {
      output.innerHTML = `<div class="terminal-text">${step}</div>`;
      await new Promise((resolve) => setTimeout(resolve, 220));
    }

    output.innerHTML = '<div class="terminal-text success">Skills database loaded successfully.</div>';
  }

  function animateProgressBars(scope) {
    const bars = scope.querySelectorAll('.progress-fill');
    bars.forEach((bar) => {
      const level = Number(bar.dataset.level || 0);
      requestAnimationFrame(() => {
        bar.style.width = `${level}%`;
      });
    });
  }

  function createSkillItem(skill) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';

    const tools = Array.isArray(skill.tools) ? skill.tools : [];
    const toolsMarkup = tools.map((tool) => `<span class="skill-badge">${tool}</span>`).join('');

    skillDiv.innerHTML = `
      <div class="skill-topline">
        <h4 class="skill-name">${skill.name}</h4>
        <span class="skill-level">${skill.level}%</span>
      </div>
      <div class="skill-progress">
        <div class="progress-bar">
          <div class="progress-fill" data-level="${skill.level}" style="width:0%"></div>
        </div>
      </div>
      <div class="skill-tools">${toolsMarkup}</div>
    `;

    return skillDiv;
  }

  function createCategoryElement(category, index) {
    const categoryDiv = document.createElement('section');
    const categoryId = slugify(category.category);
    const sortedSkills = [...category.skills].sort((a, b) => b.level - a.level);
    const average = Math.round(sortedSkills.reduce((sum, skill) => sum + skill.level, 0) / sortedSkills.length);

    categoryDiv.className = 'skill-category';
    categoryDiv.id = `skills-${categoryId}`;
    categoryDiv.style.setProperty('--skill-enter-delay', `${index * 90}ms`);

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'skill-items';
    sortedSkills.forEach((skill) => itemsContainer.appendChild(createSkillItem(skill)));

    categoryDiv.innerHTML = `
      <div class="category-header">
        <span class="category-icon">${category.icon}</span>
        <div>
          <h3 class="category-title">${category.category}</h3>
          <p class="category-description">${category.description}</p>
        </div>
      </div>
      <div class="category-meta">
        <span class="meta-badge">${sortedSkills.length} skills</span>
        <span class="meta-badge">Average ${average}%</span>
      </div>
    `;

    categoryDiv.appendChild(itemsContainer);
    return categoryDiv;
  }

  function renderSkills(container) {
    container.innerHTML = '';

    const fragment = document.createDocumentFragment();
    skillsData.forEach((category, index) => {
      const categoryEl = createCategoryElement(category, index);
      fragment.appendChild(categoryEl);
    });

    container.appendChild(fragment);

    container.querySelectorAll('.skill-category').forEach((categoryEl) => {
      requestAnimationFrame(() => {
        categoryEl.classList.add('is-visible');
      });
      animateProgressBars(categoryEl);
    });
  }

  function clearTerminal(terminalBody, terminalContent) {
    const dynamicNodes = terminalBody.querySelectorAll('.terminal-output.dynamic-output, .terminal-line.dynamic-line, .cmd-explanation');
    dynamicNodes.forEach((node) => node.remove());
    renderSkills(terminalContent);
  }

  function displayCommand(command) {
    const terminalStream = document.getElementById('terminalStream');
    if (!terminalStream) return;

    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line dynamic-line';
    commandLine.innerHTML = `
      <span class="terminal-prompt">$</span>
      <span class="terminal-command">${escapeHtml(command)}</span>
    `;

    terminalStream.appendChild(commandLine);
  }

  function displayResponse(response) {
    const terminalStream = document.getElementById('terminalStream');
    if (!terminalStream) return;

    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output dynamic-output';
    outputDiv.innerHTML = response;

    terminalStream.appendChild(outputDiv);
  }

  function getHelpResponse() {
    return `
      <div class="terminal-text info">Available commands:</div>
      <div class="terminal-text" style="margin-left:1.5rem; margin-top:0.5rem;">
        <div><span style="color: var(--accent-primary);">help</span> - Show this help message</div>
        <div><span style="color: var(--accent-primary);">list</span> - List all skill categories</div>
        <div><span style="color: var(--accent-primary);">search [skill]</span> - Search for a specific skill</div>
        <div><span style="color: var(--accent-primary);">about</span> - Show summary metrics</div>
        <div><span style="color: var(--accent-primary);">skills</span> - Re-render skills matrix</div>
        <div><span style="color: var(--accent-primary);">clear</span> - Clear terminal history</div>
      </div>
    `;
  }

  function getListResponse() {
    const categories = skillsData
      .map((category, index) => `<div>${index + 1}. ${category.category}</div>`)
      .join('');

    return `<div class="terminal-text info">Skill Categories:</div><div class="terminal-text" style="margin-left:1.5rem; margin-top:0.5rem;">${categories}</div>`;
  }

  function getSearchResponse(query) {
    if (!query || !query.trim()) {
      return '<div class="terminal-text warning">Usage: search [skill name]</div>';
    }

    const term = query.trim().toLowerCase();
    const results = [];

    skillsData.forEach((category) => {
      category.skills.forEach((skill) => {
        const skillMatch = skill.name.toLowerCase().includes(term);
        const toolMatch = skill.tools.some((tool) => tool.toLowerCase().includes(term));
        const categoryMatch = category.category.toLowerCase().includes(term);

        if (skillMatch || toolMatch || categoryMatch) {
          results.push({ category: category.category, skill });
        }
      });
    });

    if (!results.length) {
      return `<div class="terminal-text warning">No skills found matching "${escapeHtml(query)}"</div>`;
    }

    const markup = results
      .map((result, index) => {
        const tools = result.skill.tools.join(', ');
        return `
          <div style="margin-bottom:0.65rem;">
            <span style="color: var(--accent-primary); font-weight:600;">${index + 1}. ${result.skill.name}</span>
            <span style="color: var(--text-secondary);"> (${result.skill.level}%)</span>
            <span style="color: var(--accent-purple);"> - ${result.category}</span>
            <div style="margin-left:1.2rem; color: var(--text-secondary); font-size:0.9em;">Tools: ${tools}</div>
          </div>
        `;
      })
      .join('');

    return `<div class="terminal-text success">Found ${results.length} result(s) for "${escapeHtml(query)}":</div><div class="terminal-text" style="margin-left:1.1rem; margin-top:0.5rem;">${markup}</div>`;
  }

  function getAboutResponse() {
    const stats = getStats();

    return `
      <div class="terminal-text info">Skills Database Information:</div>
      <div class="terminal-text" style="margin-left:1.5rem; margin-top:0.5rem;">
        <div>Total Categories: <span style="color: var(--accent-primary);">${stats.categories}</span></div>
        <div>Total Skills: <span style="color: var(--accent-primary);">${stats.totalSkills}</span></div>
        <div>Average Proficiency: <span style="color: var(--accent-primary);">${stats.avgLevel}%</span></div>
        <div>Strongest Skill: <span style="color: var(--accent-primary);">${stats.strongest.name}</span></div>
      </div>
    `;
  }

  function getUnknownCommandResponse(command) {
    return `
      <div class="terminal-text warning">Command not found: "${escapeHtml(command)}"</div>
      <div class="terminal-text" style="margin-left:1.5rem; margin-top:0.5rem;">Type <span style="color: var(--accent-primary);">help</span> for available commands.</div>
    `;
  }

  function processCommand(rawCommand, terminalBody, terminalContent) {
    const command = rawCommand.trim().toLowerCase();
    const [mainCommand, ...rest] = command.split(/\s+/);
    const args = rest.join(' ');

    switch (mainCommand) {
      case 'help':
      case 'h':
      case '?':
        displayResponse(getHelpResponse());
        break;
      case 'list':
      case 'ls':
      case 'dir':
        displayResponse(getListResponse());
        break;
      case 'search':
      case 'find':
      case 'grep':
        displayResponse(getSearchResponse(args));
        break;
      case 'about':
      case 'info':
      case 'whoami':
        displayResponse(getAboutResponse());
        break;
      case 'skills':
      case 'show':
      case 'display':
        renderSkills(terminalContent);
        displayResponse('<div class="terminal-text info">Skills matrix refreshed.</div>');
        break;
      case 'clear':
      case 'cls':
      case 'reset':
        clearTerminal(terminalBody, terminalContent);
        break;
      default:
        displayResponse(getUnknownCommandResponse(mainCommand));
    }
  }

  function initCommandInput() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');
    const terminalStream = document.getElementById('terminalStream');
    const terminalContent = document.getElementById('skillsTerminalContent');

    if (!terminalInput || !terminalBody || !terminalContent) return;

    setTimeout(() => {
      try {
        terminalInput.focus({ preventScroll: true });
      } catch (error) {
        terminalInput.focus();
      }
    }, 350);

    terminalInput.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      event.preventDefault();

      const command = terminalInput.value.trim();
      if (!command) return;

      displayCommand(command);
      processCommand(command, terminalBody, terminalContent);

      terminalInput.value = '';
      const scrollContainer = terminalStream || terminalBody;
      scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
    });
  }

  function initTerminalControls() {
    const clearBtn = document.querySelector('.terminal-btn');
    const terminalBody = document.getElementById('terminalBody');
    const terminalContent = document.getElementById('skillsTerminalContent');

    if (!clearBtn || !terminalBody || !terminalContent) return;

    clearBtn.addEventListener('click', () => {
      clearTerminal(terminalBody, terminalContent);
      displayResponse('<div class="terminal-text info">Terminal history cleared.</div>');
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function initTerminalSkills() {
    const terminalContent = document.getElementById('skillsTerminalContent');
    if (!terminalContent) return;

    renderSummary();
    await runBootSequence();
    renderSkills(terminalContent);
  }

  function init() {
    initTerminalSkills();
    initTerminalControls();
    initCommandInput();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
