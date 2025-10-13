// Utilidades
const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => Array.from(el.querySelectorAll(sel));

// Menu móvel
const navToggle = qs('.nav-toggle');
const siteNav = qs('#site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Expandir/contrair cards "Saiba mais"
qsa('.card').forEach(card => {
  const btn = qs('.more-btn', card);
  const details = qs('.details', card);
  if (!btn || !details) return;
  btn.addEventListener('click', () => {
    const hidden = details.hasAttribute('hidden');
    if (hidden) {
      details.removeAttribute('hidden');
      card.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Mostrar menos';
    } else {
      details.setAttribute('hidden', '');
      card.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Saiba mais';
    }
  });
});

// Bibliografia: acordeão
qsa('.ref-item').forEach(item => {
  const btn = qs('.ref-btn', item);
  const details = qs('.ref-details', item);
  btn.addEventListener('click', () => {
    const isHidden = details.hasAttribute('hidden');
    // fechar outros
    qsa('.ref-item').forEach(i => {
      if (i !== item) {
        i.setAttribute('aria-expanded', 'false');
        qs('.ref-details', i)?.setAttribute('hidden', '');
        qs('.ref-btn', i)?.setAttribute('aria-expanded', 'false');
      }
    });
    // toggle atual
    if (isHidden) {
      details.removeAttribute('hidden');
      item.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      details.setAttribute('hidden', '');
      item.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
});

// Melhorias de acessibilidade: fechar menu ao clicar em links e ao navegar
qsa('#site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Preferência de usuário: lembrar expansões (opcional simples)
// Nota: apenas demonstração, não persiste entre sessões.