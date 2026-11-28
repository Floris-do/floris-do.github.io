<script setup>
import ContactLiens from '@/components/ContactLiens.vue'
import PastillesListe from '@/components/PastillesListe.vue'
import EncadreInfos from '@/components/EncadreInfos.vue'
import flecheDroite from '@/assets/icons/fleches/fleche-d.svg'

// Quand tu auras une photo : import photo from '@/assets/images/portrait.jpg'
const photo = null

const competences = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub']

const infos = [
  {
    libelle: 'Poste recherché',
    valeur: "Développeur web front-end, full-stack. Ouvert à d'autres propositions de poste.",
  },
  {
    libelle: 'Disponibilité',
    valeur: "Durée de 8 à 12 semaines à partir du 25 janvier 2027 jusqu'au 2 avril 2027.",
  },
  {
    libelle: 'Localisation',
    valeur: 'Dijon et ses alentours, Lyon, Mâcon',
  }
]
</script>


<template>
  <section id="presentation" class="presentation panneau-verre" aria-labelledby="presentation-titre">
    <!-- Colonne de gauche : photo, titre h1, liens -->
    <div class="presentation-profil">
      <div class="presentation-cadre">
        <img v-if="photo" :src="photo" alt="Portrait de Floris Doreau" />
        <p v-else class="presentation-cadre-vide">Photo à venir</p>
      </div>

      <h1 id="presentation-titre">Floris Doreau</h1>

      <ContactLiens />
    </div>

    <!-- Colonne de droite : contenu -->
    <div class="presentation-contenu">
      <p class="presentation-accroche">
        Développeur web junior, passionné par les technologies modernes et l'expérience
        utilisateur.
      </p>

      <div class="presentation-bloc">
        <h2>Qui suis-je ?</h2>
        <p>
          Après un bac
          <a
            href="https://www.onisep.fr/formation/apres-la-3-la-voie-generale-et-technologique/qu-est-ce-que-la-voie-generale-et-technologique/la-voie-technologique-en-premiere-et-en-terminale/le-bac-sti2d-sciences-et-technologies-de-l-industrie-et-du-developpement-durable"
            target="_blank"
            rel="noopener noreferrer"
            >STI2D</a
          >
          spécialité
          <a
            href="https://www.onisep.fr/ressources/univers-formation/formations/lycees/bac-techno-sti2d-sciences-et-technologies-de-l-industrie-et-du-developpement-durable-enseignement-specifique-systemes-d-information-et-numerique"
            target="_blank"
            rel="noopener noreferrer"
            >SIN</a
          >, j'ai choisi de poursuivre en
          <a
            href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-metiers-du-multimedia-et-de-l-internet-parcours-creation-numerique"
            target="_blank"
            rel="noopener noreferrer"
            >BUT MMI</a
          >
          spécialité
          <a
            href="https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-metiers-du-multimedia-et-de-l-internet-parcours-developpement-web-et-dispositifs-interactifs"
            target="_blank"
            rel="noopener noreferrer"
            >DWDI</a
          >
          à Dijon pour approfondir mon intérêt pour le numérique et le développement web.
        </p>
        <p>
          Je suis à la recherche d'un stage qui me permettra de gagner en expérience dans le
          développement web.
        </p>
      </div>

      <div class="presentation-bloc">
        <h2>Compétences</h2>
        <PastillesListe :elements="competences" />
      </div>

      <EncadreInfos :lignes="infos" />

      <div class="boutons">
        <RouterLink class="bouton bouton--principal" to="/#projets">
          Découvrir mes projets
          <img class="icone fleche-droite" :src="flecheDroite" alt="" />
        </RouterLink>
        <RouterLink class="bouton bouton--secondaire" to="/#contact">Me contacter</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.presentation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-5) clamp(2rem, 5vw, 4rem);
  min-height: 60vh;
  min-height: 60dvh;
  margin-bottom: var(--section-gap);
  padding: var(--panel-padding-xl);
}

/* ----------------------------------------------------------
    COLONNE DE GAUCHE : photo, titre h1, liens
---------------------------------------------------------- */
.presentation-profil {
  flex: 0 1 460px;
  min-width: 0;
  max-width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);

  & h1 {
    font-size: var(--title-size-section);
    line-height: 1.05;
    text-align: center;
  }
}

.presentation-cadre {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 46 / 40;
  overflow: hidden;
  background: var(--mint);
  border: 1px solid var(--teal-mid);
  border-radius: var(--radius-l);

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.presentation-cadre-vide {
  font-size: var(--text-size-s);
  color: var(--teal-dark);
}

/* Grand écran : les liens passent à droite de la photo et du titre, en colonne */
@media (max-width: 1357px) {
  .presentation-profil {
    flex: 0 1 auto;
    width: fit-content;
    max-width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 460px) 48px;
    justify-content: center;
    align-items: center;
    column-gap: var(--space-5);
    row-gap: var(--space-5);
    margin-inline: auto;
  }

  .presentation-cadre {
    grid-column: 1;
    grid-row: 1;
  }

  .presentation-profil h1 {
    grid-column: 1;
    grid-row: 2;
  }

  .presentation-profil .contact-liens {
    grid-column: 2;
    grid-row: 1 / span 2;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .presentation-profil {
    display: flex;
    flex-direction: column;
    flex: 0 1 460px;
  }

  .presentation-profil .contact-liens {
    grid-column: 2;
    grid-row: 1;
    flex-direction: row;
  }
}

/* ----------------------------------------------------------
    COLONNE DE DROITE : contenu
---------------------------------------------------------- */
.presentation-contenu {
  flex: 1 1 28rem;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-5);
}

.presentation-accroche {
  padding-bottom: var(--space-4);
  font-size: var(--text-size-xl);
  line-height: 1.4;
  color: var(--teal-deep);
  border-bottom: 1px solid color-mix(in srgb, var(--teal-mid) 35%, transparent);
}

.presentation-bloc {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);

  & h2 {
    font-size: var(--title-size-sub);
    line-height: 1.1;
  }

  & p {
    line-height: 1.65;
    color: var(--teal-dark);

    & a {
      all: unset;
      cursor: pointer;
      font-weight: 600;
    }
  }
}
</style>