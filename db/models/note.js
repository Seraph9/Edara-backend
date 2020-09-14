'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Note.associate = function (models) {
    // associations can be defined here
    Note.belongsTo(models.List, { foreignKey: 'listId' });
    Note.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Note;
};