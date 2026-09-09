// ==========================================================================
// Données des projets — à remplacer par tes vrais projets
// ==========================================================================
const projects = [
  {
    name: 'raid-forge',
    description: "Application web de gestion de guilde pour World of Warcraft : membres, raids, loot.",
    tags: ['Symfony', 'PostgreSQL', 'Twig'],
    url: '#'
  },
  {
    name: 'cdapp',
    description: "Application mobile de coaching, développée dans le cadre du titre CDA.",
    tags: ['React Native', 'TypeScript'],
    url: '#'
  },
  {
    name: 'gear-planner',
    description: "Mini-site pour planifier l'équipement des personnages sur un serveur WoW privé.",
    tags: ['HTML', 'CSS', 'JavaScript'],
    url: '#'
  }
];

// ==========================================================================
// Thème clair / sombre (persisté en localStorage)
// ==========================================================================
function initTheme() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');

  root.setAttribute('data-theme', initial);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
}

// ==========================================================================
// Animation de frappe dans la fenêtre "éditeur" du hero
// ==========================================================================
function initTypingEffect() {
  const target = document.getElementById('typedStatus');
  if (!target) return;

  const text = 'disponible pour un projet';
  let i = 0;

  function type() {
    if (i <= text.length) {
      target.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  }

  type();
}

// ==========================================================================
// Rendu des cartes projet
// ==========================================================================
function renderProjects() {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  grid.innerHTML = projects.map(project => `
    <article class="project-card">
      <h3 class="project-card-title">${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <a class="project-link" href="${project.url}">Voir le projet →</a>
    </article>
  `).join('');
}

// ==========================================================================
// Validation et envoi du formulaire de contact
// ==========================================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const fields = {
    name: { el: document.getElementById('name'), error: document.getElementById('error-name') },
    email: { el: document.getElementById('email'), error: document.getElementById('error-email') },
    message: { el: document.getElementById('message'), error: document.getElementById('error-message') }
  };

  function setError(fieldKey, message) {
    const { el, error } = fields[fieldKey];
    error.textContent = message;
    el.closest('.form-row').classList.toggle('has-error', Boolean(message));
  }

  function validate() {
    let valid = true;

    if (!fields.name.el.value.trim()) {
      setError('name', 'Merci de renseigner votre nom.');
      valid = false;
    } else {
      setError('name', '');
    }

    const emailValue = fields.email.el.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      setError('email', 'Merci de renseigner votre email.');
      valid = false;
    } else if (!emailPattern.test(emailValue)) {
      setError('email', "Cet email ne semble pas valide.");
      valid = false;
    } else {
      setError('email', '');
    }

    if (!fields.message.el.value.trim()) {
      setError('message', 'Merci de décrire votre projet.');
      valid = false;
    } else {
      setError('message', '');
    }

    return valid;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = '';

    if (!validate()) {
      status.textContent = 'Le formulaire contient des erreurs.';
      status.style.color = 'var(--danger)';
      return;
    }

    // Pas de backend : simulation d'un envoi réussi.
    // Pour un vrai envoi, brancher ici un service (Formspree, EmailJS, API perso...).
    status.style.color = 'var(--accent)';
    status.textContent = 'Message envoyé, merci ! Je reviens vers vous rapidement.';
    form.reset();
  });

  Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('input', () => setError(key, ''));
  });
}

// ==========================================================================
// Init
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  renderProjects();
  initContactForm();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
