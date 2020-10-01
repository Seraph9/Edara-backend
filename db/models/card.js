'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    text: {
      type: DataTypes.TEXT
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Card.associate = function (models) {
    // associations can be defined here
    Card.belongsTo(models.List, { foreignKey: 'listId' });
  };
  return Card;
};