const sheetURL = 'https://script.google.com/macros/s/AKfycbywdITTqIjVLYdnPUJ2RBC1zLFUIWKEfndKZOyDNOptULscDN-fNMNH5vjFoKkw7v4zCg/exec'; // ganti
const user = JSON.parse(localStorage.getItem('user'));
if (!user) location.href = 'login.html';

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formPembelian");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      action: "tambahPembelian",
      tanggal: new Date().toISOString().slice(0, 10),
      nama: document.getElementById("nama").value,
      jumlah: parseInt(document.getElementById("jumlah").value),
      harga: parseInt(document.getElementById("harga").value),
      vendor: document.getElementById("vendor").value,
      outlet: user.outlet
    };

    try {
      const res = await fetch(sheetURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      const hasil = await res.json();
      if (hasil.success) {
        document.getElementById("pesan").innerText = "Pembelian berhasil disimpan!";
        form.reset();
      } else {
        alert("Gagal menyimpan pembelian.");
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    }
  });
});
