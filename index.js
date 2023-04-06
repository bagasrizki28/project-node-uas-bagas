import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import { client } from "./db.js";
import { login } from "./loginroute.js";
import {
  bacaAkun,
  deleteBooking,
  getBooking,
  getBookingId,
  getKota,
  getKotaId,
  getMobilById,
  hapusMobil,
  meStatus,
  pesanLangsung,
  register,
  tambahBooking,
  tambahMobil,
  tombolLogout,
  updateAkun,
  updateBooking,
} from "./route/user-route.js";
import multer from "multer";

const upload = multer({
  dest: "public/img-upload",
});
const app = express();

// Untuk membaca body berformat JSON
app.use(express.json());
// MIDDLEWARE

// Untuk mengelola cookie
app.use(cookieParser());

//Menampilkan Data Mobil
app.get("/api/datamobil", async (req, res) => {
  const x = await client.query(`SELECT * FROM sewa_mobil`);
  res.send(x.rows);
});

// Untuk memeriksa otorisasi
app.use((req, res, next) => {
  if (req.path === "/api/login" || req.path === "/api/register") {
    next();
  } else {
    if (req.cookies.token) {
      try {
        req.user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
      } catch (err) {
        res.setHeader("Cache-Control", "no-store"); // khusus Vercel
        res.clearCookie("token");
      }
    }
    if (req.user) {
      if (req.path.startsWith("/login") || req.path.startsWith("/register")) {
        if (req.user.admin) {
          res.redirect("/dashboard-admin");
        } else {
          res.redirect("/");
        }
      } else {
        next();
      }
    } else {
      if (req.path.startsWith("/login") || req.path.startsWith("/register")) {
        next();
      } else {
        if (req.path.startsWith("/api")) {
          res.status(401);
          res.send("Anda harus login terlebih dahulu.");
        } else {
          res.redirect("/login");
        }
      }
    }
  }
});

// Untuk mengakses file statis (khusus Vercel)
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// ROUTE

// Register

app.post("/api/register", register);

//LOGIN
app.post("/api/login", login);

//Me (akun saat ini)
app.get("/api/me", meStatus);

// Update Profile
app.put("/api/updateakun/", updateAkun);

//Menampilkan semua akun
app.get("/api/user", bacaAkun);

// Logout (hapus token)
app.get("/api/logout", tombolLogout);

// Pesan Langsung
app.post("/api/pesanLangsung", pesanLangsung);

//Menampilkan Data Mobil by id
app.get("/api/datamobil/:", getMobilById);

//Menambahkan Data Mobil
app.post("/api/tambahmobil", upload.single("img-upload"), tambahMobil);

//Hapus Data Mobil
app.delete("/api/hapusmobil/:id_mobil", hapusMobil);

//Detail Kota (semua)
app.get("/api/kota", getKota);

//Detail Kota (by id)
app.get("/api/kota/:id", getKotaId);

//Detail Pemesanan
app.get("/api/booking", getBooking);

//Update booking
app.put("/api/booking/:id", updateBooking);

//get booking by id
app.get("/api/booking/:id", getBookingId);

//Tambah data Booking
app.post("/api/booking", tambahBooking);

//get booking by id
app.delete("/api/booking/:id", deleteBooking);

// MEMULAI SERVER
app.listen(3000, () => {
  console.log("Server berhasil berjalan.");
});
