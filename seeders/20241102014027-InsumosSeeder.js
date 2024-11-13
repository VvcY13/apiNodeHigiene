'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Insumos', [
      {
        nombre: 'CELULOSA',
        tipo: 'ROLLO',
        unidadMedida: 'metros',
        diametroInterno: 10.00,        
        diametroExterno: 122.00,      
        espesorTela: 0.2,              
        pesoStandar: 25.00,            
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HIDROFILICO',
        tipo: 'ROLLO',
        unidadMedida: 'metros',
        diametroInterno: 8.00,
        diametroExterno: 61.00,
        espesorTela: 0.15,
        pesoStandar: 15.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HIDROFOBICO',
        tipo: 'ROLLO',
        unidadMedida: 'metros',
        diametroInterno: 9.00,
        diametroExterno: 69.00,
        espesorTela: 0.18,
        pesoStandar: 18.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'POLIETILENO',
        tipo: 'ROLLO',
        unidadMedida: 'metros',
        diametroInterno: 7.00,
        diametroExterno: 55.00,
        espesorTela: 0.12,
        pesoStandar: 12.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'TISSUE',
        tipo: 'ROLLO',
        unidadMedida: 'metros',
        diametroInterno: 6.50,
        diametroExterno: 58.00,
        espesorTela: 0.14,
        pesoStandar: 10.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'HOTMELT',
        tipo: 'CAJA',
        unidadMedida: 'unidades',
        pesoStandar: 20.00,         
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'SAP',
        tipo: 'POLVO',
        unidadMedida: 'kilos',
        pesoPorBolsa: 700.00,        
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Insumos', null, {});
  
  }
};
