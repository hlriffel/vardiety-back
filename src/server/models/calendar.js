'use strict';
module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    id_initial_diet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_nutritionist_patient: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dt_beginning: DataTypes.DATE,
    dt_ending: DataTypes.DATE
  }, {});

  Calendar.associate = function(models) {
    Calendar.belongsTo(models.InitialDiet, {
      foreignKey: 'id_initial_diet',
      as: 'initialDiet'
    });

    Calendar.hasMany(models.CalendarDay, {
      foreignKey: 'id_calendar',
      as: 'days'
    });
  };

  return Calendar;
};