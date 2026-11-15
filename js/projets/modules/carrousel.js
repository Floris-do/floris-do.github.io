/* ==========================================================
   CARROUSEL DU PROJET
   Défilement natif scroll-snap, flèches, points et clavier.
========================================================== */

import { texte } from "../commun/outils.js";

export function creerCarrousel({ elements, modeleSlide }) {
  let points = [];
  let nombreImages = 0;
  let imageActive = 0;
  let attenteAnimation = false;
  const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)");

  function mettreAJour() {
    points.forEach((point, index) => {
      if (index === imageActive) point.setAttribute("aria-current", "true");
      else point.removeAttribute("aria-current");
    });
    elements.imageNumero.textContent = String(imageActive + 1);
    elements.imageTotal.textContent = String(nombreImages);
  }

  function allerALImage(index) {
    if (nombreImages === 0) return;
    const cible = (index + nombreImages) % nombreImages;
    elements.piste.scrollTo({
      left: cible * elements.piste.clientWidth,
      behavior: mouvementReduit.matches ? "auto" : "smooth",
    });
  }

  function afficher(images) {
    const liste = (Array.isArray(images) ? images : []).filter(
      (image) => image && typeof image === "object" && texte(image.src)
    );

    elements.piste.replaceChildren();
    elements.points.replaceChildren();
    points = [];
    nombreImages = liste.length;
    imageActive = 0;
    elements.carrousel.hidden = nombreImages === 0;

    if (nombreImages === 0) return;

    liste.forEach((image, index) => {
      const diapositive = modeleSlide.content.firstElementChild.cloneNode(true);
      const img = diapositive.querySelector("img");
      const vide = diapositive.querySelector(".detail-slide-vide");
      const legende = diapositive.querySelector("figcaption");

      diapositive.setAttribute("aria-label", `${index + 1} sur ${nombreImages}`);
      img.src = texte(image.src);
      img.alt = texte(image.alt);
      img.loading = index === 0 ? "eager" : "lazy";
      img.addEventListener("error", () => {
        img.hidden = true;
        vide.hidden = false;
      }, { once: true });

      const legendeTexte = texte(image.legende);
      legende.textContent = legendeTexte;
      legende.hidden = !legendeTexte;
      elements.piste.appendChild(diapositive);

      const point = document.createElement("button");
      point.type = "button";
      point.className = "detail-point";
      point.setAttribute("aria-label", `Aller à l'image ${index + 1}`);
      point.addEventListener("click", () => allerALImage(index));
      points.push(point);
      elements.points.appendChild(point);
    });

    const plusieurs = nombreImages > 1;
    elements.precedent.hidden = !plusieurs;
    elements.suivant.hidden = !plusieurs;
    elements.pied.hidden = !plusieurs;
    elements.piste.scrollTo({ left: 0, behavior: "auto" });
    mettreAJour();
  }

  elements.precedent.addEventListener("click", () => allerALImage(imageActive - 1));
  elements.suivant.addEventListener("click", () => allerALImage(imageActive + 1));

  elements.piste.addEventListener("scroll", () => {
    if (attenteAnimation) return;
    attenteAnimation = true;
    requestAnimationFrame(() => {
      attenteAnimation = false;
      const largeur = elements.piste.clientWidth;
      if (!largeur) return;
      const index = Math.round(elements.piste.scrollLeft / largeur);
      if (index !== imageActive && index >= 0 && index < nombreImages) {
        imageActive = index;
        mettreAJour();
      }
    });
  }, { passive: true });

  elements.piste.addEventListener("keydown", (evenement) => {
    let cible;
    switch (evenement.key) {
      case "ArrowLeft":
        cible = imageActive - 1;
        break;
      case "ArrowRight":
        cible = imageActive + 1;
        break;
      case "Home":
        cible = 0;
        break;
      case "End":
        cible = nombreImages - 1;
        break;
      default:
        return;
    }
    evenement.preventDefault();
    allerALImage(cible);
  });

  window.addEventListener("resize", () => {
    if (nombreImages > 0) {
      elements.piste.scrollTo({ left: imageActive * elements.piste.clientWidth, behavior: "auto" });
    }
  });

  return { afficher };
}
