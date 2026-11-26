<script setup>
import githubIcone from '@/assets/icons/contact/github/github.svg'
import githubIconeSurvol from '@/assets/icons/contact/github/github-light.svg'
import linkedinIcone from '@/assets/icons/contact/linkedin/linkedin.svg'
import linkedinIconeSurvol from '@/assets/icons/contact/linkedin/linkedin-light.svg'
import mailIcone from '@/assets/icons/contact/mail/mail.svg'
import mailIconeSurvol from '@/assets/icons/contact/mail/mail-light.svg'

const liens = [
  {
    nom: 'GitHub',
    url: 'https://github.com/floris-do',
    icone: githubIcone,
    iconeSurvol: githubIconeSurvol,
    externe: true,
  },
  {
    nom: 'LinkedIn',
    url: 'https://www.linkedin.com/in/floris-doreau-4893433b9',
    icone: linkedinIcone,
    iconeSurvol: linkedinIconeSurvol,
    externe: true,
  },
  {
    nom: 'Envoyer un e-mail',
    url: 'mailto:floris.doreau@gmail.com',
    icone: mailIcone,
    iconeSurvol: mailIconeSurvol,
    externe: false,
  },
]
</script>

<template>
  <ul class="contact-liens">
   <li v-for="lien in liens" :key="lien.nom">
    <a
      :href="lien.url"
      :aria-label="lien.nom"
      :target="lien.externe ? '_blank' : null"
      :rel="lien.externe ? 'noopener noreferrer' : null"
    >
      <img class="icone icone--base" :src="lien.icone" alt="" />
      <img class="icone icone--survol" :src="lien.iconeSurvol" alt="" />
    </a>
   </li> 
  </ul>
</template>

<style scoped>
.contact-liens {
  display: flex;
  gap: var(--space-3);
  list-style: none;

  & a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    color: var(--teal-dark);
    text-decoration: none;
    background: color-mix(in srgb, var(--white) 40%, transparent);
    border: 1.5px solid var(--teal-mid);
    border-radius: var(--radius-pill);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      color: var(--mint);
      background: var(--teal-deep);
      border-color: var(--teal-deep);
      transform: translateY(-2px);
      box-shadow: var(--shadow-float);
    }

    &:active {
      transform: translateY(0);
    }

    &:focus-visible {
      outline: 2px solid var(--teal-dark);
      outline-offset: 3px;
    }
  }
  & .icone--survol {
    display: none;
  }

  & a:hover .icone--base {
    display: none;
  }

  & a:hover .icone--survol {
    display: inline-block;
  }
}
</style>