

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mobile-menu');
const mainFlag = document.querySelector('.main-flag');
  const dropdown = document.querySelector('.dropdown');

  if (mainFlag && dropdown) {
    mainFlag.addEventListener("click", () => {
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  }
  // Toggle menu on burger click
  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });

  // Close menu when clicking on any link
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.style.display = 'none';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !burger.contains(event.target)) {
      menu.style.display = 'none';
    }
  });
});
// === Funcția pentru afișarea mesajului de succes după abonare ===
function showSuccess(event) {
  event.preventDefault(); // Oprește trimiterea automată a formularului (fără refresh de pagină)

  const message = document.getElementById("success-message"); // Selectează elementul cu mesajul de succes
  message.style.display = "block"; // Afișează mesajul (devine vizibil)

  // === Opțional: ascunde mesajul după 5 secunde ===
  setTimeout(() => {
    message.style.display = "none"; // Revine la invizibil după 5 secunde
  }, 5000);
}
// === Scroll automat către următoarea secțiune ===
document.querySelector('.scroll-indicator').addEventListener('click', () => {
  // Scroll smooth la 600px mai jos (poți ajusta)
  window.scrollBy({
    top: 600,
    behavior: 'smooth'
  });
});
// === Activare selecție card în carusel ===
function selectCard(card) {
  const allCards = document.querySelectorAll('.carousel-card');
  allCards.forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}
// === Scroll Observer pentru efect pop-up ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

// Activăm observerul pentru fiecare paragraf
document.querySelectorAll('.modes-text').forEach((el) => {
  observer.observe(el);
});
// === Flip Card Logic ===
function flipCard(card) {
  card.classList.toggle("flipped");
}
document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('#pw-line, #uh-line, #ip-line');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // ✅ corect
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.4
  });

  lines.forEach(line => observer.observe(line));
});
document.addEventListener('DOMContentLoaded', () => {
  // Observator separat pentru Modes Line
  const modesLine = document.getElementById('modes-line');

  if (modesLine) {
    const observerModes = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerModes.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    observerModes.observe(modesLine);
  }
});
// === POWERZONE Line Scroll Animation ===
const powerzoneLine = document.getElementById('pz-line');
if (powerzoneLine) {
  const observerPZ = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerPZ.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  observerPZ.observe(powerzoneLine);
}

const exploreLine = document.querySelector('#explore-line');
const exploreObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      exploreObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

exploreObserver.observe(exploreLine);
// === SWIPE STACK LOGIC FOR EXPLORE CARDS ===
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

// === MULTILANGUAGE MODULE – START ===
// === MULTILANGUAGE MODULE (Custom Dropdown) ===

document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('lang-toggle');
  const langOptions = document.getElementById('lang-options');
  const langBtnText = document.getElementById('selected-lang-name');
  const langBtnFlag = document.getElementById('selected-lang-flag');

  const langs = {
  en: 'English',
  ro: 'Română',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  es: 'Español',
  ru: 'Russian',
  zh: 'Chinese',
  hi: 'Hindi',
  ar: 'Arabic',
  hu: 'Hungarian',
  pl: 'Polish',
  uk: 'Ukrainian',
  nl: 'Dutch',
  el: 'Greek',
  tr: 'Turkish'
};

  function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
          el.innerHTML = data[key]; // permite HTML (ex: <br>)
        }
      });

      // Actualizează numele și steagul selectat
      langBtnText.textContent = langs[lang];
      const selectedFlag = document.querySelector(`li[data-lang="${lang}"]`);
      if (selectedFlag) {
        langBtnFlag.textContent = selectedFlag.textContent.slice(0, 2);
      }
    })
    .catch(err => console.error("Language loading error:", err));
}

  function setLanguage(lang) {
    localStorage.setItem('selectedLang', lang);
    loadLanguage(lang);
  }

  langToggle.addEventListener('click', () => {
    langToggle.parentElement.classList.toggle('open');
  });

  langOptions.querySelectorAll('li').forEach(option => {
    option.addEventListener('click', () => {
      const selectedLang = option.getAttribute('data-lang');
      setLanguage(selectedLang);
      langToggle.parentElement.classList.remove('open');
    });
  });

  // Load saved lang
  const savedLang = localStorage.getItem('selectedLang') || 'en';
  setLanguage(savedLang);
});
