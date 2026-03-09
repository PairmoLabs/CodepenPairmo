

document.querySelectorAll('.about-section').forEach((section, index) => {

  const canvas = document.createElement('canvas');
  canvas.classList.add('section-canvas');

  const title = section.querySelector('h2');
  title.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = 120;
  canvas.height = 60;

  const type = section.dataset.visual;

  // delay diferit pentru fiecare
  const startOffset = Math.random() * 2000;

  function animate(time) {

    const adjustedTime = time + startOffset;

    ctx.clearRect(0,0,120,60);
    ctx.strokeStyle = "#00ff9d";
    ctx.fillStyle = "#00ff9d";
    ctx.lineWidth = 1.8;
    ctx.shadowColor = "#00ff9d";
ctx.shadowBlur = 12;

    // NETWORK
    
 
    // NETWORK (AI neural network style)
if(type==="network"){

const nodes = [
  {x:20,y:20},
  {x:60,y:10},
  {x:100,y:25},
  {x:35,y:45},
  {x:80,y:45}
];

ctx.strokeStyle="rgba(0,255,157,0.35)";
ctx.fillStyle="#00ff9d";

// draw connections
for(let i=0;i<nodes.length;i++){
  for(let j=i+1;j<nodes.length;j++){

    const dx = nodes[i].x - nodes[j].x;
    const dy = nodes[i].y - nodes[j].y;
    const dist = Math.sqrt(dx*dx+dy*dy);

    if(dist < 70){

      ctx.beginPath();
      ctx.moveTo(nodes[i].x,nodes[i].y);
      ctx.lineTo(nodes[j].x,nodes[j].y);
      ctx.stroke();

    }

  }
}

// draw nodes
nodes.forEach(n=>{

ctx.beginPath();
ctx.arc(n.x,n.y,2.5,0,Math.PI*2);
ctx.fill();

});

// data pulse animation
const pulse = (adjustedTime*0.002)%1;

const start = nodes[0];
const end = nodes[2];

const x = start.x + (end.x-start.x)*pulse;
const y = start.y + (end.y-start.y)*pulse;

ctx.beginPath();
ctx.arc(x,y,3,0,Math.PI*2);
ctx.fillStyle="#ffffff";
ctx.fill();

}
    // LAYERS
    if(type==="layers"){
      const pulse = Math.abs(Math.sin(adjustedTime * 0.002))*10;
      ctx.strokeRect(20,10,80,12);
      ctx.strokeRect(30,25,60,10);
      ctx.strokeRect(40,40,40+pulse,10);
    }

    // TARGET
    if(type==="target"){
      const r = 20 + Math.sin(adjustedTime*0.002)*3;
      ctx.beginPath();
      ctx.arc(60,30,r,0,Math.PI*2);
     
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(60,30,10,0,Math.PI*2);
      ctx.stroke();
    }

    // GRID
    if(type==="grid"){
      const shift = (adjustedTime*0.05)%20;
      for(let i=20;i<=100;i+=20){
        ctx.beginPath();
        ctx.moveTo(i,10);
        ctx.lineTo(i,50);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(10,30+shift);
      ctx.lineTo(110,30+shift);
      ctx.stroke();
    }
if(type==="modes"){
  const baseY = 20;
  const shift = Math.sin(time * 0.002) * 5;

  // SOLO
  ctx.fillRect(30, baseY + shift, 18, 10);

  // CREW
  ctx.fillRect(55, baseY - shift, 18, 10);

  // PLANNER
  ctx.fillRect(80, baseY + shift, 18, 10);
}
    // MATRIX
    if(type==="matrix"){
      for(let i=0;i<5;i++){
        const x = (Math.sin(adjustedTime*0.001+i)*40)+60;
        const y = (i*10)+10;
        ctx.fillRect(x,y,3,8);
      }
    }

    // ORBIT
    if(type==="orbit"){
      const centerX = 60;
      const centerY = 30;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI*2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 18, 0, Math.PI*2);
      ctx.strokeStyle = "rgba(0,255,157,0.6)";
      ctx.stroke();

      const angle = adjustedTime * 0.002;
      const orbitX = centerX + 18 * Math.cos(angle);
      const orbitY = centerY + 18 * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(orbitX, orbitY, 3, 0, Math.PI*2);
      ctx.fillStyle = "#00ff9d";
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

});
 /* =========================
   LANGUAGE DROPDOWN
========================= */

const langToggle = document.getElementById("lang-toggle");
const langOptions = document.getElementById("lang-options");

if (langToggle && langOptions) {
  langToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    langToggle.parentElement.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    const wrapper = langToggle.parentElement;
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
    }
  });
}

/* =========================
   BURGER MENU
========================= */

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

if (burger && menu) {
  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.closest(".menu")) return;
    menu.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove("open");
    }
  });
}

document.querySelectorAll(".burger-link").forEach(link => {
  link.addEventListener("click", function(e){
    e.stopPropagation();

    const li = this.parentElement;
    li.classList.add("clicked");

    setTimeout(() => {
      if(menu) menu.classList.remove("open");
    }, 300);
  });
});
/* =========================
   ABOUT SCROLL ANIMATION
========================= */

const aboutSections = document.querySelectorAll(".about-section");

const aboutObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

}, {
  threshold: 0.25
});

aboutSections.forEach(section => {
  aboutObserver.observe(section);
});