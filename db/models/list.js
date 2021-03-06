'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {});
  List.associate = function (models) {
    // associations can be defined here
    List.belongsTo(models.User, { foreignKey: 'userId' });
    List.hasMany(models.Card, { foreignKey: 'listId' })
  };
  return List;
};