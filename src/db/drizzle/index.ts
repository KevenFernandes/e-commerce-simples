import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USER || "root";
const database = process.env.DB_NAME || "";
const password = process.env.DB_PASSWORD || "";
const port = parseInt(process.env.DB_PORT || "3306");

const poolConnection = mysql.createPool({
  host: host,
  user: user,
  database: database,
  password: password,
  port: port,
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
});

export const db = drizzle(poolConnection);

async function testConnection() {
  try {
    const connection = await poolConnection.getConnection();
    console.log("Conexão com o banco de dados bem sucedida!");
    connection.release();
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados", error);
  }
}

testConnection();
