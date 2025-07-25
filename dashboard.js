const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // ganti
const user = JSON.parse(localStorage.getItem('user'));
const outlet = user?.outlet || 'Semua';

document.addEventListener("DOMContentLoaded", async () => {
  if (!user) return window.location.href = "login.html";
  document.getElementById("welcomeText").innerText = `Halo, ${user.email} (${outlet})`;

  await loadTodayTransactions();
  await loadTopItems();
  await loadLowStock();
});

async function loadTodayTransactions() {
  try {
    const res = await fetch(`${scriptURL}?action=today&outlet=${outlet}`);
    const data = await res.json();
    document.getElementById('todayTransactions').innerText = data.total + " transaksi";
  } catch {
    document.getElementById('todayTransactions').innerText = "Gagal ambil data";
  }
}

async function loadTopItems() {
  try {
    const res = await fetch(`${scriptURL}?action=topItems&outlet=${outlet}`);
    const data = await res.json();
    const list = document.getElementById('topItems');
    list.innerHTML = '';
    data.items.forEach(i => {
      const li = document.createElement("li");
      li.innerText = `${i.item} - ${i.qty}x`;
      list.appendChild(li);
    });
  } catch {
    document.getElementById('topItems').innerText = "Gagal ambil data";
  }
}

async function loadLowStock() {
  try {
    const res = await fetch(`${scriptURL}?action=lowStock&outlet=${outlet}`);
    const data = await res.json();
    const list = document.getElementById('lowStock');
    list.innerHTML = '';
    data.items.forEach(i => {
      const li = document.createElement("li");
      li.innerText = `${i.item} (sisa ${i.stok})`;
      list.appendChild(li);
    });
  } catch {
    document.getElementById('lowStock').innerText = "Gagal ambil data";
  }
}
