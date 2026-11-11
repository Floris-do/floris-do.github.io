/*
  Formulaire de contact avec EmailJS.

  Avant de l'utiliser, remplacez les 3 valeurs ci-dessous par celles de votre
  tableau de bord EmailJS (https://dashboard.emailjs.com).
*/
(() => {
  "use strict";

  const PUBLIC_KEY = "i2kAYsSz1ItmqX83i";
  const SERVICE_ID = "service_ktrndxk";
  const TEMPLATE_ID = "template_vem09ee";

  const MIN_FILL_TIME_MS = 3000; // un humain met plus de 3 s à remplir le formulaire
  const COOLDOWN_MS = 30000; // délai minimum entre deux envois (sur la page ouverte)

  // Icônes Font Awesome placées devant les messages
  const ERROR_ICON = "fa-solid fa-circle-exclamation";
  const STATUS_ERROR_ICON = "fa-solid fa-triangle-exclamation";
  const SUCCESS_ICON = "fa-regular fa-circle-check";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const submitBtn = document.getElementById("submit-btn");
  const statusEl = document.getElementById("form-status");
  const honeypot = document.getElementById("website");
  const pageLoadedAt = Date.now();
  let lastSentAt = 0;

  if (typeof emailjs === "undefined") {
    showStatus("Le service d'envoi n'a pas pu être chargé. Vous pouvez m'écrire directement par e-mail.", "error");
    submitBtn.disabled = true;
    return;
  }

  emailjs.init({ publicKey: PUBLIC_KEY });

  // Le champ « company » (nom de l'entreprise) est facultatif : il n'est donc pas validé.
  const validators = {
    author: (v) => {
      if (v.length < 2) return "Veuillez indiquer votre nom (2 caractères minimum).";
      return "";
    },
    reply_to: (v) => {
      if (!v) return "Veuillez indiquer votre adresse e-mail.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Cette adresse e-mail n'a pas l'air valide.";
      return "";
    },
    subject: (v) => {
      if (v.length < 3) return "Veuillez indiquer un sujet (3 caractères minimum).";
      return "";
    },
    message: (v) => {
      if (v.length < 10) return "Votre message est trop court (10 caractères minimum).";
      return "";
    },
  };

  // Affiche un message précédé d'une icône (sans innerHTML : le texte reste du texte)
  function renderMessage(el, text, iconClass) {
    el.textContent = "";
    if (!text) return;
    const icon = document.createElement("i");
    icon.className = iconClass;
    icon.setAttribute("aria-hidden", "true");
    el.append(icon, " " + text);
  }

  function setFieldError(name, message) {
    const input = form.elements[name];
    const errorEl = document.getElementById(name + "-error");
    if (errorEl) renderMessage(errorEl, message, ERROR_ICON);
    if (input) {
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (message) input.setAttribute("aria-describedby", name + "-error");
      else input.removeAttribute("aria-describedby");
    }
  }

  function validateField(name) {
    const value = form.elements[name].value.trim();
    const message = validators[name](value);
    setFieldError(name, message);
    return message === "";
  }

  function validateAll() {
    let firstInvalid = null;
    Object.keys(validators).forEach((name) => {
      if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
    });
    if (firstInvalid) firstInvalid.focus();
    return firstInvalid === null;
  }

  function showStatus(text, type) {
    renderMessage(statusEl, text, type === "success" ? SUCCESS_ICON : STATUS_ERROR_ICON);
    statusEl.className = "form-status" + (type ? " form-status--" + type : "");
  }

  // Validation à la sortie d'un champ, puis en direct une fois l'erreur affichée
  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => validateField(name));
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") validateField(name);
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    showStatus("", "");

    // Robot probable : on fait semblant que tout s'est bien passé, sans rien envoyer
    if (honeypot && honeypot.value !== "") {
      showStatus("Merci, votre message a bien été envoyé.", "success");
      form.reset();
      return;
    }

    if (!validateAll()) {
      showStatus("Merci de corriger les champs signalés.", "error");
      return;
    }

    // Anti-spam : formulaire rempli trop vite
    if (Date.now() - pageLoadedAt < MIN_FILL_TIME_MS) {
      showStatus("Veuillez patienter quelques secondes avant d’envoyer.", "error");
      return;
    }

    // Anti-spam : envois trop rapprochés
    const sinceLast = Date.now() - lastSentAt;
    if (lastSentAt && sinceLast < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - sinceLast) / 1000);
      showStatus("Veuillez patienter " + wait + " s avant un nouvel envoi.", "error");
      return;
    }

    // reCAPTCHA (seulement si vous avez activé le widget dans le HTML)
    if (form.querySelector(".g-recaptcha") && typeof grecaptcha !== "undefined" && !grecaptcha.getResponse()) {
      showStatus("Merci de cocher la case « Je ne suis pas un robot ».", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      lastSentAt = Date.now();
      showStatus("Merci, votre message a bien été envoyé. Je vous répondrai dès que possible.", "success");
      form.reset();
      Object.keys(validators).forEach((name) => setFieldError(name, ""));
      if (typeof grecaptcha !== "undefined" && form.querySelector(".g-recaptcha")) grecaptcha.reset();
    } catch (error) {
      if (error && error.status === 429) {
        showStatus("Trop de demandes en peu de temps. Réessayez dans quelques minutes.", "error");
      } else {
        showStatus("L'envoi a échoué. Réessayez plus tard ou écrivez-moi directement par e-mail.", "error");
      }
      console.error("EmailJS :", error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer";
    }
  });
})();
