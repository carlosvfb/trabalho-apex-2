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

// Modal para "Saiba mais"
const modalContainer = qs('#modal-container');
const modalTitle = qs('#modal-title');
const modalText = qs('#modal-text');
const modalClose = qs('.modal-close');

// Função para abrir o modal
function openModal(title, content) {
  modalTitle.textContent = title;
  modalText.innerHTML = content; // Usando innerHTML para preservar formatação HTML
  modalContainer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Impedir rolagem do body
  
  // Focar no modal para acessibilidade
  setTimeout(() => modalClose.focus(), 100);
}

// Função para fechar o modal
function closeModal() {
  modalContainer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Botão de fechar
modalClose.addEventListener('click', closeModal);

// Fechar ao clicar fora do modal
modalContainer.addEventListener('click', (e) => {
  if (e.target === modalContainer) closeModal();
});

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.getAttribute('aria-hidden') === 'false') {
    closeModal();
  }
});

// Botões "Saiba mais" nos cards
qsa('.card').forEach(card => {
  const btn = qs('.more-btn', card);
  const details = qs('.details', card);
  const title = qs('h3', card).textContent;
  const content = details ? details.innerHTML : ''; // Usando innerHTML para preservar formatação HTML
  
  if (!btn) return;
  
  btn.addEventListener('click', () => {
    openModal(title, content);
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