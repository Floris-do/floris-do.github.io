<script setup>
import ContactLiens from '@/components/ContactLiens.vue'
import PastillesListe from '@/components/PastillesListe.vue';

const competences = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub']
const technos = ['Vue.js', 'Vite']
</script>

<template>
  <main>
    <h1>Bienvenue sur mon portfolio !</h1>
    <ContactLiens />
    <PastillesListe :elements="competences" />
    <PastillesListe :elements="technos" />
  </main>
</template>