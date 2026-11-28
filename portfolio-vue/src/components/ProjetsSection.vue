<script setup>
import { ref } from 'vue'
import ProjetsOnglets from '@/components/ProjetsOnglets.vue'
import ProjetApercu from '@/components/ProjetApercu.vue'
import projets from '@/data/liste-projets.json'

const actif = ref(0)
</script>

<template>
  <section id="projets" class="projets">
    <div class="section-entete panneau-verre">
      <h2>Mes projets</h2>
      <p>Choisissez un onglet pour découvrir un projet.</p>
    </div>

    <div class="projets-fenetre panneau-verre">
      <ProjetsOnglets :projets="projets" :actif="actif" @changer="actif = $event" />

      <div class="projets-panneau" id="projets-panneau" role="tabpanel" tabindex="0">
        <ProjetApercu
          :key="projets[actif].id"
          :projet="projets[actif]"
          :numero="actif + 1"
          :total="projets.length"
        />
      </div>
    </div>
  </section>
</template>


<style scoped>
.projets {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--section-gap);
}

.projets-fenetre {
  overflow: hidden;
}

.projets-panneau {
  padding: var(--panel-padding);

  &:focus-visible {
    outline: 2px solid var(--teal-dark);
    outline-offset: -4px;
  }
}
</style>