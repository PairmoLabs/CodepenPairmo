window.addEventListener("load", function () {

  const sections = document.querySelectorAll('.about-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.started) {
        entry.target.dataset.started = "true";
        startCanvas(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  sections.forEach(section => observer.observe(section));

  function startCanvas(section) {

    const title = section.querySelector('h2');
    if (!title) return;

    const canvas = document.createElement('canvas');
    canvas.classList.add('section-canvas');
    title.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 120;
    canvas.height = 60;

    const type = section.dataset.visual;
    const startOffset = Math.random() * 2000;

    let lastTime = 0;

    function animate(time) {

      if (time - lastTime < 40) {
        requestAnimationFrame(animate);
        return;
      }
      lastTime = time;

      const adjustedTime = time + startOffset;

      ctx.clearRect(0, 0, 120, 60);
      ctx.strokeStyle = "#00ff9d";
      ctx.fillStyle = "#00ff9d";
      ctx.lineWidth = 1.8;
      ctx.shadowColor = "#00ff9d";
      ctx.shadowBlur = 8;

      // NETWORK
      if (type === "network") {
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
      }

      // TARGET
      if (type === "target") {
        const r = 20 + Math.sin(adjustedTime * 0.002) * 3;
        ctx.beginPath();
        ctx.arc(60, 30, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(60, 30, 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ORBIT
      if (type === "orbit") {
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
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

});
