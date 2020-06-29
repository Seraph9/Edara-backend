'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const channels = await queryInterface.bulkInsert('Lists', [
      {
        userId: 2,
        title: 'Monday: Task #1:',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Tuesday: Task #1:',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        title: 'Wednesday: Task #1:',
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

  down: (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Lists", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
