'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};