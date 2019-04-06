'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nm_person: DataTypes.STRING,
    ds_email: DataTypes.STRING,
    ds_password: DataTypes.STRING,
    ds_salt: DataTypes.STRING,
    cn_user_type: DataTypes.STRING
  }, {});

  User.associate = function(models) {
    
  };

  return User;
};