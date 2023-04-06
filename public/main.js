let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

const kotaSelect = document.querySelector("#kota");
fetch("/api/kota")
  .then((response) => response.json())
  .then((kotaKota) => {
    kotaKota.forEach((kota) => {
      const option = document.createElement("option");
      option.textContent = kota.nama_kota;
      option.value = kota.id;

      kotaSelect.appendChild(option);
    });
  });

const headerButton = document.querySelector(".header-btn");
// const tombolLogout = document.querySelector(".tombol-logout");
fetch("/api/me")
  .then((response) => response.json())
  .then((me) => {
    const a = document.createElement("a");
    a.textContent = `Hello, ${me.username}!`;
    a.href = "/";
    a.className = "nama-user";
    headerButton.appendChild(a);
  });

const tombolLogout = document.querySelector(".sign-out");
tombolLogout.onclick = () => {
  fetch("/api/logout").then((response) => {
    if (response.ok) {
      location.href = "/dashboard/index.html";
    }
  });
};

const servicesContainer = document.querySelector(".services-container");

fetch("/api/datamobil")
  .then((response) => response.json())
  .then((datamobil) => {
    datamobil.forEach((m) => {
      const box = document.createElement("div");
      box.className = "box";

      const boxImg = document.createElement("div");
      boxImg.className = "box-img";

      const img = document.createElement("img");
      img.src = `/img-upload/${m.photo}`;

      boxImg.appendChild(img);

      const p = document.createElement("p");
      p.textContent = m.tahun;

      const h3 = document.createElement("h3");
      h3.textContent = m.tipe;

      const h2 = document.createElement("h2");
      h2.textContent = m.harga_perhari;
      const span = document.createElement("span");
      span.textContent = " /hari";
      h2.appendChild(span);

      const a = document.createElement("a");
      a.href = "/pemesanan-rental";
      a.textContent = "Rental Sekarang";
      a.className = "btn";

      box.appendChild(boxImg);
      box.appendChild(p);
      box.appendChild(h3);
      box.appendChild(h2);
      box.appendChild(a);

      servicesContainer.appendChild(box);
    });
  });
