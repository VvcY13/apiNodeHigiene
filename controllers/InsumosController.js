const Insumos = require('../models/Insumos');

// Crear un nuevo insumo
exports.createInsumo = async (req, res) => {
    try {
        const insumo = await Insumos.create(req.body);
        res.status(201).json(insumo);
    } catch (error) {
        console.error('Error al crear insumo:', error); 
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los insumos
exports.getAllInsumos = async (req, res) => {
    try {
        const insumos = await Insumos.findAll();
        res.status(200).json(insumos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un insumo por ID
exports.getInsumoById = async (req, res) => {
    try {
        const insumo = await Insumos.findByPk(req.params.id);
        if (!insumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json(insumo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un insumo
exports.updateInsumo = async (req, res) => {
    try {
        const [updated] = await Insumos.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        const updatedInsumo = await Insumos.findByPk(req.params.id);
        res.status(200).json(updatedInsumo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un insumo
exports.deleteInsumo = async (req, res) => {
    try {
        const deleted = await Insumos.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};