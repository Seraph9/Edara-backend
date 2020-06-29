'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    note: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER
  }, {});
  Note.associate = function(models) {
    // associations can be defined here
  };
  return Note;
};