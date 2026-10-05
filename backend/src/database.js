const bcrypt = require("bcryptjs");

const usuarios = [
    {
        id: 1,
        nombre: "Administrador",
        correo: "admin@tienda.com",
        password: bcrypt.hashSync("123456", 10),
        rol: "admin"
    },
    {
        id: 2,
        nombre: "Juan Pérez",
        correo: "juan@tienda.com",
        password: bcrypt.hashSync("123456", 10),
        rol: "cliente"
    }
];

const productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo",
        precio: 2500000,
        descripcion: "Laptop para trabajo y estudio.",
        imagen: "https://picsum.photos/300/200?random=1"
    },
    {
        id: 2,
        nombre: "Mouse Logitech",
        precio: 80000,
        descripcion: "Mouse inalámbrico para computador.",
        imagen: "https://picsum.photos/300/200?random=2"
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        precio: 180000,
        descripcion: "Teclado mecánico RGB.",
        imagen: "https://picsum.photos/300/200?random=3"
    },
    {
        id: 4,
        nombre: "Monitor Samsung",
        precio: 950000,
        descripcion: "Monitor Full HD de 24 pulgadas.",
        imagen: "https://picsum.photos/300/200?random=4"
    },
    {
        id: 5,
        nombre: "Audífonos Bluetooth",
        precio: 220000,
        descripcion: "Audífonos inalámbricos Bluetooth.",
        imagen: "https://picsum.photos/300/200?random=5"
    }
];

module.exports = {
    usuarios,
    productos
};