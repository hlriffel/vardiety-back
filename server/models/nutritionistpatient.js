'use strict';
module.exports = (sequelize, DataTypes) => {
  const NutritionistPatient = sequelize.define('NutritionistPatient', {
    id_nutritionist: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_patient: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  NutritionistPatient.associate = function (models) {
    NutritionistPatient.belongsTo(models.User, {
      foreignKey: 'id_nutritionist',
      as: 'nutritionist'
    });
  
    NutritionistPatient.belongsTo(models.User, {
      foreignKey: 'id_patient',
      as: 'patient'
    });
  };

  return NutritionistPatient;
};