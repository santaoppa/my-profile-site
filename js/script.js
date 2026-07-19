(function () {
  'use strict';

  /* ===== theme toggle ===== */
  const themeToggle = document.getElementById('theme-toggle');

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', function () {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(!isDark);
  });

  /* ===== mobile menu ===== */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  }

  menuToggle.addEventListener('click', function () {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileMenu.classList.remove('hidden');
      iconMenu.classList.add('hidden');
      iconClose.classList.remove('hidden');
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ===== header scroll style ===== */
  const header = document.getElementById('site-header');

  function updateHeaderStyle() {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateHeaderStyle();
  window.addEventListener('scroll', updateHeaderStyle, { passive: true });

  /* ===== active nav link on scroll ===== */
  const sections = Array.from(document.querySelectorAll('main section, body > section'));
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  /* ===== scroll reveal animation ===== */
  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
})();
