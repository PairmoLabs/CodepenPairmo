// === LIMBI: dropdown flag ===
const mainFlag = document.querySelector(".main-flag");
const dropdown = document.querySelector(".flag-dropdown");

mainFlag.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
});

// === BURGER MENU ===
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mobile-menu');

  // Deschide/închide meniul
  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // Închide meniul la click pe link
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  });

  // Închide meniul la click în afara lui
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
});

// === NEWSLETTER: mesaj de succes ===
function showSuccess(event) {
  event.preventDefault();
  const message = document.getElementById("success-message");
  message.style.display = "block";
  setTimeout(() => {
    message.style.display = "none";
  }, 5000);
}

// === SCROLL ↓ "Find out more..." ===
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  window.scrollBy({
    top: 600,
    behavior: 'smooth'
  });
});
// === DOMAINS CAROUSEL ===
const carousel = document.querySelector('.carousel-container');
let isDraggingCarousel = false;
let startXCarousel;

if (carousel) {
  carousel.addEventListener('mousedown', (e) => {
    isDraggingCarousel = true;
    startXCarousel = e.pageX - carousel.offsetLeft;
    carousel.style.cursor = 'grabbing';
  });

  carousel.addEventListener('mouseleave', () => {
    isDraggingCarousel = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mouseup', () => {
    isDraggingCarousel = false;
    carousel.style.cursor = 'grab';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDraggingCarousel) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startXCarousel) * 1.5;
    carousel.scrollLeft -= walk;
  });
}

// === FLIP CARD ANIMATION ===
const cards = document.querySelectorAll('.mode-card');
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// === LINII DE ANIMAȚIE LA SCROLL ===
const animatedLines = document.querySelectorAll('.interactive-line, .powerwallet-line, .explore-line, .modes-line');

function handleScrollLineAnimation() {
  const triggerBottom = window.innerHeight * 0.85;

  animatedLines.forEach(line => {
    const boxTop = line.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      line.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollLineAnimation);
// === SWIPE STACK (Explore Cards) ===
document.addEventListener('DOMContentLoaded', () => {
  const stack = document.getElementById('card-stack');
  const feedback = document.getElementById('swipe-feedback');

  let isDragging = false;
  let startX = 0;
  let currentCard = null;

  function showFeedback(text) {
    feedback.textContent = text;
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 1200);
  }

  function initSwipe() {
    const cards = stack.querySelectorAll('.swipe-card');
    if (!cards.length) return;
    currentCard = cards[0];
    currentCard.classList.add('top-card');

    currentCard.addEventListener('mousedown', dragStart);
    currentCard.addEventListener('touchstart', dragStart, { passive: true });
  }

  function dragStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;

    document.addEventListener('mousemove', dragMove);
    document.addEventListener('touchmove', dragMove, { passive: true });
    document.addEventListener('mouseup', dragEnd);
    document.addEventListener('touchend', dragEnd);
  }

  function dragMove(e) {
    if (!isDragging || !currentCard) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const deltaX = x - startX;
    currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`;
  }

  function dragEnd(e) {
    if (!isDragging || !currentCard) return;
    const x = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = x - startX;

    if (deltaX > 100) {
      // Swipe right = MATCH
      currentCard.style.transform = 'translateX(1000px) rotate(30deg)';
      showFeedback('✅ Deal! We have a Match!');
      removeTopCard();
    } else if (deltaX < -100) {
      // Swipe left = NOPE
      currentCard.style.transform = 'translateX(-1000px) rotate(-30deg)';
      showFeedback('❌ Nope!');
      removeTopCard();
    } else {
      currentCard.style.transform = 'translateX(0)';
    }

    isDragging = false;
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('touchmove', dragMove);
    document.removeEventListener('mouseup', dragEnd);
    document.removeEventListener('touchend', dragEnd);
  }

  function removeTopCard() {
    setTimeout(() => {
      if (currentCard) {
        currentCard.remove();
        initSwipe(); // next card
      }
    }, 400);
  }

  initSwipe();
});
// === MULTILANGUAGE SUPPORT (data-translate) ===
let translations = {};

async function loadLanguage(lang) {
  try {
    const response = await fetch(`Lang/${lang}.json`);
    if (!response.ok) throw new Error('Language file not found');
    translations = await response.json();
    applyTranslations();
  } catch (error) {
    console.error('Translation load error:', error);
  }
}

function applyTranslations() {
  document.querySelectorAll('[data-translate]').forEach((el) => {
    const key = el.getAttribute('data-translate');
    if (translations[key]) {
      el.innerHTML = translations[key];
    }
  });

  document.querySelectorAll('[data-translate-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-translate-placeholder');
    if (translations[key]) {
      el.setAttribute('placeholder', translations[key]);
    }
  });
}

// === Comutare limbă prin click pe steag ===
document.querySelectorAll('.flag-dropdown img').forEach((flag) => {
  flag.addEventListener('click', () => {
    const langCode = flag.getAttribute('alt').toLowerCase(); // ex: 'ro', 'fr'
    loadLanguage(langCode);
    dropdown.style.display = 'none';
  });
});

// === Inițial – limba implicită engleză ===
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage('en');
});
// === EXTRA: Scroll automat către secțiuni din sticky bar ===
document.querySelectorAll('.burger-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }
  });
});

// === EXTRA: Auto-close flag dropdown if click outside ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.flag-wrapper')) {
    dropdown.style.display = 'none';
  }
});

// === PROTECTIE: Închide meniul dacă dai scroll (mobil) ===
window.addEventListener('scroll', () => {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.style.display = 'none';
});
