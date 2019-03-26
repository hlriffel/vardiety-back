'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nutrient = sequelize.define('Nutrient', {
    id_measure_unit: DataTypes.INTEGER,
    ds_nutrient: DataTypes.STRING
  }, {});

  Nutrient.associate = function(models) {
    Nutrient.hasOne(models.NutrientMeasureUnit, {
      foreignKey: 'id_measure_unit',
      as: 'measureUnit'
    });

    Nutrient.belongsToMany(models.Component, {
      through: 'ComponentNutrient',
      as: 'components',
      foreignKey: 'id_nutrient'
    });
  };

  return Nutrient;
};