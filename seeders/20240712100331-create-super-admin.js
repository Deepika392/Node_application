'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert a super admin record into your 'Users' table
    await queryInterface.bulkInsert('Users', [{
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      role: 'SUPERADMIN', 
      firstName:'Super',
      lastName:'Admin',
 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

};
