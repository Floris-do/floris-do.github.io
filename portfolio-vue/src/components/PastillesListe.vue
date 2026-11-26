<script setup>
defineProps({
  elements: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <ul class="pastilles">
    <li v-for="element in elements" :key="element">{{ element }}</li>
  </ul>
</template>

<style scoped>
.pastilles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;

  & li {
    cursor: default;
    padding: var(--space-1) var(--space-3);
    font-size: var(--text-size-s);
    color: var(--teal-deep);
    background: color-mix(in srgb, var(--mint) 70%, transparent);
    border: 1px solid var(--teal-mid);
    border-radius: var(--radius-pill);
  }
}
</style>