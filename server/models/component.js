'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    id_category: DataTypes.INTEGER,
    nm_component: DataTypes.STRING
  }, {});

  Component.associate = function(models) {
    Component.hasOne(models.ComponentCategory, {
      foreignKey: 'id_category',
      as: 'category'
    });

    Component.belongsToMany(models.Nutrient, {
      through: 'ComponentNutrient',
      as: 'nutrients',
      foreignKey: 'id_component'
    });
  };

  return Component;
};