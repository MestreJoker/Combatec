'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbfuncionario', {
      idFuncionario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nomeFuncionario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      funcaoFuncionario: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fotoFuncionario: {
        type: Sequelize.STRING,
        allowNull: true // Permite valores nulos se a foto não for obrigatória
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
    await queryInterface.dropTable('tbfuncionario');
  }
};
