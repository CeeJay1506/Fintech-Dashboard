// ================= DATA =================
const users = [
  { name: "Yusuf", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Hakeem", img: "https://randomuser.me/api/portraits/men/45.jpg" },
  { name: "Azeezah", img: "https://randomuser.me/api/portraits/women/65.jpg" },
];

const transactions = [
  { name: "Netflix", amount: -15, type: "red" },
  { name: "Transfer", amount: -120, type: "red" },
  { name: "Salary", amount: 1200, type: "green" },
];

// ================= LOAD DATA =================
function loadData() {
  // Recent users
  document.getElementById("users").innerHTML = users
    .map(
      (u) => `
    <div style="text-align:center">
      <img src="${u.img}">
      <p style="font-size:12px">${u.name}</p>
    </div>
  `,
    )
    .join("");

  // Transactions
  document.getElementById("transactions").innerHTML = transactions
    .map(
      (t) => `
    <div class="row">
      <div>
        <span>${t.name}</span>
        <div class="mini">
          <div class="fill ${t.type}"></div>
        </div>
      </div>
      <span style="color:${t.type === "red" ? "#ff4d4d" : "#2ecc71"}">
        ${t.amount > 0 ? "+" : ""}${t.amount}
      </span>
    </div>
  `,
    )
    .join("");
}

// ================= AUTH =================
let isLogin = true;

function openAuth() {
  document.getElementById("authModal").style.display = "flex";
}

function closeAuth() {
  document.getElementById("authModal").style.display = "none";
}

function toggleAuth() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin
    ? "Login"
    : "Sign Up";

  document.getElementById("authSwitch").innerText = isLogin
    ? "Don’t have an account? Sign Up"
    : "Already have an account? Login";
}

function handleAuth() {
  const name = document.getElementById("authName").value;

  if (!name) {
    alert("Please enter your name");
    return;
  }

  document.getElementById("welcomeText").innerText = "Hi, " + name;
  document.getElementById("cardName").innerText = name;

  closeAuth();
}

// ================= CARD =================
function openCard() {
  document.getElementById("cardModal").style.display = "flex";
}

function closeCard() {
  document.getElementById("cardModal").style.display = "none";
}

// ================= SEND =================
let amount = "";

function openSend() {
  document.getElementById("sendModal").style.display = "flex";
}

function closeSend() {
  document.getElementById("sendModal").style.display = "none";
}

function press(n) {
  amount += n;
  document.getElementById("amount").innerText = "$" + amount;
}

function clearAmount() {
  amount = amount.slice(0, -1);
  document.getElementById("amount").innerText = "$" + (amount || "0");
}

function sendMoney() {
  const loader = document.getElementById("loader");
  const success = document.getElementById("successBox");

  success.classList.add("hidden");
  loader.classList.remove("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    success.classList.remove("hidden");

    // Reset after success
    amount = "";
    document.getElementById("amount").innerText = "$0";
  }, 1500);
}

// ================= CHART =================
let chart;

window.onload = () => {
  loadData();

  const ctx = document.getElementById("chart");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: [20, 40, 30, 60, 50, 70, 40],
          backgroundColor: "#0072ff",
          borderRadius: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  });
};

function setChart(type) {
  const expenseBtn = document.getElementById("expenseBtn");
  const incomeBtn = document.getElementById("incomeBtn");

  expenseBtn.classList.remove("active");
  incomeBtn.classList.remove("active");

  if (type === "income") {
    incomeBtn.classList.add("active");
    chart.data.datasets[0].data = [10, 30, 50, 40, 60, 30, 20];
    chart.data.datasets[0].backgroundColor = "#2ecc71";
  } else {
    expenseBtn.classList.add("active");
    chart.data.datasets[0].data = [20, 40, 30, 60, 50, 70, 40];
    chart.data.datasets[0].backgroundColor = "#0072ff";
  }

  chart.update();
}

// ================= OUTSIDE CLICK CLOSE =================
window.onclick = function (e) {
  ["authModal", "cardModal", "sendModal"].forEach((id) => {
    const modal = document.getElementById(id);
    if (e.target === modal) modal.style.display = "none";
  });
};
