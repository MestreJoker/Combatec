# Combatec

<img width="200" height="200" alt="Icon-Combatec" src="https://github.com/user-attachments/assets/84e51297-04bb-456c-99c6-bc4cee92aa9c" />


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


<h3>Principais páginas</h3>
<br>
<h4>Páginas do Aluno:</h4>
<img width="257" height="457" alt="image" src="https://github.com/user-attachments/assets/8fdc1afb-9bbc-496c-bfb0-8f5c8974c563" />
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/26cf2d96-26ca-4dee-9518-5eb7bdf92431" />
<img width="263" height="468" alt="image" src="https://github.com/user-attachments/assets/64d9e3dd-d7fa-44e6-92d7-0ba85fcfc5cf" />
<img width="258" height="457" alt="image" src="https://github.com/user-attachments/assets/e6e63f0d-a9d5-4ca8-ae46-7f2f42b59154" />
<br><br>
<h4>Página do Diretor:</h4>
<img width="256" height="456" alt="image" src="https://github.com/user-attachments/assets/459ca44b-b463-4e5c-9b1b-f6a94ef129c0" />
<br><br>
<h4>Páginas do Administrador:</h4>
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/6f18e37b-119f-40e5-bf67-2fc1b03008d0" />
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/6ea497b9-4f10-4065-8a55-58109b165624" />
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/561b98b5-3256-4180-a7bc-9e12c5385a93" />
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/652950fe-40c6-4d12-87da-32bab14a5a44" />
<img width="257" height="455" alt="image" src="https://github.com/user-attachments/assets/fb2fe644-3e07-4a75-b1d2-2eca92c1e315" />
<br><br><br>
# Autores do Projeto

O **Combatec** foi desenvolvido por este grupo de estudantes da Etec de Guaianases (Grupo **Godev**):
* Gabriel dos Santos Gomes
* Erick Santos de Britto
* Everton Barbosa Sobrinho
* Guilherme Lobório Zaramella
* Jhamil Bladimir
* Marcos Vinícius de Oliveira Corrêa
* Renan dos Santos Jesus
* Thiago Tadeu Brandão

