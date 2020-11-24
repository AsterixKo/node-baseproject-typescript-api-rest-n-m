'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   

    return queryInterface.addColumn(
      'books', // table name where will create the new field
      'authorId',   
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'authors', // a que tabla conecta
          key: 'id'       // con que campo de esa tabla conecta
        },
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'books',
      'authorId'
    )
  }
};