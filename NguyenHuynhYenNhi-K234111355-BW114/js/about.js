function renderAbout() {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div class="card">
      <h2 style="color:#d81b60;">💫 About Me</h2>
      <div class="about" style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
        <img src="images/avatar.jpg" alt="avatar" style="width:150px;height:150px;border-radius:50%;object-fit:cover;border:3px solid #d81b60;"/>
        <div class="meta" style="font-size:16px;line-height:1.6;">
          <div><b>👩‍🎓 Student ID:</b> K234111355</div>
          <div><b>👤 Name:</b> Nguyen Huynh Yen Nhi</div>
          <div><b>🏫 Class:</b> K23411T</div>
          <div><b>🎓 Major:</b> E-commerce - Honor Program</div>
          <div><b>🏢 University:</b> University of Economics and Law (UEL)</div>
          <div><b>📧 Email:</b> <a href="mailto:nhynhi23411@st.uel.edu.vn">nhynhi23411@st.uel.edu.vn</a></div>
        </div>
      </div>

      <hr style="margin:20px 0;border:0;border-top:2px dashed #f8bbd0;">

      <div style="padding:10px 20px;">
        <h3 style="color:#e91e63;">🌟 Personal Introduction</h3>
        <p style="font-size:15px;color:#555;text-align:justify;">
          I am an enthusiastic student from the E-commerce - Honor Program at UEL. 
          With a strong interest in both technology and business, I love exploring 
          how digital transformation and data-driven solutions can enhance the customer 
          experience and create value for modern enterprises.
        </p>
      </div>

      <div style="padding:10px 20px;">
        <h3 style="color:#e91e63;">💻 Technical & Professional Skills</h3>
        <ul style="columns:2;list-style:✨ inside;font-size:15px;color:#333;">
          <li>HTML, CSS, JavaScript</li>
          <li>Data Analysis for E-commerce</li>
          <li>Digital Marketing & SEO Basics</li>
          <li>UI/UX Design</li>
          <li>AJAX & RESTful APIs</li>
          <li>Business Intelligence Tools</li>
        </ul>
      </div>

      <div style="padding:10px 20px;">
        <h3 style="color:#e91e63;">🎯 Interests</h3>
        <p style="font-size:15px;color:#555;">
          💼 E-commerce Innovation | 🌐 Web Development | 🎨 Creative Design | 📊 Data Analytics | ☕ Café Coding
        </p>
      </div>

      <div style="text-align:center;margin-top:15px;font-size:14px;color:#777;">
        <i>“Be curious, be creative, and turn your ideas into real impact.”</i>
      </div>
    </div>
  `;
}
