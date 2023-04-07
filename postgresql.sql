drop table pemesanan_langsung;
drop table kota;
drop table sewa_mobil;
drop table users cascade;

create table users (
	id serial primary key,
	username text,
	email text,
	password text,
	no_hp char(13),
	alamat text,
);


insert into admins (username, password) values ('BagasRizky', '')

insert into users ( username, email, password, no_hp, alamat, admin) values
	('Bagas', 'bagasrizki123@gmail.com','$2a$10$4CG53wXWiXTFIUa2rJ5uzO3yYWYEswo.Kq3Gr9jv4Qua8K1tAG8ki', '0888123' ,'Banjar',  true),
	('Rey', 'rey123@gmail.com','123', '0888123' ,'Sibolga', false);



create table sewa_mobil (
	id_mobil serial primary key,
	tahun text,
	tipe text,
	harga_perhari int,
	photo text
);


create table kota (
	id serial primary key,
	nama_kota text,
	tarif int
);

insert into kota (nama_kota, tarif) values
	('Bandung', 150000),
	('Jakarta', 350000),
	('Jawa Timur', 200000);

create table pemesanan_langsung (
	id serial primary key,
	user_id serial references users(id),
	kota_id serial references kota(id),
	jml_penumpang int,
	no_telp char(13),
	tanggal_jemput text,
	alamat text,
	metode_pembayaran text
);

