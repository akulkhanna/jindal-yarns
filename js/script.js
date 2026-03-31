/* ============================================================
   JINDAL YARNS — Interactive Script
   Three.js 3D · GSAP ScrollTrigger · Vanilla-Tilt · UI
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. NAVIGATION
     ======================================================== */
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks  = document.querySelectorAll('.nav-links a, .nav-mobile a');

  // Scroll updates: Navbar & Progress Bar
  const progressBar = document.getElementById('scrollProgress');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = height > 0 ? (y / height) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
      // Interactive brightness on scroll velocity would be cool but simple gradient is more robust:
      progressBar.style.background = `linear-gradient(90deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%)`;
    }
    navbar.classList.toggle('scrolled', y > 60);
    lastScroll = y;
  }, { passive: true });

  // Hamburger toggle
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id], footer[id]');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observerNav.observe(s));


  /* ========================================================
     1.5 CUSTOM HIGH-TECH CURSOR
     ======================================================== */
  const cursor = document.getElementById('customCursor');
  const cursorFollower = document.getElementById('customCursorFollower');

  if (cursor && cursorFollower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // The main dot follows instantly
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }, { passive: true });

    // The ring follower interpolates smoothly with a slightly slower lag for premium feel
    gsap.ticker.add(() => {
      const lerp = 0.12;
      followerX += (mouseX - followerX) * lerp;
      followerY += (mouseY - followerY) * lerp;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    });

    // Hover effects on interactables
    const interactables = document.querySelectorAll('a, button, .zoomable, .textiles-tab, .magnetic-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('active');
        cursor.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('active');
        cursor.classList.remove('active');
        // Magnetic snap back reset
        gsap.to(el, { x: 0, y: 0, duration: 0.3 });
      });
      
      // Magnetic hover logic
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        // Calculate distance from center of element
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Move element slightly towards cursor
        gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: 'power2.out' });
        
        // CSS variable updates for glow
        if (el.classList.contains('magnetic-item')) {
          const px = (e.clientX - rect.left) / rect.width * 100;
          const py = (e.clientY - rect.top) / rect.height * 100;
          el.style.setProperty('--x', `${px}%`);
          el.style.setProperty('--y', `${py}%`);
        }
      });
    });
  }

  // --- Cinematic Background Controller (GSAP) ---
  const millBg = document.getElementById('millBg');
  if (millBg && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    // Basic Parallax
    gsap.to(millBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    // Sector 1: Zoom in on Heritage
    gsap.to(millBg, {
      scale: 1.3,
      filter: 'grayscale(1) contrast(1.4) brightness(0.4) blur(0px)',
      scrollTrigger: {
        trigger: '#heritage',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Sector 2: Blur and Fade on Yarn Catalog (to focus on cards)
    gsap.to(millBg, {
      scale: 1.5,
      opacity: 0.08,
      filter: 'grayscale(1) contrast(1.2) brightness(0.3) blur(10px)',
      scrollTrigger: {
        trigger: '#yarn-catalog',
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Sector 3: Restore slightly for Textiles
    gsap.to(millBg, {
      scale: 1.2,
      opacity: 0.15,
      filter: 'grayscale(1) contrast(1.3) brightness(0.4) blur(2px)',
      scrollTrigger: {
        trigger: '#home-textiles',
        start: 'top 60%',
        end: 'bottom 20%',
        scrub: 1
      }
    });
  }


  /* ========================================================
     2. THREE.JS — 3D Yarn Thread Particles
     ======================================================== */
  function initWebGL() {
    if (typeof THREE === 'undefined') return;

    function isWebGLAvailable() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) { return false; }
    }

    if (!isWebGLAvailable()) {
      console.warn("WebGL not supported. Skipping 3D background.");
      return;
    }

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const renderer = (() => {
      try {
        return new THREE.WebGLRenderer({
          canvas,
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance'
        });
      } catch (e) {
        console.error("Renderer creation failed:", e);
        return null;
      }
    })();
    
    if (!renderer) return;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // --- Particle System: Golden Yarn Threads ---
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 300 : 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    // Pre-computed brand colors
    const goldR = 0.77, goldG = 0.63, goldB = 0.35;   // #C5A059
    const navyR = 0.0,  navyG = 0.12, navyB = 0.36;   // #001F5B
    const creamR = 0.91, creamG = 0.89, creamB = 0.87; // #E8E3DD

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      velocities[i3]     = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      sizes[i] = Math.random() * 3 + 1;

      // Mix between gold, navy, and cream
      const mix = Math.random();
      if (mix < 0.55) {
        // Gold family
        const v = 0.8 + Math.random() * 0.2;
        colors[i3]     = goldR * v;
        colors[i3 + 1] = goldG * v;
        colors[i3 + 2] = goldB * v;
      } else if (mix < 0.8) {
        // Cream / warm white
        colors[i3]     = creamR;
        colors[i3 + 1] = creamG;
        colors[i3 + 2] = creamB * (0.6 + Math.random() * 0.4);
      } else {
        // Navy-blue accent
        colors[i3]     = navyR;
        colors[i3 + 1] = navyG + Math.random() * 0.1;
        colors[i3 + 2] = navyB + Math.random() * 0.2;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    // Custom shader for soft glow particles
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = 1.0 - smoothstep(0.0, 0.5, d);
        alpha *= 0.7;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Thread Lines ---
    const threadCount = isMobile ? 8 : 20;
    const threads = [];

    for (let t = 0; t < threadCount; t++) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*6),
        new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*6),
        new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*6),
        new THREE.Vector3((Math.random()-0.5)*10, (Math.random()-0.5)*10, (Math.random()-0.5)*6),
      ]);

      const threadGeom = new THREE.TubeGeometry(curve, 64, 0.015, 4, false);
      const threadMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(goldR * (0.6 + Math.random()*0.4), goldG * (0.6 + Math.random()*0.4), goldB * (0.6 + Math.random()*0.4)),
        transparent: true,
        opacity: 0.15 + Math.random() * 0.2,
      });
      const threadMesh = new THREE.Mesh(threadGeom, threadMat);
      threadMesh.userData = {
        rotSpeed: (Math.random()-0.5) * 0.002,
        rotAxis: new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize(),
      };
      scene.add(threadMesh);
      threads.push(threadMesh);
    }

    // --- Volumetric Light Cone ---
    const coneGeom = new THREE.ConeGeometry(3, 12, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xC5A059,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const lightCone = new THREE.Mesh(coneGeom, coneMat);
    lightCone.position.set(2, 6, -3);
    lightCone.rotation.z = -0.3;
    scene.add(lightCone);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Animation loop
    let animFrame;
    const clock = new THREE.Clock();

    function animate() {
      animFrame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

        // Update particle positions (gentle drift)
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        pos[i3]     += velocities[i3]     + Math.sin(t * 0.5 + i) * 0.0005;
        pos[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.3 + i) * 0.0005;
        pos[i3 + 2] += velocities[i3 + 2];

        // Interactive Mouse Repulsion Physics
        // scale mouseX/Y to match 3D space rough bounds (-6 to 6)
        const mx = mouseX * 6;
        const my = mouseY * 6;
        const dx = pos[i3] - mx;
        const dy = pos[i3 + 1] - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 2.5) {
          const force = (2.5 - dist) * 0.02;
          pos[i3]     += (dx / dist) * force;
          pos[i3 + 1] += (dy / dist) * force;
          pos[i3 + 2] += force * 0.5; // push them slightly forward too
        }

        // Wrap around
        if (pos[i3] >  6) pos[i3] = -6;
        if (pos[i3] < -6) pos[i3] =  6;
        if (pos[i3+1] >  6) pos[i3+1] = -6;
        if (pos[i3+1] < -6) pos[i3+1] =  6;
        if (pos[i3+2] >  4) pos[i3+2] = -4;
        if (pos[i3+2] < -4) pos[i3+2] =  4;
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate threads slowly
      threads.forEach(th => {
        th.rotateOnAxis(th.userData.rotAxis, th.userData.rotSpeed);
      });

      // Camera follows mouse gently
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Light cone subtle animation
      lightCone.rotation.z = -0.3 + Math.sin(t * 0.2) * 0.1;
      coneMat.opacity = 0.03 + Math.sin(t * 0.4) * 0.01;

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    }, { passive: true });
  }


  /* ========================================================
     3. GSAP SCROLLTRIGGER — Scroll Animations
     ======================================================== */
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Reveal elements on scroll
    document.querySelectorAll('.reveal').forEach((el, i) => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 50,
        rotateX: 8,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Parallax on hero
    gsap.to('.hero-content', {
      yPercent: 30,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // --- Kinetic Typography (Hero) ---
    const hTitle = document.getElementById('heroTitle');
    if (hTitle) {
      const words = hTitle.innerText.split(' ');
      hTitle.innerHTML = words.map(w => `<span style="display:inline-block">${w}</span>`).join(' ');
      
      gsap.to('#heroTitle span', {
        fontWeight: 900,
        scale: 1.2,
        color: '#C5A059',
        stagger: {
          amount: 0.5,
          from: "center"
        },
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom 40%',
          scrub: 1,
        }
      });
    }

    // Heritage image parallax
    gsap.to('.heritage-image-wrapper img', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.heritage',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Yarn cards stagger
    gsap.fromTo('.yarn-card', {
      opacity: 0,
      y: 60,
      scale: 0.95,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.yarn-grid',
        start: 'top 80%',
      },
    });

    // Stat counter animation
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      gsap.to(el, {
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate() {
          el.textContent = Math.round(parseFloat(el.innerText)) + '+';
        },
      });
    });

    // Country cards stagger
    gsap.fromTo('.country-card', {
      opacity: 0,
      x: 30,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.export-countries',
        start: 'top 80%',
      },
    });

    // Timeline items stagger
    gsap.fromTo('.timeline-item', {
      opacity: 0,
      x: -30,
    }, {
      opacity: 1,
      x: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.heritage-timeline',
        start: 'top 80%',
      },
    });

    // Footer reveal
    gsap.fromTo('.footer-grid > div', {
      opacity: 0,
      y: 30,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.footer',
        start: 'top 85%',
      },
    });
  }


  /* ========================================================
     4. VANILLA-TILT — 3D Hover on Cards
     ======================================================== */
  function initTilt() {
    if (typeof VanillaTilt === 'undefined') return;
    document.querySelectorAll('[data-tilt]').forEach(el => {
      VanillaTilt.init(el, {
        max: 8,
        speed: 400,
        glare: true,
        'max-glare': 0.12,
        perspective: 1200,
      });
    });
  }


  /* ========================================================
     5. TEXTILES TABS
     ======================================================== */
  const tabs = document.querySelectorAll('.textiles-tab');
  const panels = document.querySelectorAll('.textiles-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const panelId = tab.dataset.panel;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`panel-${panelId}`).classList.add('active');
    });
  });


  /* ========================================================
     6. IMAGE ZOOM MODAL
     ======================================================== */
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');

  document.querySelectorAll('.zoomable').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      modalImg.src = img.dataset.zoomSrc || img.src;
      modal.classList.add('open');
    });
  });

  modal.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });


  /* ========================================================
     7. PARALLAX MOUSE TRACKING (Hero)
     ======================================================== */
  const heroContent = document.querySelector('.hero-content');
  const heroLogo    = document.querySelector('.hero-logo');

  document.addEventListener('mousemove', (e) => {
    if (!heroContent) return;
    const x = (e.clientX / window.innerWidth  - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    heroContent.style.transform = `translate(${x * 8}px, ${y * 5}px)`;
    if (heroLogo) {
      // Magnetic effect on logo (stronger than text)
      heroLogo.style.transform = `translate(${x * -20}px, ${y * -15}px) rotate(${x * 3}deg)`;
    }
  }, { passive: true });


  /* ========================================================
     8. INIT — Wait for CDN Scripts
     ======================================================== */
  function waitForLibs(cb, timeout = 8000) {
    const start = Date.now();
    const check = () => {
      if (typeof THREE !== 'undefined' && typeof gsap !== 'undefined') {
        cb();
      } else if (Date.now() - start < timeout) {
        requestAnimationFrame(check);
      } else {
        // Fallback: init what's available
        cb();
      }
    };
    check();
  }

  waitForLibs(() => {
    initWebGL();
    initGSAP();
    initTilt();
    initHeroIntro();
  });

  /* ========================================================
     9. THREAD ASSEMBLER — Logo Particle Assembly Intro
     ======================================================== */
  function initHeroIntro() {
    const introScreen = document.getElementById('introScreen');
    if (!introScreen) return;

    // Fail-safe: Force hide intro after 10 seconds regardless of what happens
    const introFailSafe = setTimeout(() => {
      if (!introScreen.classList.contains('hidden')) {
        console.warn("Intro stuck. Triggering fail-safe reveal.");
        skipIntro();
      }
    }, 10000);

    function skipIntro() {
      clearTimeout(introFailSafe);
      if (introScreen) {
        introScreen.style.display = 'none';
        introScreen.classList.add('hidden');
      }
      document.body.style.overflow = '';
      document.querySelectorAll('.hero-logo, .hero-title, .hero-tagline, .hero-badges, .hero-scroll-cue').forEach(el => {
        el.style.opacity = '1';
      });
      // Breathe the logo immediately if skipped
      const hLogo = document.getElementById('heroLogo');
      if (hLogo) hLogo.style.animation = 'logoPulseAfterRender 4s ease-in-out infinite';
    }

    if (typeof gsap === 'undefined' || typeof THREE === 'undefined') {
      skipIntro();
      return;
    }

    // WebGL Check for intro
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn("WebGL unavailable for intro.");
        skipIntro();
        return;
      }
    } catch (e) {
      skipIntro();
      return;
    }

    // --- DOM Refs ---
    // (introScreen already defined above)
    const introCanvas = document.getElementById('introCanvas');
    const logoSource = document.getElementById('introLogoSource');
    const introLogo = document.getElementById('introLogo');
    const introTitle = document.getElementById('introTitle');
    const introTagline = document.getElementById('introTagline');
    const introLine = document.getElementById('introLine');
    const heroLogo = document.getElementById('heroLogo');
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');
    const heroBadges = document.getElementById('heroBadges');
    const scrollCue = document.querySelector('.hero-scroll-cue');

    if (!introScreen || !introCanvas || !logoSource) return;

    // Block scrolling during intro
    document.body.style.overflow = 'hidden';

    // --- Setup Three.js for intro canvas ---
    const renderer = (() => {
      try {
        return new THREE.WebGLRenderer({
          canvas: introCanvas,
          antialias: false,
          alpha: true,
        });
      } catch (e) {
        console.error("Intro renderer failed:", e);
        return null;
      }
    })();

    if (!renderer) {
      skipIntro();
      return;
    }
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Mouse tracking for inertial rotation
    let introMouseX = 0, introMouseY = 0;
    document.addEventListener('mousemove', (e) => {
      introMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      introMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // --- Sample logo pixels ---
    function sampleLogoPixels(img, sampleSize) {
      const offscreen = document.createElement('canvas');
      const ctx = offscreen.getContext('2d');
      offscreen.width = sampleSize;
      offscreen.height = sampleSize;
      try {
        ctx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        const pixels = imageData.data;

        const targets = [];
        const step = 2; // Sample every 2nd pixel for density control

        for (let y = 0; y < sampleSize; y += step) {
          for (let x = 0; x < sampleSize; x += step) {
            const i = (y * sampleSize + x) * 4;
            const alpha = pixels[i + 3];
            if (alpha > 100) { // Slightly higher threshold for cleaner shape
              // Map pixel coords to 3D space (centered at 0,0)
              const px = (x / sampleSize - 0.5) * 4.5; // Slightly larger spread
              const py = -(y / sampleSize - 0.5) * 4.5;
              const r = pixels[i] / 255;
              const g = pixels[i + 1] / 255;
              const b = pixels[i + 2] / 255;
              targets.push({ x: px, y: py, z: 0, r, g, b });
            }
          }
        }
        return targets;
      } catch (e) {
        console.error("Critical: getImageData failed. Likely CORS or untrusted source.", e);
        return [];
      }
    }

    function buildParticleSystem(targets) {
      const count = targets.length;
      const geometry = new THREE.BufferGeometry();
      const startPositions = new Float32Array(count * 3);
      const endPositions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const progress = { value: 0 }; // animated by GSAP

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Random scattered start positions (spread across a sphere)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 6 + Math.random() * 6;
        startPositions[i3]     = radius * Math.sin(phi) * Math.cos(theta);
        startPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        startPositions[i3 + 2] = radius * Math.cos(phi) - 3;

        // Target positions (logo shape)
        endPositions[i3]     = targets[i].x;
        endPositions[i3 + 1] = targets[i].y;
        endPositions[i3 + 2] = targets[i].z;

        // Use actual logo pixel colors, tinted gold
        const goldMix = 0.4 + Math.random() * 0.3;
        colors[i3]     = targets[i].r * (1 - goldMix) + 0.77 * goldMix;
        colors[i3 + 1] = targets[i].g * (1 - goldMix) + 0.63 * goldMix;
        colors[i3 + 2] = targets[i].b * (1 - goldMix) + 0.35 * goldMix;

        sizes[i] = 1.5 + Math.random() * 2;
      }

      // Set initial positions to scattered
      const currentPositions = new Float32Array(startPositions);
      geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Soft glow shader
      const vertexShader = `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `;
      const fragmentShader = `
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, d);
          alpha *= 0.85;
          gl_FragColor = vec4(vColor, alpha);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Add floating ambient threads for atmosphere
      const threadGroup = new THREE.Group();
      for (let t = 0; t < 12; t++) {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3((Math.random()-0.5)*14, (Math.random()-0.5)*10, (Math.random()-0.5)*6 - 3),
          new THREE.Vector3((Math.random()-0.5)*14, (Math.random()-0.5)*10, (Math.random()-0.5)*6 - 3),
          new THREE.Vector3((Math.random()-0.5)*14, (Math.random()-0.5)*10, (Math.random()-0.5)*6 - 3),
        ]);
        const threadGeom = new THREE.TubeGeometry(curve, 32, 0.01, 4, false);
        const threadMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0.77 * (0.5 + Math.random()*0.5), 0.63 * (0.5 + Math.random()*0.5), 0.35 * (0.5 + Math.random()*0.5)),
          transparent: true,
          opacity: 0.08 + Math.random() * 0.12,
        });
        threadGroup.add(new THREE.Mesh(threadGeom, threadMat));
      }
      scene.add(threadGroup);

      return { geometry, points, startPositions, endPositions, currentPositions, progress, count, threadGroup };
    }

    // --- Animation Loop ---
    function runIntroAnimation(system) {
      const clock = new THREE.Clock();
      let isAnimating = true;

      function animate() {
        if (!isAnimating) return;
        requestAnimationFrame(animate);

        const t = clock.getElapsedTime();
        const p = system.progress.value;

        // Interpolate positions: scattered → logo
        for (let i = 0; i < system.count; i++) {
          const i3 = i * 3;
          // Ease each particle with slight individual variation
          const individualDelay = (i / system.count) * 0.3;
          const adjustedP = Math.max(0, Math.min(1, (p - individualDelay) / (1 - individualDelay)));
          const easedP = adjustedP * adjustedP * (3 - 2 * adjustedP); // smoothstep

          system.currentPositions[i3]     = system.startPositions[i3]     + (system.endPositions[i3]     - system.startPositions[i3])     * easedP;
          system.currentPositions[i3 + 1] = system.startPositions[i3 + 1] + (system.endPositions[i3 + 1] - system.startPositions[i3 + 1]) * easedP;
          system.currentPositions[i3 + 2] = system.startPositions[i3 + 2] + (system.endPositions[i3 + 2] - system.startPositions[i3 + 2]) * easedP;

          // Add gentle float when not fully assembled
          if (p < 0.95) {
            system.currentPositions[i3]     += Math.sin(t * 0.8 + i * 0.1) * 0.02 * (1 - easedP);
            system.currentPositions[i3 + 1] += Math.cos(t * 0.6 + i * 0.1) * 0.02 * (1 - easedP);
          }
        }
        system.geometry.attributes.position.needsUpdate = true;

        // Inertial mouse rotation
        system.points.rotation.y += (introMouseX * 0.15 - system.points.rotation.y) * 0.03;
        system.points.rotation.x += (introMouseY * 0.08 - system.points.rotation.x) * 0.03;
        system.threadGroup.rotation.y = system.points.rotation.y * 0.5;

        renderer.render(scene, camera);
      }

      animate();

      // GSAP animation: drive the progress from 0 → 1
      const introTL = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          // After assembly, cross-fade to real logo + reveal text
          crossFadeToLogo(system, () => {
            isAnimating = false;
            renderer.dispose();
          });
        },
      });

      // Phase 1: Particles swirl inward (0 → 1)
      introTL.to(system.progress, {
        value: 1,
        duration: 3.5,
        ease: 'power2.inOut',
      })
      // Brief hold at assembled state
      .to({}, { duration: 0.6 });
    }

    // --- Cross-fade from particles to real logo, then reveal text ---
    function crossFadeToLogo(system, onRenderDone) {
      const fadeOutTL = gsap.timeline();

      // Fade out Three.js canvas
      fadeOutTL.to(introCanvas, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
      })

      // Fade in the real logo image
      .to(introLogo, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')

      // Title fades in
      .to(introTitle, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.2')
      .fromTo(introTitle.querySelector('.intro-title-line'), {
        y: 30,
        filter: 'blur(6px)',
      }, {
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      }, '<')
      .fromTo(introTitle.querySelector('.intro-title-sub'), {
        opacity: 0,
        letterSpacing: '0.6em',
      }, {
        opacity: 1,
        letterSpacing: '0.35em',
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.4')

      // Tagline
      .to(introTagline, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')

      // Decorative line
      .to(introLine, {
        opacity: 1,
        width: 120,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')

      // Hold
      .to({}, { duration: 0.6 })

      // Transition to hero
      .call(() => {
        onRenderDone();
        startPhase2();
      });
    }

    // --- Phase 2: Slide intro away, reveal hero ---
    function startPhase2() {
      const heroTL = gsap.timeline();
      const scanline = document.getElementById('scanline');

      // Scanline Swipe
      if (scanline) {
        heroTL.fromTo(scanline, {
          top: '0%', opacity: 1, height: '2px'
        }, {
          top: '100%', opacity: 0, height: '10px',
          duration: 1.2, ease: 'power3.inOut'
        });
      }

      heroTL.to(introScreen, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power3.inOut',
      })
      .call(() => {
        introScreen.classList.add('hidden');
        introScreen.style.display = 'none';
        document.body.style.overflow = '';
      })
      .to(heroLogo, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')
      .set(heroTitle, { opacity: 1 })
      .fromTo(heroTitle.querySelectorAll('span'), {
        opacity: 0, y: 40, rotateX: 15, filter: 'blur(8px)',
      }, {
        opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)',
        duration: 0.8, stagger: 0.2, ease: 'power3.out',
      }, '-=0.3')
      .fromTo(heroTagline, {
        opacity: 0, y: 20, letterSpacing: '0.5em',
      }, {
        opacity: 1, y: 0, letterSpacing: '0.2em',
        duration: 0.7, ease: 'power2.out',
      }, '-=0.3')
      .set(heroBadges, { opacity: 1 })
      .fromTo(heroBadges.querySelectorAll('.hero-badge'), {
        opacity: 0, y: 25, scale: 0.9,
      }, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.5, stagger: 0.15, ease: 'back.out(1.4)',
      }, '-=0.2')
      .to(scrollCue, {
        opacity: 1, duration: 0.6, ease: 'power2.out',
      }, '-=0.1')
      .call(() => {
        heroLogo.style.animation = 'logoPulseAfterRender 4s ease-in-out infinite';
      });
    }

    // --- Start: Wait for logo image to load, then go ---
    function onLogoReady() {
      const targets = sampleLogoPixels(logoSource, 128);
      if (targets.length < 50) {
        // Fallback if image sampling fails
        console.warn("Logo sampling failed or too few pixels. Skipping intro.");
        skipIntro();
        return;
      }
      const system = buildParticleSystem(targets);
      runIntroAnimation(system);
    }

    if (logoSource.complete && logoSource.naturalWidth > 0) {
      onLogoReady();
    } else {
      logoSource.onload = onLogoReady;
      logoSource.onerror = () => {
        // Image failed — skip intro
        skipIntro();
      };
    }
  }

  // Only one initialization block needed
  // Note: first one is at line 663

});
