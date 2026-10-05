const jwt = require("jsonwebtoken");

const verificarToken = (
    req,
    res,
    next
) => {

    try {

        const authorization =
            req.headers.authorization;

        // No existe Authorization
        if (!authorization) {

            return res.status(401).json({
                message: "Token no proporcionado"
            });

        }

        // Verificar formato Bearer
        const partes =
            authorization.split(" ");

        if (
            partes.length !== 2 ||
            partes[0] !== "Bearer"
        ) {

            return res.status(401).json({
                message:
                    "Formato de token inválido"
            });

        }

        const token = partes[1];

        // Verificar JWT
        const usuario =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Guardar información del usuario
        // dentro de la petición
        req.usuario = usuario;

        next();

    } catch (error) {

        console.error(
            "Error verificando token:",
            error.message
        );

        return res.status(401).json({
            message: "Token inválido o expirado"
        });

    }
};

module.exports = verificarToken;