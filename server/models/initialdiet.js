'use strict';
module.exports = (sequelize, DataTypes) => {
  const InitialDiet = sequelize.define('InitialDiet', {
    id_nutritionist_patient: DataTypes.INTEGER,
    id_period: DataTypes.STRING
  }, {});

  InitialDiet.associate = function(models) {
    InitialDiet.belongsTo(models.Period, {
      foreignKey: 'id_period',
      as: 'period'
    })
  };

  return InitialDiet;
};