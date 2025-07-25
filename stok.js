const sheetURL = 'https://script.google.com/macros/s/AKfycbywdITTqIjVLYdnPUJ2RBC1zLFUIWKEfndKZOyDNOptULscDN-fNMNH5vjFoKkw7v4zCg/exec'; // ganti
const user = JSON.parse(localStorage.getItem('user'));
if (!user) location.href = 'login.html';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`${sheetURL}?action=stokFull&outlet=${user.outlet}`);
    const data = await res.json();
    const tbody = document.getElementById("stokBody");
    data.items.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nama}</td>
        <td>${item.hargaJual}</td>
        <td>${item.hargaModal}</td>
        <td>${item.stok}</td>
        <td>${item.outlet}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch {
    alert("Gagal memuat data stok.");
  }
});
