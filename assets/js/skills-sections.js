/**
 * Skills Page Section Interactions
 * Professional, subtle motion for cards and section reveals.
 */

(function () {
  'use strict';

  function revealCards(selector, delayStep) {
    const cards = Array.from(document.querySelectorAll(selector));
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const card = entry.target;
        const index = Number(card.dataset.revealIndex || 0);
        setTimeout(() => {
          card.classList.add('is-revealed');
        }, index * delayStep);

        io.unobserve(card);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    cards.forEach((card, index) => {
      card.dataset.revealIndex = String(index);
      observer.observe(card);
    });
  }

  function addPressFeedback(selector) {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousedown', () => {
        card.classList.add('is-pressed');
      });

      ['mouseup', 'mouseleave', 'blur'].forEach((eventName) => {
        card.addEventListener(eventName, () => {
          card.classList.remove('is-pressed');
        });
      });
    });
  }

  function initSectionHeaders() {
    const headers = document.querySelectorAll('.section-header');
    if (!headers.length) return;

    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

    headers.forEach((header) => observer.observe(header));
  }

  function init() {
    revealCards('.service-card', 70);
    revealCards('.why-card', 80);
    addPressFeedback('.service-card, .why-card');
    initSectionHeaders();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();