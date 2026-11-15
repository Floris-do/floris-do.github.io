/* ==========================================================
   PAGE DE DÉTAIL : assemblage des modules spécialisés.
========================================================== */

import { chargerProjets } from "/js/projets/commun/donnees.js";
import { texte, lireIdProjet } from "/js/projets/commun/outils.js";
import { remplirEnteteProjet } from "/js/projets/modules/entete-projet.js";
import { remplirSectionsProjet } from "/js/projets/modules/sections-projet.js";
import { creerCarrousel } from "/js/projets/modules/carrousel.js";
import { initialiserNavigationProjets } from "/js/projets/modules/navigation-projets.js";

const TITRE_SITE = "Portfolio Floris Doreau";
const racine = document.getElementById("projet-detail");
const introuvable = document.getElementById("projet-introuvable");

if (racine && introuvable) {
  const modeleSection = document.getElementById("detail-modele-section");
  const modeleTechno = document.getElementById("detail-modele-techno");
  const modeleSlide = document.getElementById("detail-modele-slide");
  const modeleLien = document.getElementById("detail-modele-lien");
  const champ = (nom) => racine.querySelector(`[data-champ="${nom}"]`);
  const ligne = (nom) => racine.querySelector(`[data-ligne="${nom}"]`);

  const elements = {
    numero: champ("numero"),
    total: champ("total"),
    nom: champ("nom"),
    description: champ("description"),
    role: champ("role"),
    statut: champ("statut"),
    technos: champ("technos"),
    site: champ("site"),
    code: champ("code"),
    fiche: racine.querySelector(".detail-fiche"),
    blocTechnos: racine.querySelector(".detail-technos"),
    texte: racine.querySelector(".detail-texte"),
    carrousel: racine.querySelector(".detail-carrousel"),
    piste: racine.querySelector(".detail-piste"),
    precedent: racine.querySelector(".detail-fleche--prec"),
    suivant: racine.querySelector(".detail-fleche--suiv"),
    points: racine.querySelector(".detail-points"),
    pied: racine.querySelector(".detail-carrousel-pied"),
    imageNumero: champ("image-numero"),
    imageTotal: champ("image-total"),
    listeSuite: document.getElementById("detail-suite-liste"),
    suite: racine.querySelector(".detail-suite"),
    titreIntrouvable: introuvable.querySelector('[data-champ="titre"]'),
    messageIntrouvable: introuvable.querySelector('[data-champ="message"]'),
    lignes: { role: ligne("role"), statut: ligne("statut") },
  };

  const metaDescription = document.querySelector('meta[name="description"]');
  const descriptionParDefaut = metaDescription ? metaDescription.content : "";
  const requis = [
    modeleSection, modeleTechno, modeleSlide, modeleLien,
    elements.numero, elements.total, elements.nom, elements.description,
    elements.role, elements.statut, elements.technos, elements.site, elements.code,
    elements.fiche, elements.blocTechnos, elements.texte, elements.carrousel,
    elements.piste, elements.precedent, elements.suivant, elements.points,
    elements.pied, elements.imageNumero, elements.imageTotal, elements.listeSuite,
    elements.suite, elements.titreIntrouvable, elements.messageIntrouvable,
    elements.lignes.role, elements.lignes.statut,
  ];

  if (requis.some((element) => !element)) {
    racine.hidden = true;
    const titreErreur = introuvable.querySelector('[data-champ="titre"]');
    const messageErreur = introuvable.querySelector('[data-champ="message"]');
    if (titreErreur && messageErreur) {
      titreErreur.textContent = "Page indisponible";
      messageErreur.textContent = "La structure de la page projet est incomplète.";
      introuvable.hidden = false;
    }
    console.error("La structure HTML de la page détail projet est incomplète.");
  } else {
    let projets = [];
    let projetActif = null;
    const carrousel = creerCarrousel({ elements, modeleSlide });

    function afficherProjet(projet, index, changement = false) {
      projetActif = projet;
      introuvable.hidden = true;

      remplirEnteteProjet({
        projet,
        index,
        total: projets.length,
        elements,
        modeleTechno,
      });
      carrousel.afficher(projet.images);
      remplirSectionsProjet({
        sections: projet.sections,
        conteneur: elements.texte,
        modeleSection,
      });
      navigation?.marquerActif(projet.id);
      elements.suite.open = false;

      document.title = `${texte(projet.nom)} | ${TITRE_SITE}`;
      if (metaDescription) {
        metaDescription.content = texte(projet.description) || descriptionParDefaut;
      }

      racine.hidden = false;
      racine.classList.remove("detail--anime");
      if (changement) {
        void racine.offsetWidth;
        racine.classList.add("detail--anime");
        window.scrollTo({ top: 0, behavior: "auto" });
        elements.nom.focus({ preventScroll: true });
      }
    }

    function afficherIntrouvable(titre, message) {
      projetActif = null;
      racine.hidden = true;
      elements.titreIntrouvable.textContent = titre;
      elements.messageIntrouvable.textContent = message;
      introuvable.hidden = false;
      document.title = `${titre} | ${TITRE_SITE}`;
      if (metaDescription) metaDescription.content = descriptionParDefaut;
    }

    function afficherDepuisUrl(changement = false) {
      const id = lireIdProjet();
      const index = id ? projets.findIndex((projet) => projet.id === id) : -1;

      if (index === -1) {
        afficherIntrouvable(
          "Projet introuvable",
          id
            ? `Aucun projet ne correspond à « ${id} ». Il a peut-être été déplacé ou renommé.`
            : "Aucun projet n'a été sélectionné."
        );
        return;
      }
      afficherProjet(projets[index], index, changement);
    }

    let navigation = null;

    chargerProjets()
      .then((donnees) => {
        projets = donnees;
        navigation = initialiserNavigationProjets({
          projets,
          liste: elements.listeSuite,
          modeleLien,
          onNaviguer: () => afficherDepuisUrl(true),
          onFermer: () => { elements.suite.open = false; },
          getIdActif: () => projetActif?.id ?? null,
        });
        afficherDepuisUrl(false);
        window.addEventListener("popstate", () => afficherDepuisUrl(true));
      })
      .catch((erreur) => {
        console.error(erreur);
        afficherIntrouvable("Chargement impossible", "Impossible de charger les projets pour le moment.");
      });
  }
}
