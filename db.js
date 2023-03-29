import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Client } = pkg;

export const client = new Client({
  host: "db.ncwtzjhseoqkyxuoqqmb.supabase.co",
  port: 5432,
  user: "postgres",
  password: "bagasrizky123",
  database: "postgres",
});

await client.connect();
console.log("Terhubung ke basis data.");
