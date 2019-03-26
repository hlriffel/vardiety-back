'use strict';
module.exports = (sequelize, DataTypes) => {
  const ComponentCategory = sequelize.define('ComponentCategory', {
    nm_category: DataTypes.STRING
  }, {});
  ComponentCategory.associate = function(models) {
    // associations can be defined here
  };
  return ComponentCategory;
};