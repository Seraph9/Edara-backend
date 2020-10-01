'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.belongsTo(models.User, { foreignKey: 'userId' });
    List.hasMany(models.Note, { foreignKey: 'listId' })
  };
  return List;
};