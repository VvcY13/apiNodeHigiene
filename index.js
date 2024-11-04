require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./config/configDatabase');

const { Almacenes, Insumos, InventarioAlmacen, Salidas,
    SalidasDetalles,
    StockGeneral, Products,
    Medidas,} = require('./asociaciones.js/asociaciones');


//modelos
const User = require('./models/User');
//const Products = require('./models/Products');
//const Medidas = require('./models/Medidas');
//const Insumos = require('./models/Insumos');
//const Salidas = require('./models/Salidas');
//const Almacenes = require('./models/Almacenes');
const ProductosMedidas = require('./models/ProductosMedidas');
const ProduccionProductosMedidas = require('./models/ProduccionProductosMedidas');
//const StockGeneral = require('./models/StockGeneral');
//const InventarioAlmacen = require('./models/InventarioAlmacen');
const DetallesTurnos = require('./models/DetallesTurnos');
const RegistroTurnos = require('./models/RegistroTurnos');
//rutas
const userRoutes = require('./routes/userRoutes');
const insumosRoutes = require('./routes/insumosRoutes');
const medidasRoutes = require('./routes/medidasRoutes');
const productsRoutes = require('./routes/productsRoutes');
const salidasRoutes = require('./routes/salidasRoutes');
const authRoutes = require('./routes/authRoutes');
const productosMedidasRoutes = require('./routes/productosMedidasRoutes');
const traspasosRoutes = require('./routes/traspasosRoutes');
const produccionRoutes = require('./routes/produccionRoutes');
const almacenesRoutes = require('./routes/almacenesRoutes');
const stockGeneralRoutes = require('./routes/stockGeneralRoutes');
const inventarioAlmacenRoutes = require('./routes/inventarioAlmacenRoutes');
const turnosRoutes = require('./routes/turnosRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors());
app.use(express.json());

//usar las rutas del usuario
app.use('/api/users', userRoutes);
app.use('/api/insumos', insumosRoutes);
app.use('/api/medidas', medidasRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/salidas', salidasRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productosMedidas', productosMedidasRoutes);
app.use('/api/traspasos', traspasosRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api/almacenes', almacenesRoutes);
app.use('/api/stockGeneral', stockGeneralRoutes);
app.use('/api/inventarioAlmacen',inventarioAlmacenRoutes);
app.use('/api/turnos', turnosRoutes);


// Sincroniza la base de datos
sequelize.sync({force:true}) // Cambia 'alter' a 'force: true' si quieres eliminar y volver a crear tablas
    .then(() => {
        console.log('Base de datos sincronizada.');
        
        // Inicia el servidor después de sincronizar
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar la base de datos:', err);
    });

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API con Sequelize y SQL Server!');
  });
  
 