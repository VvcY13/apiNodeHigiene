// src/controllers/AlmacenesController.js
const Almacenes = require('../models/Almacenes');

// Obtener todos los almacenes
const getAllAlmacenes = async (req, res) => {
    try {
        const almacenes = await Almacenes.findAll();
        res.status(200).json(almacenes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener almacenes', error });
    }
};

// Obtener un almacén por ID
const getAlmacenById = async (req, res) => {
    const { id } = req.params;
    try {
        const almacen = await Almacenes.findByPk(id);
        if (almacen) {
            res.status(200).json(almacen);
        } else {
            res.status(404).json({ message: 'Almacén no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el almacén', error });
    }
};

// Crear un nuevo almacén
const createAlmacen = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const nuevoAlmacen = await Almacenes.create({ nombre, descripcion });
        res.status(201).json(nuevoAlmacen);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el almacén', error });
    }
};

// Actualizar un almacén
const updateAlmacen = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const [updated] = await Almacenes.update({ nombre, descripcion }, { where: { id } });
        if (updated) {
            const updatedAlmacen = await Almacenes.findByPk(id);
            res.status(200).json(updatedAlmacen);
        } else {
            res.status(404).json({ message: 'Almacén no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el almacén', error });
    }
};

// Eliminar un almacén
const deleteAlmacen = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Almacenes.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Almacén no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el almacén', error });
    }
};

module.exports = {
    getAllAlmacenes,
    getAlmacenById,
    createAlmacen,
    updateAlmacen,
    deleteAlmacen,
};
