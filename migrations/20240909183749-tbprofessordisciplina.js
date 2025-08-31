'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tbprofessordisciplina', {
      idProfessorDisciplina: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      idProfessor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbprofessor', // Nome da tabela de Professor
          key: 'idProfessor' // Chave primária da tabela de Professor
        },
        onDelete: 'CASCADE' // Remove registros associados se um professor for excluído
      },
      idDisciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbdisciplina', // Nome da tabela de Disciplina
          key: 'idDisciplina' // Chave primária da tabela de Disciplina
        },
        onDelete: 'CASCADE' // Remove registros associados se uma disciplina for excluída
      },
      idTurma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbturma', // Nome da tabela de Turma
          key: 'idTurma' // Chave primária da tabela de Turma
        },
        onDelete: 'CASCADE' // Remove registros associados se uma turma for excluída
      },
      idPeriodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tbperiodo', // Nome da tabela de Periodo
          key: 'idPeriodo' // Chave primária da tabela de Periodo
        },
        onDelete: 'CASCADE' // Remove registros associados se um período for excluído
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
    await queryInterface.dropTable('tbprofessordisciplina');
  }
};
