/* ==========================================================
   OUTILS PARTAGÉS
========================================================== */

/** Retourne une chaîne nettoyée, ou une chaîne vide. */
export function texte(valeur) {
  return typeof valeur === "string" ? valeur.trim() : "";
}

/** Formate un nombre sur deux chiffres (01, 02, 03…). */
export function deuxChiffres(nombre) {
  return String(nombre).padStart(2, "0");
}

/** Construit l'URL d'une page de détail de projet. */
export function lienProjet(id, page = "projet.html") {
  return `${page}?id=${encodeURIComponent(id)}`;
}

/** Lit le paramètre ?id= de l'adresse courante. */
export function lireIdProjet() {
  return new URLSearchParams(window.location.search).get("id");
}
