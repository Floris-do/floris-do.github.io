/* ==========================================================
   DONNÉES COMMUNES
========================================================== */

const URL_JSON = new URL("/./data/liste-projets.json", import.meta.url);
let chargementEnCours = null;

export function chargerProjets() {
  if (!chargementEnCours) {
    chargementEnCours = fetch(URL_JSON)
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Impossible de charger les projets (HTTP ${reponse.status}).`);
        }
        return reponse.json();
      })
      .then((donnees) => {
        if (!Array.isArray(donnees)) {
          throw new TypeError("Le fichier JSON doit contenir un tableau de projets.");
        }

        const projets = donnees.filter((projet) => (
          projet &&
          typeof projet === "object" &&
          typeof projet.id === "string" && projet.id.trim() !== "" &&
          typeof projet.nom === "string" && projet.nom.trim() !== ""
        ));

        if (projets.length === 0) {
          throw new Error("Aucun projet valide n'a été trouvé dans le fichier JSON.");
        }

        const identifiants = new Set();
        for (const projet of projets) {
          const id = projet.id.trim();
          if (identifiants.has(id)) {
            throw new Error(`L'identifiant de projet « ${id} » est présent plusieurs fois.`);
          }
          identifiants.add(id);
        }

        return projets;
      })
      .catch((erreur) => {
        // Autorise une nouvelle tentative si l'appel échoue.
        chargementEnCours = null;
        throw erreur;
      });
  }

  return chargementEnCours;
}
