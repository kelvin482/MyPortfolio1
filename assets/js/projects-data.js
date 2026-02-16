/**
 * Projects Data
 * Centralized project information for the portfolio
 */

const PROJECTS = [
  {
    id: 1,
    title: "Clinical Decision Support Dashboard",
    category: "web",
    description: "Role-based healthcare dashboard with patient insights, risk indicators, and clinician workflow tools.",
    image: "assets/images/dashboard2.jpg.png",
    live: "#",
    code: "#"
  },
  {
    id: 2,
    title: "Cancer Diagnosis Assistant",
    category: "ai",
    description: "AI-assisted diagnostic workflow for screening support, triage guidance, and faster clinical decision-making.",
    image: "assets/images/ai3.jpg.jpg",
    live: "#",
    code: "#"
  },
  {
    id: 3,
    title: "TharakaHub Content Platform",
    category: "web",
    description: "Multi-page academic and career content platform featuring role-aware navigation and structured article publishing.",
    image: "assets/images/portfolio.jpg.png",
    live: "#",
    code: "#"
  },
  {
    id: 4,
    title: "Branch-to-Data-Center Network Design",
    category: "network",
    description: "Cisco Packet Tracer architecture connecting branch, teleworker, and data center environments with routed WAN paths.",
    image: "assets/images/network.jpg",
    live: "#",
    code: "#"
  },
  {
    id: 5,
    title: "Inter-Department Routing and Simulation Lab",
    category: "network",
    description: "Department-segmented LAN topology with router-based interconnection, endpoint services, and packet-flow validation.",
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

    const hasLive = Boolean(project.live) && project.live !== "#";
    const hasCode = Boolean(project.code) && project.code !== "#";
    const primaryLink = hasLive
      ? `<a href="${project.live}" class="btn" target="_blank" rel="noopener">View Project</a>`
      : hasCode
        ? `<a href="${project.code}" class="btn" target="_blank" rel="noopener">Source</a>`
        : "";

    card.innerHTML = `
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        ${primaryLink ? `<div class="project-links">${primaryLink}</div>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}
