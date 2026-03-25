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

  // Scroll-based navbar glass effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
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

    // The ring follower interpolates smoothly
    gsap.ticker.add(() => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    });

    // Hover effects on interactables
    const interactables = document.querySelectorAll('a, button, .zoomable, .textiles-tab');
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
      });
    });
  }


  /* ========================================================
     2. THREE.JS — 3D Yarn Thread Particles
     ======================================================== */
  function initWebGL() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
    });
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
      heroLogo.style.transform = `translate(${x * -12}px, ${y * -8}px) rotate(${x * 2}deg)`;
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
     9. FULL-SCREEN CINEMATIC INTRO + HERO REVEAL
     ======================================================== */
  function initHeroIntro() {
    if (typeof gsap === 'undefined') {
      // Fallback: show everything immediately
      const introEl = document.getElementById('introScreen');
      if (introEl) introEl.style.display = 'none';
      document.querySelectorAll('.hero-logo, .hero-title, .hero-tagline, .hero-badges, .hero-scroll-cue').forEach(el => {
        el.style.opacity = '1';
      });
      return;
    }

    // --- Intro Elements ---
    const introScreen = document.getElementById('introScreen');
    const introLogo = document.getElementById('introLogo');
    const introScanLine = document.getElementById('introScanLine');
    const introGlowRing = document.getElementById('introGlowRing');
    const introTitle = document.getElementById('introTitle');
    const introTagline = document.getElementById('introTagline');
    const introLine = document.getElementById('introLine');

    // --- Hero Elements ---
    const heroLogo = document.getElementById('heroLogo');
    const heroTitle = document.getElementById('heroTitle');
    const heroTagline = document.getElementById('heroTagline');
    const heroBadges = document.getElementById('heroBadges');
    const scrollCue = document.querySelector('.hero-scroll-cue');

    if (!introScreen || !introLogo) return;

    // Block scrolling during intro
    document.body.style.overflow = 'hidden';

    // =============================================
    // PHASE 1: FULL-SCREEN INTRO ANIMATION
    // =============================================
    const introTL = gsap.timeline({
      delay: 0.3,
      onComplete: startPhase2,
    });

    // 1a. Scan-line appears
    introTL.to(introScanLine, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.in',
    })

    // 1b. Scan-line sweeps down + logo reveals via clip-path
    .to(introScanLine, {
      top: '100%',
      duration: 1.6,
      ease: 'power1.inOut',
    }, '<')
    .to(introLogo, {
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.6,
      ease: 'power1.inOut',
    }, '<')

    // 1c. Scan-line fades
    .to(introScanLine, {
      opacity: 0,
      duration: 0.3,
    })

    // 1d. Glow ring burst
    .to(introGlowRing, {
      width: 400,
      height: 400,
      opacity: 0.8,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')
    .to(introGlowRing, {
      width: 700,
      height: 700,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })

    // 1e. Brand title fades in
    .to(introTitle, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6')
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

    // 1f. Tagline fades in
    .to(introTagline, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2')

    // 1g. Decorative golden line expands
    .to(introLine, {
      opacity: 1,
      width: 120,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.3')

    // 1h. Hold the intro for a beat
    .to({}, { duration: 0.8 });

    // =============================================
    // PHASE 2: TRANSITION TO HERO
    // =============================================
    function startPhase2() {
      const heroTL = gsap.timeline();

      // 2a. Slide the intro screen upward and fade out
      heroTL.to(introScreen, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power3.inOut',
      })

      // 2b. Mark intro as hidden and re-enable scrolling
      .call(() => {
        introScreen.classList.add('hidden');
        introScreen.style.display = 'none';
        document.body.style.overflow = '';
      })

      // 2c. Hero logo fades in (already big at 200px)
      .to(heroLogo, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.6')

      // 2d. Title lines reveal with stagger
      .set(heroTitle, { opacity: 1 })
      .fromTo(heroTitle.querySelectorAll('span'), {
        opacity: 0,
        y: 40,
        rotateX: 15,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.3')

      // 2e. Tagline
      .fromTo(heroTagline, {
        opacity: 0,
        y: 20,
        letterSpacing: '0.5em',
      }, {
        opacity: 1,
        y: 0,
        letterSpacing: '0.2em',
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.3')

      // 2f. Badges pop in
      .set(heroBadges, { opacity: 1 })
      .fromTo(heroBadges.querySelectorAll('.hero-badge'), {
        opacity: 0,
        y: 25,
        scale: 0.9,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.4)',
      }, '-=0.2')

      // 2g. Scroll cue
      .to(scrollCue, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1')

      // 2h. Start perpetual logo breathing
      .call(() => {
        heroLogo.style.animation = 'logoPulseAfterRender 4s ease-in-out infinite';
      });
    }
  }

});
