const { Op } = require('sequelize');
const Traspasos = require('../models/Traspasos');
const InventarioAlmacen = require('../models/InventarioAlmacen');
const sequelize = require('../config/configDatabase');

exports.createTraspaso = async (req, res) => {
    const { id_insumo, cantidad, origen_almacen, destino_almacen } = req.body;

    const transaction = await sequelize.transaction();
    try {
        // Validar inventario en el almacén de origen
        const inventarioOrigen = await InventarioAlmacen.findOne({
            where: { id_almacen: origen_almacen, id_insumo },
            transaction,
        });

        if (!inventarioOrigen || inventarioOrigen.cantidad < cantidad) {
            return res.status(400).json({ message: 'Inventario insuficiente en almacén de origen' });
        }

        // Realizar el traspaso: actualizar inventarios
        inventarioOrigen.cantidad -= cantidad;
        await inventarioOrigen.save({ transaction });

        const inventarioDestino = await InventarioAlmacen.findOne({
            where: { id_almacen: destino_almacen, id_insumo },
            transaction,
        });

        if (inventarioDestino) {
            inventarioDestino.cantidad += cantidad;
            await inventarioDestino.save({ transaction });
        } else {
            await InventarioAlmacen.create({
                id_almacen: destino_almacen,
                id_insumo,
                cantidad,
            }, { transaction });
        }

        // Registrar el traspaso
        const traspaso = await Traspasos.create({ id_insumo, cantidad, origen_almacen, destino_almacen }, { transaction });
        
        // Confirmar la transacción
        await transaction.commit();
        res.status(201).json({ message: 'Traspaso registrado exitosamente', traspaso });
    } catch (error) {
        await transaction.rollback(); // Revertir cambios en caso de error
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los traspasos
exports.getAllTraspasos = async (req, res) => {
    try {
        const traspasos = await Traspasos.findAll();
        res.status(200).json(traspasos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un traspaso por ID
exports.getTraspasoById = async (req, res) => {
    const { id } = req.params;
    try {
        const traspaso = await Traspasos.findByPk(id);
        if (!traspaso) {
            return res.status(404).json({ message: 'Traspaso no encontrado' });
        }
        res.status(200).json(traspaso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un traspaso
exports.updateTraspaso = async (req, res) => {
    const { id } = req.params;
    const { id_insumo, cantidad, origen_almacen, destino_almacen } = req.body;

    try {
        const traspaso = await Traspasos.findByPk(id);
        if (!traspaso) {
            return res.status(404).json({ message: 'Traspaso no encontrado' });
        }

        // Actualizar los campos del traspaso
        traspaso.id_insumo = id_insumo;
        traspaso.cantidad = cantidad;
        traspaso.origen_almacen = origen_almacen;
        traspaso.destino_almacen = destino_almacen;

        await traspaso.save();
        res.status(200).json({ message: 'Traspaso actualizado exitosamente', traspaso });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un traspaso
exports.deleteTraspaso = async (req, res) => {
    const { id } = req.params;
    try {
        const traspaso = await Traspasos.findByPk(id);
        if (!traspaso) {
            return res.status(404).json({ message: 'Traspaso no encontrado' });
        }

        await traspaso.destroy();
        res.status(200).json({ message: 'Traspaso eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
