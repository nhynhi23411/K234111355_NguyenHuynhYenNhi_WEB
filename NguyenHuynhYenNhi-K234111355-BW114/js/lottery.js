function renderLottery() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div class="card">
      <h2 style="color:#d81b60;text-align:center;">🎰 Vietlott Jackpot - Full Board</h2>
      <p class="note" style="text-align:center;">Showing latest results for MEGA 6/45 and POWER 6/55 from Dantri API.</p>
      <div id="lottery_full_table" class="responsive-table">
        <table class="table-modern" style="font-size:15px;">
          <thead>
            <tr>
              <th>Game</th>
              <th>Draw ID</th>
              <th>Date</th>
              <th>Numbers</th>
              <th>Jackpot (₫)</th>
            </tr>
          </thead>
          <tbody id="lottery_full_tbody">
            <tr><td colspan="5" style="text-align:center;">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const tbody = document.getElementById("lottery_full_tbody");
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
            const all = [
              { type: "MEGA 6/45", list: json.data.mega645 },
              { type: "POWER 6/55", list: json.data.power655 },
            ];
            renderRows(all);
          } else {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No data found.</td></tr>`;
          }
        } catch (err) {
          tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Parse error.</td></tr>`;
        }
      } else {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">HTTP ${xhr.status}</td></tr>`;
      }
    }
  };

  function renderRows(dataGroups) {
    tbody.innerHTML = "";
    dataGroups.forEach((g) => {
      g.list.forEach((d) => {
        const numbers = d.ListNumber.split(/[-|]/)
          .map(
            (n) =>
              `<span style="display:inline-block;background:#d81b60;color:#fff;border-radius:50%;padding:3px 8px;margin:2px;">${n}</span>`
          )
          .join("");

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td style="font-weight:600;">${g.type}</td>
          <td>${d.DrawId}</td>
          <td>${d.DrawDate}</td>
          <td>${numbers}</td>
          <td>${Number(d.Jackpot).toLocaleString("vi-VN")}</td>
        `;
        tbody.appendChild(tr);
      });
    });
  }
}
