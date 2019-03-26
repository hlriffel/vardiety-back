'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComponentNutrient = sequelize.define('ComponentNutrient', {
    id_component: DataTypes.INTEGER,
    id_nutrient: DataTypes.INTEGER,
    qt_nutrient: DataTypes.DOUBLE
  }, {});

  ComponentNutrient.associate = function(models) {
    // associations can be defined here
  };

  return ComponentNutrient;
};