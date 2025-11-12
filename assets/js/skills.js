// ===============================================
// Skills Page JS — Dynamic Skill Cards with Harmonious Colors
// ===============================================

document.addEventListener("DOMContentLoaded", () => {
  const skillsGrid = document.getElementById("skillsGrid");
  if (!skillsGrid) return;

  const skills = [
    { category: "AI & Automation", tools: "LangChain, OpenAI API, Hugging Face", lightColor: "#FF8A65", darkColor: "#FF7043" },
    { category: "Databases", tools: "PostgreSQL, Supabase, SQLite", lightColor: "#4DB6AC", darkColor: "#26A69A" },
    { category: "Cloud & Deployment", tools: "Render, Vercel, GitHub Pages", lightColor: "#FFD54F", darkColor: "#FFCA28" },
    { category: "Version Control", tools: "Git, GitHub", lightColor: "#9575CD", darkColor: "#7E57C2" },
    { category: "Project Tools", tools: "Trello, Notion, Figma", lightColor: "#FFB74D", darkColor: "#FFA726" },
    { category: "Security", tools: "SSL, HTTPS, Firewalls", lightColor: "#4FC3F7", darkColor: "#29B6F6" },
    { category: "Testing", tools: "Postman, Pytest, Debugging", lightColor: "#AED581", darkColor: "#9CCC65" },
  ];

  const isDarkMode = document.body.classList.contains("dark") || document.body.classList.contains("dark-mode");

  skills.forEach((skill) => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `<h3>${skill.category}</h3><p>${skill.tools}</p>`;

    // Apply theme-friendly color
    card.style.backgroundColor = isDarkMode ? skill.darkColor : skill.lightColor;
    card.style.color = isDarkMode ? "#fff" : "#111"; 
    card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease";

    // Hover effect
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05)";
      card.style.boxShadow = isDarkMode
        ? "0 10px 20px rgba(255,255,255,0.15)"
        : "0 10px 20px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = isDarkMode
        ? "0 4px 10px rgba(255,255,255,0.1)"
        : "0 4px 10px rgba(0,0,0,0.1)";
    });

    skillsGrid.appendChild(card);
  });

  // Horizontal Scroll Buttons
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  if (leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      skillsGrid.scrollBy({ left: -250, behavior: "smooth" });
    });
    rightBtn.addEventListener("click", () => {
      skillsGrid.scrollBy({ left: 250, behavior: "smooth" });
    });
  }

  // Update colors dynamically on theme toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    const darkModeNow = document.body.classList.contains("light") ? false : true;
    document.querySelectorAll(".skill-card").forEach((card, index) => {
      card.style.backgroundColor = darkModeNow ? skills[index].darkColor : skills[index].lightColor;
      card.style.color = darkModeNow ? "#fff" : "#111";
    });
  });
});
