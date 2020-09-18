'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const lists = await queryInterface.bulkInsert('Lists', [
      {
        userId: 1,
        title: 'Monday Tasks:',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Tuesday Tasks:',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1,
        title: 'Wednesday Tasks:',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
      { returning: true }
    );
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        title: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lists", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};