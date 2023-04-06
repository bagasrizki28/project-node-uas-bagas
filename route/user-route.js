import { client } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register
export async function register(req, res) {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `INSERT INTO users (username, email, password, no_hp, alamat) VALUES ('${req.body.username}', '${req.body.email}', '${hash}', '${req.body.noHp}', '${req.body.alamat}')`
  );
  res.send("USER BERHASIL TERDAFTAR!");
}

//Akun Saat ini
export async function meStatus(req, res) {
  const me = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  res.json(me);
}

// Update Akun
export async function updateAkun(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(req.body.password, salt);
  await client.query(
    `UPDATE users SET username = '${req.body.username}', password = '${hash}' WHERE user_id = ${user.user_id}`
  );
  res.clearCookie("token");
  res.send("Data User berhasil di Update!");
}

// Membaca semua Akun
export async function bacaAkun(req, res) {
  const x = await client.query(`SELECT * FROM users`);
  res.send(x.rows);
}

export async function tombolLogout(req, res) {
  // res.setHeader("Cache-Control", "no-store"); // khusus Vercel
  res.clearCookie("token");
  res.send("Logout berhasil.");
}

export async function pesanLangsung(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  await client.query(`INSERT INTO pemesanan_langsung (user_id, tanggal_jemput, destinasi, jml_penumpang, no_telp, alamat)
    VALUES (${user.user_id}, '${req.body.b}', '${req.body.c}', ${req.body.d} , '${req.body.f}' , '${req.body.a}')`);
  res.send("Data Berhasil dimasukkan!");
}

//Baca Semua Mobil by Id
export async function getMobilById(req, res) {
  const x = await client.query(`SELECT * FROM sewa_mobil`);
  res.send(x.rows);
}

//Tambah Mobil (admin)
export async function tambahMobil(req, res) {
  await client.query(
    `INSERT INTO sewa_mobil (tahun, tipe, harga_perhari, photo) VALUES ('${req.body.tahun}', '${req.body.tipe}', ${req.body.hargaPerhari}, '${req.file.filename}')`
  );
  res.send("Data Mobil Baru Berhasil ditambahkan!");
}

//Baca semua Kota
export async function getKota(req, res) {
  const x = await client.query("SELECT * FROM kota");
  res.send(x.rows);
}

//Baca kota by Id

export async function getKotaId(req, res) {
  const x = await client.query(
    `SELECT * FROM kota WHERE id = ${req.params.id}`
  );
  res.send(x.rows[0]);
}

//Update Booking

export async function updateBooking(req, res) {
  client.query(
    `UPDATE pemesanan_langsung SET id = ${req.body.id},  tanggal_jemput = '${req.body.tanggal_jemput}', jml_penumpang = ${req.body.jml_penumpang} WHERE id = ${req.params.id}`
  );
  res.send("Masuk!");
}

//Get Booking by Id

export async function getBookingId(req, res) {
  const x = await client.query(
    `SELECT * FROM pemesanan_langsung WHERE id = ${req.params.id}`
  );
  res.send(x.rows[0]);
}

//Baca Booking
export async function getBooking(req, res) {
  const x = await client.query("SELECT * FROM pemesanan_langsung");
  res.send(x.rows);
}

//Tambah Data Booking (user)
export async function tambahBooking(req, res) {
  const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
  await client.query(
    `INSERT INTO pemesanan_langsung (user_id, kota_id, tanggal_jemput, jml_penumpang, no_telp, alamat, metode_pembayaran)
        VALUES (${user.id}, ${req.body.kotaId}, '${req.body.tanggalBerangkat}', ${req.body.jumlahPenumpang}, '${req.body.noHp}', '${req.body.alamat}', '${req.body.metodeBayar}')`
  );
  res.send("Data Berhasil Ditambahkan!");
}

//Delete Booking
export async function deleteBooking(req, res) {
  await client.query(
    `DELETE FROM pemesanan_langsung WHERE id = ${req.params.id}`
  );
  res.send("Data Pemesanan Berhasil dihapus!");
}
//Delete Mobil (admin)
export async function hapusMobil(req, res) {
  await client.query(
    `DELETE FROM sewa_mobil WHERE id_mobil = ${req.params.id_mobil}`
  );
  res.send("Berhasil dihapus!");
}
