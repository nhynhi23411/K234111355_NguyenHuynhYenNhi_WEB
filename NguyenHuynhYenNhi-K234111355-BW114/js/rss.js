function renderRss() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div class="card">
      <h2 style="text-align:center; color:#e91e63;">🎓 Latest Education News - ThanhNiên.vn</h2>

      <!-- Bộ lọc -->
      <div class="rss-filter" style="text-align:center; margin-bottom:15px;">
        <input id="rss-search" type="text" placeholder="🔍 Enter keywords to search..." 
               style="padding:8px 12px;width:60%;max-width:400px;border-radius:8px;border:1px solid #ccc;">
        <select id="rss-category" style="padding:8px;border-radius:8px;margin-left:10px;">
          <option value="">-- Categorize --</option>
          <option value="Đại học">Đại học</option>
          <option value="Du học">Du học</option>
          <option value="Thi cử">Thi cử</option>
          <option value="Tuyển sinh">Tuyển sinh</option>
          <option value="Học bổng">Học bổng</option>
        </select>
      </div>

      <div id="edu-news" class="rss-grid">
        <div style="text-align:center;padding:30px;">
          <img src="https://i.gifer.com/ZZ5H.gif" width="50" alt="loading..."><br>
          <small>Loading latest news...</small>
        </div>
      </div>
    </div>
  `;

  // ===== CSS cho thẻ tin =====
  const style = document.createElement("style");
  style.textContent = `
    .rss-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .rss-card {
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.25s, box-shadow 0.25s;
      display: flex;
      flex-direction: column;
      cursor: pointer;
    }
    .rss-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 18px rgba(0,0,0,0.2);
    }
    .rss-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .rss-content {
      padding: 15px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .rss-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    .rss-title a {
      text-decoration: none;
      color: #111;
    }
    .rss-title a:hover {
      color: #e91e63;
    }
    .rss-desc {
      flex: 1;
      font-size: 15px;
      color: #555;
      margin-bottom: 10px;
    }
    .rss-date {
      font-size: 13px;
      color: #888;
      text-align: right;
    }
  `;
  document.head.appendChild(style);

  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.codetabs.com/v1/proxy?quest=" +
      encodeURIComponent("https://thanhnien.vn/rss/giao-duc.rss"),
    true
  );
  xhr.timeout = 8000;
  xhr.send();

  xhr.ontimeout = () => {
    document.getElementById(
      "edu-news"
    ).innerHTML = `<p style="text-align:center;color:#e91e63;">⏳ Request timed out. Please try again later.</p>`;
  };

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      const container = document.getElementById("edu-news");

      if (xhr.status === 200) {
        let xml = xhr.responseXML;
        if (!xml) {
          try {
            const parser = new DOMParser();
            xml = parser.parseFromString(xhr.responseText, "text/xml");
          } catch (err) {
            container.innerHTML = `<p style="color:red;">❌ XML parsing error!</p>`;
            return;
          }
        }

        const items = xml.getElementsByTagName("item");
        if (!items.length) {
          container.innerHTML = `<p>No news found.</p>`;
          return;
        }

        let newsList = [];
        for (let i = 0; i < items.length; i++) {
          const title =
            items[i].getElementsByTagName("title")[0]?.textContent || "";
          const link =
            items[i].getElementsByTagName("link")[0]?.textContent || "#";
          const desc =
            items[i].getElementsByTagName("description")[0]?.textContent || "";
          const pubDate =
            items[i].getElementsByTagName("pubDate")[0]?.textContent || "";
          const imgUrl = extractImg(desc);
          const cleanDesc = desc.replace(/<[^>]*>?/gm, "");

          newsList.push({ title, link, desc: cleanDesc, pubDate, imgUrl });
        }

        // render ban đầu
        renderList(newsList);

        // --- setup bộ lọc ---
        const searchInput = document.getElementById("rss-search");
        const categorySelect = document.getElementById("rss-category");

        function filterNews() {
          const keyword = searchInput.value.trim().toLowerCase();
          const cat = categorySelect.value.trim().toLowerCase();

          const filtered = newsList.filter(
            (n) =>
              n.title.toLowerCase().includes(keyword) &&
              (cat === "" ||
                n.title.toLowerCase().includes(cat) ||
                n.desc.toLowerCase().includes(cat))
          );

          renderList(filtered);
        }

        searchInput.addEventListener("input", filterNews);
        categorySelect.addEventListener("change", filterNews);
      } else {
        container.innerHTML = `<p>❌ Failed to load RSS (${xhr.status})</p>`;
      }
    }
  };

  // ===== Render list =====
  function renderList(list) {
    const container = document.getElementById("edu-news");
    container.innerHTML = "";

    if (!list.length) {
      container.innerHTML = `<p style="text-align:center;">No matching news found 🔍</p>`;
      return;
    }

    list.forEach((item) => {
      const div = document.createElement("div");
      div.className = "rss-card";
      div.innerHTML = `
        ${
          item.imgUrl
            ? `<img src="${item.imgUrl}" alt="ảnh tin tức" onerror="this.src='https://cdn-icons-png.flaticon.com/512/1946/1946488.png'">`
            : `<img src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png" alt="news">`
        }
        <div class="rss-content">
          <div class="rss-title"><a href="${item.link}" target="_blank">${
        item.title
      }</a></div>
          <div class="rss-desc">${item.desc.substring(0, 120)}...</div>
          <div class="rss-date">${item.pubDate}</div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  // ===== Trích ảnh =====
  function extractImg(html) {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : "";
  }
}
