// project.js
document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    {
      title: "Product Dashboard",
      category: "web",
      description: "React dashboard with real-time charts and auth",
      image: "assets/images/dashboard2.jpg.png",
      code: "#"
    },
    {
      title: "AI Chat Assistant",
      category: "ai",
      description: "GPT-powered assistant for support workflows",
      image: "assets/images/ai3.jpg.jpg",
      code: "#"
    },
        {
      title: "Portfolio Website ",
      category: "",
      description: "Modern portfolio website using React and Django.",
      image: "assets/images/portfolio.jpg.png",
      code: "#"
    },

    {
      title: "Network Monitor",
      category: "network",
      description: "Python scripts and dashboards to monitor LAN health",
      image: "assets/images/network.jpg",
      code: "#"
    }
    
  
  ];

  const container = document.getElementById("projectsList");

  // Function to render project cards
  function renderProjects(items) {
    container.innerHTML = items.map(p => `
      <div class="project-card" data-category="${p.category}">
        <div class="project-thumb">
          <img src="${p.image}" alt="${p.title}" loading="lazy">
        </div>
        <div class="project-content">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
          <div class="project-links">
            <a href="${p.live}" class="btn" target="_blank" rel="noopener">Live</a>
            <a href="${p.code}" class="btn" target="_blank" rel="noopener">Code</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderProjects(projects);

  // Filter functionality
  const filterButtons = document.querySelectorAll(".chip");
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter").trim().toLowerCase();

      // Update button state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter logic (fixed normalization)
      const filtered =
        filter === "all"
          ? projects
          : projects.filter(p => p.category.trim().toLowerCase() === filter);

      renderProjects(filtered);
    });
  });
});
