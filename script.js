(function () {
  "use strict";

  // Header Toggle (Hamburger Menu)
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  function toggleHeader() {
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn && header) {
    headerToggleBtn.addEventListener('click', toggleHeader);

    // Hide Mobile Nav on Same-page Links
    document.querySelectorAll('#navmenu a').forEach(navLink => {
      navLink.addEventListener('click', () => {
        if (header.classList.contains('header-show')) {
          toggleHeader();
        }
      });
    });
  }

  // Toggle Mobile Nav Dropdowns
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = dropdown.parentNode;
      parent.classList.toggle('active');
      const next = parent.nextElementSibling;
      if (next) next.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Scroll Top Button
  const scrollTopBtn = document.querySelector('.scroll-top');
  function toggleScrollTopBtn() {
    if (scrollTopBtn) {
      window.scrollY > 100 ? scrollTopBtn.classList.add('active') : scrollTopBtn.classList.remove('active');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTopBtn);
  document.addEventListener('scroll', toggleScrollTopBtn);

  // AOS (Animation on Scroll)
  window.addEventListener('load', () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  });

  // Typed.js
  const typedElement = document.querySelector('.typed');
  if (typedElement && typeof Typed !== 'undefined') {
    const typedStrings = typedElement.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings: typedStrings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Pure Counter
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  // Skills Animation on Reveal
  if (typeof Waypoint !== 'undefined') {
    document.querySelectorAll('.skills-animation').forEach(item => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function () {
          const progressBars = item.querySelectorAll('.progress .progress-bar');
          progressBars.forEach(bar => {
            bar.style.width = bar.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  // GLightbox
  if (typeof GLightbox !== 'undefined') {
    GLightbox({ selector: '.glightbox' });
  }

  // Isotope
  if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
    document.querySelectorAll('.isotope-layout').forEach(isotopeItem => {
      const layout = isotopeItem.getAttribute('data-layout') || 'masonry';
      const filter = isotopeItem.getAttribute('data-default-filter') || '*';
      const sort = isotopeItem.getAttribute('data-sort') || 'original-order';

      let isotopeInstance;
      const container = isotopeItem.querySelector('.isotope-container');
      if (container) {
        imagesLoaded(container, () => {
          isotopeInstance = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });
      }

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(filterItem => {
        filterItem.addEventListener('click', () => {
          const active = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (active) active.classList.remove('filter-active');
          filterItem.classList.add('filter-active');
          if (isotopeInstance) {
            isotopeInstance.arrange({ filter: filterItem.getAttribute('data-filter') });
          }
        });
      });
    });
  }

  // Swiper Sliders
  if (typeof Swiper !== 'undefined') {
    window.addEventListener('load', () => {
      document.querySelectorAll(".init-swiper").forEach(swiperElement => {
        const configEl = swiperElement.querySelector(".swiper-config");
        if (!configEl) return;
        let config;
        try {
          config = JSON.parse(configEl.textContent.trim());
        } catch (e) {
          console.error("Invalid Swiper config", e);
          return;
        }
        if (swiperElement.classList.contains("swiper-tab")) {
          if (typeof initSwiperWithCustomPagination === 'function') {
            initSwiperWithCustomPagination(swiperElement, config);
          }
        } else {
          new Swiper(swiperElement, config);
        }
      });
    });
  }

  // Page Hash Scroll
  window.addEventListener('load', () => {
    if (window.location.hash && document.querySelector(window.location.hash)) {
      setTimeout(() => {
        const section = document.querySelector(window.location.hash);
        const scrollMarginTop = getComputedStyle(section).scrollMarginTop || "0px";
        window.scrollTo({
          top: section.offsetTop - parseInt(scrollMarginTop),
          behavior: 'smooth'
        });
      }, 100);
    }
  });

  // Navmenu Scrollspy
  const navLinks = document.querySelectorAll('.navmenu a');
  function updateNavmenuScrollspy() {
    navLinks.forEach(navLink => {
      if (!navLink.hash) return;
      const section = document.querySelector(navLink.hash);
      if (!section) return;
      const position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', updateNavmenuScrollspy);
  document.addEventListener('scroll', updateNavmenuScrollspy);

  // Contact Form Validation
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //   contactForm.addEventListener('submit', function(e) {
    //     e.preventDefault();

    //     const name = document.getElementById('name')?.value.trim();
    //     const email = document.getElementById('email')?.value.trim();
    //     const subject = document.getElementById('subject')?.value.trim();
    //     const message = document.getElementById('message')?.value.trim();

    //     if (!name || !email || !subject || !message) {
    //       alert('Please fill all fields before submitting.');
    //       return;
    //     }

    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (!emailRegex.test(email)) {
    //       alert('Please enter a valid email address.');
    //       return;
    //     }

    //     alert('Message sent successfully!');
    //     this.reset();
    //   });
    // }

    function submitButton() {
      alert("Server Error")
    }

  })();
