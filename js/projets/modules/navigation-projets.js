/* ==========================================================
   NAVIGATION ENTRE LES PROJETS
========================================================== */

import { deuxChiffres, lienProjet } from "../commun/outils.js";

export function initialiserNavigationProjets({ projets, liste, modeleLien, onNaviguer, onFermer, getIdActif }) {
  const liens = [];

  projets.forEach((projet, index) => {
    const item = modeleLien.content.firstElementChild.cloneNode(true);
    const lien = item.querySelector("a");
    lien.href = lienProjet(projet.id);
    lien.dataset.id = projet.id;
    item.querySelector(".detail-suite-num").textContent = deuxChiffres(index + 1);
    item.querySelector(".detail-suite-nom").textContent = projet.nom;
    liens.push(lien);
    liste.appendChild(item);
  });

  liste.addEventListener("click", (evenement) => {
    const cible = evenement.target;
    if (!(cible instanceof Element)) return;
    const lien = cible.closest("a[data-id]");
    if (!lien || !liste.contains(lien)) return;

    // Conserve l'ouverture dans un nouvel onglet et les clics modifiés.
    if (evenement.defaultPrevented || evenement.button !== 0) return;
    if (evenement.metaKey || evenement.ctrlKey || evenement.shiftKey || evenement.altKey) return;

    evenement.preventDefault();
    const id = lien.dataset.id;
    onFermer();
    if (typeof getIdActif === "function" && id === getIdActif()) return;

    window.history.pushState({ id }, "", lienProjet(id));
    onNaviguer(id);
  });

  function marquerActif(id) {
    liens.forEach((lien) => {
      if (lien.dataset.id === id) lien.setAttribute("aria-current", "page");
      else lien.removeAttribute("aria-current");
    });
  }

  return { marquerActif, liens };
}
