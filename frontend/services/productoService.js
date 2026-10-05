import api from "./api";

// Obtener todos los productos
export const obtenerProductos = async () => {
  return await api("/products");
};

// Obtener un producto por ID
export const obtenerProducto = async (id) => {
  return await api(`/products/${id}`);
};

// Crear producto
export const crearProducto = async (producto) => {
  return await api("/products", {
    method: "POST",
    body: JSON.stringify(producto)
  });
};

// Actualizar producto
export const actualizarProducto = async (id, producto) => {
  return await api(`/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(producto)
  });
};

// Eliminar producto
export const eliminarProducto = async (id) => {
  return await api(`/products/${id}`, {
    method: "DELETE"
  });
};
