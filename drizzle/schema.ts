import {
  mysqlTable,
  primaryKey,
  int,
  varchar,
  char,
  unique,
  timestamp,
  decimal,
  mysqlEnum,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const cartitemTable = mysqlTable(
  "cartitem_table",
  {
    idcart: int().autoincrement().notNull(),
    idProduto: int("id_produto")
      .notNull()
      .references(() => produtoTable.idproduto),
    idUsuario: int("id_usuario")
      .notNull()
      .references(() => usuarioTable.idusuario),
    quantidade: int().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.idcart], name: "cartitem_table_idcart" }),
  ]
);

export const enderecoTable = mysqlTable(
  "endereco_table",
  {
    idendereco: int().autoincrement().notNull(),
    rua: varchar({ length: 100 }).notNull(),
    bairro: varchar({ length: 100 }).notNull(),
    cidade: varchar({ length: 100 }).notNull(),
    complemento: varchar({ length: 100 }),
    estado: char({ length: 2 }).notNull(),
    cep: varchar({ length: 9 }).notNull(),
    idPerfil: int("id_perfil")
      .notNull()
      .references(() => perfilusuarioTable.idperfil, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.idendereco],
      name: "endereco_table_idendereco",
    }),
  ]
);

export const estoqueTable = mysqlTable(
  "estoque_table",
  {
    idestoque: int().autoincrement().notNull(),
    quantidade: int().default(0).notNull(),
    dataAtualizacao: timestamp("data_atualizacao", {
      mode: "string",
    }).onUpdateNow(),
    idProduto: int("id_produto")
      .notNull()
      .references(() => produtoTable.idproduto, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.idestoque], name: "estoque_table_idestoque" }),
    unique("estoque_table_id_produto_unique").on(table.idProduto),
  ]
);

export const itempedidoTable = mysqlTable(
  "itempedido_table",
  {
    iditem: int().autoincrement().notNull(),
    idPedido: int("id_pedido")
      .notNull()
      .references(() => pedidoTable.idpedido, { onDelete: "cascade" }),
    idProduto: int("id_produto")
      .notNull()
      .references(() => produtoTable.idproduto),
    quantidade: int().notNull(),
    precoUnitario: decimal("preco_unitario", {
      precision: 10,
      scale: 2,
    }).notNull(),
    precoTotal: decimal("preco_total", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.iditem], name: "itempedido_table_iditem" }),
  ]
);

export const pedidoTable = mysqlTable(
  "pedido_table",
  {
    idpedido: int().autoincrement().notNull(),
    datapedido: timestamp({ mode: "string" }).default(sql`(now())`),
    statuspedido: mysqlEnum(["pendente", "processando", "enviado", "entregue"])
      .default("pendente")
      .notNull(),
    valorTotal: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
    metodoPagamento: mysqlEnum("metodo_pagamento", [
      "boleto",
      "cartão",
      "pix",
    ]).notNull(),
    statusPagamento: mysqlEnum("status_pagamento", [
      "pendente",
      "aprovado",
      "negado",
    ])
      .default("pendente")
      .notNull(),
    idUsuario: int("id_usuario")
      .notNull()
      .references(() => usuarioTable.idusuario),
    idEndereco: int("id_endereco")
      .notNull()
      .references(() => enderecoTable.idendereco),
  },
  (table) => [
    primaryKey({ columns: [table.idpedido], name: "pedido_table_idpedido" }),
  ]
);

export const perfilusuarioTable = mysqlTable(
  "perfilusuario_table",
  {
    idperfil: int().autoincrement().notNull(),
    nome: varchar({ length: 100 }).notNull(),
    email: varchar({ length: 100 }).notNull(),
    cpf: varchar({ length: 11 }).notNull(),
    telefone: varchar({ length: 20 }).notNull(),
    idUsuario: int("id_usuario")
      .notNull()
      .references(() => usuarioTable.idusuario, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({
      columns: [table.idperfil],
      name: "perfilusuario_table_idperfil",
    }),
    unique("perfilUsuario_table_email_unique").on(table.email),
    unique("perfilUsuario_table_cpf_unique").on(table.cpf),
    unique("perfilUsuario_table_id_usuario_unique").on(table.idUsuario),
  ]
);

export const produtoTable = mysqlTable(
  "produto_table",
  {
    idproduto: int().autoincrement().notNull(),
    nome: varchar({ length: 100 }).notNull(),
    descricao: text(),
    preco: decimal({ precision: 10, scale: 2 }).notNull(),
    code: varchar({ length: 30 }).notNull(),
    imageUrl: varchar("image_url", { length: 255 }),
    ativo: tinyint().default(1),
    dataCriacao: timestamp("data_criacao", { mode: "string" }).default(
      sql`(now())`
    ),
    dataAtualizacao: timestamp("data_atualizacao", {
      mode: "string",
    }).onUpdateNow(),
  },
  (table) => [
    primaryKey({ columns: [table.idproduto], name: "produto_table_idproduto" }),
    unique("produto_table_code_unique").on(table.code),
  ]
);

export const usuarioTable = mysqlTable(
  "usuario_table",
  {
    idusuario: int().autoincrement().notNull(),
    username: varchar({ length: 100 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
    role: mysqlEnum(["client", "admin"]).default("client"),
  },
  (table) => [
    primaryKey({ columns: [table.idusuario], name: "usuario_table_idusuario" }),
    unique("usuario_table_username_unique").on(table.username),
  ]
);
