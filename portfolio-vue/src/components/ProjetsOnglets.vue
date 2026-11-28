<script setup>
defineProps({
  projets: {
    type: Array,
    required: true
  },
  actif: {
    type: Number,
    default: 0
  },
})

const emit = defineEmits(['changer'])
</script>

<template>
  <div class="projets-onglets" role="tablist" aria-label="Choix du projet">
    <button
      v-for="(projet, index) in projets"
      :key="projet.id"
      class="projets-onglet"
      type="button"
      role="tab"
      :id="`projets-onglet-${index}`"
      :aria-selected="index === actif"
      :tabindex="index === actif ? 0 : -1"
      @click="emit('changer', index)"
    >{{ projet.nom }}</button>
  </div>
</template>

<style scoped>
.projets-onglets {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid color-mix(in srgb, var(--teal-mid) 35%, transparent);
}

.projets-onglet {
  flex: 1 1 auto;
  min-height: 56px;
  padding: 0 var(--space-5);
  border: 0;
  border-radius: 0;
  background: transparent;
  font-family: var(--font-text);
  font-size: var(--text-size-s);
  color: var(--teal-dark);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--white) 30%, transparent);
  }

  /* Onglet actif */
  &[aria-selected='true'] {
    position: relative;
    z-index: 1;
    background: color-mix(in srgb, var(--white) 70%, transparent);
    color: var(--teal-deep);
    box-shadow:
      -6px 0 12px -6px color-mix(in srgb, var(--teal-deep) 28%, transparent),
      6px 0 12px -6px color-mix(in srgb, var(--teal-deep) 28%, transparent);
  }

  &:focus-visible {
    outline: 2px solid var(--teal-dark);
    outline-offset: -4px;
  }
}
</style>