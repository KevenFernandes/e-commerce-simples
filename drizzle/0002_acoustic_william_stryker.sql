CREATE TABLE `cartItem_table` (
	`idcart` int AUTO_INCREMENT NOT NULL,
	`id_produto` int NOT NULL,
	`id_usuario` int NOT NULL,
	`quantidade` int NOT NULL,
	CONSTRAINT `cartItem_table_idcart` PRIMARY KEY(`idcart`)
);
--> statement-breakpoint
ALTER TABLE `cartItem_table` ADD CONSTRAINT `cartItem_table_id_produto_produto_table_idproduto_fk` FOREIGN KEY (`id_produto`) REFERENCES `produto_table`(`idproduto`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cartItem_table` ADD CONSTRAINT `cartItem_table_id_usuario_usuario_table_idusuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuario_table`(`idusuario`) ON DELETE no action ON UPDATE no action;