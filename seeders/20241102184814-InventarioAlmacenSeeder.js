'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     // Definir los IDs de los almacenes
     const almacenPrincipalId = 1; // Almacen principal
     const almacenMaquinaId = 2; // Almacen de producción
 
     // Obtener los IDs de los insumos que ya se han insertado
     const insumos = await queryInterface.sequelize.query(
       'SELECT id FROM Insumos;'
     );
 
     const insumosIds = insumos[0].map(insumo => insumo.id);
 
     // Preparar los datos para insertar en InventarioAlmacen
     const inventarioData = [];
 
     // Insertar insumos en el almacen principal
     insumosIds.forEach(insumoId => {
       inventarioData.push({
         id_almacen: almacenPrincipalId,
         id_insumo: insumoId,
         cantidad: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria entre 1 y 100
         createdAt: new Date(),
         updatedAt: new Date(),
       });
     });
 
     // Insertar una cantidad inicial en el almacen de producción
     insumosIds.forEach(insumoId => {
       inventarioData.push({
         id_almacen: almacenMaquinaId,
         id_insumo: insumoId,
         cantidad: 0, // Iniciar en 0, se llenará mediante traspasos
         createdAt: new Date(),
         updatedAt: new Date(),
       });
     });
 
     // Insertar los datos en la tabla InventarioAlmacen
     await queryInterface.bulkInsert('InventarioAlmacens', inventarioData, {});
   },
 
   async down(queryInterface, Sequelize) {
     await queryInterface.bulkDelete('InventarioAlmacens', null, {});
   }
 };