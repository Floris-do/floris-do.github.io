export const validators = {
  author: (v) => {
    if (v.length < 2)
      return "Veuillez indiquer votre nom (2 caractères minimum).";
    return "";
  },

  reply_to: (v) => {
    if (!v)
      return "Veuillez indiquer votre adresse e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
      return "Cette adresse e-mail n'a pas l'air valide.";
    return "";
  },

  subject: (v) => {
    if (v.length < 3)
      return "Veuillez indiquer un sujet (3 caractères minimum).";
    return "";
  },

  message: (v) => {
    if (v.length < 10)
      return "Votre message est trop court (10 caractères minimum).";
    return "";
  }
};