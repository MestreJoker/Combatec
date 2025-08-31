# Combatec

![Combatec Logo](images/logo.png)

O **Combatec** é um sistema de denúncias destinado a alunos da Etec de Guaianazes. O aplicativo permite que alunos registrem denúncias contra outros alunos, professores ou funcionários, sendo monitoradas pelo diretor. O objetivo é promover um ambiente escolar mais seguro e transparente.

## Funcionalidades

* **Cadastro e login** de alunos, administradores e diretores.
* **Registro de denúncias** por alunos contra colegas, professores ou funcionários.
* **Acompanhamento de denúncias** pelo diretor.
* **Menu e perfil do usuário** com foto personalizada.
* **Painel administrativo** para gestão de usuários e denúncias.
* **Sistema de estatísticas** mostrando número total de denúncias, denúncias respondidas, pendentes e por tipo de discriminação.
* **Validação de senhas** com critérios de segurança (mínimo 8 caracteres, incluindo letras e números).

## Tecnologias Utilizadas

* **Frontend:** React Native, Bootstrap, CSS, JavaScript
* **Backend:** PHP puro
* **Banco de Dados:** MySQL (XAMPP)
* **API:** Laravel (opcional)

## Estrutura do Projeto

```
Combatec/
│
├── backend/           # PHP e Laravel (API)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/          # React Native app
│   ├── components/
│   ├── screens/
│   ├── App.js
│   └── ...
│
├── database/          # Scripts de criação de banco de dados
│   └── combatec.sql
│
├── images/            # Imagens do projeto
│   └── user/user.png
│
└── README.md
```

## Instalação

### Requisitos

* PHP 7.x ou superior
* MySQL / MariaDB
* Node.js e npm
* Expo CLI (opcional)

### Passos

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/combatec.git
cd combatec
```

2. Configure o banco de dados:

* Abra o XAMPP e inicie Apache e MySQL.
* Crie um banco chamado `combatec`.
* Importe `database/combatec.sql`.

3. Configure o backend PHP/Laravel:

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure as credenciais do banco no .env
php artisan serve
```

4. Configure o frontend React Native:

```bash
cd frontend
npm install
expo start
```

5. Abra o aplicativo no emulador ou no celular usando Expo Go.

## Uso

1. Cadastre-se como aluno, administrador ou diretor.
2. Faça login com suas credenciais.
3. Alunos podem registrar denúncias.
4. Diretores podem visualizar todas as denúncias e estatísticas.
5. Usuários podem alterar a foto do perfil ou restaurar a padrão `user.png`.

## Estatísticas e Tipos de Denúncia

* Bullying
* Cyberbullying
* Racismo
* Gordofobia
* Homofobia
* Machismo
* Assédio
* Capacitismo
* Outros
