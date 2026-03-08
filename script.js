document.addEventListener("DOMContentLoaded", () => {
  /**
   * =========================
   *  LANGUAGE (safe guards)
   * =========================
   */
  const langToggle = document.getElementById("lang-toggle");
  const langOptions = document.getElementById("lang-options");
  const langBtnFlag = document.getElementById("selected-lang-flag");
const langBtnName = document.getElementById("selected-lang-name");

  async function loadLanguage(lang) {

  try {

    const res = await fetch(`lang/${lang}.json`);
    const dict = await res.json();

    applyTranslations(dict);

    const selected = document.querySelector(
      `#lang-options li[data-lang="${lang}"]`
    );

    if (selected) {

      const parts = selected.textContent.trim().split(" ");
      const flag = parts.shift();
      const name = parts.join(" ");

      if (langBtnFlag) langBtnFlag.textContent = flag;
      if (langBtnName) langBtnName.textContent = name;

    }

  } catch (err) {
    console.error("Language loading error:", err);
  }

  }

  function setLanguage(lang) {
    try {
      localStorage.setItem("selectedLang", lang);
    } catch (_) {}
    loadLanguage(lang);
  }
function applyTranslations(dict){

  document.querySelectorAll("[data-i18n]").forEach(el => {

    const key = el.getAttribute("data-i18n");

    if(dict[key]){
      el.innerHTML = dict[key];
    }

  });
  if(dict.hero_typing){
startTyping(dict.hero_typing);
  }
  

}
  // UI: dropdown
  if (langToggle && langOptions) {
    langToggle.addEventListener("click", () => {
      langToggle.parentElement?.classList.toggle("open");
    });

    langOptions.querySelectorAll("li").forEach((option) => {
      option.addEventListener("click", () => {
        const lang = option.getAttribute("data-lang");
        if (lang) setLanguage(lang);
        langToggle.parentElement?.classList.remove("open");
      });
    });

    // close on outside click
    document.addEventListener("click", (e) => {
      const wrapper = langToggle.parentElement;
      if (!wrapper) return;
      if (!wrapper.contains(e.target)) wrapper.classList.remove("open");
    });
loadLanguage("en");
  }

  /**
   * =========================
   *  "HOW IT WORKS" mini cards
   *  (dacă există în HTML)
   * =========================
   */
  const howCards = document.querySelectorAll(".how-card");
  if (howCards.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    howCards.forEach((card) => observer.observe(card));
  }

  /**
   * =========================
   *  SWIPE DECK (real feel)
   *  - swipe stânga/dreapta
   *  - cardul dispare (remove)
   *  - merge cu mouse + touch (Pointer Events)
   * =========================
   *
   * HTML așteptat:
   * <div class="swipe-deck" id="demoDeck">
   *   <div class="swipe-card"><img ...></div>
   *   <div class="swipe-card"><img ...></div>
   *   <div class="swipe-card"><img ...></div>
   * </div>
   */

  const decks = document.querySelectorAll(".swipe-deck");

  decks.forEach((deck) => {
    let activeCard = null;
    let startX = 0;
    let currentX = 0;
    let dragging = false;

    function getTopCard() {
      // top = ultimul .swipe-card din container (ideal să fie “deasupra”)
      const cards = deck.querySelectorAll(".swipe-card");
      return cards.length ? cards[cards.length - 1] : null;
    }

    function setDeckInteractivity() {
      const top = getTopCard();
      const cards = deck.querySelectorAll(".swipe-card");
      cards.forEach((c) => c.classList.remove("is-top"));
      if (top) top.classList.add("is-top");
    }

    setDeckInteractivity();

    deck.addEventListener("pointerdown", (e) => {
      const top = getTopCard();
      if (!top) return;

      const clicked = e.target.closest(".swipe-card");
      if (!clicked || clicked !== top) return;

      activeCard = clicked;
      dragging = true;
      startX = e.clientX;
      currentX = 0;

      activeCard.style.transition = "none";
      activeCard.setPointerCapture?.(e.pointerId);
    });

    deck.addEventListener("pointermove", (e) => {
      if (!dragging || !activeCard) return;

      currentX = e.clientX - startX;
      const rotate = currentX * 0.05; // feel

      activeCard.style.transform = `translateX(${currentX}px) rotate(${rotate}deg)`;
    });

    function releaseCard() {
      if (!activeCard) return;

      const threshold = 80;
      const absX = Math.abs(currentX);

      activeCard.style.transition = "transform .35s ease, opacity .2s ease";

      if (absX > threshold) {
        const direction = currentX > 0 ? 1 : -1;
        activeCard.style.transform = `translateX(${direction * 700}px) rotate(${
          direction * 22
        }deg)`;
        activeCard.style.opacity = "0";

        const cardToRemove = activeCard;
        activeCard = null;
        dragging = false;

        // după animație, scoate cardul din DOM
        setTimeout(() => {
          cardToRemove.remove();
          setDeckInteractivity();
        }, 320);
      } else {
        // revine la loc
        activeCard.style.transform = "translateX(0px) rotate(0deg)";
        activeCard = null;
        dragging = false;
      }
    }

    deck.addEventListener("pointerup", () => releaseCard());
    deck.addEventListener("pointercancel", () => releaseCard());

    // dacă user iese cu pointer-ul din deck
    deck.addEventListener("pointerleave", () => {
      if (dragging) releaseCard();
    });
  });
});
/**
 * =========================
 *  ROADMAP SCROLL ANIMATION
 * =========================
 */

const roadmapCards = document.querySelectorAll(".phase-box");

if (roadmapCards.length) {

  const roadmapObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }

      });

    },
    { threshold: 0.2 }
  );

  roadmapCards.forEach(card => roadmapObserver.observe(card));

}
/* =========================
   BURGER MENU
========================= */

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

if (burger && menu) {

  burger.addEventListener("click", (e) => {
  // dacă ai dat click în interiorul meniului, nu toggla burger-ul
  if (e.target.closest(".menu")) return;
  menu.classList.toggle("open");
});

}

/* =========================
   BURGER LINK ANIMATION + DELAY
========================= */

document.querySelectorAll(".burger-link").forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();
  e.stopPropagation();

const target = this.getAttribute("href");
const li = this.parentElement;

/* animatie */
li.classList.add("clicked");

setTimeout(()=>{

menu.classList.remove("open");

/* scroll */
if(target.startsWith("#")){

const section = document.querySelector(target);

if(section){
section.scrollIntoView({
behavior:"smooth"
});
}

}else{

window.location.href = target;

}

},500);

});

});



const whatCards = document.querySelectorAll(".what-card");

const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},{threshold:0.3});

whatCards.forEach(card=>{
observer.observe(card);
});
window.showSuccess = function (event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" }
  })
    .then((response) => {
      if (response.ok) {
        const message = document.getElementById("success-message");
        if (message) {
          message.style.display = "block";
          setTimeout(() => (message.style.display = "none"), 5000);
        }
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    })
    .catch(() => alert("Network error. Please check your connection."));
};
/* =========================
   TYPE EFFECT (start on scroll)
========================= */

const typeTarget = document.getElementById("type-text");

let typeIndex = 0;
let typeText = "";

function startTyping(text){

typeText = text;
typeIndex = 0;
typeTarget.textContent = "";

function typeEffect(){

if(typeIndex < typeText.length){
typeTarget.textContent += typeText.charAt(typeIndex);
typeIndex++;
setTimeout(typeEffect,70);
}

}

typeEffect();

}
