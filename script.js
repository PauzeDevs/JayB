const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open menu");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Scroll reveals. Keep native scrolling untouched and observe only once per element.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const selectors = [
    ".intro-copy > *",
    ".portrait-card",
    ".section-heading",
    ".release-card",
    ".all-music",
    ".credit-row",
    ".platform-intro > *",
    ".platform-grid a",
    ".platform-note",
    ".social-row a",
    ".contact-copy > *"
  ];

  const items = document.querySelectorAll(selectors.join(","));
  if (!items.length) return;

  // Reveal styles are enabled only after the observer is ready, preventing
  // content from remaining invisible if the browser lacks observer support.
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        entry.target.classList.add("is-revealed");
        activeObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -2% 0px",
    threshold: 0
  });

  items.forEach((item, index) => {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", `${(index % 3) * 55}ms`);
    observer.observe(item);
  });

  document.documentElement.classList.add("reveal-enabled");
})();