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



/* ------------------------------
STICKY HEADER SCROLL EFFECT
------------------------------ */

window.addEventListener("scroll", () => {

if(window.scrollY > 20){
header.classList.add("scrolled");
}
else{
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
langBtn.setAttribute("aria-expanded", !expanded);

});



/* ------------------------------
CLOSE DROPDOWN ON OUTSIDE CLICK
------------------------------ */

document.addEventListener("click", (e) => {

if(!langDropdown.contains(e.target)){

langDropdown.classList.remove("open");
langBtn.setAttribute("aria-expanded", false);

}

});



/* ------------------------------
BURGER MENU
------------------------------ */

menuToggle.addEventListener("click", () => {

menuToggle.classList.toggle("active");
mobileNav.classList.toggle("show");

const expanded = menuToggle.getAttribute("aria-expanded") === "true";
menuToggle.setAttribute("aria-expanded", !expanded);

});



/* ------------------------------
CLOSE MOBILE MENU WHEN LINK CLICKED
------------------------------ */

const mobileLinks = mobileNav.querySelectorAll("a");

mobileLinks.forEach(link => {

link.addEventListener("click", () => {

menuToggle.classList.remove("active");
mobileNav.classList.remove("show");
menuToggle.setAttribute("aria-expanded", false);

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

const categories = post.dataset.category;

if(filter === "all"){
post.classList.remove("hidden");
return;
}

if(categories.includes(filter)){
post.classList.remove("hidden");
}
else{
post.classList.add("hidden");
}

});

});

});



/* ------------------------------
BLOG SEARCH
------------------------------ */

function filterPosts(){

const query = searchInput.value.toLowerCase();

posts.forEach(post => {

const text = post.innerText.toLowerCase();

if(text.includes(query)){
post.classList.remove("hidden");
}
else{
post.classList.add("hidden");
}

});

}

searchInput.addEventListener("keyup", filterPosts);



/* ------------------------------
LANGUAGE SELECT (UI ONLY)
------------------------------ */

const langLinks = langMenu.querySelectorAll("a");

langLinks.forEach(link => {

link.addEventListener("click", (e) => {

e.preventDefault();

const langName = link.textContent;

langBtn.querySelector("span").textContent = langName;

langDropdown.classList.remove("open");

});

});

});
/* ------------------------------
I18N TRANSLATION SYSTEM
------------------------------ */

async function loadLanguage(lang){

try{

const response = await fetch(`/blog/assets/i18n/${lang}.json`);

const translations = await response.json();

applyTranslations(translations);

localStorage.setItem("pairmo_lang", lang);

}
catch(err){

console.error("Language load error:", err);

}

}


function applyTranslations(translations){

document.querySelectorAll("[data-i18n]").forEach(el => {

const key = el.getAttribute("data-i18n");

if(translations[key]){
el.textContent = translations[key];
}

});

document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {

const key = el.getAttribute("data-i18n-placeholder");

if(translations[key]){
el.placeholder = translations[key];
}

});

}


/* ------------------------------
LANGUAGE CLICK
------------------------------ */

langLinks.forEach(link => {

link.addEventListener("click", (e) => {

e.preventDefault();

const lang = link.dataset.lang;
const langName = link.textContent;

langBtn.querySelector("span").textContent = langName;

langDropdown.classList.remove("open");

loadLanguage(lang);

});

});


/* ------------------------------
LOAD SAVED LANGUAGE
------------------------------ */

const savedLang = localStorage.getItem("pairmo_lang") || "en";

loadLanguage(savedLang);
