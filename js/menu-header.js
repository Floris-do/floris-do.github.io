const header = document.querySelector("header");
const toggle = document.querySelector("#menu-toggle");
const icon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("open");
  toggle.setAttribute("aria-expanded", isOpen);
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-xmark", isOpen);
});