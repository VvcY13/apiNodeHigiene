'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Almacenes', [
      {
        nombre: 'almacen principal',
        descripcion: 'Almacen de stock general',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'almacen maquina',
        descripcion: 'Almacen de producción',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Almacenes', null, {});
  }
};
