/* =========================================================================
   MADRI PISCINAS — LANDING PAGE
   JavaScript puro (sem dependências externas)
   ========================================================================= */

// Número de WhatsApp centralizado — altere aqui para atualizar todos os links
// gerados dinamicamente (cards de modelos). Os links fixos no HTML (header,
// hero, CTA final, rodapé e botão flutuante) usam o mesmo número e também
// devem ser atualizados caso ele mude.
const WHATSAPP_NUMBER = '5515998888699';

/**
 * Monta um link do WhatsApp com mensagem pré-preenchida.
 * @param {string} message - Texto da mensagem.
 * @returns {string} URL completa do wa.me
 */
function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* =========================== DADOS: MODELOS DE PISCINA ===========================
   Conteúdo de referência inspirado em catálogos públicos de piscinas de fibra
   (formatos, medidas e recursos usuais do segmento). Nomes e textos são
   originais, criados para esta landing page. */
const MODELOS_PISCINA = [
  {
    nome: 'Modelo Canadá',
    medidas: 'de 3 a 10 metros',
    descricao: 'Linha Canadá une design moderno, excelente área interna e escadas ergonômicas que valorizam conforto e praticidade.',
    destaque: 'Compacta',
    imagem: 'assets/linha-canada.png'
  },
  {
    nome: 'Modelo Espanha',
    medidas: 'de 4 a 7 metros',
    descricao: 'Com design moderno e escada integrada, oferece conforto, praticidade e um visual clean que valoriza qualquer ambiente.',
    destaque: 'Mais vendida',
    imagem: 'assets/Linha-espanha.png'
  },
  {
    nome: 'Modelo Portugal',
    medidas: 'de 3 a 8 metros',
    descricao: 'Linha Portugal combina design atemporal, excelente profundidade e ótimo aproveitamento interno. Com escadas integradas e formato versátil.',
    destaque: 'Padrão',
    imagem: 'assets/linha-portugal.png'
  },
  {
    nome: 'Modelo Grécia',
    medidas: 'de 4 a 10 metros',
    descricao: 'Linha Grécia é a expressão máxima de elegância e acabamento premium. Com revestimento em pastilhas de vidro ou porcelana.',
    destaque: 'Com prainha',
    imagem: 'assets/Linha-grecia.png'
  },
  {
    nome: 'Modelo Caribe',
    medidas: 'de 5 a 7 metros',
    descricao: 'Linha Caribe combina lazer e sofisticação em um único projeto. Com spa integrado, design elegante e excelente área interna.',
    destaque: 'Com hidro',
    imagem: 'assets/linha-caribe.png'
  },
  {
    nome: 'Modelo Itália',
    medidas: 'de 5 a 6 metros',
    descricao: 'Seu formato moderno e escadas amplas oferecem conforto, praticidade e um visual elegante que valoriza qualquer projeto.',
    destaque: 'Linha premium',
    imagem: 'assets/linha-italia.png'
  }
];

/* =========================== DADOS: GALERIA =========================== */
const GALERIA_IMAGENS = [
  'assets/galeria-1.jpg.png',
  'assets/galeria-2.jpg.png',
  'assets/galeria-3.jpg.png',
  'assets/galeria-4.jpg.png',
  'assets/galeria-5.jpg.png',
  'assets/galeria-6.jpg.png',
  'assets/galeria-7.jpg.png',
  'assets/galeria-8.jpg.png'
];

/* =========================== ÍCONE PADRÃO DE FALLBACK =========================== */
const FALLBACK_ICON_SVG = `
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="#1479B3" stroke-width="1.5"
       xmlns="http://www.w3.org/2000/svg" style="padding:30%;">
    <path d="M4 20V10l8-6 8 6v10" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 20v-6h6v6"/>
  </svg>`;

/**
 * Substitui uma imagem quebrada por um placeholder visual elegante,
 * evitando o ícone de "imagem quebrada" do navegador.
 * @param {HTMLImageElement} imgEl
 */
function attachImageFallback(imgEl) {
  imgEl.addEventListener('error', () => {
    const wrapper = imgEl.parentElement;
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.background = 'linear-gradient(135deg, #EAF4FB, #D7E8F3)';
    imgEl.remove();
    wrapper.insertAdjacentHTML('beforeend', FALLBACK_ICON_SVG);
  }, { once: true });
}

/* =========================== RENDER: CARDS DE MODELOS =========================== */
function renderModelos() {
  const grid = document.getElementById('modelosGrid');
  if (!grid) return;

  const html = MODELOS_PISCINA.map((modelo) => {
    const mensagem = `Olá! Tenho interesse no ${modelo.nome} (${modelo.medidas}). Poderia me passar mais informações e um orçamento?`;
    return `
      <article class="model-card" data-reveal>
        <div class="model-card__media">
          <span class="model-card__badge">${modelo.destaque}</span>
          <img src="${modelo.imagem}" alt="Piscina de fibra ${modelo.nome}, medidas ${modelo.medidas}" loading="lazy" width="700" height="525">
        </div>
        <div class="model-card__body">
          <h3>${modelo.nome}</h3>
          <span class="model-card__size">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3z" stroke-linejoin="round"/><path d="M3 9h18M9 3v18"/></svg>
            ${modelo.medidas}
          </span>
          <p>${modelo.descricao}</p>
          <a class="model-card__cta" href="${buildWhatsAppLink(mensagem)}" target="_blank" rel="noopener">
            Quero esse modelo
          </a>
        </div>
      </article>`;
  }).join('');

  grid.innerHTML = html;
  grid.querySelectorAll('img').forEach(attachImageFallback);
  observeRevealElements();
}

/* =========================== RENDER: GALERIA =========================== */
function renderGaleria() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const html = GALERIA_IMAGENS.map((src, index) => `
    <button class="gallery__item" data-reveal type="button" data-full="${src}" aria-label="Ampliar imagem ${index + 1} da galeria">
      <img src="${src}" alt="Piscina Madri Piscinas - foto ${index + 1}" loading="lazy" width="400" height="400">
    </button>
  `).join('');

  grid.innerHTML = html;
  grid.querySelectorAll('img').forEach(attachImageFallback);
  observeRevealElements();
}

/* =========================== LIGHTBOX =========================== */
function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox || !lightboxImg || !closeBtn) return;

  document.getElementById('galleryGrid').addEventListener('click', (event) => {
    const item = event.target.closest('.gallery__item');
    if (!item) return;
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img')?.alt || 'Imagem ampliada';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

/* =========================== ACCORDION (FAQ) =========================== */
function setupAccordion() {
  const items = document.querySelectorAll('.accordion__item');

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Fecha os demais itens para manter a experiência limpa (accordion clássico)
      items.forEach((other) => {
        if (other === item) return;
        other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        other.querySelector('.accordion__panel').style.maxHeight = null;
      });

      trigger.setAttribute('aria-expanded', String(!isOpen));
      panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
    });
  });
}

/* =========================== HEADER: SOMBRA AO ROLAR =========================== */
function setupHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const toggleShadow = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  toggleShadow();
  window.addEventListener('scroll', toggleShadow, { passive: true });
}

/* =========================== MENU MOBILE =========================== */
function setupMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-active', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================== ANIMAÇÕES AO ROLAR (scroll reveal) =========================== */
let revealObserver;

function observeRevealElements() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }

  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
    revealObserver.observe(el);
  });
}

/* =========================== VÍDEO DO HERO (play/pause + som) =========================== */
function setupHeroVideoToggle() {
  const video = document.querySelector('.hero__visual-video');
  const toggle = document.getElementById('heroVideoToggle');
  if (!video || !toggle) return;

  const sync = () => toggle.classList.toggle('is-playing', !video.paused);
  toggle.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false;
      video.play();
    } else {
      video.pause();
    }
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  sync();
}

/* =========================== ANO ATUAL NO RODAPÉ =========================== */
function setupFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* =========================== INICIALIZAÇÃO =========================== */
document.addEventListener('DOMContentLoaded', () => {
  renderModelos();
  renderGaleria();
  setupLightbox();
  setupAccordion();
  setupHeaderScroll();
  setupMobileNav();
  setupFooterYear();
  setupHeroVideoToggle();
  observeRevealElements();
});
