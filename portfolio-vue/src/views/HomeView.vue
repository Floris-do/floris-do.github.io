<script setup>
import { ref } from 'vue'
import ContactLiens from '@/components/ContactLiens.vue'
import PastillesListe from '@/components/PastillesListe.vue'
import ProjetsOnglets from '@/components/ProjetsOnglets.vue'
import ProjetApercu from '@/components/ProjetApercu.vue'
import projets from '@/data/liste-projets.json'

const competences = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub']
const actif = ref(0)
</script>

<template>
  <main>
    <h1>Bienvenue sur mon portfolio !</h1>
    <ContactLiens />
    <PastillesListe :elements="competences" />

    <ProjetsOnglets :projets="projets" :actif="actif" @changer="actif = $event" />
    <ProjetApercu :projet="projets[actif]" :numero="actif + 1" :total="projets.length" />
  </main>
</template>