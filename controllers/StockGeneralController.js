// src/controllers/StockGeneralController.js
const StockGeneral = require('../models/StockGeneral');
const Products = require('../models/Products');
const Medidas = require('../models/Medidas');

// Obtener todos los registros de stock general
const getAllStockGeneral = async (req, res) => {
    try {
        const stockGeneral = await StockGeneral.findAll({
            include: [
                {
                    model: Products,
                    as: 'producto', // Agrega el alias aquí
                    attributes: ['id', 'nombre'], // Ajusta los atributos según tu modelo
                },
                {
                    model: Medidas,
                    as: 'medida', // Agrega el alias aquí si es necesario
                    attributes: ['id', 'nombre', 'unidadesPorBolsa', 'unidadesPorBolsones'], // Ajusta los atributos según tu modelo
                },
            ],
        });
        res.status(200).json(stockGeneral);
    } catch (error) {
        console.error(error); // Agrega esto para ver el error completo en la consola
        res.status(500).json({ message: 'Error al obtener el stock general', error });
    }
};
// Obtener un registro de stock general por ID
const getStockGeneralById = async (req, res) => {
    const { id } = req.params;
    try {
        const stock = await StockGeneral.findByPk(id, {
            include: [
                {
                    model: Products,
                    attributes: ['id', 'nombre'], // Ajusta los atributos según tu modelo
                },
                {
                    model: Medidas,
                    attributes: ['id', 'nombre', 'unidadesPorBolsa', 'unidadesPorBolsones'], // Ajusta los atributos según tu modelo
                },
            ],
        });
        if (stock) {
            res.status(200).json(stock);
        } else {
            res.status(404).json({ message: 'Stock no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el stock', error });
    }
};

// Crear un nuevo registro de stock general
const createStockGeneral = async (req, res) => {
    const { productoId, medidaId, cantidadTotal } = req.body;
    try {
        const nuevoStock = await StockGeneral.create({ productoId, medidaId, cantidadTotal });
        res.status(201).json(nuevoStock);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el stock general', error });
    }
};

// Actualizar un registro de stock general
const updateStockGeneral = async (req, res) => {
    const { id } = req.params;
    const { productoId, medidaId, cantidadTotal } = req.body;
    try {
        const [updated] = await StockGeneral.update({ productoId, medidaId, cantidadTotal }, { where: { id } });
        if (updated) {
            const updatedStock = await StockGeneral.findByPk(id);
            res.status(200).json(updatedStock);
        } else {
            res.status(404).json({ message: 'Stock no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el stock general', error });
    }
};

// Eliminar un registro de stock general
const deleteStockGeneral = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await StockGeneral.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Stock no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el stock general', error });
    }
};

module.exports = {
    getAllStockGeneral,
    getStockGeneralById,
    createStockGeneral,
    updateStockGeneral,
    deleteStockGeneral,
};