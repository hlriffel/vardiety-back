'use strict';
module.exports = (sequelize, DataTypes) => {
  const NutrientMeasureUnit = sequelize.define('NutrientMeasureUnit', {
    ds_measure_unit: DataTypes.STRING
  }, {});
  NutrientMeasureUnit.associate = function(models) {
    // associations can be defined here
  };
  return NutrientMeasureUnit;
};