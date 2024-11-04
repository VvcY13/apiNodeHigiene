'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Medidas', [
      {
        nombre: '45*60',
        largo: 45.00,
        ancho: 60.00,
        unidadesPorBolsa: 10,
        unidadesPorBolsones: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: '60*60',
        largo: 60.00,
        ancho: 60.00,
        unidadesPorBolsa: 10,
        unidadesPorBolsones: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: '90*60',
        largo: 90.00,
        ancho: 60.00,
        unidadesPorBolsa: 10,
        unidadesPorBolsones: 120,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Medidas', null, {});
  }
};
