
const Medidas = require('../models/Medidas');

// Crear una nueva medida
exports.createMedida = async (req, res) => {
    try {
        const medida = await Medidas.create(req.body);
        res.status(201).json(medida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las medidas
exports.getAllMedidas = async (req, res) => {
    try {
        const medidas = await Medidas.findAll();
        res.status(200).json(medidas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una medida por ID
exports.getMedidaById = async (req, res) => {
    try {
        const medida = await Medidas.findByPk(req.params.id);
        if (!medida) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }
        res.status(200).json(medida);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una medida
exports.updateMedida = async (req, res) => {
    try {
        const [updated] = await Medidas.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }
        const updatedMedida = await Medidas.findByPk(req.params.id);
        res.status(200).json(updatedMedida);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una medida
exports.deleteMedida = async (req, res) => {
    try {
        const deleted = await Medidas.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Medida no encontrada' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};