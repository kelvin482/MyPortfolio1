/**
 * Interactive Elements
 * Makes every element interactive with hover, focus, and click states
 */

(function() {
  'use strict';

  function initInteractiveElements() {
    // Make all cards interactive
    const cards = document.querySelectorAll('.card, .feature, .project-card, .cert-card, .service-card');
    cards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });

    // Make all links more interactive
    const links = document.querySelectorAll('a:not(.btn)');
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(2px)';
      });
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
      });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .icon-btn, .about-btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Add focus-visible polyfill for better keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });

    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Add hover effects to images
    const images = document.querySelectorAll('img:not(.profile-img)');
    images.forEach(img => {
      img.style.transition = 'transform 0.3s ease, filter 0.3s ease';
      img.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.filter = 'brightness(1.1)';
      });
      img.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.filter = 'brightness(1)';
      });
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractiveElements);
  } else {
    initInteractiveElements();
  }
})();

