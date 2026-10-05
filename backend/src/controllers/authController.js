const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { usuarios } = require("../database");

const login = async (req, res) => {

    try {

        const { correo, password } = req.body;

        // 1. Validar datos recibidos
        if (!correo || !password) {

            return res.status(400).json({
                message: "Correo y contraseña son obligatorios"
            });

        }

        // 2. Buscar usuario
        const usuario = usuarios.find(
            (item) =>
                item.correo.toLowerCase() ===
                correo.toLowerCase()
        );

        // 3. Usuario inexistente
        if (!usuario) {

            return res.status(401).json({
                message: "Correo o contraseña incorrectos"
            });

        }

        // 4. Comparar contraseña
        const passwordValido =
            await bcrypt.compare(
                password,
                usuario.password
            );

        if (!passwordValido) {

            return res.status(401).json({
                message: "Correo o contraseña incorrectos"
            });

        }

        // 5. Crear JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                correo: usuario.correo,
                rol: usuario.rol
            },
            process.env.JWT_SECRET,
            {
                expiresIn:
                    process.env.JWT_EXPIRES_IN || "1h"
            }
        );

        // 6. Responder
        return res.json({

            message: "Inicio de sesión exitoso",

            token,

            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }

        });

    } catch (error) {

        console.error(
            "Error en login:",
            error
        );

        return res.status(500).json({
            message: "Error interno del servidor"
        });

    }
};

module.exports = {
    login
};