-- Database: Videogames

-- DROP DATABASE IF EXISTS "Videogames";

CREATE DATABASE "Videogames"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;



create table produtoras (
	codigo serial not null primary key,
	nome varchar(50) not null,
	sede varchar(50) not null
);

insert into produtoras (nome, sede) values
('FromSoftware', 'Tóquio, Japão'),
('Valve', 'Bellevue, Washington, EUA'),
('Capcom', 'Osaka, Japão')
returning codigo, nome, sede;



create table jogos (
	codigo serial not null primary key,
	titulo varchar(50) not null,
	genero varchar(50) not null,
	preco decimal(5,2) not null,
	produtora integer not null,
	foreign key (produtora) references produtoras (codigo)
);

insert into jogos (titulo, genero, preco, produtora) values
('Elden Ring', 'Ação, RPG', 249.90, 1),
('Dark Souls III', 'Ação', 257.90, 1),
('Dota 2', 'Ação, Estratégia', 0, 2),
('Portal 2', 'Ação, Aventura', 32.99, 2),
('Monster Hunter Rise', 'Ação', 139.90, 3)
returning codigo, titulo, genero, preco, produtora;



create table dlcs (
	codigo serial not null primary key,
	titulo varchar(50) not null,
	descricao varchar(100) not null,
	preco decimal(5,2) not null,
	jogo integer not null,
	foreign key (jogo) references jogos (codigo)
);


insert into dlcs (titulo, descricao, preco, jogo) values
('Sunbreak', 'Nova expansão', 169.90, 5),
('Rondine', 'Conjunto de armadura "Rondine"', 14.90, 5),
('Fren Esi', 'Conjunto de armadura "Fren Esi"', 14.90, 5)
returning codigo, titulo, descricao, preco, jogo;



create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

insert into usuarios (email, senha, tipo, telefone, nome) values
('emmanuelscortegagna.pf018@academico.ifsul.edu.br', '123456', 'A','(99)99999-9999','Emmanuel Scortegagna'), 
('fulano@ifsul.edu.br', '123456', 'U','(88)88888-8888','Fulano');