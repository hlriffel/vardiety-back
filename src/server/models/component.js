'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('Component', {
    id_category: DataTypes.INTEGER,
    nm_component: DataTypes.STRING
  }, {});

  Component.associate = function(models) {
    Component.belongsTo(models.ComponentCategory, {
      foreignKey: 'id_category',
      as: 'category'
    });
  };

  return Component;
};