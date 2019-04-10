'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NutritionistPatients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_nutritionist: {
        type: Sequelize.INTEGER
      },
      id_patient: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  }, 
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NutritionistPatients');
  }, 
};