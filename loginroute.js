import express from "express";
import { client } from "pg";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.static("public"));
app.use(express.json());

//login
export async function login(req, res) {
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
}
