const header = document.querySelector("header");
const toggle = document.querySelector("#menu-toggle");
const icon = toggle.querySelector("i");

// Ouvre et ferme le menu en cliquant sur l'icone
toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-xmark", isOpen);
});

// Ferme le menu quand on clique en dehors du header
document.addEventListener("click", (event) => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile || !header.classList.contains("open") || header.contains(event.target)) {
    return;
  }

  header.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  icon.classList.replace("fa-xmark", "fa-bars");
});