'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbprofessor', {
      idProfessor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nomeProfessor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailProfessor: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senhaProfessor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rmProfessor: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fotoProfessor: {
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
    await queryInterface.dropTable('tbprofessor');
  }
};
