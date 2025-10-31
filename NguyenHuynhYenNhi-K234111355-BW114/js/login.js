function renderLoginLogout() {
  const content = document.getElementById("content-area");
  const storeKey = "bw07_user";

  const loggedUser = JSON.parse(localStorage.getItem(storeKey) || "null");

  // ===== Nếu đã đăng nhập =====
  if (loggedUser) {
    content.innerHTML = `
      <div class="card" style="text-align:center;max-width:700px;margin:auto;padding:40px;">
        <h2 style="color:#d81b60;font-size:28px;">Welcome back, ${loggedUser.username} 👋</h2>
        <p style="font-size:16px;color:#555;">You are successfully logged in.</p>
        <p style="font-size:14px;color:#777;">Login time: ${loggedUser.loginTime}</p>
        <button id="btn-logout" 
          class="btn-save" 
          style="margin-top:20px;padding:12px 30px;font-size:16px;background:#e91e63;">
          🚪 Logout
        </button>
      </div>
    `;

    document.getElementById("btn-logout").addEventListener("click", () => {
      if (confirm("Do you want to logout?")) {
        localStorage.removeItem(storeKey);
        alert("You have been logged out.");
        renderLoginLogout();
      }
    });
    return;
  }

  // ===== Nếu chưa đăng nhập =====
  content.innerHTML = `
    <div class="card" 
         style="max-width:600px;margin:60px auto;padding:40px 50px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.1);">
      <h2 style="text-align:center;color:#d81b60;font-size:28px;margin-bottom:20px;">
        🔐 Login
      </h2>
      <form id="login-form" autocomplete="off" 
            class="login-form" 
            style="display:flex;flex-direction:column;gap:15px;font-size:16px;text-align:left;">
        <label><b>Username</b></label>
        <input type="text" id="username" required placeholder="Enter your username"
               style="padding:10px 12px;border-radius:8px;border:1px solid #ccc;font-size:15px;">

        <label><b>Password</b></label>
        <input type="password" id="password" required placeholder="Enter your password"
               style="padding:10px 12px;border-radius:8px;border:1px solid #ccc;font-size:15px;">

        <button type="submit" 
                class="btn-save"
                style="margin-top:20px;padding:12px 0;font-size:17px;border:none;border-radius:10px;
                       background:linear-gradient(90deg,#f06292,#ec407a);color:#fff;cursor:pointer;transition:0.3s;">
          Login
        </button>
      </form>

      <p class="note" 
         style="margin-top:20px;text-align:center;font-size:14px;color:#777;">
        Default account: <b>admin / 123456</b>
      </p>
    </div>
  `;

  const form = document.getElementById("login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "admin" && password === "123456") {
      const userObj = { username, loginTime: new Date().toLocaleString() };
      localStorage.setItem(storeKey, JSON.stringify(userObj));
      alert("Login successful!");
      renderLoginLogout();
    } else {
      alert("Invalid username or password!");
    }
  });
}
