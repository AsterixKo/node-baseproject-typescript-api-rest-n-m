'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    /*
        passports.userID = users.id
     */

    return queryInterface.addColumn(
      'passports', // table name where will create the new field
      'userId',   
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // a que tabla conecta
          key: 'id'       // con que campo de esa tabla conecta
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'passports',
      'userId'
    )
  }
};
