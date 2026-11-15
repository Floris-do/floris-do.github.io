/* ==========================================================
   ENTÊTE DU PROJET DÉTAILLÉ
   Remplit le titre, le résumé, les métadonnées et les liens.
========================================================== */

import { texte, deuxChiffres } from "../commun/outils.js";

export function remplirEnteteProjet({ projet, index, total, elements, modeleTechno }) {
  elements.numero.textContent = deuxChiffres(index + 1);
  elements.total.textContent = deuxChiffres(total);
  elements.nom.textContent = texte(projet.nom);

  const description = texte(projet.description);
  elements.description.textContent = description;
  elements.description.hidden = !description;

  ["role", "statut"].forEach((nom) => {
    const valeur = texte(projet[nom]);
    elements[nom].textContent = valeur;
    elements.lignes[nom].hidden = !valeur;
  });

  const technos = Array.isArray(projet.technos)
    ? projet.technos.map(texte).filter(Boolean)
    : [];
  elements.technos.replaceChildren();
  technos.forEach((techno) => {
    const pastille = modeleTechno.content.firstElementChild.cloneNode(true);
    pastille.textContent = techno;
    elements.technos.appendChild(pastille);
  });
  elements.blocTechnos.hidden = technos.length === 0;

  const ficheVisible = Boolean(texte(projet.role) || texte(projet.statut) || technos.length);
  elements.fiche.hidden = !ficheVisible;

  ["site", "code"].forEach((nom) => {
    const url = texte(projet[nom]);
    elements[nom].hidden = !url;
    if (url) elements[nom].href = url;
    else elements[nom].removeAttribute("href");
  });
}
