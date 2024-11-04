'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Insumos', [
      {
        nombre: 'CELULOSA',
        tipo: 'DIAMETRO',
        diametroStandar: 122.00,
        pesoStandar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HIDROFILICO',
        tipo: 'DIAMETRO',
        diametroStandar: 61.00,
        pesoStandar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HIDROFOBICO',
        tipo: 'DIAMETRO',
        diametroStandar: 69.00,
        pesoStandar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'POLIETILENO',
        tipo: 'DIAMETRO',
        diametroStandar: 55.00,
        pesoStandar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'TISSUE',
        tipo: 'DIAMETRO',
        diametroStandar: 58.00,
        pesoStandar: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HOTMELT',
        tipo: 'KILO',
        diametroStandar: 0,
        pesoStandar: 20.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'SAP',
        tipo: 'KILO',
        diametroStandar: 0,
        pesoStandar: 700.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Insumos', null, {});
  
  }
};
