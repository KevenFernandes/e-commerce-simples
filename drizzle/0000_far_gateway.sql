CREATE TABLE `endereco_table` (
	`idendereco` int AUTO_INCREMENT NOT NULL,
	`rua` varchar(100) NOT NULL,
	`bairro` varchar(100) NOT NULL,
	`cidade` varchar(100) NOT NULL,
	`complemento` varchar(100),
	`estado` char(2) NOT NULL,
	`cep` varchar(9) NOT NULL,
	`id_perfil` int NOT NULL,
	CONSTRAINT `endereco_table_idendereco` PRIMARY KEY(`idendereco`)
);
--> statement-breakpoint
CREATE TABLE `estoque_table` (
	`idestoque` int AUTO_INCREMENT NOT NULL,
	`quantidade` int NOT NULL DEFAULT 0,
	`data_atualizacao` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`id_produto` int NOT NULL,
	CONSTRAINT `estoque_table_idestoque` PRIMARY KEY(`idestoque`),
	CONSTRAINT `estoque_table_id_produto_unique` UNIQUE(`id_produto`)
);
--> statement-breakpoint
CREATE TABLE `itemPedido_table` (
	`iditem` int AUTO_INCREMENT NOT NULL,
	`id_pedido` int NOT NULL,
	`id_produto` int NOT NULL,
	`quantidade` int NOT NULL,
	`preco_unitario` decimal(10,2) NOT NULL,
	`preco_total` decimal(10,2) NOT NULL,
	CONSTRAINT `itemPedido_table_iditem` PRIMARY KEY(`iditem`)
);
--> statement-breakpoint
CREATE TABLE `pedido_table` (
	`idpedido` int AUTO_INCREMENT NOT NULL,
	`datapedido` timestamp DEFAULT (now()),
	`statuspedido` enum('pendente','processando','enviado','entregue') NOT NULL DEFAULT 'pendente',
	`valor_total` decimal(10,2) NOT NULL,
	`metodo_pagamento` enum('boleto','cartão','pix') NOT NULL,
	`status_pagamento` enum('pendente','aprovado','negado') NOT NULL DEFAULT 'pendente',
	`id_usuario` int NOT NULL,
	`id_endereco` int NOT NULL,
	CONSTRAINT `pedido_table_idpedido` PRIMARY KEY(`idpedido`)
);
--> statement-breakpoint
CREATE TABLE `perfilUsuario_table` (
	`idperfil` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`email` varchar(100) NOT NULL,
	`cpf` varchar(11) NOT NULL,
	`telefone` varchar(20) NOT NULL,
	`id_usuario` int NOT NULL,
	CONSTRAINT `perfilUsuario_table_idperfil` PRIMARY KEY(`idperfil`),
	CONSTRAINT `perfilUsuario_table_email_unique` UNIQUE(`email`),
	CONSTRAINT `perfilUsuario_table_cpf_unique` UNIQUE(`cpf`),
	CONSTRAINT `perfilUsuario_table_id_usuario_unique` UNIQUE(`id_usuario`)
);
--> statement-breakpoint
CREATE TABLE `produto_table` (
	`idproduto` int AUTO_INCREMENT NOT NULL,
	`nome` varchar(100) NOT NULL,
	`descricao` text,
	`preco` decimal(10,2) NOT NULL,
	`code` varchar(30) NOT NULL,
	`image_url` varchar(255),
	`ativo` boolean DEFAULT true,
	`data_criacao` timestamp DEFAULT (now()),
	`data_atualizacao` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `produto_table_idproduto` PRIMARY KEY(`idproduto`),
	CONSTRAINT `produto_table_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `usuario_table` (
	`idusuario` int AUTO_INCREMENT NOT NULL,
	`username` varchar(100) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` enum('client','admin') DEFAULT 'client',
	CONSTRAINT `usuario_table_idusuario` PRIMARY KEY(`idusuario`),
	CONSTRAINT `usuario_table_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `endereco_table` ADD CONSTRAINT `endereco_table_id_perfil_perfilUsuario_table_idperfil_fk` FOREIGN KEY (`id_perfil`) REFERENCES `perfilUsuario_table`(`idperfil`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `estoque_table` ADD CONSTRAINT `estoque_table_id_produto_produto_table_idproduto_fk` FOREIGN KEY (`id_produto`) REFERENCES `produto_table`(`idproduto`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itemPedido_table` ADD CONSTRAINT `itemPedido_table_id_pedido_pedido_table_idpedido_fk` FOREIGN KEY (`id_pedido`) REFERENCES `pedido_table`(`idpedido`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `itemPedido_table` ADD CONSTRAINT `itemPedido_table_id_produto_produto_table_idproduto_fk` FOREIGN KEY (`id_produto`) REFERENCES `produto_table`(`idproduto`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pedido_table` ADD CONSTRAINT `pedido_table_id_usuario_usuario_table_idusuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario_table`(`idusuario`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pedido_table` ADD CONSTRAINT `pedido_table_id_endereco_endereco_table_idendereco_fk` FOREIGN KEY (`id_endereco`) REFERENCES `endereco_table`(`idendereco`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `perfilUsuario_table` ADD CONSTRAINT `perfilUsuario_table_id_usuario_usuario_table_idusuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario_table`(`idusuario`) ON DELETE cascade ON UPDATE no action;