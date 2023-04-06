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
      a.href = `/dashboard-admin`;
      a.textContent = "Hapus";
      a.className = "btn";

      a.onclick = () => {
        if (confirm(`Apakah anda ingin menghapus data mobil ini?`)) {
          fetch(`/api/hapusmobil/${m.id_mobil}`, {
            method: "DELETE",
          });
          location.reload();
        }

        tdDelete.appendChild(buttonDelete);
        tr.appendChild(tdDelete);
      };

      box.appendChild(boxImg);
      box.appendChild(p);
      box.appendChild(h3);
      box.appendChild(h2);
      box.appendChild(a);

      servicesContainer.appendChild(box);
    });
  });
