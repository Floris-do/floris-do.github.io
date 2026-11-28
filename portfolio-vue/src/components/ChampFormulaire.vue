<script setup>
import iconeErreur from '@/assets/icons/check/attention.svg'
const modele = defineModel({ type: String, default: '' })

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  multiligne: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  maxlength: { type: Number, default: undefined },
  erreur: { type: String, default: '' },
})

const emit = defineEmits(['quitter'])
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>

    <textarea
      v-if="multiligne"
      :id="id"
      :name="id"
      v-model="modele"
      rows="6"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :aria-invalid="erreur ? 'true' : 'false'"
      :aria-describedby="erreur ? `${id}-error` : null"
      required
      @blur="emit('quitter')"
    ></textarea>
    <input
      v-else
      :id="id"
      :name="id"
      v-model="modele"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :aria-invalid="erreur ? 'true' : 'false'"
      :aria-describedby="erreur ? `${id}-error` : null"
      required
      @blur="emit('quitter')"
    />

    <p class="form-error" :id="`${id}-error`" role="alert">
      <template v-if="erreur">
        <img class="icone" :src="iconeErreur"/>
        {{ erreur }}
      </template>
    </p>
  </div>
</template>

<style scoped>
.form-group {
  --field-gap: var(--space-1);
  --err-h: 1rem; /* hauteur réservée au message d'erreur */

  display: flex;
  flex-direction: column;
  gap: var(--field-gap);

  & label {
    font-family: var(--font-text);
    font-size: var(--text-size);
    font-weight: 700;
    color: var(--teal-deep);
  }

  & input,
  & textarea {
    width: 100%;
    padding: var(--space-2) var(--space-3);

    font-family: var(--font-text);
    font-size: var(--text-size);
    color: var(--teal-deep);

    background: var(--mint);
    border: 1px solid var(--teal-mid);
    border-radius: var(--radius-m);
    transition:
      border-color 0.2s ease,
      background 0.2s ease,
      box-shadow 0.2s ease;
  }

  & textarea {
    min-height: 7.5rem;
    line-height: 1.5;
    resize: vertical;
  }

  & input:hover,
  & textarea:hover {
    border-color: var(--teal-dark);
  }

  & input:focus-visible,
  & textarea:focus-visible {
    background: var(--white);
    border-color: var(--teal-dark);
    outline: 2px solid var(--teal-dark);
    outline-offset: 2px;
  }

  /* État invalide */
  & input[aria-invalid='true'],
  & textarea[aria-invalid='true'] {
    background: var(--error-bg);
    border-color: var(--error);

    &:focus-visible {
      outline-color: var(--error);
    }
  }
}

.form-error {
  margin: 0;
  min-height: var(--err-h);
  font-size: var(--text-size-s);
  font-weight: 600;
  line-height: var(--err-h);
  color: var(--error);

  & img {
    margin-right: 0.25em;
  }
}

@media (prefers-reduced-motion: reduce) {
  input,
  textarea {
    transition: none;
  }
}
</style>