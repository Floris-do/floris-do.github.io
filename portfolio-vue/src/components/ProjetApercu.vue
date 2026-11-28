<script setup>
import { computed } from 'vue'
import PastillesListe from '@/components/PastillesListe.vue'
import EncadreInfos from '@/components/EncadreInfos.vue'
import flecheDroite from '@/assets/icons/fleches/fleche-d.svg'

const props = defineProps({
  projet: {
    type: Object,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
})

function deuxChiffres(nombre) {
  return String(nombre).padStart(2, '0')
}

const lignesMeta = computed(() => {
  const lignes = [
    { libelle: 'Rôle', valeur: props.projet.role },
    { libelle: 'Statut', valeur: props.projet.statut },
  ]
  return lignes.filter((ligne) => ligne.valeur)
})
</script>


<template>
  <div class="projets-contenu">
    <div class="projets-apercu" :class="{ 'projets-apercu--vide': !projet.image }">
      <img v-if="projet.image" :src="projet.image" :alt="projet.alt" loading="lazy" />
      <p v-else>Capture d'écran du projet</p>
    </div>

    <div class="projets-infos">
      <span class="projets-compteur">{{ deuxChiffres(numero) }} / {{ deuxChiffres(total) }}</span>
      <h3>{{ projet.nom }}</h3>
      <p class="projets-description">{{ projet.description }}</p>

      <PastillesListe v-if="projet.technos?.length" :elements="projet.technos" />

      <EncadreInfos v-if="lignesMeta.length" :lignes="lignesMeta"/>

      <div class="boutons">
        <RouterLink class="bouton bouton--principal" :to="`/projet/${projet.id}`">
          Détail du site
          <img class="icone fleche-droite" :src="flecheDroite" alt="" />
        </RouterLink>
        <a
          v-if="projet.code"
          class="bouton bouton--secondaire"
          :href="projet.code"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le code
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projets-contenu {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  animation: projets-apparition 0.35s ease both;
}

@keyframes projets-apparition {
  from {
    opacity: 0;
    transform: translateY(8px);
  } to {
    opacity: 1;
    transform: none;
  }
}

.projets-apercu {
  flex: 1 1 360px;
  min-width: 0;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--mint);
  border: 1px solid var(--teal-mid);
  border-radius: var(--radius-l);

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
}

.projets-apercu--vide {
  margin: var(--space-4);
  border-style: dashed;
  background: transparent;

  & p {
    font-size: var(--text-size-s);
    color: var(--teal-dark);
  }
}

.projets-compteur {
  font-size: var(--text-size-s);
  color: var(--teal-dark);
}

.projets-infos {
  flex: 1 1 340px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-4);

  & h3 {
    font-size: clamp(1.75rem, 3.5vw, 2.25rem);
    line-height: 1.1;
  }
}

.projets-description {
  line-height: 1.65;
  color: var(--teal-dark);
}

@media (prefers-reduced-motion: reduce) {
  .projets-contenu {
    animation: none;
  }
  .projets-apercu img {
    transition: none;
  }
  .projets-apercu:hover img {
    transform: none;
  }
}
</style>