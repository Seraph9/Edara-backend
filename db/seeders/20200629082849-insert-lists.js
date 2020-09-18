'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const notes = await queryInterface.bulkInsert('Notes', [
      {
        note: "Learn HTML",
        userId: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Hello World!",
        userId: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Learn CSS",
        userId: 1,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Learn JavaScript",
        userId: 1,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        note: "Welcome to Edara Project Management App",
        userId: 1,
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Notes", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
