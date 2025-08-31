'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbaluno', {
      idAluno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nomeAluno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailAluno: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      senhaAluno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rmAluno: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fotoAluno: {
        type: Sequelize.STRING,
        allowNull: true // Permite valores nulos se a foto não for obrigatória
      },
      idTurma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbturma', // Nome da tabela de Turma
          key: 'idTurma' // Chave primária da tabela de Turma
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
    await queryInterface.dropTable('tbaluno');
  }
};
