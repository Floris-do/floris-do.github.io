<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import ProjectCard from './components/ProjectCard.vue'

const projetEnCours = ref(null)
const projets = ref([
  {
    id: 1,
    nom: 'Portfolio',
    description: 'Portfolio de Floris Doreau',
  },
  {
    id: 2,
    nom: 'Dataviz',
    description: 'Site de stats',
  },
])
const newProjet = ref('')
const newDescription = ref('')
const message = ref('')

const nbProjets = computed(() => projets.value.length)

watch(newProjet, (nouvelleValeur) => {
  if (nouvelleValeur.trim().length === 0) {
    newDescription.value = ''
    console.log('Le champ est vide.')
  } else if (nouvelleValeur.trim().length < 3) {
    console.log('Le nom du projet est trop court.')
  } else {
    console.log('Nom de projet valide.')
  }
})

function afficherProjet(nom, description) {
  alert('Projet sélectionné : ' + nom + ' - ' + description)
}
function supprimerProjet(id) {
  projets.value = projets.value.filter((projet) => projet.id !== id)
}
function modifierProjet(id) {
  const resultat = projets.value.find((projet) => projet.id === id)
  projetEnCours.value = id
  newProjet.value = resultat.nom
  newDescription.value = resultat.description
}
function enregistrerProjet() {
  if (newProjet.value.trim() === '') {
    return
  }

  if (projetEnCours.value !== null) {
    const projet = projets.value.find((projet) => projet.id === projetEnCours.value)
    projet.nom = newProjet.value.trim()
    projet.description = newDescription.value.trim()
  } else {
    const newId = Math.max(0, ...projets.value.map((projet) => projet.id)) + 1

    projets.value.push({
      id: newId,
      nom: newProjet.value.trim(),
      description: newDescription.value.trim(),
    })
  }

  projetEnCours.value = null
  newProjet.value = ''
  newDescription.value = ''
}
function annulerModifications() {
  projetEnCours.value = null
  newProjet.value = ''
  newDescription.value = ''
}

onMounted(() => {
  message.value = "Bienvenue sur mon portfolio !"
  console.log('App.vue est monté !')
})
</script>

<template>
  <main>
    <h1>Mes projets</h1>
    <h2>{{ message }}</h2>
    <p v-if="nbProjets === 0">Aucun projet pour le moment.</p>
    <p v-else-if="nbProjets === 1">Tu as 1 projet.</p>
    <p v-else>Tu as {{ nbProjets }} projets.</p>
    <ProjectCard
      v-for="projet in projets"
      :key="projet.id"
      :nom="projet.nom"
      :id="projet.id"
      :description="projet.description"
      @voir="afficherProjet"
      @modifier="modifierProjet"
      @supprimer="supprimerProjet"
    />
    <form @submit.prevent="enregistrerProjet">
      <input type="text" v-model="newProjet" placeholder="Nom du projet" autofocus/>
      <input type="text" v-model="newDescription" placeholder="Description du projet" />
      <p>Nom saisi : {{ newProjet }}</p>
      <button type="submit">
        {{ projetEnCours === null ? 'Ajouter projet' : 'Enregistrer les modifications' }}
      </button>
      <button type="button" @click="annulerModifications" v-if="projetEnCours !== null">Annuler</button>
    </form>
  </main>
</template>
