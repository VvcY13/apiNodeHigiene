// src/controllers/SalidasController.js
const Salidas = require('../models/Salidas');
const SalidaDetalles = require('../models/SalidasDetalles'); // Asegúrate de que este nombre sea correcto
const StockGeneral = require('../models/StockGeneral');
const sequelize = require('../config/configDatabase');

// Registrar una nueva salida
const createSalida = async (req, res) => {
    const { nroGuia, productos } = req.body;
    console.log('Solicitud POST a /registrarproduccion recibida:', req.body);
    console.log('Datos recibidos:', req.body); // Verificar los datos recibidos
    // Validar nroGuia
    if (!nroGuia || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: 'Datos de entrada inválidos' });
    }

    // Validar productos
    for (const producto of productos) {
        if (!producto.stockGeneralId || !producto.cantidad || producto.cantidad <= 0) {
            return res.status(400).json({ message: 'Datos de productos inválidos' });
        }
    }

    const transaction = await sequelize.transaction();
    try {
        // Crear la salida
        const nuevaSalida = await Salidas.create({ nroGuia }, { transaction });

        // Registrar los detalles de la salida
        for (const producto of productos) {
            const { stockGeneralId, cantidad } = producto;

            // Crear detalle de la salida
            await SalidaDetalles.create({
                salidaId: nuevaSalida.id,
                stockGeneralId,
                cantidad,
            }, { transaction });

            // Reducir el stock general
            const stock = await StockGeneral.findByPk(stockGeneralId);
            if (stock && stock.cantidadTotal >= cantidad) {
                stock.cantidadTotal -= cantidad;
                await stock.save({ transaction });
            } else {
                // Si no hay suficiente stock
                await transaction.rollback();
                return res.status(400).json({ message: `No hay suficiente stock para el producto con ID ${stockGeneralId}` });
            }
        }

        await transaction.commit();
        res.status(201).json(nuevaSalida);
    } catch (error) {
        await transaction.rollback();
    console.error('Error al registrar la salida:', error); // Cambiar a console.error para registrar errores
    res.status(500).json({ message: 'Error al registrar la salida', error: error.message }); // Enviar solo el mensaje de error
    }
};

// Obtener todas las salidas
const getAllSalidas = async (req, res) => {
    try {
        const salidas = await Salidas.findAll({
            include: [{ model: SalidaDetalles }] // Asegúrate de que el modelo está correctamente referenciado
        });
        res.json(salidas);
    } catch (error) {
        console.error("Error al obtener salidas:", error);
        res.status(500).json({ message: "Error al obtener las salidas", error });
    }
};

module.exports = {
    createSalida,
    getAllSalidas,
};