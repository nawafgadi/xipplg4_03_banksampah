const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// === Sistem Registrasi & Login dengan localStorage ===
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!username || !email || !password) {
            alert("Semua field harus diisi!");
            return;
        }

        // Simpan ke localStorage
        const users = JSON.parse(localStorage.getItem("users")) || {};
        if (users[username]) {
            alert("Username sudah terdaftar!");
            return;
        }

        users[username] = { email, password };
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registrasi berhasil! Silakan login.");
        document.querySelector(".container").classList.remove("active"); // kembali ke login
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Event loginForm tertangkap!"); // debug

        const username = document.getElementById("loginUsername").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || {};

        if (users[username] && users[username].password === password) {
            alert("Login berhasil!");
            localStorage.setItem("loggedInUser", username); // simpan status login
            window.location.href = "landing page.html"; // redirect
        } else {
            alert("Username atau password salah, atau akun belum terdaftar!");
        }
    });
}

