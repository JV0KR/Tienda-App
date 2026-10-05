const express = require("express");

const verificarToken =
    require("../middleware/authMiddleware");

const soloAdmin =
    require("../middleware/soloAdmin");

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productController");

const router = express.Router();

// Lectura: cualquier usuario autenticado
router.get(
    "/",
    verificarToken,
    obtenerProductos
);

router.get(
    "/:id",
    verificarToken,
    obtenerProducto
);

// Escritura: solo administradores
router.post(
    "/",
    verificarToken,
    soloAdmin,
    crearProducto
);

router.put(
    "/:id",
    verificarToken,
    soloAdmin,
    actualizarProducto
);

router.delete(
    "/:id",
    verificarToken,
    soloAdmin,
    eliminarProducto
);

module.exports = router;
