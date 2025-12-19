/**
 * Terminal-Style Skills Page
 * Creates a modern CMD/terminal interface for displaying skills
 */

(function() {
  'use strict';

  // Skills data organized by categories
  const skillsData = [
    {
      category: 'Frontend Development',
      icon: '💻',
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
      icon: '⚙️',
      description: 'Creating robust server-side applications and APIs',
      skills: [
        { name: 'Python', level: 92, tools: ['Django', 'Flask', 'REST APIs'] },
        { name: 'Django', level: 90, tools: ['ORM', 'Authentication', 'Admin'] },
        { name: 'REST APIs', level: 88, tools: ['JSON', 'Authentication', 'Documentation'] },
        { name: 'Database Design', level: 85, tools: ['PostgreSQL', 'SQLite', 'Migrations'] }
      ]
    },
    {
      category: 'DevOps & Networking',
      icon: '🌐',
      description: 'Infrastructure management and network administration',
      skills: [
        { name: 'Linux', level: 90, tools: ['Bash', 'System Administration'] },
        { name: 'Docker', level: 85, tools: ['Containers', 'Docker Compose'] },
        { name: 'Nginx', level: 88, tools: ['Reverse Proxy', 'Load Balancing'] },
        { name: 'Network Design', level: 82, tools: ['LAN/WAN', 'Security'] }
      ]
    },
    {
      category: 'UI/UX Design',
      icon: '🎨',
      description: 'Designing intuitive and beautiful user experiences',
      skills: [
        { name: 'Figma', level: 88, tools: ['Prototyping', 'Design Systems'] },
        { name: 'Wireframing', level: 85, tools: ['User Flows', 'Information Architecture'] },
        { name: 'Design Systems', level: 80, tools: ['Components', 'Style Guides'] }
      ]
    },
    {
      category: 'AI & Automation',
      icon: '🤖',
      description: 'Integrating AI capabilities and automating workflows',
      skills: [
        { name: 'OpenAI API', level: 85, tools: ['GPT Integration', 'Chatbots'] },
        { name: 'LangChain', level: 80, tools: ['AI Workflows', 'Vector Stores'] },
        { name: 'Automation', level: 88, tools: ['Scripts', 'Workflows'] }
      ]
    },
    {
      category: 'Tools & Version Control',
      icon: '🛠️',
      description: 'Essential development tools and collaboration',
      skills: [
        { name: 'Git', level: 95, tools: ['Version Control', 'Branching'] },
        { name: 'GitHub', level: 92, tools: ['CI/CD', 'Collaboration'] },
        { name: 'VS Code', level: 90, tools: ['Extensions', 'Debugging'] }
      ]
    },
    {
      category: 'Testing & Quality',
      icon: '🧪',
      description: 'Ensuring code quality and reliability',
      skills: [
        { name: 'Testing', level: 85, tools: ['Unit Tests', 'Integration Tests'] },
        { name: 'Debugging', level: 90, tools: ['Browser DevTools', 'Error Handling'] },
        { name: 'Code Quality', level: 88, tools: ['Linting', 'Best Practices'] }
      ]
    }
  ];

  /**
   * Initialize terminal skills display
   */
  function initTerminalSkills() {
    const terminalContent = document.getElementById('skillsTerminalContent');
    if (!terminalContent) return;

    // Clear initial loading message
    setTimeout(() => {
      const loadingText = terminalContent.previousElementSibling;
      if (loadingText && loadingText.classList.contains('terminal-output')) {
        loadingText.innerHTML = '<div class="terminal-text success">✓ Skills database loaded successfully</div>';
      }

      // Render skills with sequential animation
      renderSkillsSequentially(terminalContent);
    }, 800);
  }

  /**
   * Render skills categories sequentially
   */
  function renderSkillsSequentially(container) {
    skillsData.forEach((category, categoryIndex) => {
      setTimeout(() => {
        const categoryElement = createCategoryElement(category);
        container.appendChild(categoryElement);

        // Add command explanation
        const explanation = document.createElement('div');
        explanation.className = 'cmd-explanation';
        explanation.textContent = `Displaying ${category.category.toLowerCase()} skills...`;
        container.appendChild(explanation);

        // Scroll to bottom
        const terminalBody = document.getElementById('terminalBody');
        if (terminalBody) {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }
      }, categoryIndex * 600);
    });
  }

  /**
   * Create category element with skills
   */
  function createCategoryElement(category) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category';

    // Category header
    const header = document.createElement('div');
    header.className = 'category-header';
    header.innerHTML = `
      <span class="category-icon">${category.icon}</span>
      <span class="category-title">${category.category}</span>
    `;

    // Category description
    const description = document.createElement('div');
    description.className = 'category-description';
    description.textContent = category.description;

    // Skills container
    const skillsContainer = document.createElement('div');
    skillsContainer.className = 'skill-items';

    // Create skill items
    category.skills.forEach((skill, skillIndex) => {
      setTimeout(() => {
        const skillItem = createSkillItem(skill);
        skillsContainer.appendChild(skillItem);

        // Animate progress bar
        setTimeout(() => {
          const progressFill = skillItem.querySelector('.progress-fill');
          if (progressFill) {
            progressFill.style.width = `${skill.level}%`;
          }
        }, 100);
      }, skillIndex * 150);
    });

    categoryDiv.appendChild(header);
    categoryDiv.appendChild(description);
    categoryDiv.appendChild(skillsContainer);

    return categoryDiv;
  }

  /**
   * Create individual skill item
   */
  function createSkillItem(skill) {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';

    // Skill name
    const nameDiv = document.createElement('div');
    nameDiv.className = 'skill-name';
    nameDiv.textContent = skill.name;

    // Skill tools as badges
    if (skill.tools && skill.tools.length > 0) {
      skill.tools.forEach(tool => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = tool;
        nameDiv.appendChild(badge);
      });
    }

    // Progress bar
    const progressDiv = document.createElement('div');
    progressDiv.className = 'skill-progress';

    const labelDiv = document.createElement('div');
    labelDiv.className = 'progress-label';
    labelDiv.innerHTML = `<span>Proficiency</span><span>${skill.level}%</span>`;

    const barDiv = document.createElement('div');
    barDiv.className = 'progress-bar';

    const fillDiv = document.createElement('div');
    fillDiv.className = 'progress-fill';
    fillDiv.style.width = '0%';

    barDiv.appendChild(fillDiv);
    progressDiv.appendChild(labelDiv);
    progressDiv.appendChild(barDiv);

    skillDiv.appendChild(nameDiv);
    skillDiv.appendChild(progressDiv);

    // Add hover effect
    skillDiv.addEventListener('mouseenter', () => {
      skillDiv.style.borderColor = 'var(--accent-primary)';
    });

    skillDiv.addEventListener('mouseleave', () => {
      skillDiv.style.borderColor = 'var(--border-subtle)';
    });

    return skillDiv;
  }

  /**
   * Handle terminal clear button
   */
  function initTerminalControls() {
    const clearBtn = document.querySelector('.terminal-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const terminalContent = document.getElementById('skillsTerminalContent');
        const terminalBody = document.getElementById('terminalBody');
        if (terminalContent && terminalBody) {
          terminalContent.innerHTML = '';
          // Clear all output except initial command
          const outputs = terminalBody.querySelectorAll('.terminal-output, .skill-category, .cmd-explanation');
          outputs.forEach(output => {
            if (output.id !== 'skillsTerminalContent') {
              output.remove();
            }
          });
          // Re-render skills
          setTimeout(() => {
            renderSkillsSequentially(terminalContent);
          }, 500);
        }
      });
    }
  }

  /**
   * Initialize interactive command input
   */
  function initCommandInput() {
    const terminalInput = document.getElementById('terminalInput');
    const terminalBody = document.getElementById('terminalBody');
    const terminalContent = document.getElementById('skillsTerminalContent');
    
    if (!terminalInput || !terminalBody || !terminalContent) return;

    // Focus input on load
    setTimeout(() => {
      terminalInput.focus();
    }, 1000);

    // Handle command submission
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const command = terminalInput.value.trim();
        
        if (command) {
          // Display the command
          displayCommand(command);
          
          // Process command
          processCommand(command, terminalBody, terminalContent);
          
          // Clear input
          terminalInput.value = '';
          
          // Scroll to bottom
          setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
          }, 100);
        }
      }
    });

    // Keep cursor visible when typing
    terminalInput.addEventListener('input', () => {
      const cursor = document.getElementById('terminalCursor');
      if (cursor) {
        cursor.style.opacity = '1';
      }
    });

    terminalInput.addEventListener('blur', () => {
      terminalInput.focus(); // Keep focus on input
    });
  }

  /**
   * Display user command in terminal
   */
  function displayCommand(command) {
    const terminalBody = document.getElementById('terminalBody');
    if (!terminalBody) return;

    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `
      <span class="terminal-prompt">$</span>
      <span class="terminal-command">${escapeHtml(command)}</span>
    `;
    
    const inputLine = document.getElementById('terminalInputLine');
    if (inputLine && inputLine.parentNode) {
      inputLine.parentNode.insertBefore(commandLine, inputLine);
    }
  }

  /**
   * Process user command and generate response
   */
  function processCommand(command, terminalBody, terminalContent) {
    const cmd = command.toLowerCase().trim();
    const parts = cmd.split(' ');
    const mainCmd = parts[0];
    const args = parts.slice(1).join(' ');

    let response = '';

    switch(mainCmd) {
      case 'help':
        response = getHelpResponse();
        break;
      
      case 'list':
      case 'ls':
        response = getListResponse();
        break;
      
      case 'search':
      case 'find':
        response = getSearchResponse(args);
        break;
      
      case 'clear':
      case 'cls':
        clearTerminal(terminalBody, terminalContent);
        return;
      
      case 'about':
      case 'info':
        response = getAboutResponse();
        break;
      
      case 'skills':
      case 'show':
        response = getSkillsResponse();
        break;
      
      default:
        response = getUnknownCommandResponse(mainCmd);
    }

    if (response) {
      displayResponse(response, terminalBody);
    }
  }

  /**
   * Display response in terminal
   */
  function displayResponse(response, terminalBody) {
    const outputDiv = document.createElement('div');
    outputDiv.className = 'terminal-output';
    outputDiv.innerHTML = response;
    
    const inputLine = document.getElementById('terminalInputLine');
    if (inputLine && inputLine.parentNode) {
      inputLine.parentNode.insertBefore(outputDiv, inputLine);
    }
  }

  /**
   * Get help response
   */
  function getHelpResponse() {
    return `
      <div class="terminal-text info">Available commands:</div>
      <div class="terminal-text" style="margin-left: 1.5rem; margin-top: 0.5rem;">
        <div><span style="color: var(--accent-primary);">help</span> - Show this help message</div>
        <div><span style="color: var(--accent-primary);">list</span> - List all skill categories</div>
        <div><span style="color: var(--accent-primary);">search [skill]</span> - Search for a specific skill</div>
        <div><span style="color: var(--accent-primary);">about</span> - Show information about skills</div>
        <div><span style="color: var(--accent-primary);">skills</span> - Display all skills</div>
        <div><span style="color: var(--accent-primary);">clear</span> - Clear terminal output</div>
      </div>
    `;
  }

  /**
   * Get list response
   */
  function getListResponse() {
    let list = '<div class="terminal-text info">Skill Categories:</div><div class="terminal-text" style="margin-left: 1.5rem; margin-top: 0.5rem;">';
    skillsData.forEach((category, index) => {
      list += `<div>${index + 1}. ${category.icon} ${category.category}</div>`;
    });
    list += '</div>';
    return list;
  }

  /**
   * Get search response
   */
  function getSearchResponse(query) {
    if (!query) {
      return '<div class="terminal-text warning">Usage: search [skill name]</div>';
    }

    const results = [];
    const searchTerm = query.toLowerCase();

    skillsData.forEach(category => {
      category.skills.forEach(skill => {
        if (skill.name.toLowerCase().includes(searchTerm) || 
            skill.tools.some(tool => tool.toLowerCase().includes(searchTerm))) {
          results.push({ category: category.category, skill: skill });
        }
      });
    });

    if (results.length === 0) {
      return `<div class="terminal-text warning">No skills found matching "${query}"</div>`;
    }

    let response = `<div class="terminal-text success">Found ${results.length} result(s) for "${query}":</div><div class="terminal-text" style="margin-left: 1.5rem; margin-top: 0.5rem;">`;
    results.forEach(result => {
      response += `<div><span style="color: var(--accent-primary);">${result.skill.name}</span> (${result.skill.level}%) - ${result.category}</div>`;
      if (result.skill.tools.length > 0) {
        response += `<div style="margin-left: 1rem; color: var(--text-secondary);">Tools: ${result.skill.tools.join(', ')}</div>`;
      }
    });
    response += '</div>';
    return response;
  }

  /**
   * Get about response
   */
  function getAboutResponse() {
    const totalSkills = skillsData.reduce((sum, cat) => sum + cat.skills.length, 0);
    const avgLevel = Math.round(
      skillsData.reduce((sum, cat) => 
        sum + cat.skills.reduce((s, skill) => s + skill.level, 0), 0
      ) / totalSkills
    );

    return `
      <div class="terminal-text info">Skills Database Information:</div>
      <div class="terminal-text" style="margin-left: 1.5rem; margin-top: 0.5rem;">
        <div>Total Categories: <span style="color: var(--accent-primary);">${skillsData.length}</span></div>
        <div>Total Skills: <span style="color: var(--accent-primary);">${totalSkills}</span></div>
        <div>Average Proficiency: <span style="color: var(--accent-primary);">${avgLevel}%</span></div>
        <div style="margin-top: 0.5rem;">Type <span style="color: var(--accent-primary);">help</span> for available commands</div>
      </div>
    `;
  }

  /**
   * Get skills response
   */
  function getSkillsResponse() {
    return '<div class="terminal-text info">All skills are displayed above. Use "search [skill]" to find specific skills.</div>';
  }

  /**
   * Get unknown command response
   */
  function getUnknownCommandResponse(cmd) {
    return `
      <div class="terminal-text warning">Command not found: "${cmd}"</div>
      <div class="terminal-text" style="margin-left: 1.5rem; margin-top: 0.5rem;">
        Type <span style="color: var(--accent-primary);">help</span> for available commands
      </div>
    `;
  }

  /**
   * Clear terminal
   */
  function clearTerminal(terminalBody, terminalContent) {
    terminalContent.innerHTML = '';
    const outputs = terminalBody.querySelectorAll('.terminal-output, .skill-category, .cmd-explanation');
    outputs.forEach(output => {
      if (output.id !== 'skillsTerminalContent' && !output.classList.contains('terminal-line')) {
        output.remove();
      }
    });
    // Re-render skills
    setTimeout(() => {
      renderSkillsSequentially(terminalContent);
    }, 500);
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTerminalSkills();
      initTerminalControls();
      initCommandInput();
    });
  } else {
    initTerminalSkills();
    initTerminalControls();
    initCommandInput();
  }
})();

