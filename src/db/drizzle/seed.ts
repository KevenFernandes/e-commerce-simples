import path from "node:path";
import { readFile } from "node:fs/promises";
import { ProducModel } from "@/models/product-model";
import { db } from ".";
import { produtoTable } from "./schema";

const root = process.cwd();
const pathdatabase = path.resolve(
  root,
  "src",
  "db",
  "seed",
  "products-seed.json"
);

async function findAll(): Promise<
  Omit<
    ProducModel,
    "idproduct" | "ativo" | "data_criacao" | "data_atualizacao"
  >[]
> {
  const contentJson = await readFile(pathdatabase, "utf-8");
  const parsedJson = JSON.parse(contentJson);
  const { products } = parsedJson;
  return products;
}

async function seed() {
  const products = await findAll();

  try {
    await db.insert(produtoTable).values(products);
    console.log(`Dados inseridos com sucesso: ${products.length} produtos.`);
  } catch (error) {
    console.log("Erro ao inserir dados", error);
  }
}

seed();
