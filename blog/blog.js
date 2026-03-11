document.addEventListener("DOMContentLoaded", () => {

const header = document.getElementById("siteHeader");
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");
const langDropdown = document.querySelector(".lang-dropdown");

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

const chips = document.querySelectorAll(".chip");
const posts = document.querySelectorAll(".post-card, .featured-post");

const searchInput = document.getElementById("blogSearch");
const langLinks = langMenu.querySelectorAll("a");

/* ------------------------------
STICKY HEADER SCROLL EFFECT
------------------------------ */
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

/* ------------------------------
LANGUAGE DROPDOWN
------------------------------ */
langBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langDropdown.classList.toggle("open");

  const expanded = langBtn.getAttribute("aria-expanded") === "true";
  langBtn.setAttribute("aria-expanded", String(!expanded));
});

/* ------------------------------
CLOSE DROPDOWN ON OUTSIDE CLICK
------------------------------ */
document.addEventListener("click", (e) => {
  if (!langDropdown.contains(e.target)) {
    langDropdown.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }
});

/* ------------------------------
BURGER MENU
------------------------------ */
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileNav.classList.toggle("show");

  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
});

/* ------------------------------
CLOSE MOBILE MENU WHEN LINK CLICKED
------------------------------ */
const mobileLinks = mobileNav.querySelectorAll("a");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mobileNav.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* ------------------------------
CATEGORY FILTER
------------------------------ */
chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    const filter = chip.dataset.filter;

    posts.forEach(post => {
      const categories = post.dataset.category || "";

      if (filter === "all") {
        post.classList.remove("hidden");
        return;
      }

      if (categories.includes(filter)) {
        post.classList.remove("hidden");
      } else {
        post.classList.add("hidden");
      }
    });
  });
});

/* ------------------------------
BLOG SEARCH
------------------------------ */
function filterPosts() {
  const query = searchInput.value.toLowerCase().trim();

  posts.forEach(post => {
    const text = post.innerText.toLowerCase();

    if (text.includes(query)) {
      post.classList.remove("hidden");
    } else {
      post.classList.add("hidden");
    }
  });
}

searchInput.addEventListener("keyup", filterPosts);

/* ------------------------------
TRANSLATION ENGINE
------------------------------ */
async function loadLanguage(lang) {
  try {
    const response = await fetch(`/blog/assets/lang/${lang}.json`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Failed to load ${lang}.json (${response.status})`);
    }
if(lang === "ar"){
document.documentElement.dir = "rtl";
}
else{
document.documentElement.dir = "ltr";
}
    const translations = await response.json();
    applyTranslations(translations, lang);

    localStorage.setItem("pairmo_blog_lang", lang);
    document.documentElement.lang = lang;
  } catch (error) {
    console.error("Translation load error:", error);
  }
}

function applyTranslations(translations, lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");

    if (translations[key]) {
      el.textContent = translations[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");

    if (translations[key]) {
      el.placeholder = translations[key];
    }
  });

  const titleEl = document.querySelector("title[data-i18n]");
  if (titleEl) {
    const key = titleEl.getAttribute("data-i18n");
    if (translations[key]) {
      titleEl.textContent = translations[key];
    }
  }

  const currentLangLabel = langBtn.querySelector("[data-i18n='lang_current_name']");
  const currentLangKey = `lang_${lang}`;
  if (currentLangLabel && translations[currentLangKey]) {
    currentLangLabel.textContent = translations[currentLangKey];
  }
}

/* ------------------------------
LANGUAGE CLICK
------------------------------ */
langLinks.forEach(link => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();

    const lang = link.dataset.lang;
    langDropdown.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");

    await loadLanguage(lang);
  });
});

/* ------------------------------
LOAD SAVED LANGUAGE
------------------------------ */
const savedLang = localStorage.getItem("pairmo_blog_lang") || "en";
loadLanguage(savedLang);

});
const carousel = document.querySelector(".articles-carousel");

const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");

if(nextBtn && prevBtn){

nextBtn.addEventListener("click",()=>{
carousel.scrollBy({
left:320,
behavior:"smooth"
});
});

prevBtn.addEventListener("click",()=>{
carousel.scrollBy({
left:-320,
behavior:"smooth"
});
});

}
