'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert a super admin record into your 'Users' table
    await queryInterface.bulkInsert('Users', [{
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      password: '$2b$10$vj.qCH6jo4rbQ2d7JV2Z9uqC6j6yvyGBwPMUwtaZ2jk82vxfim2LG', // Honey@1313
      firstName:'Super',
      lastName:'Admin',
      roleId:1,
 
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

};
