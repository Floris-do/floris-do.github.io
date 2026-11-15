import {
  PUBLIC_KEY,
  SERVICE_ID,
  TEMPLATE_ID
} from "./config.js";

// Initialisation du service EmailJS.
export function initializeEmailService() {
  if (typeof emailjs === "undefined") {
    return false;
  }
  emailjs.init({
    publicKey: PUBLIC_KEY
  });
  return true;
}

// Envoi du formulaire de contact.
export function sendContactEmail(form) {
  if (typeof emailjs === "undefined") {
    return Promise.reject(
      new Error("La bibliothèque EmailJS n'est pas disponible.")
    );
  }
  return emailjs.sendForm(
    SERVICE_ID,
    TEMPLATE_ID,
    form
  );
}