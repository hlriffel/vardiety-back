'use strict';
module.exports = (sequelize, DataTypes) => {
  const CalendarDayMeal = sequelize.define('CalendarDayMeal', {
    id_calendar_day: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ds_meal: DataTypes.STRING
  }, {});

  CalendarDayMeal.associate = function(models) {
    CalendarDayMeal.belongsTo(models.CalendarDay, {
      foreignKey: 'id_calendar_day',
      as: 'calendarDay'
    });

    CalendarDayMeal.hasMany(models.CalendarDayMealComp, {
      foreignKey: 'id_calendar_day_meal',
      as: 'components'
    });
  };

  return CalendarDayMeal;
};