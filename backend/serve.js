const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());

// Configuração do banco de dados SQL Server
const config = {
  user: 'seu_usuario',
  password: 'sua_senha',
  server: 'seu_servidor',
  database: 'seu_banco_de_dados',
  options: {
    encrypt: true, // Usar se estiver usando Azure
  },
};

// Endpoint para login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Por favor, preencha todos os campos.' });
  }

  try {
    // Conectar ao banco de dados
    await sql.connect(config);

    // Verificar credenciais
    const result = await sql.query`SELECT * FROM tbfuncionario WHERE email = ${email} AND senha = ${password}`;

    if (result.recordset.length > 0) {
      // Autenticação bem-sucedida
      res.json({ success: true, message: 'Login bem-sucedido.' });
    } else {
      // Credenciais inválidas
      res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
    }
  } catch (err) {
    // Erro ao conectar ou consultar o banco de dados
    console.error(err);
    res.status(500).json({ success: false, message: 'Erro ao tentar fazer login.' });
  } finally {
    // Fechar a conexão com o banco de dados
    sql.close();
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
