'use strict';
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('users', [
      {
        name: 'Jose',
        lastName: 'Benitez',
        email: 'jose.benitez@ce.ucn.cl',
        password: bcrypt.hashSync('jbenitez123', salt),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('users', null, {});
  }
};
