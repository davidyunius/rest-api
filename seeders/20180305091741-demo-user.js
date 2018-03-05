'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        name: 'Gustaf',
        email: 'gustaf@mail.com',
        password: '2jk45h982jf0i',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Kevin',
        email: 'kevin@mail.com',
        password: '823h92uh29',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Agny',
        email: 'agny@mail.com',
        password: 'jr893hr923h1',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Dennis',
        email: 'dennis@mail.com',
        password: '3289rh8yby17',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
