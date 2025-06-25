

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
  document.documentElement.setAttribute('lang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();

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
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 90;
    sectionIds.forEach((id, idx) => {
      const sec = document.getElementById(id);
      if (sec && sec.offsetTop <= scrollPos && sec.offsetTop + sec.offsetHeight > scrollPos) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[idx].classList.add('active');
      }
    });
  });

  // Language toggle
  let currentLang = 'en';
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      console.log("hihi");

      currentLang = currentLang === 'en' ? 'vi' : 'en';
      switchLanguage(currentLang);
    });
  }
  switchLanguage(currentLang);
});