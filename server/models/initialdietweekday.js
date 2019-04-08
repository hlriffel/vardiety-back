'use strict';
module.exports = (sequelize, DataTypes) => {
  const InitialDietWeekDay = sequelize.define('InitialDietWeekDay', {
    id_initial_diet: DataTypes.INTEGER,
    cn_week_day: DataTypes.STRING
  }, {});

  InitialDietWeekDay.associate = function(models) {
    InitialDietWeekDay.belongsTo(models.InitialDiet, {
      foreignKey: 'id_initial_diet',
      as: 'weekDay'
    })
  };

  return InitialDietWeekDay;
};