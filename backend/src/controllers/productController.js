const { productos } =
    require("../database");

// Valida y normaliza los datos de un producto.
// Devuelve { error } si algo está mal, o { datos } si todo está bien.
const validarProducto = (body, parcial = false) => {

    const datos = {};

    if (!parcial || body.nombre !== undefined) {

        if (
            typeof body.nombre !== "string" ||
            !body.nombre.trim()
        ) {
            return { error: "El nombre es obligatorio" };
        }

        datos.nombre = body.nombre.trim();
    }

    if (!parcial || body.precio !== undefined) {

        const precio = Number(body.precio);

        if (!Number.isFinite(precio) || precio < 0) {
            return { error: "El precio debe ser un número válido" };
        }

        datos.precio = precio;
    }

    if (body.descripcion !== undefined) {
        datos.descripcion = String(body.descripcion);
    }

    if (body.imagen !== undefined) {
        datos.imagen = String(body.imagen);
    }

    return { datos };
};

const obtenerProductos = (req, res) => {

    return res.json(productos);

};

const obtenerProducto = (req, res) => {

    const id = Number(req.params.id);

    const producto =
        productos.find(
            item => item.id === id
        );

    if (!producto) {

        return res.status(404).json({
            message: "Producto no encontrado"
        });

    }

    return res.json(producto);
};

const crearProducto = (req, res) => {

    const { error, datos } =
        validarProducto(req.body || {});

    if (error) {
        return res.status(400).json({ message: error });
    }

    const nuevo = {
        id: Math.max(0, ...productos.map(p => p.id)) + 1,
        descripcion: "",
        imagen: "https://picsum.photos/300/200",
        ...datos
    };

    productos.push(nuevo);

    return res.status(201).json(nuevo);
};

const actualizarProducto = (req, res) => {

    const id = Number(req.params.id);

    const indice =
        productos.findIndex(
            item => item.id === id
        );

    if (indice === -1) {

        return res.status(404).json({
            message: "Producto no encontrado"
        });

    }

    const { error, datos } =
        validarProducto(req.body || {}, true);

    if (error) {
        return res.status(400).json({ message: error });
    }

    productos[indice] = {
        ...productos[indice],
        ...datos,
        id
    };

    return res.json(productos[indice]);
};

const eliminarProducto = (req, res) => {

    const id = Number(req.params.id);

    const indice =
        productos.findIndex(
            item => item.id === id
        );

    if (indice === -1) {

        return res.status(404).json({
            message: "Producto no encontrado"
        });

    }

    const [eliminado] = productos.splice(indice, 1);

    return res.json({
        message: "Producto eliminado",
        producto: eliminado
    });
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
