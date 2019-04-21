'use strict';
module.exports = (sequelize, DataTypes) => {
  const CalendarDayMealComp = sequelize.define('CalendarDayMealComp', {
    id_calendar_day_meal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_component: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qt_grams: DataTypes.DOUBLE
  }, {});
  
  CalendarDayMealComp.associate = function(models) {
    CalendarDayMealComp.belongsTo(models.CalendarDayMeal, {
      foreignKey: 'id_calendar_day_meal',
      as: 'calendarDayMeal'
    });

    CalendarDayMealComp.belongsTo(models.Component, {
      foreignKey: 'id_component',
      as: 'component'
    });
  };

  return CalendarDayMealComp;
};