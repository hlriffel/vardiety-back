'use strict';
module.exports = (sequelize, DataTypes) => {
  const CalendarDay = sequelize.define('CalendarDay', {
    id_calendar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dt_day: DataTypes.DATE
  }, {});

  CalendarDay.associate = function(models) {
    CalendarDay.belongsTo(models.Calendar, {
      foreignKey: 'id_calendar',
      as: 'calendar'
    });

    CalendarDay.hasMany(models.CalendarDayMeal, {
      foreignKey: 'id_calendar_day',
      as: 'meals'
    });
  };

  return CalendarDay;
};