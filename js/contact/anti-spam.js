import {
  MIN_FILL_TIME_MS,
  COOLDOWN_MS
} from "./config.js";

export function createAntiSpamGuard() {
  const pageLoadedAt = Date.now();
  let lastSentAt = 0;

  return {
    // Vérifie que le formulaire n'a pas été rempli trop rapidement.
    checkMinimumFillTime() {
      return Date.now() - pageLoadedAt >= MIN_FILL_TIME_MS;
    },
    // Vérifie le délai entre deux envois.
    getCooldownMessage() {
      const elapsed = Date.now() - lastSentAt;

      if (!lastSentAt || elapsed >= COOLDOWN_MS) {
        return "";
      }
      const waitSeconds = Math.ceil(
        (COOLDOWN_MS - elapsed) / 1000
      );
      return `Veuillez patienter ${waitSeconds} s avant un nouvel envoi.`;
    },
    // Enregistre la date du dernier envoi réussi.
    markAsSent() {
      lastSentAt = Date.now();
    }

  };
}

// Détection du honeypot.
// Si le champ caché est rempli, on considère qu'il s'agit d'un robot.
export function isHoneypotTriggered(honeypot) {
  return Boolean(honeypot && honeypot.value !== "");
}

// Vérification reCAPTCHA.
export function isRecaptchaValid(form) {
  const recaptchaWidget = form.querySelector(".g-recaptcha");

  // Si le widget n'existe pas, aucune vérification n'est nécessaire.
  if (!recaptchaWidget) {
    return true;
  }
  return (
    typeof grecaptcha !== "undefined" &&
    Boolean(grecaptcha.getResponse())
  );

}

// Réinitialisation reCAPTCHA après un envoi réussi.
export function resetRecaptcha(form) {
  if (
    form.querySelector(".g-recaptcha") &&
    typeof grecaptcha !== "undefined"
  ) {
    grecaptcha.reset();
  }
}