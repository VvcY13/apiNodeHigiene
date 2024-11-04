const RegistroTurnos = require('../models/RegistroTurnos');
const DetallesTurnos = require('../models/DetallesTurnos');
const Insumos = require('../models/Insumos');

exports.create = async (req, res) => {
    const { insumos } = req.body;

    try {
        // Crear un registro en RegistroTurnos
        const nuevoTurno = await RegistroTurnos.create({});

        // Crear registros en DetallesTurnos para cada insumo
        const detalles = insumos.map((insumo) => ({
            id_turno: nuevoTurno.id,
            id_insumo: insumo.id_insumo,
            cantidad_inicial: insumo.cantidad_inicial,
            cantidad_final: insumo.cantidad_final,
        }));

        await DetallesTurnos.bulkCreate(detalles);

        return res.status(201).json({ 
            turno: nuevoTurno, 
            detalles 
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al registrar el turno', error });
    }
};

exports.findAll = async (req, res) => {
    try {
        const turnos = await RegistroTurnos.findAll({
            include: [
                {
                    model: DetallesTurnos,
                    include: [
                        {
                            model: Insumos,
                            attributes: ['id', 'nombre'], // Asegúrate de que el atributo sea 'nombre'
                        }
                    ]
                }
            ],
        });

        return res.status(200).json(turnos);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los registros de turnos', error });
    }
};
