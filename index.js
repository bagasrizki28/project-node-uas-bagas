import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { client } from "./db.js";
import { login } from "./loginroute.js";

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
    `INSERT INTO users (username, email, password, no_hp, alamat) VALUES ('${req.body.username}', '${req.body.email}', '${hash}', '${req.body.noHp}', '${req.body.alamat}')`
  );
  res.send("USER BERHASIL TERDAFTAR!");
});

//LOGIN
app.post("/api/login", login);

// MEMULAI SERVER

app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
