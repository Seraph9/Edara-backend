'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Cards = await queryInterface.bulkInsert('Cards', [
      {
        card: "Learn HTML",
        userId: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        card: "Hello World!",
        userId: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        card: "Learn CSS",
        userId: 1,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        card: "Learn JavaScript",
        userId: 1,
        listId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        card: "Welcome to Edara Project Management App",
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
    await queryInterface.bulkDelete("Cards", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
