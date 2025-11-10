// ================= Projects Data =================
const projects = [
  {
    title: "AI Chat Assistant",
    category: "ai",
    image: "assets/images/ai3.jpg.jpg",
    description: "AI-powered chat assistant for customer support.",
    github: "https://github.com/username/ai-chat"
  },
  {
    title: "Networking",
    category: "network",
    image: "assets/images/network.jpg",
    description: "Realtime monitoring system for network infrastructure.",
    github: "https://github.com/username/network-monitor"
  },
  {
    title: "Portfolio Website",
    category: "web",
    image: "assets/images/portfolio.jpg.png",
    description: "Modern portfolio website using React and Django.",
    github: "https://github.com/username/portfolio"
  }
  // Add more projects here
];

// ================= Render Projects Function =================
/**
 * Renders project cards inside a specified container.
 * 
 * @param {string} containerId - The ID of the container element
 * @param {string} filter - Optional: category filter ('all' by default)
 */
function renderProjects(containerId, filter = "all") {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear previous content
  container.innerHTML = "";

  // Filter projects based on category
  const filteredProjects = filter === "all"
    ? projects
    : projects.filter(project => project.category === filter);

  // Render each project as a card
  filteredProjects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-thumb">
        <img src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-content">
        <h4>${project.title}</h4>
        <p>${project.description}</p>
        <div class="project-links">
          <a href="${project.link}">View</a>
          <a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
