<script setup>
defineProps({
  lignes: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <dl class="encadre-infos">
    <div v-for="ligne in lignes" :key="ligne.libelle">
      <dt>{{ ligne.libelle }}</dt>
      <dd>{{ ligne.valeur }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.encadre-infos {
  cursor: default;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-1) var(--space-4);
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-text);
  font-size: var(--text-size-s);
  background: color-mix(in srgb, var(--mint) 85%, transparent);
  border: 1px solid var(--teal-mid);
  border-radius: var(--radius-l);

  & > div {
    display: contents;
  }

  & dt {
    color: var(--teal-dark);
  }

  & dd {
    color: var(--teal-deep);
  }
}
</style>