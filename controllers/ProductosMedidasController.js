const ProductosMedidas = require('../models/ProductosMedidas');

exports.createProductoMedida = async (req, res) => {
    const { id_producto, id_medida, cantidad_unitaria } = req.body;
    try {
        const productoMedida = await ProductosMedidas.create({ id_producto, id_medida, cantidad_unitaria });
        res.status(201).json({ message: 'Registro creado exitosamente', productoMedida });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los productos medida
exports.getAllProductosMedidas = async (req, res) => {
    try {
        const productosMedidas = await ProductosMedidas.findAll();
        res.status(200).json(productosMedidas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto medida por ID
exports.getProductoMedidaById = async (req, res) => {
    const { id } = req.params;
    try {
        const productoMedida = await ProductosMedidas.findByPk(id);
        if (!productoMedida) {
            return res.status(404).json({ message: 'Producto medida no encontrado' });
        }
        res.status(200).json(productoMedida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto medida
exports.updateProductoMedida = async (req, res) => {
    const { id } = req.params;
    const { id_producto, id_medida, cantidad_unitaria } = req.body;

    try {
        const productoMedida = await ProductosMedidas.findByPk(id);
        if (!productoMedida) {
            return res.status(404).json({ message: 'Producto medida no encontrado' });
        }

        // Actualizar los campos del producto medida
        productoMedida.id_producto = id_producto;
        productoMedida.id_medida = id_medida;
        productoMedida.cantidad_unitaria = cantidad_unitaria;

        await productoMedida.save();
        res.status(200).json({ message: 'Producto medida actualizado exitosamente', productoMedida });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto medida
exports.deleteProductoMedida = async (req, res) => {
    const { id } = req.params;
    try {
        const productoMedida = await ProductosMedidas.findByPk(id);
        if (!productoMedida) {
            return res.status(404).json({ message: 'Producto medida no encontrado' });
        }

        await productoMedida.destroy();
        res.status(200).json({ message: 'Producto medida eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};