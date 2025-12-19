/**
 * Projects Data
 * Centralized project information for the portfolio
 */

const PROJECTS = [
  {
    id: 1,
    title: "Product Dashboard",
    category: "web",
    description: "React dashboard with real-time charts and auth",
    image: "assets/images/dashboard2.jpg.png",
    live: "#",
    code: "#"
  },
  {
    id: 2,
    title: "AI Chat Assistant",
    category: "ai",
    description: "GPT-powered assistant for support workflows",
    image: "assets/images/ai3.jpg.jpg",
    live: "#",
    code: "#"
  },
  {
    id: 3,
    title: "Portfolio Website",
    category: "web",
    description: "Modern portfolio website using React and Django",
    image: "assets/images/portfolio.jpg.png",
    live: "#",
    code: "#"
  },
  {
    id: 4,
    title: "Network Monitor",
    category: "network",
    description: "Python scripts and dashboards to monitor LAN health",
    image: "assets/images/network.jpg",
    live: "#",
    code: "#"
  },
  {
    id: 5,
    title: "Networking",
    category: "network",
    description: "Realtime monitoring system for network infrastructure",
    image: "assets/images/network2.jpg",
    live: "#",
    code: "#"
  }
];

/**
 * Renders project cards inside a specified container
 * @param {string} containerId - The ID of the container element
 * @param {string|Array} filter - Category filter ('all' by default) or array of projects
 * @param {number} limit - Optional limit for number of projects to display
 */
function renderProjects(containerId, filter = "all", limit = null) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Container with ID "${containerId}" not found`);
    return;
  }

  // Determine which projects to render
  let projectsToRender;
  
  if (Array.isArray(filter)) {
    // If filter is an array, use it directly
    projectsToRender = filter;
  } else if (filter === "all") {
    // Show all projects
    projectsToRender = PROJECTS;
  } else {
    // Filter by category
    projectsToRender = PROJECTS.filter(project => 
      project.category.toLowerCase() === filter.toLowerCase()
    );
  }

  // Apply limit if specified
  if (limit && limit > 0) {
    projectsToRender = projectsToRender.slice(0, limit);
  }

  // Clear previous content
  container.innerHTML = "";

  // Render each project as a card
  projectsToRender.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-category", project.category);

    card.innerHTML = `
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <div class="project-links">
          ${project.live ? `<a href="${project.live}" class="btn" target="_blank" rel="noopener">Live</a>` : ''}
          ${project.code ? `<a href="${project.code}" class="btn" target="_blank" rel="noopener">Code</a>` : ''}
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
