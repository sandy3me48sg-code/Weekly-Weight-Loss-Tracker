// ===== DAILY AFFIRMATIONS =====
const affirmations = [
  "I am proud of myself for showing up today.",
  "My body is learning, healing, and growing stronger.",
  "Progress is happening even when it feels slow.",
  "I choose kindness toward myself today.",
  "Every small step I take matters.",
  "I am capable of change and growth.",
  "I honor my body by listening to its needs.",
  "I deserve health, balance, and peace.",
  "Consistency beats perfection.",
  "Today I choose progress."
];

function newAffirmation() {
  const a = affirmations[Math.floor(Math.random() * affirmations.length)];
  document.getElementById("affirmation").innerText = a;
}

// ===== SAVE DAILY DATA =====
function saveDay() {
  const data = {
    weight: document.getElementById("weight").value,
    calories: document.getElementById("calories").value,
    protein: document.getElementById("protein").value,
    water: document.getElementById("water").value,
    sleep: document.getElementById("sleep").value,
    date: new Date().toISOString().split("T")[0]
  };

  localStorage.setItem("dailyTracking", JSON.stringify(data));
  document.getElementById("savedMsg").innerText = "Saved for today ✔️";
}

// ===== LOAD DATA ON OPEN =====
function loadDay() {
  const data = JSON.parse(localStorage.getItem("dailyTracking"));
  if (!data) return;

  document.getElementById("weight").value = data.weight || "";
  document.getElementById("calories").value = data.calories || "";
  document.getElementById("protein").value = data.protein || "";
  document.getElementById("water").value = data.water || "";
  document.getElementById("sleep").value = data.sleep || "";
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  newAffirmation();
  loadDay();
});
