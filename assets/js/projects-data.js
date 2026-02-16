/**
 * Projects Data
 * Centralized project information for the portfolio
 */

const PROJECTS = [
  {
    id: 1,
    title: "Clinical Decision Support Dashboard",
    category: "ai",
    description: "Doctor-facing dashboard with triage metrics, risk distribution, and clinical interpretation summaries.",
    image: "assets/images/screenshots/Screenshot (840).png",
    live: "#",
    code: "#"
  },
  {
    id: 2,
    title: "Medical Assessment Intake Flow",
    category: "ai",
    description: "Structured patient intake and morphology capture flow designed for AI-assisted diagnosis.",
    image: "assets/images/screenshots/Screenshot (839).png",
    live: "#",
    code: "#"
  },
  {
    id: 3,
    title: "AI Diagnosis Report Generator",
    category: "ai",
    description: "Printable diagnostic report page with patient details, risk labels, and clinical interpretation output.",
    image: "assets/images/screenshots/Screenshot (841).png",
    live: "#",
    code: "#"
  },
  {
    id: 4,
    title: "Role-Based Healthcare Authentication Portal",
    category: "web",
    description: "Patient and doctor sign-in interface with role selection and streamlined onboarding UI.",
    image: "assets/images/screenshots/Screenshot 2026-01-30 144710.png",
    live: "#",
    code: "#"
  },
  {
    id: 5,
    title: "TharakaHub Freelancer Dashboard",
    category: "web",
    description: "Freelancer operations dashboard showing earnings analytics, project statistics, and quick actions.",
    image: "assets/images/screenshots/Screenshot 2026-02-14 124122.png",
    live: "#",
    code: "#"
  },
  {
    id: 6,
    title: "TharakaHub Assignment Discovery Page",
    category: "web",
    description: "Assignment browsing interface with department filters and student-focused navigation.",
    image: "assets/images/screenshots/Screenshot 2025-11-03 184941.png",
    live: "#",
    code: "#"
  },
  {
    id: 7,
    title: "TharakaHub Blog and Content Module",
    category: "web",
    description: "Article listing module with category cards and editorial content previews for users.",
    image: "assets/images/screenshots/Screenshot 2025-11-03 185009.png",
    live: "#",
    code: "#"
  },
  {
    id: 8,
    title: "Branch-to-Data-Center WAN Topology",
    category: "network",
    description: "Cisco Packet Tracer design connecting branch office, teleworker home, and data center over routed links.",
    image: "assets/images/screenshots/Screenshot (385).png",
    live: "#",
    code: "#"
  },
  {
    id: 9,
    title: "Inter-Department Routing Simulation Lab",
    category: "network",
    description: "Department-segmented network simulation validating connectivity, packet paths, and command-line diagnostics.",
    image: "assets/images/screenshots/Screenshot (514).png",
    live: "#",
    code: "#"
  },
  {
    id: 10,
    title: "Physical Rack and Cabling Layout",
    category: "network",
    description: "Packet Tracer physical-mode rack visualization for switch/router placement and structured cabling.",
    image: "assets/images/screenshots/Screenshot (386).png",
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
