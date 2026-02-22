/**
 * Home Page Logic
 * Atmosphere effects, cursor, feature interactions, and project preview.
 */

(function () {
  'use strict';

  let projectCardObserver = null;
  let cursorBound = false;

  function createAtmosphere() {
    if (document.querySelector('[data-km-atmosphere="orbs"]')) return;

    const orbs = [
      { x: '-8%', y: '-12%', w: '600px', h: '500px', color: 'rgba(0,245,212,0.10)' },
      { x: '75%', y: '-8%', w: '500px', h: '500px', color: 'rgba(168,85,247,0.10)' },
      { x: '20%', y: '60%', w: '700px', h: '400px', color: 'rgba(251,191,36,0.06)' },
      { x: '85%', y: '70%', w: '400px', h: '400px', color: 'rgba(0,245,212,0.06)' }
    ];

    const container = document.createElement('div');
    container.setAttribute('data-km-atmosphere', 'orbs');
    container.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden';

    orbs.forEach((orb) => {
      const el = document.createElement('div');
      el.style.cssText = [
        'position:absolute',
        `left:${orb.x}`,
        `top:${orb.y}`,
        `width:${orb.w}`,
        `height:${orb.h}`,
        `background:radial-gradient(circle,${orb.color} 0%,transparent 70%)`,
        'filter:blur(90px)',
        'border-radius:50%'
      ].join(';');
      container.appendChild(el);
    });

    document.body.prepend(container);
  }

  function createStars() {
    if (document.querySelector('[data-km-atmosphere="stars"]')) return;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('data-km-atmosphere', 'stars');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;width:100%;height:100%';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      spd: Math.random() * 0.006 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1
    }));

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.a += star.spd * star.dir;
        if (star.a >= 0.9 || star.a <= 0.05) star.dir *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.a})`;
        ctx.fill();
      });

      requestAnimationFrame(drawStars);
    };

    drawStars();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  function bindCursorHoverTargets() {
    if (!cursorBound) return;

    document.querySelectorAll('a,button,.btn,.chip,.about-btn,.tech-icon,.project-card').forEach((el) => {
      if (el.dataset.cursorBound === '1') return;

      el.dataset.cursorBound = '1';
      el.addEventListener('mouseenter', () => {
        const dot = document.getElementById('km-cursor-dot');
        const ring = document.getElementById('km-cursor-ring');
        if (!dot || !ring) return;
        dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
        ring.style.transform = 'translate(-50%,-50%) scale(1.5)';
        ring.style.borderColor = 'rgba(0,245,212,0.9)';
      });

      el.addEventListener('mouseleave', () => {
        const dot = document.getElementById('km-cursor-dot');
        const ring = document.getElementById('km-cursor-ring');
        if (!dot || !ring) return;
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.transform = 'translate(-50%,-50%) scale(1)';
        ring.style.borderColor = 'rgba(0,245,212,0.5)';
      });
    });
  }

  function initCursor() {
    // Restore native cursor and remove custom cursor artifacts if present.
    document.body.style.cursor = 'auto';
    const dot = document.getElementById('km-cursor-dot');
    const ring = document.getElementById('km-cursor-ring');
    if (dot) dot.remove();
    if (ring) ring.remove();
    cursorBound = false;
  }

  function initProjectCardObserver() {
    if (projectCardObserver) return;

    projectCardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        projectCardObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
  }

  function observeProjectCards() {
    initProjectCardObserver();

    const cards = document.querySelectorAll('.projects-preview .project-card');
    cards.forEach((card, index) => {
      card.classList.remove('revealed');
      card.style.transitionDelay = `${index * 80}ms`;
      projectCardObserver.observe(card);
    });
  }

  function initFeatureCards() {
    const features = document.querySelectorAll('.intro .features .feature');
    const featureClasses = ['feature-web', 'feature-ui', 'feature-network', 'feature-ai'];

    features.forEach((feature, index) => {
      if (index < featureClasses.length) {
        feature.classList.add(featureClasses[index]);
      }

      feature.addEventListener('mouseenter', () => {
        feature.classList.add('active');
      });

      feature.addEventListener('mouseleave', () => {
        feature.classList.remove('active');
      });

      feature.addEventListener('click', () => {
        feature.classList.toggle('active');
      });
    });
  }

  function initHome() {
    createAtmosphere();
    createStars();
    initCursor();
    initFeatureCards();

    const projectGrid = document.getElementById('projectGrid');
    if (projectGrid && typeof renderProjects === 'function') {
      renderProjects('projectGrid', 'all', 3);
      observeProjectCards();
      bindCursorHoverTargets();
    }

    window.addEventListener('km:projectsRendered', (event) => {
      if (event.detail && event.detail.containerId === 'projectGrid') {
        observeProjectCards();
        bindCursorHoverTargets();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHome);
  } else {
    initHome();
  }
})();
