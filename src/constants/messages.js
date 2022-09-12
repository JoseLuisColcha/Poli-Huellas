const translateMessage = (message) => {
  const messages = {
    "auth/user-not-found":
      "No existe una cuenta con el correo electrónico ingresado.",
    "auth/invalid-email": "La dirección de correo electrónico es inválida",
    "auth/too-many-requests":
      "Demasiadas solicitudes de ingreso, espere un momento y vuelva a intentarlo",
    "auth/wrong-password":
      "La dirección de correo electrónico o contraseña es incorrecta",
  };

  return messages[message] || message;
};
export default translateMessage;
