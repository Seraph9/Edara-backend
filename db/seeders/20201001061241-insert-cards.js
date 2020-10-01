'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cards = await queryInterface.bulkInsert('Cards', [
      {
        text: 'Learn HTML',
        listId: 13, // make sure in postbird that this id matches the list's id
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Hello World!',
        listId: 13,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Learn CSS',
        listId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Learn JavaScript',
        listId: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: 'Welcome to Edara Project Management App',
        listId: 15,
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
    await queryInterface.bulkDelete('Cards', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
