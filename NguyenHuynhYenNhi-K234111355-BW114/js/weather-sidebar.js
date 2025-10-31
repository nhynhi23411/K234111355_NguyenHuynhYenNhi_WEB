document.addEventListener("DOMContentLoaded", () => {
  const areaD = document.querySelector(".area-d");
  if (!areaD) return;

  // === Add sidebar weather box ===
  const weatherBox = document.createElement("div");
  weatherBox.className = "sidebar-card";
  weatherBox.innerHTML = `
    <h4>🌦️ Quick Weather</h4>
    <label for="province_select" style="font-size:13px;color:#777;">Select Province/City:</label>
    <select id="province_select" style="width:100%;margin-top:4px;padding:6px;border-radius:8px;border:1px solid #ddd;">
      <option value="">-- Choose Province --</option>
    </select>
    <div id="weather_display" style="margin-top:10px;text-align:center;">
      <p class="note">Select a province to see weather</p>
    </div>
  `;
  areaD.appendChild(weatherBox);

  const select = document.getElementById("province_select");
  const display = document.getElementById("weather_display");

  // === Full Province list from ThanhNien.vn ===
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

  // === Populate dropdown ===
  provinces.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  // === Load weather when selecting a province ===
  select.addEventListener("change", () => {
    const id = select.value;
    if (!id) {
      display.innerHTML = `<p class="note">Select a province to see weather</p>`;
      return;
    }

    display.innerHTML = `<p class="note">Loading weather...</p>`;

    const url =
      "https://api.allorigins.win/raw?url=" +
      encodeURIComponent(
        "https://eth2.cnnd.vn/ajax/weatherinfo/" + id + ".htm"
      );

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const info = data?.Data?.data?.datainfo;
        if (!info) throw new Error("Invalid response");

        const city = info.location || "Unknown";
        const temp = info.temperature || "-";
        const feels = info.feels_like || "-";
        const statusTxt = info.status || "N/A";
        const icon = info.shadow_icon || "";

        display.innerHTML = `
          <div class="weather-card" style="border:1px solid #eee;border-radius:10px;padding:10px;background:#fff7fa;">
            <div style="display:flex;align-items:center;gap:10px;justify-content:center;">
              ${icon ? `<img src="${icon}" width="50" alt="${statusTxt}">` : ""}
              <div>
                <div style="font-weight:600;">${city}</div>
                <div style="font-size:14px;color:#777;">${statusTxt}</div>
                <div style="font-size:18px;color:#d81b60;font-weight:700;">${temp}°C</div>
                <div style="font-size:12px;color:#999;">Feels like ${feels}°C</div>
              </div>
            </div>
          </div>
        `;
      })
      .catch((err) => {
        display.innerHTML = `<p class="note error">Failed to load weather data.</p>`;
        console.error(err);
      });
  });
});
