import {
  boolean,
  char,
  decimal,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const usuarioTable = mysqlTable("usuario_table", {
  idusuario: int("idusuario").autoincrement().notNull().primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["client", "admin"]).default("client"),
});

export const perfilUsuarioTable = mysqlTable("perfilUsuario_table", {
  idperfil: int("idperfil").autoincrement().notNull().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  cpf: varchar("cpf", { length: 11 }).notNull().unique(),
  telefone: varchar("telefone", { length: 20 }).notNull(),
  id_usuario: int("id_usuario")
    .references(() => usuarioTable.idusuario, { onDelete: "cascade" })
    .unique()
    .notNull(),
});

export const enderecoTable = mysqlTable("endereco_table", {
  idendereco: int("idendereco").autoincrement().notNull().primaryKey(),
  rua: varchar("rua", { length: 100 }).notNull(),
  bairro: varchar("bairro", { length: 100 }).notNull(),
  cidade: varchar("cidade", { length: 100 }).notNull(),
  complemento: varchar("complemento", { length: 100 }),
  estado: char("estado", { length: 2 }).notNull(),
  cep: varchar("cep", { length: 9 }).notNull(),
  id_perfil: int("id_perfil")
    .references(() => perfilUsuarioTable.idperfil, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const produtoTable = mysqlTable("produto_table", {
  idproduto: int("idproduto").autoincrement().notNull().primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  descricao: text("descricao"),
  preco: decimal("preco", { precision: 10, scale: 2 }).notNull(),
  code: varchar("code", { length: 30 }).notNull().unique(),
  image_url: varchar("image_url", { length: 255 }).default(
    "./images/sem-imagem.jpg"
  ),
  ativo: boolean("ativo").default(true),
  data_criacao: timestamp("data_criacao").defaultNow(),
  data_atualizacao: timestamp("data_atualizacao").onUpdateNow(),
});

export const estoqueTable = mysqlTable("estoque_table", {
  idestoque: int("idestoque").autoincrement().notNull().primaryKey(),
  quantidade: int("quantidade").notNull().default(0),
  data_atualizacao: timestamp("data_atualizacao").onUpdateNow(),
  id_produto: int("id_produto")
    .references(() => produtoTable.idproduto, { onDelete: "cascade" })
    .notNull()
    .unique(),
});

export const pedidoTable = mysqlTable("pedido_table", {
  idpedido: int("idpedido").autoincrement().notNull().primaryKey(),
  datapedido: timestamp("datapedido").defaultNow(),
  statuspedido: mysqlEnum("statuspedido", [
    "pendente",
    "processando",
    "enviado",
    "entregue",
  ])
    .notNull()
    .default("pendente"),
  valor_total: decimal("valor_total", { precision: 10, scale: 2 }).notNull(),
  metodo_pagamento: mysqlEnum("metodo_pagamento", [
    "boleto",
    "cartão",
    "pix",
  ]).notNull(),
  status_pagamento: mysqlEnum("status_pagamento", [
    "pendente",
    "aprovado",
    "negado",
  ])
    .notNull()
    .default("pendente"),
  id_usuario: int("id_usuario")
    .references(() => usuarioTable.idusuario)
    .notNull(),
  id_endereco: int("id_endereco")
    .references(() => enderecoTable.idendereco)
    .notNull(),
});

export const itemPedidoTable = mysqlTable("itemPedido_table", {
  iditem: int("iditem").autoincrement().notNull().primaryKey(),
  id_pedido: int("id_pedido")
    .references(() => pedidoTable.idpedido, { onDelete: "cascade" })
    .notNull(),
  id_produto: int("id_produto")
    .references(() => produtoTable.idproduto)
    .notNull(),
  quantidade: int("quantidade").notNull(),
  preco_unitario: decimal("preco_unitario", {
    precision: 10,
    scale: 2,
  }).notNull(),
  preco_total: decimal("preco_total", { precision: 10, scale: 2 }).notNull(),
});

export const cartItemTable = mysqlTable("cartItem_table", {
  idcart: int("idcart").autoincrement().notNull().primaryKey(),
  id_produto: int("id_produto")
    .references(() => produtoTable.idproduto)
    .notNull(),
  id_usuario: int("id_usuario")
    .references(() => usuarioTable.idusuario)
    .notNull(),
  quantidade: int("quantidade").notNull(),
});
