'use strict';
module.exports = (sequelize, DataTypes) => {
  const InitialDietMealComp = sequelize.define('InitialDietMealComp', {
    id_initial_diet_meal: DataTypes.INTEGER,
    id_component: DataTypes.INTEGER,
    qt_grams: DataTypes.DOUBLE
  }, {});

  InitialDietMealComp.associate = function(models) {
    InitialDietMealComp.hasOne(models.InitialDietMeal, {
      foreignKey: 'id_initial_diet_meal',
      as: 'meal'
    });

    InitialDietMealComp.hasOne(models.Component, {
      foreignKey: 'id',
      as: 'component'
    });
  };
  return InitialDietMealComp;
};