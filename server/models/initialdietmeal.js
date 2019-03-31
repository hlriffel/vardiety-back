'use strict';
module.exports = (sequelize, DataTypes) => {
  const InitialDietMeal = sequelize.define('InitialDietMeal', {
    id_initial_diet: DataTypes.INTEGER,
    ds_meal: DataTypes.STRING
  }, {});
  InitialDietMeal.associate = function(models) {
    // associations can be defined here
  };
  return InitialDietMeal;
};