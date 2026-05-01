(() => {
  'use strict';

  const EMAIL = 'alshawsh161@gmail.com';
  const THEME_KEY = 'ziad-portfolio-theme';
  const GREETING_DURATION = 7000;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const root = document.documentElement;
  const avatar = $('#liveAvatar');
  const bubble = $('#avatarBubble');
  const toast = $('#toast');
  const navMenu = $('#navMenu');
  const menuBtn = $('#menuBtn');
  const themeSwitch = $('#themeSwitch');
  const scrollProgress = $('#scrollProgress');

  let lastScrollY = window.scrollY;
  let hideTimer = null;
  let exitTimer = null;
  let isTicking = false;

  const storage = {
    get(key) {
      try { return window.localStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { window.localStorage.setItem(key, value); } catch {}
    }
  };

  function note(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1900);
  }

  function say(message) {
    if (!avatar || !bubble) return;
    window.clearTimeout(hideTimer);
    window.clearTimeout(exitTimer);

    bubble.textContent = message;
    avatar.classList.remove('exit');
    avatar.classList.add('center', 'talking');

    hideTimer = window.setTimeout(() => {
      avatar.classList.remove('talking', 'center');
      avatar.classList.add('exit');
      exitTimer = window.setTimeout(() => avatar.classList.remove('exit'), 650);
    }, GREETING_DURATION);
  }

  function getPreferredTheme() {
    const savedTheme = storage.get(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme, shouldNotify = false) {
    const nextTheme = theme === 'light' ? 'light' : 'dark';
    const isLight = nextTheme === 'light';

    if (isLight) {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }

    storage.set(THEME_KEY, nextTheme);

    if (themeSwitch) {
      const icon = $('.theme-icon', themeSwitch);
      const text = $('.theme-text', themeSwitch);
      if (icon) icon.textContent = isLight ? '☀' : '☾';
      if (text) text.textContent = isLight ? 'نهاري' : 'ليلي';
      themeSwitch.setAttribute('aria-label', isLight ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري');
      themeSwitch.setAttribute('title', isLight ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري');
    }

    if (shouldNotify) note(isLight ? 'تم تفعيل الوضع النهاري ✅' : 'تم تفعيل الوضع الليلي ✅');
  }

  function closeMenu() {
    navMenu?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (!navMenu || !menuBtn) return;
    const isOpen = navMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  }

  function setActiveLink(sectionId) {
    $$('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
  }

  function setupNavigation() {
    menuBtn?.addEventListener('click', toggleMenu);

    $$('.nav-link, .nav-link-action, .brand, .floating-logo').forEach(link => {
      link.addEventListener('click', () => {
        const name = link.dataset.tab || link.dataset.sectionName || link.textContent.trim() || 'الرئيسية';
        if (link.hash) say(`مرحباً بك في قسم ${name} ✨`);
        closeMenu();
      });
    });

    document.addEventListener('click', event => {
      if (!navMenu?.classList.contains('open')) return;
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedMenuButton = menuBtn?.contains(event.target);
      if (!clickedInsideMenu && !clickedMenuButton) closeMenu();
    });
  }

  function setupThemeSwitch() {
    applyTheme(getPreferredTheme());
    themeSwitch?.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme, true);
    });
  }

  function setupContactActions() {
    $('#copyEmail')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        note('تم نسخ البريد ✅');
      } catch {
        note(`انسخ البريد: ${EMAIL}`);
      }
    });

    $('#contactForm')?.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get('name') || '').trim();
      const senderEmail = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const body = [
        `الاسم: ${name}`,
        `البريد: ${senderEmail}`,
        '',
        message
      ].join('\n');

      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent(body)}`;
    });
  }

  function setupRevealAnimations() {
    const revealElements = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(element => element.classList.add('in'));
      return;
    }

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('in');
      });
    }, { threshold: 0.14 });

    revealElements.forEach(element => revealObserver.observe(element));
  }

  function setupActiveSections() {
    const sections = $$('section[id]');
    if (!('IntersectionObserver' in window)) return;

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));
  }

  function setupScrollEffects() {
    window.addEventListener('scroll', () => {
      if (isTicking) return;
      isTicking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(100, (currentScrollY / maxScroll) * 100));

        if (scrollProgress) scrollProgress.style.width = `${progress}%`;
        avatar?.classList.toggle('down', currentScrollY > lastScrollY);
        avatar?.classList.toggle('up', currentScrollY < lastScrollY);
        document.body.classList.toggle('is-scrolled', currentScrollY > 16);

        lastScrollY = currentScrollY;
        isTicking = false;
      });
    }, { passive: true });
  }

  function setupTiltCards() {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    $$('.smooth-card, .tilt-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
      });

      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }

  function setupAmbientCanvas() {
    const canvas = $('#ambientCanvas');
    const ctx = canvas?.getContext?.('2d');
    if (!canvas || !ctx) return;

    let points = [];

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = Array.from({ length: 55 }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35
      }));
    }

    function draw() {
      const isLight = root.getAttribute('data-theme') === 'light';
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = isLight ? 'rgba(20,155,148,.34)' : 'rgba(112,217,230,.45)';
      ctx.strokeStyle = isLight ? 'rgba(20,90,110,.12)' : 'rgba(112,217,230,.13)';

      points.forEach((point, index) => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
        if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
          const nextPoint = points[nextIndex];
          const distance = Math.hypot(point.x - nextPoint.x, point.y - nextPoint.y);
          if (distance >= 135) continue;

          ctx.globalAlpha = 1 - distance / 135;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      window.requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
  }

  setupThemeSwitch();
  setupNavigation();
  setupContactActions();
  setupRevealAnimations();
  setupActiveSections();
  setupScrollEffects();
  setupTiltCards();
  setupAmbientCanvas();

  window.setTimeout(() => say('أهلاً بك، صممت لك تجربة تفاعلية جديدة تبقى 7 ثواني ✨'), 600);
})();
