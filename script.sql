drop database petshop;

CREATE DATABASE petshop;


USE petshop;


CREATE TABLE dono (
id_cliente int PRIMARY KEY AUTO_INCREMENT,
nome text not null,
cpf text not nulL,
endereco text not null,
telefone text not null
);


CREATE TABLE animal (
id_animal int PRIMARY KEY AUTO_INCREMENT,
id_dono int,
nome text,
especie text,
raca text,
cor text,
sexo text
);


CREATE TABLE funcionario (
id_funcionario int PRIMARY KEY AUTO_INCREMENT,
nome text,
cpf text,
salario float,
funcao text
);


CREATE TABLE servico (
id_servico int PRIMARY KEY AUTO_INCREMENT,
nome text,
tipo text,
descricao text
);


CREATE TABLE atendimento (
id_atendimento int primary key auto_increment,
id_cliente int,
id_animal int,
id_servico int,
data_atendimento date,
preco float,
forma_pagamento text
);


CREATE TABLE satisfacao (
id_pesquisa int PRIMARY KEY AUTO_INCREMENT,
id_cliente int not null,
nota float,
feedback LONGTEXT
);


-- Inserindo dados na tabela dono
INSERT INTO dono (nome, cpf, endereco, telefone)
VALUES
('João Silva', '12345678900', 'Rua A, 123', '123-456-7890'),
('Maria Santos', '98765432100', 'Avenida B, 456', '987-654-3210'),
('Carlos Oliveira', '11223344500', 'Rua C, 789', '111-222-3333'),
('Fernanda Oliveira', '55566677700', 'Rua D, 567', '555-666-7777'),
('Rafaela Mendes', '11122233344', 'Avenida E, 890', '111-222-3334'),
('Gustavo Pereira', '99988877766', 'Rua F, 123', '999-888-7776'),
('Patricia Santos', '77788899911', 'Avenida G, 456', '777-888-9991'),
('Marcos Oliveira', '12345678933', 'Rua H, 789', '123-456-7893'),
('Aline Souza', '98765432122', 'Avenida I, 345', '987-654-3212'),
('Camila Almeida', '88899977755', 'Rua J, 678', '888-999-7775'),
('Diego Silva', '44455566688', 'Avenida K, 901', '444-555-6668'),
('Fabiana Mendes', '66677788800', 'Rua L, 234', '666-777-8880'),
('Juliana Pereira', '22233344455', 'Avenida M, 567', '222-333-4445');



-- Inserindo dados na tabela animal
INSERT INTO animal (id_dono, nome, especie, raca, cor, sexo)
VALUES
(1, 'Rex', 'Cachorro', 'Vira-lata', 'Marrom', 'Macho'),
(1, 'Mia', 'Gato', 'Siamês', 'Cinza', 'Fêmea'),
(2, 'Thor', 'Cachorro', 'Labrador', 'Preto', 'Macho'),
(3, 'Luna', 'Cachorro', 'Poodle', 'Branco', 'Fêmea'),
(4, 'Mel', 'Cachorro', 'Pug', 'Bege', 'Fêmea'),
(4, 'Bolinha', 'Gato', 'Persa', 'Branco', 'Macho'),
(5, 'Nina', 'Cachorro', 'Shih Tzu', 'Marrom', 'Fêmea'),
(6, 'Rex', 'Cachorro', 'Bulldog', 'Marrom e branco', 'Macho'),
(7, 'Lola', 'Gato', 'Siamês', 'Cinza', 'Fêmea'),
(8, 'Bob', 'Cachorro', 'Dálmata', 'Branco e preto', 'Macho'),
(9, 'Preta', 'Cachorro', 'Vira-lata', 'Preta', 'Fêmea'),
(10, 'Milo', 'Cachorro', 'Golden Retriever', 'Dourado', 'Macho'),
(11, 'Jade', 'Gato', 'Maine Coon', 'Preto', 'Fêmea'),
(12, 'Tobby', 'Cachorro', 'Labrador', 'Chocolate', 'Macho'),
(13, 'Bela', 'Cachorro', 'Poodle', 'Branco', 'Fêmea');



-- Inserindo dados na tabela funcionario
INSERT INTO funcionario (nome, cpf, salario, funcao)
VALUES
('Pedro Almeida', '99988877700', 3000, 'Veterinário'),
('Ana Souza', '88899977700', 2500, 'Atendente'),
('Lucas Pereira', '77788899900', 3500, 'Groomer'),
('Cristina Lima', '12398745600', 2800, 'Veterinário'),
('Ricardo Fernandes', '78945612300', 2600, 'Atendente'),
('Isabela Rodrigues', '45612378900', 3200, 'Groomer'),
('Thiago Santos', '65432198700', 2900, 'Veterinário'),
('Mariana Silva', '98765412300', 2700, 'Atendente'),
('Fernando Oliveira', '74185296300', 3300, 'Groomer'),
('Vanessa Souza', '85296374100', 3000, 'Veterinário'),
('Leonardo Mendes', '36925814700', 3100, 'Atendente'),
('Gabriela Almeida', '25814736900', 2900, 'Groomer'),
('Rafaela Pereira', '14736925800', 3400, 'Veterinário');


-- Inserindo dados na tabela servico
INSERT INTO servico (nome, tipo, descricao)
VALUES
('Consulta Veterinária', 'Saúde', 'Exame de rotina e diagnóstico'),
('Banho e Tosa', 'Higiene', 'Banho, tosa e cuidados com a pelagem'),
('Vacinação', 'Saúde', 'Aplicação de vacinas'),
('Cirurgia', 'Saúde', 'Procedimento cirúrgico'),
('Exames Laboratoriais', 'Saúde', 'Análise de sangue e urina'),
('Hospedagem', 'Outros', 'Permanência do animal na clínica');
	

-- Inserindo dados na tabela atendimento
INSERT INTO atendimento (id_cliente, id_animal, id_servico, data_atendimento, preco, forma_pagamento)
VALUES
(1, 1, 1, '2023-10-15', 80.00, 'Cartão'),
(1, 2, 1, '2023-11-02', 70.00, 'Dinheiro'),
(2, 3, 2, '2023-10-20', 50.00, 'Cartão'),
(3, 4, 3, '2023-09-28', 30.00, 'Dinheiro'),
(4, 5, 4, '2023-10-18', 250.00, 'Cartão'),
(5, 6, 5, '2023-11-05', 120.00, 'Dinheiro'),
(6, 7, 6, '2023-09-30', 80.00, 'Cartão'),
(7, 8, 4, '2023-11-01', 500.00, 'Dinheiro'),
(8, 9, 5, '2023-10-25', 180.00, 'Cartão'),
(9, 10, 6, '2023-11-07', 100.00, 'Dinheiro'),
(10, 11, 4, '2023-10-22', 300.00, 'Cartão'),
(11, 12, 5, '2023-10-10', 150.00, 'Dinheiro'),
(12, 13, 6, '2023-09-28', 90.00, 'Cartão'),
(13, 14, 4, '2023-10-12', 400.00, 'Dinheiro');


-- Inserindo dados na tabela satisfacao
INSERT INTO satisfacao (id_cliente, nota, feedback)
VALUES
(1, 4.5, 'Ótimo atendimento, o veterinário foi muito atencioso.'),
(2, 4.0, 'Gostei do serviço, mas achei o preço um pouco alto.'),
(3, 5.0, 'Excelente! Recomendo a todos.'),
(4, 4.0, 'Bom atendimento, mas a espera foi um pouco longa.'),
(5, 4.5, 'Serviço de qualidade, mas achei os preços um pouco altos.'),
(6, 5.0, 'Adorei! Atendimento excelente.');

