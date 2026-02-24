/**
 * Premium Projects Page Logic
 * - Filter pills
 * - Featured + other project rendering
 * - Show all / show less toggle
 * - Scroll reveal with IntersectionObserver
 */

document.addEventListener("DOMContentLoaded", () => {
  const featuredRoot = document.getElementById("featuredProjects");
  const otherRoot = document.getElementById("otherProjects");
  const toggleOtherBtn = document.getElementById("toggleOther");
  const filterPills = Array.from(document.querySelectorAll(".pill[data-filter]"));

  if (!featuredRoot || !otherRoot || !toggleOtherBtn) return;

  const sourceProjects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const projects = sourceProjects.map((project, index) => normalizeProject(project, index));

  const state = {
    activeFilter: "all",
    expanded: false
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.dataset.revealDelay || 0);
        window.setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  observeReveals(document.querySelectorAll(".reveal-base"));

  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const selectedFilter = String(pill.dataset.filter || "all").toLowerCase();
      if (selectedFilter === state.activeFilter) return;
      state.activeFilter = selectedFilter;
      state.expanded = false;
      setActivePill();
      renderAll(true);
    });
  });

  toggleOtherBtn.addEventListener("click", () => {
    state.expanded = !state.expanded;
    switchContainer([otherRoot], () => {
      renderOther();
    });
  });

  setActivePill();
  renderAll(false);

  function renderAll(withTransition) {
    if (withTransition) {
      switchContainer([featuredRoot, otherRoot], () => {
        renderFeatured();
        renderOther();
      });
      return;
    }
    renderFeatured();
    renderOther();
  }

  function renderFeatured() {
    const visibleFeatured = projects
      .filter((project) => matchesFilter(project, state.activeFilter))
      .slice(0, 3);
    featuredRoot.innerHTML = "";

    if (!visibleFeatured.length) {
      featuredRoot.appendChild(createEmptyCard("No featured project matches this filter yet."));
      observeReveals(featuredRoot.querySelectorAll(".reveal"));
      return;
    }

    visibleFeatured.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "card feature-card project-item enter reveal";
      card.dataset.revealDelay = String(index * 80);
      card.dataset.cat = project.filterKeys.join(" ");

      card.innerHTML = `
        <div class="feature-visual">
          <img src="${project.image}" alt="${escapeHtml(project.title)} screenshot" loading="lazy" onerror="this.onerror=null;this.src='${project.fallbackImage}'">
        </div>
        <div class="feature-content">
          <div class="feature-top">
            <p class="project-number">Project ${String(project.id).padStart(2, "0")}</p>
            <div class="tag-row">${buildCategoryBadges(project.categoryTags)}</div>
          </div>
          <h2 class="feature-title">${escapeHtml(project.title)}</h2>
          <p class="feature-description">${escapeHtml(project.description)}</p>
          <div class="tech-row">${buildTechChips(project.techStack)}</div>
          <div class="feature-footer">
            ${buildArrowLink(project.live, project.code, project.title)}
          </div>
        </div>
      `;

      featuredRoot.appendChild(card);
    });

    observeReveals(featuredRoot.querySelectorAll(".reveal"));
  }

  function renderOther() {
    const filteredOthers = projects
      .filter((project) => matchesFilter(project, state.activeFilter))
      .slice(3);
    const visibleOthers = state.expanded ? filteredOthers : filteredOthers.slice(0, 6);

    otherRoot.innerHTML = "";

    if (!filteredOthers.length) {
      otherRoot.appendChild(createEmptyCard("No projects in this category yet."));
      toggleOtherBtn.hidden = true;
      observeReveals(otherRoot.querySelectorAll(".reveal"));
      return;
    }

    toggleOtherBtn.hidden = filteredOthers.length <= 6;
    toggleOtherBtn.textContent = state.expanded ? "Show less \u2192" : "Show all \u2192";

    visibleOthers.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "card other-card project-item enter reveal";
      card.dataset.revealDelay = String(index * 80);
      card.dataset.cat = project.filterKeys.join(" ");

      card.innerHTML = `
        <div class="other-media">
          <img src="${project.image}" alt="${escapeHtml(project.title)} preview" loading="lazy" onerror="this.onerror=null;this.src='${project.fallbackImage}'">
          <div class="other-top">
            <span class="project-icon" aria-hidden="true">${project.icon}</span>
            <p class="other-index">#${String(project.id).padStart(2, "0")}</p>
          </div>
        </div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="tag-row">${buildCategoryBadges(project.categoryTags)}</div>
        <div class="tech-row">${buildTechChips(project.techStack.slice(0, 3))}</div>
        <div class="other-divider"></div>
        <div class="other-footer">
          ${buildArrowLink(project.live, project.code, project.title)}
        </div>
      `;

      otherRoot.appendChild(card);
    });

    observeReveals(otherRoot.querySelectorAll(".reveal"));
  }

  function setActivePill() {
    filterPills.forEach((pill) => {
      const isActive = String(pill.dataset.filter || "").toLowerCase() === state.activeFilter;
      pill.classList.toggle("active", isActive);
    });
  }

  function switchContainer(containers, action) {
    containers.forEach((container) => container.classList.add("is-switching"));
    window.setTimeout(() => {
      action();
      containers.forEach((container) => container.classList.remove("is-switching"));
    }, 140);
  }

  function observeReveals(elements) {
    Array.from(elements).forEach((element, index) => {
      if (!element.dataset.revealDelay) {
        element.dataset.revealDelay = String(index * 80);
      }
      revealObserver.observe(element);
    });
  }
});

const CATEGORY_IMAGE_FALLBACK = {
  ai: "assets/images/PROJECTS/CANCER_ASSESMENT/dashboard.png",
  web: "assets/images/PROJECTS/THARAKA HUB/dashboard2.jpg.png",
  network: "assets/images/PROJECTS/NETWORKING/Screenshot (385).png",
  default: "assets/images/web.jpg"
};

function normalizeProject(project, index) {
  const title = String(project.title || "Untitled Project");
  const description = String(project.description || "No description available.");
  const baseCategory = String(project.category || "").toLowerCase();
  const mergedText = `${title} ${description}`.toLowerCase();
  const filterKeys = new Set();

  if (baseCategory === "ai") filterKeys.add("aiml");
  if (baseCategory === "web") filterKeys.add("web");
  if (baseCategory === "network") filterKeys.add("data");

  if (/data|report|analytics|routing|topology|network|cabling|diagnostic|infrastructure/.test(mergedText)) {
    filterKeys.add("data");
  }

  if (/ui|ux|interface|dashboard|flow|design|onboarding/.test(mergedText)) {
    filterKeys.add("ux");
  }

  if (!filterKeys.size) {
    filterKeys.add("web");
  }

  const categoryTags = [];
  if (filterKeys.has("aiml")) {
    categoryTags.push({ key: "ai", label: "AI" }, { key: "ml", label: "ML" });
  }
  if (filterKeys.has("web")) categoryTags.push({ key: "web", label: "Web" });
  if (filterKeys.has("data")) categoryTags.push({ key: "data", label: "Data" });
  if (filterKeys.has("ux")) categoryTags.push({ key: "ux", label: "UX" });

  const uniqueTags = categoryTags.filter((tag, idx, arr) => arr.findIndex((t) => t.key === tag.key) === idx);
  const customTechStack = Array.isArray(project.techStack)
    ? project.techStack.map((item) => String(item).trim()).filter(Boolean)
    : [];
  const techStack = customTechStack.length
    ? Array.from(new Set(customTechStack)).slice(0, 5)
    : inferTechStack(baseCategory, filterKeys, mergedText);

  return {
    id: Number(project.id || index + 1),
    title,
    description,
    image: String(project.image || categoryImageFor(baseCategory)),
    fallbackImage: categoryImageFor(baseCategory),
    live: String(project.live || "#"),
    code: String(project.code || "#"),
    filterKeys: Array.from(filterKeys),
    categoryTags: uniqueTags,
    techStack,
    icon: inferIcon(uniqueTags)
  };
}

function matchesFilter(project, filter) {
  if (filter === "all") return true;
  return project.filterKeys.includes(filter);
}

function inferTechStack(baseCategory, keys, text) {
  const stack = [];

  if (baseCategory === "ai") {
    stack.push("Python", "TensorFlow", "Django", "PostgreSQL");
  } else if (baseCategory === "web") {
    stack.push("React", "Django", "Figma", "REST API", "PostgreSQL");
  } else if (baseCategory === "network") {
    stack.push("Packet Tracer", "Routing", "Switching", "Topology");
  } else {
    stack.push("JavaScript", "APIs", "UI Systems");
  }

  if (keys.has("ux")) stack.push("Figma");
  if (keys.has("data")) stack.push("Data Pipelines");
  if (/automation|workflow/.test(text)) stack.push("Automation");

  return Array.from(new Set(stack)).slice(0, 5);
}

function inferIcon(tags) {
  const keys = tags.map((tag) => tag.key);
  if (keys.includes("ai") || keys.includes("ml")) return "🤖";
  if (keys.includes("ux")) return "🎨";
  if (keys.includes("data")) return "📊";
  return "🌐";
}

function buildCategoryBadges(tags) {
  return tags
    .map((tag) => `<span class="cat-badge cat-${tag.key}">${tag.label}</span>`)
    .join("");
}

function buildTechChips(stack) {
  return stack.map((item) => `<span class="tech-chip">${escapeHtml(item)}</span>`).join("");
}

function buildArrowLink(url, fallbackUrl, title) {
  const href = safeHref(url, fallbackUrl);
  if (href === "#") {
    return '<span class="link-arrow" aria-hidden="true">&rarr;</span>';
  }
  return `<a class="link-arrow" href="${href}" target="_blank" rel="noopener" aria-label="Open ${escapeHtml(title)}">&rarr;</a>`;
}

function safeHref(primaryUrl, fallbackUrl = "#") {
  const validPrimary = primaryUrl && primaryUrl !== "#" ? primaryUrl : null;
  const validFallback = fallbackUrl && fallbackUrl !== "#" ? fallbackUrl : null;
  return validPrimary || validFallback || "#";
}

function categoryImageFor(categoryKey) {
  return CATEGORY_IMAGE_FALLBACK[categoryKey] || CATEGORY_IMAGE_FALLBACK.default;
}

function createEmptyCard(message) {
  const card = document.createElement("article");
  card.className = "card project-item reveal";
  card.innerHTML = `<p class="feature-description">${escapeHtml(message)}</p>`;
  return card;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
