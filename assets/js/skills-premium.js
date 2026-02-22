/**
 * Skills Premium Page Logic
 * - Scroll reveal (threshold: 0.07, stagger: i * 70ms)
 * - Interactive terminal commands
 */

(function () {
  "use strict";

  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  if (revealNodes.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const index = Number(node.dataset.revealIndex || 0);
          window.setTimeout(() => {
            node.classList.add("on");
          }, index * 70);
          observer.unobserve(node);
        });
      },
      { threshold: 0.07 }
    );

    revealNodes.forEach((node, index) => {
      node.dataset.revealIndex = String(index);
      observer.observe(node);
    });
  }

  const terminalStream = document.getElementById("terminalStream");
  const terminalInput = document.getElementById("terminalInput");
  const clearBtn = document.getElementById("terminalClear");
  const terminalBody = document.getElementById("terminalBody");

  if (!terminalStream || !terminalInput || !clearBtn || !terminalBody) return;

  const catalog = [
    { category: "Frontend", tags: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind", "Next.js"] },
    { category: "Backend", tags: ["Python", "Django", "FastAPI", "Node.js", "REST API", "GraphQL"] },
    { category: "Databases", tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"] },
    { category: "DevOps", tags: ["Docker", "Kubernetes", "Linux", "CI/CD", "Git", "GitHub Actions"] },
    { category: "AI / ML", tags: ["TensorFlow", "PyTorch", "scikit-learn", "LangChain", "LLMs"] },
    { category: "Design", tags: ["Figma", "Prototyping", "Design Systems", "Responsive", "Accessibility"] }
  ];

  const commands = {
    help: () => [
      { type: "accent", text: "Available commands:" },
      { text: "help  - show this command list" },
      { text: "list  - list all skill categories and tags" },
      { text: "search [skill]  - find a skill and category" },
      { text: "about - profile summary" },
      { text: "clear - clear terminal output" }
    ],
    list: () => {
      const lines = [{ type: "accent", text: "Skill categories:" }];
      catalog.forEach((entry) => {
        lines.push({ text: `${entry.category}: ${entry.tags.join(", ")}` });
      });
      return lines;
    },
    about: () => [
      { type: "accent", text: "Profile summary:" },
      { text: "Name: Kelvin Mutwiri" },
      { text: "Role: Full-Stack Developer" },
      { text: "Experience: 5+ years" },
      { text: "Availability: Open to projects and collaborations" }
    ]
  };

  addBootLines();

  terminalInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const value = terminalInput.value.trim();
    if (!value) return;

    printCommand(value);
    execute(value);
    terminalInput.value = "";
    scrollToBottom();
  });

  clearBtn.addEventListener("click", () => {
    clearTerminal();
  });

  function execute(raw) {
    const [base, ...rest] = raw.split(/\s+/);
    const command = base.toLowerCase();

    if (command === "clear") {
      clearTerminal();
      return;
    }

    if (command === "search") {
      const query = rest.join(" ").trim().toLowerCase();
      if (!query) {
        printOutput([{ type: "error", text: "Usage: search [skill]" }]);
        return;
      }
      const matches = [];
      catalog.forEach((entry) => {
        entry.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(query)) {
            matches.push(`${tag} -> ${entry.category}`);
          }
        });
      });

      if (!matches.length) {
        printOutput([{ type: "error", text: `No skill match found for "${query}".` }]);
        return;
      }

      printOutput([{ type: "accent", text: `Matches for "${query}":` }, ...matches.map((m) => ({ text: m }))]);
      return;
    }

    const action = commands[command];
    if (!action) {
      printOutput([{ type: "error", text: `Unknown command: ${command}. Try "help".` }]);
      return;
    }

    printOutput(action());
  }

  function clearTerminal() {
    terminalStream.innerHTML = "";
    addBootLines();
    scrollToBottom();
  }

  function addBootLines() {
    printOutput([
      { type: "accent", text: "skills.terminal ready" },
      { text: "Type \"help\" to view available commands." }
    ]);
  }

  function printCommand(value) {
    const line = document.createElement("div");
    line.className = "skp-line";
    line.innerHTML = `<span class="prompt">$</span><span>${escapeHtml(value)}</span>`;
    terminalStream.appendChild(line);
  }

  function printOutput(lines) {
    lines.forEach((item) => {
      const out = document.createElement("div");
      out.className = "skp-output";
      if (item.type === "accent") out.classList.add("accent");
      if (item.type === "error") out.classList.add("error");
      out.textContent = item.text;
      terminalStream.appendChild(out);
    });
  }

  function scrollToBottom() {
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
