import { validators } from "./contact/validators.js";
import { showStatus, setFieldError } from "./contact/messages.js";
import { validateAll, attachValidationEvents } from "./contact/validation.js";
import { createAntiSpamGuard, isHoneypotTriggered, isRecaptchaValid, resetRecaptcha } from "./contact/anti-spam.js";
import { initializeEmailService, sendContactEmail } from "./contact/email-service.js";

(() => {
  "use strict";

  // Initialisation du formulaire.
  const form = document.getElementById("contact-form");

  if (!form) return;

  const submitButton = document.getElementById("submit-btn");
  const statusElement = document.getElementById("form-status");
  const honeypot = document.getElementById("website");

  const antiSpam = createAntiSpamGuard();

  // Initialisation EmailJS.
  if (!initializeEmailService()) {
    showStatus(statusElement, "Le service d'envoi n'a pas pu être chargé. Vous pouvez m'écrire directement par e-mail.", "error");

    if (submitButton) {
      submitButton.disabled = true;
    }
    return;
  }

  // Activation de la validation des champs.
  attachValidationEvents(form);

  // Gestion de l'envoi du formulaire.
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    showStatus(statusElement, "", "");

    // Protection Honeypot.
    if (isHoneypotTriggered(honeypot)) {
      showStatus(statusElement, "Merci, votre message a bien été envoyé.", "success");
      form.reset();
      return;
    }

    // Validation des champs.
    if (!validateAll(form)) {
      showStatus(statusElement, "Merci de corriger les champs signalés.", "error");
      return;
    }

    // Délai minimum de remplissage.
    if (!antiSpam.checkMinimumFillTime()) {
      showStatus(statusElement, "Veuillez patienter quelques secondes avant d’envoyer.", "error");
      return;
    }

    // Cooldown entre deux envois.
    const cooldownMessage = antiSpam.getCooldownMessage();

    if (cooldownMessage) {
      showStatus(statusElement, cooldownMessage, "error");
      return;
    }

    // Vérification reCAPTCHA.
    if (!isRecaptchaValid(form)) {
      showStatus(statusElement, "Merci de cocher la case « Je ne suis pas un robot ».", "error");
      return;
    }

    // Désactivation du bouton pendant l'envoi.
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Envoi en cours…";
    }

    try {
      // Envoi EmailJS.
      await sendContactEmail(form);

      antiSpam.markAsSent();

      // Confirmation.
      showStatus(statusElement, "Merci, votre message a bien été envoyé. Je vous répondrai dès que possible.", "success");

      // Réinitialisation du formulaire.
      form.reset();

      Object.keys(validators).forEach((name) => {
        setFieldError(form, name, "");
      });

      resetRecaptcha(form);
    } catch (error) {
      if (error && error.status === 429) {
        showStatus(statusElement, "Trop de demandes en peu de temps. Réessayez dans quelques minutes.", "error");
      } else {
        showStatus(statusElement, "L'envoi a échoué. Réessayez plus tard ou écrivez-moi directement par e-mail.", "error");
      }

      console.error("EmailJS :", error);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Envoyer";
      }
    }
  });
})();