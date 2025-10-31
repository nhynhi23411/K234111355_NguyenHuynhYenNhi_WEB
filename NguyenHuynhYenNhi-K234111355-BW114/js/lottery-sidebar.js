document.addEventListener("DOMContentLoaded", () => {
  const areaB = document.querySelector(".area-b");
  if (!areaB) return;

  // ====== Tạo khung Vietlott Board ở Area B ======
  const lottoCard = document.createElement("div");
  lottoCard.className = "sidebar-card";
  lottoCard.innerHTML = `
    <h4>🎰 Vietlott Jackpot</h4>
    <div style="margin-bottom:10px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px;">
  <label>
    <input type="radio" name="lotType" value="mega645" checked> MEGA 6/45
  </label>
  <label>
    <input type="radio" name="lotType" value="power655"> POWER 6/55
  </label>
</div>


    <div id="lottery_box" class="responsive-table" style="max-height:300px;overflow:auto;">
      <table class="table-modern" style="font-size:13px;">
        <thead>
          <tr>
            <th>Game</th>
            <th>ID</th>
            <th>Date</th>
            <th>Numbers</th>
            <th>Jackpot (₫)</th>
          </tr>
        </thead>
        <tbody id="lottery_tbody">
          <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
        </tbody>
      </table>
    </div>
  `;
  areaB.appendChild(lottoCard);

  const tbody = document.getElementById("lottery_tbody");
  const radios = document.getElementsByName("lotType");
  let data = null;

  // ====== GỌI API AJAX ======
  const url =
    "https://api.allorigins.win/raw?url=" +
    encodeURIComponent(
      "https://webapi.dantri.com.vn/lottery/get-vietlott-jack"
    );

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          const json = JSON.parse(xhr.responseText);
          if (json.status && json.data) {
            data = json.data;
            renderSelected("mega645");
            setupRadios();
          } else {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No data found</td></tr>`;
          }
        } catch (e) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Parse error</td></tr>`;
        }
      } else {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">HTTP ${xhr.status}</td></tr>`;
      }
    }
  };

  // ====== Radio Event ======
  function setupRadios() {
    radios.forEach((r) => {
      r.addEventListener("change", () => renderSelected(r.value));
    });
  }

  // ====== Render kết quả xổ số ======
  function renderSelected(type) {
    if (!data) return;
    const list = data[type];
    if (!list || !list.length) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No result for ${type}</td></tr>`;
      return;
    }

    const d = list[0];
    const numbers = d.ListNumber.split(/[-|]/)
      .map(
        (n) =>
          `<span style="display:inline-block;background:#d81b60;color:#fff;border-radius:50%;padding:2px 6px;margin:1px;">${n}</span>`
      )
      .join("");

    tbody.innerHTML = `
      <tr>
        <td>${type.toUpperCase()}</td>
        <td>${d.DrawId}</td>
        <td>${d.DrawDate}</td>
        <td>${numbers}</td>
        <td>${Number(d.Jackpot).toLocaleString("vi-VN")}</td>
      </tr>
    `;
  }
});
