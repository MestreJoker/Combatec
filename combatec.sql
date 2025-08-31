-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 20/11/2024 às 23:20
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `combatec`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbadmin`
--

CREATE TABLE `tbadmin` (
  `idAdmin` int(11) NOT NULL,
  `nomeAdmin` varchar(80) NOT NULL,
  `emailAdmin` varchar(200) NOT NULL,
  `senhaAdmin` varchar(200) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `rmAdmin` int(5) UNSIGNED DEFAULT NULL,
  `fotoAdmin` varchar(255) DEFAULT 'user.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbadmin`
--

INSERT INTO `tbadmin` (`idAdmin`, `nomeAdmin`, `emailAdmin`, `senhaAdmin`, `deleted`, `deleted_at`, `rmAdmin`, `fotoAdmin`) VALUES
(1, 'Admin1', 'admin1@exemplo.com', 'senha1', 0, NULL, 11111, 'user.jpg'),
(2, 'Admin2', 'admin2@exemplo.com', 'senha2', 0, NULL, NULL, 'user.jpg'),
(3, 'Admin3', 'admin3@exemplo.com', 'senha3', 0, NULL, NULL, 'user.jpg'),
(4, 'Admin4', 'admin4@exemplo.com', 'senha4', 0, NULL, NULL, 'user.jpg'),
(5, 'Admin5', 'admin5@exemplo.com', 'senha5', 0, NULL, NULL, 'user.jpg'),
(6, 'Admin6', 'admin6@exemplo.com', 'senha6', 0, NULL, NULL, 'user.jpg'),
(7, 'Admin7', 'admin7@exemplo.com', 'senha7', 0, NULL, NULL, 'user.jpg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbaluno`
--

CREATE TABLE `tbaluno` (
  `idAluno` int(11) NOT NULL,
  `nomeAluno` varchar(50) NOT NULL,
  `emailAluno` varchar(50) NOT NULL,
  `senhaAluno` varchar(50) NOT NULL,
  `rmAluno` int(11) NOT NULL,
  `fotoAluno` varchar(255) DEFAULT NULL,
  `idTurma` int(11) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbaluno`
--

INSERT INTO `tbaluno` (`idAluno`, `nomeAluno`, `emailAluno`, `senhaAluno`, `rmAluno`, `fotoAluno`, `idTurma`, `deleted`) VALUES
(1, 'Gabriel dos Santos', 'gabriel.gomes235@etec.sp.go.br', 'tunfil11', 22279, 'gabriel.jpg', 15, 0),
(2, 'Erick Santos', 'erick.santos123@etec.sp.go.br', 'senha1234', 32568, 'erick.jpg', 15, 0),
(3, 'Everton Barbosa', 'everton.barbosa56@etec.sp.go.br', 'senha5678', 45123, 'everton.jpg', 15, 0),
(4, 'Jhamil Bladimir', 'jhamil.bladimir99@etec.sp.go.br', 'senha7890', 56789, 'jhamal.jpg', 15, 0),
(5, 'Marcos Vinícius de Oliveira', 'marcos.oliveira77@etec.sp.go.br', 'senha0987', 63521, 'marcos.jpg', 15, 0),
(6, 'Guilherme Libório', 'guilherme.liborio88@etec.sp.go.br', 'senha5432', 71234, 'guilherme.jpg', 15, 0),
(7, 'Renan dos Santos', 'renan.santos101@etec.sp.go.br', 'senha1122', 82345, 'renan.jpg', 15, 0),
(8, 'Thiago Tadeu', 'thiago.tadeu45@etec.sp.go.br', 'senha3344', 93456, 'thiago.jpg', 15, 0),
(9, 'Lucas Silva', 'lucas.silva@example.com', 'senhaL123', 11111, 'user.jpg', 1, 0),
(10, 'Juliana Costa', 'juliana.costa@example.com', 'senhaJ123', 22222, 'user.jpg', 2, 0),
(11, 'Rafael Mendes', 'rafael.mendes@example.com', 'senhaR123', 33333, 'user.jpg', 3, 0),
(12, 'Beatriz Almeida', 'beatriz.almeida@example.com', 'senhaB123', 44444, 'user.jpg', 4, 0),
(13, 'Pedro Henrique', 'pedro.henrique@example.com', 'senhaP123', 55555, 'user.jpg', 5, 0),
(14, 'Vanessa Dias', 'vanessa.dias@example.com', 'senhaV123', 66666, 'user.jpg', 6, 0),
(15, 'Thiago Costa', 'thiago.costa@example.com', 'senhaT123', 77777, 'user.jpg', 7, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbcontato`
--

CREATE TABLE `tbcontato` (
  `idContato` int(11) NOT NULL,
  `nomeContatante` varchar(255) NOT NULL,
  `turmaContatante` varchar(50) NOT NULL,
  `assunto` varchar(255) NOT NULL,
  `respondido` int(11) DEFAULT 0,
  `resposta` varchar(255) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `mensagemContato` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbcontato`
--

INSERT INTO `tbcontato` (`idContato`, `nomeContatante`, `turmaContatante`, `assunto`, `respondido`, `resposta`, `deleted`, `mensagemContato`) VALUES
(6, 'Gabriel dos Santos', '3° Desenvolvimento de Sistemas B', 'Teste', 0, NULL, 0, 'teste'),
(7, 'Gabriel dos Santos', '3° Desenvolvimento de Sistemas B', 'Teste2', 0, NULL, 0, 'teste2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbdenuncia`
--

CREATE TABLE `tbdenuncia` (
  `idDenuncia` int(11) NOT NULL,
  `dataDenuncia` datetime NOT NULL DEFAULT current_timestamp(),
  `publica` tinyint(4) NOT NULL DEFAULT 0,
  `descricao` text NOT NULL,
  `nomeDenunciante` varchar(80) NOT NULL,
  `nomeDenunciado` varchar(60) NOT NULL,
  `categoriaDenunciado` int(11) DEFAULT NULL,
  `turmaDenunciado` varchar(255) DEFAULT NULL,
  `turmaDenunciante` varchar(255) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `idDenunciante` int(11) DEFAULT NULL,
  `idDenunciado` int(11) DEFAULT NULL,
  `respondida` int(11) NOT NULL DEFAULT 0,
  `tipoDenuncia` enum('Bullying','Cyberbullying') NOT NULL,
  `tipo_discriminacao` enum('Racismo','Gordofobia','Homofobia','Machismo','Assédio','Capacitismo','Outros') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `aprovada` int(11) DEFAULT 0,
  `motivoRecusa` varchar(255) DEFAULT NULL,
  `resposta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbdenuncia`
--

INSERT INTO `tbdenuncia` (`idDenuncia`, `dataDenuncia`, `publica`, `descricao`, `nomeDenunciante`, `nomeDenunciado`, `categoriaDenunciado`, `turmaDenunciado`, `turmaDenunciante`, `deleted`, `idDenunciante`, `idDenunciado`, `respondida`, `tipoDenuncia`, `tipo_discriminacao`, `created_at`, `updated_at`, `aprovada`, `motivoRecusa`, `resposta`) VALUES
(1, '2024-10-10 00:00:00', 1, 'Ele me xingou no intervalo', 'Erick Santos', 'Gabriel dos Santos', 1, '3° Desenvolvimento de Sistemas B', '3° Desenvolvimento de Sistemas B', 0, 2, 1, 0, 'Bullying', 'Racismo', '2024-10-11 02:58:54', '2024-11-15 03:25:57', 1, NULL, NULL),
(2, '2024-10-10 00:00:00', 1, 'Foi capacitista', 'Erick Santos', 'Rosângela', 2, NULL, '3° Desenvolvimento de Sistemas B', 0, 2, 9, 0, 'Bullying', 'Capacitismo', '2024-10-11 02:59:41', '2024-11-15 03:26:17', 1, NULL, NULL),
(3, '2024-10-10 00:00:00', 1, 'Foi capacitista', 'Erick Santos', 'Rosângela', 2, NULL, '3° Desenvolvimento de Sistemas B', 0, 2, 9, 0, 'Cyberbullying', 'Capacitismo', '2024-10-11 02:59:42', '2024-11-18 17:40:38', 1, NULL, ''),
(4, '2024-10-11 00:00:00', 1, 'Eu vi ela sendo xenofóbica com o aluno Jhamil, do 3° Mtec B', 'Erick Santos', 'Ana Silva', 3, NULL, '3° Desenvolvimento de Sistemas B', 0, 2, 1, 0, 'Bullying', 'Outros', '2024-10-11 03:00:23', '2024-11-18 17:40:27', 1, NULL, ''),
(5, '2024-10-11 00:00:00', 1, 'Ele foi gordofóbico comigo', 'Everton Barbosa', 'Júnior', 2, NULL, '3° Desenvolvimento de Sistemas B', 0, 3, 5, 0, 'Cyberbullying', 'Gordofobia', '2024-10-11 03:01:55', '2024-11-18 22:33:34', 1, NULL, ''),
(6, '2024-10-11 00:00:00', 1, 'Foi xenofóbica!', 'Jhamil Bladimir', 'Ana Silva', 3, NULL, '3° Desenvolvimento de Sistemas B', 0, 4, 1, 0, 'Bullying', 'Outros', '2024-10-11 03:05:15', '2024-11-18 22:33:19', 1, NULL, '');

--
-- Acionadores `tbdenuncia`
--
DELIMITER $$
CREATE TRIGGER `after_delete_tbdenuncia` AFTER DELETE ON `tbdenuncia` FOR EACH ROW BEGIN
    -- Atualiza as estatísticas de acordo com o tipo de denúncia excluída
    UPDATE tbestatistica
    SET 
        total_denuncias = total_denuncias - 1,
        denuncias_respondidas = CASE WHEN OLD.respondida = 1 THEN denuncias_respondidas - 1 ELSE denuncias_respondidas END,
        denuncias_pendentes = CASE WHEN OLD.respondida = 0 THEN denuncias_pendentes - 1 ELSE denuncias_pendentes END,
        denuncias_alunos = CASE WHEN OLD.categoriaDenunciado = 'Aluno' THEN denuncias_alunos - 1 ELSE denuncias_alunos END,
        denuncias_professores = CASE WHEN OLD.categoriaDenunciado = 'Professor' THEN denuncias_professores - 1 ELSE denuncias_professores END,
        denuncias_funcionarios = CASE WHEN OLD.categoriaDenunciado = 'Funcionário' THEN denuncias_funcionarios - 1 ELSE denuncias_funcionarios END,
        denuncias_bullying = CASE WHEN OLD.tipo_discriminacao = 'Bullying' THEN denuncias_bullying - 1 ELSE denuncias_bullying END,
        denuncias_cyberbullying = CASE WHEN OLD.tipo_discriminacao = 'Cyberbullying' THEN denuncias_cyberbullying - 1 ELSE denuncias_cyberbullying END,
        denuncias_racismo = CASE WHEN OLD.tipo_discriminacao = 'Racismo' THEN denuncias_racismo - 1 ELSE denuncias_racismo END,
        denuncias_gordofobia = CASE WHEN OLD.tipo_discriminacao = 'Gordofobia' THEN denuncias_gordofobia - 1 ELSE denuncias_gordofobia END,
        denuncias_homofobia = CASE WHEN OLD.tipo_discriminacao = 'Homofobia' THEN denuncias_homofobia - 1 ELSE denuncias_homofobia END,
        denuncias_machismo = CASE WHEN OLD.tipo_discriminacao = 'Machismo' THEN denuncias_machismo - 1 ELSE denuncias_machismo END,
        denuncias_assedio = CASE WHEN OLD.tipo_discriminacao = 'Assédio' THEN denuncias_assedio - 1 ELSE denuncias_assedio END,
        denuncias_capacitismo = CASE WHEN OLD.tipo_discriminacao = 'Capacitismo' THEN denuncias_capacitismo - 1 ELSE denuncias_capacitismo END,
        denuncias_outros = CASE WHEN OLD.tipo_discriminacao = 'Outros' THEN denuncias_outros - 1 ELSE denuncias_outros END
    WHERE id = 1; -- Assumindo que é a primeira e única linha na tabela de estatísticas
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_tbdenuncia` AFTER INSERT ON `tbdenuncia` FOR EACH ROW BEGIN
    -- Atualiza o total de denúncias
    UPDATE tbestatistica
    SET 
        total_denuncias = total_denuncias + 1,
        denuncias_respondidas = CASE WHEN NEW.respondida = 1 THEN denuncias_respondidas + 1 ELSE denuncias_respondidas END,
        denuncias_pendentes = CASE WHEN NEW.respondida = 0 THEN denuncias_pendentes + 1 ELSE denuncias_pendentes END,
        denuncias_alunos = CASE WHEN NEW.categoriaDenunciado = 'Aluno' THEN denuncias_alunos + 1 ELSE denuncias_alunos END,
        denuncias_professores = CASE WHEN NEW.categoriaDenunciado = 'Professor' THEN denuncias_professores + 1 ELSE denuncias_professores END,
        denuncias_funcionarios = CASE WHEN NEW.categoriaDenunciado = 'Funcionário' THEN denuncias_funcionarios + 1 ELSE denuncias_funcionarios END,
        denuncias_bullying = CASE WHEN NEW.tipo_discriminacao = 'Bullying' THEN denuncias_bullying + 1 ELSE denuncias_bullying END,
        denuncias_cyberbullying = CASE WHEN NEW.tipo_discriminacao = 'Cyberbullying' THEN denuncias_cyberbullying + 1 ELSE denuncias_cyberbullying END,
        denuncias_racismo = CASE WHEN NEW.tipo_discriminacao = 'Racismo' THEN denuncias_racismo + 1 ELSE denuncias_racismo END,
        denuncias_gordofobia = CASE WHEN NEW.tipo_discriminacao = 'Gordofobia' THEN denuncias_gordofobia + 1 ELSE denuncias_gordofobia END,
        denuncias_homofobia = CASE WHEN NEW.tipo_discriminacao = 'Homofobia' THEN denuncias_homofobia + 1 ELSE denuncias_homofobia END,
        denuncias_machismo = CASE WHEN NEW.tipo_discriminacao = 'Machismo' THEN denuncias_machismo + 1 ELSE denuncias_machismo END,
        denuncias_assedio = CASE WHEN NEW.tipo_discriminacao = 'Assédio' THEN denuncias_assedio + 1 ELSE denuncias_assedio END,
        denuncias_capacitismo = CASE WHEN NEW.tipo_discriminacao = 'Capacitismo' THEN denuncias_capacitismo + 1 ELSE denuncias_capacitismo END,
        denuncias_outros = CASE WHEN NEW.tipo_discriminacao = 'Outros' THEN denuncias_outros + 1 ELSE denuncias_outros END
    WHERE id = 1; -- Assumindo que é a primeira e única linha na tabela de estatísticas
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_deleted_set_0` AFTER UPDATE ON `tbdenuncia` FOR EACH ROW BEGIN
  IF OLD.deleted = 1 AND NEW.deleted = 0 THEN
    UPDATE tbestatistica
    SET total_denuncias = total_denuncias + 1;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_tbdenuncia` AFTER UPDATE ON `tbdenuncia` FOR EACH ROW BEGIN
    -- Verifica se o campo `deleted` foi alterado de 0 para 1 (exclusão lógica)
    IF OLD.deleted = 0 AND NEW.deleted = 1 THEN
        -- Atualiza as estatísticas como na exclusão
        UPDATE tbestatistica
        SET 
            total_denuncias = total_denuncias - 1,
            denuncias_respondidas = CASE WHEN OLD.respondida = 1 THEN denuncias_respondidas - 1 ELSE denuncias_respondidas END,
            denuncias_pendentes = CASE WHEN OLD.respondida = 0 THEN denuncias_pendentes - 1 ELSE denuncias_pendentes END,
            denuncias_alunos = CASE WHEN OLD.categoriaDenunciado = 1 THEN denuncias_alunos - 1 ELSE denuncias_alunos END, -- Assumindo que 1 é 'Aluno'
            denuncias_professores = CASE WHEN OLD.categoriaDenunciado = 2 THEN denuncias_professores - 1 ELSE denuncias_professores END, -- Assumindo que 2 é 'Professor'
            denuncias_funcionarios = CASE WHEN OLD.categoriaDenunciado = 3 THEN denuncias_funcionarios - 1 ELSE denuncias_funcionarios END, -- Assumindo que 3 é 'Funcionário'
            denuncias_bullying = CASE WHEN OLD.tipo_discriminacao = 'Bullying' THEN denuncias_bullying - 1 ELSE denuncias_bullying END,
            denuncias_cyberbullying = CASE WHEN OLD.tipo_discriminacao = 'Cyberbullying' THEN denuncias_cyberbullying - 1 ELSE denuncias_cyberbullying END,
            denuncias_racismo = CASE WHEN OLD.tipo_discriminacao = 'Racismo' THEN denuncias_racismo - 1 ELSE denuncias_racismo END,
            denuncias_gordofobia = CASE WHEN OLD.tipo_discriminacao = 'Gordofobia' THEN denuncias_gordofobia - 1 ELSE denuncias_gordofobia END,
            denuncias_homofobia = CASE WHEN OLD.tipo_discriminacao = 'Homofobia' THEN denuncias_homofobia - 1 ELSE denuncias_homofobia END,
            denuncias_machismo = CASE WHEN OLD.tipo_discriminacao = 'Machismo' THEN denuncias_machismo - 1 ELSE denuncias_machismo END,
            denuncias_assedio = CASE WHEN OLD.tipo_discriminacao = 'Assédio' THEN denuncias_assedio - 1 ELSE denuncias_assedio END,
            denuncias_capacitismo = CASE WHEN OLD.tipo_discriminacao = 'Capacitismo' THEN denuncias_capacitismo - 1 ELSE denuncias_capacitismo END,
            denuncias_outros = CASE WHEN OLD.tipo_discriminacao = 'Outros' THEN denuncias_outros - 1 ELSE denuncias_outros END
        WHERE id = 1; -- Atualiza a única linha de estatísticas
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbdiretor`
--

CREATE TABLE `tbdiretor` (
  `idDiretor` int(11) NOT NULL,
  `nomeDiretor` varchar(50) NOT NULL,
  `emailDiretor` varchar(50) NOT NULL,
  `senhaDiretor` varchar(50) NOT NULL,
  `fotoDiretor` varchar(255) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `rmDiretor` int(5) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbdiretor`
--

INSERT INTO `tbdiretor` (`idDiretor`, `nomeDiretor`, `emailDiretor`, `senhaDiretor`, `fotoDiretor`, `deleted`, `rmDiretor`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Diretor1', 'diretor1@exemplo.com', 'senha1', '1.jpg', 0, 12345, '2024-10-05 03:24:38', '2024-10-09 04:07:40', NULL),
(2, 'Diretor2', 'diretor2@exemplo.com', 'senha2', '2.jpg', 0, 12346, '2024-10-05 03:24:38', '2024-10-09 04:08:11', NULL),
(3, 'Diretor3', 'diretor3@exemplo.com', 'senha3', '3.jpg', 0, NULL, '2024-10-05 03:24:38', '2024-10-09 03:57:21', NULL),
(4, 'Diretor4', 'diretor4@exemplo.com', 'senha4', '4.jpg', 0, NULL, '2024-10-05 03:24:38', '2024-10-09 03:57:25', NULL),
(5, 'Diretor5', 'diretor5@exemplo.com', 'senha5', '5.jpg', 0, NULL, '2024-10-05 03:24:38', '2024-10-09 04:00:19', NULL),
(6, 'Diretor6', 'diretor6@exemplo.com', 'senha6', '6.jpg', 0, NULL, '2024-10-05 03:24:38', '2024-10-09 04:04:21', NULL),
(7, 'Diretor7', 'diretor7@exemplo.com', 'senha7', '7.jpg', 0, NULL, '2024-10-05 03:24:38', '2024-10-09 04:06:02', NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbdisciplina`
--

CREATE TABLE `tbdisciplina` (
  `idDisciplina` int(11) NOT NULL,
  `nomeDisciplina` varchar(50) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `tecnica` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbdisciplina`
--

INSERT INTO `tbdisciplina` (`idDisciplina`, `nomeDisciplina`, `deleted`, `tecnica`) VALUES
(1, 'Matemática', 0, 0),
(2, 'Português', 0, 0),
(3, 'História', 0, 0),
(4, 'Geografia', 0, 0),
(5, 'Ciências', 0, 0),
(8, 'IPSSI', 0, 1),
(9, 'Programação Mobile II', 0, 1),
(10, 'Programação Web III', 0, 1),
(11, 'PDTCC', 0, 1),
(12, 'QTS', 0, 1),
(13, 'Sistemas Embarcados', 0, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbestatistica`
--

CREATE TABLE `tbestatistica` (
  `id` int(11) NOT NULL,
  `total_denuncias` int(11) DEFAULT 0,
  `denuncias_alunos` int(11) DEFAULT 0,
  `denuncias_professores` int(11) DEFAULT 0,
  `denuncias_funcionarios` int(11) DEFAULT 0,
  `denuncias_bullying` int(11) DEFAULT 0,
  `denuncias_cyberbullying` int(11) DEFAULT 0,
  `denuncias_racismo` int(11) DEFAULT 0,
  `denuncias_gordofobia` int(11) DEFAULT 0,
  `denuncias_homofobia` int(11) DEFAULT 0,
  `denuncias_machismo` int(11) DEFAULT 0,
  `denuncias_assedio` int(11) DEFAULT 0,
  `denuncias_capacitismo` int(11) DEFAULT 0,
  `denuncias_outros` int(11) DEFAULT 0,
  `denuncias_respondidas` int(11) DEFAULT 0,
  `denuncias_pendentes` int(11) DEFAULT 0,
  `deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbestatistica`
--

INSERT INTO `tbestatistica` (`id`, `total_denuncias`, `denuncias_alunos`, `denuncias_professores`, `denuncias_funcionarios`, `denuncias_bullying`, `denuncias_cyberbullying`, `denuncias_racismo`, `denuncias_gordofobia`, `denuncias_homofobia`, `denuncias_machismo`, `denuncias_assedio`, `denuncias_capacitismo`, `denuncias_outros`, `denuncias_respondidas`, `denuncias_pendentes`, `deleted`) VALUES
(1, 5, -8, -5, -2, -2, -2, -9, 1, 0, 0, 0, 2, -3, -3, -10, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbfuncionario`
--

CREATE TABLE `tbfuncionario` (
  `idFuncionario` int(11) NOT NULL,
  `nomeFuncionario` varchar(50) NOT NULL,
  `funcaoFuncionario` varchar(50) NOT NULL,
  `fotoFuncionario` varchar(255) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbfuncionario`
--

INSERT INTO `tbfuncionario` (`idFuncionario`, `nomeFuncionario`, `funcaoFuncionario`, `fotoFuncionario`, `deleted`) VALUES
(1, 'Ana Silva', 'Segurança', 'user.jpg', 0),
(2, 'Carlos Souza', 'Coordenador', 'user.jpg', 0),
(3, 'Mariana Oliveira', 'Segurança', 'user.jpg', 0),
(4, 'José Santos', 'Assistente', 'user.jpg', 0),
(5, 'Fernanda Lima', 'Limpeza', 'user.jpg', 0),
(6, 'Roberto Ferreira', 'Técnico', 'user.jpg', 0),
(7, 'Patrícia Almeida', 'Recepcionista', 'user.jpg', 0),
(8, 'Felipe Martins', 'Segurança', 'user.jpg', 0),
(9, 'Miguel Santos', 'Segurança', 'user.jpg', 0),
(10, 'Lucas Mendes', 'Coordenador', 'user.jpg', 0),
(11, 'Beatriz Costa', 'Coordenador', 'user.jpg', 0),
(12, 'Tiago Almeida', 'Assistente', 'user.jpg', 0),
(13, 'Renata Pires', 'Assistente', 'user.jpg', 0),
(14, 'Marcos Paulo', 'Limpeza', 'user.jpg', 0),
(15, 'Larissa Lima', 'Limpeza', 'user.jpg', 0),
(16, 'Eduardo Pereira', 'Técnico', 'user.jpg', 0),
(17, 'Letícia Cardoso', 'Técnico', 'user.jpg', 0),
(18, 'Juliana Rocha', 'Recepcionista', 'user.jpg', 0),
(19, 'André Silva', 'Recepcionista', 'user.jpg', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbnotificacao`
--

CREATE TABLE `tbnotificacao` (
  `idNotificacao` int(11) NOT NULL,
  `idDenuncia` int(11) DEFAULT NULL,
  `mensagem` text NOT NULL,
  `data` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(4) NOT NULL DEFAULT 0,
  `idDenunciante` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbnotificacao`
--

INSERT INTO `tbnotificacao` (`idNotificacao`, `idDenuncia`, `mensagem`, `data`, `deleted`, `idDenunciante`) VALUES
(1, 1, 'Notificação sobre a denúncia 1', '2024-09-26 05:06:41', 0, 1),
(2, 2, 'Notificação sobre a denúncia 2', '2024-09-26 05:06:41', 0, 2),
(3, 3, 'Notificação sobre a denúncia 3', '2024-09-26 05:06:41', 0, 3),
(4, 4, 'Notificação sobre a denúncia 4', '2024-09-26 05:06:41', 0, 4),
(5, 5, 'Notificação sobre a denúncia 5', '2024-09-26 05:06:41', 0, 5),
(6, 6, 'Notificação sobre a denúncia 6', '2024-09-26 05:06:41', 0, 6),
(7, 7, 'Notificação sobre a denúncia 7', '2024-09-26 05:06:41', 0, 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbperiodo`
--

CREATE TABLE `tbperiodo` (
  `idPeriodo` int(11) NOT NULL,
  `periodo` varchar(10) NOT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbperiodo`
--

INSERT INTO `tbperiodo` (`idPeriodo`, `periodo`, `deleted`) VALUES
(1, 'Manhã', 0),
(2, 'Tarde', 0),
(3, 'Noite', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbprofessor`
--

CREATE TABLE `tbprofessor` (
  `idProfessor` int(11) NOT NULL,
  `nomeProfessor` varchar(50) NOT NULL,
  `emailProfessor` varchar(50) NOT NULL,
  `senhaProfessor` varchar(50) NOT NULL,
  `rmProfessor` int(11) NOT NULL,
  `fotoProfessor` varchar(255) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbprofessor`
--

INSERT INTO `tbprofessor` (`idProfessor`, `nomeProfessor`, `emailProfessor`, `senhaProfessor`, `rmProfessor`, `fotoProfessor`, `deleted`) VALUES
(1, 'Allan', 'allan@example.com', 'senha123', 1, 'user.jpg', 0),
(2, 'Aline', 'aline@example.com', 'senha123', 2, 'user.jpg', 0),
(3, 'Ana', 'ana@example.com', 'senha123', 3, 'user.jpg', 0),
(4, 'Elaine', 'elaine@example.com', 'senha123', 4, 'user.jpg', 0),
(5, 'Júnior', 'junior@example.com', 'senha123', 5, 'user.jpg', 0),
(6, 'Lenildo', 'lenildo@example.com', 'senha123', 6, 'user.jpg', 0),
(7, 'Maurício', 'mauricio@example.com', 'senha123', 7, 'user.jpg', 0),
(8, 'Regiane', 'regiane@example.com', 'senha123', 8, 'user.jpg', 0),
(9, 'Rosângela', 'rosangela@example.com', 'senha123', 9, 'user.jpg', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbprofessordisciplina`
--

CREATE TABLE `tbprofessordisciplina` (
  `idProfessorDisciplina` int(11) NOT NULL,
  `idProfessor` int(11) DEFAULT NULL,
  `idDisciplina` int(11) DEFAULT NULL,
  `idTurma` int(11) DEFAULT NULL,
  `idPeriodo` int(11) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbprofessordisciplina`
--

INSERT INTO `tbprofessordisciplina` (`idProfessorDisciplina`, `idProfessor`, `idDisciplina`, `idTurma`, `idPeriodo`, `deleted`) VALUES
(1, 1, 9, NULL, NULL, 0),
(2, 1, 10, NULL, NULL, 0),
(3, 2, 11, NULL, NULL, 0),
(4, 3, 2, NULL, NULL, 0),
(5, 4, 5, NULL, NULL, 0),
(6, 5, 8, NULL, NULL, 0),
(7, 5, 11, NULL, NULL, 0),
(8, 5, 12, NULL, NULL, 0),
(9, 5, 13, NULL, NULL, 0),
(10, 6, 3, NULL, NULL, 0),
(11, 7, 12, NULL, NULL, 0),
(12, 7, 13, NULL, NULL, 0),
(13, 8, 4, NULL, NULL, 0),
(14, 9, 1, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `tbturma`
--

CREATE TABLE `tbturma` (
  `idTurma` int(11) NOT NULL,
  `nomeTurma` varchar(50) NOT NULL,
  `idPeriodo` int(11) DEFAULT NULL,
  `deleted` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tbturma`
--

INSERT INTO `tbturma` (`idTurma`, `nomeTurma`, `idPeriodo`, `deleted`) VALUES
(2, 'Turma B', 2, 0),
(3, 'Turma C', 3, 0),
(4, 'Turma D', 2, 0),
(6, 'Turma F', 2, 0),
(8, '1° Nutrição A', 1, 1),
(9, '1° Nutrição B', 1, 1),
(10, '1° Desenvolvimento de Sistemas', 1, 1),
(11, '2° Nutrição A', 1, 1),
(12, '2° Nutrição B', 1, 0),
(13, '2° Desenvolvimento de Sistemas', 1, 0),
(14, '3° Desenvolvimento de Sistemas A', 1, 0),
(15, '3° Desenvolvimento de Sistemas B', 1, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `tbadmin`
--
ALTER TABLE `tbadmin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `emailAdmin` (`emailAdmin`),
  ADD UNIQUE KEY `rmAdmin` (`rmAdmin`);

--
-- Índices de tabela `tbaluno`
--
ALTER TABLE `tbaluno`
  ADD PRIMARY KEY (`idAluno`),
  ADD UNIQUE KEY `emailAluno` (`emailAluno`),
  ADD UNIQUE KEY `rmAluno` (`rmAluno`),
  ADD KEY `idTurma` (`idTurma`);

--
-- Índices de tabela `tbcontato`
--
ALTER TABLE `tbcontato`
  ADD PRIMARY KEY (`idContato`);

--
-- Índices de tabela `tbdenuncia`
--
ALTER TABLE `tbdenuncia`
  ADD PRIMARY KEY (`idDenuncia`),
  ADD KEY `categoriaDenunciado` (`categoriaDenunciado`),
  ADD KEY `fk_denuncia_aluno` (`idDenunciante`);

--
-- Índices de tabela `tbdiretor`
--
ALTER TABLE `tbdiretor`
  ADD PRIMARY KEY (`idDiretor`),
  ADD UNIQUE KEY `emailDiretor` (`emailDiretor`),
  ADD UNIQUE KEY `rmDiretor` (`rmDiretor`);

--
-- Índices de tabela `tbdisciplina`
--
ALTER TABLE `tbdisciplina`
  ADD PRIMARY KEY (`idDisciplina`);

--
-- Índices de tabela `tbestatistica`
--
ALTER TABLE `tbestatistica`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  ADD PRIMARY KEY (`idFuncionario`);

--
-- Índices de tabela `tbnotificacao`
--
ALTER TABLE `tbnotificacao`
  ADD PRIMARY KEY (`idNotificacao`),
  ADD KEY `idDenuncia` (`idDenuncia`),
  ADD KEY `fk_notificacao_aluno` (`idDenunciante`);

--
-- Índices de tabela `tbperiodo`
--
ALTER TABLE `tbperiodo`
  ADD PRIMARY KEY (`idPeriodo`);

--
-- Índices de tabela `tbprofessor`
--
ALTER TABLE `tbprofessor`
  ADD PRIMARY KEY (`idProfessor`),
  ADD UNIQUE KEY `emailProfessor` (`emailProfessor`),
  ADD UNIQUE KEY `rmProfessor` (`rmProfessor`);

--
-- Índices de tabela `tbprofessordisciplina`
--
ALTER TABLE `tbprofessordisciplina`
  ADD PRIMARY KEY (`idProfessorDisciplina`);

--
-- Índices de tabela `tbturma`
--
ALTER TABLE `tbturma`
  ADD PRIMARY KEY (`idTurma`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbadmin`
--
ALTER TABLE `tbadmin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbaluno`
--
ALTER TABLE `tbaluno`
  MODIFY `idAluno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `tbcontato`
--
ALTER TABLE `tbcontato`
  MODIFY `idContato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbdenuncia`
--
ALTER TABLE `tbdenuncia`
  MODIFY `idDenuncia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=239;

--
-- AUTO_INCREMENT de tabela `tbdiretor`
--
ALTER TABLE `tbdiretor`
  MODIFY `idDiretor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbdisciplina`
--
ALTER TABLE `tbdisciplina`
  MODIFY `idDisciplina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `tbestatistica`
--
ALTER TABLE `tbestatistica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `tbfuncionario`
--
ALTER TABLE `tbfuncionario`
  MODIFY `idFuncionario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `tbnotificacao`
--
ALTER TABLE `tbnotificacao`
  MODIFY `idNotificacao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbperiodo`
--
ALTER TABLE `tbperiodo`
  MODIFY `idPeriodo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbprofessor`
--
ALTER TABLE `tbprofessor`
  MODIFY `idProfessor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tbprofessordisciplina`
--
ALTER TABLE `tbprofessordisciplina`
  MODIFY `idProfessorDisciplina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `tbturma`
--
ALTER TABLE `tbturma`
  MODIFY `idTurma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tbdenuncia`
--
ALTER TABLE `tbdenuncia`
  ADD CONSTRAINT `fk_denuncia_aluno` FOREIGN KEY (`idDenunciante`) REFERENCES `tbaluno` (`idAluno`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
