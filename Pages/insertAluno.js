const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://user:password@localhost:3306/database_name'); // Substitua pelas suas credenciais

const Tbaluno = require('./models/tbaluno')(sequelize, DataTypes);

async function insertAluno() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincronizar o modelo com o banco de dados
    await sequelize.sync();

    // Inserir um novo aluno
    const aluno = await Tbaluno.create({
      nomeAluno: 'João Silva',
      emailAluno: 'joao.silva@example.com',
      senhaAluno: 'senha123',
      rmAluno: 123456,
      fotoAluno: 'foto.jpg',
      idTurma: 1 // Certifique-se de que o idTurma já existe
    });

    console.log('Aluno inserido:', aluno.toJSON());
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

insertAluno();
