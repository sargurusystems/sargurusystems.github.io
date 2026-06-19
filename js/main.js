/* ============================================================
   SARGURU SYSTEMS — MAIN JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  /* ── Navbar scroll behaviour ─────────────────────────────── */
  const navbar    = document.querySelector('.navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');

  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run on load

  /* ── Mobile menu toggle ──────────────────────────────────── */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close when a link is clicked
    mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Scroll-in animations (Intersection Observer) ────────── */
  var animObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate').forEach(function (el) {
    animObserver.observe(el);
  });

  /* ── Active nav link ─────────────────────────────────────── */
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Counter animation ───────────────────────────────────── */
  function animateCounter(el, target) {
    var start = 0;
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(function (counter) {
          animateCounter(counter, parseInt(counter.dataset.count, 10));
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  var statsSection = document.querySelector('.stats-strip');
  if (statsSection) statsObserver.observe(statsSection);

  /* ── Smooth anchor scroll ─────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height') || '80', 10);
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Contact form (basic validation) ─────────────────────── */
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('[type="submit"]');
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Message Sent!';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      btn.style.borderColor = '#22c55e';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        contactForm.reset();
      }, 3500);
    });
  }

})();
