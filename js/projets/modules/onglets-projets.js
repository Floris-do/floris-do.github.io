/* ==========================================================
   ONGLET DES PROJETS
========================================================== */

export function initialiserOnglets({ projets, conteneur, panneau, modele, onSelection }) {
  const boutons = [];
  let actif = 0;

  function afficher(index, animer = true) {
    if (!Number.isInteger(index) || index < 0 || index >= projets.length) return;

    actif = index;
    boutons.forEach((bouton, i) => {
      const estActif = i === index;
      bouton.setAttribute("aria-selected", String(estActif));
      bouton.tabIndex = estActif ? 0 : -1;
    });

    panneau.setAttribute("aria-labelledby", boutons[index].id);
    onSelection(projets[index], index, animer);
  }

  projets.forEach((projet, index) => {
    const bouton = modele.content.firstElementChild.cloneNode(true);
    bouton.textContent = projet.nom;
    bouton.id = `projets-onglet-${index}`;
    bouton.setAttribute("aria-selected", "false");
    bouton.tabIndex = -1;
    bouton.addEventListener("click", () => {
      if (index !== actif) afficher(index, true);
    });
    boutons.push(bouton);
    conteneur.appendChild(bouton);
  });

  conteneur.addEventListener("keydown", (evenement) => {
    const dernier = projets.length - 1;
    let cible;

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
    boutons[cible].focus();
  });

  afficher(0, false);
  return { afficher, boutons };
}
