<script setup>
import { onMounted, onUnmounted } from 'vue';

defineProps({
  nom: String,
  description: String,
  id: Number
})
const emit = defineEmits(['voir', 'supprimer', 'modifier'])

onMounted(() => {
  console.log('Une carte projet vient d’être montée !')
})
onUnmounted(() => {
  console.log('Une carte projet vient d’être démontée !')
})
</script>

<template>
  <article>
    <h2>{{ nom }}</h2>
    <p>Projet numéro : {{ id }}</p>
    <p>{{ description }}</p>
    <button @click="emit('voir', nom, description)">Voir le projet</button>
    <button @click="emit('modifier', id)">Modifier</button>
    <button @click="emit('supprimer', id)">Supprimer</button>
  </article>
</template>

<style scoped>
article {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>