/**
 * AURA VAPOR LABS - Interactive Hero Vapor & Smoke Particle System
 * Creates high-performance, realistic ethereal vapor swirls that react to cursor movement
 */

(function () {
  const canvas = document.getElementById("vaporCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, prevX: null, prevY: null, speed: 0 };
  let isMouseOverHero = false;
  let animationFrameId = null;

  // Configuration
  const PARTICLE_COUNT = window.innerWidth < 768 ? 45 : 85;
  const COLORS = [
    { r: 0, g: 242, b: 254, a: 0.08 },   // Cyan glow
    { r: 157, g: 78, b: 221, a: 0.09 },  // Neon Violet
    { r: 247, g: 37, b: 133, a: 0.05 },  // Magenta accent
    { r: 220, g: 230, b: 255, a: 0.06 }  // Crisp white/silver vapor
  ];

  function resizeCanvas() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
  }

  class VaporParticle {
    constructor(x, y, isInteractive = false) {
      this.reset(x, y, isInteractive);
    }

    reset(x, y, isInteractive = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : height + Math.random() * 50;
      this.radius = Math.random() * 70 + 40;
      this.maxRadius = this.radius * (Math.random() * 1.5 + 1.2);
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = -(Math.random() * 0.8 + 0.3);
      this.alpha = Math.random() * 0.08 + 0.02;
      this.targetAlpha = this.alpha;
      this.decay = Math.random() * 0.0008 + 0.0004;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.rotation = Math.random() * Math.PI * 2;
      this.vRotation = (Math.random() - 0.5) * 0.008;
      this.curl = (Math.random() - 0.5) * 0.02;
      this.isInteractive = isInteractive;
    }

    update() {
      // Gentle horizontal wave & upward rise
      this.vx += this.curl;
      this.x += this.vx;
      this.y += this.vy;
      this.rotation += this.vRotation;

      // Expand gently as vapor dissipates
      if (this.radius < this.maxRadius) {
        this.radius += 0.15;
      }

      // Cursor interaction force
      if (isMouseOverHero && mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 180;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 1.5;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force - 0.2;
          this.alpha = Math.min(this.alpha + 0.02, 0.25);
        }
      }

      // Friction
      this.vx *= 0.98;
      this.vy *= 0.99;

      // Alpha decay
      this.alpha -= this.decay;

      // Reset when faded or off screen
      if (this.alpha <= 0 || this.y < -this.radius || this.x < -this.radius || this.x > width + this.radius) {
        if (!this.isInteractive) {
          this.reset();
        } else {
          return false; // Remove temporary interactive particle
        }
      }
      return true;
    }

    draw() {
      if (this.alpha <= 0) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Create rich soft radial gradient puff
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
      grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 1.2})`);
      grad.addColorStop(0.4, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.7})`);
      grad.addColorStop(0.8, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.2})`);
      grad.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function init() {
    resizeCanvas();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = new VaporParticle(
        Math.random() * width,
        Math.random() * height
      );
      // Pre-age particles so they are already scattered smoothly
      p.alpha = Math.random() * 0.1;
      particles.push(p);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw existing particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const alive = particles[i].update();
      if (!alive) {
        particles.splice(i, 1);
      } else {
        particles[i].draw();
      }
    }

    // Replenish ambient particles if below target count
    while (particles.length < PARTICLE_COUNT) {
      particles.push(new VaporParticle());
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // Mouse move handlers for hero
  const heroSection = canvas.closest(".hero") || canvas.parentElement;

  heroSection.addEventListener("mouseenter", () => {
    isMouseOverHero = true;
  });

  heroSection.addEventListener("mouseleave", () => {
    isMouseOverHero = false;
    mouse.x = null;
    mouse.y = null;
  });

  heroSection.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // Spawn tiny vapor trail puff behind mouse if moved quickly
    if (mouse.prevX !== null) {
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speed = Math.hypot(dx, dy);
      if (speed > 5 && particles.length < PARTICLE_COUNT + 25) {
        const p = new VaporParticle(mouse.x, mouse.y, true);
        p.vx = dx * 0.1 + (Math.random() - 0.5) * 0.5;
        p.vy = dy * 0.1 - (Math.random() * 0.5 + 0.3);
        p.radius = Math.random() * 35 + 20;
        p.alpha = 0.18;
        particles.push(p);
      }
    }
  });

  // Touch support for mobile devices
  heroSection.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      isMouseOverHero = true;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  heroSection.addEventListener("touchend", () => {
    isMouseOverHero = false;
    mouse.x = null;
    mouse.y = null;
  });

  // Pause when off-screen to save battery/CPU
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) animate();
      } else {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      }
    });
  }, { threshold: 0.1 });

  observer.observe(heroSection);

  window.addEventListener("resize", () => {
    resizeCanvas();
  });

  init();
  animate();
})();
