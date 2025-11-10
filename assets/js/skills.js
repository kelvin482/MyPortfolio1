// ================= Array of skills =================
const skills = [
  { title: "Frontend", description: "HTML, CSS, JavaScript, React", color: "rgba(255, 99, 132, 0.2)" },
  { title: "Backend", description: "Python, Django, REST APIs", color: "rgba(54, 162, 235, 0.2)" },
  { title: "DevOps & Networking", description: "Linux, Nginx, Docker", color: "rgba(255, 206, 86, 0.2)" },
  { title: "UI/UX Design", description: "Figma, Prototyping, Design Systems", color: "rgba(75, 192, 192, 0.2)" },
  { title: "AI & Automation", description: "Chatbots, Scripts, AI Tools", color: "rgba(153, 102, 255, 0.2)" },
  { title: "Database", description: "PostgreSQL, MySQL, MongoDB", color: "rgba(255, 159, 64, 0.2)" },
  { title: "Cloud", description: "AWS, Azure, Cloud Deployment", color: "rgba(0, 200, 200, 0.2)" },
  { title: "Version Control", description: "Git, GitHub, GitLab", color: "rgba(200, 200, 0, 0.2)" }
];

// ================= DOM Elements =================
const wrapper = document.getElementById('skillsGrid');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// ================= Render Skill Cards Dynamically =================
function renderCards() {
  wrapper.innerHTML = ''; // clear existing
  skills.forEach(skill => {
    const card = document.createElement('div');
    card.className = 'glass-card';
    card.style.background = skill.color; // assign color
    card.innerHTML = `<h3>${skill.title}</h3><p>${skill.description}</p>`;
    wrapper.appendChild(card);
  });
}

// ================= Fade-in Animation =================
function animateFadeIn() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 150); // stagger
  });
}

// ================= Auto-slide =================
let scrollAmount = 0;
function autoSlide() {
  const card = wrapper.querySelector('.glass-card');
  if (!card) return;

  const cardWidth = card.offsetWidth + 20; // include gap
  setInterval(() => {
    if (scrollAmount + wrapper.clientWidth >= wrapper.scrollWidth) {
      scrollAmount = 0;
    } else {
      scrollAmount += cardWidth;
    }
    wrapper.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, 3000);
}

// ================= Manual Scroll Buttons =================
leftBtn.addEventListener('click', () => {
  const card = wrapper.querySelector('.glass-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 20;
  wrapper.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  const card = wrapper.querySelector('.glass-card');
  if (!card) return;
  const cardWidth = card.offsetWidth + 20;
  wrapper.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

// ================= Initialize =================
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  animateFadeIn();
  autoSlide();
});
