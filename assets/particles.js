// Animation de particules rouges néon optimisée (fluide, légère)
const canvas = document.getElementById('particles-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 60; // Beaucoup plus de particules
  let particles = [];

  function randomNeonRed() {
    // Rouge néon pur
    return 'rgba(255,0,0,0.85)';
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height, // spawn partout
      r: 2.2 + Math.random() * 1.2,
      speed: 1.1 + Math.random() * 1.1,
      color: randomNeonRed(),
      glow: 0 // plus de glow
    };
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({length: PARTICLE_COUNT}, createParticle);
  }
  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.fillStyle = p.color;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      ctx.restore();
      p.y -= p.speed;
      if (p.y < -10) {
        // Respawn en bas
        p.x = Math.random() * canvas.width;
        p.y = canvas.height + Math.random() * 60;
        p.r = 2.2 + Math.random() * 1.2;
        p.speed = 0.5 + Math.random() * 0.7;
        p.glow = 16 + Math.random() * 8;
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
