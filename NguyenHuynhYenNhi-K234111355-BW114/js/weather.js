// js/weather.js
function renderWeatherApi() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div class="card">
      <h2>Weather API (from ThanhNien.vn)</h2>
      <p class="note">
        Display all provinces/cities of Vietnam including condition, high and low temperatures.
      </p>
      <div id="weather_loading" class="muted">Loading weather data...</div>
      <div class="responsive-table">
        <table class="table-modern">
          <caption>Vietnam Weather Forecast</caption>
          <thead>
            <tr>
              <th>Province / City</th>
              <th>Temperature (°C)</th>
              <th>High / Low (°C)</th>
              <th>Condition</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody id="weather_tbody"></tbody>
        </table>
      </div>
    </div>
  `;

  const tbody = document.getElementById("weather_tbody");
  const loading = document.getElementById("weather_loading");

  // 🔹 Danh sách các tỉnh / thành phố
  const provinces = [
    { id: "2347719", name: "An Giang" },
    { id: "20070078", name: "Bình Dương" },
    { id: "20070086", name: "Bình Phước" },
    { id: "2347731", name: "Bình Thuận" },
    { id: "2347730", name: "Bình Định" },
    { id: "20070081", name: "Bạc Liêu" },
    { id: "20070087", name: "Bắc Giang" },
    { id: "20070084", name: "Bắc Kạn" },
    { id: "20070088", name: "Bắc Ninh" },
    { id: "2347703", name: "Bến Tre" },
    { id: "2347704", name: "Cao Bằng" },
    { id: "20070082", name: "Cà Mau" },
    { id: "2347732", name: "Cần Thơ" },
    { id: "28301718", name: "Điện Biên" },
    { id: "20070085", name: "Đà Nẵng" },
    { id: "1252375", name: "Đà Lạt" },
    { id: "2347720", name: "Đắk Lắk" },
    { id: "28301719", name: "Đắk Nông" },
    { id: "2347721", name: "Đồng Nai" },
    { id: "2347722", name: "Đồng Tháp" },
    { id: "2347733", name: "Gia Lai" },
    { id: "2347727", name: "Hà Nội" },
    { id: "2347728", name: "Hồ Chí Minh" },
    { id: "2347734", name: "Hà Giang" },
    { id: "2347741", name: "Hà Nam" },
    { id: "2347736", name: "Hà Tĩnh" },
    { id: "2347737", name: "Hòa Bình" },
    { id: "20070079", name: "Hưng Yên" },
    { id: "20070080", name: "Hải Dương" },
    { id: "2347707", name: "Hải Phòng" },
    { id: "28301720", name: "Hậu Giang" },
    { id: "2347738", name: "Khánh Hòa" },
    { id: "2347723", name: "Kiên Giang" },
    { id: "20070076", name: "Kon Tum" },
    { id: "2347708", name: "Lai Châu" },
    { id: "2347710", name: "Long An" },
    { id: "2347740", name: "Lào Cai" },
    { id: "2347709", name: "Lâm Đồng" },
    { id: "2347718", name: "Lạng Sơn" },
    { id: "20070089", name: "Nam Định" },
    { id: "2347742", name: "Nghệ An" },
    { id: "2347743", name: "Ninh Bình" },
    { id: "2347744", name: "Ninh Thuận" },
    { id: "20070091", name: "Phú Thọ" },
    { id: "2347745", name: "Phú Yên" },
    { id: "2347746", name: "Quảng Bình" },
    { id: "2347711", name: "Quảng Nam" },
    { id: "20070077", name: "Quảng Ngãi" },
    { id: "2347712", name: "Quảng Ninh" },
    { id: "2347747", name: "Quảng Trị" },
    { id: "2347748", name: "Sóc Trăng" },
    { id: "2347713", name: "Sơn La" },
    { id: "2347715", name: "Thanh Hóa" },
    { id: "2347716", name: "Thái Bình" },
    { id: "20070083", name: "Thái Nguyên" },
    { id: "2347749", name: "Thừa Thiên Huế" },
    { id: "2347717", name: "Tiền Giang" },
    { id: "2347750", name: "Trà Vinh" },
    { id: "2347751", name: "Tuyên Quang" },
    { id: "2347714", name: "Tây Ninh" },
    { id: "2347752", name: "Vĩnh Long" },
    { id: "20070090", name: "Vĩnh Phúc" },
    { id: "2347729", name: "Vũng Tàu" },
    { id: "2347753", name: "Yên Bái" },
  ];

  let loaded = 0;
  provinces.forEach((p) => {
    // Dùng proxy allorigins để tránh CORS
    const url =
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent(`https://eth2.cnnd.vn/ajax/weatherinfo/${p.id}.htm`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        loaded++;

        const info = data?.Data?.data?.datainfo;
        if (!info) throw new Error("Invalid response");

        const { temperature, high, low, status, shadow_icon } = info;

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${p.name}</td>
          <td>${temperature ?? "-"}</td>
          <td>${high ?? "-"} / ${low ?? "-"}</td>
          <td>${status ?? ""}</td>
          <td>${
            shadow_icon ? `<img src="${shadow_icon}" width="40"/>` : ""
          }</td>
        `;
        tbody.appendChild(tr);

        if (loaded === provinces.length) {
          loading.textContent = `✅ Loaded all ${provinces.length} provinces/cities.`;
        }
      })
      .catch((err) => {
        loaded++;
        loading.textContent = `Error loading ${p.name}`;
        console.warn("Error:", err);
      });
  });
}
