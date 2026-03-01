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
    if(type==="network"){
      const offset = Math.sin(adjustedTime * 0.001) * 5;
      ctx.beginPath();
      ctx.arc(30+offset,20,2,0,Math.PI*2);
      ctx.arc(90-offset,25,2,0,Math.PI*2);
      ctx.arc(60,45,3,0,Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(30+offset,20);
      ctx.lineTo(90-offset,25);
      ctx.lineTo(60,45);
      ctx.stroke();
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