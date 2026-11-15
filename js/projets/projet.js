/* ==========================================================
   PAGE D'ACCUEIL : assemblage des modules liés aux projets.
========================================================== */

import { chargerProjets } from "/js/projets/commun/donnees.js";
import { initialiserOnglets } from "/js/projets/modules/onglets-projets.js";
import { remplirApercuProjet } from "/js/projets/modules/apercu-projet.js";

const section = document.getElementById("projets");
if (section) {
  const conteneurOnglets = section.querySelector(".projets-onglets");
  const panneau = document.getElementById("projets-panneau");
  const contenu = section.querySelector(".projets-contenu");
  const messageErreur = section.querySelector(".projets-erreur");
  const modeleOnglet = document.getElementById("projets-modele-onglet");
  const modeleTechno = document.getElementById("projets-modele-techno");

  const champ = (nom) => contenu?.querySelector(`[data-champ="${nom}"]`);
  const ligne = (nom) => contenu?.querySelector(`[data-ligne="${nom}"]`);
  const elements = contenu ? {
    numero: champ("numero"),
    total: champ("total"),
    nom: champ("nom"),
    description: champ("description"),
    role: champ("role"),
    statut: champ("statut"),
    detail: champ("detail"),
    code: champ("code"),
    technos: contenu.querySelector(".projets-technos"),
    meta: contenu.querySelector(".projets-meta"),
    apercu: contenu.querySelector(".projets-apercu"),
    image: contenu.querySelector(".projets-image"),
    imageVide: contenu.querySelector(".projets-apercu-vide"),
    lignes: { role: ligne("role"), statut: ligne("statut") },
  } : null;

  const elementsRequis = [
    conteneurOnglets, panneau, contenu, modeleOnglet, modeleTechno,
    elements?.numero, elements?.total, elements?.nom, elements?.description,
    elements?.role, elements?.statut, elements?.detail, elements?.code,
    elements?.technos, elements?.meta, elements?.apercu, elements?.image,
    elements?.imageVide, elements?.lignes.role, elements?.lignes.statut,
  ];

  if (elementsRequis.some((element) => !element)) {
    if (messageErreur) messageErreur.hidden = false;
    console.error("La structure HTML de la section projets est incomplète.");
  } else {
    chargerProjets()
      .then((projets) => {
        initialiserOnglets({
          projets,
          conteneur: conteneurOnglets,
          panneau,
          modele: modeleOnglet,
          onSelection: (projet, index, animer) => {
            remplirApercuProjet({
              projet,
              index,
              total: projets.length,
              elements,
              modeleTechno,
            });
            contenu.hidden = false;
            contenu.classList.remove("projets-contenu--anime");
            if (animer) {
              void contenu.offsetWidth;
              contenu.classList.add("projets-contenu--anime");
            }
          },
        });
      })
      .catch((erreur) => {
        console.error(erreur);
        contenu.hidden = true;
        if (messageErreur) messageErreur.hidden = false;
      });
  }
}
