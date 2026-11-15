/* ==========================================================
   SECTIONS TEXTUELLES DU PROJET
========================================================== */

import { texte } from "../commun/outils.js";

export function remplirSectionsProjet({ sections, conteneur, modeleSection }) {
  conteneur.replaceChildren();

  const liste = Array.isArray(sections) ? sections : [];
  liste.forEach((section) => {
    if (!section || typeof section !== "object") return;

    const titreTexte = texte(section.titre);
    const paragraphesBruts = Array.isArray(section.paragraphes)
      ? section.paragraphes
      : (section.paragraphes ? [section.paragraphes] : []);
    const paragraphes = paragraphesBruts.map(texte).filter(Boolean);

    if (!titreTexte && paragraphes.length === 0) return;

    const bloc = modeleSection.content.firstElementChild.cloneNode(true);
    const titre = bloc.querySelector("h2");
    const corps = bloc.querySelector(".detail-section-corps");

    titre.textContent = titreTexte;
    titre.hidden = !titreTexte;
    paragraphes.forEach((contenu) => {
      const paragraphe = document.createElement("p");
      paragraphe.textContent = contenu;
      corps.appendChild(paragraphe);
    });

    conteneur.appendChild(bloc);
  });

  conteneur.hidden = conteneur.children.length === 0;
}
