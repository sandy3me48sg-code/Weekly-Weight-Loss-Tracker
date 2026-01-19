// ---------- Daily Affirmations ----------
const affirmations = [
  "I honor my body by listening to its needs.",
  "I am consistent, even when motivation is low.",
  "Small choices today create big changes.",
  "I choose progress over perfection.",
  "I am proud of myself for showing up."
];

function newAffirmation() {
  const a = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmation").textContent = a;
  localStorage.setItem("daily_affirmation", a);
}

// ---------- Daily Save/Load ----------
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `day_${yyyy}-${mm}-${dd}`;
}

function saveDay() {
  const data = {
    weight: document.getElementById("weight").value || "",
    calories: document.getElementById("calories").value || "",
    protein: document.getElementById("protein").value || "",
    water: document.getElementById("water").value || "",
    sleep: document.getElementById("sleep").value || ""
  };
  localStorage.setItem(todayKey(), JSON.stringify(data));
  document.getElementById("savedMsg").textContent = "Saved ✅";
  setTimeout(() => (document.getElementById("savedMsg").textContent = ""), 1500);
}

function loadToday() {
  const raw = localStorage.getItem(todayKey());
  if (!raw) return;
  const data = JSON.parse(raw);
  document.getElementById("weight").value = data.weight || "";
  document.getElementById("calories").value = data.calories || "";
  document.getElementById("protein").value = data.protein || "";
  document.getElementById("water").value = data.water || "";
  document.getElementById("sleep").value = data.sleep || "";
  document.getElementById("savedMsg").textContent = "Loaded ✅";
  setTimeout(() => (document.getElementById("savedMsg").textContent = ""), 1500);
}

function clearToday() {
  ["weight","calories","protein","water","sleep"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("savedMsg").textContent = "Cleared.";
  setTimeout(() => (document.getElementById("savedMsg").textContent = ""), 1500);
}

// ---------- Weekly Grid ----------
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

// Rows based on your sheet
const rows = [
  "Weigh-in",
  "Calories taken",
  "Protein",
  "Carbs",
  "Fat",
  "Fiber",
  "Hunger Pains",
  "Fast",
  "Eating window",
  "Movement Mins",
  "HIIT",
  "Loose Weight",
  "Strength",
  "Jog/run",
  "Walk",
  "Mobility",
  "10,000 Step",
  "Calories burned",
  "Supplements",
  "H2O oz",
  "Electrolytes",
  "Salt",
  "Caffeine",
  "Sleep hours",
  "Symptoms",
  "Stress",
  "Soreness",
  "Joint pain",
  "Goals Met"
];

let weekStart = getMonday(new Date());

function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay(); // Sun=0
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}

function weekKey() {
  const yyyy = weekStart.getFullYear();
  const mm = String(weekStart.getMonth() + 1).padStart(2, "0");
  const dd = String(weekStart.getDate()).padStart(2, "0");
  return `week_${yyyy}-${mm}-${dd}`;
}

function formatWeekLabel() {
  const opts = { year: "numeric", month: "short", day: "numeric" };
  return weekStart.toLocaleDateString(undefined, opts);
}

function buildWeeklyTable() {
  document.getElementById("weekLabel").textContent = formatWeekLabel();
  const table = document.getElementById("weeklyTable");
  table.innerHTML = "";

  // Header
  const thead = document.createElement("thead");
  const hrow = document.createElement("tr");
  const h0 = document.createElement("th");
  h0.textContent = "Task/Activity";
  hrow.appendChild(h0);
  days.forEach(d => {
    const th = document.createElement("th");
    th.textContent = d;
    hrow.appendChild(th);
  });
  thead.appendChild(hrow);
  table.appendChild(thead);

  // Body
  const tbody = document.createElement("tbody");
  rows.forEach((r, rIndex) => {
    const tr = document.createElement("tr");
    const tdLabel = document.createElement("td");
    tdLabel.textContent = r;
    tr.appendChild(tdLabel);

    for (let c = 0; c < 7; c++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "";
      input.setAttribute("data-r", rIndex);
      input.setAttribute("data-c", c);
      td.appendChild(input);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
}

function saveWeek() {
  const inputs = document.querySelectorAll("#weeklyTable input");
  const data = {};
  inputs.forEach(inp => {
    const r = inp.getAttribute("data-r");
    const c = inp.getAttribute("data-c");
    data[`${r}_${c}`] = inp.value || "";
  });
  localStorage.setItem(weekKey(), JSON.stringify(data));
  document.getElementById("weekMsg").textContent = "Week saved ✅";
  setTimeout(() => (document.getElementById("weekMsg").textContent = ""), 1500);
}

function loadWeek() {
  const raw = localStorage.getItem(weekKey());
  const inputs = document.querySelectorAll("#weeklyTable input");
  if (!raw) {
    inputs.forEach(i => (i.value = ""));
    document.getElementById("weekMsg").textContent = "No saved data for this week yet.";
    setTimeout(() => (document.getElementById("weekMsg").textContent = ""), 1800);
    return;
  }
  const data = JSON.parse(raw);
  inputs.forEach(inp => {
    const r = inp.getAttribute("data-r");
    const c = inp.getAttribute("data-c");
    inp.value = data[`${r}_${c}`] || "";
  });
  document.getElementById("weekMsg").textContent = "Week loaded ✅";
  setTimeout(() => (document.getElementById("weekMsg").textContent = ""), 1500);
}

function clearWeek() {
  document.querySelectorAll("#weeklyTable input").forEach(i => (i.value = ""));
  localStorage.removeItem(weekKey());
  document.getElementById("weekMsg").textContent = "Week cleared.";
  setTimeout(() => (document.getElementById("weekMsg").textContent = ""), 1500);
}

function prevWeek() {
  weekStart.setDate(weekStart.getDate() - 7);
  buildWeeklyTable();
  loadWeek();
}
function nextWeek() {
  weekStart.setDate(weekStart.getDate() + 7);
  buildWeeklyTable();
  loadWeek();
}

// ---------- On load ----------
(function init() {
  const savedAff = localStorage.getItem("daily_affirmation");
  document.getElementById("affirmation").textContent = savedAff || affirmations[0];

  loadToday();
  buildWeeklyTable();
  loadWeek();
})();
