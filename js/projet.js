/* ==========================================================
   PROJETS : navigation par onglets
   - La structure (balises, textes fixes) est dans index.html.
   - Ce script lit le fichier JSON (voir CHEMIN_JSON), crée un onglet
     par projet et remplit les éléments [data-champ] avec les données
     du projet affiché.

   Champs d'un projet dans le JSON :
     nom         : texte de l'onglet et titre du projet
     description : quelques phrases
     technos     : liste des technologies
     role        : votre rôle ("" pour masquer la ligne)
     statut      : "En ligne", "En cours"… ("" pour masquer la ligne)
     image       : chemin de la capture d'écran ("" = zone vide)
     alt         : description de l'image pour l'accessibilité
     detail      : lien vers la page détaillée du projet
     code        : lien vers le code source ("" = bouton masqué)
========================================================== */
(() => {
  "use strict";

  /* Emplacement du fichier JSON, relatif à la page qui affiche les projets */
  const CHEMIN_JSON = "data/liste-projets.json";

  /* ----------------------------------------------------------
      ÉLÉMENTS DE LA PAGE (définis dans index.html)
  ---------------------------------------------------------- */
  const section = document.getElementById("projets");
  if (!section) return;

  const conteneurOnglets = section.querySelector(".projets-onglets");
  const panneau = document.getElementById("projets-panneau");
  const contenu = section.querySelector(".projets-contenu");
  const messageErreur = section.querySelector(".projets-erreur");
  const modeleOnglet = document.getElementById("projets-modele-onglet");
  const modeleTechno = document.getElementById("projets-modele-techno");
  if (!conteneurOnglets || !panneau || !contenu || !modeleOnglet || !modeleTechno) return;

  const champ = (nom) => contenu.querySelector('[data-champ="' + nom + '"]');
  const ligne = (nom) => contenu.querySelector('[data-ligne="' + nom + '"]');

  const elements = {
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
  };

  let projets = [];
  const boutonsOnglets = [];
  let actif = 0;

  /* ----------------------------------------------------------
      REMPLISSAGE DU PROJET AFFICHÉ
  ---------------------------------------------------------- */
  function remplirTechnos(technos) {
    elements.technos.replaceChildren();
    technos.forEach((techno) => {
      const pastille = modeleTechno.content.firstElementChild.cloneNode(true);
      pastille.textContent = techno;
      elements.technos.appendChild(pastille);
    });
    elements.technos.hidden = technos.length === 0;
  }

  function remplirMeta(projet) {
    ["role", "statut"].forEach((nom) => {
      const valeur = projet[nom] || "";
      champ(nom).textContent = valeur;
      ligne(nom).hidden = !valeur;
    });
    elements.meta.hidden = !projet.role && !projet.statut;
  }

  function remplirApercu(projet) {
    const aUneImage = Boolean(projet.image);

    if (aUneImage) {
      elements.image.src = projet.image;
      elements.image.alt = projet.alt || "";
    } else {
      elements.image.removeAttribute("src");
      elements.image.alt = "";
    }

    elements.image.hidden = !aUneImage;
    elements.imageVide.hidden = aUneImage;
    elements.apercu.classList.toggle("projets-apercu--vide", !aUneImage);
  }

  function remplirLiens(projet) {
    elements.code.hidden = !projet.code;
    if (projet.code) elements.code.href = projet.code;
  }

  function remplir(projet, index) {
    elements.numero.textContent = String(index + 1).padStart(2, "0");
    elements.total.textContent = String(projets.length).padStart(2, "0");
    elements.nom.textContent = projet.nom;
    elements.description.textContent = projet.description;

    remplirTechnos(Array.isArray(projet.technos) ? projet.technos : []);
    remplirMeta(projet);
    remplirApercu(projet);
    remplirLiens(projet);
  }

  /* ----------------------------------------------------------
      AFFICHAGE D'UN PROJET
  ---------------------------------------------------------- */
  function afficher(index, animer) {
    actif = index;

    boutonsOnglets.forEach((bouton, i) => {
      const estActif = i === index;
      bouton.setAttribute("aria-selected", String(estActif));
      bouton.tabIndex = estActif ? 0 : -1;
    });

    panneau.setAttribute("aria-labelledby", "projets-onglet-" + index);
    remplir(projets[index], index);
    contenu.hidden = false;

    /* Relance l'animation d'apparition à chaque changement d'onglet */
    contenu.classList.remove("projets-contenu--anime");
    if (animer) {
      void contenu.offsetWidth;
      contenu.classList.add("projets-contenu--anime");
    }
  }

  /* ----------------------------------------------------------
      ONGLETS : création + clavier
  ---------------------------------------------------------- */
  function initialiser() {
    projets.forEach((projet, index) => {
      const bouton = modeleOnglet.content.firstElementChild.cloneNode(true);
      bouton.textContent = projet.nom;
      bouton.id = "projets-onglet-" + index;
      bouton.addEventListener("click", () => {
        if (index !== actif) afficher(index, true);
      });
      boutonsOnglets.push(bouton);
      conteneurOnglets.appendChild(bouton);
    });

    conteneurOnglets.addEventListener("keydown", (evenement) => {
      const dernier = projets.length - 1;
      let cible = null;

      switch (evenement.key) {
        case "ArrowRight":
        case "ArrowDown":
          cible = actif === dernier ? 0 : actif + 1;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          cible = actif === 0 ? dernier : actif - 1;
          break;
        case "Home":
          cible = 0;
          break;
        case "End":
          cible = dernier;
          break;
        default:
          return;
      }

      evenement.preventDefault();
      afficher(cible, true);
      boutonsOnglets[cible].focus();
    });

    /* Affichage initial (sans animation) */
    afficher(0, false);
  }

  /* ----------------------------------------------------------
      CHARGEMENT DU FICHIER JSON
  ---------------------------------------------------------- */
  function afficherErreur() {
    if (messageErreur) messageErreur.hidden = false;
  }

  fetch(CHEMIN_JSON)
    .then((reponse) => {
      if (!reponse.ok) throw new Error("Erreur " + reponse.status);
      return reponse.json();
    })
    .then((donnees) => {
      if (!Array.isArray(donnees) || donnees.length === 0) {
        throw new Error("Aucun projet dans le fichier JSON");
      }
      projets = donnees;
      initialiser();
    })
    .catch(afficherErreur);
})();