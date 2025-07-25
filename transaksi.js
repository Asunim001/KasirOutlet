const sheetURL = 'https://script.google.com/macros/s/AKfycbywdITTqIjVLYdnPUJ2RBC1zLFUIWKEfndKZOyDNOptULscDN-fNMNH5vjFoKkw7v4zCg/exec'; // ganti
const user = JSON.parse(localStorage.getItem('user'));
if (!user) location.href = 'login.html';

document.addEventListener("DOMContentLoaded", async () => {
  await loadItems();

  document.getElementById("item").addEventListener("change", updateHarga);
  document.getElementById("qty").addEventListener("input", updateTotal);
  document.getElementById("uang").addEventListener("input", hitungKembalian);
  document.getElementById("transaksiForm").addEventListener("submit", simpanTransaksi);
});

let itemHargaMap = {};

async function loadItems() {
  try {
    const res = await fetch(`${sheetURL}?action=stok&outlet=${user.outlet}`);
    const data = await res.json();
    const select = document.getElementById("item");
    data.items.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.item;
      opt.innerText = `${d.item} (${d.stok})`;
      select.appendChild(opt);
      itemHargaMap[d.item] = parseInt(d.harga);
    });
    updateHarga(); // load harga awal
  } catch (err) {
    alert("Gagal memuat data stok.");
  }
}

function updateHarga() {
  const item = document.getElementById("item").value;
  const harga = itemHargaMap[item] || 0;
  document.getElementById("harga").value = harga;
  updateTotal();
}

function updateTotal() {
  const harga = parseInt(document.getElementById("harga").value) || 0;
  const qty = parseInt(document.getElementById("qty").value) || 1;
  const total = harga * qty;
  document.getElementById("total").value = total;
  hitungKembalian();
}

function hitungKembalian() {
  const total = parseInt(document.getElementById("total").value) || 0;
  const uang = parseInt(document.getElementById("uang").value) || 0;
  const kembalian = uang - total;
  document.getElementById("kembalian").value = kembalian >= 0 ? kembalian : 0;
}

async function simpanTransaksi(e) {
  e.preventDefault();
  const item = document.getElementById("item").value;
  const qty = parseInt(document.getElementById("qty").value);
  const harga = parseInt(document.getElementById("harga").value);
  const total = parseInt(document.getElementById("total").value);
  const metode = document.getElementById("metode").value;
  const uang = parseInt(document.getElementById("uang").value);
  const kembalian = parseInt(document.getElementById("kembalian").value);
  const tanggal = new Date().toISOString().slice(0, 10);
  const jam = new Date().toLocaleTimeString('id-ID');

  const data = {
    action: "tambahTransaksi",
    tanggal,
    jam,
    item,
    qty,
    harga,
    total,
    metode,
    uang,
    kembalian,
    outlet: user.outlet
  };

  try {
    const res = await fetch(sheetURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
    const result = await res.json();
    if (result.success) {
      document.getElementById("notif").innerText = "Transaksi berhasil disimpan!";
      document.getElementById("transaksiForm").reset();
      updateHarga();
    } else {
      alert("Gagal menyimpan transaksi");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}
