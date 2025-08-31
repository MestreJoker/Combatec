'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbdiretor', {
      idDiretor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      emailDiretor: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senhaDiretor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fotoDiretor: {
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
    await queryInterface.dropTable('tbdiretor');
  }
};
