/**
 * Skills Page Logic - Modern Interactive Features
 * Professional UX/UI with animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  const skillsGrid = document.getElementById('skillsGrid');
  if (!skillsGrid) return;

  // Enhanced skills data with levels and icons
  const skills = [
    { 
      category: 'AI & Automation', 
      tools: 'LangChain, OpenAI API, Hugging Face',
      level: 85,
      icon: '🤖',
      color: { light: '#FF8A65', dark: '#FF7043' },
      description: 'Building intelligent systems and automating workflows'
    },
    { 
      category: 'Databases', 
      tools: 'PostgreSQL, Supabase, SQLite',
      level: 90,
      icon: '🗄️',
      color: { light: '#4DB6AC', dark: '#26A69A' },
      description: 'Designing and managing efficient database systems'
    },
    { 
      category: 'Cloud & Deployment', 
      tools: 'Render, Vercel, GitHub Pages',
      level: 88,
      icon: '☁️',
      color: { light: '#FFD54F', dark: '#FFCA28' },
      description: 'Deploying scalable applications to the cloud'
    },
    { 
      category: 'Version Control', 
      tools: 'Git, GitHub',
      level: 95,
      icon: '📦',
      color: { light: '#9575CD', dark: '#7E57C2' },
      description: 'Managing code versions and collaboration workflows'
    },
    { 
      category: 'Project Tools', 
      tools: 'Trello, Notion, Figma',
      level: 92,
      icon: '🛠️',
      color: { light: '#FFB74D', dark: '#FFA726' },
      description: 'Streamlining project management and design processes'
    },
    { 
      category: 'Security', 
      tools: 'SSL, HTTPS, Firewalls',
      level: 80,
      icon: '🔒',
      color: { light: '#4FC3F7', dark: '#29B6F6' },
      description: 'Implementing robust security measures'
    },
    { 
      category: 'Testing', 
      tools: 'Postman, Pytest, Debugging',
      level: 87,
      icon: '🧪',
      color: { light: '#AED581', dark: '#9CCC65' },
      description: 'Ensuring code quality through comprehensive testing'
    }
  ];

  /**
   * Check if dark mode is active
   * @returns {boolean}
   */
  function isDarkMode() {
    return !document.documentElement.classList.contains('light');
  }

  /**
   * Create skill badges from tools string
   * @param {string} tools - Comma-separated tools
   * @returns {string} HTML for badges
   */
  function createSkillBadges(tools) {
    const toolList = tools.split(',').map(t => t.trim());
    return toolList.map(tool => 
      `<span class="skill-badge">${tool}</span>`
    ).join('');
  }

  /**
   * Create skill card with interactive features
   * @param {Object} skill - Skill data object
   * @returns {HTMLElement} Skill card element
   */
  function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    
    const darkMode = isDarkMode();
    const bgColor = darkMode ? skill.color.dark : skill.color.light;
    
    card.style.setProperty('--skill-color', bgColor);
    
    card.innerHTML = `
      <div>
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${skill.icon}</div>
        <h3>${skill.category}</h3>
        <p>${skill.description}</p>
        <div class="skill-badges">
          ${createSkillBadges(skill.tools)}
        </div>
      </div>
      <div class="skill-level">
        <div class="skill-level-bar">
          <div class="skill-level-fill" data-level="${skill.level}" style="background: linear-gradient(90deg, ${bgColor}, ${darkMode ? '#FF7043' : '#FF8A65'});"></div>
        </div>
        <div class="skill-level-text">${skill.level}% Proficiency</div>
      </div>
      <div class="skill-tooltip">Click to learn more about ${skill.category}</div>
    `;

    // Add interactive click handler
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
      
      // Optional: Show detailed info modal or expand card
      console.log(`Selected: ${skill.category}`);
    });

    // Enhanced hover effects
    card.addEventListener('mouseenter', () => {
      const fill = card.querySelector('.skill-level-fill');
      if (fill) {
        const level = fill.dataset.level;
        fill.style.width = `${level}%`;
      }
    });

    // Animate skill level on scroll into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-level-fill');
          if (fill) {
            const level = fill.dataset.level;
            setTimeout(() => {
              fill.style.width = `${level}%`;
            }, 200);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(card);

    return card;
  }

  /**
   * Apply theme-friendly colors to skill cards
   */
  function applySkillCardColors() {
    const darkMode = isDarkMode();
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
      if (skills[index]) {
        const skill = skills[index];
        const bgColor = darkMode ? skill.color.dark : skill.color.light;
        
        // Update skill level fill color
        const fill = card.querySelector('.skill-level-fill');
        if (fill) {
          fill.style.background = `linear-gradient(90deg, ${bgColor}, ${darkMode ? '#FF7043' : '#FF8A65'})`;
        }
      }
    });
  }

  // Create and append skill cards
  skills.forEach((skill) => {
    const card = createSkillCard(skill);
    skillsGrid.appendChild(card);
  });

  // Apply initial colors
  applySkillCardColors();

  // Update colors when theme changes
  const themeToggles = document.querySelectorAll('[id^="themeToggle"]');
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      setTimeout(() => {
        applySkillCardColors();
        // Re-animate skill levels
        document.querySelectorAll('.skill-level-fill').forEach(fill => {
          const level = fill.dataset.level;
          fill.style.width = '0';
          setTimeout(() => {
            fill.style.width = `${level}%`;
          }, 100);
        });
      }, 100);
    });
  });

  // Enhanced scroll buttons with smooth scrolling
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      skillsGrid.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      skillsGrid.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && leftBtn) {
      leftBtn.click();
    } else if (e.key === 'ArrowRight' && rightBtn) {
      rightBtn.click();
    }
  });

  // Add parallax effect on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
      const speed = (index % 2 === 0 ? 0.5 : -0.5) * 0.1;
      const yPos = (currentScroll - lastScroll) * speed;
      card.style.transform += ` translateY(${yPos}px)`;
    });
    
    lastScroll = currentScroll;
  });
});
