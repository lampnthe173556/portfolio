// Scroll animation for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('.section-fade');
  const reveal = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new window.IntersectionObserver(reveal, {
    threshold: 0.15
  });
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Language switcher
function switchLanguage(lang) {
  document.querySelectorAll('[data-lang-en]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`);
  });
  document.querySelectorAll('[placeholder][data-lang-en]').forEach(el => {
    el.setAttribute('placeholder', el.getAttribute(`data-lang-${lang}`));
  });
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.textContent = lang === 'en' ? 'VI' : 'EN';
    btn.classList.toggle('active', lang === 'vi');
  });
  document.querySelectorAll('.mobile-sidebar__lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  document.documentElement.setAttribute('lang', lang);
}

// Mobile sidebar functionality
function initMobileSidebar() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileSidebar = document.getElementById('mobile-sidebar');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileSidebarLinks = document.querySelectorAll('.mobile-sidebar__link');
  const mobileLangBtns = document.querySelectorAll('.mobile-sidebar__lang-btn');

  // Toggle sidebar
  function toggleSidebar() {
    mobileToggle.classList.toggle('active');
    mobileSidebar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileSidebar.classList.contains('active') ? 'hidden' : '';
  }

  // Close sidebar
  function closeSidebar() {
    mobileToggle.classList.remove('active');
    mobileSidebar.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Event listeners
  mobileToggle.addEventListener('click', toggleSidebar);
  mobileOverlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking on a link
  mobileSidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          closeSidebar();
          setTimeout(() => {
            window.scrollTo({
              top: target.offsetTop - 70,
              behavior: 'smooth'
            });
          }, 300);
        }
      }
    });
  });

  // Mobile language switcher
  mobileLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      currentLang = lang;
      switchLanguage(lang);

      // Update desktop language button
      const desktopLangBtn = document.getElementById('lang-toggle');
      if (desktopLangBtn) {
        desktopLangBtn.textContent = lang === 'en' ? 'VI' : 'EN';
      }
    });
  });

  // Close sidebar on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileSidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Close sidebar on window resize (if screen becomes larger)
  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      // Reset trạng thái sidebar về mặc định
      document.getElementById('mobile-toggle').classList.remove('active');
      document.getElementById('mobile-sidebar').classList.remove('active');
      document.getElementById('mobile-overlay').classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  initMobileSidebar();

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Active nav-link on scroll
  const sectionIds = ['about', 'skills', 'projects', 'experience', 'contact'];
  const navLinks = sectionIds.map(id => document.querySelector(`.nav-link[href="#${id}"]`));
  const mobileSidebarLinks = sectionIds.map(id => document.querySelector(`.mobile-sidebar__link[href="#${id}"]`));

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 90;
    sectionIds.forEach((id, idx) => {
      const sec = document.getElementById(id);
      if (sec && sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        // Update desktop nav links
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLinks[idx]) navLinks[idx].classList.add('active');

        // Update mobile sidebar links
        mobileSidebarLinks.forEach(l => l.classList.remove('active'));
        if (mobileSidebarLinks[idx]) mobileSidebarLinks[idx].classList.add('active');
      }
    });
  });

  // Language toggle
  let currentLang = 'en';
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'vi' : 'en';
      switchLanguage(currentLang);

      // Update mobile language buttons
      document.querySelectorAll('.mobile-sidebar__lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
      });
    });
  }
  switchLanguage(currentLang);
});