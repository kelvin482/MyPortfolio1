(function(){
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));
  const yearEl = qs('#year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
  const root = document.documentElement;
  const themeKey = 'km_theme';
  function applyTheme(theme){
    if(theme==='light') root.classList.add('light'); else root.classList.remove('light');
    localStorage.setItem(themeKey, theme);
    qsa('#themeToggle, #themeToggle2, #themeToggle3, #themeToggle4, #themeToggle5, #themeToggle6, #themeToggle7').forEach(btn=>{ if(btn) btn.textContent = theme==='light'? '🌞' : '🌙'; });
  }
  const saved = localStorage.getItem(themeKey) || 'dark';
  applyTheme(saved);
  qsa('#themeToggle, #themeToggle2, #themeToggle3, #themeToggle4, #themeToggle5, #themeToggle6, #themeToggle7').forEach(btn=>{ if(!btn) return; btn.addEventListener('click', ()=>{ const cur = root.classList.contains('light')? 'light' : 'dark'; applyTheme(cur==='light' ? 'dark' : 'light'); }); });
  const mobileNav = qs('#mobileNav');
  qsa('.menu-btn').forEach(b=>b && b.addEventListener('click', ()=> mobileNav.classList.add('open')));
  qs('#closeMobileNav')?.addEventListener('click', ()=> mobileNav.classList.remove('open'));
  const revealEls = qsa('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('is-visible'); }); },{threshold:0.12});
  revealEls.forEach(el=>io.observe(el));
  const sampleProjects = [
    {id:1,title:'Product Dashboard',desc:'React dashboard with real-time charts and auth',tags:['web'],live:'#',code:'#'},
    {id:2,title:'AI Chat Assistant',desc:'GPT-powered assistant for support workflows',tags:['ai','web'],live:'#',code:'#'},
    {id:3,title:'Network Monitor',desc:'Python scripts and dashboards to monitor LAN health',tags:['network'],live:'#',code:'#'},
    {id:4,title:'E-commerce Store',desc:'Django backend with React frontend and payments',tags:['web'],live:'#',code:'#'},
    {id:5,title:'Auto-deploy Scripts',desc:'CI scripts and Docker setups for deployments',tags:['network'],live:'#',code:'#'}
  ];
  function renderProjects(where, items){
    const container = qs(where);
    if(!container) return;
    container.innerHTML = items.map(p=>`
      <article class="project-card">
        <div style="height:140px;border-radius:8px;background:linear-gradient(135deg, rgba(25,209,200,0.06), rgba(11,132,255,0.04));display:flex;align-items:center;justify-content:center;margin-bottom:0.8rem">${p.title}</div>
        <h3>${p.title}</h3>
        <p class="muted">${p.desc}</p>
        <div style="margin-top:0.6rem;display:flex;gap:0.5rem;align-items:center">
          <a class="chip" href="${p.live}" target="_blank">Live</a>
          <a class="chip" href="${p.code}" target="_blank">Code</a>
        </div>
      </article>
    `).join('');
  }
  renderProjects('#projectGrid', sampleProjects.slice(0,3));
  renderProjects('#projectsList', sampleProjects);
  qsa('.chip[data-filter]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      qsa('.chip[data-filter]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter==='all' ? sampleProjects : sampleProjects.filter(p=>p.tags.includes(filter));
      renderProjects('#projectsList', filtered);
    });
  });
  const contactForm = qs('#contactForm');
  if(contactForm){
    const draftKey = 'km_contact_draft';
    const draft = JSON.parse(localStorage.getItem(draftKey) || '{}');
    if(Object.keys(draft).length){
      contactForm.name.value = draft.name || '';
      contactForm.email.value = draft.email || '';
      contactForm.message.value = draft.message || '';
    }
    qs('#saveDraft')?.addEventListener('click', ()=>{
      const toSave = {name:contactForm.name.value,email:contactForm.email.value,message:contactForm.message.value};
      localStorage.setItem(draftKey, JSON.stringify(toSave));
      qs('#formStatus').textContent = 'Draft saved locally.';
      setTimeout(()=>qs('#formStatus').textContent='',2500);
    });
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const queueKey = 'km_contact_queue';
      const queue = JSON.parse(sessionStorage.getItem(queueKey) || '[]');
      const payload = {name:contactForm.name.value,email:contactForm.email.value,message:contactForm.message.value,ts:new Date().toISOString()};
      queue.push(payload);
      sessionStorage.setItem(queueKey, JSON.stringify(queue));
      localStorage.removeItem(draftKey);
      contactForm.reset();
      qs('#formStatus').textContent = 'Message sent (saved to session). Replace Formspree action with your endpoint to actually deliver.';
      setTimeout(()=>qs('#formStatus').textContent='',4000);
    });
  }
  qsa('.nav a').forEach(a=>{ try{ if(location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active'); }catch(e){} });
})();