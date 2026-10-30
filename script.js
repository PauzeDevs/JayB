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

// Scroll reveals: IntersectionObserver keeps work off the scroll thread.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealTargets = [
    ".section-kicker",
    ".intro-copy > *",
    ".portrait-card",
    ".section-heading > *",
    ".release-card",
    ".all-music > *",
    ".credit-row",
    ".platform-intro > *",
    ".platform-grid a",
    ".platform-note",
    ".social-row a",
    ".contact-copy > *"
  ].join(",");

  const revealItems = document.querySelectorAll(revealTargets);
  if (revealItems.length) {
    document.documentElement.classList.add("reveal-enabled");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, {
      root: null,
      rootMargin: "0px 0px -7% 0px",
      threshold: 0.08
    });

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 65}ms`);
      revealObserver.observe(item);
    });
  }
}
