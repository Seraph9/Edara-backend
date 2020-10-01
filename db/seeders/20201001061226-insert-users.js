'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const users = await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        fullName: 'Abdullah Wafy',
        email: 'aw@aw.com',
        hashedPassword: bcrypt.hashSync('aw', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        fullName: 'Demo User',
        email: 'demo@demo.com',
        hashedPassword: bcrypt.hashSync('demo', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        fullName: 'Wolverine',
        email: 'james@logan.com',
        hashedPassword: bcrypt.hashSync('Wolverine1$', 10),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
