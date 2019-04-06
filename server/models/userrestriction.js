'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserRestriction = sequelize.define('UserRestriction', {
    id_user: DataTypes.INTEGER,
    id_component: DataTypes.INTEGER
  }, {});

  UserRestriction.associate = function(models) {
    UserRestriction.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user'
    });

    UserRestriction.belongsTo(models.Component, {
      foreignKey: 'id_component',
      as: 'component'
    });
  };

  return UserRestriction;
};