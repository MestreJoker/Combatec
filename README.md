# Combatec

<img width="500" height="500" alt="Icon-Combatec" src="https://github.com/user-attachments/assets/9945726b-c103-4225-b02f-5264d5623c28" />


O **Combatec** é um sistema de denúncias destinado a alunos da Etec de Guaianazes. O aplicativo permite que alunos registrem denúncias contra outros alunos, professores ou funcionários, sendo monitoradas pelo diretor. O objetivo é promover um ambiente escolar mais seguro e transparente.

## Funcionalidades

- **Cadastro e login** de alunos, administradores e diretores.
- **Registro de denúncias** por alunos contra colegas, professores ou funcionários.
- **Acompanhamento de denúncias** pelo diretor.
- **Menu e perfil do usuário** com foto personalizada.
- **Painel administrativo** para gestão de usuários e denúncias.
- **Sistema de estatísticas** mostrando número total de denúncias, denúncias respondidas, pendentes e por tipo de discriminação.
- **Validação de senhas** com critérios de segurança (mínimo 8 caracteres, incluindo letras e números).

## Tecnologias Utilizadas

- **Frontend:** React Native (mobile), Bootstrap, CSS, JavaScript  
- **Backend:** PHP puro  
- **Banco de Dados:** MySQL (XAMPP)  
- **API:** Laravel (opcional, dependendo da implementação)  

## Instalação

### Requisitos

- **PHP 7.x ou superior**  
- **MySQL / MariaDB** (via XAMPP ou outro servidor local)  
- **Node.js e npm** (para React Native)  
- **Expo CLI** (opcional, para rodar o app React Native)  

### Passos

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/combatec.git
cd combatec
2. Configure o banco de dados:

Abra o XAMPP e inicie o Apache e MySQL.

Crie um banco chamado combatec.

Importe o arquivo database/combatec.sql.

3. Configure o backend PHP/Laravel (se estiver usando API):

bash
Copiar código
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Configure as credenciais do banco de dados no .env
php artisan serve
4. Configure o frontend React Native:

bash
Copiar código
cd frontend
npm install
expo start
5. Abra o aplicativo no emulador ou no celular usando o Expo Go.

### Uso
1. Cadastre-se como aluno, administrador ou diretor.

2. Faça login com suas credenciais.

3. Alunos podem registrar denúncias.

4. Diretores podem visualizar todas as denúncias e estatísticas.

5. Usuários podem alterar a foto do perfil ou restaurar a padrão user.png.

### Estatísticas e Tipos de Denúncia
O sistema contempla os seguintes tipos de discriminação:

Bullying

Cyberbullying

Racismo

Gordofobia

Homofobia

Machismo

Assédio

Capacitismo

Outros

As estatísticas incluem: total de denúncias, denúncias respondidas, pendentes e por tipo.
<br><br>
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











