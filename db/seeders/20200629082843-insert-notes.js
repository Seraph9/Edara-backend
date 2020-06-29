'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Notes', [
      {
        note: "Learn HTML",
        userId: 2,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Hello World!",
        userId: 2,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Learn CSS",
        userId: 2,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Learn JavaScript",
        userId: 2,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Welcome to Edara Project Management App",
        userId: 2,
        listId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Notes", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
