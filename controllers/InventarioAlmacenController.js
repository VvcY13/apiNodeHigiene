const InventarioAlmacen = require('../models/InventarioAlmacen');
const Almacenes = require('../models/Almacenes');
const Insumos = require('../models/Insumos');

// Crear un nuevo registro de inventario
exports.create = async (req, res) => {
    try {
        const { id_almacen, id_insumo, cantidad } = req.body;

        // Convertir la cantidad a un número entero
        const cantidadNumerica = parseInt(cantidad, 10);

        // Validar que la cantidad sea un número válido
        if (isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
            return res.status(400).json({ message: 'La cantidad debe ser un número válido y mayor que cero.' });
        }

        // Buscar el registro existente
        const inventarioExistente = await InventarioAlmacen.findOne({
            where: {
                id_almacen,
                id_insumo
            }
        });

        if (inventarioExistente) {
            // Si existe, actualizar la cantidad
            inventarioExistente.cantidad += cantidadNumerica; // Sumar la nueva cantidad
            await inventarioExistente.save(); // Guardar cambios
            return res.status(200).json(inventarioExistente);
        } else {
            // Si no existe, crear un nuevo registro
            const nuevoInventario = await InventarioAlmacen.create({ id_almacen, id_insumo, cantidad: cantidadNumerica });
            return res.status(201).json(nuevoInventario);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear o actualizar el inventario', error });
    }
};

// Obtener todos los registros de inventario
exports.findAll = async (req, res) => {
    try {
        const inventarios = await InventarioAlmacen.findAll({
            include: [
                { model: Almacenes, attributes: ['id', 'nombre'] },
                { model: Insumos, attributes: ['id', 'nombre'] }
            ]
        });
        return res.status(200).json(inventarios);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener inventarios', error });
    }
};

// Obtener un registro de inventario por ID
exports.findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const inventario = await InventarioAlmacen.findByPk(id, {
            include: [
                { model: Almacenes, attributes: ['id', 'nombre'] },
                { model: Insumos, attributes: ['id', 'nombre'] }
            ]
        });
        if (!inventario) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        return res.status(200).json(inventario);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener el inventario', error });
    }
};

// Actualizar un registro de inventario por ID
exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { id_almacen, id_insumo, cantidad } = req.body;
        const [updated] = await InventarioAlmacen.update({ id_almacen, id_insumo, cantidad }, {
            where: { id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        const inventarioActualizado = await InventarioAlmacen.findByPk(id);
        return res.status(200).json(inventarioActualizado);
    } catch (error) {
        return res.status(500).json({ message: 'Error al actualizar el inventario', error });
    }
};

// Eliminar un registro de inventario por ID
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await InventarioAlmacen.destroy({
            where: { id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Inventario no encontrado' });
        }
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar el inventario', error });
    }
};
// Obtener todos los registros de inventario para un almacén específico
exports.findAllByAlmacen = async (req, res) => {
    try {
        const id_almacen = 1; // Cambia esto según lo necesites o pasa el ID como parámetro

        const inventarios = await InventarioAlmacen.findAll({
            where: {
                id_almacen: id_almacen // Filtrar por id_almacen
            },
            include: [
                { model: Almacenes, attributes: ['id', 'nombre'] },
                { model: Insumos, attributes: ['id', 'nombre'] }
            ]
        });

        if (inventarios.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros de inventario para el almacén especificado.' });
        }

        return res.status(200).json(inventarios);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener inventarios', error });
    }
};
