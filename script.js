/* =========================
   HEADER SCROLL
========================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

function openMenu() {
  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () => {

  if (mobileMenu.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }

});

mobileOverlay.addEventListener("click", closeMenu);


/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
    });

    if (!isActive) {
      item.classList.add("active");
    }

  });

});


/* =========================
   SMOOTH SCROLL
========================= */

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {

  link.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");

    if (targetId.length > 1) {

      const target = document.querySelector(targetId);

      if (target) {

        e.preventDefault();

        const headerOffset = 110;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        closeMenu();
      }
    }
  });

});


/* =========================
   ACTIVE SECTION LINK
========================= */

const sections = document.querySelectorAll("section[id]");
const allLinks = document.querySelectorAll(
  '.desktop-nav a, .mobile-menu a, .section-nav a, .toc-card a'
);

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }

  });

  allLinks.forEach((link) => {

    link.classList.remove("active-link");

    const href = link.getAttribute("href");

    if (href === `#${current}`) {
      link.classList.add("active-link");
    }

  });

});


/* =========================
   HERO FADE EFFECT
========================= */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

  const scrollTop = window.scrollY;
  const opacity = 1 - scrollTop / 700;

  hero.style.backgroundPositionY =
    `${scrollTop * 0.3}px`;

  hero.style.opacity =
    opacity > 0.75 ? opacity : 0.75;

});


/* =========================
   REVEAL ON SCROLL
========================= */

const revealItems = document.querySelectorAll(
  ".section-block, .hero-card, .faq-item"
);

const revealObserver = new IntersectionObserver(

  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  },

  {
    threshold: 0.12
  }

);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});


/* =========================
   BUTTON RIPPLE EFFECT
========================= */

const buttons = document.querySelectorAll(
  ".btn-primary, .btn-secondary"
);

buttons.forEach((button) => {

  button.addEventListener("mouseenter", () => {
    button.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translateY(0)";
  });

});