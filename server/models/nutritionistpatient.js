'use strict';
module.exports = (sequelize, DataTypes) => {
  const NutritionistPatients = sequelize.define('NutritionistPatients', {
    id_nutritionist: DataTypes.INTEGER,
    id_patient: DataTypes.INTEGER
  }, {});
  NutritionistPatients.associate = function (models) {
    NutritionistPatients.belongsTo(models.User, {
      foreignKey: 'id_nutritionist',
      as: 'nutritionist'
    });
    NutritionistPatients.belongsTo(models.User, {
      foreignKey: 'id_patient',
      as: 'patient'
    });
  };
  return NutritionistPatients;
};