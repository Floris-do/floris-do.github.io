/* ==========================================================
   APERÇU D'UN PROJET
   Remplit la carte de projet affichée sur la page d'accueil.
========================================================== */

import { texte, deuxChiffres, lienProjet } from "../commun/outils.js";

export function remplirApercuProjet({ projet, index, total, elements, modeleTechno }) {
  elements.numero.textContent = deuxChiffres(index + 1);
  elements.total.textContent = deuxChiffres(total);
  elements.nom.textContent = texte(projet.nom);
  elements.description.textContent = texte(projet.description);

  const technos = Array.isArray(projet.technos)
    ? projet.technos.map(texte).filter(Boolean)
    : [];
  elements.technos.replaceChildren();
  technos.forEach((techno) => {
    const pastille = modeleTechno.content.firstElementChild.cloneNode(true);
    pastille.textContent = techno;
    elements.technos.appendChild(pastille);
  });
  elements.technos.hidden = technos.length === 0;

  let auMoinsUneMeta = false;
  ["role", "statut"].forEach((nom) => {
    const valeur = texte(projet[nom]);
    elements[nom].textContent = valeur;
    elements.lignes[nom].hidden = !valeur;
    auMoinsUneMeta ||= Boolean(valeur);
  });
  elements.meta.hidden = !auMoinsUneMeta;

  const image = texte(projet.image);
  if (image) {
    elements.image.src = image;
    elements.image.alt = texte(projet.alt);
  } else {
    elements.image.removeAttribute("src");
    elements.image.alt = "";
  }
  elements.image.hidden = !image;
  elements.imageVide.hidden = Boolean(image);
  elements.apercu.classList.toggle("projets-apercu--vide", !image);

  elements.detail.href = lienProjet(projet.id);
  const code = texte(projet.code);
  elements.code.hidden = !code;
  if (code) elements.code.href = code;
  else elements.code.removeAttribute("href");
}
