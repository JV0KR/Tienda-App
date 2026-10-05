// Debe usarse DESPUÉS de verificarToken (necesita req.usuario).
// Solo deja pasar a usuarios con rol "admin".
const soloAdmin = (req, res, next) => {

    if (!req.usuario || req.usuario.rol !== "admin") {

        return res.status(403).json({
            message: "No tienes permisos para esta acción"
        });

    }

    next();
};

module.exports = soloAdmin;
