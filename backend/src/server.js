const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes =
    require("./routes/authRoutes");

const productRoutes =
    require("./routes/productRoutes");

const app = express();

// Middlewares generales
app.use(cors());

app.use(
    express.json()
);

// Ruta de prueba
app.get("/", (req, res) => {

    res.json({
        message:
            "API TiendaApp funcionando"
    });

});

// Rutas
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

// Manejo de rutas inexistentes
app.use((req, res) => {

    res.status(404).json({
        message: "Ruta no encontrada"
    });

});

// Puerto
const PORT =
    process.env.PORT || 3000;

app.listen(
    PORT,
    () => {

        console.log(
            `Servidor ejecutándose en http://localhost:${PORT}`
        );

    }
);
