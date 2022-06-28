const translateMessage = (message) => {
  const messages = {
    invalid_credentials: "La combinación de usuario y clave es incorrecta.",
  };

  return messages[message] || message;
};
export default translateMessage;
