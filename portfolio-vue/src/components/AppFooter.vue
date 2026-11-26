<template>
  <footer>
    <RouterLink to="/mentions-legales">Mentions légales</RouterLink>
  </footer>
</template>

<style scoped>
footer {
  z-index: 0;
  position: relative;
  width: 100%;
  height: var(--footer-hauteur);
  margin-top: auto; /* pousse le footer en bas de la page */
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: linear-gradient(to top, var(--teal-deep), transparent);
  background-size: 100% 200%;
  background-position: top;

  & a {
    font-family: var(--font-text);
    font-size: var(--text-size-xs);
    color: var(--teal-light);
    text-decoration: none;
    margin-bottom: var(--space-3);
  }
}
</style>