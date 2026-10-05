import Constants from "expo-constants";
import { obtenerToken, eliminarToken } from "./authStorage";

// Detecta automáticamente la IP del computador que corre Expo, así funciona
// en celular físico, emulador y web. Si tu backend está en otro lugar,
// reemplaza API_URL por su dirección, por ejemplo "https://mi-servidor.com/api".
const host = Constants.expoConfig?.hostUri?.split(":")[0] ?? "localhost";
const API_URL = `http://${host}:3000/api`;

// Función que la app registra para saber qué hacer cuando la sesión
// expira (el backend responde 401 con un token guardado).
let alSesionExpirada = null;

export const registrarSesionExpirada = (callback) => {
  alSesionExpirada = callback;
};

const api = async (endpoint, options = {}) => {
  const token = await obtenerToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let mensaje = `Error HTTP: ${response.status}`;

    try {
      const data = await response.json();
      if (data.message) {
        mensaje = data.message;
      }
    } catch (error) {}

    // Token vencido o inválido en una ruta protegida: cerrar sesión.
    if (
      response.status === 401 &&
      token &&
      !endpoint.startsWith("/auth/")
    ) {
      await eliminarToken();
      if (alSesionExpirada) {
        alSesionExpirada();
      }
    }

    throw new Error(mensaje);
  }

  return response.json();
};

export default api;
