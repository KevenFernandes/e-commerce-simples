import { relations } from "drizzle-orm/relations";
import { produtoTable, cartitemTable, usuarioTable, perfilusuarioTable, enderecoTable, estoqueTable, pedidoTable, itempedidoTable } from "./schema";

export const cartitemTableRelations = relations(cartitemTable, ({one}) => ({
	produtoTable: one(produtoTable, {
		fields: [cartitemTable.idProduto],
		references: [produtoTable.idproduto]
	}),
	usuarioTable: one(usuarioTable, {
		fields: [cartitemTable.idUsuario],
		references: [usuarioTable.idusuario]
	}),
}));

export const produtoTableRelations = relations(produtoTable, ({many}) => ({
	cartitemTables: many(cartitemTable),
	estoqueTables: many(estoqueTable),
	itempedidoTables: many(itempedidoTable),
}));

export const usuarioTableRelations = relations(usuarioTable, ({many}) => ({
	cartitemTables: many(cartitemTable),
	pedidoTables: many(pedidoTable),
	perfilusuarioTables: many(perfilusuarioTable),
}));

export const enderecoTableRelations = relations(enderecoTable, ({one, many}) => ({
	perfilusuarioTable: one(perfilusuarioTable, {
		fields: [enderecoTable.idPerfil],
		references: [perfilusuarioTable.idperfil]
	}),
	pedidoTables: many(pedidoTable),
}));

export const perfilusuarioTableRelations = relations(perfilusuarioTable, ({one, many}) => ({
	enderecoTables: many(enderecoTable),
	usuarioTable: one(usuarioTable, {
		fields: [perfilusuarioTable.idUsuario],
		references: [usuarioTable.idusuario]
	}),
}));

export const estoqueTableRelations = relations(estoqueTable, ({one}) => ({
	produtoTable: one(produtoTable, {
		fields: [estoqueTable.idProduto],
		references: [produtoTable.idproduto]
	}),
}));

export const itempedidoTableRelations = relations(itempedidoTable, ({one}) => ({
	pedidoTable: one(pedidoTable, {
		fields: [itempedidoTable.idPedido],
		references: [pedidoTable.idpedido]
	}),
	produtoTable: one(produtoTable, {
		fields: [itempedidoTable.idProduto],
		references: [produtoTable.idproduto]
	}),
}));

export const pedidoTableRelations = relations(pedidoTable, ({one, many}) => ({
	itempedidoTables: many(itempedidoTable),
	enderecoTable: one(enderecoTable, {
		fields: [pedidoTable.idEndereco],
		references: [enderecoTable.idendereco]
	}),
	usuarioTable: one(usuarioTable, {
		fields: [pedidoTable.idUsuario],
		references: [usuarioTable.idusuario]
	}),
}));