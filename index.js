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

// Untuk mengelola cookie
app.use(cookieParser());

// ROUTE

// Register
app.post("/api/register", async (req, res) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO users (nana_lengkap, email, password, no_hp, alamat) VALUES ('${req.body.namaLengkap}', '${req.body.email}', '${hash}', '${req.body.noHp}', '${req.body.alamat}')`
  );
  res.send("USER BERHASIL TERDAFTAR!");
});

app.post("/api/login", async (req, res) => {
  const results = await client.query(
    `SELECT * FROM users WHERE nana_lengkap = '${req.body.username}'`
  );
  if (results.rows.length > 0) {
    if (await bcrypt.compare(req.body.pass, results.rows[0].password)) {
      const token = jwt.sign(results.rows[0], "secret");
      res.cookie("token", token);
      res.send("Login berhasil.");
    } else {
      res.status(401);
      res.send("Kata sandi salah.");
    }
  } else {
    res.status(401);
    res.send("User tidak ditemukan.");
  }
});

// MEMULAI SERVER

app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
