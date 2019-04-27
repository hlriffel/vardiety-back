'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComponentNutrient = sequelize.define('ComponentNutrient', {
    id_component: DataTypes.INTEGER,
    id_nutrient: DataTypes.INTEGER,
    qt_nutrient: DataTypes.DOUBLE
  }, {});

  ComponentNutrient.associate = function(models) {
    ComponentNutrient.belongsTo(models.Component, {
      foreignKey: 'id_component',
      targetKey: 'id',
      as: 'component'
    });

    ComponentNutrient.belongsTo(models.Nutrient, {
      foreignKey: 'id_nutrient',
      targetKey: 'id',
      as: 'nutrient'
    });
  };

  return ComponentNutrient;
};