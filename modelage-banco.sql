/* MODELAGEM DO BANCO */
/* ARQUIVO APENAS PARA REFERÊNCIA */
/* TODO: TALVEZ MUDAR O FORMATO DO ARQUIVO */

CREATE TABLE USUARIO(
	IDUSUARIO INT PRIMARY KEY AUTO_INCREMENT,
	USERNAME VARCHAR(30) NOT NULL UNIQUE,
	PASSWORD VARCHAR(255) NOT NULL,
	ROLE ENUM('client', 'admin') DEFAULT 'client'
);

CREATE TABLE PERFIL_USUARIO(
	IDPERFIL INT PRIMARY KEY AUTO_INCREMENT,
	NOME VARCHAR(100) NOT NULL,
	EMAIL VARCHAR(100) NOT NULL UNIQUE,
	CPF VARCHAR(11) NOT NULL UNIQUE,
	TELEFONE VARCHAR(20) NOT NULL,
	ID_USUARIO INT UNIQUE NOT NULL,
	FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(IDUSUARIO) ON DELETE CASCADE

);

CREATE TABLE ENDERECO(
	IDENDERECO INT PRIMARY KEY AUTO_INCREMENT,
	RUA VARCHAR(100) NOT NULL,
	BAIRRO VARCHAR(100) NOT NULL, 
	CIDADE VARCHAR(100) NOT NULL,
	COMPLEMENTO VARCHAR(100),
	ESTADO CHAR(2) NOT NULL,
	CEP VARCHAR(9) NOT NULL,
	ID_PERFIL INT NOT NULL,
	FOREIGN KEY (ID_PERFIL) REFERENCES PERFIL_USUARIO(IDPERFIL) ON DELETE CASCADE
);


CREATE TABLE PRODUTO(
	IDPRODUTO INT PRIMARY KEY AUTO_INCREMENT,
	NOME VARCHAR(100) NOT NULL,
	DESCRICAO TEXT,
	PRECO FLOAT(10,2) NOT NULL,
	CODE VARCHAR(30) NOT NULL UNIQUE,
	IMAGEM_URL VARCHAR(255) NOT NULL,
	ATIVO BOOLEAN DEFAULT 1,
	DATA_CRIACAO DATETIME DEFAULT CURRENT_TIMESTAMP,
	DATA_ATUALIZACAO DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ESTOQUE(
	IDESTOQUE INT PRIMARY KEY AUTO_INCREMENT,
	QUANTIDADE INT NOT NULL DEFAULT 0,
	DATA_ATUALIZACAO DATETIME DEFAULT CURRENT_TIMESTAMP,
	ID_PRODUTO INT UNIQUE NOT NULL,
	FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO(IDPRODUTO) ON DELETE CASCADE
);

CREATE TABLE PEDIDO(
	IDPEDIDO INT PRIMARY KEY AUTO_INCREMENT,
	DATA_PEDIDO DATETIME DEFAULT CURRENT_TIMESTAMP,
	STATUS_PEDIDO ENUM('pendente', 'processando', 'enviado', 'entregue') NOT NULL DEFAULT 'pendente',
	VALOR_TOTAL FLOAT(10,2) NOT NULL,
	METODO_PAGAMENTO ENUM('boleto', 'cartão', 'pix') NOT NULL,
	STATUS_PAGAMENTO ENUM('processando', 'aprovado', 'negado') NOT NULL DEFAULT 'processando',
	ID_USUARIO INT NOT NULL,
	ID_ENDERECO INT NOT NULL,
	FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(IDUSUARIO),
	FOREIGN KEY (ID_ENDERECO) REFERENCES ENDERECO(IDENDERECO)
);

CREATE TABLE ITEM_PEDIDO(
	IDITEM INT PRIMARY KEY AUTO_INCREMENT,
	ID_PEDIDO INT NOT NULL,
	ID_PRODUTO INT NOT NULL,
	QUANTIDADE INT NOT NULL,
	PRECO_UNITARIO FLOAT(10,2) NOT NULL,
	PRECO_TOTAL FLOAT(10,2) NOT NULL,
	FOREIGN KEY (ID_PEDIDO) REFERENCES PEDIDO(IDPEDIDO) ON DELETE CASCADE,
	FOREIGN KEY (ID_PRODUTO) REFERENCES PRODUTO(IDPRODUTO)
)


DROP TABLE USUARIO_TABLE;
DROP TABLE PERFILUSUARIO_TABLE;
DROP TABLE ENDERECO_TABLE;
DROP TABLE PRODUTO_TABLE;
DROP TABLE ESTOQUE_TABLE;
DROP TABLE PEDIDO_TABLE;
DROP TABLE ITEMPEDIDO_TABLE;


INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Azeite de Oliva Ext. Virgem Andorinha 500ml', 'Azeite de Oliva Extra Virgem Português Andorinha Clássicos Vidro 500ml, ideal para saladas e finalização de pratos.', 36.90, 'AZEITE-AND-500ML', './images/azeite001.png');

INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Cafeteira Elétrica Mondial Smart', 'Cafeteira programável com capacidade para 30 xícaras, filtro permanente e sistema corta-pingos.', 129.99, 'CAF-MON-SMART', './images/cafeteira001.png');

INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Smartphone Samsung Galaxy A54 128GB', 'Tela AMOLED de 6.4", 8GB RAM, câmera tripla de 50MP, bateria de 5000mAh, resistente à água e poeira.', 1899.00, 'SAM-GA54-128GB', './images/samsung001.png');

INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Fone de Ouvido Bluetooth JBL Wave Buds', 'Fone de ouvido sem fio intra-auricular com até 32 horas de bateria, chamadas viva-voz e graves aprimorados.', 299.00, 'JBL-WAVE-BUDS', './images/fone001.png');

INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Panela de Pressão Clock Original 4.5 Litros', 'Panela de pressão em alumínio polido com 4.5 litros de capacidade, segurança e praticidade no preparo.', 155.50, 'PANELA-CLOCK-4L5', './images/panela001.png');

INSERT INTO PRODUTO (NOME, DESCRICAO, PRECO, CODE, IMAGEM_URL) VALUES
('Liquidificador Philco PH900 Vermelho', 'Liquidificador potente com 12 velocidades, função pulsar, filtro e jarra de vidro de 2.5 litros.', 210.00, 'LIQ-PHI-PH900', './images/liquidificador001.png');

/*
+-----------+----------------------------------------------+--------------------------------+
| idproduto | nome                                         | image_url                      |
+-----------+----------------------------------------------+--------------------------------+
|         3 | Azeite de Oliva Ext. Virgem Andorinha 500ml  | ./images/azeite001.png         |
|         4 | Cafeteira Elétrica Mondial Smart             | ./images/cafeteira001.png      |
|         5 | Smartphone Samsung Galaxy A54 128GB          | ./images/samsung001.png        |
|         6 | Fone de Ouvido Bluetooth JBL Wave Buds       | ./images/fone001.png           |
|         7 | Panela de Pressão Clock Original 4.5 Litros  | ./images/panela001.png         |
|         8 | Liquidificador Philco PH900 Vermelho         | ./images/liquidificador001.png |
+-----------+----------------------------------------------+--------------------------------+
*/

UPDATE PRODUTO_TABLE SET image_url = '/images/azeite001.png' WHERE idproduto = 3;
UPDATE PRODUTO_TABLE SET image_url = '/images/cafeteira001.png' WHERE idproduto = 4;
UPDATE PRODUTO_TABLE SET image_url = '/images/samsung001.png' WHERE idproduto = 5;
UPDATE PRODUTO_TABLE SET image_url = '/images/fone001.png' WHERE idproduto = 6;
UPDATE PRODUTO_TABLE SET image_url = '/images/panela001.png' WHERE idproduto = 7;
UPDATE PRODUTO_TABLE SET image_url = '/images/liquidificador001.png' WHERE idproduto = 8;
