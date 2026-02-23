/**
 * Projects Data
 * Centralized project information for the portfolio
 */

const PROJECTS = [
  {
    id: 1,
    title: "Cancer Assessment - Clinical Dashboard",
    category: "ai",
    description: "Clinical dashboard for patient triage, risk indicators, and doctor-facing decision support metrics.",
    image: "assets/images/PROJECTS/CANCER_ASSESMENT/DASHBOARD.png",
    live: "#",
    code: "#"
  },
  {
    id: 2,
    title: "Cancer Assessment - Intake Form Workflow",
    category: "ai",
    description: "Structured intake interface for symptom capture and assessment feature entry before model evaluation.",
    image: "assets/images/PROJECTS/CANCER_ASSESMENT/ASSESMENTS.png",
    live: "#",
    code: "#"
  },
  {
    id: 3,
    title: "Cancer Assessment - Diagnosis Report View",
    category: "ai",
    description: "Report-style results page presenting diagnostic output, risk context, and interpretation summary.",
    image: "assets/images/PROJECTS/CANCER_ASSESMENT/REPORTS.png",
    live: "#",
    code: "#"
  },
  {
    id: 4,
    title: "Cow Calving - Login Portal",
    category: "web",
    description: "Authentication screen for the livestock workflow platform with clean, role-based access entry.",
    image: "assets/images/PROJECTS/COW CALVING/COW CALVING LOGIN.png",
    live: "#",
    code: "#"
  },
  {
    id: 5,
    title: "TharakaHub - Main Dashboard",
    category: "web",
    description: "Primary operations dashboard with project visibility, user flow, and analytics highlights.",
    image: "assets/images/PROJECTS/THARAKA HUB/dashboard2.jpg.png",
    live: "#",
    code: "#"
  },
  {
    id: 6,
    title: "TharakaHub - Assignment Discovery",
    category: "web",
    description: "Assignment listing interface with category browsing and streamlined academic content navigation.",
    image: "assets/images/PROJECTS/THARAKA HUB/Screenshot 2025-11-03 184941.png",
    live: "#",
    code: "#"
  },
  {
    id: 7,
    title: "TharakaHub - Blog Module",
    category: "web",
    description: "Editorial and blog layout for publishing updates, learning resources, and category-based posts.",
    image: "assets/images/PROJECTS/THARAKA HUB/Screenshot 2025-11-03 185009.png",
    live: "#",
    code: "#"
  },
  {
    id: 8,
    title: "Networking Lab - Branch WAN Topology",
    category: "network",
    description: "Packet Tracer topology connecting branch and central network zones across routed infrastructure.",
    image: "assets/images/PROJECTS/NETWORKING/Screenshot (385).png",
    live: "#",
    code: "#"
  },
  {
    id: 9,
    title: "Networking Lab - Physical Rack Layout",
    category: "network",
    description: "Physical-mode rack planning with device placement and cable paths for deployment readiness.",
    image: "assets/images/PROJECTS/NETWORKING/Screenshot (386).png",
    live: "#",
    code: "#"
  },
  {
    id: 10,
    title: "Networking Lab - Routed Segment Simulation",
    category: "network",
    description: "Simulation of routed segments and path behavior for diagnostics, testing, and packet validation.",
    image: "assets/images/PROJECTS/NETWORKING/Screenshot (512).png",
    live: "#",
    code: "#"
  },
  {
    id: 11,
    title: "Networking Lab - Interconnect Validation",
    category: "network",
    description: "Connectivity validation scenario for inter-device communication and network state checks.",
    image: "assets/images/PROJECTS/NETWORKING/Screenshot (513).png",
    live: "#",
    code: "#"
  },
  {
    id: 12,
    title: "Tech Support - Landing Experience",
    category: "web",
    description: "Front-facing service landing page for tech support with clear messaging and conversion sections.",
    image: "assets/images/PROJECTS/TECH SUPPORT/TechsupportMeru.jpeg",
    live: "#",
    code: "#"
  },
  {
    id: 13,
    title: "Tech Support - Ticketing Interface",
    category: "web",
    description: "Ticket flow interface designed for issue logging, priority handling, and support request tracking.",
    image: "assets/images/PROJECTS/TECH SUPPORT/Tickets.jpeg",
    live: "#",
    code: "#"
  },
  {
    id: 14,
    title: "Tech Support - Smart Support Module",
    category: "web",
    description: "Guided support module focused on fast problem routing and assisted troubleshooting experience.",
    image: "assets/images/PROJECTS/TECH SUPPORT/smartsupport.jpeg",
    live: "#",
    code: "#"
  },
  {
    id: 15,
    title: "Tech Support - Trust & Why Us Section",
    category: "web",
    description: "Brand trust section presenting service value, reliability points, and customer assurance blocks.",
    image: "assets/images/PROJECTS/TECH SUPPORT/Whyus.jpeg",
    live: "#",
    code: "#"
  }
];

window.PROJECTS = PROJECTS;

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

  const isRepositoryView = containerId === "projectsList";

  // Render each project as a card
  projectsToRender.forEach(project => {
    const categoryLabel = String(project.category || "project").toUpperCase();
    const metaTags = [categoryLabel, "Portfolio"];

    const card = document.createElement("article");
    card.className = "project-card card-visible";
    card.setAttribute("data-category", project.category);

    const hasLive = Boolean(project.live) && project.live !== "#";
    const hasCode = Boolean(project.code) && project.code !== "#";
    const primaryLink = hasLive
      ? `<a href="${project.live}" class="btn" target="_blank" rel="noopener">View Project</a>`
      : hasCode
        ? `<a href="${project.code}" class="btn" target="_blank" rel="noopener">Source</a>`
        : "";

    const cardHeader = isRepositoryView
      ? `
      <header class="repo-card-head card-visible">
        <span class="project-type">${categoryLabel}</span>
        <span class="project-id">#${project.id}</span>
      </header>`
      : "";
    const cardMeta = isRepositoryView
      ? `
        <div class="project-meta">
          ${metaTags.map(tag => `<span class="meta-tag">${tag}</span>`).join("")}
        </div>`
      : "";

    card.innerHTML = `
      ${cardHeader}
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}" loading="lazy">
      </div>
      <div class="project-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        ${cardMeta}
        ${primaryLink ? `<div class="project-links">${primaryLink}</div>` : ""}
      </div>
    `;

    container.appendChild(card);
  });

  window.dispatchEvent(new CustomEvent("km:projectsRendered", {
    detail: {
      containerId,
      filter,
      total: projectsToRender.length
    }
  }));
}
