(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const saveDraftBtn = document.getElementById('saveDraft');

  const steps = [
    { id: 'name', label: 'Enter your name', type: 'input' },
    { id: 'email', label: 'Enter your email', type: 'email' },
    { id: 'message', label: 'Type your message', type: 'textarea' }
  ];

  let currentStep = 0;

  function init() {
    if (!form) return;

    // Hide all fields initially
    steps.forEach(step => {
      const el = form.querySelector(`#${step.id}`);
      if (el) el.style.display = 'none';
    });

    restoreDraft();
    startStep();

    if (saveDraftBtn) {
      saveDraftBtn.addEventListener('click', saveDraft);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleSubmit();
    });

    // Start typing for Get in Touch section
    typeGetInTouch();
  }

  /* ================= Form Step Functions ================= */
  function startStep() {
    if (currentStep >= steps.length) {
      enableSubmit();
      return;
    }

    const step = steps[currentStep];
    const field = form.querySelector(`#${step.id}`);
    field.style.display = 'block';
    field.value = '';

    // Remove any previous prompt
    const existingPrompt = field.parentElement.querySelector('.cmd-prompt');
    if (existingPrompt) existingPrompt.remove();

    // Show typing effect for prompt
    typePrompt(field, step.label + ': ', () => {
      field.focus();
    });

    // Handle keypress
    field.onkeydown = function (e) {
      if (e.key === 'Enter' && step.type !== 'textarea') {
        e.preventDefault();
        const value = field.value.trim();

        if (step.type === 'email' && !validateEmail(value)) {
          showError(field, '❌ Invalid email. Try again.');
          return;
        }

        advanceStep(value);
      }
    };
  }

  function advanceStep(value) {
    if (!value) return;

    const step = steps[currentStep];
    const field = form.querySelector(`#${step.id}`);
    showSuccess(field, value, () => {
      currentStep++;
      startStep();
    });

    saveDraft();
  }

  function typePrompt(field, text, callback) {
    const promptEl = document.createElement('div');
    promptEl.className = 'cmd-prompt';
    field.parentElement.insertBefore(promptEl, field);

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    promptEl.appendChild(cursor);

    let i = 0;
    function typeChar() {
      if (i < text.length) {
        cursor.insertAdjacentText('beforebegin', text[i]);
        i++;
        setTimeout(typeChar, 50); // typing speed
      } else if (callback) {
        callback();
      }
    }
    typeChar();
  }

  function showSuccess(field, value, callback) {
    const successEl = document.createElement('div');
    successEl.className = 'cmd-success';
    successEl.textContent = `✅ ${value}`;
    field.parentElement.insertBefore(successEl, field);
    field.style.display = 'none';

    if (callback) setTimeout(callback, 300);
  }

  function showError(field, message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'cmd-success';
    errorEl.style.color = '#ff4d4d';
    errorEl.textContent = message;
    field.parentElement.insertBefore(errorEl, field);

    setTimeout(() => {
      errorEl.remove();
    }, 2500);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function enableSubmit() {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.add('primary');
      statusEl.textContent = 'All fields completed. Press Send to submit!';
      statusEl.style.color = '#0f0';
    }
  }

  function saveDraft() {
    const draftData = {};
    steps.forEach(step => {
      const el = form.querySelector(`#${step.id}`);
      if (el) draftData[step.id] = el.value.trim();
    });
    localStorage.setItem('contactDraft', JSON.stringify(draftData));
    if (statusEl) {
      statusEl.textContent = 'Draft saved ✅';
      statusEl.style.color = '#0f0';
      setTimeout(() => { statusEl.textContent = ''; }, 2500);
    }
  }

  function restoreDraft() {
    try {
      const draft = JSON.parse(localStorage.getItem('contactDraft') || '{}');
      steps.forEach(step => {
        const el = form.querySelector(`#${step.id}`);
        if (el && draft[step.id]) el.value = draft[step.id];
      });
    } catch (err) {
      console.error('Error restoring draft:', err);
    }
  }

  async function handleSubmit() {
    if (!statusEl) return;

    statusEl.textContent = 'Sending message...';
    statusEl.style.color = '#888';

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        statusEl.textContent = 'Message sent successfully ✅';
        statusEl.style.color = '#0f0';
        form.reset();
        localStorage.removeItem('contactDraft');
      } else {
        const result = await response.json().catch(() => ({}));
        statusEl.textContent = result.error || 'Something went wrong ❌';
        statusEl.style.color = '#ff4d4d';
      }
    } catch (err) {
      console.error('Submit error:', err);
      statusEl.textContent = 'Network error ❌';
      statusEl.style.color = '#ff4d4d';
    }
  }

  /* ================= Typing effect for Get in Touch section ================= */
  function typeGetInTouch() {
    const headingEl = document.querySelector('h1.cmd-prompt');
    const leadEl = document.querySelector('.contact-lead-typing');
    const detailsEls = document.querySelectorAll('.contact-detail-typing');

    if (headingEl) typeText(headingEl, headingEl.textContent.trim(), true);
    if (leadEl) typeText(leadEl, leadEl.textContent.trim());
    detailsEls.forEach(el => typeText(el, el.textContent.trim()));
  }

  function typeText(el, text, isHeading = false) {
    const originalText = text;
    el.textContent = '';
    if (isHeading) {
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      el.appendChild(cursor);
    }

    let i = 0;
    function typeChar() {
      if (i < originalText.length) {
        el.textContent += originalText[i];
        i++;
        setTimeout(typeChar, 50);
      }
    }
    typeChar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
