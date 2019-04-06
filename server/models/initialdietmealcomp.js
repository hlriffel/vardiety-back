'use strict';
module.exports = (sequelize, DataTypes) => {
  const InitialDietMealComp = sequelize.define('InitialDietMealComp', {
    id_initial_diet_meal: DataTypes.INTEGER,
    id_component: DataTypes.INTEGER,
    qt_grams: DataTypes.DOUBLE
  }, {});

  InitialDietMealComp.associate = function(models) {
    InitialDietMealComp.belongsTo(models.InitialDietMeal, {
      foreignKey: 'id_initial_diet_meal',
      as: 'meal'
    });

    InitialDietMealComp.belongsTo(models.Component, {
      foreignKey: 'id_component',
      targetKey: 'id',
      as: 'component'
    });
  };
  return InitialDietMealComp;
};