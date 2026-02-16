class ContributionSnake {
  constructor() {
    this.gridEl = document.getElementById('contributionGrid');
    this.progressFill = document.getElementById('progressFill');
    this.streakDays = document.getElementById('streakDays');
    this.contribCount = document.getElementById('contribCount');

    if (!this.gridEl) return;

    this.weeks = 53;
    this.days = 7;
    this.speed = 105;
    this.maxSnakeLength = 6;
    this.grid = [];
    this.snake = [];
    this.running = false;
    this.lastTick = 0;
    this.rafId = null;
    this.activeRemaining = 0;
    this.restartAt = 0;
    this.lastDirection = null;

    this.init();
  }

  init() {
    this.generateGrid();
    this.generateContributions();
    this.renderGrid();
    this.updateProgress();
    this.startSnake();
  }

  generateGrid() {
    this.grid = [];
    for (let week = 0; week < this.weeks; week += 1) {
      for (let day = 0; day < this.days; day += 1) {
        this.grid.push({ week, day, level: 0, eaten: false });
      }
    }
  }

  generateContributions() {
    this.activeRemaining = 0;
    this.grid.forEach((cell) => {
      const random = Math.random();
      if (random < 0.4) {
        cell.level = 0;
      } else if (random < 0.6) {
        cell.level = 1;
      } else if (random < 0.8) {
        cell.level = 2;
      } else if (random < 0.95) {
        cell.level = 3;
      } else {
        cell.level = 4;
      }
      cell.eaten = false;
      if (cell.level > 0) this.activeRemaining += 1;
    });
  }

  getDateForCell(cell) {
    const today = new Date();
    const daysAgo = (52 - cell.week) * 7 + (6 - cell.day);
    const date = new Date(today.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  renderGrid() {
    this.gridEl.innerHTML = '';
    const frag = document.createDocumentFragment();

    this.grid.forEach((cell, index) => {
      const cellEl = document.createElement('div');
      cellEl.className = 'contrib-cell';
      cellEl.setAttribute('data-index', String(index));
      cellEl.setAttribute('data-level', String(cell.level));

      const contributionCount = cell.level === 0 ? 0 : cell.level * 3;
      const tooltipText = contributionCount === 0
        ? `No contributions on ${this.getDateForCell(cell)}`
        : `${contributionCount} contributions on ${this.getDateForCell(cell)}`;
      cellEl.setAttribute('data-tooltip', tooltipText);

      frag.appendChild(cellEl);
    });

    this.gridEl.appendChild(frag);
  }

  startSnake() {
    if (this.running) return;
    this.running = true;
    this.snake = [0];
    this.lastTick = performance.now();
    this.animate(this.lastTick);
  }

  stopSnake() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }

  animate = (timestamp) => {
    if (!this.running) return;
    if (this.restartAt && timestamp >= this.restartAt) {
      this.restartAt = 0;
      this.resetSnakePath();
      this.lastTick = timestamp;
    }
    if (timestamp - this.lastTick >= this.speed) {
      this.moveSnake();
      this.lastTick = timestamp;
    }
    this.rafId = requestAnimationFrame(this.animate);
  };

  moveSnake() {
    if (this.activeRemaining <= 0) {
      this.clearSnakeVisuals();
      if (!this.restartAt) {
        this.restartAt = performance.now() + 520;
      }
      return;
    }

    const currentIndex = this.snake[this.snake.length - 1];
    const nextIndex = this.getNextCell(currentIndex);

    if (nextIndex === null) {
      const fallback = this.findRandomUneatenActiveCell();
      if (fallback === null) {
        this.clearSnakeVisuals();
        this.restartAt = performance.now() + 520;
        return;
      }
      this.resetSnakeHead(fallback);
      return;
    }

    this.snake.push(nextIndex);
    if (this.snake.length > this.maxSnakeLength) {
      const removed = this.snake.shift();
      this.updateCell(removed, false);
    }

    this.updateCell(nextIndex, true);
  }

  getNextCell(currentIndex) {
    const current = this.grid[currentIndex];
    if (!current) return null;

    const neighbors = this.getNeighbors(current.week, current.day)
      .filter((n) => !this.grid[n.index].eaten);

    if (!neighbors.length) return null;

    const weighted = neighbors.map((n) => {
      const target = this.grid[n.index];
      let weight = 1;
      if (target.level > 0) weight += 6 + target.level * 2;
      if (n.direction === this.lastDirection) weight += 1.5;
      return { ...n, weight };
    });

    const totalWeight = weighted.reduce((sum, item) => sum + item.weight, 0);
    let pick = Math.random() * totalWeight;
    for (let i = 0; i < weighted.length; i += 1) {
      pick -= weighted[i].weight;
      if (pick <= 0) {
        this.lastDirection = weighted[i].direction;
        return weighted[i].index;
      }
    }

    const fallback = weighted[weighted.length - 1];
    this.lastDirection = fallback.direction;
    return fallback.index;
  }

  getNeighbors(week, day) {
    const candidates = [
      { week: week + 1, day, direction: 'right' },
      { week: week - 1, day, direction: 'left' },
      { week, day: day + 1, direction: 'down' },
      { week, day: day - 1, direction: 'up' }
    ];

    return candidates
      .filter((n) => n.week >= 0 && n.week < this.weeks && n.day >= 0 && n.day < this.days)
      .map((n) => ({ ...n, index: n.week * this.days + n.day }));
  }

  findRandomUneatenActiveCell() {
    const active = [];
    for (let i = 0; i < this.grid.length; i += 1) {
      const cell = this.grid[i];
      if (!cell.eaten && cell.level > 0) active.push(i);
    }
    if (!active.length) return null;
    return active[Math.floor(Math.random() * active.length)];
  }

  resetSnakeHead(index) {
    this.clearSnakeVisuals();
    this.snake = [index];
    this.updateCell(index, true);
  }

  updateCell(index, isSnake) {
    const cellEl = this.gridEl.querySelector(`[data-index="${index}"]`);
    if (!cellEl) return;

    if (isSnake) {
      cellEl.classList.add('snake');
      cellEl.classList.remove('eaten');
      const cell = this.grid[index];
      if (!cell.eaten && cell.level > 0) {
        this.activeRemaining -= 1;
      }
      cell.eaten = true;
      cell.level = 0;
      cellEl.setAttribute('data-level', '0');
      this.updateProgress();
    } else {
      cellEl.classList.remove('snake');
      if (this.grid[index] && this.grid[index].eaten) {
        cellEl.classList.add('eaten');
      }
    }
  }

  clearSnakeVisuals() {
    this.gridEl.querySelectorAll('.contrib-cell.snake').forEach((el) => {
      el.classList.remove('snake');
    });
  }

  resetSnakePath() {
    this.clearSnakeVisuals();
    this.generateContributions();
    this.renderGrid();
    this.updateProgress();
    const start = this.findRandomUneatenActiveCell() ?? 0;
    this.lastDirection = null;
    this.snake = [start];
    this.updateCell(start, true);
  }

  updateProgress() {
    const totalActive = this.grid.filter((c) => c.level > 0 || c.eaten).length;
    const eatenActive = totalActive - this.activeRemaining;
    const percentage = totalActive > 0 ? (eatenActive / totalActive) * 100 : 0;
    const contributionUnits = this.grid.reduce((sum, cell) => sum + (cell.level * 3), 0);

    if (this.progressFill) this.progressFill.style.width = `${percentage}%`;
    if (this.streakDays) this.streakDays.textContent = String(eatenActive);
    if (this.contribCount) this.contribCount.textContent = String(contributionUnits);
  }
}

class TypeWriter {
  constructor(element, texts, speed = 80) {
    this.element = element;
    this.texts = Array.isArray(texts) ? texts : [texts];
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    if (!this.element || !this.texts.length) return;

    const current = this.texts[this.textIndex];

    if (this.isDeleting) {
      this.charIndex = Math.max(0, this.charIndex - 1);
    } else {
      this.charIndex = Math.min(current.length, this.charIndex + 1);
    }

    this.element.textContent = current.substring(0, this.charIndex);

    let typeSpeed = this.isDeleting ? this.speed / 2 : this.speed;

    if (!this.isDeleting && this.charIndex === current.length) {
      this.element.classList.add('is-paused');
      typeSpeed = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.element.classList.remove('is-paused');
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 420;
    } else {
      this.element.classList.remove('is-paused');
    }

    window.setTimeout(() => this.type(), typeSpeed);
  }
}

function initHeroTypewriter() {
  const typingElement = document.querySelector('#hero .typing-text');
  if (!typingElement) return;

  new TypeWriter(
    typingElement,
    [
      'Building Intelligent Systems That Scale',
      'AI-Driven Web Development • Automation',
      'Cloud & Full-Stack Solutions',
      'Systems & Network Engineer'
    ],
    80
  );
}

function initProfileLikeButton() {
  const likeBtn = document.getElementById('profileLikeBtn');
  const likeCountEl = document.getElementById('profileLikeCount');
  if (!likeBtn) return;

  const storageKey = 'km_profile_likes_count';
  const defaultCount = 90;
  let likes = Number(localStorage.getItem(storageKey) || defaultCount);
  if (!Number.isFinite(likes) || likes < defaultCount) likes = defaultCount;
  if (likeCountEl) likeCountEl.textContent = String(likes);

  likeBtn.addEventListener('click', () => {
    likes += 1;
    localStorage.setItem(storageKey, String(likes));
    if (likeCountEl) likeCountEl.textContent = String(likes);

    // brief visual feedback without toggle semantics
    likeBtn.classList.add('liked');
    setTimeout(() => likeBtn.classList.remove('liked'), 220);
  });
}

function updateProfileViews() {
  const viewsEl = document.getElementById('profileViewsCount');
  if (!viewsEl) return;

  const storageKey = 'km_profile_views_count';
  const defaultCount = 82;
  let views = Number(localStorage.getItem(storageKey) || defaultCount);
  if (!Number.isFinite(views) || views < defaultCount) views = defaultCount;
  views += 1;
  localStorage.setItem(storageKey, String(views));
  viewsEl.textContent = String(views);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroTypewriter();

  const contributionSnake = new ContributionSnake();
  if (!contributionSnake.gridEl) return;

  initProfileLikeButton();
  updateProfileViews();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      contributionSnake.stopSnake();
      contributionSnake.init();
    }, 250);
  });
});
