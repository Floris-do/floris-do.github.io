# Portfolio de Floris Doreau

Mon portfolio de développeur web junior (BUT MMI, parcours Développement web et dispositifs interactifs, Dijon). Il présente mon parcours, mes compétences et mes projets, et permet de me contacter.

**Voir le site : [floris-do.github.io](https://floris-do.github.io)**

## Fonctionnalités

- Page d'accueil unique : présentation, compétences, projets et contact
- Projets chargés dynamiquement depuis un fichier JSON, avec onglets et page de détail par projet (carrousel d'images inclus)
- Formulaire de contact avec validation des champs, envoi par e-mail via [EmailJS](https://www.emailjs.com/) (sans serveur) et protection anti-spam
- Design responsive, menu adapté au mobile
- Page de mentions légales

## Technologies

HTML5, CSS3 et JavaScript natif (modules ES), sans framework ni outil de build. Icônes [Font Awesome](https://fontawesome.com/), polices Inter et Aclonica hébergées dans le dépôt. Site hébergé sur GitHub Pages.

## Structure

```
├── index.html, projet.html, mentions-legales.html
├── css/      Styles, un fichier par section (variables communes dans style.css)
├── js/       Scripts en modules : menu, formulaire de contact, projets
├── data/     liste-projets.json : les données des projets
└── assets/   Images et polices
```

## Lancer en local

Le site charge un fichier JSON avec `fetch()` : il faut le servir avec un serveur local (extension *Live Server* de VS Code, ou `python -m http.server`), pas ouvrir `index.html` directement.

## Contact

- GitHub : [@floris-do](https://github.com/floris-do)
- LinkedIn : [Floris Doreau](https://www.linkedin.com/in/floris-doreau-4893433b9)
- Formulaire : [floris-do.github.io/#contact](https://floris-do.github.io/#contact)

## Crédits

Polices Inter et Aclonica sous licence libre (voir `assets/fonts/`). Icônes : Font Awesome.