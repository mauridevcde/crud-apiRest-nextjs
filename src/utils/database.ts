import { Pool } from "pg";

let connection: any;

if (!connection) {
  connection = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ej1",
    password: "123",
    port: 5432,
  });
}

export { connection };
