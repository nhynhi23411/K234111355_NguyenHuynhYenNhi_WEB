// js/products.js
document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("content-area");

  // 🔹 Gắn sự kiện cho cả hai nơi: menu chính + Quick Access sidebar
  const productMenus = document.querySelectorAll('[data-page="products"]');

  productMenus.forEach((menuItem) => {
    menuItem.addEventListener("click", (e) => {
      e.preventDefault();
      loadProducts();
    });
  });

  async function loadProducts() {
    contentArea.innerHTML = `<h2>Loading products...</h2>`;

    try {
      // 🔹 Đọc XML nội bộ (từ thư mục dataset/)
      const res = await fetch("dataset/product.xml");
      if (!res.ok) throw new Error("Cannot load local XML file.");

      const xmlText = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "text/xml");
      const products = xml.getElementsByTagName("product");

      // 🔹 Lấy danh sách category duy nhất
      const categories = [
        ...new Set(Array.from(products).map((p) => p.getAttribute("catename"))),
      ];

      // 🔹 Tạo giao diện bộ lọc + bảng
      let html = `
        <h2>Product List</h2>
        <label for="categoryFilter"><b>Filter by category:</b></label>
        <select id="categoryFilter">
          <option value="all">All Categories</option>
          ${categories
            .map((cat) => `<option value="${cat}">${cat}</option>`)
            .join("")}
        </select>
        <div id="productTableContainer"></div>
      `;

      contentArea.innerHTML = html;

      const container = document.getElementById("productTableContainer");
      const filter = document.getElementById("categoryFilter");

      function renderTable(selectedCat = "all") {
        const filtered = Array.from(products).filter((p) =>
          selectedCat === "all"
            ? true
            : p.getAttribute("catename") === selectedCat
        );

        let tableHTML = `
          <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse: collapse;">
            <thead style="background-color: #e0f0ff;">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Detail</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              ${filtered
                .map(
                  (p) => `
                <tr>
                  <td>${p.getElementsByTagName("id")[0].textContent}</td>
                  <td><img src="${
                    p.getElementsByTagName("image")[0].textContent
                  }" width="80"/></td>
                  <td>${p.getElementsByTagName("name")[0].textContent}</td>
                  <td>${p.getElementsByTagName("detail")[0].textContent}</td>
                  <td>${p.getAttribute("catename")}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `;
        container.innerHTML = tableHTML;
      }

      renderTable();

      filter.addEventListener("change", (e) => {
        renderTable(e.target.value);
      });
    } catch (err) {
      contentArea.innerHTML = `<p style="color:red;">Error loading products: ${err.message}</p>`;
    }
  }
});
