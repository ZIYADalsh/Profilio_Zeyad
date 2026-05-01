(() => {
  "use strict";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));
  const root = document.documentElement;

  const EMAIL = "alshawsh161@gmail.com";
  const PHONE = "+967773793752";
  const WEBSITE = "https://calm-praline-f59ab1.netlify.app/";

  const projects = [
    {
      id: "fullstack-system",
      category: "fullstack",
      icon: "i-layers",
      title: "منصة ويب متكاملة",
      badge: "Full-Stack",
      summary: "تصميم حل متكامل يربط الواجهة الأمامية مع الخلفية وقاعدة البيانات ضمن تجربة استخدام حديثة.",
      problem: "إنشاء نظام ويب واضح وسهل الإدارة يدعم البيانات والواجهات والخدمات بشكل منظم وقابل للتوسع.",
      solution: "تنفيذ بنية Laravel منظمة مع MySQL وواجهات React أو HTML/CSS/JS وربط REST APIs بما يضمن الأداء وسهولة الصيانة.",
      tech: ["Laravel", "PHP", "MySQL", "REST APIs", "UI/UX"],
      highlight: "ترابط كامل بين الواجهة والـ API وقاعدة البيانات."
    },
    {
      id: "api-service",
      category: "backend",
      icon: "i-server",
      title: "خدمات API للتطبيقات والمواقع",
      badge: "Backend",
      summary: "بناء REST APIs واضحة ومرنة لخدمة الأنظمة وتطبيقات الموبايل بكفاءة.",
      problem: "الحاجة إلى نقاط ربط موحدة وآمنة وسهلة التكامل مع أكثر من واجهة أو تطبيق.",
      solution: "تصميم endpoints منظمة، وهيكلة منطق العمل، وتجهيز الاستجابات لتكون جاهزة للاستخدام في الويب والموبايل.",
      tech: ["PHP", "Laravel", "REST APIs", "MySQL"],
      highlight: "بنية خلفية نظيفة وقابلة للتطوير المستقبلي."
    },
    {
      id: "react-interface",
      category: "frontend",
      icon: "i-code",
      title: "واجهة تفاعلية حديثة",
      badge: "Frontend",
      summary: "تطوير واجهات أنيقة ومتجاوبة تعكس هوية بصرية حديثة وحركة سلسة.",
      problem: "الحاجة إلى واجهة مستخدم عصرية وسريعة وواضحة عبر مختلف أحجام الشاشات.",
      solution: "استخدام HTML وCSS وJavaScript وReact.js لبناء تجربة تفاعلية مع مكونات منظمة وحركة مدروسة.",
      tech: ["HTML", "CSS", "JavaScript", "React.js"],
      highlight: "تصميم جذاب وسرعة في التفاعل مع تجربة مستخدم مريحة."
    },
    {
      id: "flutter-app",
      category: "mobile",
      icon: "i-mobile",
      title: "تطبيق Flutter حديث",
      badge: "Mobile",
      summary: "تنفيذ تطبيقات موبايل عصرية مع واجهات نظيفة وربط مرن بالخدمات الخلفية.",
      problem: "الحاجة إلى تجربة موبايل مستقرة وحديثة مع إمكانية التكامل مع API لاحقاً.",
      solution: "تطوير شاشات Flutter قابلة للتطوير وربطها بالبيانات والخدمات ضمن تجربة سلسة ومظهر احترافي.",
      tech: ["Flutter", "UI", "API Integration", "Responsive"],
      highlight: "تطبيق مرن وجاهز للتوسع وتطوير الخصائص مستقبلاً."
    }
  ];

  function toast(message) {
    const el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  // Theme
  const themeToggle = $("#themeToggle");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const savedTheme = localStorage.getItem("portfolio-theme");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      themeToggle?.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      themeToggle?.setAttribute("aria-pressed", "false");
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  applyTheme(savedTheme || (prefersLight ? "light" : "dark"));

  themeToggle?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    applyTheme(isLight ? "dark" : "light");
    toast(isLight ? "تم التبديل إلى الوضع الداكن" : "تم التبديل إلى الوضع الفاتح");
  });

  // Navigation
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");

  function setMenu(open) {
    navMenu?.classList.toggle("is-open", open);
    navToggle?.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
    const use = navToggle?.querySelector("use");
    if (use) use.setAttribute("href", open ? "#i-close" : "#i-menu");
  }

  navToggle?.addEventListener("click", () => {
    setMenu(!navMenu?.classList.contains("is-open"));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const inside = navMenu.contains(target) || navToggle.contains(target);
    if (!inside && navMenu.classList.contains("is-open")) setMenu(false);
  });

  $$(".nav-link", navMenu).forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Active section + reveal
  const sections = $$("main section[id]");
  const navLinks = $$(".nav-link");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.18 });
    $$(".reveal").forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
      });
    }, { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 });
    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    $$(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  // Typing effect
  const roleTarget = $("#typedRole");
  const roleItems = [
    "Full-Stack & Mobile Developer",
    "Laravel & Flutter Specialist",
    "Modern UI & API Builder"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    if (!roleTarget) return;
    const current = roleItems[roleIndex];
    roleTarget.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
    let timeout = deleting ? 45 : 85;

    if (!deleting && charIndex > current.length) {
      deleting = true;
      timeout = 1300;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roleItems.length;
      timeout = 260;
    }

    window.setTimeout(typeRole, timeout);
  }
  window.setTimeout(typeRole, 400);

  // Counters
  const counters = $$(".counter");
  function startCounter(counter) {
    const target = Number(counter.dataset.target || 0);
    const duration = 1400;
    const startTime = performance.now();
    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      counter.textContent = String(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(frame);
      else counter.textContent = String(target);
    }
    requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.started) {
          entry.target.dataset.started = "true";
          startCounter(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(startCounter);
  }

  // Magnetic buttons
  $$(".magnetic").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      button.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
    });
    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });

  // Hero tilt
  const heroTilt = $("#heroTilt");
  heroTilt?.addEventListener("pointermove", (event) => {
    const rect = heroTilt.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    heroTilt.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  heroTilt?.addEventListener("pointerleave", () => {
    heroTilt.style.transform = "";
  });

  // Cursor glow
  const cursorGlow = $("#cursorGlow");
  if (cursorGlow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  // Background network canvas
  const canvas = $("#networkCanvas");
  if (canvas && !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 42;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.5 + Math.random() * 2.3
      }));
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const styles = getComputedStyle(root);
      const pointColor = styles.getPropertyValue("--primary").trim() || "#86d0c9";
      const lineColor = root.getAttribute("data-theme") === "light" ? "rgba(55, 94, 112, 0.12)" : "rgba(163, 226, 221, 0.12)";

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.fillStyle = pointColor;
        ctx.globalAlpha = 0.55;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.globalAlpha = 1 - dist / 130;
            ctx.strokeStyle = lineColor;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(animateCanvas);
    }

    resizeCanvas();
    animateCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  // Copy helpers
  async function copyText(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
      toast(successMessage);
    } catch (error) {
      toast(value);
    }
  }

  $("#copyEmailBtn")?.addEventListener("click", () => copyText(EMAIL, "تم نسخ البريد الإلكتروني"));
  $("#copyPhoneBtn")?.addEventListener("click", () => copyText(PHONE, "تم نسخ رقم الهاتف"));

  // Projects render and modal
  const projectGrid = $("#projectGrid");
  const projectModal = $("#projectModal");
  const projectModalContent = $("#projectModalContent");

  function renderProjects(filter = "all") {
    if (!projectGrid) return;
    const list = filter === "all" ? projects : projects.filter((item) => item.category === filter);
    projectGrid.innerHTML = list.map((project) => `
      <article class="project-card reveal hover-rise" data-id="${project.id}" tabindex="0" role="button" aria-label="فتح تفاصيل ${project.title}">
        <div class="project-card__icon"><svg><use href="#${project.icon}"></use></svg></div>
        <div class="project-card__top">
          <h3>${project.title}</h3>
          <span class="project-card__badge">${project.badge}</span>
        </div>
        <p>${project.summary}</p>
        <div class="project-card__meta">
          <span>${project.highlight}</span>
          <span>${project.tech.length} تقنيات</span>
        </div>
        <div class="project-tags">${project.tech.map((item) => `<span>${item}</span>`).join("")}</div>
        <div class="project-card__actions">
          <button class="project-action primary" type="button">عرض التفاصيل</button>
          <button class="project-action" type="button">تصميم حديث</button>
        </div>
      </article>
    `).join("");

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      $$(".project-card.reveal", projectGrid).forEach((card) => revealObserver.observe(card));
    } else {
      $$(".project-card.reveal", projectGrid).forEach((card) => card.classList.add("is-visible"));
    }
  }

  function openProjectModal(project) {
    if (!projectModal || !projectModalContent) return;
    projectModalContent.innerHTML = `
      <div class="modal-detail__hero">
        <div class="project-card__icon"><svg><use href="#${project.icon}"></use></svg></div>
        <h3 id="projectModalTitle">${project.title}</h3>
        <p>${project.summary}</p>
        <div class="modal-detail__meta">${project.tech.map((item) => `<span>${item}</span>`).join("")}</div>
      </div>
      <div class="modal-detail__block">
        <h4>المشكلة</h4>
        <p>${project.problem}</p>
      </div>
      <div class="modal-detail__block">
        <h4>الحل المقترح</h4>
        <p>${project.solution}</p>
      </div>
      <div class="modal-detail__block">
        <h4>قيمة المشروع</h4>
        <p>${project.highlight} ويمكنك مستقبلاً إضافة رابط GitHub أو Demo أو صور حقيقية لهذا المشروع.</p>
      </div>
    `;
    projectModal.classList.add("is-open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  renderProjects();

  $$(".filter-chip").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".filter-chip").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProjects(button.dataset.filter || "all");
      toast(`تم عرض قسم ${button.textContent.trim()}`);
    });
  });

  projectGrid?.addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (!card) return;
    const project = projects.find((item) => item.id === card.dataset.id);
    if (project) openProjectModal(project);
  });

  projectGrid?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".project-card");
    if (!card) return;
    event.preventDefault();
    const project = projects.find((item) => item.id === card.dataset.id);
    if (project) openProjectModal(project);
  });

  projectModal?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("[data-close='true']")) closeProjectModal();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProjectModal();
  });

  // Contact form via mailto
  const contactForm = $("#contactForm");
  const formStatus = $("#formStatus");

  function setStatus(text, type = "info") {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.style.color = type === "success"
      ? "var(--primary)"
      : type === "error"
        ? "var(--accent)"
        : "var(--muted)";
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (name.length < 2) return setStatus("الاسم قصير جداً.", "error");
    if (!validEmail(email)) return setStatus("البريد الإلكتروني غير صحيح.", "error");
    if (message.length < 10) return setStatus("الرسالة قصيرة. اكتب تفاصيل أكثر.", "error");

    const subject = encodeURIComponent(`رسالة جديدة من موقع زياد - ${name}`);
    const body = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\nالموقع: ${WEBSITE}\n\nالرسالة:\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    setStatus("تم تجهيز الرسالة في تطبيق البريد ✅", "success");
    toast("تم فتح تطبيق البريد");
  });

  // Footer
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
  $("#toTopBtn")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* =========================================================
   Living Avatar Interactions
   ========================================================= */
(() => {
  "use strict";

  const stage = document.getElementById("avatarStage");
  const avatar = document.getElementById("liveAvatar");
  const bubble = document.getElementById("avatarBubble");
  const particles = document.getElementById("avatarParticles");
  if (!stage || !avatar || !bubble || !particles) return;

  const root = document.documentElement;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const messages = {
    idle: "جاهز أفتح لك أي تبويب ✨",
    down: "أنا أسحب الصفحة للأسفل معك 👇",
    up: "نطلع للأعلى بخفة 🚀",
    card: "هذا الكارد تفاعل معي! 🌈",
    projects: "فتحت لك المشاريع وكأني أزيح الستار 🎭",
    skills: "ندخل عالم المهارات والتقنيات ⚡",
    contact: "أفتح لك باب التواصل الآن 💌",
    about: "هنا تبدأ الحكاية الهادئة ✨",
    journey: "هذه المسيرة، خطوة خطوة 🧭",
    top: "رجعناك للبداية بنعومة 🌟"
  };

  let talkTimer = 0;
  let stateTimer = 0;
  let scrollTimer = 0;
  let lastScroll = window.scrollY || 0;
  let lastTrail = 0;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function setAvatarPosition(x, y, options = {}) {
    const margin = options.margin ?? 54;
    const safeX = clamp(x, margin, window.innerWidth - margin);
    const safeY = clamp(y, margin, window.innerHeight - margin);
    root.style.setProperty("--avatar-x", `${safeX}px`);
    root.style.setProperty("--avatar-y", `${safeY}px`);
    if (typeof options.scale === "number") root.style.setProperty("--avatar-scale", String(options.scale));
    if (typeof options.rotate === "string") root.style.setProperty("--avatar-rotate", options.rotate);
  }

  function homePosition() {
    const compact = window.innerWidth < 780;
    setAvatarPosition(window.innerWidth - (compact ? 64 : 112), window.innerHeight - (compact ? 82 : 116), {
      scale: compact ? 0.82 : 1,
      rotate: "0deg",
      margin: compact ? 42 : 58
    });
  }

  function say(text, className = "", duration = 1700) {
    bubble.textContent = text || messages.idle;
    stage.classList.add("is-talking");
    if (className) stage.classList.add(className);
    clearTimeout(talkTimer);
    talkTimer = window.setTimeout(() => stage.classList.remove("is-talking"), duration);
    if (className) {
      clearTimeout(stateTimer);
      stateTimer = window.setTimeout(() => stage.classList.remove(className), duration + 350);
    }
  }

  function clearMotionStates() {
    stage.classList.remove("is-opening", "is-scroll-down", "is-scroll-up", "is-card", "is-celebrate");
  }

  function burst(x, y, icons = ["✨", "💫", "🌈", "⚡", "🚀"], count = 13) {
    if (reducedMotion) return;
    for (let i = 0; i < count; i += 1) {
      const p = document.createElement("span");
      p.className = "avatar-particle";
      p.textContent = icons[i % icons.length];
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.45;
      const distance = 46 + Math.random() * 86;
      p.style.setProperty("--px", `${x}px`);
      p.style.setProperty("--py", `${y}px`);
      p.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
      p.style.setProperty("--rot", `${Math.round(Math.random() * 520 - 260)}deg`);
      p.style.setProperty("--size", `${15 + Math.random() * 15}px`);
      particles.appendChild(p);
      window.setTimeout(() => p.remove(), 1050);
    }
  }

  function portalAt(x, y) {
    if (reducedMotion) return;
    const portal = document.createElement("span");
    portal.className = "avatar-portal";
    portal.style.setProperty("--portal-x", `${x}px`);
    portal.style.setProperty("--portal-y", `${y}px`);
    document.body.appendChild(portal);
    window.setTimeout(() => portal.remove(), 900);
  }

  function rippleAt(x, y) {
    if (reducedMotion) return;
    const ripple = document.createElement("span");
    ripple.className = "avatar-ripple";
    ripple.style.setProperty("--rx", `${x}px`);
    ripple.style.setProperty("--ry", `${y}px`);
    document.body.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 900);
  }

  function scrollDot(direction) {
    if (reducedMotion) return;
    const now = performance.now();
    if (now - lastTrail < 95) return;
    lastTrail = now;
    const dot = document.createElement("span");
    dot.className = "avatar-scroll-dot";
    const compact = window.innerWidth < 780;
    const x = window.innerWidth - (compact ? 62 : 112) + (Math.random() * 34 - 17);
    const y = window.innerHeight - (compact ? 90 : 130) + (Math.random() * 26 - 13);
    dot.style.setProperty("--sx", `${x}px`);
    dot.style.setProperty("--sy", `${y}px`);
    dot.style.setProperty("--scroll-dy", direction > 0 ? "88px" : "-88px");
    document.body.appendChild(dot);
    window.setTimeout(() => dot.remove(), 900);
  }

  function guideLink(link) {
    if (!link) return;
    link.classList.add("avatar-guided");
    window.setTimeout(() => link.classList.remove("avatar-guided"), 1300);
  }

  function sectionMessage(hash) {
    const clean = String(hash || "").replace("#", "");
    return messages[clean] || messages.idle;
  }

  function flyToElement(element, message) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    clearMotionStates();
    stage.classList.add("is-opening", "is-celebrate");
    setAvatarPosition(x, y + 48, { scale: 1.02, rotate: "-10deg", margin: 54 });
    say(message, "is-opening", 1500);
    portalAt(x, y);
    rippleAt(x, y);
    burst(x, y, ["🪄", "✨", "💫", "🌈", "🚀", "⚡"], 16);
    window.setTimeout(homePosition, 1250);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      guideLink(link);
      flyToElement(link, sectionMessage(hash));
      if (target) {
        window.setTimeout(() => {
          const rect = target.getBoundingClientRect();
          burst(window.innerWidth * 0.5, Math.max(90, rect.top + 80), ["✨", "🫧", "💎", "🌟"], 10);
        }, 680);
      }
    });
  });

  document.addEventListener("pointermove", (event) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const lookX = clamp((event.clientX - cx) / cx, -1, 1) * 3.5;
    const lookY = clamp((event.clientY - cy) / cy, -1, 1) * 2.5;
    avatar.style.setProperty("--eye-x", `${lookX}px`);
    avatar.style.setProperty("--eye-y", `${lookY}px`);
  }, { passive: true });

  window.addEventListener("scroll", () => {
    const current = window.scrollY || 0;
    const diff = current - lastScroll;
    if (Math.abs(diff) < 4) return;
    const down = diff > 0;
    lastScroll = current;
    clearTimeout(scrollTimer);
    stage.classList.toggle("is-scroll-down", down);
    stage.classList.toggle("is-scroll-up", !down);
    stage.classList.add("is-talking");
    bubble.textContent = down ? messages.down : messages.up;
    scrollDot(down ? 1 : -1);
    scrollTimer = window.setTimeout(() => {
      stage.classList.remove("is-scroll-down", "is-scroll-up", "is-talking");
    }, 360);
  }, { passive: true });

  const cardSelector = ".project-card, .skill-panel, .feature-card, .timeline-card, .list-card, .stat-card, .contact-item, .quick-card, .mini-badge";
  document.addEventListener("pointerover", (event) => {
    const card = event.target instanceof Element ? event.target.closest(cardSelector) : null;
    if (!card || card.dataset.avatarSeen === "true") return;
    card.dataset.avatarSeen = "true";
    const rect = card.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + Math.min(rect.height / 2, 120);
    clearMotionStates();
    stage.classList.add("is-card");
    setAvatarPosition(clamp(rect.left - 18, 70, window.innerWidth - 80), clamp(y + 34, 80, window.innerHeight - 82), { scale: .94, rotate: "6deg", margin: 54 });
    say(messages.card, "is-card", 1000);
    burst(x, y, ["💎", "✨", "🫧", "🌈"], 9);
    window.setTimeout(homePosition, 900);
    window.setTimeout(() => delete card.dataset.avatarSeen, 1500);
  }, { passive: true });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    const action = target.closest("button, .btn, .filter-chip, .project-action");
    if (!action) return;
    const rect = action.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    guideLink(action);
    rippleAt(x, y);
    burst(x, y, ["✨", "⚡", "💫"], 8);
    say("تم! الحركة اشتغلت مع الزر ⚡", "is-celebrate", 1000);
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.id;
    if (!id) return;
    root.style.setProperty("--avatar-hue", `${(id.length * 31) % 180}deg`);
  }, { threshold: [0.28, 0.45], rootMargin: "-8% 0px -62% 0px" }) : null;

  if (observer) {
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
  }

  window.addEventListener("resize", homePosition, { passive: true });
  homePosition();
  window.setTimeout(() => say("أنا هنا أحرك الموقع معك 👋", "is-celebrate", 2100), 900);
})();

