function renderProviders() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div class="card">
      <h2 style="text-align:center; color:#e91e63;">📦 Providers</h2>
      <p class="note" style="text-align:center;">
        Add new providers below. Data will be saved in <b>local storage</b>.
      </p>

      <div class="form-card" style="max-width:450px;margin:20px auto;background:#fff3f8;padding:20px;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="color:#d81b60;text-align:center;">Enter Provider Information</h3>
        <form id="provider-form" autocomplete="off" class="provider-form" style="display:flex;flex-direction:column;gap:10px;">
          
          <label for="p-id"><b>ID</b></label>
          <input type="text" id="p-id" required placeholder="Enter provider ID" style="padding:8px;border:1px solid #ccc;border-radius:6px;">

          <label for="p-name"><b>Name</b></label>
          <input type="text" id="p-name" required placeholder="Enter provider name" style="padding:8px;border:1px solid #ccc;border-radius:6px;">

          <label for="p-phone"><b>Phone</b></label>
          <input type="text" id="p-phone" placeholder="Ex: 0981234567" required style="padding:8px;border:1px solid #ccc;border-radius:6px;">

          <label for="p-email"><b>Email</b></label>
          <input type="email" id="p-email" required placeholder="example@email.com" style="padding:8px;border:1px solid #ccc;border-radius:6px;">

          <button type="submit" class="btn-save" style="margin-top:10px;background:#d81b60;color:white;border:none;padding:10px;border-radius:8px;cursor:pointer;font-weight:bold;">
            💾 Save
          </button>
        </form>
      </div>

      <div class="responsive-table" style="margin-top:30px;">
        <table class="table-modern" style="width:100%;border-collapse:collapse;">
          <caption style="font-weight:bold;color:#d81b60;">Providers list</caption>
          <thead style="background:#f8bbd0;">
            <tr>
              <th style="padding:8px;">ID</th>
              <th style="padding:8px;">Name</th>
              <th style="padding:8px;">Phone</th>
              <th style="padding:8px;">Email</th>
              <th style="padding:8px;">Action</th>
            </tr>
          </thead>
          <tbody id="providers-tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  const form = document.getElementById("provider-form");
  const tbody = document.getElementById("providers-tbody");
  const storeKey = "bw06_providers";
  let list = JSON.parse(localStorage.getItem(storeKey) || "[]");

  // ====== SAVE EVENT ======
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("p-id").value.trim();
    const name = document.getElementById("p-name").value.trim();
    const phone = document.getElementById("p-phone").value.trim();
    const email = document.getElementById("p-email").value.trim();

    if (!/^0\d{9}$/.test(phone)) {
      alert("Phone number must be 10 digits and start with 0!");
      return;
    }

    if (list.some((p) => p.id === id)) {
      alert("ID already exists!");
      return;
    }

    list.push({ id, name, phone, email });
    localStorage.setItem(storeKey, JSON.stringify(list));

    form.reset();
    redraw();
  });

  // ====== DISPLAY TABLE ======
  function redraw() {
    tbody.innerHTML = "";
    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No providers yet.</td></tr>`;
      return;
    }

    list.forEach((p, i) => {
      const tr = document.createElement("tr");

      // 🎨 Row color rule
      if (i % 2 === 0) {
        tr.style.backgroundColor = "magenta"; // even row
      } else {
        tr.style.backgroundColor = "yellow"; // odd row
      }

      tr.innerHTML = `
        <td style="padding:6px;">${p.id}</td>
        <td style="padding:6px;">${p.name}</td>
        <td style="padding:6px;">${p.phone}</td>
        <td style="padding:6px;">${p.email}</td>
        <td style="padding:6px;text-align:center;">
          <button class="btn-delete" data-idx="${i}" style="background:#b71c1c;color:white;border:none;padding:5px 8px;border-radius:5px;cursor:pointer;">🗑️ Delete</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // ====== DELETE EVENT ======
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      const idx = e.target.dataset.idx;
      if (confirm("Are you sure you want to delete this provider?")) {
        list.splice(idx, 1);
        localStorage.setItem(storeKey, JSON.stringify(list));
        redraw();
      }
    }
  });

  // ====== INITIAL RENDER ======
  redraw();
}
