const header = document.querySelector("header");
const toggle = document.querySelector("#menu-toggle");
const icon = toggle.querySelector("img");

const ICON_MENU = "assets/icons/menu.svg";
const ICON_CLOSE = "assets/icons/close.svg";

// Ouvre et ferme le menu en cliquant sur l'icone
toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
  icon.src = isOpen ? ICON_CLOSE : ICON_MENU;
});

// Ferme le menu quand on clique en dehors du header
document.addEventListener("click", (event) => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  if (!isMobile || !header.classList.contains("open") || header.contains(event.target)) {
    return;
  }

  header.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  icon.src = ICON_MENU;
});