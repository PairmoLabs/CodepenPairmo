

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
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  })
  .then(response => {
    if (response.ok) {
      const message = document.getElementById("success-message");
      message.style.display = "block";

      setTimeout(() => {
        message.style.display = "none";
      }, 5000);

      form.reset(); // Resetează formularul
    } else {
      alert("❌ Something went wrong. Please try again.");
    }
  })
  .catch(() => {
    alert("❌ Network error. Please check your connection.");
  });
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
            if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
              el.setAttribute('placeholder', data[key]);
            } else {
              el.innerHTML = data[key]; // permite HTML (ex: <br>)
            }
          }
        });
        // Traduceri pentru atributele placeholder (ex: input email)
document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
  const key = el.getAttribute('data-i18n-placeholder');
  if (data[key]) {
    el.setAttribute('placeholder', data[key]);
  }
});

        // actualizează numele limbii și iconița steag
        langBtnText.textContent = langs[lang];
        const selectedFlag = document.querySelector(`li[data-lang="${lang}"]`);
        if (selectedFlag) {
          langBtnFlag.textContent = selectedFlag.textContent.trim().split(' ')[0];
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
      const flagEmoji = option.textContent.trim().split(' ')[0]; // ia primul caracter (emoji)
const flagSpan = document.getElementById('selected-lang-flag');
if (flagSpan) {
  flagSpan.textContent = flagEmoji;
}
      setLanguage(selectedLang);
      langToggle.parentElement.classList.remove('open');
    });
  });

  // Load language from localStorage or default to English
  const savedLang = localStorage.getItem('selectedLang') || 'en';
  setLanguage(savedLang);
});

/* ========================= */
/* ===== ABOUT PAGE JS ===== */
/* ========================= */

window.addEventListener("load", function () {

  if (!document.body.classList.contains("page-about")) return;

  const sections = document.querySelectorAll('.about-section');
  if (!sections.length) return;

  sections.forEach((section) => {

    const title = section.querySelector('h2');
    if (!title) return;

    const canvas = document.createElement('canvas');
    canvas.classList.add('section-canvas');
    title.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 120;
    canvas.height = 60;

    const type = section.dataset.visual || "";
    const startOffset = Math.random() * 2000;

    function animate(time) {

      const adjustedTime = time + startOffset;

      ctx.clearRect(0, 0, 120, 60);
      ctx.strokeStyle = "#00ff9d";
      ctx.fillStyle = "#00ff9d";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#00ff9d";
      ctx.shadowBlur = 12;

      switch (type) {

        case "network":
          const offset = Math.sin(adjustedTime * 0.001) * 5;
          ctx.beginPath();
          ctx.arc(30 + offset, 20, 2, 0, Math.PI * 2);
          ctx.arc(90 - offset, 25, 2, 0, Math.PI * 2);
          ctx.arc(60, 45, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(30 + offset, 20);
          ctx.lineTo(90 - offset, 25);
          ctx.lineTo(60, 45);
          ctx.stroke();
          break;

        case "layers":
          const pulse = Math.abs(Math.sin(adjustedTime * 0.002)) * 10;
          ctx.strokeRect(20, 10, 80, 12);
          ctx.strokeRect(30, 25, 60, 10);
          ctx.strokeRect(40, 40, 40 + pulse, 10);
          break;

        case "target":
          const r = 20 + Math.sin(adjustedTime * 0.002) * 3;
          ctx.beginPath();
          ctx.arc(60, 30, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(60, 30, 10, 0, Math.PI * 2);
          ctx.stroke();
          break;

        case "grid":
          const shift = (adjustedTime * 0.05) % 20;
          for (let i = 20; i <= 100; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 10);
            ctx.lineTo(i, 50);
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.moveTo(10, 30 + shift);
          ctx.lineTo(110, 30 + shift);
          ctx.stroke();
          break;

        case "modes":
          const baseY = 20;
          const move = Math.sin(adjustedTime * 0.002) * 5;
          ctx.fillRect(30, baseY + move, 18, 10);
          ctx.fillRect(55, baseY - move, 18, 10);
          ctx.fillRect(80, baseY + move, 18, 10);
          break;

        case "matrix":
          for (let i = 0; i < 5; i++) {
            const x = (Math.sin(adjustedTime * 0.001 + i) * 40) + 60;
            const y = (i * 10) + 10;
            ctx.fillRect(x, y, 3, 8);
          }
          break;

        case "orbit":
          const centerX = 60;
          const centerY = 30;

          ctx.beginPath();
          ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0,255,157,0.6)";
          ctx.stroke();

          const angle = adjustedTime * 0.002;
          const orbitX = centerX + 18 * Math.cos(angle);
          const orbitY = centerY + 18 * Math.sin(angle);

          ctx.beginPath();
          ctx.arc(orbitX, orbitY, 3, 0, Math.PI * 2);
          ctx.fill();
          break;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

  });

});
