const sheetUrl = 'https://script.google.com/macros/s/AKfycbywdITTqIjVLYdnPUJ2RBC1zLFUIWKEfndKZOyDNOptULscDN-fNMNH5vjFoKkw7v4zCg/exec'; // ganti dengan Script ID kamu

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch(sheetUrl + `?action=login&email=${email}&password=${password}`);
    const data = await res.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = "index.html";
    } else {
      document.getElementById('errorMsg').innerText = 'Login gagal. Cek email atau password.';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('errorMsg').innerText = 'Terjadi kesalahan saat login.';
  }
});
