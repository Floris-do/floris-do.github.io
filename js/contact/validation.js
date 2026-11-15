import { validators } from "./validators.js";

import { setFieldError } from "./messages.js";

// Validation individuelle d'un champ.
export function validateField(form, name) {
  const input = form.elements[name];

  if (!input || !validators[name]) {
    return false;
  }

  const value = input.value.trim();

  const message = validators[name](value);

  setFieldError(form, name, message);

  return message === "";
}

// Validation de tous les champs.
export function validateAll(form) {
  let firstInvalid = null;

  Object.keys(validators).forEach((name) => {
    if (!validateField(form, name) && !firstInvalid) {
      firstInvalid = form.elements[name];
    }
  });

  // Place automatiquement le curseur sur le premier champ invalide.
  if (firstInvalid) {
    firstInvalid.focus();
  }

  return firstInvalid === null;
}

// Installation des événements de validation.
export function attachValidationEvents(form) {
  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];

    if (!input) {
      return;
    }

    // Validation lorsque l'utilisateur quitte le champ.
    input.addEventListener("blur", () => {
      validateField(form, name);
    });

    // Validation en direct si une erreur a déjà été affichée.
    input.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") {
        validateField(form, name);
      }
    });
  });
}