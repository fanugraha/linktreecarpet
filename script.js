/* =========================
   ELEMENTS SETUP
========================= */
const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

const navLinks = document.querySelectorAll(
  ".desktop-nav a, .mobile-menu a, .toc-card a"
);

const sections = document.querySelectorAll("section[id]");

/* =========================
   HEADER SCROLL EFFECT
========================= */
function handleHeaderScroll() {
  if (!header) return;
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", handleHeaderScroll);

/* =========================
   MOBILE MENU LOGIC
========================= */
function openMenu() {
  if (!mobileMenu || !mobileOverlay || !menuBtn) return;
  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");
  
  // Transform Hamburger icon to 'X'
  const spans = menuBtn.querySelectorAll("span");
  spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
  spans[1].style.opacity = "0";
  spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  if (!mobileMenu || !mobileOverlay || !menuBtn) return;
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  
  // Return Hamburger icon to normal
  const spans = menuBtn.querySelectorAll("span");
  spans[0].style.transform = "none";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "none";
  
  document.body.style.overflow = "";
}

if (menuBtn) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
  });
}

if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeMenu);
}

/* =========================
   SMOOTH SCROLL NAVIGATION
========================= */
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || !href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    closeMenu();

    const offset = 100;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* =========================
   ACTIVE LINK SPY (SCROLL SPY)
========================= */
function updateActiveLink() {
  let currentSection = "";
  const scrollPos = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
    const href = link.getAttribute("href");
    if (href === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
}
window.addEventListener("scroll", updateActiveLink);

/* =========================
   REVEAL ON SCROLL ANIMATION (FIXED ERROR)
========================= */
const revealItems = document.querySelectorAll(".animation-item");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

/* =========================
   INITIALIZATION
========================= */
window.addEventListener("DOMContentLoaded", () => {
  handleHeaderScroll();
  updateActiveLink();
});