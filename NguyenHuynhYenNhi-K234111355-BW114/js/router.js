// Router & Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".menu-link[data-page]");
  menuLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(a.dataset.page);
    });
  });

  // Default page
  navigate("about");

  // Start footer clock
  startFooterClock("Nguyen Huynh Yen Nhi");
});

function navigate(page) {
  resetLayoutState();
  clearBDynamic();

  switch (page) {
    case "about":
      renderAbout();
      break;
    case "weather":
      renderWeatherApi();
      break;
    case "rss":
      renderRss();
      break;
    case "products":
      renderProducts(); // đổi từ renderBooks sang renderProducts
      break;
    case "providers":
      renderProviders();
      break;
    case "style":
      renderStyle();
      break;
    case "login":
      renderLoginLogout();
      break;
    case "lottery":
      renderLottery();
      break;
    default:
      renderAbout();
  }
}

function resetLayoutState() {
  const layout = document.querySelector(".layout");
  layout.classList.remove("collapse-b");
}

function clearBDynamic() {
  const bd = document.getElementById("b-dynamic");
  if (bd) bd.innerHTML = "";
}

// 🕒 Footer Clock
function startFooterClock(fullName) {
  const el = document.getElementById("footer-text");
  function tick() {
    const now = new Date();
    el.textContent = `Designed by Student ${fullName}, today is ${now.toLocaleString()}`;
  }
  tick();
  setInterval(tick, 1000);
}

// Helper: format datetime
function formatDateTime(input) {
  if (!input) return "";
  try {
    const d = new Date(input);
    if (isNaN(d.getTime())) return String(input);
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(
      d.getMonth() + 1
    )}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return String(input);
  }
}
