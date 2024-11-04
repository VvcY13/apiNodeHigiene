const ProduccionProductosMedidas = require('../models/ProduccionProductosMedidas');
const StockGeneral = require('../models/StockGeneral');
const Products = require('../models/Products');
const Medidas = require('../models/Medidas');

exports.registrarProduccion = async (req, res) => {
    const { productoId, medidaId, cantidad } = req.body;

    console.log('Solicitud POST a /registrarproduccion recibida:', req.body);
    console.log('Datos recibidos:', req.body); // Verificar los datos recibidos

    // Validar que todos los datos requeridos estén presentes
    if (!productoId || !medidaId || !cantidad) {
        return res.status(400).json({ error: 'Faltan datos requeridos para registrar la producción' });
    }

    try {
        // Registrar la nueva producción
        await ProduccionProductosMedidas.create({
            productoId,
            medidaId,
            cantidad,
        });

        // Buscar si ya existe un registro en el stock general para este producto y medida
        const stock = await StockGeneral.findOne({
            where: { productoId, medidaId },
        });

        if (stock) {
            // Convertir cantidadTotal a número antes de sumar
            stock.cantidadTotal = Number(stock.cantidadTotal) + Number(cantidad);
            await stock.save();
        } else {
            // Si no existe, crear el registro en el stock general con la cantidad inicial
            await StockGeneral.create({
                productoId,
                medidaId,
                cantidadTotal: Number(cantidad),
            });
        }

        res.status(201).json({ message: 'Producción registrada y stock actualizado correctamente' });
    } catch (error) {
        console.error('Error en registrar producción:', error); // Imprimir el error completo
        res.status(400).json({ error: 'Error al registrar la producción y actualizar el stock' });
    }
};
  // Obtener todos los registros de producción
/*exports.getAllProducciones = async (req, res) => {
    try {
        const producciones = await ProduccionProductosMedidas.findAll();
        res.status(200).json(producciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/

exports.getAllProducciones = async (req, res) => {
  try {
      const producciones = await ProduccionProductosMedidas.findAll({
          include: [
              {
                  model: Products,
                  attributes: ['id', 'nombre'], // Asegúrate de que 'nombre' sea el campo correcto en tu modelo
              },
              {
                  model: Medidas,
                  attributes: ['id', 'nombre'], // Asegúrate de que 'nombreMedida' sea el campo correcto en tu modelo
              },
          ],
      });
      res.status(200).json(producciones);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Obtener un registro de producción por ID
exports.getProduccionById = async (req, res) => {
    const { id } = req.params;
    try {
        const produccion = await ProduccionProductosMedidas.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ message: 'Producción no encontrada' });
        }
        res.status(200).json(produccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un registro de producción
exports.updateProduccion = async (req, res) => {
    const { id } = req.params;
    const { productoId, medidaId, cantidad } = req.body;

    try {
        const produccion = await ProduccionProductosMedidas.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ message: 'Producción no encontrada' });
        }

        // Actualizar los campos del registro de producción
        produccion.productoId = productoId;
        produccion.medidaId = medidaId;
        produccion.cantidad = cantidad;

        await produccion.save();
        res.status(200).json({ message: 'Producción actualizada exitosamente', produccion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un registro de producción
exports.deleteProduccion = async (req, res) => {
    const { id } = req.params;
    try {
        const produccion = await ProduccionProductosMedidas.findByPk(id);
        if (!produccion) {
            return res.status(404).json({ message: 'Producción no encontrada' });
        }

        await produccion.destroy();
        res.status(200).json({ message: 'Producción eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};