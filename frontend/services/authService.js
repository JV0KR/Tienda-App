import api from "./api";

export const iniciarSesion = async (correo, password) => {
  return await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      correo,
      password
    })
  });
};
