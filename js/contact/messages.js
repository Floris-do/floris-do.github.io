import {
  ERROR_ICON,
  STATUS_ERROR_ICON,
  SUCCESS_ICON
} from "./config.js";

export function renderMessage(el, text, iconClass) {
  el.textContent = "";

  if (!text) return;

  const icon = document.createElement("img");
  icon.src = iconClass;
  icon.alt = "";
  icon.className = "icone";

  el.append(icon, " " + text);
}

export function showStatus(statusEl, text, type) {
  const icon =
    type === "success"
      ? SUCCESS_ICON
      : STATUS_ERROR_ICON;

  renderMessage(statusEl, text, icon);

  statusEl.className =
    "form-status" +
    (type ? " form-status--" + type : "");
}

export function setFieldError(form, name, message) {
  const input = form.elements[name];
  const errorEl = document.getElementById(name + "-error");

  if (errorEl) {
    renderMessage(errorEl, message, ERROR_ICON);
  }

  if (input) {
    input.setAttribute("aria-invalid", message ? "true" : "false");

    if (message) {
      input.setAttribute("aria-describedby", name + "-error");
    } else {
      input.removeAttribute("aria-describedby");
    }
  }
}