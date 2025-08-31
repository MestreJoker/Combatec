'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbturma', {
      idTurma: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nomeTurma: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idPeriodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbperiodo', // Nome da tabela de Periodo
          key: 'idPeriodo' // Chave primária da tabela de Periodo
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tbturma');
  }
};
