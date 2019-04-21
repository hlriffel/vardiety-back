'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Calendars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_initial_diet: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_nutritionist_patient: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_beginning: {
        type: Sequelize.DATE
      },
      dt_ending: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Calendars');
  }
};