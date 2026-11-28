<script setup>
import ContactLiens from '@/components/ContactLiens.vue'
import PastillesListe from '@/components/PastillesListe.vue'
import ProjetsSection from '@/components/ProjetsSection.vue'

const competences = ['HTML', 'CSS', 'JavaScript', 'Git', 'GitHub']
</script>

<template>
  <main>
    <h1>Bienvenue sur mon portfolio !</h1>
    <ContactLiens />
    <PastillesListe :elements="competences" />

    <ProjetsSection />
  </main>
</template>