import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { client } from "./db.js";

const app = express();

app.use(express.static("public"));

// Untuk membaca body berformat JSON
app.use(express.json());
// MIDDLEWARE

// ROUTE

// Register
app.post("/api/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO users (user_id, nana_lengkap, email, password, no_hp, alamat) VALUES (NULL, '${req.body.nana_lengkap}', '${req.body.email}', '${hash}', '${req.body.no_hp}', '${req.body.alamat}')`
  );
  res.send("USER BERHASIL TERDAFTAR!");
});

// MEMULAI SERVER

app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
